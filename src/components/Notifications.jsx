import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "text-lg font-semibold bg-green-500 text-white rounded-lg shadow-lg",
    });
}

export const notifyError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "text-lg font-semibold bg-red-500 text-white rounded-lg shadow-lg",
    });
}