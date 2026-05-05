import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltCard from './TiltCard';
import './GithubAchievements.css';

const GithubAchievements = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

    const badges = [
        {
            id: 'pull-shark',
            name: 'Pull Shark',
            desc: 'Opened pull requests that have been merged.',
            img: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png'
        },
        {
            id: 'yolo',
            name: 'YOLO',
            desc: 'Merged a pull request without code review.',
            img: 'https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png'
        },
        {
            id: 'quickdraw',
            name: 'Quickdraw',
            desc: 'Closed an issue or PR within 5 minutes of opening.',
            img: 'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.5, y: 50, rotateY: -30, filter: "blur(10px)" },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotateY: 0, 
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 60, damping: 15, duration: 1 }
        }
    };

    return (
        <section id="achievements" className="achievements" ref={ref}>
            <div className="section-container">
                <motion.div
                    style={{ y: yTitle }}
                    className="section-header"
                >
                    <h2>ACHIEVEMENTS</h2>
                    <p>GITHUB MILESTONES</p>
                </motion.div>

                <div className="achievements-content">
                    {/* Official Badges Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="badges-grid"
                    >
                        {badges.map((badge) => (
                            <motion.div key={badge.id} variants={badgeVariants} className="badge-wrapper">
                                <TiltCard className="badge-card">
                                    <div className="badge-img-container">
                                        <div className="badge-glow"></div>
                                        <img src={badge.img} alt={badge.name} className="badge-img" />
                                    </div>
                                    <div className="badge-info">
                                        <h4>{badge.name}</h4>
                                        <p>{badge.desc}</p>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Trophies Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: "spring", delay: 0.4 }}
                        className="achievements-wrapper"
                    >
                        <TiltCard className="achievements-card">
                            <h3 className="achievements-title">Profile Trophies</h3>
                            <p className="achievements-desc">A showcase of open source contributions, repositories, and community engagement.</p>
                            <div className="trophy-container">
                                <img 
                                    src="https://github-profile-trophy.vercel.app/?username=tenzuki&theme=radical&no-frame=true&no-bg=true&margin-w=15" 
                                    alt="tenzuki's GitHub Trophies" 
                                    className="trophy-img" 
                                />
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GithubAchievements;
