import About from '../components/About'
import Principles from '../components/Principles'
import ScrollCue from '../components/ScrollCue'

function AboutPage({ openLightbox }) {
  return (
    <div className="about-page">
      <section className="page-hero page-hero--about">
        <div className="container">
          <p className="page-hero-eyebrow">ABOUT TULIR DESIGN STUDIO</p>
          <h1 className="page-hero-title">About Us</h1>
        </div>
        <ScrollCue target="page-end" label="the end of the page" durationMs={10500} page />
      </section>

      <About openLightbox={openLightbox} pageVersion />

      <section className="why-choose-us" aria-labelledby="why-choose-us-title">
        <div className="container why-choose-us-grid">
          <div className="why-choose-us-copy">
            <h2 id="why-choose-us-title">Why Choose Us</h2>
            <p>
              At Tulir Design Studio, we combine expertise and creativity to
              deliver tailored interior design and construction documentation
              solutions. Our client-focused approach ensures your vision is
              realized with precision and care.
            </p>
          </div>
          <img
            className="why-choose-us-image"
            src="/images/why-choose-us.webp"
            alt="Notebook with the words Why Choose Us on an architect's desk"
            loading="lazy"
          />
        </div>
      </section>

      <Principles variant="about" />
    </div>
  )
}

export default AboutPage
