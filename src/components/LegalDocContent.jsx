export default function LegalDocContent({ html }) {
  return (
    <div
      className="legal-document"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
