# AakerDev Portfolio

Professional portfolio website built with Astro to showcase technical skills and experience to talent recruiters.

## 🎯 Project Purpose

This portfolio demonstrates:

- Full-stack development capabilities
- Modern web technologies expertise
- Project management and documentation skills
- Professional presentation of technical work

## 🌟 Features

- **Modern Tech Stack**: Astro, TypeScript, responsive design
- **Project Showcase**: Detailed case studies with live demos
- **Technical Blog**: Insights and learning experiences
- **Professional Presentation**: Optimized for recruiters and employers

## 🔀 Branch Naming Convention

We follow a structured naming pattern for feature branches:

```
feature/{issue-number}-{short-description}
```

**Rules:**

- Maximum 50 characters total
- Use kebab-case for descriptions
- Always include issue number
- Examples:
  - `feature/2-design-portfolio-arch`
  - `feature/3-implement-home-page`
  - `feature/5-projects-showcase`

**Creating branches:**

1. **Automated script** (recommended): `./scripts/branch 2`
2. Use GitHub's "Create a branch" button on issues
3. Or manually: `git checkout -b feature/2-design-portfolio-arch`

**Branch Script Features:**

- ✅ Fetches issue title automatically
- ✅ Sanitizes and truncates to 50 chars
- ✅ Creates from latest main branch
- ✅ Optional remote push with upstream
- ✅ Links to issue for reference

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command            | Action                                                  |
| :----------------- | :------------------------------------------------------ |
| `pnpm install`     | Installs dependencies                                   |
| `pnpm dev`         | Starts local dev server at `localhost:4321`             |
| `pnpm build`       | Build your production site to `./dist/`                 |
| `pnpm preview`     | Preview your build locally, before deploying            |
| `pnpm quality`     | Run all quality checks (lint, format, typecheck, tests) |
| `pnpm quality:fix` | Fix all auto-fixable quality issues                     |
| `pnpm astro ...`   | Run CLI commands like `astro add`, `astro check`        |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
