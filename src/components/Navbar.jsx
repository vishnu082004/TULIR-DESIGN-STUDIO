import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Let React Router handle page changes. Only scroll when the current page is selected again.
  const handleNavClick = (e, path, hash) => {
    closeMenu()
    if (location.pathname === path && hash) {
      e.preventDefault()
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else if (path === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const navLinks = [
    { label: 'Home', path: '/', hash: '#home' },
    { label: 'About Us', path: '/about', hash: '#about' },
    { label: 'Services', path: '/services', hash: '#services' },
    { label: 'Contact Us', path: '/contact', hash: '#contact' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu} aria-label="Tulir Design Studio Home">
          <img src="/images/logo.webp" alt="Tulir Design Studio Logo" className="navbar-logo-img" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
              aria-current={isActive(link.path) ? 'page' : undefined}
              onClick={(e) => handleNavClick(e, link.path, link.hash)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Hamburger Toggle */}
        <div className="navbar-actions">
          <Link to="/contact" className="btn navbar-cta">
            Consult Now
          </Link>

          <button
            type="button"
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <aside className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
        <div className="mobile-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              aria-current={isActive(link.path) ? 'page' : undefined}
              onClick={(e) => handleNavClick(e, link.path, link.hash)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mobile-menu-footer">
          <Link to="/contact" className="btn btn-gold mobile-cta" onClick={closeMenu}>
            Consult Now
          </Link>

          <div className="mobile-contact-snippet">
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FiPhone style={{ color: 'var(--color-primary)' }} /> +91 9710297377
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiMail style={{ color: 'var(--color-primary)' }} /> tulirdesignstudio@gmail.com
            </p>
          </div>
        </div>
      </aside>
    </header>
  )
}

export default Navbar
