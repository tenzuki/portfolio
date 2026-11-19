import React, { useRef } from 'react';
import { Github, Linkedin, Mail, Instagram, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import './SocialCards.css';

const SOCIAL_ITEMS = [
    {
        id: 'github',
        name: 'GitHub',
        icon: <Github size={36} />,
        statLabel: 'Impact',
        statValue: '93 Stars • 16 Repos',
        handle: '@tenzuki',
        desc: 'Explore source code, active repositories, and open source work.',
        link: 'https://github.com/tenzuki',
        actionText: 'Explore Code',
        colorHsl: '0 0% 100%',
        badge: 'Verified'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: <Linkedin size={36} />,
        statLabel: 'Role',
        statValue: 'Tech Lead @ Bornov',
        handle: 'Parthiv K',
        desc: 'Professional engineering track record, recommendations & career arc.',
        link: 'https://www.linkedin.com/in/parthiv-k-134b95282',
        actionText: 'Connect Now',
        colorHsl: '210 100% 55%',
        badge: 'Active'
    },
    {
        id: 'email',
        name: 'Direct Inbox',
        icon: <Mail size={36} />,
        statLabel: 'Response Time',
        statValue: '< 24 Hours',
        handle: 'parthiv.kp28@gmail.com',
        desc: 'Direct dispatch for tech lead roles, full-stack builds, and high-impact projects.',
        link: 'mailto:parthiv.kp28@gmail.com',
        actionText: 'Dispatch Email',
        colorHsl: '150 100% 50%',
        badge: 'Priority'
    },
    {
        id: 'instagram',
        name: 'Creative Arc',
        icon: <Instagram size={36} />,
        statLabel: 'Lifestyle',
        statValue: 'Design & Code Life',
        handle: 'Creative Engineering',
        desc: 'Behind-the-scenes engineering experiments, UI visuals & setups.',
        link: 'https://github.com/tenzuki',
        actionText: 'View Creative',
        colorHsl: '330 90% 60%',
        badge: 'Visuals'
    }
];

const SocialCards = () => {
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll('.spotlight-card');
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    };

    return (
        <div 
            id="social-spotlight-cards" 
            className="social-spotlight-container"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            {SOCIAL_ITEMS.map((item) => (
                <div 
                    key={item.id} 
                    className="spotlight-card"
                    style={{ '--card-color': item.colorHsl }}
                >
                    <div className="spotlight-card-content">
                        <div className="card-top-row">
                            <div className="card-icon-box">
                                {item.icon}
                            </div>
                            <span className="card-badge">
                                <CheckCircle2 size={12} /> {item.badge}
                            </span>
                        </div>

                        <div className="card-info-box">
                            <h3 className="card-title">{item.name}</h3>
                            <span className="card-handle">{item.handle}</span>
                            <div className="card-metric-pill">
                                <span className="metric-label">{item.statLabel}:</span>
                                <span className="metric-val">{item.statValue}</span>
                            </div>
                            <p className="card-desc">{item.desc}</p>
                        </div>

                        <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="card-action-btn"
                        >
                            <span>{item.actionText}</span>
                            <ArrowUpRight size={16} />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SocialCards;
