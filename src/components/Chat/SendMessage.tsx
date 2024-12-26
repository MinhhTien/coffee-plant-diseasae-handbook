"use client";
import React, { MutableRefObject, use, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase/firestore";
import useAuth from "@/contexts/useAuth";
import { useRouter } from 'next/navigation';
import { notifyError } from "@/utils/toastify";

interface SendMessageProps {
  scroll: MutableRefObject<HTMLSpanElement | null>;
}

const SendMessage = ({ scroll }: SendMessageProps) => {
  const accessToken = localStorage.getItem("accessToken");

  const [message, setMessage] = useState("");
  const { userTokenPayload } = useAuth();
  const router = useRouter();

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!accessToken) {
      router.push('/auth/signin')
      // notifyError("Cần phải đăng nhập để gửi tin nhắn");
      return;
    }

    if (message.trim() === "") {
      return;
    }

    const newMessage = {
      message: message.substring(0,500),
      createdAt: serverTimestamp(),
      sender: userTokenPayload,
    };

    await addDoc(collection(db, "message"), newMessage);
    setMessage("");
    scroll.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to bottom
  };

  return (
    <form onSubmit={(event) => sendMessage(event)}>
      {/* <OutlinedInput
        type="text"
        fullWidth
        placeholder="Aa"
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="submit" edge="end">
              <Send />
            </IconButton>
          </InputAdornment>
        }
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      /> */}
      <div className="relative w-full">
        <button className="absolute right-5 top-1/2 -translate-y-1/2 text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12L4.396 6.563C4.223 5.007 5.825 3.864 7.24 4.535L19.184 10.193C20.709 10.915 20.709 13.085 19.184 13.807L7.24 19.466C5.825 20.136 4.223 18.994 4.396 17.438L5 12ZM5 12H12"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <input
          type="text"
          placeholder="Aa"
          className="w-full rounded-full border border-stroke bg-gray-2 py-3 pl-5 pr-14 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
      </div>
    </form>
  );
};

export default SendMessage;
