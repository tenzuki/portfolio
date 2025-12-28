import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, User, MessageSquare } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'parthiv.kp28@gmail.com',
      link: 'mailto:parthiv.kp28@gmail.com'
    },
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      value: 'github.com/tenzuki',
      link: 'https://github.com/tenzuki'
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/parthiv-k-134b95282',
      link: 'https://www.linkedin.com/in/parthiv-k-134b95282/'
    }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const { name, email, subject, message } = formData
    
    // Create mailto link with pre-filled content
    const emailSubject = encodeURIComponent(subject || 'Contact from Portfolio Website')
    const emailBody = encodeURIComponent(
      `Hello Parthiv,\n\n` +
      `My name is ${name || 'Visitor'}${email ? ` and my email is ${email}` : ''}.\n\n` +
      `${message || 'I would like to get in touch with you.'}\n\n\n` +
      `Best regards,\n${name || 'Visitor'}`
    )
    
    const mailtoLink = `mailto:parthiv.kp28@gmail.com?subject=${emailSubject}&body=${emailBody}`
    
    // Open email client
    window.location.href = mailtoLink
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-number">05.</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="contact-content"
        >
          <p className="contact-description">
            I'm always open to discussing new projects, creative ideas, or opportunities 
            to be part of your vision. Feel free to reach out if you'd like to collaborate!
          </p>

          <div className="contact-wrapper">
            <div className="contact-info-section">
              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="contact-card"
                  >
                    <div className="contact-icon">{method.icon}</div>
                    <div className="contact-info">
                      <span className="contact-label">{method.label}</span>
                      <span className="contact-value">{method.value}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <div className="form-group">
                <label htmlFor="name">
                  <User size={18} />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <Mail size={18} />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  <MessageSquare size={18} />
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <MessageSquare size={18} />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  rows="6"
                  className="form-textarea"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary form-submit"
              >
                <Send size={20} />
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

