import { useEffect } from "react";
import "./Toast.css";

interface ToastNotificationProps {
  setShow: (arg: boolean) => void;
  show: boolean;
  title?: string;
}

const ToastNotification = ({
  setShow,
  show,
  title = "Success",
}: ToastNotificationProps) => {
  // auto-hide logic
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  return show ? (
    <div className="custom-toast">
      <div className="toast-content">
        <strong className="toast-title">{title}</strong>
      </div>
    </div>
  ) : null;
};

export default ToastNotification;
