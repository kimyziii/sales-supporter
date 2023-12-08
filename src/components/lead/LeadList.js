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
export async function getUserName(uids) {
  const q = query(
    collection(db, 'user'),
    where('uid', 'in', Object.values(uids)),
  )
  const querySnapshot = await getDocs(q)

  const map = new Map()
  querySnapshot.forEach((doc) => {
    map.set(doc.data().uid, doc.data().nickName)
  })

  let retObj = {}
  if (map.has(uids.createdById)) retObj.createdBy = map.get(uids.createdById)
  if (map.has(uids.modifiedById)) retObj.modifiedBy = map.get(uids.modifiedById)

  return retObj
}

export default function LeadList() {
  const { user } = useContext(AuthContext)

  const [data, setData] = useState([])

  // firestore 데이터 관련 문서 ID 상태
  const [recordId, setRecordId] = useState('')

  // 상세 페이지 관련 상태
  const [selectedObj, setSelectedObj] = useState({})
  const [detailOpen, setDetailOpen] = useState(false)

  // 모달 관련 상태
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isUpsertModalOpen, setUpsertModalOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')

  // 정렬 팝업 상태
  const [sortingFilter, setSortingFilter] = useState('createdAt')
  const [sortingPopupIsOpen, setSortingPopupIsOpen] = useState(false)

  // 정렬 필터 Array
  const sortings = [
    { name: 'createdAt', korName: '생성일자' },
    { name: 'modifiedAt', korName: '수정일자' },
    { name: 'companyName', korName: '회사명' },
  ]

  /**
   * 모든 리드를 생성일자 역순으로 조회
   */
  async function getLeads() {
    setData([])

    const leadsRef = collection(db, 'lead')
    const q = await query(leadsRef, orderBy('createdAt', 'desc'))
    const docSnap = await getDocs(q)

    docSnap.forEach((doc) => {
      const phone = doc.data().phone ? doc.data().phone : ''

      const dataObj = {
        ...doc.data(),
        id: doc.id,
        phone: formatPhone(phone),
      }

      setData((prevData) => [...prevData, dataObj])
    })
  }

  /**
   * 선택 된 리드 스타일링 및 상세 페이지 컴포넌트 열기
   * @param {*} event record-card 클릭 이벤트
   */
  async function handleRecordClick(event) {
    const name = event.target.getAttribute('name')
    const selectedItem = data.find((item) => item.id === name)

    if (selectedItem) {
      const uids = {}
      if (selectedItem?.createdById) uids.createdById = selectedItem.createdById
      if (selectedItem?.modifiedById)
        uids.modifiedById = selectedItem.modifiedById

      let names
      if (Object.values(uids).length !== 0) names = await getUserName(uids)
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
    const sorting =
      event.target.getAttribute('name') === 'companyName' ? 'asc' : 'desc'
    setSortingFilter(event.target.getAttribute('name'))

    setData([])

    const leadsRef = collection(db, 'lead')
    const q = await query(
      leadsRef,
      orderBy(event.target.getAttribute('name'), sorting),
    )
    const docSnap = await getDocs(q)

    docSnap.forEach((doc) => {
      const phone = doc.data().phone ? doc.data().phone : ''

      const dataObj = {
        ...doc.data(),
        id: doc.id,
        phone: formatPhone(phone),
      }

      setData((prevData) => [...prevData, dataObj])
    })

    setSortingPopupIsOpen(false)
    setSelectedObj({})
    setDetailOpen(false)
  }

  /**
   * firestore 레코드 삭제 후 기존 데이터 리스트에서 삭제, 상세 페이지 닫기
   */
  async function handleDelete() {
    await deleteDoc(doc(db, 'lead', recordId))
    setDetailOpen(false)
    setSelectedObj(null)

    setData(data.filter((rec) => rec.id !== recordId))
    setRecordId('')
    setDeleteModalOpen(false)
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
      upsertData.modifiedById = user.uid
      upsertData.modifiedAt = formatCurrentTime()
      await updateDoc(leadRef, upsertData)
    }

    if (selectedAction === 'create') {
      const leadRef = collection(db, 'lead')
      upsertData.createdById = user.uid
      upsertData.createdAt = formatCurrentTime()
      upsertData.modifiedById = user.uid
      upsertData.modifiedAt = formatCurrentTime()
      const docRef = await addDoc(leadRef, upsertData)
      recordId = docRef.id
    }

    setUpsertModalOpen(false)

    // 전체 데이터 불러온 후 업데이트 된 친구 디테일 화면에 보여줌
    setData([])

    const sorting = sortingFilter === 'companyName' ? 'asc' : 'desc'

    const leadsRef = collection(db, 'lead')
    const q = await query(leadsRef, orderBy(sortingFilter, sorting))
    const docSnap = await getDocs(q)

    docSnap.forEach(async (doc) => {
      const phone = doc.data().phone ? doc.data().phone : ''
      const dataObj = {
        ...doc.data(),
        id: doc.id,
        phone: formatPhone(phone),
      }

      setData((prevData) => [...prevData, dataObj])

      // upsert 대상 데이터에 대해 생성자, 수정자 이름 업데이트
      if (doc.id === recordId) {
        const uids = {}
        if (doc.data()?.createdById) uids.createdById = doc.data().createdById
        if (doc.data()?.modifiedById)
          uids.modifiedById = doc.data().modifiedById

        const names = await getUserName(uids)
        setSelectedObj({
          ...dataObj,
          createdBy: names.createdBy,
          modifiedBy: names.modifiedBy,
        })
      }
    })

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
    getLeads()
  }, [])

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
        <CreateButton onClick={() => handleOpenModal('create')} object='Lead' />

        {/* 검색 및 정렬 */}
        <FilterBar
          sortingPopupIsOpen={sortingPopupIsOpen}
          sortingFilter={sortingFilter}
          handleSorting={handleSorting}
          handleClosePopup={() => setSortingPopupIsOpen(false)}
          handleSortingClick={() =>
            setSortingPopupIsOpen((prevState) => !prevState)
          }
          sortings={sortings}
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

        @media (max-width: 1024px) {
          .lead-view {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  )
}
