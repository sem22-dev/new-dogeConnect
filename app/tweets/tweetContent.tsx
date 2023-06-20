"use client"

import EachTweet from "./fetchTweets"

// 

import { useState, useEffect } from 'react';

export default function TweetContents({ rounded }: { rounded: string }) {
  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {
    async function fetchJson() {
      try {
        const response = await fetch('http://localhost:8080/pulltweet/test.json');
        const data = await response.json();
        setTweets(data.tweets);
        console.log(data.tweets)
      } catch (error) {
        console.error(error);
      }
    }

    fetchJson();
  }, []);

  return (
    <div className={`flex flex-col-reverse gap-10`}>
      {tweets.map((tweet) => (
        <EachTweet
          key={tweet.id}
          id={tweet.id}
          rounded={rounded}
          pfp={tweet.author.profile_image_url}
          name={tweet.author.name}
          username={tweet.author.username}
          time={tweet.created_at}
          tweetText={tweet.text}
          mediaUrl={tweet.media_url}
          likeCount={tweet.public_metrics.like_count}
          replyCount={tweet.public_metrics.reply_count}
        />
      ))}
    </div>
  );
}