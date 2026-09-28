import { Link } from 'react-router-dom'
import { FiMaximize2 } from 'react-icons/fi'

function ServiceCard({ service, openLightbox, linkToServicePage = false }) {
  const imageContent = (
    <>
      <img
        src={service.image}
        alt={service.title}
        className="service-image"
        loading="lazy"
      />
      <span className="service-image-hint">
        <FiMaximize2 /> {linkToServicePage ? 'Explore services' : 'Click to enlarge'}
      </span>
    </>
  )

  return (
    <article className="service-card">
      {linkToServicePage ? (
        <Link
          to="/services"
          className="service-image-wrapper"
          aria-label={`Explore ${service.title} on the Services page`}
        >
          {imageContent}
        </Link>
      ) : (
        <button
          type="button"
          className="service-image-wrapper"
          onClick={() =>
            openLightbox &&
            openLightbox({
              src: service.image,
              alt: service.title,
              caption: service.title,
            })
          }
          aria-label={`View larger image for ${service.title}`}
        >
          {imageContent}
        </button>
      )}

      <div className="service-card-body">
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>
      </div>
    </article>
  )
}

export default ServiceCard
