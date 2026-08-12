import { prepareLegalHtml } from '../utils/linkifyLegalDocument'

export default function LegalDocContent({ html, currentPath }) {
  return (
    <div
      className="legal-document"
      dangerouslySetInnerHTML={{ __html: prepareLegalHtml(html, { currentPath }) }}
    />
  )
}
