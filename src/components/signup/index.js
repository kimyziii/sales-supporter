import Image from 'next/image'
import { useState } from 'react'
import FormButton from '../ui/form/FormButton'
import FromButtonGroup from '../ui/form/FormButtonGroup'
import FormField from '../ui/form/FormField'
import FormRow from '../ui/form/FormRow'
import FormSection from '../ui/form/FormSection'
import { app } from '../../../firebaseApp'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

export default function SignUpForm() {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  async function onSubmit(event) {
    event.preventDefault()
    try {
      const auth = getAuth(app)
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('회원가입에 성공했습니다.', {
        position: toast.POSITION.TOP_RIGHT,
      })
    } catch (error) {
      toast.error(error.code, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  function onChange(event) {
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
          width='70'
          height='70'
          alt='sales-supporter'
        />
      </div>
      <form className='signup-form' onSubmit={onSubmit}>
        <FormSection title='SignUp'>
          <FormRow>
            <FormField
              label='이메일'
              type='text'
              name='email'
              onChange={onChange}
              column='1'
              required
            />
          </FormRow>
          <FormRow>
            <FormField
              label='비밀번호'
              type='password'
              name='password'
              onChange={onChange}
              column='1'
              required
            />
          </FormRow>
          <FormRow>
            <FormField
              label='비밀번호 확인'
              type='password'
              name='passwordConfirm'
              onChange={onChange}
              column='1'
              required
            />
          </FormRow>
        </FormSection>
        {error && error?.length > 0 && <div className='error-msg'>{error}</div>}
        {/* <div style={{ fontSize: 'small', paddingLeft: '20px' }}>
          계정이 이미 있으신가요?
        </div> */}
        <FromButtonGroup>
          <FormButton
            onClick={() => {
              console.log('clicked')
            }}
            value='회원가입하기'
            type='confirm'
            disabled={error?.length > 0}
          ></FormButton>
        </FromButtonGroup>
      </form>

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
          }
        `}
      </style>
    </div>
  )
}
