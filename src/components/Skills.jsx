import { motion } from 'framer-motion'

const Skills = () => {
  const skillsWithProgress = [
    { name: 'Python', level: 95 },
    { name: 'TensorFlow', level: 85 },
    { name: 'PyTorch', level: 80 },
    { name: 'OpenCV', level: 90 },
    { name: 'NumPy', level: 88 },
    { name: 'Pandas', level: 87 },
    { name: 'Machine Learning', level: 85 },
    { name: 'Computer Vision', level: 90 },
    { name: 'JavaScript', level: 70 },
    { name: 'SQL', level: 75 },
    { name: 'Git', level: 85 },
    { name: 'Keras', level: 82 }
  ]

  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      skills: ['Python', 'JavaScript', 'SQL', 'HTML/CSS']
    },
    {
      title: 'AI & Machine Learning',
      skills: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'OpenCV']
    },
    {
      title: 'Data Science',
      skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter']
    },
    {
      title: 'Databases',
      skills: ['SQLite', 'MySQL', 'PostgreSQL']
    },
    {
      title: 'Tools & Others',
      skills: ['Git', 'Figma', 'Canva', 'GIMP', 'Home Assistant']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-number">02.</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="section-line"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="skills-progress-section"
        >
          <h3 className="progress-section-title">Core Skills</h3>
          <div className="progress-bars">
            {skillsWithProgress.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="progress-item"
              >
                <div className="progress-header">
                  <span className="progress-skill-name">{skill.name}</span>
                  <span className="progress-percentage">{skill.level}%</span>
                </div>
                <div className="progress-bar-container">
                  <motion.div
                    className="progress-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="skills-grid"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="skill-category"
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.1, x: 5 }}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

