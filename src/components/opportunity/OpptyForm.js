import { useEffect, useState } from 'react'
import FormButton from '../ui/form/FormButton'
import FromButtonGroup from '../ui/form/FormButtonGroup'
import FormField from '../ui/form/FormField'
import FormRow from '../ui/form/FormRow'
import FormSection from '../ui/form/FormSection'
import UpsertModal from '../ui/UpsertModal'

export default function OpptyForm({ onUpsert, selectedItem, onCancel }) {
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
          {/* Opportunity Section */}
          <FormSection title='Opportunity Information'>
            <FormRow>
              <FormField
                label='Opportunity Name'
                value={data?.name || ''}
                type='text'
                onChange={handleChange}
                name='name'
              />
              <FormField
                label='Amount'
                value={data?.amount || ''}
                type='number'
                onChange={handleChange}
                name='amount'
              />
            </FormRow>
            <FormRow>
              <FormField
                label='Account Name'
                value={data?.accountName || ''}
                type='text'
                onChange={handleChange}
                name='accountName'
              />
              <FormField
                label='Close Date'
                value={data?.closeDate || ''}
                type='text'
                onChange={handleChange}
                name='closeDate'
              />
            </FormRow>
            <FormRow>
              <FormField
                label='Probability'
                value={data?.probability || ''}
                type='number'
                onChange={handleChange}
                name='probability'
              />
              <FormField
                label='Expected Revenue'
                value={data?.expectedRevenue || ''}
                type='number'
                onChange={handleChange}
                name='expectedRevenue'
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
