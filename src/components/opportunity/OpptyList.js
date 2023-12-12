import AuthContext from '@/context/AuthContext'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import db from '../../../firebaseApp'
import { formatCurrentTime, getUserName } from '../lead/LeadList'
import ConfirmModal from '../ui/ConfirmModal'
import CreateButton from '../ui/CreateButton'
import FilterBar from '../ui/FilterBar'
import OpptyDetailPage from './OpptyDetailPage'
import OpptyFormModal from './OpptyFormModal'
import OpptyRecordCard from './OpptyRecordCard'

export default function OpptyList() {
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
    { name: 'name', korName: '기회명' },
  ]

  /**
   * 모든 영업기회를 생성일자 역순으로 조회
   */
  async function getOpportunities() {
    setData([])

    const opportunitiesRef = collection(db, 'opportunity')
    const q = await query(opportunitiesRef, orderBy('createdAt', 'desc'))
    const docSnap = await getDocs(q)

    docSnap.forEach((doc) => {
      const dataObj = {
        ...doc.data(),
        id: doc.id,
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
    const sorting =
      event.target.getAttribute('name') === 'name' ? 'asc' : 'desc'
    setSortingFilter(event.target.getAttribute('name'))

    setData([])

    const opptiesRef = collection(db, 'opportunity')
    const q = await query(
      opptiesRef,
      orderBy(event.target.getAttribute('name'), sorting),
    )
    const docSnap = await getDocs(q)

    docSnap.forEach((doc) => {
      const dataObj = {
        ...doc.data(),
        id: doc.id,
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
    await deleteDoc(doc(db, 'opportunity', recordId))
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
      const opptyRef = doc(db, 'opportunity', recordId)
      upsertData.modifiedById = user.uid
      upsertData.modifiedAt = formatCurrentTime()
      await updateDoc(opptyRef, upsertData)
    }

    if (selectedAction === 'create') {
      const opptyRef = collection(db, 'opportunity')
      upsertData.createdById = user.uid
      upsertData.createdAt = formatCurrentTime()
      upsertData.modifiedById = user.uid
      upsertData.modifiedAt = formatCurrentTime()
      const docRef = await addDoc(opptyRef, upsertData)
      recordId = docRef.id
    }

    setUpsertModalOpen(false)

    // 전체 데이터 불러온 후 업데이트 된 친구 디테일 화면에 보여줌
    setData([])

    const sorting = sortingFilter === 'name' ? 'asc' : 'desc'

    const opptiesRef = collection(db, 'opportunity')
    const q = query(opptiesRef, orderBy(sortingFilter, sorting))
    const docSnap = await getDocs(q)

    docSnap.forEach(async (doc) => {
      const dataObj = {
        ...doc.data(),
        id: doc.id,
      }

      setData((prevData) => [...prevData, dataObj])

      // upsert 대상 데이터에 대해 생성자, 수정자 이름 업데이트
      if (doc.id === recordId) {
        const names = await getUserName(doc.data())
        setSelectedObj({
          ...dataObj,
          createdBy: names?.createdBy,
          modifiedBy: names?.modifiedBy,
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
    getOpportunities()
  }, [])

  return (
    <div className='oppty-view'>
      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <ConfirmModal
          action={selectedAction}
          onDelete={handleDelete}
          onCancel={handleCancel}
          width='30%'
          top='25%'
          msg='해당 영업기회를 삭제하시겠습니까?'
        />
      )}

      {/* 생성, 수정 모달 */}
      {isUpsertModalOpen && (
        <OpptyFormModal
          onUpsert={(upsertData, event) => handleUpsert(upsertData, event)}
          onCancel={handleCancel}
          selectedItem={data.filter((item) => item.id === recordId)[0]}
        />
      )}

      <div className='list-view'>
        <CreateButton
          onClick={() => handleOpenModal('create')}
          object='Opportunity'
        />

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

        <OpptyRecordCard
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
        {detailOpen && <OpptyDetailPage selectedObj={selectedObj} />}
      </div>
      <style jsx>{`
        .oppty-view {
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
          .oppty-view {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  )
}
