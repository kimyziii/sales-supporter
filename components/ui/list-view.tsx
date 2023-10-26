import Modal from './modal/modal'
import NewLead, { phoneFormatter } from '../lead/lead-new'

import { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebaseApp'
import Link from 'next/link'

interface ListViewProps {
  pathname: string
}

export interface LeadProps {
  id?: string
  contactName: string
  title?: string
  email: string
  phone: string
  companyName: string
  industry?: string
  employeeNumber?: number
  leadSource: string
  leadStatus: string
  productInterest?: string
  description?: string
  platform: string
  createdAt: string
}

function formatCurrentTime() {
  const now = new Date()

  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()

  let hours: string | number = now.getHours()
  const minutes = now.getMinutes()

  let amOrPm = '오전'
  if (hours >= 12) {
    amOrPm = '오후'
    if (hours > 12) {
      hours -= 12
    }
  }

  hours = hours.toString().padStart(2, '0')

  const formattedMonth = String(month).padStart(2, '0')
  const formattedDay = String(day).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')

  const formattedTime = `${year}년 ${formattedMonth}월 ${formattedDay}일 ${amOrPm} ${hours}:${formattedMinutes}`

  return formattedTime
}

export default function ListView({ pathname }: ListViewProps) {
  const [name, setName] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<LeadProps[]>([])

  useEffect(() => {
    if (pathname === '/') setName('홈')
    if (pathname === '/lead') setName('리드')
    if (pathname === '/account') setName('고객')
    if (pathname === '/contact') setName('연락처')
    if (pathname === '/opportunity') setName('기회')
  }, [pathname])

  async function getLeads() {
    setData([])

    let postsRef = collection(db, 'lead')
    const queryRef = query(postsRef, orderBy('createdAt'))
    const datas = await getDocs(queryRef)

    datas?.forEach((doc) => {
      const dataObj = {
        ...doc.data(),
        phone: phoneFormatter(doc.data().phone),
        id: doc.id,
      }
      setData((prev) => [...prev, dataObj as LeadProps])
    })
  }

  useEffect(() => {
    getLeads()
  }, [])

  async function handleSubmitForm(formData: LeadProps) {
    const data = { ...formData, createdAt: formatCurrentTime() }
    await addDoc(collection(db, 'lead'), data)
      .then(() => handleCloseModal())
      .then(() => getLeads())
  }

  function handleOpenModal() {
    setIsOpen(true)
  }

  function handleCloseModal() {
    setIsOpen(false)
  }
  return (
    <>
      {isOpen && (
        <Modal closeModal={handleCloseModal}>
          {pathname === '/lead' && (
            <NewLead
              closeModal={handleCloseModal}
              submitForm={(formData) => {
                handleSubmitForm(formData)
              }}
            />
          )}
        </Modal>
      )}
      <div className='list-view'>
        <div className='list-view__header'>
          <button className='list-view__button--change'>
            <div>모든 {name}</div>
            <img src='/icons/chevron-down.svg' style={{ width: '15px' }} />
          </button>
          <button className='list-view__button--new' onClick={handleOpenModal}>
            새로 만들기
          </button>
        </div>

        {data?.length === 0 ? (
          <p>데이터가 없습니다.</p>
        ) : (
          <table className='rwd-table'>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Contact Name</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Lead Status</th>
                <th>Created At</th>
              </tr>
              {data?.map((lead) => (
                <tr key={`${lead.id}`}>
                  <td data-th='Title'>
                    <Link
                      href={`/lead/${lead?.id}`}
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      {lead.title}
                    </Link>
                  </td>
                  <td data-th='Contact Name'>{lead.contactName}</td>
                  <td data-th='Company Name'>{lead.companyName}</td>
                  <td data-th='Email'>{lead.email}</td>
                  <td data-th='Phone'>{lead.phone}</td>
                  <td data-th='Lead Status'>{lead.leadStatus}</td>
                  <td data-th='Created At'>{lead.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <style jsx>{`
          a {
            text-decoration: none;
          }

          .list-view {
            width: 100%;
            border: 1px solid #dedede;
            border-radius: 7px;
            padding: 16px;
            margin: 0 auto;
            margin-top: 5px;
            display: flex;
            flex-direction: column;
          }

          .list-view__header {
            width: 100%;
            height: 35px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
          }

          .list-view__button--change {
            border: none;
            background-color: transparent;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;

            display: flex;
            gap: 10px;
            align-items: center;
          }

          .list-view__button--new {
            border: 1px solid gray;
            background-color: transparent;
            color: black;
            padding: 8px 14px;
            border-radius: 7px;
            cursor: pointer;
          }

          .table-data {
            text-align: center;
          }

          .rwd-table {
            min-width: 300px;
            max-width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            overflow: scroll-x;
          }

          .rwd-table tr:first-child {
            border-top: none;
            background: black;
            color: #fff;
          }

          .rwd-table tr {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            background-color: #ffffff;
          }

          .rwd-table th {
            display: none;
          }

          .rwd-table td {
            display: block;
          }

          .rwd-table td:first-child {
            margin-top: 0.5em;
          }

          .rwd-table td:last-child {
            margin-bottom: 0.5em;
          }

          .rwd-table td:before {
            content: attr(data-th) ': ';
            font-weight: bold;
            width: 120px;
            display: inline-block;
            color: #000;
          }

          .rwd-table th,
          .rwd-table td {
            text-align: left;
          }

          .rwd-table {
            color: #333;
            border-radius: 0.4em;
            overflow: hidden;
          }

          .rwd-table tr {
            border-color: #bfbfbf;
          }

          .rwd-table th,
          .rwd-table td {
            padding: 0.5em 1em;
          }

          @media screen and (max-width: 601px) {
            .rwd-table tr:nth-child(2) {
              border-top: none;
            }
          }
          @media screen and (min-width: 600px) {
            .rwd-table tr:hover:not(:first-child) {
              background-color: #d8e7f3;
            }
            .rwd-table td:before {
              display: none;
            }
            .rwd-table th,
            .rwd-table td {
              display: table-cell;
              padding: 0.25em 0.5em;
            }
            .rwd-table th:first-child,
            .rwd-table td:first-child {
              padding-left: 0;
            }
            .rwd-table th:last-child,
            .rwd-table td:last-child {
              padding-right: 0;
            }
            .rwd-table th,
            .rwd-table td {
              padding: 1em !important;
            }
          }
        `}</style>
      </div>
    </>
  )
}
