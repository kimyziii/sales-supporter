export default function DetailSection({ children, sectionTitle, lastChild }) {
  const className = !lastChild ? 'section' : 'section last'

  return (
    <>
      <div className={className}>
        <div className='section__title'>{sectionTitle}</div>
        {children}
      </div>
      <style jsx>{`
        .section {
          margin-bottom: 7px;
        }

        .last {
          margin-bottom: 0;
        }

        .section__title {
          border-radius: var(--border-radius);
          padding: 7px 10px;
          background-color: var(--tertiary-color);
          color: white;
          font-family: 'GyeonggiTitleM';
        }
      `}</style>
    </>
  )
}
