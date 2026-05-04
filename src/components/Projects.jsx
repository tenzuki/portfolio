import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, ArrowUpRight } from 'lucide-react';
import TiltCard from './TiltCard';
import { fallbackRepos } from './fallbackRepos';
import './Projects.css';

const Projects = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Enterprise Projects from Resume
                const featuredProjects = [
                    {
                        id: 'feat-1',
                        type: 'project',
                        name: 'Bezgo Riders',
                        description: 'Flutter-based Android application for delivery personnel with end-to-end backend integration.',
                        language: 'Flutter / Azure',
                        isFeatured: true,
                        html_url: '#',
                        size: 'large'
                    },
                    {
                        id: 'feat-2',
                        type: 'project',
                        name: 'Fleet Dashboard',
                        description: 'Logistics System to automatically assign delivery riders based on location and workload constraints.',
                        language: 'React / Node',
                        isFeatured: true,
                        html_url: '#',
                        size: 'wide'
                    },
                    {
                        id: 'feat-3',
                        type: 'project',
                        name: 'AI Business Forecasting',
                        description: 'Predictive models using Random Forest and Prophet for revenue and demand forecasting.',
                        language: 'Python / ML',
                        isFeatured: true,
                        html_url: '#',
                        size: 'tall'
                    }
                ];

                let sortedRepos = [];
                try {
                    const response = await fetch('https://api.github.com/users/tenzuki/repos?sort=updated&per_page=100', {
                        headers: { 'Cache-Control': 'no-cache' }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        sortedRepos = data
                            .filter(repo => !repo.fork && repo.stargazers_count > 0)
                            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));
                    } else {
                        throw new Error('Rate limited');
                    }
                } catch (e) {
                    console.warn("GitHub API fetch failed (likely rate limited). Falling back to offline fallback data.");
                    sortedRepos = fallbackRepos;
                }

                sortedRepos = sortedRepos.map((repo, index) => ({
                    ...repo,
                    type: 'repo',
                    size: index % 4 === 0 ? 'wide' : (index % 5 === 0 ? 'tall' : 'normal')
                }));

                // Interleave array to create a beautiful puzzle
                const mixedItems = [
                    featuredProjects[0],
                    ...(sortedRepos.length > 0 ? [sortedRepos[0], sortedRepos[1]] : []),
                    featuredProjects[1],
                    ...(sortedRepos.length > 2 ? [sortedRepos[2], sortedRepos[3]] : []),
                    featuredProjects[2],
                    ...(sortedRepos.length > 4 ? sortedRepos.slice(4) : [])
                ];

                setItems(mixedItems.filter(Boolean));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 60, damping: 15 }
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
                    <h2>ARCHIVE</h2>
                    <p>ENGINEERING & VISUALS</p>
                </motion.div>

                {loading ? (
                    <div className="loading-state">Constructing Archive...</div>
                ) : error ? (
                    <div className="error-state">Failed to load archive.</div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="puzzle-grid"
                        style={{ y }}
                    >
                        {items.map((item, i) => (
                            <motion.div key={item.id} variants={itemVariants} className={`puzzle-item size-${item.size}`}>
                                {item.type === 'photo' ? (
                                    <TiltCard className="puzzle-photo-card">
                                        <img src={item.src} alt="Parthiv Visual" className="puzzle-img" />
                                    </TiltCard>
                                ) : (
                                    <a href={item.html_url} target="_blank" rel="noopener noreferrer" className="puzzle-link">
                                        <TiltCard className={`puzzle-repo-card ${item.isFeatured ? 'featured-repo' : ''}`}>
                                            <div className="repo-header">
                                                <Github size={28} />
                                                <ArrowUpRight className="link-arrow" size={24} />
                                            </div>
                                            <div className="repo-content">
                                                <h3 className="repo-name">{item.name}</h3>
                                                <p className="repo-desc">{item.description || "Experimental systems code."}</p>
                                            </div>
                                            <div className="repo-footer">
                                                <span className="repo-lang">{item.language}</span>
                                                {!item.isFeatured && (
                                                    <div className="repo-stats">
                                                        <span><Star size={16}/> {item.stargazers_count}</span>
                                                        <span><GitFork size={16}/> {item.forks_count}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </TiltCard>
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;
