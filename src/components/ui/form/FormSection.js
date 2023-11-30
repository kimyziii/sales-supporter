export default function FormSection({ children, title }) {
  return (
    <>
      <div className='section'>
        {title && <div className='section-title'>{title}</div>}
        {children}
      </div>
      <style jsx>{`
        .section {
          width: 100%;
          margin-bottom: 20px;
        }

        .section-title {
          border-radius: var(--border-radius);
          padding: 7px 10px;
          background-color: var(--tertiary-color);
          color: white;
          font-family: 'GyeonggiTitleM';
          margin-bottom: 15px;
        }
      `}</style>
    </>
  )
}
