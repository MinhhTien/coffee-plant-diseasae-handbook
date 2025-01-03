"use client";
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import SendMessage from "./SendMessage";
import { useCallback, useEffect, useRef, useState } from "react";
import { db } from "@/utils/firebase/firestore";
import { redirect } from "next/navigation";
import Message from "./Message";
import ImageModal from "./ImageModal";

export default function ChatBox() {
  const scrollRef = useRef<HTMLSpanElement | null>(null);
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [hasImage, setHasImage] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const chatBoxHeight = hasImage
    ? "h-[calc(100vh-474px)] 2xsm:h-[calc(100vh-476px)] sm:h-[calc(100vh-456px)] lg:h-[calc(100vh-454px)] xl:h-[calc(100vh-472px)] 2xl:h-[calc(100vh-494px)]"
    : hasFile
      ? "h-[calc(100vh-440px)] 2xsm:h-[calc(100vh-442px)] sm:h-[calc(100vh-422px)] lg:h-[calc(100vh-420px)] xl:h-[calc(100vh-438px)] 2xl:h-[calc(100vh-470px)]"
      : "h-[calc(100vh-382px)] 2xsm:h-[calc(100vh-384px)] sm:h-[calc(100vh-364px)] lg:h-[calc(100vh-362px)] xl:h-[calc(100vh-380px)] 2xl:h-[calc(100vh-402px)]";

  //   const checkExistChatRoom = async () => {
  //     const q = query(
  //       collection(db, "chat-room"),
  //       where("Document ID", "==", params.id),
  //     );

  //     const querySnapshot = await getDocs(q);
  //     if (!querySnapshot.empty) {
  //       setChatRoomId(querySnapshot.docs[0].id);
  //     } else {
  //       const docRef = await addDoc(collection(db, "chat-room"), {
  //         user: [{}],
  //         createdAt: serverTimestamp(),
  //         updatedAt: serverTimestamp(),
  //       });

  //       setChatRoomId(docRef.id);
  //     }
  //   };

  const loadMessages = useCallback(() => {
    const messageQuery = query(
      collection(db, "message"),
      //   where("chatRoomId", "==", chatRoomId),
      limit(10000),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
      const fetchedMessages: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt,
      );
      setMessages(sortedMessages);
    });

    return unsubscribe;
  }, []);

  //   useEffect(() => {
  //     checkExistChatRoom();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  useEffect(() => {
    const unsubscribe = loadMessages();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [loadMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const shouldDisplayTimestamp = (
    prevTimestamp: Date | null,
    currentTimestamp: Date,
    minutesGap = 30,
  ) => {
    if (!prevTimestamp) return true; // Show timestamp if there's no previous timestamp

    // Check if the messages are on different days
    const isNewDay = !isSameDay(currentTimestamp, prevTimestamp);

    // Check if the gap between messages exceeds the specified minutes
    const timeDifference =
      (currentTimestamp.getTime() - prevTimestamp.getTime()) / (1000 * 60);
    const isLargeGap = timeDifference >= minutesGap;

    // Show timestamp if it's a new day or if there's a large time gap
    return isNewDay || isLargeGap;
  };

  const isSameDay = (date1: Date, date2: Date | null) => {
    if (!date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const getMessagePosition = (
    index: number,
    messages: DocumentData[],
    showDateHeader: boolean,
    showTimestamp: boolean,
  ) => {
    const currentMessage = messages[index];
    const prevMessage = messages[index - 1];
    const nextMessage = messages[index + 1];

    const isFirstMessage =
      index === 0 ||
      (prevMessage &&
        prevMessage.sender.user_id !== currentMessage.sender.user_id) ||
      (prevMessage &&
        currentMessage.createdAt &&
        shouldDisplayTimestamp(
          prevMessage.createdAt?.toDate(),
          currentMessage.createdAt?.toDate(),
        ));

    const isLastMessage =
      index === messages.length - 1 ||
      (nextMessage &&
        nextMessage.sender.user_id !== currentMessage.sender.user_id) ||
      (nextMessage &&
        currentMessage.createdAt &&
        shouldDisplayTimestamp(
          currentMessage.createdAt?.toDate(),
          nextMessage.createdAt?.toDate(),
        ));

    if (showDateHeader || showTimestamp) {
      if (isFirstMessage && isLastMessage) return "after-header-single";
      if (isFirstMessage) return "after-header-first";
    }

    if (isFirstMessage && isLastMessage) return "single";
    if (isFirstMessage) return "first";
    if (isLastMessage) return "last";
    return "middle";
  };

  return (
    <>
      <div className="h-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-black/25 px-4 py-6 md:px-6 xl:px-9">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Chat cộng đồng
          </h4>
        </div>
        <div className="overflow-hidden">
          <div className={`${chatBoxHeight} overflow-auto px-6`}>
            {messages.map((message, index) => {
              const messageDate = message.createdAt?.toDate() || new Date();
              const previousMessage = messages[index - 1];
              const previousMessageDate =
                previousMessage?.createdAt?.toDate() || null;

              const showDateHeader =
                !isToday(messageDate) &&
                (!previousMessageDate ||
                  !isSameDay(previousMessageDate, messageDate) ||
                  shouldDisplayTimestamp(previousMessageDate, messageDate));

              const showTimestamp =
                isToday(messageDate) ||
                isSameDay(messageDate, previousMessageDate)
                  ? shouldDisplayTimestamp(previousMessageDate, messageDate)
                  : false;

              const position = getMessagePosition(
                index,
                messages,
                showDateHeader,
                showTimestamp,
              );

              return (
                <div className="flex flex-col" key={message.id}>
                  {showDateHeader && (
                    <p className="my-3 text-center text-xs">
                      {(() => {
                        const today = new Date();
                        const timeDifference =
                          today.getTime() - messageDate.getTime();
                        const daysDifference =
                          timeDifference / (1000 * 60 * 60 * 24);

                        if (daysDifference <= 7) {
                          // Show only weekday, hour, and minute for messages within the last 7 days
                          return messageDate
                            .toLocaleString("vi-VN", {
                              weekday: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            .replace("Th ", "T");
                        } else {
                          // Show full format "hh:mm dd Tháng MM, yyyy" for messages older than 7 days
                          return `${messageDate.toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })} ${messageDate.getDate()} Tháng ${messageDate.getMonth() + 1}, ${messageDate.getFullYear()}`;
                        }
                      })()}
                    </p>
                  )}
                  {showTimestamp && !showDateHeader && (
                    <p className="my-3 text-center text-xs">
                      {messageDate.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                  <Message
                    message={message}
                    position={position}
                    setSelectedImage={setSelectedImage}
                  />
                </div>
              );
            })}
            <span ref={scrollRef} />
          </div>
        </div>
        <div className="p-4">
          <SendMessage
            scroll={scrollRef}
            setHasImage={setHasImage}
            hasImage={hasImage}
            setHasFile={setHasFile}
            hasFile={hasFile}
          />
        </div>
      </div>
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
