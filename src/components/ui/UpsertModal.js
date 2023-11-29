export default function UpsertModal({ children }) {
  return (
    <>
      <div className='modal' style={{ left: `calc((100vw - 67%) / 2)` }}>
        {children}
      </div>
      <style jsx>{`
        .modal {
          position: absolute;
          overflow-y: auto;
          min-height: 15%;
          max-height: 83%;
          background: white;
          border-radius: var(--border-radius);
          z-index: 100;
          width: 67%;
          top: 10%;
        }
      `}</style>
    </>
  )
}
