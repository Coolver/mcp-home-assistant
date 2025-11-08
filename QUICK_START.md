# 🚀 Quick Start: Publishing MCP to NPM

## ✅ Current Status

Your MCP package is **ready to publish**! ✨

```
✅ Package: @coolver/mcp-home-assistant
✅ Version: 1.0.0
✅ Size: 10.8 kB (unpacked: 46.5 kB)
✅ Files: 15 files (source, types, README, LICENSE)
✅ Git: Initialized with 2 commits
✅ Build: Successful
```

---

## 📋 Before Publishing

### 1. Create GitHub Repository

Go to: https://github.com/new

- **Repository name:** `mcp-home-assistant`
- **Description:** `MCP server for Home Assistant integration with Cursor AI`
- **Public** (important for NPM!)
- **DON'T** add README, .gitignore, or LICENSE (we already have them)

### 2. Push to GitHub

```bash
cd /Users/Coolver_1/Projects/smart-home/mcp-home-assistant

# Add remote
git remote add origin https://github.com/Coolver/mcp-home-assistant.git

# Push
git branch -M main
git push -u origin main

# Create first release tag
git tag v1.0.0
git push origin v1.0.0
```

---

## 📦 Publishing to NPM

### Step 1: Login to NPM

If you don't have an NPM account:
1. Go to https://www.npmjs.com/signup
2. Create account

Then login:

```bash
npm login
# Enter your credentials
```

### Step 2: Publish!

```bash
cd /Users/Coolver_1/Projects/smart-home/mcp-home-assistant

# Publish to NPM
npm publish --access public
```

That's it! 🎉

---

## 🧪 Test Installation

After publishing, test that it works:

```bash
# Install globally
npm install -g @coolver/mcp-home-assistant

# Or use with npx (no installation needed)
npx @coolver/mcp-home-assistant
```

---

## 👥 User Installation (After Publishing)

Users will be able to install with:

### Option 1: Using npx (Recommended)

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "home-assistant": {
      "command": "npx",
      "args": ["-y", "@coolver/mcp-home-assistant"],
      "env": {
        "HA_AGENT_URL": "http://homeassistant.local:8099",
        "HA_TOKEN": "their_token_here"
      }
    }
  }
}
```

### Option 2: Global Install

```bash
npm install -g @coolver/mcp-home-assistant
```

Then in `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "home-assistant": {
      "command": "mcp-home-assistant",
      "env": {
        "HA_AGENT_URL": "http://homeassistant.local:8099",
        "HA_TOKEN": "their_token_here"
      }
    }
  }
}
```

---

## 📊 After Publishing

### Check Your Package

- **NPM page:** https://www.npmjs.com/package/@coolver/mcp-home-assistant
- **GitHub:** https://github.com/Coolver/mcp-home-assistant
- **Downloads:** https://npm-stat.com/charts.html?package=@coolver/mcp-home-assistant

### Create GitHub Release

1. Go to: https://github.com/Coolver/mcp-home-assistant/releases/new
2. Tag: `v1.0.0`
3. Title: `MCP Home Assistant v1.0.0`
4. Description: Copy from CHANGELOG.md
5. **Publish release**

---

## 🔄 Future Updates

When you want to update:

```bash
cd /Users/Coolver_1/Projects/smart-home/mcp-home-assistant

# Make your changes...

# Update version
npm version patch  # 1.0.0 -> 1.0.1

# Build
npm run build

# Commit
git add -A
git commit -m "v1.0.1: Description of changes"
git push

# Publish
npm publish --access public

# Tag
git tag v1.0.1
git push origin v1.0.1
```

---

## 🎯 Summary

**What you have:**
- ✅ Complete MCP package ready for NPM
- ✅ Professional README with examples
- ✅ MIT License
- ✅ TypeScript with type definitions
- ✅ Git repository initialized
- ✅ Build scripts configured
- ✅ Package size optimized (10.8 kB)

**What's needed:**
1. Create GitHub repository
2. Push code to GitHub
3. Publish to NPM (`npm publish --access public`)

**Time needed:** 5-10 minutes ⏱️

---

## 💡 Pro Tips

- **NPM 2FA:** Enable for security (`npm profile enable-2fa`)
- **Watch downloads:** Use npm-stat.com
- **GitHub Actions:** Set up CI/CD for auto-publishing
- **Badges:** Add download/version badges to README

---

**Ready to publish?** 🚀

```bash
# 1. Create GitHub repo (web)
# 2. Push to GitHub
git remote add origin https://github.com/Coolver/mcp-home-assistant.git
git push -u origin main
git tag v1.0.0 && git push origin v1.0.0

# 3. Publish to NPM
npm login
npm publish --access public

# Done! 🎉
```



