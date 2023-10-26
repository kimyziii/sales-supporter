import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const [pathname, setPathname] = useState('/')

  const router = useRouter()
  const query = router.pathname

  useEffect(() => {
    setPathname(query)
  }, [query])

  return (
    <nav className='navigation'>
      <Link href='/' style={{ textDecoration: 'none' }}>
        <div className='nav-item nav-item__home'>Home</div>
      </Link>
      <Link href='/lead' style={{ textDecoration: 'none' }}>
        <div className='nav-item nav-item__lead'>Lead</div>
      </Link>
      <Link href='/account' style={{ textDecoration: 'none' }}>
        <div className='nav-item nav-item__account'>Account</div>
      </Link>
      <Link href='/contact' style={{ textDecoration: 'none' }}>
        <div className='nav-item nav-item__contact'>Contact</div>
      </Link>
      <Link href='/opportunity' style={{ textDecoration: 'none' }}>
        <div className='nav-item nav-item__opportunity'>Opportunity</div>
      </Link>

      <style jsx>{`
        .navigation {
          width: 90%;
          height: 35px;
          margin: 0 auto;
          margin-top: 15px;
          margin-bottom: 15px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          column-gap: 16px;
          align-items: center;
          font-size: 14px;
        }

        .nav-item {
          cursor: pointer;
          display: flex;
          align-items: center;
          height: 35px;
          padding: 0 15px;
          border: 1px solid #dedede;
          border-radius: 7px;
          box-shadow: #dedede 2.4px 2.4px 3.2px;
          font-weight: 600;
        }

        .nav-item__home {
          background-color: ${pathname === '/' ? '#000000' : '#ffffff'};
          color: ${pathname === '/' ? 'white' : 'black'};
        }

        .nav-item__lead {
          background-color: ${pathname.includes('lead')
            ? '#000000'
            : '#ffffff'};
          color: ${pathname.includes('lead') ? 'white' : 'black'};
        }

        .nav-item__account {
          background-color: ${pathname.includes('account')
            ? '#000000'
            : '#ffffff'};
          color: ${pathname.includes('account') ? 'white' : 'black'};
        }

        .nav-item__contact {
          background-color: ${pathname.includes('contact')
            ? '#000000'
            : '#ffffff'};
          color: ${pathname.includes('contact') ? 'white' : 'black'};
        }

        .nav-item__opportunity {
          background-color: ${pathname.includes('opportunity')
            ? '#000000'
            : '#ffffff'};
          color: ${pathname.includes('opportunity') ? 'white' : 'black'};
        }
      `}</style>
    </nav>
  )
}
