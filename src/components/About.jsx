import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Smartphone, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
    
    const pillars = [
        { 
            step: '01 / ARCHITECTURE',
            icon: <Code2 size={28} />, 
            title: 'Full-Stack Systems', 
            desc: 'Designing end-to-end scalable architectures in TypeScript, Node.js, and Python. From reactive ERPs to Microsoft Azure cloud infrastructure.' 
        },
        { 
            step: '02 / MOBILE FIRST',
            icon: <Smartphone size={28} />, 
            title: 'Production Flutter', 
            desc: 'Engineering 60 FPS mobile applications. Built real-time dispatch systems for 100+ riders and apps currently in Play Store closed testing.' 
        },
        { 
            step: '03 / INTELLIGENCE',
            icon: <Eye size={28} />, 
            title: 'Applied Vision & AI', 
            desc: 'Bridging computer vision algorithms with reality: touchless webcam hand-tracking, motion security systems, and predictive revenue models.' 
        },
        { 
            step: '04 / LEADERSHIP',
            icon: <ShieldCheck size={28} />, 
            title: 'Technical Leadership', 
            desc: 'Driving technical decisions, mentoring code reviews, establishing agile velocity, and turning founder vision into reliable software.' 
        }
    ];

    return (
        <section id="about" className="about" ref={ref}>
            <div className="section-container">
                <motion.div
                    style={{ y: yTitle }}
                    className="section-header"
                >
                    <h2>PROFILE</h2>
                    <p>THE STORY & PHILOSOPHY</p>
                </motion.div>

                <div className="about-content">
                    <div className="about-grid">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="about-text-wrapper"
                        >
                            <TiltCard className="about-text-card">
                                <div className="story-pill">
                                    <Sparkles size={14} /> The Builder's Manifesto
                                </div>
                                
                                <h3 className="story-hook-title">
                                    "I don't just write code. I engineer systems that eliminate operational chaos."
                                </h3>

                                <p className="story-lead-para">
                                    I started by hacking computer vision models to control desktops with touchless hand gestures. But true engineering isn't just about novelty — it's about endurance under real-world pressure. While completing my final year in <span className="highlight-text">B.Tech AI & Data Science at CMS College</span>, I chose to build where the stakes are highest.
                                </p>

                                <p className="story-para">
                                    At BezgoFresh, there was no massive team or safety net. As the solo primary developer, I owned the entire product lifecycle: architecting the <span className="highlight-text">Flutter mobile app for 100+ delivery riders</span>, building logistics dispatch backends, and deploying scalable Azure infrastructure that powered <span className="highlight-text">2,000+ daily active users</span> without breaking.
                                </p>

                                <p className="story-para">
                                    Today, as <span className="highlight-text">Full Stack Developer & Tech Lead at Bornov Technologies LLP</span>, I channel that same high-conviction mindset: leading system design, enforcing code quality, and delivering resilient full-stack products across TypeScript and cloud ecosystems.
                                </p>

                                <div className="story-impact-row">
                                    <div className="story-stat-item">
                                        <span className="story-stat-number">2,000+</span>
                                        <span className="story-stat-label">Daily Users Served</span>
                                    </div>
                                    <div className="story-stat-item">
                                        <span className="story-stat-number">100%</span>
                                        <span className="story-stat-label">Solo Lifecycle Ownership</span>
                                    </div>
                                    <div className="story-stat-item">
                                        <span className="story-stat-number">16</span>
                                        <span className="story-stat-label">Open-Source & Prod Repos</span>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="about-image-wrapper"
                        >
                            <img src="/assets/photo3.jpg" alt="Parthiv K" className="profile-img" loading="lazy" decoding="async" />
                        </motion.div>
                    </div>

                    {/* 4 Story Capabilities Grid */}
                    <div className="skills-grid">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.1 * index, type: "spring" }}
                                className="skill-wrapper"
                            >
                                <TiltCard className="skill-card">
                                    <div className="skill-icon">{pillar.icon}</div>
                                    <span className="skill-step-num">{pillar.step}</span>
                                    <h3>{pillar.title}</h3>
                                    <p>{pillar.desc}</p>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
