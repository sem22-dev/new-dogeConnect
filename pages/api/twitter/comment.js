import Twitter from 'twitter-lite';
import { getToken } from 'next-auth/jwt';

export default async (req, res) => {
  try {
    const { tweetId, comment } = req.body;

    if (!tweetId) {
      return res.status(400).json({ error: 'Tweet ID is required' });
    }

    if (!comment) {
      return res.status(400).json({ error: 'Comment is required' });
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    });

    const client = new Twitter({
      subdomain: 'api',
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: token.twitter.accessToken,
      access_token_secret: token.twitter.refreshToken
    });

    await client.post('statuses/update', {
      status: comment,
      in_reply_to_status_id: tweetId,
      auto_populate_reply_metadata: true
    });
    return res.status(200).json({
      status: 'Ok'
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};