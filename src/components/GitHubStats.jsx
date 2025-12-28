import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Calendar, Code, Star, GitBranch } from 'lucide-react'

const GitHubStats = () => {
  const [stats, setStats] = useState({
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    languages: {}
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGitHubStats()
  }, [])

  const fetchGitHubStats = async () => {
    try {
      // Fetch user repos to get language stats
      const reposResponse = await fetch('https://api.github.com/users/tenzuki/repos?per_page=100')
      const repos = await reposResponse.json()

      // Calculate language stats
      const languages = {}
      repos.forEach(repo => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1
        }
      })

      // Get top languages
      const topLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang)

      setStats({
        totalContributions: repos.length,
        currentStreak: 0, // Would need GitHub API v4 for this
        longestStreak: 0,
        languages: topLanguages
      })
    } catch (error) {
      console.error('Error fetching GitHub stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="github-stats">
        <div className="container">
          <div className="loading-container">
            <p>Loading GitHub stats...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="github-stats">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-number">06.</span>
          <h2 className="section-title">GitHub Statistics</h2>
          <div className="section-line"></div>
        </motion.div>

        <div className="stats-grid">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="stat-card"
          >
            <div className="stat-icon">
              <Code size={32} />
            </div>
            <h3 className="stat-value">{stats.totalContributions}+</h3>
            <p className="stat-label">Repositories</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="stat-card"
          >
            <div className="stat-icon">
              <Star size={32} />
            </div>
            <h3 className="stat-value">Active</h3>
            <p className="stat-label">Contributor</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="stat-card"
          >
            <div className="stat-icon">
              <GitBranch size={32} />
            </div>
            <h3 className="stat-value">Python</h3>
            <p className="stat-label">Primary Language</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="github-contribution"
        >
          <h3 className="contribution-title">Top Languages</h3>
          <div className="languages-list">
            {stats.languages.map((lang, index) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="language-tag"
              >
                {lang}
              </motion.span>
            ))}
          </div>
          <motion.a
            href="https://github.com/tenzuki"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary github-link"
          >
            <Github size={20} />
            View on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubStats

