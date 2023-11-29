import { useEffect, useState } from 'react'
import FormButton from '../ui/form/FormButton'
import FromButtonGroup from '../ui/form/FormButtonGroup'
import FormField from '../ui/form/FormField'
import FormRow from '../ui/form/FormRow'
import FormSection from '../ui/form/FormSection'
import UpsertModal from '../ui/UpsertModal'

export default function AccForm({ onUpsert, selectedItem, onCancel }) {
  const [data, setData] = useState({})

  useEffect(() => {
    if (selectedItem) {
      setData(selectedItem)
    }
  }, [selectedItem])

  function handleChange(event) {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  async function handleUpsert(event) {
    event.preventDefault()
    onUpsert(data, event)
  }

  return (
    <>
      <UpsertModal>
        <form style={{ padding: '20px 30px 20px 30px' }}>
          {/* Account Section */}
          <FormSection title='Account Information'>
            <FormRow>
              <FormField
                label='Account Name'
                value={data?.name || ''}
                type='text'
                onChange={handleChange}
                name='name'
              />
              <FormField
                label='Corperation Name'
                value={data?.corp_name || ''}
                type='text'
                onChange={handleChange}
                name='corp_name'
              />
            </FormRow>
            <FormRow>
              <FormField
                label='CEO Name'
                value={data?.ceo_nm || ''}
                type='text'
                onChange={handleChange}
                name='ceo_nm'
              />
              <FormField
                label='Est Date'
                value={data?.est_dt || ''}
                type='text'
                onChange={handleChange}
                name='est_dt'
              />
            </FormRow>
            <FormRow>
              <FormField
                label='Phone Number'
                value={data?.phn_no || ''}
                type='text'
                onChange={handleChange}
                name='phn_no'
              />
              <FormField
                label='Fax Number'
                value={data?.fax_no || ''}
                type='text'
                onChange={handleChange}
                name='fax_no'
              />
            </FormRow>
            <FormRow>
              <FormField
                label='URL'
                value={data?.hm_url || ''}
                type='text'
                onChange={handleChange}
                name='hm_url'
              />
              <FormField
                label='Industry'
                value={data?.induty_code || ''}
                type='text'
                onChange={handleChange}
                name='induty_code'
              />
            </FormRow>
            <FormRow>
              {/* 사업자등록번호 */}
              <FormField
                label='Company Registration Number'
                value={data?.bizr_no || ''}
                type='text'
                onChange={handleChange}
                name='bizr_no'
              />
              {/* 법인등록번호 */}
              <FormField
                label='Corporation Registration Number'
                value={data?.jurir_no || ''}
                type='text'
                onChange={handleChange}
                name='jurir_no'
              />
            </FormRow>
            <FormRow>
              <FormField
                label='Address'
                value={data?.adres || ''}
                type='textarea'
                onChange={handleChange}
                name='adres'
              />
            </FormRow>
          </FormSection>

          <FromButtonGroup>
            <FormButton onClick={handleUpsert} value='Save' type='confirm' />
            <FormButton onClick={onCancel} value='Cancel' type='cancel' />
          </FromButtonGroup>
        </form>
      </UpsertModal>
    </>
  )
}
