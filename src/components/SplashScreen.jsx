import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CreepyEyeButton from './CreepyEyeButton';
import './SplashScreen.css';

// Dynamic status text states inspired by Coding Stella Kinetic Morph Loader
const STATUS_STAGES = [
    { threshold: 0, text: "Initializing components..." },
    { threshold: 22, text: "Loading kinetic framework..." },
    { threshold: 45, text: "Morphing geometric layout..." },
    { threshold: 70, text: "Optimizing 3D cosmic background..." },
    { threshold: 90, text: "Almost ready..." },
    { threshold: 100, text: "Complete!" }
];

const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState(STATUS_STAGES[0].text);

    useEffect(() => {
        const duration = 3200; // Snappy, elegant 3.2s loading experience
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const currentPct = Math.min(100, Math.floor((elapsed / duration) * 100));

            setProgress(currentPct);

            const matched = [...STATUS_STAGES]
                .reverse()
                .find(stage => currentPct >= stage.threshold);
            if (matched) {
                setStatusText(matched.text);
            }

            if (currentPct >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    onComplete();
                }, 350);
            }
        }, 25);

        return () => clearInterval(interval);
    }, [onComplete]);

    // Skip loader
    const handleSkip = () => {
        onComplete();
    };

    return (
        <motion.div 
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0, 
                scale: 1.02, 
                filter: 'blur(10px)',
                transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
            }}
        >
            {/* Ambient Background Vignette */}
            <div className="loader-ambient-glow" />

            {/* Skip Button */}
            <div className="loader-skip-wrap">
                <CreepyEyeButton 
                    onClick={handleSkip} 
                    variant="dark" 
                    size="sm" 
                    className="loader-skip-btn"
                >
                    Skip Intro <ArrowRight size={14} />
                </CreepyEyeButton>
            </div>

            {/* Coding Stella Kinetic Morph Loader Core */}
            <div className="loader-content">
                {/* Telemetry Status Tags */}
                <div className="loader-brand-tag">
                    <span className="loader-brand-dot" />
                    <span className="telemetry-tag">KINETIC MORPH</span>
                    <span className="telemetry-sep">•</span>
                    <span className="telemetry-stage">{progress < 25 ? 'INITIALIZING' : progress < 90 ? 'LOADING' : 'READY'}</span>
                </div>

                {/* Kinetic Morphing Geometric Tiles */}
                <div className="kinetic-shapes">
                    <div className="shape shape-1" />
                    <div className="shape shape-2" />
                    <div className="shape shape-3" />
                    <div className="shape shape-4" />
                </div>
                
                {/* Loading Status & Real-time Counter */}
                <div className="loading-info">
                    <div className="status-text">{statusText}</div>
                    <div className="counter" id="km-count">
                        <span className="km-number">{progress}</span>
                        <span className="km-pct">%</span>
                    </div>
                </div>

                {/* Progress Track & Gradient Fill */}
                <div className="progress-track">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }} 
                    />
                </div>
            </div>

            {/* Bottom Credits */}
            <div className="loader-footer">
                <span>AI & DATA SCIENCE (2026) • BORNOV TECHNOLOGIES LLP</span>
            </div>
        </motion.div>
    );
};

export default SplashScreen;
