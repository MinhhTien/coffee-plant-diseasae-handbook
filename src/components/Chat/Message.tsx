import useAuth from "@/contexts/useAuth";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageProps {
  message: DocumentData;
  position:
    | "single"
    | "first"
    | "middle"
    | "last"
    | "after-header-first"
    | "after-header-single";
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const Message = ({ message, position, setSelectedImage }: MessageProps) => {
  const { userTokenPayload } = useAuth();

  const formatDateForTooltip = (date: Date) => {
    const today = new Date();
    const isToday =
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear();

    const timeDifference = today.getTime() - date.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (isToday) {
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (daysDifference <= 7) {
      return date
        .toLocaleString("vi-VN", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace("Th ", "T");
    } else {
      return `${date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      })} ${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
    }
  };

  const messageDate = message.createdAt
    ? new Date(message.createdAt.toDate())
    : null;

  // Border radius classes based on the position
  const borderRadiusRight = {
    single: "rounded-[18px]",
    first:
      "rounded-tl-[18px] rounded-tr-[18px] rounded-br-[4px] rounded-bl-[18px]",
    middle:
      "rounded-tl-[18px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[18px]",
    last: "rounded-tl-[18px] rounded-tr-[4px] rounded-br-[18px] rounded-bl-[18px]",
    "after-header-first":
      "rounded-tl-[18px] rounded-tr-[18px] rounded-br-[4px] rounded-bl-[18px]",
    "after-header-single": "rounded-[18px]",
  }[position];

  const borderRadiusLeft = {
    single: "rounded-[18px]",
    first:
      "rounded-tl-[18px] rounded-tr-[18px] rounded-br-[18px] rounded-bl-[4px]",
    middle:
      "rounded-tl-[4px] rounded-tr-[18px] rounded-br-[18px] rounded-bl-[4px]",
    last: "rounded-tl-[4px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[18px]",
    "after-header-first":
      "rounded-tl-[18px] rounded-tr-[18px] rounded-br-[18px] rounded-bl-[4px]",
    "after-header-single": "rounded-[18px]",
  }[position];

  const marginTop = {
    first: "mt-[8px]",
    "after-header-first": "mt-[0px]",
    "after-header-single": "mt-[0px]",
    middle: "mt-[2px]",
    last: "mt-[2px]",
    single: "mt-[8px]",
  }[position];

  return (
    <>
      {["after-header-single", "first", "single", "after-header-first"].find(
        (pos) => pos === position,
      ) &&
        userTokenPayload?.user_id !== message.sender.user_id && (
          <p className={`ml-11 text-xs ${marginTop}`}>{message.sender.name}</p>
        )}
      <div className="flex items-end gap-2">
        <div className="relative h-9 w-9 min-w-9">
          <Image
            src={message.sender.picture}
            fill
            sizes="100%"
            alt={"avatar"}
            className={`rounded-full object-cover ${
              ["after-header-single", "last", "single"].find(
                (pos) => pos === position,
              ) && userTokenPayload?.user_id !== message.sender.user_id
                ? ""
                : "hidden"
            }`}
          ></Image>
        </div>

        <div
          className={`max-w-[500px] ${userTokenPayload?.user_id === message.sender.user_id ? borderRadiusRight : borderRadiusLeft} 
        ${userTokenPayload?.user_id === message.sender.user_id ? "ml-auto bg-[#5750F1]" : "ml-0 bg-[#00000033]"} mt-[2px] overflow-hidden ${message.image ? "w-[-webkit-fill-available] p-0" : message.file ? "w-fit !rounded-lg bg-transparent p-0" : "w-fit px-4 py-2"}`}
        >
          <div>
            <h6
              className={`text-sm text-${userTokenPayload?.user_id === message.sender.user_id ? "white" : "black"} break-words`}
            >
              {message.message}
            </h6>
            {message.image && (
              <div
                className="relative aspect-square cursor-pointer"
                onClick={() => setSelectedImage(message.image)}
              >
                <Image
                  src={message.image}
                  alt="attachment"
                  fill
                  sizes="100%"
                  className="h-full w-full rounded-md object-cover object-center"
                />
              </div>
            )}

            {message.filename && message.file && (
              <div
                className="flex w-[230px] cursor-pointer items-center gap-2 rounded-lg border border-stroke bg-gray-2 px-4 py-4 dark:border-dark-4 dark:bg-dark-3 dark:text-white"
                onClick={() => window.open(message.file, "_blank")}
              >
                <svg
                  className="text- min-w-6 fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 11C13.2044 11 12.4413 10.6839 11.8787 10.1213C11.3161 9.55871 11 8.79565 11 8V4H7C6.46957 4 5.96086 4.21071 5.58579 4.58579C5.21071 4.96086 5 5.46957 5 6V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V11H14ZM12 8C12 8.53043 12.2107 9.03914 12.5858 9.41421C12.9609 9.78929 13.4696 10 14 10H17.59L12 4.41V8ZM7 3H12L19 10V19C19 19.7956 18.6839 20.5587 18.1213 21.1213C17.5587 21.6839 16.7956 22 16 22H7C6.20435 22 5.44129 21.6839 4.87868 21.1213C4.31607 20.5587 4 19.7956 4 19V6C4 5.20435 4.31607 4.44129 4.87868 3.87868C5.44129 3.31607 6.20435 3 7 3Z"
                    fill=""
                  />
                </svg>
                <p className="w-full overflow-hidden text-ellipsis text-dark dark:text-white">
                  {message.filename}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
