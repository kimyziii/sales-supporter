export default function FormRow({ children }) {
  return (
    <>
      <div className='row'>{children}</div>
      <style jsx>{`
        .row {
          display: flex;
          flex-direction: row;
          margin-left: 10px;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  )
}
