import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import FAQs from './pages/FAQs.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import CommunityGuidelines from './pages/CommunityGuidelines.jsx'
import CookiePolicy from './pages/CookiePolicy.jsx'
import DownloadRedirect from './pages/DownloadRedirect.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/download" element={<DownloadRedirect />} />
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="faq" element={<FAQs />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="community-guidelines" element={<CommunityGuidelines />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="contact" element={<Navigate to="/contact-us" replace />} />
          <Route path="faqs" element={<Navigate to="/faq" replace />} />
          <Route path="privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="cookies" element={<Navigate to="/cookie-policy" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
