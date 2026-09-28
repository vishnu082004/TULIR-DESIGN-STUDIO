import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollCue from './ScrollCue'

const slides = [
  { image: '/images/hero.webp', alt: 'Warm contemporary living room' },
  { image: '/images/hero-slide-1.webp', alt: 'Modern bedroom interior' },
  { image: '/images/hero-slide-2.webp', alt: 'Contemporary bedroom and lounge' },
  { image: '/images/hero-slide-3.webp', alt: 'Calm modern bedroom interior' },
]

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loadedSlides, setLoadedSlides] = useState([0])
  const loadedSlidesRef = useRef(new Set([0]))

  const preloadSlide = (index) => {
    if (loadedSlidesRef.current.has(index)) return Promise.resolve()
    return new Promise((resolve) => {
      const image = new Image()
      image.decoding = 'async'
      image.onload = () => {
        loadedSlidesRef.current.add(index)
        setLoadedSlides((loaded) => loaded.includes(index) ? loaded : [...loaded, index])
        resolve()
      }
      image.onerror = resolve
      image.src = slides[index].image
    })
  }

  useEffect(() => {
    const nextSlide = (currentSlide + 1) % slides.length
    const preloadTimer = window.setTimeout(() => preloadSlide(nextSlide), 1200)
    const timer = window.setTimeout(async () => {
      await preloadSlide(nextSlide)
      setCurrentSlide(nextSlide)
    }, 5500)

    return () => {
      window.clearTimeout(preloadTimer)
      window.clearTimeout(timer)
    }
  }, [currentSlide])

  const selectSlide = async (index) => {
    await preloadSlide(index)
    setCurrentSlide(index)
  }

  return (
    <section id="home" className="hero" aria-label="Tulir Design Studio">
      <div className="hero-slides-container" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: loadedSlides.includes(index) ? `url('${slide.image}')` : 'none' }}
            role="img"
            aria-label={slide.alt}
          />
        ))}
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-heading">
          <span className="hero-heading-line">Bring Your Vision To Life</span>
          <span className="hero-heading-line hero-heading-line--second">With Tulir</span>
        </h1>
        <Link to="/#about" className="btn hero-btn">
          Discover Now
        </Link>
      </div>

      <div className="hero-dots" aria-label="Hero image slides">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => selectSlide(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-pressed={index === currentSlide}
          />
        ))}
      </div>

      <ScrollCue target="page-end" label="the end of the page" durationMs={20500} />
    </section>
  )
}

export default Hero
