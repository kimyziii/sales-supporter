import Image from 'next/image'

export default function FilterBar({
  sortingPopupIsOpen,
  handleSorting,
  sortingFilter,
  handleClosePopup,
  handleSortingClick,
  sortings,
}) {
  return (
    <>
      <div className='list-view__query'>
        <div className='list-view__query--search'>
          <Image
            src='icons/search.svg'
            width={20}
            height={20}
            alt='search button'
          />
        </div>
        <div className='list-view__query--sorting' onClick={handleSortingClick}>
          <Image
            src='icons/sorting.svg'
            width={20}
            height={20}
            alt='sorting button'
          />
        </div>
        {sortingPopupIsOpen && (
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '5vw',
              width: '90vw',
              minHeight: '90vh',
              marginTop: '5vh',
              borderRadius: 'var(--border-radius)',
            }}
            onClick={handleClosePopup}
          >
            <div className='list-view__query--sorting__popup'>
              <ul>
                {sortings.map((sorting) => (
                  <li
                    key={sorting.name}
                    onClick={handleSorting}
                    className={
                      sortingFilter === sorting.name
                        ? 'query-sorting-li__selected query-sorting-li'
                        : 'query-sorting-li'
                    }
                    name={sorting.name}
                  >
                    {sorting.korName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .list-view__query {
          margin: 0 auto;
          margin-bottom: 5px;
          padding: 5px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          position: relative;
        }

        .list-view__query--search {
          width: 95%;
          padding: 4px 8px;
          cursor: pointer;
        }

        .list-view__query--sorting {
          width: 5%;
          cursor: pointer;
          padding-right: 25px;
        }

        .list-view__query--sorting__popup {
          width: 100px;
          position: relative;
          top: 110px;
          left: 438px;
          text-align: right;
          background: white;
          border-radius: var(--border-radius);
          font-size: var(--text-sm);
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          overflow: hidden;
        }

        .list-view__query--sorting__popup ul {
          display: flex;
          flex-direction: column;
        }

        .query-sorting-li {
          cursor: pointer;
          padding: 10px 20px;
          text-align: center;
        }

        .query-sorting-li__selected {
          background: var(--selected-color);
        }
      `}</style>
    </>
  )
}
