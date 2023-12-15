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
import { formatCurrentTime, getUserName } from '../lead/LeadList'
import ConfirmModal from '../ui/ConfirmModal'
import CreateButton from '../ui/CreateButton'
import FilterBar from '../ui/FilterBar'
import AccDetailPage from './AccDetail'
import AccFormModal from './AccFormModal'
import AccRecordCard from './AccRecordCard'

const DEFAULT_SORTING = 'createdAt'
const DEFAULT_FILTER = { name: 'my', korName: '내 고객사' }

export default function AccList() {
  const { user } = useContext(AuthContext)

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
    { name: 'name', korName: '회사명' },
  ]

  const filters = [
    { name: 'my', korName: '내 고객사' },
    { name: 'all', korName: '모든 고객사' },
  ]

  function splitFunc(val, type) {
    switch (type) {
      case 'jurir_no':
        return val.slice(0, 6) + '-' + val.slice(6)
      case 'bizr_no':
        return val.slice(0, 3) + '-' + val.slice(3, 5) + '-' + val.slice(5)
      case 'est_dt':
        return val.slice(0, 4) + '-' + val.slice(4, 6) + '-' + val.slice(6)
    }
  }

  /**
   * 모든 리드를 특정 정렬필드를 받아 정렬
   * @param {*} filter 정렬하고자 하는 필드명
   */
  async function getAccounts(sortingFilter, recordId = '', filter) {
    setSelectedObj(null)

    const sorting = sortingFilter === 'companyName' ? 'asc' : 'desc'
    const accountRef = collection(db, 'account')

    let q

    if (!filter || filter.name === 'all') {
      q = query(accountRef, orderBy(sortingFilter, sorting))
    } else if (filter.name === 'my' && authUser) {
      q = query(
        accountRef,
        where('createdById', '==', authUser?.uid),
        orderBy(sortingFilter, sorting),
      )
    }

    const docSnap = await getDocs(q)

    let datas = []
    const promises = []

    docSnap.forEach((doc) => {
      const bizr_no = doc.data()?.bizr_no
      const jurir_no = doc.data()?.jurir_no
      const est_dt = doc.data()?.est_dt

      let dataObj = {
        ...doc.data(),
        id: doc.id,
        bizr_no: bizr_no ? splitFunc(bizr_no, 'bizr_no') : '',
        jurir_no: jurir_no ? splitFunc(jurir_no, 'jurir_no') : '',
        est_dt: est_dt ? splitFunc(est_dt, 'est_dt') : '',
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
   * 선택 된 계정 스타일링 및 상세 페이지 컴포넌트 열기
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
    getAccounts(event.target.getAttribute('name'))

    setSortingPopupIsOpen(false)
    setSelectedObj({})
    setDetailOpen(false)
  }

  /**
   * firestore 레코드 삭제 후 기존 데이터 리스트에서 삭제, 상세 페이지 닫기
   */
  async function handleDelete() {
    await deleteDoc(doc(db, 'account', recordId))
    setSelectedObj(null)
    setDetailOpen(false)
    setRecordId('')

    setDeleteModalOpen(false)
    getAccounts(sortingFilter)
  }

  /**
   * 입력 폼을 통해 받은 데이터로 레코드 생성 / 수정 후 해당 레코드 상세 페이지 열기
   * @param {*} upsertData 사용자로부터 입력받은 데이터
   * @param {*} event
   */
  async function handleUpsert(upsertData) {
    let recordId = upsertData?.id

    if (selectedAction === 'update') {
      const accountRef = doc(db, 'account', recordId)
      upsertData.modifiedById = user.uid
      upsertData.modifiedAt = formatCurrentTime()
      await updateDoc(accountRef, upsertData)
    }

    if (selectedAction === 'create') {
      const accountRef = collection(db, 'account')
      upsertData.createdById = user.uid
      upsertData.createdAt = formatCurrentTime()
      upsertData.modifiedById = user.uid
      upsertData.modifiedAt = formatCurrentTime()
      const docRef = await addDoc(accountRef, upsertData)
      recordId = docRef.id
    }

    setRecordId(recordId)
    getAccounts(sortingFilter, recordId)

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
    getAccounts(DEFAULT_SORTING, null, filter)
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
          msg='해당 계정을 삭제하시겠습니까?'
        />
      )}

      {/* 생성, 수정 모달 */}
      {isUpsertModalOpen && (
        <AccFormModal
          onUpsert={(upsertData, event) => handleUpsert(upsertData, event)}
          onCancel={handleCancel}
          selectedItem={data.filter((item) => item.id === recordId)[0]}
        />
      )}

      <div className='list-view'>
        <CreateButton
          onClick={() => handleOpenModal('create')}
          object='Account'
        />

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

        <AccRecordCard
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
        {detailOpen && <AccDetailPage selectedObj={selectedObj} />}
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
