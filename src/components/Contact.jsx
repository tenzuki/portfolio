import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';
import CreepyEyeButton from './CreepyEyeButton';
import SocialCards from './SocialCards';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

    return (
        <section id="contact" className="contact" ref={ref}>
            <div className="section-container">
                <motion.div 
                    style={{ scale, opacity }}
                    className="contact-bento"
                >
                    <div className="contact-image-wrapper">
                        <img src="/assets/photo4.jpg" alt="Parthiv Visual" className="contact-img" loading="lazy" decoding="async" />
                    </div>
                    
                    <div className="contact-content">
                        <span className="contact-overline">05 / WHAT'S NEXT?</span>

                        <h2 className="contact-title">Let's build <em className="serif-accent">together.</em></h2>
                        <p className="contact-desc">
                            Currently leading engineering at Bornov Technologies LLP. My inbox is always open for ambitious full-stack systems, mobile architectures, or technical leadership.
                        </p>

                        <div className="contact-cta-row">
                            <CreepyEyeButton 
                                href="mailto:parthiv.kp28@gmail.com" 
                                variant="primary"
                                size="lg"
                                className="contact-creepy-btn"
                            >
                                Say Hello <Mail size={18} />
                            </CreepyEyeButton>
                        </div>
                    </div>
                </motion.div>

                {/* Animated Social Media Spotlight Hub - Coding Stella Inspired */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="contact-spotlight-hub"
                >
                    <div className="spotlight-hub-header">
                        <span className="hub-overline">CONNECTED NETWORKS</span>
                        <h3 className="hub-title">Spotlight Hub</h3>
                        <p className="hub-desc">Move your cursor across the cards to trigger interactive radial lighting.</p>
                    </div>

                    <SocialCards />
                </motion.div>

                <footer className="footer">
                    <p>Designed & Built by Parthiv K. • Tech Lead & Full Stack Developer</p>
                    <p>Crafted with precision, high performance, and interactive vision.</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
