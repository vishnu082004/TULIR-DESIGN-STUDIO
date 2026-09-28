import { useEffect, useRef, useState } from 'react'
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiInstagram,
  FiCheckCircle,
} from 'react-icons/fi'

const formRecipient = 'tulirdesignstudio@gmail.com'

function Contact({ showAddress = false }) {
  const sectionRef = useRef(null)
  const [backgroundReady, setBackgroundReady] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window)) {
      setBackgroundReady(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setBackgroundReady(true)
        observer.disconnect()
      }
    }, { rootMargin: '300px' })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])
  const studioAddress = 'No. 5, David Street, Jerusalam Nagar, Tambaram West, Chennai, 600 045, India'
  const mapQuery = encodeURIComponent(studioAddress)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setSubmissionStatus(null)

    // Clear specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.'
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.'
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid phone number.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    setSubmissionStatus(null)

    try {
      const submittedAtIST = new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      }).format(new Date()) + ' IST'

      const response = await fetch(`https://formsubmit.co/ajax/${formRecipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Website inquiry from ${formData.firstName.trim()} ${formData.lastName.trim()}`,
          _replyto: formData.email.trim(),
          _template: 'table',
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          mobile: formData.mobile.trim(),
          message: formData.message.trim() || '(No message provided)',
          'Submission Time (IST)': submittedAtIST,
          _honey: '',
        }),
      })
      const result = await response.json().catch(() => null)
      const responseMessage = typeof result?.message === 'string' ? result.message : ''

      if (!response.ok || !result) {
        throw new Error(responseMessage || 'The message could not be sent. Please try again.')
      }

      if (/activat|confirm/i.test(responseMessage)) {
        setSubmissionStatus({
          type: 'notice',
          message: `Please check ${formRecipient} for FormSubmit's activation email and activate this form before sending inquiries.`,
        })
        return
      }

      if (result.success === false || String(result.success).toLowerCase() === 'false') {
        throw new Error(responseMessage || 'The message could not be sent. Please try again.')
      }

      setSubmissionStatus({
        type: 'success',
        message: 'Your inquiry has been sent to Tulir Design Studio. Our team will contact you shortly.',
      })
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        message: '',
      })
    } catch (error) {
      setSubmissionStatus({
        type: 'error',
        message: error.message || `Unable to send your inquiry right now. Please try again or email ${formRecipient}.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`contact ${showAddress ? 'contact--page' : ''}`}
      aria-label="Contact Tulir Design Studio"
    >
      {/* Background Architectural Skyline */}
      <div className={`contact-bg-skyline ${backgroundReady ? 'is-ready' : ''}`} aria-hidden="true" />

      <div className="container">
        <div className="contact-header">
          <span className="contact-eyebrow">CONTACT US</span>
          <h2 className="contact-heading">KEEP IN TOUCH</h2>
        </div>

        {showAddress && (
          <div className="contact-methods" aria-label="Contact details">
            <a className="contact-method-card" href="tel:+919710297377">
              <FiPhone aria-hidden="true" />
              <span className="contact-method-label">CALL US</span>
              <span className="contact-method-value">+91 9710297377</span>
            </a>
            <a className="contact-method-card" href="mailto:tulirdesignstudio@gmail.com">
              <FiMail aria-hidden="true" />
              <span className="contact-method-label">MAIL US</span>
              <span className="contact-method-value">tulirdesignstudio@gmail.com</span>
            </a>
            <div className="contact-method-card">
              <FiMapPin aria-hidden="true" />
              <span className="contact-method-label">ADDRESS</span>
              <span className="contact-method-value">
                No. 5, David Street, Jerusalam Nagar, Tambaram West, Chennai, 600 045.
              </span>
            </div>
          </div>
        )}

        <div className="contact-container">
          {/* Left Column: Dark Information Box */}
          <div className="contact-info-card">
            <div>
              <h3 className="contact-info-title">CONTACT INFO</h3>
              <p className="contact-info-desc">
                Have an upcoming residential or commercial architectural project?
                Connect with our team to bring your vision to life.
              </p>

              <div className="contact-details-list">
                {/* Location (Shown only if showAddress is true) */}
                {showAddress && (
                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <FiMapPin />
                    </div>
                    <div className="contact-item-content">
                      <p className="contact-item-label">Our Location</p>
                      <p className="contact-item-value">
                        No. 5, David Street, Jerusalam Nagar,
                        <br />
                        Tambaram West, Chennai, 600 045.
                      </p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <FiPhone />
                  </div>
                  <div className="contact-item-content">
                    <p className="contact-item-label">Let&apos;s Talk</p>
                    <p className="contact-item-value">
                      <a href="tel:+919710297377">+91 9710297377</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <FiMail />
                  </div>
                  <div className="contact-item-content">
                    <p className="contact-item-label">E-mail Us</p>
                    <p className="contact-item-value">
                      <a href="mailto:tulirdesignstudio@gmail.com">
                        tulirdesignstudio@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Website Link */}
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <FiGlobe />
                  </div>
                  <div className="contact-item-content">
                    <p className="contact-item-label">Website</p>
                    <p className="contact-item-value">
                      <a
                        href="https://tulirdesignstudio.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        tulirdesignstudio.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-socials">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
            </div>
          </div>

          {/* Right Column: White Interactive Form */}
          <div className="contact-form-card">
            {showAddress && <h3 className="contact-form-heading">Consult Us Now</h3>}
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="form-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className={`form-input ${errors.firstName ? 'has-error' : ''}`}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <span className="form-error-msg">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="form-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className={`form-input ${errors.lastName ? 'has-error' : ''}`}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <span className="form-error-msg">{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="form-required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={showAddress ? 'Email' : 'name@example.com'}
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="form-error-msg">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number <span className="form-required">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder={showAddress ? 'Mobile Number' : '+91 9876543210'}
                  className={`form-input ${errors.mobile ? 'has-error' : ''}`}
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && (
                  <span className="form-error-msg">{errors.mobile}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder={showAddress ? 'Message' : 'Tell us about your project requirements...'}
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary form-submit-btn"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>

              {submissionStatus && (
                <div
                  className={`form-status-banner form-status-banner--${submissionStatus.type}`}
                  role={submissionStatus.type === 'error' ? 'alert' : 'status'}
                >
                  {submissionStatus.type === 'success' && <FiCheckCircle size={20} />}
                  <span>{submissionStatus.message}</span>
                </div>
              )}
            </form>
          </div>

          {showAddress && (
            <div className="contact-map-card" aria-label="Tulir Design Studio location map">
              <iframe
                className="contact-map"
                title="Map to Tulir Design Studio in Tambaram West, Chennai"
                src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className="contact-map-open"
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Maps ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
