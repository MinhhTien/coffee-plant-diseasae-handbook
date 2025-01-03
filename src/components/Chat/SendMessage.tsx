"use client";
import React, {
  MutableRefObject,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase/firestore";
import useAuth from "@/contexts/useAuth";
import { useRouter } from "next/navigation";
import { notifyError } from "@/utils/toastify";
import Image from "next/image";
import useCloudinaryApi from "@/hooks/useCloudinary";

interface SendMessageProps {
  scroll: MutableRefObject<HTMLSpanElement | null>;
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>;
  hasImage: boolean;
  setHasFile: React.Dispatch<React.SetStateAction<boolean>>;
  hasFile: boolean;
}

const SendMessage = ({
  scroll,
  setHasImage,
  hasImage,
  setHasFile,
  hasFile,
}: SendMessageProps) => {
  const accessToken = localStorage.getItem("accessToken");

  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>("");
  const [file, setFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState(false);

  const [loading, setLoading] = useState(false);

  const { uploadCloudinary } = useCloudinaryApi();

  const { userTokenPayload } = useAuth();
  const router = useRouter();

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!accessToken) {
      router.push("/auth/signin");
      // notifyError("Cần phải đăng nhập để gửi tin nhắn");
      return;
    }

    if (message.trim() === "" && !image && !file) {
      return;
    }

    setLoading(true);

    if (message.trim() !== "") {
      const newMessage = {
        message: message.substring(0, 500),
        createdAt: serverTimestamp(),
        sender: userTokenPayload,
      };

      await addDoc(collection(db, "message"), newMessage);
      setMessage("");
      scroll.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to bottom
    }

    if (image && previewImage) {
      const response = await uploadCloudinary([image]);
      if (!response) {
        notifyError("Upload ảnh thất bại");
        return;
      } else {
        const image = response.secure_url;
        const newMessage = {
          image,
          createdAt: serverTimestamp(),
          sender: userTokenPayload,
        };
        await addDoc(collection(db, "message"), newMessage);
        setImage(null);
        setPreviewImage("");
        setHasImage(false);
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (file && previewFile) {
      console.log("in");
      const response = await uploadCloudinary([file]);
      if (!response) {
        notifyError("Upload file thất bại");
        return;
      } else {
        const file = response;
        const newMessage = {
          file: file.secure_url,
          filename:
            file.original_filename && file.format
              ? `${file.original_filename}.${file.format}`
              : file.public_id,
          createdAt: serverTimestamp(),
          sender: userTokenPayload,
        };
        await addDoc(collection(db, "message"), newMessage);
        setFile(null);
        setPreviewFile(false);
        setHasFile(false);
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      }
    }

    setLoading(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0] || null;

    if (!image) {
      return;
    }

    if (image.size > 5 * 1024 * 1024) {
      clearFile();
      event.target.value = "";
      return;
    }

    if (image) {
      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
      setHasImage(true);
    }

    event.target.value = "";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      clearFile();
      event.target.value = "";
      return;
    }

    if (file) {
      setFile(file);
      setPreviewFile(true);
      setHasFile(true);
    }

    event.target.value = "";
  };

  const clearFile = () => {
    setImage(null);
    setPreviewImage(null);
    setHasImage(false);

    setFile(null);
    setPreviewFile(false);
    setHasFile(false);
  };

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return (
    <form onSubmit={(event) => sendMessage(event)}>
      <input
        type="file"
        id="imageInput"
        className="hidden"
        accept="image/*"
        onInput={handleImageChange}
      />
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".pdf,.doc,.docx"
        onInput={handleFileChange}
      />
      <div className="flex w-full items-center gap-3">
        {!hasImage && !hasFile && (
          <>
            <button
              type="button"
              onClick={() => {
                const imageInput = document.getElementById(
                  "imageInput",
                ) as HTMLInputElement;
                if (imageInput) {
                  imageInput.click();
                }
              }}
              className="top-1/2 mt-auto -translate-y-1/2 text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary"
            >
              <svg
                className="text- fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V19C21 19.7956 20.6839 20.5587 20.1213 21.1213C19.5587 21.6839 18.7956 22 18 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V6C2 5.20435 2.31607 4.44129 2.87868 3.87868C3.44129 3.31607 4.20435 3 5 3ZM5 4C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V17.59L7.29 13.29L9.79 15.79L14.79 10.79L20 16V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H5ZM9.79 17.21L7.29 14.71L3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V17.41L14.79 12.21L9.79 17.21ZM7.5 6C8.16304 6 8.79893 6.26339 9.26777 6.73223C9.73661 7.20107 10 7.83696 10 8.5C10 9.16304 9.73661 9.79893 9.26777 10.2678C8.79893 10.7366 8.16304 11 7.5 11C6.83696 11 6.20107 10.7366 5.73223 10.2678C5.26339 9.79893 5 9.16304 5 8.5C5 7.83696 5.26339 7.20107 5.73223 6.73223C6.20107 6.26339 6.83696 6 7.5 6ZM7.5 7C7.10218 7 6.72064 7.15804 6.43934 7.43934C6.15804 7.72064 6 8.10218 6 8.5C6 8.89782 6.15804 9.27936 6.43934 9.56066C6.72064 9.84196 7.10218 10 7.5 10C7.89782 10 8.27936 9.84196 8.56066 9.56066C8.84196 9.27936 9 8.89782 9 8.5C9 8.10218 8.84196 7.72064 8.56066 7.43934C8.27936 7.15804 7.89782 7 7.5 7Z"
                  fill=""
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => {
                const fileInput = document.getElementById(
                  "fileInput",
                ) as HTMLInputElement;
                if (fileInput) {
                  fileInput.click();
                }
              }}
              className="top-1/2 mt-auto -translate-y-1/2 text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary"
            >
              <svg
                className="text- fill-current"
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
            </button>
          </>
        )}

        <div className="flex w-full flex-col gap-3">
          {previewImage && (
            <div className="relative h-20 w-20">
              <Image
                src={previewImage}
                alt="preview"
                fill
                className="select-none rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => clearFile()}
                className="absolute right-0 top-0 -translate-y-3 translate-x-3 rounded-full bg-white p-1 text-dark hover:bg-gray-2 hover:text-primary dark:bg-dark-5 dark:text-dark-6 dark:hover:text-primary"
              >
                <svg
                  className="text- fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 13.4L7.1 18.3C6.91667 18.4833 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4833 5.7 18.3C5.51667 18.1167 5.425 17.8833 5.425 17.6C5.425 17.3167 5.51667 17.0833 5.7 16.9L10.6 12L5.7 7.1C5.51667 6.91667 5.425 6.68334 5.425 6.4C5.425 6.11667 5.51667 5.88334 5.7 5.7C5.88333 5.51667 6.11667 5.425 6.4 5.425C6.68333 5.425 6.91667 5.51667 7.1 5.7L12 10.6L16.9 5.7C17.0833 5.51667 17.3167 5.425 17.6 5.425C17.8833 5.425 18.1167 5.51667 18.3 5.7C18.4833 5.88334 18.575 6.11667 18.575 6.4C18.575 6.68334 18.4833 6.91667 18.3 7.1L13.4 12L18.3 16.9C18.4833 17.0833 18.575 17.3167 18.575 17.6C18.575 17.8833 18.4833 18.1167 18.3 18.3C18.1167 18.4833 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4833 16.9 18.3L12 13.4Z"
                    fill=""
                  />
                </svg>
              </button>
            </div>
          )}

          {previewFile && (
            <div className="flex max-w-[230px] items-center justify-between gap-2 rounded-lg border border-stroke bg-gray-2 px-4 py-3 dark:border-dark-4 dark:bg-dark-3 dark:text-white">
              <div className="flex w-full max-w-[150px] items-center gap-2">
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
                <p className="overflow-hidden text-ellipsis text-nowrap text-dark dark:text-white">
                  {file?.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => clearFile()}
                className="rounded-full bg-gray-2 p-1 hover:bg-gray-1 hover:text-primary dark:bg-dark-3 dark:text-dark-6 hover:dark:bg-dark-4 dark:hover:text-primary"
              >
                <svg
                  className="text- fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 13.4L7.1 18.3C6.91667 18.4833 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4833 5.7 18.3C5.51667 18.1167 5.425 17.8833 5.425 17.6C5.425 17.3167 5.51667 17.0833 5.7 16.9L10.6 12L5.7 7.1C5.51667 6.91667 5.425 6.68334 5.425 6.4C5.425 6.11667 5.51667 5.88334 5.7 5.7C5.88333 5.51667 6.11667 5.425 6.4 5.425C6.68333 5.425 6.91667 5.51667 7.1 5.7L12 10.6L16.9 5.7C17.0833 5.51667 17.3167 5.425 17.6 5.425C17.8833 5.425 18.1167 5.51667 18.3 5.7C18.4833 5.88334 18.575 6.11667 18.575 6.4C18.575 6.68334 18.4833 6.91667 18.3 7.1L13.4 12L18.3 16.9C18.4833 17.0833 18.575 17.3167 18.575 17.6C18.575 17.8833 18.4833 18.1167 18.3 18.3C18.1167 18.4833 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4833 16.9 18.3L12 13.4Z"
                    fill=""
                  />
                </svg>
              </button>
            </div>
          )}

          <input
            type="text"
            placeholder="Aa"
            className="w-full rounded-full border border-stroke bg-gray-2 py-3 pl-5 pr-14 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          />
        </div>

        <button
          className={`top-1/2 mt-auto -translate-y-1/2 text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={loading}
        >
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
      </div>
    </form>
  );
};

export default SendMessage;
