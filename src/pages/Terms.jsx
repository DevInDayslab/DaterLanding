import LegalPage from '../components/LegalPage'
import termsHtml from '../content/legal/terms.html?raw'

export default function Terms() {
  return (
    <LegalPage
      heroTitle="Terms & conditions"
      pageTitle="Terms & conditions"
      html={termsHtml}
      currentPath="/terms"
      narrowHero
    />
  )
}
