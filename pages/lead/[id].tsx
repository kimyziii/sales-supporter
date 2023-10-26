import { LeadProps } from '@/components/ui/list-view'
import Wrapper from '@/components/ui/wrapper'
import { db } from '@/firebaseApp'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LeadDetail() {
  const params = useParams()
  const [data, setData] = useState<LeadProps | null>(null)

  async function getLeadDetail(id: string | string[]) {
    if (id) {
      const docRef = doc(db, 'lead', id.toString())
      const docSnap = await getDoc(docRef)
      setData({ id: docSnap?.id, ...(docSnap.data() as LeadProps) })
    }
  }

  useEffect(() => {
    if (params?.id) getLeadDetail(params?.id)
  }, [params?.id])

  return (
    <Wrapper>
      <div className='lead-detail-wrapper'>
        <div className='header-section'>
          <div className='header-section--title'>
            <div className='header-section--icon'>
              <img
                src='/icons/lead.svg'
                style={{ width: '20px', height: '20px' }}
              />
            </div>
            <div className='header-section--text'>
              <div className='header-section--object'>Lead</div>
              <div className='header-section--name'>{data?.contactName}</div>
            </div>
          </div>
          <div className='header-section--buttons'>
            <button>Edit</button>
            <button>Delete</button>
            <button>Convert</button>
          </div>
        </div>
        {/* Lead Detail Section */}
        <div className='detail-section__content'>
          <div className='detail-section__content--section'>
            <div className='detail-section__content--section__title'>
              Contact Information
            </div>
            <div className='detail-section__content--row'>
              <div className='detail-section__content--field'>
                <div>Contact Name</div>
                <div>{data?.contactName}</div>
              </div>
              <div className='detail-section__content--field'>
                <div>Title</div>
                <div>{data?.title}</div>
              </div>
            </div>
            <div className='detail-section__content--row'>
              <div className='detail-section__content--field'>
                <div>Phone</div>
                <div>{data?.phone}</div>
              </div>
              <div className='detail-section__content--field'>
                <div>Email</div>
                <div>{data?.email}</div>
              </div>
            </div>
          </div>
          <div className='detail-section__content--section'>
            <div className='detail-section__content--section__title'>
              Company Information
            </div>
            <div className='detail-section__content--row'>
              <div className='detail-section__content--field'>
                <div>Company Name</div>
                <div>{data?.companyName}</div>
              </div>
              <div className='detail-section__content--field'>
                <div>Industry</div>
                <div>{data?.industry}</div>
              </div>
            </div>
            <div className='detail-section__content--row'>
              <div className='detail-section__content--field'>
                <div>Employee Number</div>
                <div>{data?.employeeNumber}</div>
              </div>
              <div className='detail-section__content--field'></div>
            </div>
          </div>
          <div className='detail-section__content--section'>
            <div className='detail-section__content--section__title'>
              Lead Information
            </div>
            <div className='detail-section__content--row'>
              <div className='detail-section__content--field'>
                <div>Lead Source</div>
                <div>{data?.leadSource}</div>
              </div>
              <div className='detail-section__content--field'>
                <div>Lead Status</div>
                <div>{data?.leadStatus}</div>
              </div>
            </div>
            <div className='detail-section__content--row'>
              <div className='detail-section__content--field'>
                <div>Product Interest</div>
                <div>{data?.productInterest}</div>
              </div>
              <div className='detail-section__content--field'>
                <div>Created Date</div>
                <div>{data?.createdAt}</div>
              </div>
            </div>
            <div className='detail-section__content--row'>
              <div className='detail-section__content--field text-area'>
                <div>Description</div>
                <div>{data?.description}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Lead Related Section */}
        <div className='related-section'></div>

        <style jsx>{`
          .lead-detail-wrapper {
            width: 100%;
            height: fit-content;
            margin: 0 auto;
            margin-top: 5px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            overflow-y: scroll;
          }

          .header-section {
            height: 40px;
            display: flex;
            flex-direction: row;
            padding: 20px;
            justify-content: space-between;
            border: 1px solid #dedede;
          }

          .header-section--title {
            height: inherit;
            display: flex;
            gap: 10px;
            place-items: center;
            font-size: 16px;
          }

          .header-section--object {
            font-size: 12px;
            color: gray;
          }

          .header-section--icon {
            padding: 10px;
            background: #ff6c2f;
            width: 20px;
            height: 20px;
            overflow: hidden;
          }

          .header-section--buttons {
            height: inherit;
            display: flex;
            flex-direction: row;
            font-size: 14px;
          }

          .header-section--buttons button {
            padding: 0 16px;
            background: transparent;
            border: 1px solid black;
            cursor: pointer;
          }

          .header-section--buttons button:first-child {
            border-top-left-radius: 7px;
            border-bottom-left-radius: 7px;
            border-collapse: collapse;
          }

          .header-section--buttons button:last-child {
            border-top-right-radius: 7px;
            border-bottom-right-radius: 7px;
            border-collapse: collapse;
          }

          .detail-section__content {
            height: fit-content;
            border: 1px solid #dedede;
            padding-top: 10px;
          }

          .detail-section__content--section {
            display: flex;
            flex-direction: column;
            margin-bottom: 16px;
          }

          .detail-section__content--section__title {
            font-size: 14px;
            font-weight: 600;
            background: #3a3b3c;
            padding: 8px 16px;
            color: white;
            margin: 10px 20px;
          }

          .detail-section__content--row {
            // width: calc(100% - 72px);
            display: flex;
            flex-direction: row;
            gap: 20px;
            margin: 10px 40px;
            place-items: center;
            justify-content: space-between;
          }

          .detail-section__content--row .text-area {
            width: 100%;
          }

          .detail-section__content--field {
            width: 50%;
            display: flex;
            flex-direction: column;
          }

          // 라벨
          .detail-section__content--field div:first-child {
            color: gray;
            font-size: 12px;
          }

          // 필드 값
          .detail-section__content--field div:last-child {
            padding: 8px 8px;
            border-bottom: 1px solid gray;
            min-height: 20px;
            font-size: 14px;
          }

          .detail-section__content--field .text-area {
            padding: 8px 8px;
            border-bottom: 1px solid gray;
            min-height: 20px;
          }

          .related-section {
            width: 100%;
          }
        `}</style>
      </div>
    </Wrapper>
  )
}
