import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiMaximize2 } from 'react-icons/fi'

function About({ openLightbox, pageVersion = false }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const aboutImage = {
    src: '/images/about-villa.webp',
    alt: 'Tulir Design Studio Luxury Architectural Villa Concept',
    caption: 'Transform your space with Tulir Design Studio',
  }

  const categories = [
    'Residential Spaces',
    'Luxury Homes',
    'Architectural Excellence',
  ]

  // Interactive 3D mouse-tilt effect reproducing Elementor's motion_fx tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max rotation 8 degrees
    const rotateY = ((x - centerX) / centerX) * 8
    const rotateX = -((y - centerY) / centerY) * 8

    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section id="about" className={`about ${pageVersion ? 'about--page' : 'about--home'}`} aria-label="About Tulir Design Studio">
      <div className="container about-container">
        {/* Left Column: 3D Tilt Image */}
        <div className="about-image-column">
          <div
            ref={cardRef}
            className="about-tilt-card"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => openLightbox && openLightbox(aboutImage)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox && openLightbox(aboutImage)}
            aria-label="View larger image of Tulir Design Studio architecture"
          >
            <div className="about-image-wrapper">
              <img
                src={aboutImage.src}
                alt={aboutImage.alt}
                className="about-image"
                loading="lazy"
              />
              <span className="about-zoom-badge">
                <FiMaximize2 /> Click to enlarge
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Information */}
        <div className="about-content">
          <span className="section-eyebrow">
            {pageVersion ? 'Welcome to Tulir Design Studio' : 'About Tulir Design Studio'}
          </span>
          <h2 className="section-heading">
            {pageVersion
              ? 'Bring your vision to life with Tulir Design Studio'
              : 'Transform your space with Tulir Design Studio.'}
          </h2>
          <p className="about-text">
            Tulir Design Studio is an architectural firm that specializes in
            creating soulful spaces that not only meet the functional needs
            of our clients but also resonate with their emotional values. We
            believe that a well-designed space has the power to transform
            lives, foster connections, and create lasting memories.
          </p>

          {!pageVersion && (
            <>
              <div className="about-categories">
                {categories.map((category, index) => (
                  <span key={category} className="about-category">
                    {category}
                    {index < categories.length - 1 && (
                      <span className="about-divider">|</span>
                    )}
                  </span>
                ))}
              </div>

              <div className="about-actions">
                <Link to="/about" className="btn btn-gold">
                  Read More
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default About
