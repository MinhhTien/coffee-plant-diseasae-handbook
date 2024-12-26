import useAuth from "@/contexts/useAuth";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";

interface MessageProps {
  message: DocumentData;
  position:
    | "single"
    | "first"
    | "middle"
    | "last"
    | "after-header-first"
    | "after-header-single";
}

const Message = ({ message, position }: MessageProps) => {
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
      {["after-header-single", "first", "single", "after-header-single"].find(
        (pos) => pos === position,
      ) &&
        userTokenPayload?.user_id !== message.sender.user_id && (
          <p className={`ml-11 text-xs ${marginTop}`}>{message.sender.name}</p>
        )}
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8 min-w-8">
          <Image
            src={message.sender.picture}
            fill
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
          className={`w-fit max-w-[500px] ${userTokenPayload?.user_id === message.sender.user_id ? borderRadiusRight : borderRadiusLeft} 
        ${userTokenPayload?.user_id === message.sender.user_id ? "ml-auto bg-[#5750F1]" : "ml-0 bg-[#00000033]"} mt-[2px] overflow-hidden px-4 py-2`}
        >
          <div className="flex flex-col gap-1">
            <h6
              className={`text-sm text-${userTokenPayload?.user_id === message.sender.user_id ? "white" : "black"} break-words`}
            >
              {message.message}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
