# Portfolio Website

A modern, elegant, and professional portfolio website showcasing my work as a Tech Lead and AI Engineer.

## Features

- 🎨 Modern and elegant design with smooth animations
- 📱 Fully responsive layout
- 🚀 Fast and optimized performance
- 🔗 GitHub API integration for automatic project fetching
- ✨ Framer Motion animations for smooth interactions
- 🌙 Dark theme with gradient accents

## Tech Stack

- React 18
- Vite
- Framer Motion
- Lucide React (Icons)
- CSS3 with modern features

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

### Update Personal Information

1. **Profile Photo**: Add your photo to the `public` folder as `profile-photo.jpg`. The photo will appear in both the Hero and About sections. If the image is not found, it will show your initials as a placeholder.
2. **Contact Information**: Edit `src/components/Contact.jsx` to update email and social links
3. **About Section**: Modify `src/components/About.jsx` for personal bio
4. **Experience**: Update `src/components/Experience.jsx` with your work history
5. **Skills**: Customize `src/components/Skills.jsx` with your tech stack

### GitHub Integration

The website automatically fetches projects from your GitHub profile. The GitHub username is configured in `src/App.jsx`:

```javascript
const response = await fetch('https://api.github.com/users/tenzuki/repos?sort=updated&per_page=10')
```

Change `tenzuki` to your GitHub username.

### Styling

Main styles are in `src/App.css`. Color scheme can be customized via CSS variables in `src/index.css`:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  /* ... */
}
```

## Sections

1. **Hero** - Introduction and call-to-action
2. **About** - Personal background and interests
3. **Skills** - Technical skills and technologies
4. **Experience** - Work history and achievements
5. **Projects** - GitHub projects showcase
6. **Contact** - Get in touch section
7. **Footer** - Additional links and copyright

## License

MIT

