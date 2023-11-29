import { useRouter } from 'next/router'
import Navigation from './Navigation'

export default function SideBar() {
  const router = useRouter()

  function handleClick() {
    router.push('/')
  }

  return (
    <>
      <div className='side-bar'>
        <div>
          {/* 로고 */}
          <div className='logo-wrapper' onClick={handleClick}>
            <img className='logo' src='icons/logo.svg' />
          </div>

          {/* 프로필 */}
          <div className='profile'>
            <img src='icons/user.svg' />
            <span>kim.yz</span>
          </div>

          {/* 네비게이션 */}
          <Navigation />
        </div>

        {/* 로그아웃 */}
        <div className='logout'>
          <img src='icons/logout.svg' />
          <span>Logout</span>
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
          height: 100%;

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

          font-family: 'NeoDunggeunmoPro-Regular';
          font-size: 14px;
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

          font-family: 'NeoDunggeunmoPro-Regular';
          font-size: 14px;
          cursor: pointer;
        }

        .logout img {
          width: 15px;
        }
      `}</style>
    </>
  )
}
