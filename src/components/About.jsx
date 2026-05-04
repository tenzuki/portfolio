import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Brain, Terminal, Database, Cloud } from 'lucide-react';
import TiltCard from './TiltCard';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
    
    const skills = [
        { icon: <Code2 size={40} />, title: 'Languages & Core', desc: 'Python, JavaScript, Data Structures & Algorithms, System Design.' },
        { icon: <Brain size={40} />, title: 'AI & ML', desc: 'PyTorch, OpenCV, MediaPipe, Predictive Modeling (Random Forest, Prophet).' },
        { icon: <Terminal size={40} />, title: 'Frameworks', desc: 'Flutter, Tkinter, React, Desktop & Mobile App Development.' },
        { icon: <Cloud size={40} />, title: 'Cloud & Tools', desc: 'Microsoft Azure, Railway, Git, API Integrations.' },
        { icon: <Database size={40} />, title: 'Databases', desc: 'SQLite, PostgreSQL, ERP System Development.' }
    ];

    return (
        <section id="about" className="about" ref={ref}>
            <div className="section-container">
                <motion.div
                    style={{ y: yTitle }}
                    className="section-header"
                >
                    <h2>PROFILE</h2>
                    <p>ENGINEERING THE FUTURE</p>
                </motion.div>

                <div className="about-content">
                    <div className="about-grid">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="about-text-wrapper"
                        >
                            <TiltCard className="about-text-card">
                                <h3>PROFILE SUMMARY</h3>
                                <p>
                                    Results-driven Engineering student (BTech AI & DS, CMS College) and <span className="highlight-text">Tech Lead at BezgoFresh</span>, 
                                    with hands-on expertise in <span className="highlight-text">Python, GUI development, and SQLite-based ERP systems</span>.
                                </p>
                                <p>
                                    Proven experience in designing and deploying custom desktop and mobile applications (Flutter) to digitize and streamline last-mile delivery operations. 
                                    Adept at full-stack application development, <span className="highlight-text">computer vision</span>, and data-driven problem solving.
                                </p>
                            </TiltCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="about-image-wrapper"
                        >
                            <img src="/assets/photo3.jpg" alt="Parthiv K" className="profile-img" />
                        </motion.div>
                    </div>

                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1), type: "spring" }}
                                className={`skill-wrapper skill-${index}`}
                            >
                                <TiltCard className="skill-card">
                                    <div className="skill-icon">{skill.icon}</div>
                                    <h3>{skill.title}</h3>
                                    <p>{skill.desc}</p>
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
