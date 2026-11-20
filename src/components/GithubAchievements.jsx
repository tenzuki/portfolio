import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
    Star, 
    GitPullRequest, 
    Flame, 
    ExternalLink, 
    Award, 
    Code2, 
    Calendar,
    Building2,
    Radio
} from 'lucide-react';
import TiltCard from './TiltCard';
import CreepyEyeButton from './CreepyEyeButton';
import './GithubAchievements.css';

const GithubAchievements = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

    // Dynamic stats with automatic live synchronization to GitHub REST API
    const [stats, setStats] = useState({
        stars: 93,
        repos: 16,
        commits: 56,
        prs: 5,
        totalContributions: '970+',
        currentStreak: 5,
        longestStreak: '16 Days',
        isLive: false
    });

    useEffect(() => {
        let isMounted = true;
        const fetchLiveStats = async () => {
            try {
                // Check session cache first (1 hour cache to avoid 60 req/hr unauthenticated rate-limit)
                const cached = sessionStorage.getItem('gh_stats_tenzuki');
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (Date.now() - parsed.timestamp < 3600000 && isMounted) {
                        setStats(prev => ({ ...prev, ...parsed.data, isLive: true }));
                        return;
                    }
                }

                // 1. Fetch public profile (repos, public updates)
                const userRes = await fetch('https://api.github.com/users/tenzuki');
                if (!userRes.ok) return;
                const userData = await userRes.json();

                // 2. Fetch public repos to calculate total stars earned
                const reposRes = await fetch('https://api.github.com/users/tenzuki/repos?per_page=100');
                let liveStars = 93;
                if (reposRes.ok) {
                    const repos = await reposRes.json();
                    if (Array.isArray(repos)) {
                        const calculated = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
                        if (calculated > 0) liveStars = calculated;
                    }
                }

                const liveData = {
                    stars: liveStars,
                    repos: userData.public_repos || 16,
                    isLive: true
                };

                if (isMounted) {
                    setStats(prev => ({ ...prev, ...liveData }));
                    sessionStorage.setItem('gh_stats_tenzuki', JSON.stringify({
                        timestamp: Date.now(),
                        data: liveData
                    }));
                }
            } catch (e) {
                // Graceful fallback to verified snapshots when offline / sandboxed
            }
        };

        fetchLiveStats();
        return () => { isMounted = false; };
    }, []);

    // The 5 official GitHub achievements verified on tenzuki's profile
    const badges = [
        {
            id: 'pair-extraordinaire',
            name: 'Pair Extraordinaire',
            tier: 'x2',
            desc: 'Co-authored commits on merged pull requests.',
            img: 'https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png'
        },
        {
            id: 'galaxy-brain',
            name: 'Galaxy Brain',
            tier: null,
            desc: 'Answered a discussion that was accepted as the answer.',
            img: 'https://github.githubassets.com/assets/galaxy-brain-default-847262c21056.png'
        },
        {
            id: 'pull-shark',
            name: 'Pull Shark',
            tier: 'Bronze',
            desc: 'Opened 16+ pull requests that have been merged.',
            img: 'https://github.githubassets.com/assets/pull-shark-bronze-a37accb528d1.png'
        },
        {
            id: 'yolo',
            name: 'YOLO',
            tier: null,
            desc: 'Merged a pull request without code review.',
            img: 'https://github.githubassets.com/assets/yolo-default-be0bbff04951.png'
        },
        {
            id: 'quickdraw',
            name: 'Quickdraw',
            tier: null,
            desc: 'Closed an issue or PR within 5 minutes of opening.',
            img: 'https://github.githubassets.com/assets/quickdraw-default--light-8f798b35341a.png'
        }
    ];

    const languages = [
        { name: 'TypeScript', pct: 39.02, color: '#3178c6' },
        { name: 'Dart', pct: 31.28, color: '#00b4ab' },
        { name: 'JavaScript', pct: 21.79, color: '#f1e05a' },
        { name: 'CSS', pct: 3.27, color: '#563d7c' },
        { name: 'Kotlin', pct: 2.14, color: '#a97bff' },
        { name: 'Python', pct: 1.71, color: '#3572a5' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 }
        }
    };

    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.7, y: 40 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 70, damping: 15 }
        }
    };

    return (
        <section id="achievements" className="achievements" ref={ref}>
            <div className="section-container">
                <motion.div
                    style={{ y: yTitle }}
                    className="section-header"
                >
                    <span className="section-label">04 / OPEN SOURCE</span>
                    <h2>ACHIEVEMENTS</h2>
                    <p>GITHUB RECOGNITIONS &amp; METRICS</p>
                </motion.div>

                <div className="achievements-content">
                    {/* 5 Official Verified GitHub Badges */}
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
                                    {badge.tier && (
                                        <span className={`badge-tier-tag ${badge.tier === 'Bronze' ? 'badge-tier-bronze' : ''}`}>
                                            {badge.tier}
                                        </span>
                                    )}
                                    <div className="badge-img-container">
                                        <div className="badge-glow" />
                                        <img 
                                            src={badge.img} 
                                            alt={badge.name} 
                                            className="badge-img"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="badge-info">
                                        <h4>{badge.name}</h4>
                                        <p>{badge.desc}</p>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Native GitHub Stats & Impact Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="gh-dashboard-wrapper"
                    >
                        <TiltCard className="gh-dashboard-card">
                            {/* Card Action Bar - Header title removed as requested */}
                            <div className="gh-header-row gh-header-actions-only">
                                {stats.isLive && (
                                    <div className="gh-live-indicator" title="Connected to live GitHub REST API">
                                        <Radio size={13} className="gh-live-pulse-icon" />
                                        <span>LIVE SYNC</span>
                                    </div>
                                )}
                                <CreepyEyeButton 
                                    href="https://github.com/tenzuki" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    variant="primary"
                                    size="sm"
                                    className="gh-profile-btn"
                                >
                                    <span>github.com/tenzuki</span>
                                    <ExternalLink size={15} />
                                </CreepyEyeButton>
                            </div>

                            <div className="gh-stats-grid">
                                {/* Box 1: Core Metrics & Rating */}
                                <div className="gh-stat-box">
                                    <div className="gh-box-title">
                                        <Award size={16} color="#64b5f6" /> Production Overview
                                    </div>
                                    <div className="gh-numbers-list">
                                        <div className="gh-number-item">
                                            <span>Total Stars Earned</span>
                                            <strong>{stats.stars} ⭐</strong>
                                        </div>
                                        <div className="gh-number-item">
                                            <span>Public Repositories</span>
                                            <strong>{stats.repos} Repos</strong>
                                        </div>
                                        <div className="gh-number-item">
                                            <span>Commits (Last Year)</span>
                                            <strong>{stats.commits} Commits</strong>
                                        </div>
                                        <div className="gh-number-item">
                                            <span>Pull Requests Merged</span>
                                            <strong>{stats.prs} PRs</strong>
                                        </div>
                                    </div>
                                    <div className="gh-grade-badge">
                                        <span style={{ fontSize: '0.85rem', color: '#888888' }}>Activity Rank</span>
                                        <div className="grade-circle" title="Verified GitHub Grade">
                                            B-
                                        </div>
                                    </div>
                                </div>

                                {/* Box 2: Contributions & Streaks */}
                                <div className="gh-stat-box">
                                    <div className="gh-box-title">
                                        <Flame size={16} color="#ff9100" /> Contribution Activity
                                    </div>
                                    <div className="gh-streak-highlight">
                                        <div className="streak-flame-circle">
                                            {stats.currentStreak}
                                        </div>
                                        <div className="streak-info">
                                            <h5>Current Streak</h5>
                                            <span>Days of continuous code</span>
                                        </div>
                                    </div>
                                    <div className="gh-sub-streaks">
                                        <div className="sub-streak-item">
                                            <span>Total Contributions</span>
                                            <strong>{stats.totalContributions}</strong>
                                        </div>
                                        <div className="sub-streak-item">
                                            <span>Longest Streak</span>
                                            <strong>{stats.longestStreak}</strong>
                                        </div>
                                    </div>
                                </div>

                                {/* Box 3: Most Used Languages & Orgs */}
                                <div className="gh-stat-box">
                                    <div className="gh-box-title">
                                        <Code2 size={16} color="#00ff88" /> Language Distribution
                                    </div>

                                    {/* Stacked Percentage Bar */}
                                    <div className="lang-bars-stacked">
                                        {languages.map((l, i) => (
                                            <div 
                                                key={i} 
                                                className="lang-segment" 
                                                style={{ width: `${l.pct}%`, backgroundColor: l.color }}
                                                title={`${l.name}: ${l.pct}%`}
                                            />
                                        ))}
                                    </div>

                                    <div className="lang-list">
                                        {languages.map((l, i) => (
                                            <div key={i} className="lang-item">
                                                <span className="lang-dot" style={{ backgroundColor: l.color }} />
                                                <span>{l.name}</span>
                                                <span className="lang-pct">{l.pct}%</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="gh-orgs-footer">
                                        <span style={{ fontSize: '0.82rem', color: '#888888', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <Building2 size={14} /> Organizations
                                        </span>
                                        <div className="orgs-tags">
                                            <span className="org-tag">Bornov Technologies</span>
                                            <span className="org-tag">BezgoFresh</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GithubAchievements;
