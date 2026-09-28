import Hero from '../components/Hero'
import About from '../components/About'
import ArchitectureShowcase from '../components/ArchitectureShowcase'
import Services from '../components/Services'
import MissionVision from '../components/MissionVision'
import Team from '../components/Team'
import Contact from '../components/Contact'

function Home({ openLightbox }) {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Section with 3D Mouse Tilt */}
      <About openLightbox={openLightbox} />

      {/* 3. Architectural Showcase Banner */}
      <ArchitectureShowcase openLightbox={openLightbox} />

      {/* 4. Services Grid (6 Cards) */}
      <Services openLightbox={openLightbox} linkImagesToServicePage />

      {/* 5. Mission & Vision Dual Cards */}
      <MissionVision />

      {/* 6. Creative Team Section */}
      <Team openLightbox={openLightbox} />

      {/* 7. Contact Section */}
      <Contact />
    </>
  )
}

export default Home
