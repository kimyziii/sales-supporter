import DetailPage from '../ui/detail/Page'
import DetailSection from '../ui/detail/Section'
import DetailRow from '../ui/detail/Row'
import DetailField from '../ui/detail/Field'

export default function AccDetailPage({ selectedObj }) {
  return (
    <DetailPage>
      {/* 회사 정보 */}
      <DetailSection sectionTitle='Account Information' lastChild={false}>
        <DetailRow textArea={false}>
          <DetailField label='Account Name' value={selectedObj?.name} />
          <DetailField label='Corp Name' value={selectedObj?.corp_name} />
        </DetailRow>
        <DetailRow textArea={false}>
          <DetailField label='CEO Name' value={selectedObj?.ceo_nm} />
          <DetailField label='Est Date' value={selectedObj?.est_dt} />
        </DetailRow>
        <DetailRow textArea={false}>
          <DetailField label='Phone Number' value={selectedObj?.phn_no} />
          <DetailField label='Fax Number' value={selectedObj?.fax_no} />
        </DetailRow>
        <DetailRow textArea={false}>
          <DetailField label='Url' value={selectedObj?.hm_url} />
          <DetailField label='Industry' value={selectedObj?.induty_code} />
        </DetailRow>
        <DetailRow textArea={false}>
          {/* 사업자등록번호 */}
          <DetailField
            label='Company Registration Number'
            value={selectedObj?.bizr_no}
          />
          {/* 법인등록번호 */}
          <DetailField
            label='Corporation Registration Number
'
            value={selectedObj?.jurir_no}
          />
        </DetailRow>
        <DetailRow textArea={true}>
          <DetailField label='Address' value={selectedObj?.adres} />
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
