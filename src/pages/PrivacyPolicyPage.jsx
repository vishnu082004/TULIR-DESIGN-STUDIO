import { Link } from 'react-router-dom'
import ScrollCue from '../components/ScrollCue'

function PrivacyPolicyPage() {
  return (
    <div className="privacy-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Privacy Policy</h1>
          <p className="page-hero-subtitle">Tulir Design Studio Data & Privacy Standards</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>
        </div>
        <ScrollCue target="page-end" label="the end of the page" durationMs={10500} page />
      </section>

      <section className="page-section">
        <div className="container" style={{ maxWidth: '800px', lineHeight: 1.8 }}>
          <h2 style={{ marginBottom: '16px', color: 'var(--color-heading)' }}>1. Information We Collect</h2>
          <p style={{ marginBottom: '24px', color: 'var(--color-body)' }}>
            When you submit a consultation request through our website, we collect your name, email address, mobile number, and project details to coordinate design consultations and architectural proposals.
          </p>

          <h2 style={{ marginBottom: '16px', color: 'var(--color-heading)' }}>2. How We Use Your Information</h2>
          <p style={{ marginBottom: '24px', color: 'var(--color-body)' }}>
            Your information is strictly utilized to provide architectural, interior design, and construction drawing services. We never sell, trade, or rent personal identification information to external third parties.
          </p>

          <h2 style={{ marginBottom: '16px', color: 'var(--color-heading)' }}>3. Contacting Us</h2>
          <p style={{ color: 'var(--color-body)' }}>
            If you have questions regarding this privacy policy, you may contact us at:
            <br />
            <strong>Tulir Design Studio</strong>
            <br />
            No. 5, David Street, Jerusalam Nagar, Tambaram West, Chennai, 600 045.
            <br />
            Email: tulirdesignstudio@gmail.com
            <br />
            Phone: +91 9710297377
          </p>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicyPage
