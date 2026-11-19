import React, { useRef, useState, useEffect } from 'react';
import './CreepyEyeButton.css';

const CreepyEyeButton = ({ 
    children, 
    onClick, 
    href,
    className = '',
    variant = 'primary',
    target,
    rel
}) => {
    const btnRef = useRef(null);
    const eyesRef = useRef(null);
    const [eyeCoords, setEyeCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!eyesRef.current) return;
            const eyesRect = eyesRef.current.getBoundingClientRect();
            const eyes = {
                x: eyesRect.left + eyesRect.width / 2,
                y: eyesRect.top + eyesRect.height / 2
            };
            const dx = e.clientX - eyes.x;
            const dy = e.clientY - eyes.y;
            const angle = Math.atan2(-dy, dx) + Math.PI / 2;
            const visionRangeX = 180;
            const visionRangeY = 90;
            const distance = Math.min(Math.hypot(dx, dy), 300);
            const x = (Math.sin(angle) * distance) / visionRangeX;
            const y = (Math.cos(angle) * distance) / visionRangeY;
            setEyeCoords({ 
                x: Math.max(-1, Math.min(1, x)), 
                y: Math.max(-1, Math.min(1, y)) 
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const translateX = `${-50 + eyeCoords.x * 45}%`;
    const translateY = `${-50 + eyeCoords.y * 45}%`;
    const eyeStyle = {
        transform: `translate(${translateX}, ${translateY})`
    };

    const content = (
        <>
            <span className="creepy-btn__eyes" ref={eyesRef} aria-hidden="true">
                <span className="creepy-btn__eye">
                    <span className="creepy-btn__pupil" style={eyeStyle} />
                </span>
                <span className="creepy-btn__eye">
                    <span className="creepy-btn__pupil" style={eyeStyle} />
                </span>
            </span>
            <span className="creepy-btn__cover">
                {children}
            </span>
        </>
    );

    if (href) {
        return (
            <a 
                ref={btnRef}
                href={href} 
                onClick={onClick}
                target={target}
                rel={rel}
                className={`creepy-btn creepy-btn--${variant} ${className}`}
            >
                {content}
            </a>
        );
    }

    return (
        <button 
            ref={btnRef}
            type="button" 
            onClick={onClick} 
            className={`creepy-btn creepy-btn--${variant} ${className}`}
        >
            {content}
        </button>
    );
};

export default CreepyEyeButton;
