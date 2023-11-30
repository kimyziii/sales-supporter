import { useState } from 'react'
import { app } from '../../../firebaseApp'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { toast } from 'react-toastify'

import Image from 'next/image'
import FormButton from '../ui/form/FormButton'
import FromButtonGroup from '../ui/form/FormButtonGroup'
import FormField from '../ui/form/FormField'
import FormRow from '../ui/form/FormRow'
import FormSection from '../ui/form/FormSection'
import { useRouter } from 'next/router'

export default function SignForm() {
  const router = useRouter()

  const [error, setError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signType, setSignType] = useState('login')

  function onTypeChange() {
    if (signType === 'login') setSignType('signup')
    if (signType === 'signup') setSignType('login')
  }

  async function onLogin(event) {
    event.preventDefault()
    try {
      const auth = getAuth(app)
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      toast.success('로그인에 성공했습니다.', {
        position: toast.POSITION.TOP_RIGHT,
      })
      router.push('/')
    } catch (error) {
      toast.error(error.code, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  async function onSubmit(event) {
    event.preventDefault()
    try {
      const auth = getAuth(app)
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('회원가입에 성공했습니다.', {
        position: toast.POSITION.TOP_RIGHT,
      })
      setError('')
      router.push('/')
    } catch (error) {
      toast.error(error.code, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  function onLoginChange(event) {
    const {
      target: { name, value },
    } = event

    if (name === 'login_email') {
      setLoginEmail(value)
      const validRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
      if (!value?.match(validRegex)) {
        setError('이메일 형식이 올바르지 않습니다.')
      } else {
        setError('')
      }
    }

    if (name === 'login_password') {
      setLoginPassword(value)

      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해 주세요.')
      } else {
        setError('')
      }
    }
  }

  function onSignupChange(event) {
    const {
      target: { name, value },
    } = event

    if (name === 'email') {
      setEmail(value)
      const validRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

      if (!value?.match(validRegex)) {
        setError('이메일 형식이 올바르지 않습니다.')
      } else {
        setError('')
      }
    }

    if (name === 'password') {
      setPassword(value)

      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해 주세요.')
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해 주세요.')
      } else {
        setError('')
      }
    }

    if (name == 'passwordConfirm') {
      setPasswordConfirm(value)

      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해 주세요.')
      } else if (value !== password) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해 주세요.')
      } else {
        setError('')
      }
    }
  }

  return (
    <div className='signup'>
      <div>
        <Image
          src='/icons/logo.svg'
          width='40'
          height='40'
          alt='sales-supporter'
        />
      </div>

      {signType === 'signup' && (
        <>
          <h3 style={{ fontFamily: 'SUIT-600' }}>회원가입</h3>
          <hr style={{ border: '1px dashed lightgray', width: '500px' }} />
          <form className='signup-form' onSubmit={onSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <FormRow>
                <FormField
                  label='이메일'
                  type='text'
                  name='email'
                  id='email'
                  onChange={onSignupChange}
                  column='1'
                  value={email}
                  required
                />
              </FormRow>
              <FormRow>
                <FormField
                  label='비밀번호'
                  type='password'
                  name='password'
                  id='password'
                  onChange={onSignupChange}
                  column='1'
                  value={password}
                  required
                />
              </FormRow>
              <FormRow>
                <FormField
                  label='비밀번호 확인'
                  type='password'
                  name='passwordConfirm'
                  id='passwordConfirm'
                  onChange={onSignupChange}
                  column='1'
                  value={passwordConfirm}
                  required
                />
              </FormRow>
            </div>
            {error && error?.length > 0 && (
              <div className='error-msg'>{error}</div>
            )}
            <div className='form__changer'>
              계정이 이미 있으신가요?
              <div className='form__changer-btn' onClick={onTypeChange}>
                로그인하기
              </div>
            </div>
            <div className='signup-form__btn'>
              <FromButtonGroup>
                <FormButton
                  value='회원가입하기'
                  type='confirm'
                  disabled={error?.length > 0}
                ></FormButton>
              </FromButtonGroup>
            </div>
          </form>
        </>
      )}

      {signType === 'login' && (
        <>
          <h3 style={{ fontFamily: 'SUIT-600' }}>로그인</h3>
          <hr style={{ border: '1px dashed lightgray', width: '500px' }} />
          <form className='signin-form' onSubmit={onLogin}>
            <FormSection>
              <FormRow>
                <FormField
                  label='이메일'
                  type='text'
                  name='login_email'
                  id='login_email'
                  onChange={onLoginChange}
                  column='1'
                  value={loginEmail}
                  required
                />
              </FormRow>
              <FormRow>
                <FormField
                  label='비밀번호'
                  type='password'
                  name='login_password'
                  id='login_password'
                  onChange={onLoginChange}
                  column='1'
                  value={loginPassword}
                  required
                />
              </FormRow>
            </FormSection>
            {error && error?.length > 0 && (
              <div className='error-msg'>{error}</div>
            )}
            <div className='form__changer'>
              계정이 없으신가요?
              <div className='form__changer-btn' onClick={onTypeChange}>
                회원가입하기
              </div>
            </div>
            <div className='signup-form__btn'>
              <FromButtonGroup>
                <FormButton
                  value='로그인하기'
                  type='confirm'
                  disabled={error?.length > 0}
                ></FormButton>
              </FromButtonGroup>
            </div>
          </form>
        </>
      )}

      <style jsx>
        {`
          .signup {
            padding: 7vh 10px;
            width: inherit;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 3vh;

            font-family: 'SUIT-400';
          }

          .signup-form {
            width: 500px;
            display: flex;
            flex-direction: column;
          }

          .error-msg {
            font-size: small;
            color: red;
            margin-bottom: 10px;
          }

          .signup-form__btn {
            display: flex;
            margin-top: 15px;
            justify-content: center;
          }

          .signin-form {
            width: 500px;
            display: flex;
            flex-direction: column;
          }

          .form__changer {
            font-size: small;
            display: flex;
            gap: 15px;
            margin-bottom: 10px;
          }

          .form__changer-btn {
            cursor: pointer;
            color: var(--pointed-color);
          }
        `}
      </style>
    </div>
  )
}
