export default function DetailField({ label, value }) {
  return (
    <>
      <div className='field'>
        <div className='label'>{label}</div>
        <div className='value'>{value}</div>
      </div>
      <style jsx>{`
        .field {
          width: calc(100% - 40px);
          display: grid;
          gap: 10px;
          margin: 10px 20px 0 20px;
          align-items: center;
          font-family: 'SUIT-400';
          word-break: break-all;
        }

        .label {
          color: var(--secondary-text-color);
          font-size: var(--caption);
          display: flex;
          align-items: center;
        }

        .value {
          font-size: var(--text-sm);
          min-height: 20px;
        }
      `}</style>
    </>
  )
}
