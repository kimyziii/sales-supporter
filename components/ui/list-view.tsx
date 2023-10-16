import React from "react";
import Modal from "./modal/modal";
import NewLead from "../lead/lead-new";

import { useEffect, useState } from "react";
import { db } from "@/firebaseApp";
import { collection, doc, getDocs } from "firebase/firestore";

interface ListViewProps {
  pathname: string;
}

export default function ListView({ pathname }: ListViewProps) {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [nullData, setNullData] = useState(false);

  useEffect(() => {
    if (pathname === "/") setName("홈");
    if (pathname === "/lead") setName("리드");
    if (pathname === "/account") setName("고객");
    if (pathname === "/contact") setName("연락처");
    if (pathname === "/opportunity") setName("기회");
  }, [pathname]);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <Modal closeModal={handleCloseModal}>
          {pathname === "/lead" && <NewLead closeModal={handleCloseModal} />}
        </Modal>
      )}
      <div className="list-view">
        <div className="list-view__header">
          <button className="list-view__button--change">
            <div>모든 {name}</div>
            <img src="/icons/chevron-down.svg" style={{ width: "15px" }} />
          </button>
          <button className="list-view__button--new" onClick={handleOpenModal}>
            새로 만들기
          </button>
        </div>

        {/* data list view */}
        {nullData && <p>데이터가 없습니다.</p>}

        <style jsx>{`
          .list-view {
            width: 100%;
            border: 1px solid #dedede;
            border-radius: 7px;
            padding: 16px;
            margin: 0 auto;
            margin-top: 5px;
            display: flex;
            flex-direction: column;
          }

          .list-view__header {
            width: 100%;
            height: 35px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }

          .list-view__button--change {
            border: none;
            background-color: transparent;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;

            display: flex;
            gap: 10px;
            align-items: center;
          }

          .list-view__button--new {
            border: 1px solid gray;
            background-color: transparent;
            color: black;
            padding: 8px 14px;
            border-radius: 7px;
            cursor: pointer;
          }
        `}</style>
      </div>
    </>
  );
}
