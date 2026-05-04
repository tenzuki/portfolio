import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

import './Hero.css';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
    const opacityTitle = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const scaleDesc = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

    const titleText = "PARTHIV K.";
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };
    
    const letterVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -90 },
        visible: { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            transition: { type: "spring", damping: 12, stiffness: 200 }
        }
    };

    return (
        <section id="home" className="hero" ref={ref}>
            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="hero-badge">Welcome to the future</span>
                </motion.div>

                <motion.h1
                    style={{ y: yTitle, opacity: opacityTitle }}
                    className="hero-title"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {titleText.split('').map((char, index) => (
                        <motion.span 
                            key={index} 
                            variants={letterVariants}
                            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    style={{ scale: scaleDesc, opacity: opacityTitle }}
                    className="hero-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    Tech Lead @ BezgoFresh. <br/>
                    Forging ultra-modern experiences with <span className="highlight">Python</span>,
                    <span className="highlight"> Vision</span>, and <span className="highlight">AI</span>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
                    className="hero-actions"
                >
                    <a href="#projects" className="btn btn-primary">
                        View Projects <ArrowRight size={18} />
                    </a>
                    <a href="https://github.com/tenzuki" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <Github size={18} /> GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
