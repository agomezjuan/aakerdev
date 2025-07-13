# Portfolio Architecture Documentation

## Overview

This document outlines the architecture decisions and structure for the AakerDev portfolio website.

## Site Structure

### Pages Hierarchy

```
/                     - Home page (landing/hero)
├── /about           - Professional background and story
├── /projects        - Project showcase listing
│   └── /[slug]      - Individual project case studies
├── /blog            - Technical blog/experience posts
│   └── /[slug]      - Individual blog posts
├── /contact         - Contact information and form
└── /404             - Error page
```

### URL Conventions

- **Clean URLs**: No file extensions (`.html`, `.astro`)
- **Semantic paths**: `/projects/project-name` not `/projects/1`
- **SEO-friendly**: Descriptive slugs using kebab-case
- **Consistent structure**: Logical hierarchy and navigation

### File Organization

#### Pages (`src/pages/`)

```
src/pages/
├── index.astro           # Home page
├── about.astro           # About page
├── contact.astro         # Contact page
├── 404.astro            # Error page
├── blog/
│   ├── index.astro      # Blog listing
│   └── [slug].astro     # Individual posts
└── projects/
    ├── index.astro      # Projects showcase
    └── [slug].astro     # Individual projects
```

#### Future Structure (to be implemented)

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   ├── navigation/     # Navigation components
│   ├── ui/             # Basic UI elements
│   └── sections/       # Page sections
├── layouts/            # Page layouts
│   ├── Base.astro      # Base HTML layout
│   ├── Blog.astro      # Blog post layout
│   └── Project.astro   # Project detail layout
├── content/            # Content Collections
│   ├── blog/           # Blog posts (markdown)
│   └── projects/       # Project data (markdown/json)
├── styles/             # CSS/SCSS files
└── utils/              # Utility functions
```

## Content Strategy

### Home Page Sections

1. **Hero Section**: Professional introduction and value proposition
2. **Skills Overview**: Key technologies and expertise
3. **Featured Projects**: 3-4 highlighted projects
4. **Recent Posts**: Latest blog entries
5. **Call to Action**: Contact and resume links

### Project Pages

- **Showcase Format**: Grid with filtering capabilities
- **Individual Pages**: Detailed case studies with:
  - Project overview and objectives
  - Technical implementation details
  - Screenshots and demos
  - Challenges and solutions
  - Technologies used
  - Live demo and repository links

### Blog System

- **Technical Focus**: Development experiences and insights
- **Content Types**: Tutorials, case studies, technology deep-dives
- **Organization**: Categories, tags, and search functionality
- **Features**: Syntax highlighting, reading time, related posts

### About Page Structure

- **Professional Story**: Career journey and motivations
- **Technical Expertise**: Skills breakdown with experience levels
- **Experience Timeline**: Positions and achievements
- **Education**: Formal education and certifications
- **Personal Touch**: Interests and working style

### Contact Page Elements

- **Multiple Methods**: Email, LinkedIn, GitHub
- **Contact Form**: With validation and spam protection
- **Availability Status**: Current opportunities and response times
- **Location**: General location for remote/local work

## Technical Decisions

### Framework Choice: Astro

- **Static Generation**: Fast loading times and SEO optimization
- **Component Architecture**: Reusable and maintainable code
- **TypeScript Support**: Type safety and better developer experience
- **Content Collections**: Structured content management
- **Markdown Support**: Easy blog post creation

### Routing Strategy

- **File-based Routing**: Intuitive page organization
- **Dynamic Routes**: `[slug].astro` for content pages
- **Static Generation**: All pages pre-built for performance

### SEO Optimization

- **Semantic HTML**: Proper heading hierarchy and structure
- **Meta Tags**: Descriptive titles and descriptions
- **Open Graph**: Social media sharing optimization
- **JSON-LD**: Structured data for search engines

## Development Workflow

### Branch Strategy

- **Feature Branches**: `feature/{issue-number}-{description}`
- **50 Character Limit**: Enforced branch naming convention
- **Issue Integration**: Linked to GitHub issues for tracking

### Quality Assurance

- **ESLint**: Code linting and style consistency
- **Prettier**: Automatic code formatting
- **TypeScript**: Type checking and validation
- **Testing**: Unit tests with Vitest, E2E with Playwright

### Deployment Strategy

- **Static Hosting**: Optimized for CDN delivery
- **CI/CD Pipeline**: Automated testing and deployment
- **Performance Monitoring**: Core Web Vitals tracking

## Performance Considerations

### Loading Strategy

- **Critical CSS**: Inline styles for above-the-fold content
- **Image Optimization**: WebP format with fallbacks
- **Lazy Loading**: Images and non-critical content
- **Code Splitting**: Bundle optimization

### Accessibility

- **WCAG 2.1**: Level AA compliance target
- **Semantic HTML**: Screen reader compatibility
- **Keyboard Navigation**: Full site accessibility
- **Color Contrast**: Adequate contrast ratios

## Future Enhancements

### Phase 2 Features

- **Content Management**: Headless CMS integration
- **Analytics**: Visitor tracking and insights
- **Newsletter**: Email subscription system
- **Comments**: Blog post discussions

### Phase 3 Features

- **Multi-language**: Internationalization support
- **PWA**: Progressive Web App features
- **Dark Mode**: Theme switching capability
- **Advanced Search**: Full-text search across content

---

**Last Updated**: {new Date().toISOString().split('T')[0]}
**Version**: 1.0
**Status**: In Development
