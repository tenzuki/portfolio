import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValue, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GithubAchievements from './components/GithubAchievements';
import AIChatSection from './components/AIChatSection';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ThreeDBackground from './components/ThreeDBackground';
import CustomCursor from './components/CustomCursor';
import VisualTour from './components/VisualTour';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTourActive, setIsTourActive] = useState(false);
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  useEffect(() => {
    // High-performance smooth scroll with Lenis
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Throttled mouse glow tracking
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          mouseX.set(e.clientX - 250);
          mouseY.set(e.clientY - 250);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <CustomCursor disabled={isTourActive} />
      
      {/* Gamified Autopilot Guided Tour */}
      <VisualTour 
        isActive={isTourActive} 
        onClose={() => setIsTourActive(false)} 
      />
      
      {/* Cinematic Vignette Overlay */}
      <div className="vignette-overlay" />
      
      {/* Hardware-accelerated Mouse Glow */}
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
        <Navbar 
          onStartTour={() => setIsTourActive(true)} 
          isTourActive={isTourActive} 
        />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <GithubAchievements />
          <AIChatSection />
          <Certifications />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
