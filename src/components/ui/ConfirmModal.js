const ConfirmModal = ({ action, onDelete, onCancel }) => {
  const DeleteModal = () => {
    return (
      <div className='modal-delete'>
        <div>해당 리드를 삭제하시겠습니까?</div>

        <style jsx>{`
          .modal-delete {
            display: flex;
            place-items: center;
          }
        `}</style>
      </div>
    )
  }

  const modalContents = {
    delete: <DeleteModal />,
  }

  function selectAction() {
    if (action === 'delete') onDelete()
  }

  return (
    <>
      <div className='modal-container' onClick={onCancel} />
      <div
        className='modal'
        style={{
          width: '30%',
          left: `calc((100vw - 30%) / 2)`,
          top: '25%',
        }}
      >
        <div className='modal-container__content'>{modalContents[action]}</div>
        <div className='modal-container__btn--group'>
          <button
            onClick={selectAction}
            className='modal-container__btn--confirm'
          >
            확인
          </button>
          <button onClick={onCancel} className='modal-container__btn--cancel'>
            취소
          </button>
        </div>
      </div>

      <style jsx>{`
        * {
          font-family: 'SUIT-400';
        }

        .modal-container {
          position: absolute;
          top: 0;
          left: 5vw;
          width: 90vw;

          min-height: 90vh;
          max-height: 90vh;
          margin-top: 5vh;
          background: rgba(0, 0, 0, 0.7);
          border-radius: var(--border-radius);
        }

        .modal {
          position: absolute;
          overflow-y: auto;
          min-height: 15%;
          max-height: 83%;
          background: white;
          border-radius: var(--border-radius);
          z-index: 100;
        }

        .modal-container__content {
          padding: 20px 30px 20px 30px;
        }

        .modal-container__btn--group {
          display: flex;
          justify-content: flex-end;
          padding-right: 20px;
          padding-bottom: 20px;
          gap: 10px;
        }

        .modal-container__btn--group button {
          border: none;
          padding: 8px 20px;
          font-family: 'SUIT-600';
          cursor: pointer;
          border-radius: var(--border-radius);
        }

        .modal-container__btn--confirm {
          background: var(--selected-color);
        }
      `}</style>
    </>
  )
}

export default ConfirmModal
