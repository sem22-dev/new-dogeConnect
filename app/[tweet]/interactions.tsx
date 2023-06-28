"use client"

import Image from "next/image"
import Link from "next/link";
import { useSession } from "next-auth/react"
import { IoMdSend } from "react-icons/io"

export function Interactions( { id } : any){
    const { data: session } = useSession();
  return(
        <div className="">
        {/* write a comment */}
        <div className="border-b border-darkBorder px-3 md:px-10 bg-bgDarkLint py-5">
  <div className="flex gap-5 items-center">
    <Image src={session?.user?.image || ''} width={50} height={50} alt='image' className='rounded-[1000px] cursor-pointer text-[30px]'/>
    <input type="text" id="commentInput" className="w-full bg-transparent outline-none text-white text-base placeholder:text-textGray" placeholder="Write a comment" />
    <button
      onClick={async () => {
        const commentInput = document.getElementById('commentInput') as HTMLInputElement;
        const comment = commentInput ? commentInput.value : '';

        const tweetId = id;

        try {
          const response = await fetch('/api/twitter/comment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tweetId, comment })
          });

          if (response.ok) {
            alert('Comment posted successfully!');
          } else {
            alert('Error posting comment.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error posting comment.');
        }
      }}
    >
      <IoMdSend className="w-[30px] h-[20px] text-textGray cursor-pointer hover:text-bgPink" />
    </button>
  </div>



         
        </div>
        {/* public comments */}
        <div className=" border-b border-darkBorder px-3 md:px-10 bg-bgDarkLint text-white py-5 rounded-b-xl">
            <div className="flex gap-5 ">
                <Image src={"https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"} width={50} height={50} alt='image' className=' rounded-full cursor-pointer'/> 
                <div>
                    <div className="text-[17px] font-semibold"><Link href={"https://twitter.com/elonmusk"} className=" hover:underline">Elon musk</Link> <span className=" text-textGray font-normal text-[16px]">@elonmusk • 16h</span></div>
                    <p>We live in the most interesting of times</p>
                </div>
            </div>
        </div>
    </div>
  )
}
