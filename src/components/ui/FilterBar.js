import Image from 'next/image'
import { useState } from 'react'

export default function FilterBar({
  sortingPopupIsOpen,
  handleSorting,
  handleClosePopup,
  handleSortingClick,
  handleFiltering,
  sortings,
  sorting,
  filters,
  filter,
}) {
  const [openFilter, setOpenFilter] = useState(false)

  function handleFilter(event) {
    const name = event.target.getAttribute('value')
    const value = event.target.getAttribute('name')
    handleFiltering({ name: name, value: value })
    setOpenFilter(false)
  }

  function handleOpenFilter() {
    setOpenFilter((prev) => !prev)
  }

  return (
    <>
      <div className='filter-bar'>
        <div className='filter'>
          <div className='filter-title' onClick={handleOpenFilter}>
            <div className='filter-text'>{filter.korName || filter.value}</div>
            <div className='filter-btn'>
              <Image
                src='icons/chevron-down.svg'
                width={20}
                height={20}
                alt='lead filter button'
              />
            </div>
          </div>
          {openFilter && (
            <li className='filter-list'>
              {filters.map((value) => (
                <div
                  key={value.name}
                  value={value.name}
                  name={value.korName}
                  onClick={handleFilter}
                  className={
                    filter.name === value.name
                      ? 'filter-option filter-selected'
                      : 'filter-option'
                  }
                >
                  {value.korName}
                </div>
              ))}
            </li>
          )}
        </div>
        <div className='btn-group'>
          <div className='search'>
            <Image
              src='icons/search.svg'
              width={20}
              height={20}
              alt='search button'
            />
          </div>
          <div className='sorting' onClick={handleSortingClick}>
            <Image
              src='icons/sorting.svg'
              width={20}
              height={20}
              alt='sorting button'
            />
          </div>
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
                      sorting === sorting.name
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
        .filter-bar {
          margin: 0 auto;
          margin-bottom: 10px;
          padding: 5px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          position: relative;
        }

        .filter {
          font-family: 'SUIT-600';
          display: flex;
          gap: 10px;
        }

        .filter-title {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }

        .filter-text {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .filter-btn {
          display: flex;
          align-items: center;
        }

        .filter-list {
          font-family: 'SUIT-400';
          font-size: 14px;
          background: white;
          position: absolute;
          text-align: start;
          left: 5px;
          top: 40px;
          width: 120px;
          border-radius: var(--border-radius);
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          overflow: hidden.;
        }

        .filter-option {
          height: fit-content;
          padding: 10px 20px;
          cursor: pointer;
        }

        .filter-selected {
          background: var(--selected-color);
        }

        .btn-group {
          padding: 4px 8px;
          cursor: pointer;

          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
        }

        .search {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .sorting {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .list-view__query--sorting__popup {
          width: 100px;
          position: relative;
          top: 110px;
          left: 575px;
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
