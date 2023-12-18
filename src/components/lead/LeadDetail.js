import DetailPage from '../ui/detail/Page'
import DetailSection from '../ui/detail/Section'
import DetailRow from '../ui/detail/Row'
import DetailField from '../ui/detail/Field'
import { addCommas } from './LeadList'

export default function LeadDetailPage({ selectedObj }) {
  return (
    <DetailPage>
      {/* 회사 정보 */}
      <DetailSection sectionTitle='Company Information' lastChild={false}>
        <DetailRow textArea={false}>
          <DetailField label='Company Name' value={selectedObj?.companyName} />
          <DetailField label='Industry' value={selectedObj?.industry} />
        </DetailRow>
        <DetailRow textArea={false}>
          <DetailField
            label='Number of Employees'
            value={addCommas(selectedObj?.employeeNumber)}
          />
        </DetailRow>
      </DetailSection>

      {/* 담당자 정보 */}
      <DetailSection sectionTitle='Contact Information' lastChild={false}>
        <DetailRow textArea={false}>
          <DetailField label='Contact Name' value={selectedObj?.contactName} />
          <DetailField label='Title' value={selectedObj?.title} />
        </DetailRow>
        <DetailRow textArea={false}>
          <DetailField label='Email' value={selectedObj?.email} />
          <DetailField label='Phone' value={selectedObj?.phone} />
        </DetailRow>
        {/* </div> */}
      </DetailSection>
      {/* </div> */}

      {/* 리드 정보 */}
      <DetailSection sectionTitle='Lead Information' lastChild={false}>
        <DetailRow textArea={false}>
          <DetailField label='Lead Source' value={selectedObj?.leadSource} />
          <DetailField label='Lead Status' value={selectedObj?.leadStatus} />
        </DetailRow>
        <DetailRow textArea={false}>
          <DetailField label='Lead Platform' value={selectedObj?.platform} />
          <DetailField
            label='Product Interest'
            value={selectedObj?.productInterest}
          />
        </DetailRow>
        <DetailRow textArea={true}>
          <DetailField label='Description' value={selectedObj?.description} />
        </DetailRow>
      </DetailSection>

      {/* 시스템 정보 */}
      <DetailSection sectionTitle='System Information' lastChild={true}>
        <DetailRow textArea={false}>
          <DetailField label='Created By' value={selectedObj?.createdBy} />
          <DetailField label='Created At' value={selectedObj?.createdAt} />
        </DetailRow>
        <DetailRow textArea={false}>
          <DetailField label='Modified By' value={selectedObj?.modifiedBy} />
          <DetailField label='Modified At' value={selectedObj?.modifiedAt} />
        </DetailRow>
      </DetailSection>
    </DetailPage>
  )
}
