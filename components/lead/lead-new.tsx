import { useState } from 'react'
import { LeadProps } from '../ui/list-view'

interface FormData {
  contactName: string
  title?: string
  email: string
  phone: string
  companyName: string
  industry?: string
  employeeNumber?: number
  leadSource: string
  leadStatus: string
  productInterest?: string
  description?: string
  platform: string
  createdAt: string
}

type NewLeadProps = {
  closeModal: () => void
  submitForm: (formData: LeadProps) => void
}

export function phoneFormatter(phoneNumber: string) {
  if (phoneNumber.length === 11) {
    return (
      phoneNumber.slice(0, 3) +
      '-' +
      phoneNumber.slice(3, 7) +
      '-' +
      phoneNumber.slice(7)
    )
  }
  return phoneNumber
}

const NewLead: React.FC<NewLeadProps> = ({ closeModal, submitForm }) => {
  const initialFormData: FormData = {
    contactName: '',
    title: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    employeeNumber: 0,
    leadSource: '',
    leadStatus: '열림',
    productInterest: '',
    description: '',
    platform: 'SalesSupport',
    createdAt: '',
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)

  function selectChangeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    if (name === 'phone') phoneFormatter(value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function textAreaChangeHandler(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className='body'>
      <header className='header'>새로운 리드</header>
      <div className='section'>
        <h3>담당자 정보</h3>
        <div className='section-row'>
          <div className='input-wrapper'>
            <label htmlFor='contactName'>이름</label>
            <input
              type='text'
              id='contactName'
              name='contactName'
              onChange={inputChangeHandler}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='title'>직급</label>
            <input
              type='text'
              id='title'
              name='title'
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <div className='section-row'>
          <div className='input-wrapper'>
            <label htmlFor='email'>이메일</label>
            <input
              type='text'
              id='email'
              name='email'
              onChange={inputChangeHandler}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='phone'>전화번호</label>
            <input
              type='text'
              id='phone'
              name='phone'
              onChange={inputChangeHandler}
            />
          </div>
        </div>
      </div>
      <div className='section'>
        <h3>회사 정보</h3>
        <div className='section-row'>
          <div className='input-wrapper'>
            <label htmlFor='companyName'>회사명</label>
            <input
              type='text'
              id='companyName'
              name='companyName'
              onChange={inputChangeHandler}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='industry'>산업군</label>
            <input
              type='text'
              id='industry'
              name='industry'
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <div className='section-row'>
          <div className='input-wrapper'>
            <label htmlFor='employeeNumber'>사원수</label>
            <input
              type='number'
              id='employeeNumber'
              name='employeeNumber'
              onChange={inputChangeHandler}
            />
          </div>
          <div className='input-wrapper'></div>
        </div>
      </div>
      <div className='section'>
        <h3>리드 정보</h3>
        <div className='section-row'>
          <div className='input-wrapper'>
            <label htmlFor='leadSource'>리드 소스</label>
            <input
              type='text'
              id='leadSource'
              name='leadSource'
              onChange={inputChangeHandler}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='leadStatus'>리드 상태</label>
            <select id='leadStatus' onChange={selectChangeStatus}>
              <option value='open'>열림</option>
              <option value='working'>진행중</option>
              <option value='closed'>닫힘</option>
              <option value='converted'>전환됨</option>
            </select>
          </div>
        </div>
        <div className='section-row'>
          <div className='input-wrapper'>
            <label htmlFor='productInterest'>관심 상품</label>
            <input
              type='text'
              id='productInterest'
              name='productInterest'
              onChange={inputChangeHandler}
            />
          </div>
          <div className='input-wrapper'></div>
        </div>
      </div>
      <div className='section'>
        <h3>기타 정보</h3>
        <div className='textarea-wrapper'>
          <label className='textarea-label' htmlFor='description'>
            설명
          </label>
          <textarea
            className='textarea'
            id='description'
            name='description'
            onChange={textAreaChangeHandler}
          />
        </div>
      </div>

      <div className='footer'>
        <button
          className='footer-btn footer-btn-save'
          onClick={() => submitForm(formData)}
        >
          저장
        </button>
        <button className='footer-btn footer-btn-cancel' onClick={closeModal}>
          취소
        </button>
      </div>

      <style jsx>{`
        .body {
          width: 100%;
          height: 70vh;
          overflow-y: scroll;
          overflow-x: hidden;
          margin: 0 auto;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .body input,
        .body textarea,
        .body select {
          border: none;
          background-color: #eeeeee;
          border-radius: 7px;
          min-height: 30px;
          width: calc(100%-50px);
          padding: 2px 10px;
        }

        .body textarea {
          padding: 10px;
        }

        .body input:hover,
        .body input:focus {
          outline: none;
        }

        .body label {
          width: 50px;
          font-size: 13px;
        }

        .header {
          width: 100%;
          font-size: 20px;
          font-weight: 600;
          text-align: center;
          padding: 10px 0;
          margin: 0 auto;
          border-bottom: 1px solid #dedede;
        }

        .section {
          width: 90%;
          margin: 0 auto;
          margin-bottom: 10px;

          display: flex;
          gap: 10px;
          flex-direction: column;
        }

        .section-row {
          display: flex;
          gap: 20px;
          height: 30px;
        }

        .input-wrapper {
          width: 50%;
          display: grid;
          grid-template-columns: 70px 1fr;
          align-items: center;
        }

        .textarea-wrapper {
          width: 100%;
          display: flex;
          gap: 20px;
        }

        .textarea-label {
          width: 40px;
        }

        .textarea {
          width: calc(100% - 40px);
        }

        .footer {
          display: flex;
          justify-content: flex-end;
          align-items: top;
          gap: 10px;
          height: fit-content;
          border-top: 1px solid #dedede;
          padding: 20px 20px;
        }

        .footer-btn {
          border: 1px solid #dedede;
          border-radius: 7px;
          background-color: transparent;
          width: 80px;
          height: 30px;
          cursor: pointer;
        }

        .footer-btn-save {
          background-color: black;
          color: white;
        }
      `}</style>
    </div>
  )
}

export default NewLead
