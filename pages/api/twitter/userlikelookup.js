const axios = require('axios');

// Twitter Bearer Token
const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAInHnwEAAAAA6lyrb4ULcMbyrNR%2BN6dl0xaDCvg%3Ddcuhcnpd7DSN1tvXZG75a245km5R3ylpPQ9PbbM1LnrXodGl5L';

export default async (req, res) => {
  try {
    const { tweetId } = req.body;

    if (!tweetId) {
      return res.status(400).json({ error: 'Tweet ID is required' });
    }

    const response = await axios.get(`https://api.twitter.com/2/tweets/${tweetId}/liking_users`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: {
        'user.fields': 'username,description,profile_image_url',
      },
    });

    // Extract the user data from the response
    const users = response.data.data.map((user) => {
      return {
        username: user.username,
        bio: user.description,
        profileImageUrl: user.profile_image_url,
      };
    });

    // Log the users who liked the tweet
    console.log(users);

    // Return the users as the API response
    return res.status(200).json({ users });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
};
