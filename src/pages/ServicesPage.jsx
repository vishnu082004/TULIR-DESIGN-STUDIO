import Services from '../components/Services'
import Principles from '../components/Principles'
import ScrollCue from '../components/ScrollCue'

function ServicesPage({ openLightbox }) {
  return (
    <div className="services-page">
      <section className="page-hero page-hero--services">
        <div className="container">
          <div className="page-hero-heading-group">
            <p className="page-hero-eyebrow">OUR EXPERTISE</p>
            <h1 className="page-hero-title">Explore</h1>
          </div>
          <div className="page-hero-side-group">
            <p className="page-hero-eyebrow">THOUGHTFUL DESIGN. BUILT AROUND YOU.</p>
            <p className="page-hero-side-title">What we can offer you</p>
          </div>
        </div>
        <ScrollCue target="page-end" label="the end of the page" durationMs={15500} page />
      </section>

      <Services
        openLightbox={openLightbox}
        description="At Tulir Design Studio, we create stunning interiors and provide precise construction documentation, turning your vision into reality with exceptional results. Explore our services today!"
      />

      <Principles variant="services" />
    </div>
  )
}

export default ServicesPage
