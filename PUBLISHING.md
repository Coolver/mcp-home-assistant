# Publishing Guide

## 📦 How to Publish to NPM

### Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **NPM CLI**: Make sure npm is installed
3. **Login**: Run `npm login` and enter your credentials

### Publishing Steps

#### 1. Create NPM Organization (One-time)

```bash
# Login to npm
npm login

# Create organization (if @coolver doesn't exist)
# Go to https://www.npmjs.com/org/create
# Or use: npm org create coolver
```

#### 2. Prepare for Publishing

```bash
cd /Users/Coolver_1/Projects/smart-home/mcp-home-assistant

# Make sure everything is built
npm run build

# Test the package locally
npm pack

# This creates @coolver-mcp-home-assistant-1.0.0.tgz
# You can test install it: npm install -g ./coolver-mcp-home-assistant-1.0.0.tgz
```

#### 3. Publish to NPM

```bash
# Publish (first time)
npm publish --access public

# For updates (bump version first)
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Then publish
npm publish --access public
```

### 4. Create GitHub Repository

```bash
# Create repo on GitHub: https://github.com/new
# Name: mcp-home-assistant
# Description: MCP server for Home Assistant integration with Cursor AI

# Add remote and push
git remote add origin https://github.com/Coolver/mcp-home-assistant.git
git branch -M main
git push -u origin main

# Create a release on GitHub
git tag v1.0.0
git push origin v1.0.0
```

---

## 🔄 Update Workflow

### When updating the package:

1. **Make changes** to source files in `src/`

2. **Update version** in `package.json`:
```bash
npm version patch  # Bug fixes
npm version minor  # New features
npm version major  # Breaking changes
```

3. **Update CHANGELOG.md**:
```markdown
## [1.0.1] - 2025-11-XX
### Fixed
- Fixed some bug
```

4. **Build and test**:
```bash
npm run build
npm pack
# Test the package
```

5. **Commit changes**:
```bash
git add -A
git commit -m "v1.0.1: Brief description"
git push
```

6. **Publish to NPM**:
```bash
npm publish --access public
```

7. **Tag release on GitHub**:
```bash
git tag v1.0.1
git push origin v1.0.1
```

---

## ✅ Pre-publish Checklist

- [ ] All tests pass
- [ ] README is up to date
- [ ] CHANGELOG is updated
- [ ] Version bumped in package.json
- [ ] Built successfully (`npm run build`)
- [ ] No sensitive data in code
- [ ] LICENSE file present
- [ ] .npmignore configured correctly

---

## 📊 After Publishing

### Verify Package

```bash
# Check package page
open https://www.npmjs.com/package/@coolver/mcp-home-assistant

# Test installation
npm install -g @coolver/mcp-home-assistant

# Test it works
mcp-home-assistant --help
```

### Monitor

- Watch for issues: https://github.com/Coolver/mcp-home-assistant/issues
- Check download stats: https://npm-stat.com/charts.html?package=@coolver/mcp-home-assistant

---

## 🔐 Security

### NPM 2FA (Recommended)

Enable two-factor authentication:

```bash
npm profile enable-2fa auth-and-writes
```

### Token Management

Use npm tokens for CI/CD:

```bash
npm token create --read-only
```

---

## 📝 Notes

- Use **scoped package** (@coolver/mcp-home-assistant) for better organization
- Always use **`--access public`** for public scoped packages
- **Semantic Versioning**: MAJOR.MINOR.PATCH
  - MAJOR: Breaking changes
  - MINOR: New features (backward compatible)
  - PATCH: Bug fixes

