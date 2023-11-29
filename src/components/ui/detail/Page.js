export default function DetailPage({ children }) {
  return (
    <>
      <div className='detail'>{children}</div>
      <style jsx>{`
        .detail {
          background-color: white;
          padding: 10px;
          margin: 0 auto;
          border-radius: var(--border-radius);

          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </>
  )
}
