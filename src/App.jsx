import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import ScrollReveal from './components/ScrollReveal'

import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

// Modular stylesheets
import './styles/global.css'
import './styles/navbar.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/services.css'
import './styles/team.css'
import './styles/contact.css'
import './styles/footer.css'
import './styles/responsive.css'
import './styles/pages.css'

// Helper component to scroll to top on route change (unless hash anchor is present)
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [pathname, hash])

  return null
}

function RouteDocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    const titles = {
      '/': 'Tulir Design Studio & Interior Design',
      '/about': 'About Us – tulirdesignstudio.com',
      '/about-us': 'About Us – tulirdesignstudio.com',
      '/services': 'Services – tulirdesignstudio.com',
      '/contact': 'Contact Us – tulirdesignstudio.com',
      '/contact-us': 'Contact Us – tulirdesignstudio.com',
      '/privacy-policy': 'Privacy Policy – tulirdesignstudio.com',
    }

    document.title = titles[pathname] || titles['/']
  }, [pathname])

  return null
}

function App() {
  const [lightboxImage, setLightboxImage] = useState(null)

  const openLightbox = (img) => setLightboxImage(img)
  const closeLightbox = () => setLightboxImage(null)

  return (
    <div className="site-wrapper">
      <ScrollToTop />
      <RouteDocumentTitle />
      <ScrollReveal />
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home openLightbox={openLightbox} />} />
          <Route path="/about" element={<AboutPage openLightbox={openLightbox} />} />
          <Route path="/about-us" element={<AboutPage openLightbox={openLightbox} />} />
          <Route path="/services" element={<ServicesPage openLightbox={openLightbox} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<Home openLightbox={openLightbox} />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Image Lightbox Modal */}
      <Lightbox image={lightboxImage} onClose={closeLightbox} />
    </div>
  )
}

export default App
