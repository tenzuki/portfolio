import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import GhostToggle from './GhostToggle';
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
            <a href="#ai-assistant" className="nav-ai-btn" title="Chat with Parthiv's AI Assistant">
              <Sparkles size={14} color="#64b5f6" /> Ask AI
            </a>
          </li>
          <li><a href="#certifications">Resume</a></li>
          <li><a href="#contact">Contact</a></li>
          <li className="nav-ghost-wrapper">
            <GhostToggle label="" />
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
