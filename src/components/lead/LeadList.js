import AuthContext from '@/context/AuthContext'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import db from '../../../firebaseApp'
import ConfirmModal from '../ui/ConfirmModal'
import CreateButton from '../ui/CreateButton'
import FilterBar from '../ui/FilterBar'
import LeadDetailPage from './LeadDetail'
import LeadFormModal from './LeadFormModal'
import LeadRecordCard from './LeadRecordCard'

const DEFAULT_SORTING = 'createdAt'
const DEFAULT_FILTER = { name: 'my', korName: '내 리드' }

/**
 * 한국 전화번호에 맞게 전화번호 포맷
 * @param {string} phoneNumber (ex. 01012345678)
 * @returns phoneNumber (ex. 010-1234-5678)
 */
export function formatPhone(phoneNumber) {
  if (phoneNumber.length === 11) {
    return (
      phoneNumber.slice(0, 3) +
      '-' +
      phoneNumber.slice(3, 7) +
      '-' +
      phoneNumber.slice(7)
    )
  }
  return phoneNumber
}

/**
 * 현재 시간 포맷
 * @returns ex. 9999년 01월 01일 오전 00:00:01
 */
export function formatCurrentTime() {
  const now = new Date()

  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  let hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

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
  const formattedSeconds = String(seconds).padStart(2, '0')

  const formattedTime = `${year}년 ${formattedMonth}월 ${formattedDay}일 ${amOrPm} ${hours}:${formattedMinutes}:${formattedSeconds}`

  return formattedTime
}

/**
 * 생성자, 수정자 이름 실시간으로 불러와 보여줌
 * @param {*} uid user id
 */
export async function getUserName(data) {
  const uids = {}
  if (data?.createdById) uids.createdById = data.createdById
  if (data?.modifiedById) uids.modifiedById = data.modifiedById

  let retObj = {}
  if (Object.values(uids).length > 0) {
    const q = query(
      collection(db, 'user'),
      where('uid', 'in', Object.values(uids)),
    )
    const querySnapshot = await getDocs(q)

    const map = new Map()
    querySnapshot.forEach((doc) => {
      map.set(doc.data().uid, doc.data().nickName)
    })

    if (map.has(uids.createdById)) retObj.createdBy = map.get(uids.createdById)
    if (map.has(uids.modifiedById))
      retObj.modifiedBy = map.get(uids.modifiedById)
  }

  return retObj
}

export default function LeadList() {
  const { authUser } = useContext(AuthContext)

  const [data, setData] = useState([])

  // firestore 데이터 관련 문서 ID 상태
  const [recordId, setRecordId] = useState('')

  // 상세 페이지 관련 상태
  const [selectedObj, setSelectedObj] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  // 모달 관련 상태
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isUpsertModalOpen, setUpsertModalOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')

  // 정렬 팝업 상태
  const [sortingFilter, setSortingFilter] = useState('createdAt')
  const [sortingPopupIsOpen, setSortingPopupIsOpen] = useState(false)

  // 필터 상태
  const [filter, setFilter] = useState(DEFAULT_FILTER)

  // 정렬 필터 Array
  const sortings = [
    { name: 'createdAt', korName: '생성일자' },
    { name: 'modifiedAt', korName: '수정일자' },
    { name: 'companyName', korName: '회사명' },
  ]

  const filters = [
    { name: 'my', korName: '내 리드' },
    { name: 'all', korName: '모든 리드' },
  ]

  /**
   * 모든 리드를 특정 정렬필드를 받아 정렬
   * @param {*} fisortingFilterlter 정렬하고자 하는 필드명
   * @param {*} recordId detail에 보여줄 데이터의 아이디 값
   */
  async function getLeads(sortingFilter, recordId, filter) {
    setSelectedObj(null)

    const sorting = sortingFilter === 'companyName' ? 'asc' : 'desc'
    const leadsRef = collection(db, 'lead')

    let q

    if (!filter || filter.name === 'all') {
      q = query(leadsRef, orderBy(sortingFilter, sorting))
    } else if (filter.name === 'my' && authUser) {
      q = query(
        leadsRef,
        where('createdById', '==', authUser?.uid),
        orderBy(sortingFilter, sorting),
      )
    }

    const docSnap = await getDocs(q)

    let datas = []
    const promises = []

    docSnap.forEach((doc) => {
      const phone = doc.data().phone ? doc.data().phone : ''

      let dataObj = {
        ...doc.data(),
        id: doc.id,
        phone: formatPhone(phone),
      }

      if (recordId && recordId === doc.id) {
        const promise = getUserName(doc.data()).then((names) => {
          dataObj = {
            ...dataObj,
            createdBy: names?.createdBy,
            modifiedBy: names?.modifiedBy,
          }
          setSelectedObj(dataObj)
        })
        promises.push(promise)
      }

      datas.push(dataObj)
    })

    await Promise.all(promises)
    setData(datas)
  }

  /**
   * 선택 된 리드 스타일링 및 상세 페이지 컴포넌트 열기
   * @param {*} event record-card 클릭 이벤트
   */
  async function handleRecordClick(event) {
    const name = event.target.getAttribute('name')
    const selectedItem = data.find((item) => item.id === name)

    if (selectedItem) {
      const names = await getUserName(selectedItem)
      setSelectedObj({
        ...selectedItem,
        createdBy: names?.createdBy,
        modifiedBy: names?.modifiedBy,
      })
    }

    setDetailOpen(true)
  }

  /**
   * 생성 / 수정 / 삭제 버튼 클릭시 띄워야 할 모달창 구분
   * @param {*} action 버튼에 따른 액션 유형
   * @param {*} recordId 액션을 하고자 하는 문서(레코드) id
   */
  function handleOpenModal(action, recordId) {
    setSelectedAction(action)
    if (action === 'delete') setDeleteModalOpen(true)
    if (action === 'create') setUpsertModalOpen(true)
    if (action === 'update') setUpsertModalOpen(true)
    setRecordId(recordId)
  }

  /**
   * 클릭한 필드를 기준으로 정렬 (time이 기준인 경우 역순, string이 기준인 경우 가나다순)
   * 정렬 후 상세 페이지 닫음
   * @param {*} event 정렬 버튼 클릭 이벤트
   */
  async function handleSorting(event) {
    setSortingFilter(event.target.getAttribute('name'))
    getLeads(event.target.getAttribute('name'), recordId, filter)

    setSortingPopupIsOpen(false)
    setSelectedObj({})
    setDetailOpen(false)
    setRecordId(null)
  }

  /**
   * firestore 레코드 삭제 후 기존 데이터 리스트에서 삭제, 상세 페이지 닫기
   */
  async function handleDelete() {
    await deleteDoc(doc(db, 'lead', recordId))
    setSelectedObj(null)
    setDetailOpen(false)
    setRecordId('')

    setDeleteModalOpen(false)
    getLeads(sortingFilter)
  }

  /**
   * 입력 폼을 통해 받은 데이터로 레코드 생성 / 수정 후 해당 레코드 상세 페이지 열기
   * @param {*} upsertData 사용자로부터 입력받은 데이터
   * @param {*} event
   */
  async function handleUpsert(upsertData) {
    let recordId = upsertData?.id

    if (selectedAction === 'update') {
      const leadRef = doc(db, 'lead', recordId)
      upsertData.modifiedById = authUser.uid
      upsertData.modifiedAt = formatCurrentTime()
      await updateDoc(leadRef, upsertData)
    }

    if (selectedAction === 'create') {
      const leadRef = collection(db, 'lead')
      upsertData.createdById = authUser.uid
      upsertData.createdAt = formatCurrentTime()
      upsertData.modifiedById = authUser.uid
      upsertData.modifiedAt = formatCurrentTime()
      const docRef = await addDoc(leadRef, upsertData)
      recordId = docRef.id
    }

    setRecordId(recordId)
    getLeads(sortingFilter, recordId, filter)

    setUpsertModalOpen(false)
    setDetailOpen(true)
  }

  /**
   * 액션 유형에 따른 모달창 구분하여 모달 닫기
   */
  function handleCancel() {
    if (selectedAction === 'delete') setDeleteModalOpen(false)
    if (selectedAction === 'create') setUpsertModalOpen(false)
    if (selectedAction === 'update') setUpsertModalOpen(false)
  }

  useEffect(() => {
    getLeads(DEFAULT_SORTING, null, filter)
  }, [filter, authUser])

  return (
    <div className='lead-view'>
      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <ConfirmModal
          action={selectedAction}
          onDelete={handleDelete}
          onCancel={handleCancel}
          width='30%'
          top='25%'
          msg='해당 리드를 삭제하시겠습니까?'
        />
      )}

      {/* 생성, 수정 모달 */}
      {isUpsertModalOpen && (
        <LeadFormModal
          onUpsert={(upsertData, event) => handleUpsert(upsertData, event)}
          onCancel={handleCancel}
          selectedItem={data.filter((item) => item.id === recordId)[0]}
        />
      )}

      <div className='list-view'>
        {/* 생성 버튼 */}
        <CreateButton onClick={() => handleOpenModal('create')} object='Lead' />

        {/* 검색 및 정렬 */}
        <FilterBar
          sortingPopupIsOpen={sortingPopupIsOpen}
          handleSorting={handleSorting}
          handleClosePopup={() => setSortingPopupIsOpen(false)}
          handleSortingClick={() =>
            setSortingPopupIsOpen((prevState) => !prevState)
          }
          handleFiltering={(filter) => {
            setFilter(filter)
          }}
          sortings={sortings}
          sorting={sortingFilter}
          filters={filters}
          filter={filter}
        />

        <LeadRecordCard
          selectedObj={selectedObj}
          handleRecordClick={handleRecordClick}
          handleOpenModal={(action, recordId) =>
            handleOpenModal(action, recordId)
          }
          sortingFilter={sortingFilter}
          data={data}
        />
      </div>

      {/* 상세화면 */}
      <div className='detail-view'>
        {detailOpen && <LeadDetailPage selectedObj={selectedObj} />}
      </div>

      <style jsx>{`
        .lead-view {
          display: grid;
          grid-template-columns: 1fr 2fr;
        }

        .list-view {
          padding: 10px;
          min-height: 90vh;
          max-height: 90vh;
          overflow-y: auto;
        }

        .detail-view {
          min-height: 90vh;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--secondary-color);
          padding: 10px;
        }

        @media (max-width: 1010px) {
          .lead-view {
            display: grid;
            grid-template-columns: 260px 2fr;
          }
        }
      `}</style>
    </div>
  )
}
