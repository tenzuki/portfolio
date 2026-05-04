import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, FileText, ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';

import './Certifications.css';

const Certifications = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

    const documents = [
        {
            title: "Professional Resume",
            desc: "Comprehensive overview of my experience, skills, and projects.",
            icon: <FileText size={48} />,
            actionText: "Download PDF",
            link: "/assets/resume.pdf", 
            download: "Parthiv_K_Resume.pdf"
        },
        {
            title: "Experience Certificate",
            desc: "Official documentation of my tenure as Tech Lead at BezgoFresh.",
            icon: <Award size={48} />,
            actionText: "View Certificate",
            link: "/assets/certificate.pdf", 
            download: "Parthiv_K_Experience_Certificate.pdf"
        }
    ];

    return (
        <section id="certifications" className="certifications" ref={ref}>
            <div className="section-container">
                <motion.div
                    style={{ y: yTitle }}
                    className="section-header"
                >
                    <h2>CREDENTIALS</h2>
                    <p>VERIFIED EXCELLENCE</p>
                </motion.div>

                <div className="certs-grid">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="cert-image-wrapper"
                    >
                        <TiltCard className="cert-photo-card">
                            <img src="/assets/photo2.jpg" alt="Professional Profile" className="cert-img" />
                        </TiltCard>
                    </motion.div>
                    
                    <div className="cert-docs-wrapper">
                        {documents.map((doc, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
                                className="cert-wrapper"
                            >
                                <a href={doc.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', width: '100%' }}>
                                    <TiltCard className="cert-card">
                                        <div className="cert-icon-wrapper">
                                            {doc.icon}
                                        </div>
                                        <div className="cert-content">
                                            <h3 className="cert-title">{doc.title}</h3>
                                            <p className="cert-desc">{doc.desc}</p>
                                            
                                            <div className="cert-action">
                                                <div className="btn btn-secondary cert-btn">
                                                    {doc.actionText} <ExternalLink size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
