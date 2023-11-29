export default function FormButton({ onClick, value, type }) {
  return (
    <>
      <button onClick={onClick} className={`${type} button`}>
        {value}
      </button>
      <style jsx>{`
        .button {
          border: none;
          padding: 8px 20px;
          font-family: 'SUIT-600';
          cursor: pointer;
          border-radius: var(--border-radius);
        }

        .confirm {
          background: var(--selected-color);
        }

        .cancel {
          background: var(--button-gray-color: #f0f0f0;);
        }
      `}</style>
    </>
  )
}
