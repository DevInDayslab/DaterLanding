import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { usePageSeo } from './hooks/usePageSeo'

export default function App() {
  usePageSeo()

  return (
    <div className="flex min-h-svh flex-col font-google-sans-flex">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
