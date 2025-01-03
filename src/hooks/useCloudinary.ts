import { notifyError } from "@/utils/toastify";
import { useCallback } from "react";

const useCloudinaryApi = () => {
  const NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const NEXT_PUBLIC_CLOUDINARY_UPLOAD_API =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_API;

  const generateUniqueUploadId = () => {
    return `uqid-${Date.now()}`;
  };
  const uploadCloudinary = useCallback(
    async (files: File[]) => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
        if (
          NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
          NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        ) {
          formData.append("cloud_name", NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
          formData.append(
            "upload_preset",
            NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          );
        } else {
          notifyError("Cloudinary configuration is missing");
          return;
        }
        const contentRange = `bytes 0-${files[i].size - 1}/${files[i].size}`;
        const headers = {
          "X-Unique-Upload-Id": generateUniqueUploadId(),
          "Content-Range": contentRange,
        };
        try {
          if (!NEXT_PUBLIC_CLOUDINARY_UPLOAD_API) {
            notifyError("Cloudinary upload API is missing");
            return;
          }
          const response = await fetch(NEXT_PUBLIC_CLOUDINARY_UPLOAD_API, {
            method: "POST",
            body: formData,
            headers: headers,
          });
          if (!response.ok) {
            notifyError("Upload ảnh thất bại");
            return;
          } else {
            return response.json();
          }
        } catch (error) {
          notifyError("Upload ảnh thất bại");
        }
      }
    },
    [
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_API,
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    ],
  );

  return { uploadCloudinary };
};

export default useCloudinaryApi;
