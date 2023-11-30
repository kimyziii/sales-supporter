import { useEffect, useState } from 'react'
import SideBar from './Sidebar'
import SignPage from '@/pages/sign'
import { app } from '../../../firebaseApp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Layout({ children }) {
  const auth = getAuth(app)
  // auth에 currentUser 있을 경우 true
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // loading-spinner 기준
  const [init, setInit] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setInit(true)
    })
  }, [auth])

  return (
    <>
      <div className='layout'>
        {isAuthenticated && init && (
          <>
            <SideBar />
            <main className='main'>{children}</main>
          </>
        )}
        {!isAuthenticated && init && <SignPage />}
      </div>

      <style jsx>
        {`
          .layout {
            width: 90vw;
            max-height: 90vh;
            margin: 0 auto;
            margin-top: 5vh;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;

            display: grid;
            grid-template-columns: 1fr 4fr;
          }

          .main {
            background-color: white;
          }

          @media (max-width: 1024px) {
            .layout {
              grid-template-columns: 200px 4fr;
            }
          }

          // @media (max-width: 720px) {
          //   .layout {
          //     display: grid;
          //     grid-template-columns: 1fr;
          //     grid-template-rows: 50px 1fr;
          //   }
          // }
        `}
      </style>
    </>
  )
}
