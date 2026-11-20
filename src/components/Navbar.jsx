import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import CreepyEyeButton from './CreepyEyeButton';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 920 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="navbar"
    >
      <div className="navbar-container">
        <a href="#" className="logo" onClick={handleLinkClick}>
          <span className="logo-text">Parthiv K.</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li>
            <CreepyEyeButton 
              href="#ai-assistant" 
              variant="nav" 
              size="sm" 
              title="Chat with Parthiv's AI Assistant"
            >
              <Sparkles size={13} /> Ask AI
            </CreepyEyeButton>
          </li>
          <li><a href="#certifications">Resume</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          type="button" 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu-drawer"
          >
            <div className="mobile-menu-inner">
              <ul className="mobile-nav-list">
                <li><a href="#about" onClick={handleLinkClick}>About</a></li>
                <li><a href="#experience" onClick={handleLinkClick}>Experience</a></li>
                <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
                <li><a href="#certifications" onClick={handleLinkClick}>Resume</a></li>
                <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
              </ul>

              <div className="mobile-nav-actions">
                <CreepyEyeButton 
                  href="#ai-assistant" 
                  onClick={handleLinkClick}
                  variant="nav" 
                  size="md" 
                  className="mobile-action-btn"
                >
                  <Sparkles size={14} /> Ask AI
                </CreepyEyeButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
