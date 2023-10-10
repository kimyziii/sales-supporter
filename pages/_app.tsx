import Header from "@/components/ui/header";
import ListView from "@/components/ui/list-view";
import Navigation from "@/components/ui/navigation";
import app from "../firebaseApp";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function MyApp() {
  const router = useRouter();
  const pathname = router.pathname;

  const [location, setLocation] = useState(pathname);
  useEffect(() => {
    setLocation(pathname);
  }, [pathname]);

  return (
    <>
      <div className="container">
        <Header />
        <Navigation />
        <div className="content">
          {location === "/" && <div>홈페이지</div>}
          {location !== "/" && <ListView pathname={pathname} />}
        </div>
      </div>

      <style jsx>{`
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

export default MyApp;
