import LegalPage from '../components/LegalPage'
import communityHtml from '../content/legal/community.html?raw'

export default function CommunityGuidelines() {
  return (
    <LegalPage
      heroTitle="Community guidelines"
      pageTitle="Community guidelines"
      html={communityHtml}
      currentPath="/community-guidelines"
      narrowHero
    />
  )
}
