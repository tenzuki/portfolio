import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      title: 'Tech Lead',
      company: 'bezgoFresh',
      location: 'Startup',
      period: 'Current',
      description: [
        'Leading the technical development and architecture of the company',
        'Made numerous contributions to the company\'s technical infrastructure',
        'Managing and mentoring development teams',
        'Driving innovation in product development and technical solutions'
      ]
    }
  ]

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-number">03.</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line"></div>
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="experience-item"
            >
              <div className="experience-icon">
                <Briefcase size={24} />
              </div>
              <div className="experience-content">
                <h3 className="experience-title">{exp.title}</h3>
                <div className="experience-meta">
                  <span className="experience-company">
                    <MapPin size={16} />
                    {exp.company}
                  </span>
                  <span className="experience-period">
                    <Calendar size={16} />
                    {exp.period}
                  </span>
                </div>
                <ul className="experience-description">
                  {exp.description.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + itemIndex * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

