import Image from "next/image";
import React from "react";

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageUrl,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="z-1000 fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
      >
        <Image
          src={imageUrl}
          alt="Full view"
          width={5000}
          height={5000}
          className="h-[min(100svh,100vw)] max-h-full w-full max-w-full select-none"
        />
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-2 top-2 rounded-full bg-white p-1 text-dark hover:text-primary dark:bg-dark-3 dark:text-dark-6 dark:hover:text-primary"
      >
        <svg
          className="text- fill-current"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill=""
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 13.4L7.1 18.3C6.91667 18.4833 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4833 5.7 18.3C5.51667 18.1167 5.425 17.8833 5.425 17.6C5.425 17.3167 5.51667 17.0833 5.7 16.9L10.6 12L5.7 7.1C5.51667 6.91667 5.425 6.68334 5.425 6.4C5.425 6.11667 5.51667 5.88334 5.7 5.7C5.88333 5.51667 6.11667 5.425 6.4 5.425C6.68333 5.425 6.91667 5.51667 7.1 5.7L12 10.6L16.9 5.7C17.0833 5.51667 17.3167 5.425 17.6 5.425C17.8833 5.425 18.1167 5.51667 18.3 5.7C18.4833 5.88334 18.575 6.11667 18.575 6.4C18.575 6.68334 18.4833 6.91667 18.3 7.1L13.4 12L18.3 16.9C18.4833 17.0833 18.575 17.3167 18.575 17.6C18.575 17.8833 18.4833 18.1167 18.3 18.3C18.1167 18.4833 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4833 16.9 18.3L12 13.4Z"
            fill=""
          />
        </svg>
      </button>
    </div>
  );
};

export default ImageModal;
