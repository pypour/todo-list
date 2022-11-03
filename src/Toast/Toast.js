import toast from "react-simple-toasts";
import "./Toast.css";

const showToast = (message, type) => {
  toast(message, { time: 3000, className: type });
};

export default showToast;
