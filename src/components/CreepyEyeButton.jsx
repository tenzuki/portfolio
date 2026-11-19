import React, { useRef, useState, useEffect } from 'react';
import './CreepyEyeButton.css';

const CreepyEyeButton = ({ 
    children, 
    onClick, 
    href,
    type = 'button',
    className = '',
    variant = 'primary',
    size = 'md',
    target,
    rel,
    download,
    disabled = false,
    title,
    style
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

    const fullClassName = `creepy-btn creepy-btn--${variant} creepy-btn--${size} ${disabled ? 'creepy-btn--disabled' : ''} ${className}`;

    if (href) {
        return (
            <a 
                ref={btnRef}
                href={href} 
                onClick={onClick}
                target={target}
                rel={rel}
                download={download}
                title={title}
                style={style}
                className={fullClassName}
            >
                {content}
            </a>
        );
    }

    return (
        <button 
            ref={btnRef}
            type={type} 
            onClick={onClick} 
            disabled={disabled}
            title={title}
            style={style}
            className={fullClassName}
        >
            {content}
        </button>
    );
};

export default CreepyEyeButton;
