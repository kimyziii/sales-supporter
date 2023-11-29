export default function FromButtonGroup({ children }) {
  return (
    <>
      <div className='btn--group'>{children}</div>
      <style jsx>{`
        .btn--group {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
      `}</style>
    </>
  )
}
