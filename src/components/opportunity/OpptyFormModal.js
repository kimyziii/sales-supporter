import { useEffect, useState } from 'react'
import OpptyForm from './OpptyForm'

export default function OpptyFormModal({ onUpsert, onCancel, selectedItem }) {
  const [data, setData] = useState({})

  useEffect(() => {
    if (selectedItem) {
      setData(selectedItem)
    }
  }, [])

  return (
    <>
      <div className='modal-container' onClick={onCancel} />
      <OpptyForm
        onUpsert={(upsertData, event) => onUpsert(upsertData, event)}
        selectedItem={data}
        onCancel={onCancel}
      />

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
      `}</style>
    </>
  )
}
