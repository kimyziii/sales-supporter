import { useRouter } from 'next/router'
import { getAuth, signOut } from 'firebase/auth'
import Navigation from './Navigation'
import { app } from '../../../firebaseApp'
import { toast } from 'react-toastify'
import { useContext, useEffect } from 'react'
import AuthContext from '@/context/AuthContext'

export default function SideBar() {
  const router = useRouter()

  async function onSignOut() {
    const auth = getAuth(app)
    try {
      await signOut(auth)
      toast.success('성공적으로 로그아웃하였습니다.')
    } catch (error) {
      toast.error(error.code)
    }
  }

  function handleClick() {
    router.push('/')
  }

  function handleNavigateToProfile() {
    router.push('/profile')
  }

  const { user } = useContext(AuthContext)
  useEffect(() => {}, [user])

  return (
    <>
      <div className='side-bar'>
        <div>
          {/* 로고 */}
          <div className='logo-wrapper' onClick={handleClick}>
            <img className='logo' src='icons/logo.svg' />
          </div>

          {/* 프로필 */}
          <div
            className='profile'
            onClick={handleNavigateToProfile}
            role='presentation'
          >
            <img src='icons/user.svg' />
            <span style={{ fontSize: '15px' }}>{user?.nickName}</span>
          </div>

          {/* 네비게이션 */}
          <Navigation />
        </div>

        {/* 로그아웃 */}
        <div className='logout' onClick={onSignOut}>
          <img src='icons/logout.svg' />
          <div className='logout-btn' role='presentation'>
            Logout
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-wrapper {
          text-align: center;
          padding: 10px 0 20px 0;
          cursor: pointer;
        }

        .logo {
          width: 40px;
        }

        .side-bar {
          display: flex;
          flex-direction: column;
          padding: 20px 0;
          justify-content: space-between;
          background-color: var(--secondary-color);
          overflow-y: auto;

          min-height: 90vh;
          max-height: 90vh;
        }

        .profile {
          height: 40px;
          background-color: var(--tertiary-color);
          border-radius: var(--border-radius);
          margin: 0 15px;
          margin-bottom: 10px;
          padding: 10px 15px;
          color: white;

          display: flex;
          gap: 10px;
          align-items: center;

          font-family: 'GyeonggiTitleM';
          font-size: 12px;
          cursor: pointer;
        }

        .profile img {
          width: 20px;
        }

        .logout {
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          height: 40px;
          background-color: var(--button-gray-color);
          border: 1px solid var(--button-gray-border-color);
          border-radius: var(--border-radius);

          margin: 0 15px;
          padding: 10px 0;

          font-family: 'GyeonggiTitleM';
          font-size: 14px;
          cursor: pointer;
        }

        .logout img {
          width: 15px;
        }

        .logout-btn {
          cursor: pointer;
          z-index: 9999;
        }
      `}</style>
    </>
  )
}
