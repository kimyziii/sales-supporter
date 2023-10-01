import React from "react";
import Header from "./header";
import Navigation from "./navigation";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div>
      <div className="container">
        <Header />
        <Navigation />
        <main className="content">{children}</main>
      </div>

      <style jsx global>{`
        body {
          height: 100vh;
        }

        .container {
          display: flex;
          height: calc(100vh - 100px);
          flex-direction: column;
        }

        .content {
          flex-grow: 1;
          display: flex;
          padding: 10px 40px;
          overflow: scroll;
        }
      `}</style>
    </div>
  );
}
