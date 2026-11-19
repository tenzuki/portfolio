import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import CreepyEyeButton from './CreepyEyeButton';
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="navbar"
    >
      <div className="navbar-container">
        <a href="#" className="logo">Parthiv K.</a>
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
              <Sparkles size={14} color="#000000" /> Ask AI
            </CreepyEyeButton>
          </li>
          <li><a href="#certifications">Resume</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
