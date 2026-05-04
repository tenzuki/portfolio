import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValue } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ThreeDBackground from './components/ThreeDBackground';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Track mouse for cinematic glow without causing React re-renders
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 400);
      mouseY.set(e.clientY - 400);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      
      {/* Cinematic Vignette Overlay */}
      <div className="vignette-overlay" />
      
      {/* Dynamic Mouse Glow */}
      <motion.div
        className="mouse-glow"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="background-container">
        <ThreeDBackground />
      </div>
      
      <div className="content-overlay">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
