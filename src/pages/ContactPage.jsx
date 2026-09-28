import Contact from '../components/Contact'
import ScrollCue from '../components/ScrollCue'

function ContactPage() {
  return (
    <div className="contact-page">
      <section className="page-hero page-hero--contact">
        <div className="container">
          <h1 className="page-hero-title">Contact us</h1>
        </div>
        <ScrollCue target="page-end" label="the end of the page" durationMs={10500} page />
      </section>

      <Contact showAddress />
    </div>
  )
}

export default ContactPage
