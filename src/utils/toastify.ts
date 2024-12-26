import { Bounce, ToastOptions, toast } from "react-toastify";

const Emmiter: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const notifyError = (msg: string) => {
  toast.dismiss();
  toast.error(msg, Emmiter);
};

export const notifyLoading = () => {
  toast.loading("Đang tải...");
};

export const notifySuccess = (msg: string) => {
  toast.dismiss();
  toast.success(msg, Emmiter);
};

export const notifyInfo = (msg: string) => {
  toast.dismiss();
  toast.info(msg, Emmiter);
};

export const notify = (msg: string) => {
  toast.dismiss();
  toast(msg, Emmiter);
};
