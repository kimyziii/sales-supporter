export default function FormField({
  label,
  value,
  type,
  onChange,
  name,
  required,
  column = '2',
}) {
  return (
    <>
      {type === 'textarea' && (
        <>
          <div className='textarea'>
            <div className='textarea--label'>{label}</div>
            {required && (
              <textarea
                className='textarea--value'
                name={name}
                value={value}
                onChange={onChange}
                required
              ></textarea>
            )}
            {!required && (
              <textarea
                className='textarea--value'
                name={name}
                value={value}
                onChange={onChange}
              ></textarea>
            )}
          </div>
        </>
      )}

      {type !== 'textarea' && column === '2' && (
        <>
          <div className='input'>
            <div className='label'>{label}</div>
            {required && (
              <input
                type={type}
                className='value'
                name={name}
                value={value}
                onChange={onChange}
                required
              ></input>
            )}
            {!required && (
              <input
                type={type}
                className='value'
                name={name}
                value={value}
                onChange={onChange}
              ></input>
            )}
          </div>
        </>
      )}

      {type !== 'textarea' && column === '1' && (
        <>
          <div className='input_1col'>
            <div className='label'>{label}</div>
            {required && (
              <input
                type={type}
                className='value'
                name={name}
                value={value}
                onChange={onChange}
                required
              ></input>
            )}
            {!required && (
              <input
                type={type}
                className='value'
                name={name}
                value={value}
                onChange={onChange}
              ></input>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        input,
        textarea {
          border: none;
          background: var(--button-gray-color);
          padding: 6px 12px;
        }

        input:focus,
        textarea:focus {
          outline: none;
        }

        .input {
          width: calc(100% / 2 - 10px);
          display: flex;
          margin-right: 10px;
          font-family: 'SUIT-400';
          align-items: center;
          gap: 10px;
        }

        .input_1col {
          width: calc(100% - 10px);
          display: flex;
          margin-right: 10px;
          font-family: 'SUIT-400';
          align-items: center;
          gap: 10px;
        }

        .textarea {
          width: calc(100% - 10px);
          display: flex;
          margin-right: 10px;
          font-family: 'SUIT-400';
          align-items: center;
          gap: 10px;
        }

        .label {
          width: 100px;
          color: var(--secondary-text-color);
          font-size: var(--caption);
        }

        .value {
          width: calc(100% - 100px);
          font-size: var(--text-sm);
          min-height: 35px;
          border-radius: var(--border-radius);
        }

        .textarea--label {
          width: calc(100% - (100% - 100px) - 5px);
          color: var(--secondary-text-color);
          font-size: var(--caption);
        }

        .textarea--value {
          width: calc(100% - 100px);
          font-size: var(--text-sm);
          min-height: fit-content;
          border-radius: var(--border-radius);
          font-family: 'SUIT-400';
        }
      `}</style>
    </>
  )
}
