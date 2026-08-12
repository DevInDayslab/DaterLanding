import LegalPage from '../components/LegalPage'
import cookiesHtml from '../content/legal/cookies.html?raw'

export default function CookiePolicy() {
  return (
    <LegalPage
      heroTitle="Cookie policy"
      pageTitle="Cookie policy"
      html={cookiesHtml}
      currentPath="/cookie-policy"
    />
  )
}
