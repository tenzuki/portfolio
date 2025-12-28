import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ParticlesBackground from './components/ParticlesBackground'
import GitHubStats from './components/GitHubStats'
import './App.css'

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGitHubProjects()
  }, [])

  const fetchGitHubProjects = async () => {
    try {
      const response = await fetch('https://api.github.com/users/tenzuki/repos?sort=updated&per_page=20')
      const data = await response.json()
      
      // Filter out the profile README repo and format projects
      const formattedProjects = data
        .filter(repo => repo.name !== 'tenzuki' && !repo.fork)
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'No description available',
          url: repo.html_url,
          stars: repo.stargazers_count,
          language: repo.language || 'Other',
          updated: repo.updated_at,
          topics: repo.topics || []
        }))
      
      setProjects(formattedProjects)
    } catch (error) {
      console.error('Error fetching GitHub projects:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider>
      <div className="App">
        <ScrollProgress />
        <ParticlesBackground />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <GitHubStats />
        <Projects projects={projects} loading={loading} />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

