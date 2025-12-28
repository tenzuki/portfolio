import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, ExternalLink, Code, Filter } from 'lucide-react'

const Projects = ({ projects, loading }) => {
  const [selectedFilter, setSelectedFilter] = useState('All')

  const featuredProjects = [
    {
      name: 'AI-POWERED-MOUSE',
      description: 'Control your mouse using hand gestures powered by AI and computer vision',
      tech: ['Python', 'OpenCV', 'MediaPipe', 'AI', 'Computer Vision'],
      featured: true
    },
    {
      name: 'AI-SMART-CAMERA',
      description: 'Smart AI security camera system that detects motion and saves files accordingly',
      tech: ['Python', 'AI', 'Computer Vision'],
      featured: true
    },
    {
      name: 'AI-POWERED-KEYBOARD',
      description: 'Automate and use keyboard functionalities virtually using hand gestures',
      tech: ['Python', 'AI', 'Automation'],
      featured: true
    }
  ]

  const filters = ['All', 'Python', 'AI', 'Computer Vision', 'Machine Learning', 'Web']

  const formatProjectName = (name) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const getProjectTech = (projectName, projectLanguage) => {
    const featured = featuredProjects.find(p => p.name === projectName)
    if (featured) return featured.tech
    // Try to infer from project name
    const name = projectName.toLowerCase()
    if (name.includes('ai') || name.includes('smart')) return ['Python', 'AI', 'Computer Vision']
    return [projectLanguage || 'Python']
  }

  const filteredProjects = projects.filter(project => {
    if (selectedFilter === 'All') return true
    const tech = getProjectTech(project.name, project.language)
    return tech.some(t => 
      t.toLowerCase().includes(selectedFilter.toLowerCase()) ||
      selectedFilter.toLowerCase().includes(t.toLowerCase())
    )
  })

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-number">04.</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-line"></div>
        </motion.div>

        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="project-filters"
          >
            <Filter size={18} />
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="loading-container">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="loading-spinner"
            >
              <Code size={32} />
            </motion.div>
            <p>Loading projects from GitHub...</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="project-card"
              >
                <div className="project-header">
                  <div className="project-icon">
                    <Code size={24} />
                  </div>
                  <div className="project-links">
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="project-link"
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="project-link"
                    >
                      <Github size={18} />
                    </motion.a>
                  </div>
                </div>

                <h3 className="project-name">{formatProjectName(project.name)}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-footer">
                  <div className="project-tech">
                    {getProjectTech(project.name, project.language).map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-stats">
                    <Star size={16} />
                    <span>{project.stars}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="projects-footer"
        >
          <motion.a
            href="https://github.com/tenzuki"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary"
          >
            View All Projects on GitHub
            <Github size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

