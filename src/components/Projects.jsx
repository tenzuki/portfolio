import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Star, GitFork, ArrowUpRight, Filter, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';
import { fallbackRepos } from './fallbackRepos';
import './Projects.css';

const Projects = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'stars'
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Enterprise Production Projects
                const featuredProjects = [
                    {
                        id: 'feat-bornov',
                        type: 'project',
                        name: 'Bornov Core Systems & Prototypes',
                        description: 'Full-stack systems architecture, machine tests, and enterprise prototypes at Bornov Technologies LLP.',
                        language: 'TypeScript / Full Stack',
                        isFeatured: true,
                        category: 'fullstack',
                        html_url: 'https://github.com/tenzuki/Bornov_machine_test',
                        size: 'large',
                        updated_at: '2026-11-19T12:00:00Z',
                        stargazers_count: 50
                    },
                    {
                        id: 'feat-bezgo-riders',
                        type: 'project',
                        name: 'Bezgo Riders — Mobile App',
                        description: 'Flutter-based Android application for 100+ delivery riders with Bearer token authentication and Azure cloud backend.',
                        language: 'Flutter / Azure',
                        isFeatured: true,
                        category: 'mobile',
                        html_url: 'https://github.com/tenzuki',
                        size: 'wide',
                        updated_at: '2026-05-15T12:00:00Z',
                        stargazers_count: 45
                    },
                    {
                        id: 'feat-fleet',
                        type: 'project',
                        name: 'Fleet Logistics Automation',
                        description: 'Logistics dashboard auto-assigning delivery orders to riders based on SLA criteria, location GPS, and workload.',
                        language: 'Python / Web / Azure',
                        isFeatured: true,
                        category: 'fullstack',
                        html_url: 'https://github.com/tenzuki',
                        size: 'normal',
                        updated_at: '2026-04-10T12:00:00Z',
                        stargazers_count: 40
                    },
                    {
                        id: 'feat-bezgo-ai',
                        type: 'project',
                        name: 'Bezgo AI Forecasting Engine',
                        description: 'Predictive machine learning models using Random Forest and Prophet for sales, revenue, and customer demand forecasting.',
                        language: 'Python / Prophet / ML',
                        isFeatured: true,
                        category: 'ai',
                        html_url: 'https://github.com/tenzuki',
                        size: 'normal',
                        updated_at: '2026-03-01T12:00:00Z',
                        stargazers_count: 35
                    }
                ];

                // Create a quick lookup from fallbackRepos for descriptions and categories
                const fallbackMap = {};
                fallbackRepos.forEach(repo => {
                    fallbackMap[repo.name.toLowerCase()] = repo;
                });

                let reposList = [];

                try {
                    const response = await fetch('https://api.github.com/users/tenzuki/repos?per_page=100&sort=updated', {
                        headers: { 'Cache-Control': 'no-cache' }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        // Filter out empty profile README repo
                        const filtered = data.filter(r => r.name.toLowerCase() !== 'tenzuki');

                        reposList = filtered.map(repo => {
                            const fallback = fallbackMap[repo.name.toLowerCase()] || {};
                            return {
                                id: repo.id,
                                name: repo.name,
                                html_url: repo.html_url,
                                description: repo.description || fallback.description || "Production & experimental systems code.",
                                stargazers_count: repo.stargazers_count || fallback.stargazers_count || 0,
                                forks_count: repo.forks_count || 0,
                                language: repo.language || fallback.language || "Code",
                                category: fallback.category || categorizeRepo(repo.name, repo.language),
                                updated_at: repo.updated_at || fallback.updated_at,
                                isFeatured: false,
                                type: 'repo'
                            };
                        });
                    } else {
                        throw new Error('GitHub API rate limited');
                    }
                } catch (e) {
                    console.warn("Using rich offline repository database for tenzuki:", e.message);
                    reposList = fallbackRepos.map(repo => ({
                        ...repo,
                        type: 'repo',
                        isFeatured: false
                    }));
                }

                // Combine featured projects + all repositories
                setAllProjects([...featuredProjects, ...reposList]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Helper to categorize repository when needed
    function categorizeRepo(name, lang) {
        const n = name.toLowerCase();
        const l = (lang || '').toLowerCase();
        if (n.includes('wakey') || n.includes('pos') || l === 'dart' || l === 'flutter') return 'mobile';
        if (n.includes('ai') || n.includes('camera') || n.includes('mouse') || n.includes('keyboard') || n.includes('recipe')) return 'ai';
        if (n.includes('calculator') || n.includes('notepad') || n.includes('password') || n.includes('texty')) return 'utilities';
        return 'fullstack';
    }

    // Filter by active category
    const filteredProjects = allProjects.filter(project => {
        if (activeCategory === 'all') return true;
        return project.category === activeCategory;
    });

    // Sort by selection
    const sortedProjects = [...filteredProjects].sort((a, b) => {
        if (sortBy === 'stars') {
            return (b.stargazers_count || 0) - (a.stargazers_count || 0);
        }
        return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
    });

    const categories = [
        { id: 'all', label: `All Repositories (${allProjects.length})` },
        { id: 'fullstack', label: 'Full Stack & Web' },
        { id: 'mobile', label: 'Mobile (Flutter)' },
        { id: 'ai', label: 'AI & Computer Vision' },
        { id: 'utilities', label: 'Desktop Utilities' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.85, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 70, damping: 15 }
        }
    };

    return (
        <section id="projects" className="projects" ref={ref}>
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="section-header"
                >
                    <span className="section-label">02 / SELECTED WORK</span>
                    <h2>Projects &amp; <em className="serif-accent">Case Studies</em></h2>
                    <p>ALL REPOSITORIES &amp; PRODUCTION SYSTEMS</p>
                </motion.div>

                {/* Filter and Sort Toolbar */}
                <div className="projects-toolbar">
                    <div className="filter-chips">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                type="button"
                                className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="sort-btn-group">
                        <button
                            type="button"
                            className={`sort-btn ${sortBy === 'recent' ? 'active' : ''}`}
                            onClick={() => setSortBy('recent')}
                            title="Sort by latest activity"
                        >
                            Recent Activity
                        </button>
                        <button
                            type="button"
                            className={`sort-btn ${sortBy === 'stars' ? 'active' : ''}`}
                            onClick={() => setSortBy('stars')}
                            title="Sort by GitHub stars"
                        >
                            Stars ⭐
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-state">Constructing Archive...</div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="puzzle-grid"
                        style={{ y }}
                    >
                        {sortedProjects.map((item) => (
                            <motion.div 
                                key={item.id} 
                                variants={itemVariants} 
                                className={`puzzle-item ${item.isFeatured ? 'size-wide' : 'size-normal'}`}
                            >
                                <a 
                                    href={item.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="puzzle-link"
                                >
                                    <TiltCard className={`puzzle-repo-card ${item.isFeatured ? 'featured-repo' : ''}`}>
                                        {item.isFeatured && (
                                            <span className="featured-badge-pill">
                                                <Sparkles size={12} style={{ marginRight: '4px' }} /> Enterprise
                                            </span>
                                        )}
                                        <div className="repo-header">
                                            <Github size={28} />
                                            <ArrowUpRight className="link-arrow" size={24} />
                                        </div>
                                        <div className="repo-content">
                                            <h3 className="repo-name">{item.name}</h3>
                                            <p className="repo-desc">{item.description}</p>
                                        </div>
                                        <div className="repo-footer">
                                            <span className="repo-lang">{item.language}</span>
                                            <div className="repo-stats">
                                                <span><Star size={15}/> {item.stargazers_count}</span>
                                                <span><GitFork size={15}/> {item.forks_count}</span>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;
