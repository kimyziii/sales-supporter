import { useEffect, useState } from 'react'
import FormButton from '../ui/form/FormButton'
import FromButtonGroup from '../ui/form/FormButtonGroup'
import FormField from '../ui/form/FormField'
import FormRow from '../ui/form/FormRow'
import FormSection from '../ui/form/FormSection'
import UpsertModal from '../ui/UpsertModal'

export default function LeadForm({ onUpsert, selectedItem, onCancel }) {
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
          {/* Company Section */}
          <FormSection title='Company Information'>
            <FormRow>
              <FormField
                label='Company Name'
                value={data?.companyName || ''}
                type='text'
                onChange={handleChange}
                name='companyName'
              />
              <FormField
                label='Industry'
                value={data?.industry || ''}
                type='text'
                onChange={handleChange}
                name='industry'
              />
            </FormRow>
            <FormRow>
              <FormField
                label='Number of Employees'
                value={data?.employeeNumber || ''}
                type='number'
                onChange={handleChange}
                name='employeeNumber'
              />
            </FormRow>
          </FormSection>

          {/* Contact Section */}
          <FormSection title='Contact Information'>
            <FormRow>
              <FormField
                label='Contact Name'
                value={data?.contactName || ''}
                type='text'
                onChange={handleChange}
                name='contactName'
              />
              <FormField
                label='Title'
                value={data?.title || ''}
                type='text'
                onChange={handleChange}
                name='title'
              />
            </FormRow>
            <FormRow>
              <FormField
                label='Email'
                value={data?.email || ''}
                type='text'
                onChange={handleChange}
                name='email'
              />
              <FormField
                label='Phone'
                value={data?.phone || ''}
                type='text'
                onChange={handleChange}
                name='phone'
              />
            </FormRow>
          </FormSection>

          {/* Lead Section */}
          <FormSection title='Lead Information'>
            <FormRow>
              <FormField
                label='Lead Source'
                value={data?.leadSource || ''}
                type='text'
                onChange={handleChange}
                name='leadSource'
              />
              <FormField
                label='Lead Status'
                value={data?.leadStatus || ''}
                type='text'
                onChange={handleChange}
                name='leadStatus'
              />
            </FormRow>
            <FormRow>
              <FormField
                label='Lead Platform'
                value={data?.platform || ''}
                type='text'
                onChange={handleChange}
                name='platform'
              />
              <FormField
                label='Product Interest'
                value={data?.productInterest || ''}
                type='text'
                onChange={handleChange}
                name='productInterest'
              />
            </FormRow>
            <FormRow>
              <FormField
                label='Description'
                value={data?.description || ''}
                type='textarea'
                onChange={handleChange}
                name='description'
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
