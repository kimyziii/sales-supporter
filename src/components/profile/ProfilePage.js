import AuthContext from '@/context/AuthContext'
import { deleteUser } from 'firebase/auth'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import db from '../../../firebaseApp'
import FormButton from '..//ui/form/FormButton'
import ConfirmModal from '../ui/ConfirmModal'
import { toast } from 'react-toastify'

export default function ProfilePage() {
  const currentUser = useContext(AuthContext).user
  const userId = useContext(AuthContext).user.uid

  const [user, setUser] = useState(null)
  const [nickname, setNickname] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [nicknameEditMode, setNicknameEditMode] = useState(false)

  function onDelete() {
    setDeleteModal(true)
  }

  function handleEditNickname() {
    setNicknameEditMode(!nicknameEditMode)
  }

  function handleChangeNickname(event) {
    setNickname(event.target.value)
  }

  async function handleSaveNickname() {
    await updateDoc(doc(db, 'user', user.id), {
      nickName: nickname,
    }).then(() => {
      getUserData()
      setNicknameEditMode(false)
    })
  }

  async function handleDelete() {
    deleteUser(currentUser)
      .then(() => {
        toast.success('회원 탈퇴에 성공했습니다.', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.code, {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  }

  async function getUserData() {
    const userRef = collection(db, 'user')
    const q = query(userRef, where('uid', '==', userId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setUser({ ...doc.data(), id: doc.id })
      setNickname(doc.data()?.nickName)
    })
  }

  useEffect(() => {
    getUserData()
  }, [userId])

  return (
    <div className='profile-wrapper'>
      {deleteModal && (
        <ConfirmModal
          action='delete'
          onDelete={handleDelete}
          onCancel={() => setDeleteModal(false)}
          msg='정말로 탈퇴하시겠습니까?'
        />
      )}
      <div className='profile-page__data'>
        <div className='profile-page__photo'></div>
        <div className='profile-page__inform'>
          <div className='profile-page__company'>
            <div className='profile-page__company--cn'>{user?.companyName}</div>
            <div className='profile-page__company--tn'>{user?.teamName}</div>
          </div>
          <div className='profile-page__name'>
            <div className='profile-page__name--nn'>
              {!nicknameEditMode && (
                <>
                  <div>{nickname}</div>
                  <img src='icons/edit.svg' onClick={handleEditNickname} />
                </>
              )}
              {nicknameEditMode && (
                <>
                  <input
                    className='profile-page__nickname--edit'
                    value={nickname}
                    onChange={handleChangeNickname}
                  ></input>
                  <FormButton
                    onClick={handleSaveNickname}
                    value='저장'
                    type='confirm'
                  />
                </>
              )}
            </div>
          </div>
          <i>
            <div className='profile-page__name--email'>{user?.email}</div>
          </i>
        </div>
      </div>
      <div className='profile-page__btn'>
        <div>
          <FormButton onClick={onDelete} value='탈퇴하기' type='delete' />
        </div>
      </div>

      <style jsx>{`
        .profile-wrapper {
          width: 85%;
          height: fit-content;
          margin: 0 auto;
          margin-top: 5vh;

          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .profile-page__data {
          gap: 30px;
          justify-content: start;
          align-items: center;

          border: 1px solid var();
          font-family: 'SUIT-400';
          font-size: 13px;

          display: flex;
          flex-direction: row;
        }

        .profile-page__inform {
          display: flex;
          flex-direction: column;
          justify-content: start;
          gap: 10px;
          padding-left: 5px;
        }

        .profile-page__photo {
          width: 100px;
          height: 100px;
          background: gray;
          border-radius: 100px;

          display: flex;
          place-items: center;
        }

        .profile-page__company {
          display: flex;
          gap: 20px;
          align-items: end;
        }

        .profile-page__company--cn {
          font-size: 18px;
        }

        .profile-page__company--tn {
          font-size: 15px;
        }

        .profile-page__name {
          gap: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: start;
          margin-left: -5px;
          padding: 6px 12px;
          border-bottom: 1px solid gray;
        }

        .profile-page__name--nn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;
          font-size: 15px;
        }

        .profile-page__name--nn img {
          width: 15px;
        }

        .profile-page__nickname--edit {
          border: none;
          background: var(--button-gray-color);
          border-radius: var(--border-radius);

          padding: 6px 12px;
          font-family: 'SUIT-400';
        }

        .profile-page__name--email {
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}
