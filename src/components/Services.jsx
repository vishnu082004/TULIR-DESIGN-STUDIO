import ServiceCard from './ServiceCard'

export const servicesData = [
  {
    id: 1,
    title: 'Architectural Design',
    description:
      'We offer innovative architectural designs that blend creativity and functionality. We bring your vision to life with precision, optimizing space and style for both residential and commercial projects.',
    image: '/images/service-architectural.webp',
  },
  {
    id: 2,
    title: 'Interior Design',
    description:
      'Tulir Design Studio transforms spaces with creative and functional interior designs, bringing your vision to life with style and elegance.',
    image: '/images/service-interior.webp',
  },
  {
    id: 3,
    title: 'Construction Drawing',
    description:
      'Tulir provides detailed and precise construction drawing, ensuring every aspect of your project is executed flawlessly from start to finish.',
    image: '/images/service-construction.webp',
  },
  {
    id: 4,
    title: '3D Visualization',
    description:
      'Tulir brings your vision to life with detailed 3D visualization plans that offer a realistic view of your future space.',
    image: '/images/service-3d.webp',
  },
  {
    id: 5,
    title: 'New Construction',
    description:
      'We crafts dream homes with innovative designs, quality craftsmanship, and personalized solutions, ensuring every detail reflects your vision.',
    image: '/images/service-new-construction.webp',
  },
  {
    id: 6,
    title: 'Renovation',
    description:
      "Give your home a fresh look with Tulir Design Studio's renovation services. We update and improve your spaces to make them more beautiful and functional.",
    image: '/images/service-renovation.webp',
  },
]

function Services({ openLightbox, description, linkImagesToServicePage = false }) {
  return (
    <section id="services" className="services" aria-label="Our Services">
      <div className="container">
        <div className="services-header">
          <h2 className="services-heading">Our Services</h2>
          {description && <p className="services-description">{description}</p>}
        </div>

        <div className="services-grid">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              openLightbox={openLightbox}
              linkToServicePage={linkImagesToServicePage}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
