import { FiCheck } from 'react-icons/fi'

const principles = [
  {
    title: 'Our Approach',
    points: [
      'We take a holistic approach to design, considering the emotional, psychological, and social aspects of a space.',
      'We work closely with our clients to understand their purpose, values, and aspirations and use this insight to inform our design decisions.',
      'Our team of experienced architects and designers use their expertise to craft spaces that are not only beautiful but also functional and meaningful.',
    ],
  },
  {
    title: 'Our Philosophy',
    points: [
      'We believe that a space should be a reflection of the people who inhabit it and that it should tell a story that is unique to them.',
      'We believe that good design is not just about aesthetics but about creating an emotional connection between the user and the space.',
      'We believe that our role as architects is not just to design buildings but to create experiences that enrich people’s lives.',
    ],
  },
  {
    title: 'Our Promise',
    points: [
      'We promise to listen deeply to our clients and to use our expertise to create spaces that meet their unique needs and aspirations.',
      'We promise to be creative, innovative, and collaborative in our approach to design.',
      'We promise to deliver high-quality results that exceed our clients’ expectations and to build long-lasting relationships based on trust, respect, and a deep understanding of their needs.',
    ],
  },
  {
    title: 'Our Values',
    points: [
      'Empathy: We listen deeply to our clients and strive to understand their needs, desires, and values.',
      'Collaboration: We work closely with our clients, contractors, and other stakeholders to ensure that every project is a success.',
    ],
  },
  {
    title: 'Our Goal',
    points: [
      'To create spaces that inspire, uplift, and nurture the people who inhabit them.',
      'To build long-lasting relationships with our clients based on trust, respect, and a deep understanding of their needs.',
    ],
  },
]

function Principles({ variant }) {
  return (
    <section className={'principles-section principles-section--' + variant} aria-label="Our principles">
      <div className="container principles-grid">
        {principles.map((item) => (
          <article className="principle-card" key={item.title}>
            <h2 className="principle-title">{item.title}</h2>
            <ul className="principle-points">
              {item.points.map((point) => (
                <li key={point}>
                  <FiCheck aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Principles
