"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import EachTweet from "../tweets/fetchTweets";
import { Interactions } from './interactions';

type TweetData = {
  id: string;
  author: {
    profile_image_url: string;
    name: string;
    username: string;
  };
  created_at: string;
  text: string;
  public_metrics: {
    like_count: number;
    reply_count: number;
  };
};

export default function TweetNewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tweet = searchParams?.get('tweet');

  const [tweetData, setTweetData] = useState<TweetData | null>(null);

  useEffect(() => {
    async function fetchTweetData() {
      const response = await fetch('http://localhost:8080/pulltweet/test.json');
      const data = await response.json();
      const tweetsData: TweetData[] = data.tweets;

      const tweetFound = tweetsData.find((t) => t.id === tweet);

      setTweetData(tweetFound || null);
    }

    if (tweet) {
      fetchTweetData();
    }
  }, [tweet]);

  if (!tweetData) {
    return <div>Loading... tomorow ok</div>;
  }

  return (
    <div className="bg-bgDark min-h-screen px-2 sm:px-8 lg:px-[200px] xl:px-[320px] pb-10">
      <EachTweet
        key={tweetData.id}
        id={tweetData.id}
        rounded=""
        pfp={tweetData.author.profile_image_url}
        name={tweetData.author.name}
        username={tweetData.author.username}
        time={tweetData.created_at}
        tweetText={tweetData.text}
        likeCount={tweetData.public_metrics.like_count}
        replyCount={tweetData.public_metrics.reply_count}
      />
      <Interactions id={tweetData.id} />
    </div>
  );
}
