# MCP Home Assistant

**Build smart home automations with AI - just describe what you want in natural language** 🏠🤖

Transform your smart home management! This MCP server enables Cursor AI to:
- 📝 Analyze your Home Assistant configuration and devices
- 🏗️ Create intelligent automations, scripts, and complete systems
- 🔍 Monitor and troubleshoot through log analysis
- 📦 Install and manage HACS integrations (1000+ custom integrations!)
- 🔄 Safely deploy changes with automatic Git versioning

No more manual YAML editing or searching through documentation!

**Example:** *"Install smart climate control for my radiators"* → AI creates 10+ automations, helpers, sensors, and scripts optimized for YOUR TRVs.

Built on [Model Context Protocol](https://modelcontextprotocol.io/) and powered by [HA Cursor Agent](https://github.com/Coolver/home-assistant-cursor-agent).

[![NPM Version](https://img.shields.io/npm/v/@coolver/home-assistant-mcp)](https://www.npmjs.com/package/@coolver/home-assistant-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### ✨ Key Features

- 🤖 **Natural language** - describe what you want, AI builds it
- 🎯 **Device-aware** - analyzes YOUR actual setup
- 📦 **HACS integration** - install and manage 1000+ custom integrations via WebSocket
- 💾 **Auto-backup** - every change saved in Git automatically
- ⏪ **Instant rollback** - restore any previous version with one command
- 🔄 **Component management** - automations, scripts, helpers, entities
- 📊 **Log analysis** - monitor system behavior, detect anomalies, suggest optimizations
- 🐛 **Debug assistance** - AI reads logs and identifies issues automatically

---

## 🎯 What can you do?

**Cursor AI analyzes your actual Home Assistant configuration and creates smart automations tailored to YOUR devices:**

### 🏗️ Build Complex Systems from Scratch

- 💬 *"Install HACS and then install Xiaomi Gateway 3 integration"*
- 💬 *"Install a smart climate control system for my TRV radiators with predictive shutdown and buffer mode"*
- 💬 *"Create a presence-based lighting system using my motion sensors and schedule"*
- 💬 *"Set up energy monitoring with notifications when consumption is high"*

**AI will:**
1. ✅ Read your current configuration
2. ✅ Detect your devices and entities
3. ✅ Create automations, scripts, helpers
4. ✅ Test and validate everything
5. ✅ Deploy - all automatically!

### 📦 Extend with Community Integrations

- 💬 *"Install HACS for me"*
- 💬 *"Search for Xiaomi integrations in HACS"*
- 💬 *"Install Xiaomi Gateway 3 from HACS"*
- 💬 *"What themes are available in HACS?"*
- 💬 *"Update all my HACS repositories"*

**AI will:**
1. ✅ Install HACS automatically
2. ✅ Search 1000+ community repositories
3. ✅ Install integrations, themes, plugins
4. ✅ Keep everything updated

### 🔌 Manage Add-ons & Services

- 💬 *"Install Zigbee2MQTT and configure it for my Sonoff dongle"*
- 💬 *"Setup Mosquitto MQTT broker"*
- 💬 *"Install Node-RED for visual automations"*
- 💬 *"My Zigbee2MQTT isn't working - check the logs and fix it"*
- 💬 *"Update all my add-ons"*

**AI will:**
1. ✅ Install add-ons (Zigbee2MQTT, Node-RED, ESPHome)
2. ✅ Auto-detect hardware (USB coordinators)
3. ✅ Configure options
4. ✅ Start/stop/restart services
5. ✅ Monitor logs and troubleshoot

### 🔧 Intelligent Configuration

- 💬 *"Optimize my heating system based on room priorities and occupancy patterns"*
- 💬 *"Create smart scenes for movie night using my actual lights and media devices"*
- 💬 *"Build a security system with my door sensors and cameras"*

### 🐛 Debug and Fix Issues

- 💬 *"Why isn't my bedroom automation working? Check the logs and fix it"*
- 💬 *"My climate control keeps turning off early - analyze and improve the logic"*

### 📊 Monitor and Analyze

- 💬 *"Analyze my logs and tell me if my heating system is working efficiently"*
- 💬 *"Check if my automations are triggering too often or missing events"*
- 💬 *"Compare actual system behavior with expected logic and suggest improvements"*

**No manual YAML editing. No copy-pasting. Just describe what you want!** 🚀

---

## 📋 Prerequisites

Before installing, you need:

1. **Home Assistant** running (any version)
2. **[HA Cursor Agent](https://github.com/Coolver/home-assistant-cursor-agent)** v2.2.0+ installed as add-on
3. **Agent Key** from HA Cursor Agent (auto-generated on first start)
4. **Cursor AI** editor installed

---

## 🚀 Quick Start (5 minutes)

### Step 1: Install HA Cursor Agent

Install the agent in your Home Assistant:

1. Go to **Settings** → **Add-ons** → **Add-on Store**
2. Click **⋮** → **Repositories**
3. Add: `https://github.com/Coolver/home-assistant-cursor-agent`
4. Install **HA Cursor Agent** (v2.0.0+)
5. **Start** the agent

### Step 2: Setup MCP in Cursor

**Get configuration from Home Assistant:**
1. Open your **Home Assistant** (usually http://homeassistant.local:8123)
2. Go to **Settings** → **Add-ons** → **HA Cursor Agent**
3. Click **"Open Web UI"** button
4. Click **"Copy Configuration to Clipboard"**
5. Configuration copied! ✅

**Add to Cursor AI:**
1. Open **Cursor** editor
2. Go to **Settings** (Cmd/Ctrl + ,)
3. Click **Tools & MCP** in the sidebar
4. Click **New MCP Server**
5. **Paste** the configuration you copied
6. Click **Save**
7. **Restart Cursor** completely (Cmd/Ctrl + Q and reopen)

**For reference, here's what the configuration looks like:**

```json
{
  "mcpServers": {
    "home-assistant": {
      "command": "npx",
      "args": ["-y", "@coolver/home-assistant-mcp@latest"],
      "env": {
        "HA_AGENT_URL": "http://homeassistant.local:8099",
        "HA_AGENT_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**Note:** The Web UI provides this exact configuration ready to copy - no need to type it manually!

Done! Cursor AI is now connected to your Home Assistant 🎉

### Step 3: Test Connection

**Verify everything works:**

Open Cursor and send this message to AI:
```
Connect to my Home Assistant and show me:
1. List of all my climate entities
2. Current status of the HA Cursor Agent

This will verify the MCP connection is working.
```

If AI successfully returns your entities and agent status, you're all set! ✅

**Troubleshooting:** If connection fails:
- Check that HA Cursor Agent is running
- Ensure Cursor was fully restarted
- Verify configuration was pasted correctly

### Step 4: Start Building!

Just describe what you want in natural language - AI will handle the rest!

---

## 💬 Real-World Examples

Once configured, describe what you want in natural language. Cursor AI will analyze YOUR configuration and create tailored solutions:

### 📦 HACS & Integrations (NEW in v2.2.0!) 🔥

**Complete HACS management via WebSocket - browse 1000+ integrations!**

```
Install HACS for me
```

**AI will:**
- Check if HACS is already installed
- Download latest HACS release from GitHub
- Extract to custom_components/hacs
- Restart Home Assistant
- Wait for WebSocket connection
- Verify installation ✅

```
Search for Xiaomi integrations in HACS
```

**AI will:**
- Connect via WebSocket
- Search HACS repository database
- Show matching integrations with:
  - Repository name
  - Description
  - Stars rating
  - Current version
  - Installation status

```
Install Xiaomi Gateway 3 integration from HACS
```

**AI will:**
- Verify HACS is installed
- Call hacs.download service via WebSocket
- Download and install integration
- Notify about restart requirement
- Guide you through configuration
- Create example automations

```
Update all my HACS integrations
```

**AI will:**
- Call hacs.update_all service
- Download all available updates
- Notify about restart
- Show what was updated

**Full workflow:**
```
User: "Install HACS and then install Xiaomi Gateway 3 and create automations"

AI:
1. Installs HACS from GitHub ✅
2. Restarts Home Assistant ✅
3. Waits for connection ✅
4. Searches for "Xiaomi Gateway 3" ✅
5. Installs integration ✅
6. Guides through UI configuration ✅
7. Creates automations for your devices ✅
```

**✨ Powered by WebSocket** - real-time access to HACS data!

### 🏗️ Install Complete Systems

```
Install a smart climate control system for my home. 
Analyze my TRV radiators, create automations for efficient 
heating with predictive shutdown, and set up a dashboard.
```

**AI will:**
- Detect your TRV entities
- Create 8-10 automations for smart heating
- Add helper entities for system state
- Create template sensors for monitoring
- Set up scripts for boiler control
- Generate Lovelace dashboard
- Test everything and deploy

```
Build a presence detection system using my phone trackers 
and create automations for lights, climate, and security.
```

**AI will:**
- Find your device_tracker entities
- Create zones and presence helpers
- Set up lighting automations per room
- Configure climate based on presence
- Add security notifications
- All tailored to YOUR devices!

### 🔧 Optimize Existing Systems

```
My heating system wastes energy. Analyze my current 
automations and optimize for efficiency while maintaining comfort.
```

**AI will:**
- Read current automations
- Analyze heating patterns
- Add predictive logic
- Implement adaptive cooldowns
- Keep your existing setup intact

### 🐛 Debug and Fix Issues

```
My bedroom lights automation isn't working properly. 
Check the logs, analyze the automation, and fix the issue.
```

**AI will:**
- Read automation configuration
- Check entity states
- Review agent logs for errors
- Identify the problem
- Fix and test the solution

### 📊 Monitor & Analyze System Behavior

**Cursor AI can read logs and analyze how your system actually works:**

```
Read the logs and analyze how my climate control system 
is performing. Is it working as expected?
```

**AI will:**
- Read Home Assistant logs
- Analyze automation triggers and actions
- Compare actual behavior vs. expected logic
- Identify deviations or inefficiencies
- Provide detailed performance report

```
My heating system seems inefficient. Analyze the logs 
from the past day and suggest improvements.
```

**AI will:**
- Extract relevant log entries
- Identify patterns (frequent on/off cycles, timing issues)
- Detect edge cases or unexpected behavior
- Calculate metrics (runtime, cycles, efficiency)
- Suggest specific optimizations

```
Monitor my automations and tell me if they're triggering 
too often or missing important events.
```

**AI will:**
- Track automation execution frequency
- Identify over-triggering or under-triggering
- Spot missing conditions or edge cases
- Recommend refinements to triggers and conditions

**Use cases:**
- 🔍 **Performance audit** - "Are my automations running efficiently?"
- ⚠️ **Anomaly detection** - "Did anything unusual happen yesterday?"
- 📈 **Usage analysis** - "How often does my security system trigger?"
- 🎯 **Optimization** - "Can we reduce the number of automation runs?"
- 🐛 **Root cause analysis** - "Why did the boiler turn off unexpectedly?"

### 🎨 Create Custom Solutions

```
I want movie mode: dim all lights, close blinds, 
turn on TV and soundbar. Create scenes and automations.
```

**AI will:**
- Detect your lights, covers, media devices
- Create input_boolean for movie mode
- Build automation with all steps
- Add script for easy activation
- Customize based on YOUR devices

### 💾 Git Versioning & Rollback

**Every change is automatically backed up in Git!** You can view history and rollback anytime.

```
Show me the last 10 changes to my configuration
```

**AI will:**
- Display commit history with messages
- Show what was changed and when
- Help you identify specific versions

```
Something broke! Rollback to the version from yesterday
```

**AI will:**
- Show recent commits
- Find the commit from yesterday
- Rollback your configuration
- Verify everything works

```
Show me what changed in commit abc123
```

**AI will:**
- Display detailed diff of that commit
- Explain what files were modified
- Help you understand the changes

**Available Git tools:**
- `ha_git_history` - View commit history (last 20 commits)
- `ha_git_diff` - Compare commits or see uncommitted changes
- `ha_git_rollback` - Restore to any previous version
- `ha_git_commit` - Manual backup with custom message

**Example workflow:**
1. Make changes → Automatically backed up ✅
2. Something breaks? → Ask AI to show history
3. AI shows commits → You identify good version
4. AI rolls back → Everything restored! 🎉

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `HA_AGENT_URL` | URL of HA Cursor Agent | Yes | `http://homeassistant.local:8099` |
| `HA_AGENT_KEY` | Agent Key for authentication | Yes | - |

### Custom Agent URL

If your agent runs on a different URL:

```json
{
  "mcpServers": {
    "home-assistant": {
      "command": "npx",
      "args": ["-y", "@coolver/home-assistant-mcp@latest"],
      "env": {
        "HA_AGENT_URL": "http://192.168.1.100:8099",
        "HA_AGENT_KEY": "your_api_key_here"
      }
    }
  }
}
```

---

## 🛠️ Available Tools

The MCP server provides these tools to Cursor AI:

### 📁 Files
- `ha_read_file` - Read configuration files
- `ha_write_file` - Write configuration files
- `ha_list_files` - List files in directory
- `ha_delete_file` - Delete files

### 🏠 Entities
- `ha_list_entities` - List all entities (with domain filter)
- `ha_get_entity_state` - Get specific entity state

### 🔧 Helpers
- `ha_list_helpers` - List all input helpers
- `ha_create_helper` - Create new input helper
- `ha_delete_helper` - Delete helper

### 🤖 Automations
- `ha_list_automations` - List all automations
- `ha_create_automation` - Create new automation
- `ha_delete_automation` - Delete automation

### 📜 Scripts
- `ha_list_scripts` - List all scripts
- `ha_create_script` - Create new script
- `ha_delete_script` - Delete script

### 🔄 System
- `ha_check_config` - Check configuration validity
- `ha_reload_config` - Reload configuration
- `ha_get_logs` - Get agent logs

### 💾 Backup
- `ha_git_commit` - Commit changes to git
- `ha_git_history` - View git history
- `ha_git_rollback` - Rollback to previous version
- `ha_git_diff` - Compare commits or view changes

### 📦 HACS (WebSocket powered)
- `ha_install_hacs` - Install HACS from GitHub
- `ha_hacs_status` - Check installation status
- `ha_hacs_list_repositories` - List all repositories (filter by category)
- `ha_hacs_search` - Search repositories by query
- `ha_hacs_install_repository` - Install integration/theme/plugin
- `ha_hacs_update_all` - Update all installed repositories
- `ha_hacs_repository_details` - Get detailed repository info

---

## 🐛 Troubleshooting

### "Invalid Agent Key" error

1. Check your Agent Key is correct in `mcp.json` (under `HA_AGENT_KEY`)
2. Regenerate key if needed: Settings → Add-ons → HA Cursor Agent → Open Web UI
3. Make sure HA Cursor Agent is running
4. Verify agent is accessible: `curl http://homeassistant.local:8099/api/health`

### "Connection refused"

1. Check HA Cursor Agent is started in Home Assistant
2. Verify the URL in `HA_AGENT_URL`
3. Make sure port 8099 is not blocked by firewall

### "spawn npx ENOENT" error

This error means Node.js is not installed or not found in your system PATH.

**Solution:** Install Node.js (v18.0.0 or higher) on the computer where Cursor is running:

1. Download and install Node.js from [https://nodejs.org](https://nodejs.org)
2. Restart Cursor completely after installation
3. Verify installation by running `node --version` in a terminal

**Important:** Node.js must be installed on **your computer** (where Cursor runs), not on the Home Assistant server.

### Check Agent Logs

Ask Cursor AI:
```
Show me the agent logs
```

This will display what's happening in the agent.

---

## 🔐 Security

- ✅ All communication goes through HA Cursor Agent (port 8099)
- ✅ Agent Key authentication for MCP clients
- ✅ Agent validates Agent Key for all requests
- ✅ Agent uses internal SUPERVISOR_TOKEN for Home Assistant API operations
- ✅ Your Agent Key is stored only in local Cursor config file
- ⚠️ **Never commit `mcp.json` with your Agent Key to git!**

---

## 🤝 Related Projects

- **[HA Cursor Agent](https://github.com/Coolver/home-assistant-cursor-agent)** - Home Assistant add-on (required)
- **[Model Context Protocol](https://modelcontextprotocol.io/)** - Protocol specification

---

## 📝 License

MIT © Vladimir Eremeev

---

## 🔧 Development

### Project Structure

```
home-assistant-mcp/
├── package.json            # NPM package config
├── tsconfig.json           # TypeScript config
├── src/
│   ├── index.ts           # MCP server entry point
│   ├── ha-client.ts       # HA Agent API client
│   ├── handlers.ts        # Tool request handlers
│   ├── tools.ts           # Legacy tool definitions
│   └── tools/             # Modular tool definitions
│       ├── index.ts       # Tool exports
│       ├── files.ts       # File operation tools
│       ├── system.ts      # System operation tools
│       └── dashboard.ts   # Dashboard tools
├── build/                 # Compiled JavaScript output
├── README.md
├── CHANGELOG.md
└── QUICK_START.md
```

### Local Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Test locally
export HA_AGENT_URL="http://homeassistant.local:8099"
export HA_AGENT_KEY="your_dev_key"
node build/index.js
```

### Architecture

**MCP Server** (`index.ts`) ← Communication Protocol  
↓  
**Tool Handlers** (`handlers.ts`) ← Business Logic  
↓  
**HA Client** (`ha-client.ts`) ← HTTP API Wrapper  
↓  
**HA Cursor Agent** (REST API) ← Home Assistant Integration

---

## 🙏 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 💬 Support

- 🐛 **Issues:** [GitHub Issues](https://github.com/Coolver/home-assistant-mcp/issues)
- 💡 **Discussions:** [GitHub Discussions](https://github.com/Coolver/home-assistant-mcp/discussions)

---

## ⭐ Show your support

Give a ⭐️ if this project helped you control your smart home with AI!
