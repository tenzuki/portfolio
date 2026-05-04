import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import TiltCard from './TiltCard';
import './Experience.css';

const Experience = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

    return (
        <section id="experience" className="experience" ref={ref}>
            <div className="section-container">
                <motion.div
                    style={{ y: yTitle }}
                    className="section-header"
                >
                    <h2>EXPERIENCE</h2>
                    <p>PROFESSIONAL JOURNEY</p>
                </motion.div>

                <div className="experience-grid">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="exp-image-wrapper"
                    >
                        <img src="/assets/photo1.jpg" alt="Working Environment" className="exp-img" />
                    </motion.div>

                    <div className="timeline">
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="timeline-item-wrapper"
                        >
                            <TiltCard className="timeline-content">
                                <div className="role-header">
                                    <div className="icon-box">
                                        <Briefcase size={32} />
                                    </div>
                                    <div className="role-titles">
                                        <h3>Software Developer / Tech Lead</h3>
                                        <span className="company">BezgoFresh (OGZEB Ventures Pvt Ltd)</span>
                                    </div>
                                    <span className="date">FEB 2025 - PRESENT</span>
                                </div>
                                <ul className="achievements">
                                    <li>Developed and deployed software solutions in a startup environment to improve operational efficiency.</li>
                                    <li>Built and maintained mobile and desktop applications using Flutter and Python.</li>
                                    <li>Designed backend-integrated systems and deployed applications on Microsoft Azure.</li>
                                    <li>Created internal tools for logistics, analytics, and business operations.</li>
                                    <li>Contributed to early-stage product development and system architecture.</li>
                                </ul>
                            </TiltCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
