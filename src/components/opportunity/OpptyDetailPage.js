import DetailPage from '../ui/detail/Page'
import DetailSection from '../ui/detail/Section'
import DetailRow from '../ui/detail/Row'
import DetailField from '../ui/detail/Field'

export default function OpptyDetailPage({ selectedObj }) {
  console.table(selectedObj)
  return (
    <DetailPage>
      {/* 기회 정보 */}
      <DetailSection sectionTitle='Opportunity Information' lastChild={false}>
        <DetailRow textArea={false}>
          <DetailField label='Opportunity Name' value={selectedObj?.name} />
          <DetailField label='Amount' value={selectedObj?.amount} />
        </DetailRow>
        <DetailRow textArea={false}>
          <DetailField label='Account Name' value={selectedObj?.accountName} />
          <DetailField label='Stage' value={selectedObj?.stage} />
        </DetailRow>
        <DetailRow textArea={false}>
          <DetailField label='Close Date' value={selectedObj?.closeDate} />
          <DetailField label='Product' value={selectedObj?.product} />
        </DetailRow>
        <DetailRow textArea={false}>
          <DetailField label='Probability' value={selectedObj?.probability} />
          <DetailField
            label='Expected Revenue'
            value={selectedObj?.expectedRevenue}
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
