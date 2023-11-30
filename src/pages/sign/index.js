import SignForm from '@/components/signup/SignForm'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { app } from '../../../firebaseApp'

export default function SignPage() {
  const router = useRouter()
  if (getAuth(app)?.currentUser && router.pathname === '/sign') router.push('/')
  else return <SignForm />
}
