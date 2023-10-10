import React from "react";

interface ModalProp {
  children: React.ReactNode;
  closeModal: () => void;
}

function Modal({ children, closeModal }: ModalProp) {
  return (
    <div className="modal-wrapper">
      <div className="modal-backdrop" onClick={closeModal}></div>
      <div className="modal">
        <div className="header">새로 만들기</div>
        <div className="content">{children}</div>
      </div>

      <style jsx>{`
        .modal-wrapper {
          position: fixed;
          width: inherit;
          display: flex;
          justify-content: center;
        }

        .modal-backdrop {
          display: block;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: black;
          opacity: 0.2;
          z-index: 99;
        }

        .modal {
          background-color: white;
          z-index: 100;
          width: 70%;
          display: fixed;
          top: 30px;
          height: fit-content;
          margin: 0 auto;
          border-radius: 7px;
        }

        .header {
          height: 5vh;
          line-height: 5vh;
          text-align: center;
          border-bottom: 1px solid #dedede;
          font-size: 20px;
          font-weight: 600;
        }

        .content {
          display: flex;
          width: 100%;
          height: fit-content;
          justify-content: center;
          max-height: 1000px;
          // overflow-y: scroll;
        }
      `}</style>
    </div>
  );
}

export default Modal;
