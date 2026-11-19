import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Cpu, 
    Smartphone, 
    ShieldCheck, 
    Eye, 
    Rocket, 
    Terminal, 
    ArrowRight 
} from 'lucide-react';
import CreepyEyeButton from './CreepyEyeButton';
import './SplashScreen.css';

const LOADING_MILESTONES = [
    {
        pct: 15,
        icon: <Smartphone size={18} color="#ffffff" />,
        tag: '01 / MOBILE & SYSTEMS',
        title: 'Mounting 60 FPS Flutter & React Systems',
        detail: 'Pre-caching reactive engines and Play Store testing protocols'
    },
    {
        pct: 35,
        icon: <ShieldCheck size={18} color="#ffffff" />,
        tag: '02 / CLOUD & BACKEND',
        title: 'Calibrating Azure Cloud & 2,000+ DAU Logistics',
        detail: 'Verifying BezgoFresh solo architecture & dispatch backends'
    },
    {
        pct: 60,
        icon: <Eye size={18} color="#ffffff" />,
        tag: '03 / APPLIED AI',
        title: 'Synchronizing Vision & MediaPipe Tracking Models',
        detail: 'Touchless gesture control, motion security & predictive revenue engines'
    },
    {
        pct: 82,
        icon: <Cpu size={18} color="#ffffff" />,
        tag: '04 / LEADERSHIP',
        title: 'Connecting Bornov Technologies LLP Telemetry',
        detail: 'Directing full-stack architecture, 16+ repositories & production systems'
    },
    {
        pct: 100,
        icon: <Rocket size={18} color="#ffffff" />,
        tag: '05 / READY',
        title: 'All Systems Operational • Welcome',
        detail: 'Launching Parthiv K Portfolio Experience'
    }
];

const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [activeMilestone, setActiveMilestone] = useState(LOADING_MILESTONES[0]);

    useEffect(() => {
        // High-end smooth progress accumulation over 5 seconds
        const startTime = Date.now();
        const duration = 5000; // Exactly 5.0 seconds as requested

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const currentPct = Math.min(100, Math.floor((elapsed / duration) * 100));

            setProgress(currentPct);

            // Determine active milestone
            const matched = [...LOADING_MILESTONES]
                .reverse()
                .find(m => currentPct >= m.pct);
            if (matched) {
                setActiveMilestone(matched);
            }

            if (currentPct >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    onComplete();
                }, 450); // Satisfying hold at 100%
            }
        }, 25);

        return () => clearInterval(interval);
    }, [onComplete]);

    const handleSkip = () => {
        onComplete();
    };

    return (
        <motion.div 
            className="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0, 
                scale: 1.02, 
                filter: 'blur(8px)',
                transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } 
            }}
        >
            {/* Subtle Minimalist Vignette & Ambient Depth */}
            <div className="splash-ambient-glow" />

            {/* Skip Button */}
            <div className="splash-skip-wrap">
                <CreepyEyeButton 
                    onClick={handleSkip} 
                    variant="dark" 
                    size="sm"
                    className="splash-skip-btn"
                >
                    Skip Intro <ArrowRight size={14} />
                </CreepyEyeButton>
            </div>

            <div className="splash-core-content">
                {/* Minimalist Luxury Avatar Portrait */}
                <div className="splash-avatar-container">
                    <div className="portal-avatar-frame">
                        <img 
                            src="/assets/avatar.jpg" 
                            alt="Parthiv K Avatar" 
                            className="portal-avatar-img" 
                        />
                    </div>

                    <div className="portal-status-badge">
                        <span className="portal-live-dot" />
                        <span>TECH LEAD & ARCHITECT</span>
                    </div>
                </div>

                {/* Identity & Subtitle */}
                <div className="splash-titles">
                    <motion.h1 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="splash-name"
                    >
                        PARTHIV K.
                    </motion.h1>
                    <p className="splash-role">
                        FULL STACK DEVELOPER & TECH LEAD
                    </p>
                    <div className="splash-corp-tag">
                        <span>@ Bornov Technologies LLP</span>
                    </div>
                </div>

                {/* Progress Station & Milestone Cards */}
                <div className="splash-progress-station">
                    {/* Floating Milestone Card */}
                    <div className="milestone-popup-anchor">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeMilestone.tag}
                                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="milestone-card"
                            >
                                <div className="milestone-icon-wrap">
                                    {activeMilestone.icon}
                                </div>
                                <div className="milestone-info">
                                    <div className="milestone-tag-row">
                                        <span className="milestone-tag">{activeMilestone.tag}</span>
                                        <span className="milestone-pct">{progress}%</span>
                                    </div>
                                    <h4 className="milestone-title">{activeMilestone.title}</h4>
                                    <p className="milestone-detail">{activeMilestone.detail}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Minimalist Monochrome Loading Bar */}
                    <div className="splash-track-wrap">
                        <div className="splash-track">
                            <div 
                                className="splash-fill" 
                                style={{ width: `${progress}%` }}
                            >
                                <div className="splash-fill-glow" />
                            </div>
                        </div>

                        {/* Numeric Counter HUD */}
                        <div className="splash-metrics-row">
                            <div className="metrics-left">
                                <Terminal size={14} color="rgba(255, 255, 255, 0.6)" />
                                <span>INITIALIZING PORTFOLIO ENGINE...</span>
                            </div>
                            <div className="metrics-right">
                                <span className="counter-num">{String(progress).padStart(2, '0')}</span>
                                <span className="counter-pct">%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Credits */}
            <div className="splash-footer">
                <span>CMS COLLEGE OF ENGINEERING & TECH • AI & DATA SCIENCE (2026)</span>
            </div>
        </motion.div>
    );
};

export default SplashScreen;
