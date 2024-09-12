"use client";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

type ToastProps = {
  children: ReactNode;
};

const ToastProvider = ({ children }: ToastProps) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ToastProvider;
