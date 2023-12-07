import AuthContext from '@/context/AuthContext'
import { deleteUser } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import db from '../../../firebaseApp'
import FormButton from '..//ui/form/FormButton'
import ConfirmModal from '../ui/ConfirmModal'
import { toast } from 'react-toastify'

export default function ProfilePage() {
  const currentUser = useContext(AuthContext).user
  const userId = useContext(AuthContext).user.uid
  const [user, setUser] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  function onDelete() {
    setDeleteModal(true)
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
      setUser(doc.data())
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
              <div>{user?.nickName}</div>
              <img src='icons/edit.svg' />
            </div>
            <div className='profile-page__name--email'>{user?.email}</div>
          </div>
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
          align-items: start;
        }

        .profile-page__name--nn {
          display: flex;
          gap: 15px;
          font-size: 15px;
        }

        .profile-page__name--nn img {
          width: 15px;
        }

        .profile-page__name--email {
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}
