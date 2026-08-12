import { prepareLegalHtml } from '../utils/linkifyLegalDocument'

export default function LegalDocContent({ html }) {
  return (
    <div
      className="legal-document"
      dangerouslySetInnerHTML={{ __html: prepareLegalHtml(html) }}
    />
  )
}
