# Development Notes

Personal portfolio project - development workflow and setup.

## 🚀 Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🔍 Code Quality

### Linting

```bash
pnpm lint           # Check for linting errors
pnpm lint:fix       # Fix auto-fixable linting errors
```

### Formatting

```bash
pnpm format         # Format all files with Prettier
pnpm format:check   # Check if files are properly formatted
```

### Type Checking

```bash
pnpm typecheck      # Run Astro's TypeScript checker
```

### All Quality Checks

```bash
pnpm quality        # Run lint + format check + typecheck + tests
pnpm quality:fix    # Fix linting + format + typecheck
```

## 🧪 Testing

### Unit Tests (Vitest)

```bash
pnpm test:run       # Run once
pnpm test           # Watch mode
pnpm test:coverage  # With coverage
```

### E2E Tests (Playwright)

```bash
pnpm test:e2e       # Run all browsers
pnpm test:e2e:ui    # Interactive mode
```

## 📊 Quality Assurance

### SonarQube Analysis

```bash
# Local analysis (requires SONAR_TOKEN)
export SONAR_TOKEN="your-token"
pnpm sonar

# Complete quality pipeline
pnpm test:sonar     # Tests + coverage + E2E + SonarQube
```

## ⚡ Quick Commands

```bash
# Development workflow
pnpm dev            # Start dev server
pnpm quality:fix    # Fix all quality issues
pnpm test:run       # Run all tests
pnpm build          # Build for production

# Before committing
pnpm quality        # Verify everything passes
```

## 🚀 Deployment

- **Automatic**: Push to `main` triggers CI/CD
- **Manual**: `pnpm build` + deploy `dist/` folder

## 🔧 Tech Stack

- **Framework**: Astro 5.x + TypeScript
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Quality**: ESLint + Prettier + SonarQube
- **CI/CD**: GitHub Actions
- **Security**: CodeQL + TruffleHog + Dependency audit

## 📂 Project Structure

```
├── src/
│   ├── pages/          # Astro pages (file-based routing)
│   ├── components/     # Reusable components
│   └── tests/          # Unit tests
├── e2e/               # End-to-end tests
├── public/            # Static assets
└── .github/           # CI/CD workflows
```

## 🔒 Security

- Never commit `.env` files
- Use GitHub Secrets for CI/CD tokens
- Regular dependency updates via Dependabot
- Automated security scanning on every push
