# Development Notes

Personal portfolio project - development workflow and setup.

## 🚀 Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test:run        # Unit tests
pnpm test:e2e        # E2E tests
pnpm test:coverage   # Coverage report

# Build for production
pnpm build
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

### Linting & Formatting

```bash
npx eslint . --fix
npx prettier --write .
```

### SonarQube Analysis

```bash
# Local analysis (requires SONAR_TOKEN)
export SONAR_TOKEN="your-token"
pnpm sonar
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
