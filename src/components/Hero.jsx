import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'
import TypingAnimation from './TypingAnimation'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="hero-photo-container"
        >
          <motion.div
            className="hero-photo-wrapper"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/profile-photo.jpg"
              alt="Parthiv K"
              className="hero-photo"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="hero-photo-placeholder" style={{ display: 'none' }}>
              <span>PK</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-greeting">
          <span className="greeting-text">Hi, I'm</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="hero-name">
          <span className="name-gradient">Parthiv K</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="hero-title">
          <span className="title-line">I'm a&nbsp;</span>
          <TypingAnimation 
            words={['Tech Lead', 'AI Engineer', 'Python Developer', 'Computer Vision Expert']}
            speed={100}
            deleteSpeed={50}
          />
        </motion.div>

        <motion.p variants={itemVariants} className="hero-description">
          Dedicated to <span className="highlight">Python Programming</span>,{' '}
          <span className="highlight">Computer Vision</span>, and{' '}
          <span className="highlight">Artificial Intelligence</span>.
          Building innovative solutions that push the boundaries of technology.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="hero-buttons"
        >
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hero-socials"
        >
          <motion.a
            href="https://github.com/tenzuki"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="social-link"
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/parthiv-k-134b95282/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="social-link"
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            href="mailto:parthiv.kp28@gmail.com"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="social-link"
          >
            <Mail size={24} />
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

