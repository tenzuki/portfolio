import React, { useEffect, useRef } from 'react';

const CustomCursor = ({ disabled = false }) => {
    const cursorRef = useRef(null);
    const pos = useRef({ x: -100, y: -100 });
    const target = useRef({ x: -100, y: -100 });
    const isHovering = useRef(false);
    const isVisible = useRef(false);

    useEffect(() => {
        if (disabled && cursorRef.current) {
            cursorRef.current.style.opacity = '0';
        }
    }, [disabled]);

    useEffect(() => {
        // Only enable on pointer devices (desktop)
        if (!window.matchMedia('(pointer: fine)').matches) {
            return;
        }

        const handleMouseMove = (e) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
            if (!isVisible.current) {
                isVisible.current = true;
                if (cursorRef.current) cursorRef.current.style.opacity = '1';
            }
        };

        const handleMouseOver = (e) => {
            const targetEl = e.target;
            if (targetEl && (
                targetEl.tagName === 'A' || 
                targetEl.tagName === 'BUTTON' || 
                targetEl.closest('a') || 
                targetEl.closest('button') ||
                targetEl.closest('.puzzle-repo-card') ||
                targetEl.closest('.badge-card') ||
                targetEl.closest('.ai-prompt-chip')
            )) {
                isHovering.current = true;
            } else {
                isHovering.current = false;
            }
        };

        const handleMouseLeave = () => {
            isVisible.current = false;
            if (cursorRef.current) cursorRef.current.style.opacity = '0';
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);

        let rafId;
        const render = () => {
            // Smooth lerp follow
            pos.current.x += (target.current.x - pos.current.x) * 0.2;
            pos.current.y += (target.current.y - pos.current.y) * 0.2;

            if (cursorRef.current && !disabled) {
                const scale = isHovering.current ? 1.6 : 1;
                const size = 28;
                cursorRef.current.style.transform = `translate3d(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px, 0) scale(${scale})`;
                cursorRef.current.style.borderColor = isHovering.current ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)';
                cursorRef.current.style.backgroundColor = isHovering.current ? 'rgba(255, 255, 255, 0.08)' : 'transparent';
                if (isVisible.current) cursorRef.current.style.opacity = '1';
            } else if (cursorRef.current && disabled) {
                cursorRef.current.style.opacity = '0';
            }

            rafId = requestAnimationFrame(render);
        };
        rafId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                pointerEvents: 'none',
                zIndex: 99999,
                opacity: 0,
                transition: 'opacity 0.3s ease, border-color 0.2s ease, background-color 0.2s ease',
                willChange: 'transform'
            }}
        />
    );
};

export default CustomCursor;
