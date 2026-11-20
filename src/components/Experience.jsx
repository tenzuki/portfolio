import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Briefcase, Sparkles, Smartphone, Cpu, MapPin } from 'lucide-react';
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
                    <span className="section-label">03 / EXPERIENCE</span>
                    <h2>Production <em className="serif-accent">Chronicles</em></h2>
                    <p>SYSTEMS ARCHITECTURE &amp; LEADERSHIP</p>
                </motion.div>

                <div className="timeline">
                    {/* Chapter 01: Bornov Technologies LLP */}
                    <div className="chapter-item">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="exp-image-wrapper"
                        >
                            <img 
                                src="/assets/photo1.jpg" 
                                alt="Bornov Technologies - Parthiv K" 
                                className="exp-img" 
                                loading="lazy" 
                                decoding="async" 
                            />
                            <div className="exp-image-badge">
                                <span className="exp-image-badge-dot" />
                                <span>BORNOV TECHNOLOGIES LLP</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="timeline-item-wrapper"
                        >
                            <TiltCard className="timeline-content">
                                <div className="chapter-tag">
                                    <Sparkles size={14} /> CHAPTER 01 / LEADERSHIP & SYSTEMS
                                </div>

                                <div className="chapter-top-row">
                                    <div className="chapter-icon-box">
                                        <Terminal size={32} />
                                    </div>
                                    <div className="chapter-titles">
                                        <h3>Full Stack Developer & Tech Lead</h3>
                                        <div className="chapter-company">Bornov Technologies LLP</div>
                                    </div>
                                    <span className="chapter-date">PAST 2 MONTHS — PRESENT</span>
                                </div>

                                <h4 className="chapter-hook-headline">
                                    "Architecting with Conviction: Steering High-Stakes Full-Stack Systems from Concept to Production."
                                </h4>

                                <p className="chapter-narrative">
                                    Joining Bornov Technologies as Tech Lead marked a transition into high-leverage architectural ownership. When building digital products in rapid startup cycles, speed without architecture leads to collapse. My mandate has been to establish clean full-stack foundations, lead TypeScript and cloud services, and ensure every system withstands real-world production demands.
                                </p>

                                <div className="breakthroughs-list">
                                    <div className="breakthrough-item">
                                        <div className="breakthrough-header">
                                            <span>🏗️ Systems Architecture & Technical Direction</span>
                                            <span className="badge">LEADERSHIP</span>
                                        </div>
                                        <p className="breakthrough-desc">
                                             Guiding end-to-end full stack architecture, selecting scalable framework patterns, and mentoring code reviews across frontend, backend, and repository infrastructure (associated with <code>bornovdev</code>).
                                        </p>
                                    </div>

                                    <div className="breakthrough-item">
                                        <div className="breakthrough-header">
                                            <span>⚡ Core Product Prototyping</span>
                                            <span className="badge">TYPESCRIPT</span>
                                        </div>
                                        <p className="breakthrough-desc">
                                            Architected and engineered technical machine tests and enterprise prototypes (<code>Bornov_machine_test</code>), validating real-time interactions, data serialization, and backend integrations.
                                        </p>
                                    </div>

                                    <div className="breakthrough-item">
                                        <div className="breakthrough-header">
                                            <span>🛡️ Engineering Velocity & Quality</span>
                                            <span className="badge">AGILE</span>
                                        </div>
                                        <p className="breakthrough-desc">
                                            Streamlining agile sprints, setting testability standards, and establishing high-conviction deployment pipelines that eliminate production regressions.
                                        </p>
                                    </div>
                                </div>

                                <div className="chapter-footer-metrics">
                                    <div className="impact-pills-row">
                                        <span className="impact-pill impact-pill-accent">🚀 Tech Lead Mandate</span>
                                        <span className="impact-pill">Full-Stack TypeScript</span>
                                        <span className="impact-pill">Clean Architecture</span>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    </div>

                    {/* Chapter 02: BezgoFresh */}
                    <div className="chapter-item">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring", delay: 0.1 }}
                            className="exp-image-wrapper"
                        >
                            <img 
                                src="/assets/photo_bezgo.jpg" 
                                alt="BezgoFresh Solo Crucible - Parthiv K" 
                                className="exp-img exp-img-bezgo" 
                                loading="lazy" 
                                decoding="async" 
                            />
                            <div className="exp-image-badge">
                                <span className="exp-image-badge-dot" />
                                <span>BEZGOFRESH STARTUP CRUCIBLE</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                            className="timeline-item-wrapper"
                        >
                            <TiltCard className="timeline-content">
                                <div className="chapter-tag">
                                    <Sparkles size={14} /> CHAPTER 02 / THE SOLO STARTUP CRUCIBLE
                                </div>

                                <div className="chapter-top-row">
                                    <div className="chapter-icon-box">
                                        <Briefcase size={32} />
                                    </div>
                                    <div className="chapter-titles">
                                        <h3>Software Developer / Tech Lead</h3>
                                        <div className="chapter-company">BezgoFresh (OGZEB Ventures Pvt Ltd)</div>
                                    </div>
                                    <span className="chapter-date">FEB 2025 — MAY 2026</span>
                                </div>

                                <h4 className="chapter-hook-headline">
                                    "The Solo Crucible: Taking a Chaotic Delivery Network from Manual Dispatch to 2,000+ Daily Cloud Orders."
                                </h4>

                                <p className="chapter-narrative">
                                    When I stepped into BezgoFresh, the startup was scaling rapidly, but last-mile logistics was bleeding operational hours through manual coordination and fragmented spreadsheets. As the solo primary developer, there was no safety net. Over 15 months, I architected, coded, and deployed the complete technological backbone from scratch across Flutter mobile, Python backends, and Microsoft Azure.
                                </p>

                                <div className="breakthroughs-list">
                                    <div className="breakthrough-item">
                                        <div className="breakthrough-header">
                                            <span>📱 Bezgo Riders Mobile App</span>
                                            <span className="badge">FLUTTER · AZURE</span>
                                        </div>
                                        <p className="breakthrough-desc">
                                            Engineered the high-performance Flutter Android app utilized daily by 100+ active delivery riders for order acceptance, real-time GPS tracking, and delivery fulfillment with Bearer token authentication.
                                        </p>
                                    </div>

                                    <div className="breakthrough-item">
                                        <div className="breakthrough-header">
                                            <span>🗺️ Autonomous Fleet Logistics System</span>
                                            <span className="badge">PYTHON · WEB</span>
                                        </div>
                                        <p className="breakthrough-desc">
                                            Eliminated dispatch delays by building a full-stack dashboard that auto-assigns incoming orders based on SLA constraints, GPS proximity, and live workload balancing.
                                        </p>
                                    </div>

                                    <div className="breakthrough-item">
                                        <div className="breakthrough-header">
                                            <span>🧠 Bezgo AI Forecasting Engine</span>
                                            <span className="badge">RANDOM FOREST · PROPHET</span>
                                        </div>
                                        <p className="breakthrough-desc">
                                            Engineered predictive business intelligence algorithms predicting monthly revenue, profit/loss margins, and seasonal demand trends, giving executive leadership dependable foresight.
                                        </p>
                                    </div>
                                </div>

                                <div className="chapter-footer-metrics">
                                    <div className="impact-pills-row">
                                        <span className="impact-pill impact-pill-accent">🔥 2,000+ Daily Users</span>
                                        <span className="impact-pill">100+ Active Riders</span>
                                        <span className="impact-pill">100% Solo Lifecycle</span>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
