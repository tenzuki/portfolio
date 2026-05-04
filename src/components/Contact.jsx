import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="contact" className="contact" ref={ref}>
            <motion.div 
                style={{ scale, opacity }}
                className="contact-bento"
            >
                <div className="contact-image-wrapper">
                    <img src="/assets/photo4.jpg" alt="Parthiv Visual" className="contact-img" />
                </div>
                
                <div className="contact-content">
                    <span className="contact-overline">WHAT'S NEXT?</span>
                    <h2 className="contact-title">Get In Touch</h2>
                    <p className="contact-desc">
                        I'm currently looking for new opportunities and my inbox is always open.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <a href="mailto:parthiv@bezgofresh.com" className="email-btn">
                        Say Hello <Mail size={18} style={{ marginLeft: '0.5rem' }} />
                    </a>

                    <div className="social-links">
                        <a href="https://github.com/tenzuki" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/parthiv-k-134b95282" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </motion.div>

            <footer className="footer">
                <p>Designed & Built by Parthiv K.</p>
                <p>Inspired by the future.</p>
            </footer>
        </section>
    );
};

export default Contact;
