import { motion } from 'framer-motion'
import { Github, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="footer-content"
        >
          <div className="footer-links">
            <motion.a
              href="https://github.com/tenzuki"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="footer-link"
            >
              <Github size={20} />
            </motion.a>
          </div>

          <p className="footer-text">
            Designed & Built with <Heart size={16} className="heart-icon" /> by Parthiv K
          </p>

          <p className="footer-copyright">
            © {currentYear} Parthiv K. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

