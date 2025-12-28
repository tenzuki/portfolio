import { motion } from 'framer-motion'
import { Code, Brain, Eye, Sparkles } from 'lucide-react'

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const interests = [
    {
      icon: <Code size={32} />,
      title: 'Python Programming',
      description: 'Passionate about writing clean, efficient Python code and exploring its vast ecosystem.'
    },
    {
      icon: <Eye size={32} />,
      title: 'Computer Vision',
      description: 'Building intelligent systems that can see, understand, and interpret visual information.'
    },
    {
      icon: <Brain size={32} />,
      title: 'Artificial Intelligence',
      description: 'Creating AI solutions that solve real-world problems and enhance human capabilities.'
    },
    {
      icon: <Sparkles size={32} />,
      title: 'Innovation',
      description: 'Constantly exploring new technologies and pushing the boundaries of what\'s possible.'
    }
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-number">01.</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line"></div>
        </motion.div>

        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-photo-container"
          >
            <div className="about-photo-wrapper">
              <img
                src="/profile-photo.jpg"
                alt="Parthiv K"
                className="about-photo"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="about-photo-placeholder" style={{ display: 'none' }}>
                <span>PK</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="about-text"
          >
            <motion.p variants={itemVariants} className="about-description">
              Hi, I'm <span className="highlight">Parthiv K</span>, a dedicated developer 
              who loves to explore new technologies. Currently serving as{' '}
              <span className="highlight">Tech Lead</span> at{' '}
              <span className="highlight">bezgoFresh</span>, where I've made numerous 
              contributions to the company's technical development and growth.
            </motion.p>
            <motion.p variants={itemVariants} className="about-description">
              My expertise lies in <span className="highlight">Python programming</span>, 
              where I've built various projects ranging from AI-powered applications to 
              computer vision systems. I'm particularly passionate about{' '}
              <span className="highlight">Machine Learning</span> and{' '}
              <span className="highlight">Computer Vision</span>, constantly learning 
              and applying new techniques to solve complex problems.
            </motion.p>
            <motion.p variants={itemVariants} className="about-description">
              When I'm not coding, you'll find me exploring the latest trends in AI, 
              contributing to open-source projects, or working on innovative solutions 
              that make a difference.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="interests-grid"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="interest-card"
              >
                <div className="interest-icon">{interest.icon}</div>
                <h3 className="interest-title">{interest.title}</h3>
                <p className="interest-description">{interest.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

