import SignForm from '@/components/signup/SignForm'
import { useRouter } from 'next/router'

export default function SignPage(isAuthenticated) {
  const router = useRouter()
  if (isAuthenticated) router.push('/')
  else return <SignForm />
}
