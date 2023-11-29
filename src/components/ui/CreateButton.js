import Image from 'next/image'

export default function CreateButton({ onClick, object }) {
  return (
    <>
      <div className='list-view__btn-create' onClick={onClick}>
        <Image
          src='icons/new-button.svg'
          width={20}
          height={20}
          alt='create button'
        />
        <div>New {object}</div>
      </div>

      <style jsx>{`
        * {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px 0;
          padding: 20px 16px;
          height: 18px;
          background: var(--tertiary-color);
          border-radius: var(--border-radius);
          font-family: 'SUIT-600';
          font-size: var(--text-sm);
          color: white;
          margin-bottom: 10px;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
