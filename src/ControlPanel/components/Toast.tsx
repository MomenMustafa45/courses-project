import { useEffect } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import "../styles/Toast.css"

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const iconStyle = type === "SUCCESS" ? "icon bg-green-500" : "icon bg-red-500";
  const lineStyle = type === 'SUCCESS' ? "line border-t-2 border-green-500" : "line border-t-2 border-red-500";
  const innerStyle = type === 'SUCCESS' ? "inner-line bg-green-500" : "inner-line bg-red-500";

  return (
    <div className="my-toast">
      <div className={`${iconStyle} p-2 rounded-full text-white`}>
        {type === "SUCCESS"
          ? <IoMdCheckmark />
          : <BsExclamationLg />}
      </div>
      <p className="text-gray-500">
        {message}
      </p>
      <div className={lineStyle}>
        <div className={`${innerStyle} h-1`} style={{ width: "100%" }}></div>
      </div>
    </div>
  );
};