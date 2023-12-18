import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const router = useRouter()
  const pathname = router.pathname

  const [path, setPath] = useState('')
  const [selected, setSelected] = useState('')

  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  function handleClick(event) {
    const btnName = event.target.innerText
    switch (btnName) {
      case 'Home':
        router.push('/')
        setSelected('home')
        break
      case 'Account':
        router.push('/account')
        setSelected('account')
        break
      case 'Lead':
        router.push('/lead')
        setSelected('lead')
        break
      case 'Opportunity':
        router.push('/opportunity')
        setSelected('opportunity')
        break
      default:
        break
    }
  }

  return (
    <div className='nav'>
      <ul>
        <li
          name='home'
          className={
            pathname === '/' ? 'link-btn link-btn__selected' : 'link-btn'
          }
          onClick={handleClick}
        >
          <img src='/icons/home.svg' alt='home button' />
          <Link href={'/'}>Home</Link>
        </li>
        <li
          name='lead'
          className={
            pathname.includes('lead')
              ? 'link-btn link-btn__selected'
              : 'link-btn'
          }
          onClick={handleClick}
        >
          <img src='/icons/lead.svg' alt='lead button' />
          <Link href={'/lead'}>Lead</Link>
        </li>
        <li
          name='account'
          className={
            pathname.includes('account')
              ? 'link-btn link-btn__selected'
              : 'link-btn'
          }
          onClick={handleClick}
        >
          <img src='/icons/account.svg' alt='account button' />
          <Link href={'/account'}>Account</Link>
        </li>
        <li
          name='opportunity'
          className={
            pathname.includes('opportunity')
              ? 'link-btn link-btn__selected'
              : 'link-btn'
          }
          onClick={handleClick}
        >
          <img src='/icons/oppty.svg' alt='opportunity button' />
          <Link href={'/opportunity'}>Opportunity</Link>
        </li>
      </ul>

      <style jsx>{`
        * {
          font-family: 'SUIT-600';
          font-size: var(text-lg);
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .link-btn {
          margin: 10px 15px;
          padding: 10px 15px;
          border-radius: var(--border-radius);
          cursor: pointer;
        }

        .link-btn__selected {
          background-color: var(--highlight-color);
          border: 1px solid var(--highlight-border-color);
        }

        .link-btn Link {
          display: block;
        }

        li {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        li img {
          width: 15px;
          pointer-events: none;
          background: transparent;
        }
      `}</style>
    </div>
  )
}
