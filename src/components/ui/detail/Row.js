export default function DetailRow({ children, textArea }) {
  const className = textArea ? 'row__textarea' : 'row'
  return (
    <>
      <div className={className}>{children}</div>
      <style jsx>{`
        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          justify-content: center;
          margin-bottom: 5px;
          width: calc(100% - 40px);
        }

        .row__textarea {
          display: flex;
          flex-direction: column;
          width: calc(100% - 40px);
        }
      `}</style>
    </>
  )
}
