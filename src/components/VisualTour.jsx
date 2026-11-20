import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, 
    Pause, 
    SkipForward, 
    SkipBack, 
    X, 
    Compass, 
    Volume2, 
    VolumeX, 
    Zap, 
    Target,
    Sparkles,
    Radio,
    Scan
} from 'lucide-react';
import './VisualTour.css';

// 8 Curated Space Reconnaissance Waypoint Sectors
const TOUR_STOPS = [
    {
        id: 'hero',
        selector: '#home .hero-title',
        sectionId: 'home',
        badge: 'SECTOR 01 // ACCRETION DISK & IDENTITY',
        title: 'Parthiv K. — Autonomous Tech Lead & Architect',
        desc: 'Directing full-stack systems architecture, 60 FPS reactive mobile engines, and cloud backends at Bornov Technologies LLP.',
        interactiveHint: 'Recon probe scanning accretion disk & core identity coordinates...',
        cursorOffset: { x: 80, y: 30 }
    },
    {
        id: 'about',
        selector: '#about .pillars-grid, #about .section-container',
        sectionId: 'about',
        badge: 'SECTOR 02 // ARCHITECTURAL PILLARS & APPLIED AI',
        title: 'Full-Stack Systems & Applied Vision Engineering',
        desc: 'Deep mastery across TypeScript/Node.js microservices, 60 FPS Flutter, and computer vision gesture & security models.',
        interactiveHint: 'LiDAR scanning architectural pillar modules & builder manifesto...',
        cursorOffset: { x: 60, y: 70 }
    },
    {
        id: 'experience',
        selector: '#experience .timeline-item-wrapper:first-child, #experience .timeline',
        sectionId: 'experience',
        badge: 'SECTOR 03 // MISSION CHRONICLES',
        title: 'Bornov Technologies LLP & BezgoFresh Crucible',
        desc: 'Scaled solo delivery architecture managing 2,000+ daily orders, 100+ delivery riders with Azure backends and zero-downtime APIs.',
        interactiveHint: 'Probing mission chronicles & high-stakes startup telemetry...',
        cursorOffset: { x: 90, y: 50 }
    },
    {
        id: 'projects',
        selector: '#projects .projects-grid, #projects',
        sectionId: 'projects',
        badge: 'SECTOR 04 // PRODUCTION REPOSITORY VAULT',
        title: '16+ Enterprise Prototypes & Systems',
        desc: 'Interactive repository showcase featuring Bornov Core Systems, Bezgo Riders Mobile App, and real-time Fleet Logistics automation engines.',
        interactiveHint: 'Deploying sub-surface scan across 3D repo cards & codebases...',
        cursorOffset: { x: 100, y: 80 }
    },
    {
        id: 'achievements',
        selector: '#achievements .gh-dashboard-card, #achievements',
        sectionId: 'achievements',
        badge: 'SECTOR 05 // GITHUB TELEMETRY & LIVE METRICS',
        title: 'Verified Badges & Real-Time Sync Matrix',
        desc: 'Featuring 5 verified achievements (Pair Extraordinaire, Pull Shark, Galaxy Brain) and automatic real-time REST API stats sync.',
        interactiveHint: 'Analyzing live GitHub contribution telemetry & streak flame...',
        cursorOffset: { x: 70, y: 40 }
    },
    {
        id: 'ai-assistant',
        selector: '#ai-assistant .ai-chat-card, #ai-assistant',
        sectionId: 'ai-assistant',
        badge: 'SECTOR 06 // NEURAL GEMINI AI CORE',
        title: 'Interactive Conversational Intelligence Link',
        desc: 'Powered by Google Gemini: trained on Parthiv’s full technical architecture, system design principles, and engineering milestones.',
        interactiveHint: 'Calibrating neural synaptic link & conversational telemetry...',
        cursorOffset: { x: 60, y: 60 }
    },
    {
        id: 'certifications',
        selector: '#certifications .cert-grid, #certifications',
        sectionId: 'certifications',
        badge: 'SECTOR 07 // FLIGHT CERTIFICATIONS',
        title: 'Accreditations & Cloud Engineering Standards',
        desc: 'Certified in AWS Cloud, Generative AI, and Machine Learning engineering from prestigious global institutions.',
        interactiveHint: 'Verifying cryptographic security hashes & verified certifications...',
        cursorOffset: { x: 90, y: 50 }
    },
    {
        id: 'contact',
        selector: '#contact .contact-bento, #contact',
        sectionId: 'contact',
        badge: 'SECTOR 08 // DEEP SPACE DISPATCH TERMINAL',
        title: 'Direct Orbital Comms & Systems Collaboration',
        desc: 'Open for high-scale systems architecture, enterprise mobile solutions, and forward-thinking technical advisory.',
        interactiveHint: 'Final orbit achieved • Awaiting collaborative transmission...',
        cursorOffset: { x: 60, y: 50 }
    }
];

// Lightweight Web Audio API Sci-Fi Sound Synthesizer (Zero external MP3 dependencies)
class TourSoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
    }

    playLockOn() {
        if (!this.enabled || !this.ctx) return;
        try {
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(650, now);
            osc.frequency.exponentialRampToValueAtTime(1150, now + 0.08);

            gain.gain.setValueAtTime(0.025, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.12);
        } catch (e) {}
    }

    playSpeedWarp() {
        if (!this.enabled || !this.ctx) return;
        try {
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.exponentialRampToValueAtTime(520, now + 0.18);

            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.22);
        } catch (e) {}
    }

    playScanSweep() {
        if (!this.enabled || !this.ctx) return;
        try {
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.linearRampToValueAtTime(1400, now + 0.08);
            osc.frequency.linearRampToValueAtTime(660, now + 0.2);

            gain.gain.setValueAtTime(0.015, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.22);
        } catch (e) {}
    }
}

const soundFX = new TourSoundFX();

const VisualTour = ({ isActive, onClose }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1x, 1.5x, 2x
    const [isMuted, setIsMuted] = useState(false);
    const [stepProgress, setStepProgress] = useState(0);
    const [speedRamping, setSpeedRamping] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [currentSpeed, setCurrentSpeed] = useState(0);

    // Drone flight & coordinates physics state
    const cursorRef = useRef(null);
    const dronePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const droneHeading = useRef(0);
    const droneHoverTime = useRef(0);
    const highlightedElementRef = useRef(null);
    const subPatrolTimerRef = useRef(null);

    const currentStop = TOUR_STOPS[currentStepIndex];

    // Initialize audio on first activation
    useEffect(() => {
        if (isActive) {
            soundFX.init();
            soundFX.enabled = !isMuted;
        }
    }, [isActive, isMuted]);

    // Clear previous element highlight
    const clearHighlight = useCallback(() => {
        if (highlightedElementRef.current) {
            highlightedElementRef.current.classList.remove('tour-highlighted-element');
            highlightedElementRef.current = null;
        }
        if (subPatrolTimerRef.current) {
            clearInterval(subPatrolTimerRef.current);
            subPatrolTimerRef.current = null;
        }
    }, []);

    // Random sub-patrol movement within the component's visible bounding box
    const triggerSubPatrol = useCallback(() => {
        if (!highlightedElementRef.current) return;
        const rect = highlightedElementRef.current.getBoundingClientRect();
        
        // Ensure coordinates remain safely inside visible screen & element bounds
        const padding = 55;
        const minX = Math.max(70, rect.left + padding);
        const maxX = Math.min(window.innerWidth - 80, rect.right - padding);
        const minY = Math.max(90, rect.top + padding);
        const maxY = Math.min(window.innerHeight - 100, rect.bottom - padding);

        if (maxX > minX && maxY > minY) {
            const randomX = minX + Math.random() * (maxX - minX);
            const randomY = minY + Math.random() * (maxY - minY);
            targetPos.current = { x: randomX, y: randomY };
            soundFX.playScanSweep();
        }
    }, []);

    // Navigate to a specific tour stop with Speed Ramping flight
    const goToStop = useCallback((index) => {
        clearHighlight();
        setCurrentStepIndex(index);
        setStepProgress(0);
        setSpeedRamping(true);
        setIsScanning(false);
        soundFX.playSpeedWarp();

        const stop = TOUR_STOPS[index];
        const el = document.querySelector(stop.selector) || document.getElementById(stop.sectionId);

        if (el) {
            highlightedElementRef.current = el;
            el.classList.add('tour-highlighted-element');

            // Compute element screen coordinates and scroll
            const rect = el.getBoundingClientRect();
            const absoluteTop = window.scrollY + rect.top;
            const targetScrollY = Math.max(0, absoluteTop - (window.innerHeight / 2 - rect.height / 2));

            // Smooth high-performance scroll sync
            window.scrollTo({
                top: targetScrollY,
                behavior: 'smooth'
            });

            // Initial lock position for space drone
            setTimeout(() => {
                const updatedRect = el.getBoundingClientRect();
                targetPos.current = {
                    x: Math.min(window.innerWidth - 90, Math.max(70, updatedRect.left + (stop.cursorOffset?.x || 80))),
                    y: Math.min(window.innerHeight - 90, Math.max(90, updatedRect.top + (stop.cursorOffset?.y || 40)))
                };
            }, 120);

            // Drone arrives at sector: activate LiDAR scanning & start random sub-patrol
            setTimeout(() => {
                setSpeedRamping(false);
                setIsScanning(true);
                soundFX.playLockOn();
                soundFX.playScanSweep();

                // Start random position changes within the component while displayed
                if (subPatrolTimerRef.current) clearInterval(subPatrolTimerRef.current);
                subPatrolTimerRef.current = setInterval(() => {
                    triggerSubPatrol();
                }, 1350 / speedMultiplier);

            }, 600 / speedMultiplier);
        }
    }, [clearHighlight, speedMultiplier, triggerSubPatrol]);

    // Start tour when activated
    useEffect(() => {
        if (isActive) {
            document.body.classList.add('visual-tour-running');
            goToStop(0);
        } else {
            document.body.classList.remove('visual-tour-running');
            clearHighlight();
        }

        return () => {
            document.body.classList.remove('visual-tour-running');
            clearHighlight();
        };
    }, [isActive, goToStop, clearHighlight]);

    // Timer & Auto-advance loop
    useEffect(() => {
        if (!isActive || !isPlaying) return;

        const durationPerStop = 4800 / speedMultiplier;
        const intervalTime = 30;
        const progressIncrement = (intervalTime / durationPerStop) * 100;

        const timer = setInterval(() => {
            setStepProgress(prev => {
                if (prev >= 100) {
                    if (currentStepIndex < TOUR_STOPS.length - 1) {
                        goToStop(currentStepIndex + 1);
                    } else {
                        goToStop(0); // Loop back
                    }
                    return 0;
                }
                return prev + progressIncrement;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [isActive, isPlaying, currentStepIndex, speedMultiplier, goToStop]);

    // Animated Space Drone Flight Physics Loop with Heading Banking & Hover Bobbing
    useEffect(() => {
        if (!isActive) return;

        let rafId;
        let lastTime = performance.now();

        const updateDrone = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;
            droneHoverTime.current += dt;

            const dx = targetPos.current.x - dronePos.current.x;
            const dy = targetPos.current.y - dronePos.current.y;
            const dist = Math.hypot(dx, dy);

            // Adaptive flight speed factor (warp speed vs delicate scan hover)
            const speedFactor = (speedRamping ? 13 : (dist > 50 ? 8 : 4.5)) * speedMultiplier;
            dronePos.current.x += dx * Math.min(1, speedFactor * dt);
            dronePos.current.y += dy * Math.min(1, speedFactor * dt);

            // Subtle sine-wave hover float when hovering
            const hoverBob = Math.sin(droneHoverTime.current * 4) * 3.5;

            // Compute velocity and heading angle for banking
            const vel = Math.round(dist * speedFactor);
            setCurrentSpeed(vel);

            if (dist > 8) {
                const targetAngleRad = Math.atan2(dy, dx) + Math.PI / 2;
                const targetAngleDeg = (targetAngleRad * 180) / Math.PI;
                // Smooth heading interpolation
                let angleDiff = targetAngleDeg - droneHeading.current;
                while (angleDiff < -180) angleDiff += 360;
                while (angleDiff > 180) angleDiff -= 360;
                droneHeading.current += angleDiff * Math.min(1, 10 * dt);
            }

            if (cursorRef.current) {
                const finalX = dronePos.current.x;
                const finalY = dronePos.current.y + hoverBob;
                
                cursorRef.current.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;

                const droneVessel = cursorRef.current.querySelector('.drone-vessel');
                if (droneVessel) {
                    const bankRoll = Math.max(-25, Math.min(25, (dx / 15)));
                    droneVessel.style.transform = `rotate(${droneHeading.current}deg) rotateZ(${bankRoll}deg)`;
                }
            }

            rafId = requestAnimationFrame(updateDrone);
        };

        rafId = requestAnimationFrame(updateDrone);
        return () => cancelAnimationFrame(rafId);
    }, [isActive, speedRamping, speedMultiplier]);

    // Keyboard navigation (Esc to exit, Space to pause, Arrows for next/prev)
    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.code === 'Space') {
                e.preventDefault();
                setIsPlaying(prev => !prev);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentStepIndex < TOUR_STOPS.length - 1) {
                    goToStop(currentStepIndex + 1);
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentStepIndex > 0) {
                    goToStop(currentStepIndex - 1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, currentStepIndex, goToStop, onClose]);

    if (!isActive) return null;

    return (
        <div className="visual-tour-overlay">
            {/* Real Animated Space Reconnaissance Drone */}
            <div 
                ref={cursorRef} 
                className={`space-recon-drone ${speedRamping ? 'is-warping' : ''} ${isScanning ? 'is-scanning' : ''}`}
            >
                {/* Holographic Ventral LiDAR Scanning Cone (Projects onto Component) */}
                <div className="drone-scanner-cone">
                    <div className="scanner-beam-light" />
                    <div className="scanner-sweep-grid" />
                    <div className="scanner-target-reticle">
                        <span className="reticle-bracket bracket-tl" />
                        <span className="reticle-bracket bracket-tr" />
                        <span className="reticle-bracket bracket-bl" />
                        <span className="reticle-bracket bracket-br" />
                        <span className="reticle-pulse-ring" />
                        <span className="reticle-center-cross" />
                    </div>
                </div>

                {/* Physical Sci-Fi Space Drone Vessel */}
                <div className="drone-vessel">
                    {/* Quad Plasma Ion Thruster Plumes */}
                    <div className="thruster-plume plume-tl" />
                    <div className="thruster-plume plume-tr" />
                    <div className="thruster-plume plume-bl" />
                    <div className="thruster-plume plume-br" />

                    {/* High-Tech Vector Drone Chassis SVG */}
                    <svg 
                        className="drone-svg-chassis" 
                        viewBox="0 0 100 100" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* 4 Carbon Outrigger Nacelle Arms */}
                        <path d="M22 22 L40 40 M78 22 L60 40 M22 78 L40 60 M78 78 L60 60" stroke="#00ffcc" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                        
                        {/* 4 Corner Nacelle Rings with Glowing Thruster Cores */}
                        <circle cx="22" cy="22" r="5" fill="#0c1017" stroke="#00ffcc" strokeWidth="2" />
                        <circle cx="78" cy="22" r="5" fill="#0c1017" stroke="#00ffcc" strokeWidth="2" />
                        <circle cx="22" cy="78" r="5" fill="#0c1017" stroke="#00ffcc" strokeWidth="2" />
                        <circle cx="78" cy="78" r="5" fill="#0c1017" stroke="#00ffcc" strokeWidth="2" />

                        {/* Aerodynamic Carbon Stealth Fuselage */}
                        <polygon points="50,12 76,46 68,76 50,88 32,76 24,46" fill="#0b0e14" stroke="#253248" strokeWidth="2" />
                        
                        {/* Titanium Armor Plating */}
                        <polygon points="50,20 68,46 62,70 50,78 38,70 32,46" fill="#131926" stroke="rgba(0, 255, 204, 0.45)" strokeWidth="1" />
                        
                        {/* Directional Front Nose Arrow */}
                        <polygon points="50,15 54,24 46,24" fill="#00ffcc" />

                        {/* Central Ventral Optical Sensor Visor (Pulse Ocular Eye) */}
                        <circle cx="50" cy="50" r="11" fill="#080a0f" stroke="#00ffcc" strokeWidth="2" />
                        <circle cx="50" cy="50" r="6" fill="#00ffcc" className="drone-core-sensor" />
                        <circle cx="50" cy="50" r="2.5" fill="#ffffff" />

                        {/* Oscillating Scanner Sweep Reticle */}
                        <line x1="42" y1="50" x2="58" y2="50" stroke="#00ffcc" strokeWidth="1.5" strokeLinecap="round" className="drone-sensor-sweep-line" />
                    </svg>

                    {/* Glowing Thruster Lights */}
                    <div className="thruster-core-light core-tl" />
                    <div className="thruster-core-light core-tr" />
                    <div className="thruster-core-light core-bl" />
                    <div className="thruster-core-light core-br" />
                </div>

                {/* Real-time Telemetry HUD Attached to Drone */}
                <div className="drone-telemetry-hud">
                    <div className="telemetry-row">
                        <span className="telemetry-badge">
                            {speedRamping ? 'WARP TRANSIT >>' : (isScanning ? '● SCANNING SECTOR' : 'ORBITAL HOVER')}
                        </span>
                        <span className="telemetry-speed">{currentSpeed} KM/S</span>
                    </div>
                    <div className="telemetry-target">{currentStop.badge}</div>
                </div>
            </div>

            {/* Interactive Floating Space Mission HUD Card */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentStop.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="tour-card-floater"
                >
                    <div className="tour-card-header">
                        <div className="tour-card-badge">
                            <Radio size={12} className="tour-target-icon" />
                            <span>{currentStop.badge}</span>
                        </div>
                        <div className="tour-step-counter">
                            {String(currentStepIndex + 1).padStart(2, '0')} / {String(TOUR_STOPS.length).padStart(2, '0')}
                        </div>
                    </div>

                    <h3 className="tour-card-title">{currentStop.title}</h3>
                    <p className="tour-card-desc">{currentStop.desc}</p>

                    <div className="tour-card-status">
                        <Scan size={13} className="tour-hint-icon" />
                        <span>{currentStop.interactiveHint}</span>
                    </div>

                    {/* Mission Sector countdown progress line */}
                    <div className="tour-progress-bar">
                        <div className="tour-progress-fill" style={{ width: `${stepProgress}%` }} />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Space Recon HUD Controller Bar (Bottom Center) */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="tour-hud-bar"
            >
                {/* Live Recon Mission Mode Badge */}
                <div className="hud-mode-pill">
                    <span className="hud-live-dot" />
                    <span>ORBITAL RECON PROBE</span>
                </div>

                {/* Step Navigator */}
                <div className="hud-controls-group">
                    <button 
                        type="button" 
                        onClick={() => currentStepIndex > 0 && goToStop(currentStepIndex - 1)}
                        disabled={currentStepIndex === 0}
                        className="hud-btn"
                        title="Previous Sector (Left Arrow)"
                    >
                        <SkipBack size={15} />
                    </button>

                    <button 
                        type="button" 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hud-btn hud-btn--play"
                        title={isPlaying ? "Hold Orbit (Spacebar)" : "Resume Reconnaissance (Spacebar)"}
                    >
                        {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '2px' }} />}
                    </button>

                    <button 
                        type="button" 
                        onClick={() => currentStepIndex < TOUR_STOPS.length - 1 && goToStop(currentStepIndex + 1)}
                        disabled={currentStepIndex === TOUR_STOPS.length - 1}
                        className="hud-btn"
                        title="Next Sector (Right Arrow)"
                    >
                        <SkipForward size={15} />
                    </button>
                </div>

                {/* Sector Dots Indicator */}
                <div className="hud-dots-track">
                    {TOUR_STOPS.map((stop, idx) => (
                        <button
                            key={stop.id}
                            type="button"
                            onClick={() => goToStop(idx)}
                            className={`hud-dot ${idx === currentStepIndex ? 'is-active' : ''} ${idx < currentStepIndex ? 'is-passed' : ''}`}
                            title={`Jump to ${stop.title}`}
                        />
                    ))}
                </div>

                {/* Speed Multiplier Toggle */}
                <button 
                    type="button" 
                    onClick={() => {
                        const speeds = [1, 1.5, 2];
                        const nextIdx = (speeds.indexOf(speedMultiplier) + 1) % speeds.length;
                        setSpeedMultiplier(speeds[nextIdx]);
                    }}
                    className="hud-speed-btn"
                    title="Toggle Orbital Velocity (1x, 1.5x, 2x)"
                >
                    <Zap size={13} />
                    <span>{speedMultiplier}x</span>
                </button>

                {/* Audio Toggle */}
                <button 
                    type="button" 
                    onClick={() => {
                        const muted = !isMuted;
                        setIsMuted(muted);
                        soundFX.enabled = !muted;
                    }}
                    className="hud-btn"
                    title={isMuted ? "Unmute Telemetry FX" : "Mute Telemetry FX"}
                >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>

                {/* Disengage / Exit Button */}
                <button 
                    type="button" 
                    onClick={onClose} 
                    className="hud-exit-btn"
                    title="Disengage Drone Guide (Esc)"
                >
                    <span>Disengage</span>
                    <span className="hud-esc-tag">ESC</span>
                    <X size={14} />
                </button>
            </motion.div>
        </div>
    );
};

export default VisualTour;
