export default function AccRecordCard({
  selectedObj,
  handleRecordClick,
  handleOpenModal,
  sortingFilter,
  data,
}) {
  return (
    <>
      <ul className='record-list'>
        {data.map((record) => (
          <li
            key={record.id}
            name={record.id}
            className={
              record.id === selectedObj?.id
                ? 'record-card record-card__selected'
                : 'record-card'
            }
            onClick={handleRecordClick}
          >
            <div className='record-card__title'>
              <div className='record-card__title-wrapper'>
                <div className='record-card__title--name'>{record.name}</div>
              </div>
              <div className='record-card-btn__group'>
                <div onClick={() => handleOpenModal('update', record.id)}>
                  <img src='icons/edit.svg' />
                </div>
                <div onClick={() => handleOpenModal('delete', record.id)}>
                  <img src='icons/delete.svg' />
                </div>
              </div>
            </div>

            <div className='record-card__summary'>
              <span>{record.phn_no}</span>
              <span> / </span>
              <span>{record.hm_url}</span>
              <div>{record.adres}</div>
            </div>

            <div className='record-card__system'>
              {sortingFilter !== 'modifiedAt' && <div>{record.createdAt}</div>}
              {sortingFilter === 'modifiedAt' && <div>{record.modifiedAt}</div>}
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .record-card {
          background-color: var(--secondary-color);
          border-radius: var(--border-radius);
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px;
        }

        .record-card * {
          pointer-events: none;
        }

        .record-card__selected {
          background-color: var(--selected-color);
        }

        .record-card__title {
          display: flex;
          justify-content: space-between;
        }

        .record-card__title-wrapper {
          display: flex;
          gap: 10px;
          font-size: var(--text-sm);
          align-items: end;
        }

        .record-card__title--company {
          font-family: 'SUIT-400';
          font-size: var(--caption);
          color: darkgray;
        }

        .record-card__title--name {
          font-family: 'SUIT-600';
        }

        .record-card-btn__group {
          display: flex;
          flex-direction: row;
          gap: 7px;
        }

        .record-card-btn__group div {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          cursor: pointer;
          pointer-events: auto;
        }

        .record-card-btn__group img {
          width: 15px;
        }

        .record-card__summary {
          font-size: var(--text-sm);
          font-family: 'SUIT-400';
        }

        .record-card__summary div {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .record-card__system {
          font-size: var(--caption);
          color: var(--secondary-text-color);
          text-align: right;
        }

        .record-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </>
  )
}
