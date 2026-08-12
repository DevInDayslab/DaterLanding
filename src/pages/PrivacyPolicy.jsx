import LegalPage from '../components/LegalPage'
import privacyHtml from '../content/legal/privacy.html?raw'

export default function PrivacyPolicy() {
  return (
    <LegalPage
      heroTitle="Privacy policy"
      pageTitle="Privacy policy"
      html={privacyHtml}
      currentPath="/privacy-policy"
      narrowHero
    />
  )
}
