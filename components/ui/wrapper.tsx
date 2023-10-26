import React from "react";
import Header from "./header";
import Navigation from "./navigation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <>
      <div className="container">
        <Header />
        <Navigation />

        <ToastContainer />
        <main className="content">{children}</main>
      </div>

      <style jsx global>{`
        body {
          height: 100vh;
        }

        .container {
          display: flex;
          min-height: calc(100vh - 20px);
          height: fit-content;
          flex-direction: column;
        }

        .content {
          flex-grow: 1;
          width: 90%;
          margin: 0 auto;
          margin-top: 5px;
          display: flex;
          // overflow: scroll;
        }
      `}</style>
    </>
  );
}
