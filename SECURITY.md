# Security Guidelines

## 🔐 Security Best Practices

### Never Commit Sensitive Information

**❌ NEVER commit these items:**

- API keys, tokens, passwords
- Database connection strings with credentials
- SSL certificates or private keys
- Configuration files with sensitive data
- `.env` files with production secrets

**✅ Instead use:**

- Environment variables
- GitHub Secrets for CI/CD
- Separate configuration files for different environments
- Secret management services

### Environment Variables

For local development, create a `.env.local` file (already in .gitignore):

```bash
# .env.local (NEVER commit this file)
SONAR_TOKEN=your_sonar_token_here
DATABASE_URL=your_database_url_here
API_KEY=your_api_key_here
```

### GitHub Secrets Configuration

Configure these secrets in your GitHub repository:

1. Go to Settings → Secrets and variables → Actions
2. Add the following secrets:

| Secret Name   | Description                    | Example        |
| ------------- | ------------------------------ | -------------- |
| `SONAR_TOKEN` | SonarQube authentication token | `squ_12345...` |

### SonarQube Token Management

1. **Generate Token**:
   - Visit: https://sonar.ingenial.co/account/security
   - Create a new token with "Analyze" permissions
   - Copy the token immediately (it won't be shown again)

2. **Use Token Securely**:

   ```bash
   # Local development
   export SONAR_TOKEN=your_token_here
   pnpm sonar

   # Or use .env.local file
   echo "SONAR_TOKEN=your_token_here" >> .env.local
   ```

3. **GitHub Actions**:
   - Add token as GitHub Secret named `SONAR_TOKEN`
   - The workflow will use it automatically

### Code Scanning

This repository includes automated security scanning:

- **CodeQL**: Static analysis for security vulnerabilities
- **Dependency Audit**: Checks for known vulnerabilities in dependencies
- **Secret Scanning**: Detects accidentally committed secrets using TruffleHog

### Dependency Security

1. **Regular Updates**:

   ```bash
   pnpm audit
   pnpm update
   ```

2. **Monitor Vulnerabilities**:
   - GitHub Dependabot alerts are enabled
   - Weekly dependency audits run automatically

### Incident Response

If you accidentally commit sensitive information:

1. **Immediately**:
   - Revoke/rotate the compromised credentials
   - Remove from all commits in history
   - Force push to overwrite history

2. **Tools for cleanup**:

   ```bash
   # Remove file from Git history
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch path/to/sensitive/file" \
     --prune-empty --tag-name-filter cat -- --all

   # Force push (use with caution)
   git push origin --force --all
   ```

### Secure Development Practices

1. **Code Reviews**: All changes require review
2. **Branch Protection**: Main branch is protected
3. **Automated Testing**: All PRs run security scans
4. **Principle of Least Privilege**: Minimal permissions required

### Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public issue
2. Email security concerns to: [security@ingenial.co]
3. Include detailed information about the vulnerability
4. Allow reasonable time for response before disclosure

## 🛡️ Security Checklist

- [ ] No secrets in code or configuration files
- [ ] Environment variables used for sensitive data
- [ ] GitHub Secrets configured properly
- [ ] Dependencies regularly updated
- [ ] Security scans passing
- [ ] Code reviewed before merging
- [ ] Principle of least privilege followed
