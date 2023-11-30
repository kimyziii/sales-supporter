import { useState } from 'react'
import SignUpForm from '../signup'
import SideBar from './Sidebar'

export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>
      <div className='layout'>
        {isAuthenticated && (
          <>
            <SideBar />
            <main className='main'>{children}</main>
          </>
        )}
        {!isAuthenticated && <SignUpForm />}
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
