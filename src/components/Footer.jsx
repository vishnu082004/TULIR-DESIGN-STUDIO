import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin, FiLayers } from 'react-icons/fi'

function Footer() {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact Us', path: '/contact' },
  ]

  return (
    <footer className="footer" aria-label="Footer">
      <div className="container">
        <div className="footer-container">
          {/* Column 1: Brand & Bio */}
          <div className="footer-brand">
            <Link to="/" aria-label="Tulir Design Studio Home">
              <img
                src="/images/logo.webp"
                alt="Tulir Design Studio"
                className="footer-logo"
                loading="lazy"
              />
            </Link>
            <p className="footer-description">
              Tulir Design Studio is an architectural firm that specializes in
              creating soulful spaces that not only meet the functional needs
              of our clients but also resonate with their emotional values. We
              believe that a well-designed space has the power to transform
              lives, foster connections, and create lasting memories.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">
              <FiLayers style={{ color: 'var(--color-primary)' }} /> Quick Links
            </h4>
            <ul className="footer-links-list">
              {quickLinks.map((link) => (
                <li key={link.label} className="footer-link-item">
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="footer-contact-col">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <FiPhone className="footer-contact-icon" />
                <a href="tel:+919710297377">+91 9710297377</a>
              </div>

              <div className="footer-contact-item">
                <FiMail className="footer-contact-icon" />
                <a href="mailto:tulirdesignstudio@gmail.com">
                  tulirdesignstudio@gmail.com
                </a>
              </div>

              <div className="footer-contact-item">
                <FiMapPin className="footer-contact-icon" />
                <span>
                  No. 5, David Street, Jerusalam Nagar,
                  <br />
                  Tambaram West, Chennai, 600 045.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Copyright Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <p className="footer-copyright">
              Copyright &copy; {new Date().getFullYear()} Tulir Design Studio All Rights Reserved | Developed by{' '}
              <a href="https://sagegfx.com/" target="_blank" rel="noopener noreferrer">
                Sage GFX Digital Solutions
              </a>
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
