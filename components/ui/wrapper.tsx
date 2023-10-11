import React from "react";
import Header from "./header";
import ListView from "./list-view";
import Navigation from "./navigation";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <>
      <div className="container">
        <Header />
        <Navigation />
        {/* <ListView /> */}
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
