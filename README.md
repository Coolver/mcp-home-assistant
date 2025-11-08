# MCP Home Assistant

**Build smart home automations with AI - just describe what you want in natural language** 🏠🤖

Stop manually writing YAML! This MCP server enables Cursor AI to analyze YOUR Home Assistant setup and create intelligent automations, scripts, and configurations tailored specifically to your devices.

**Example:** *"Install smart climate control for my radiators"* → AI creates 10+ automations, helpers, sensors, and scripts optimized for YOUR TRVs.

Built on [Model Context Protocol](https://modelcontextprotocol.io/) and powered by [HA Cursor Agent](https://github.com/Coolver/home-assistant-cursor-agent).

[![NPM Version](https://img.shields.io/npm/v/@coolver/mcp-home-assistant)](https://www.npmjs.com/package/@coolver/mcp-home-assistant)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 What can you do?

**Cursor AI analyzes your actual Home Assistant configuration and creates smart automations tailored to YOUR devices:**

### 🏗️ Build Complex Systems from Scratch

- 💬 *"Install a smart climate control system for my TRV radiators with predictive shutdown and buffer mode"*
- 💬 *"Create a presence-based lighting system using my motion sensors and schedule"*
- 💬 *"Set up energy monitoring with notifications when consumption is high"*

**AI will:**
1. ✅ Read your current configuration
2. ✅ Detect your devices and entities
3. ✅ Create automations, scripts, helpers
4. ✅ Test and validate everything
5. ✅ Deploy - all automatically!

### 🔧 Intelligent Configuration

- 💬 *"Optimize my heating system based on room priorities and occupancy patterns"*
- 💬 *"Create smart scenes for movie night using my actual lights and media devices"*
- 💬 *"Build a security system with my door sensors and cameras"*

### 🐛 Debug and Fix Issues

- 💬 *"Why isn't my bedroom automation working? Check the logs and fix it"*
- 💬 *"My climate control keeps turning off early - analyze and improve the logic"*

**No manual YAML editing. No copy-pasting. Just describe what you want!** 🚀

---

## 📋 Prerequisites

Before installing, you need:

1. **Home Assistant** running (any version)
2. **[HA Cursor Agent](https://github.com/Coolver/home-assistant-cursor-agent)** installed as add-on
3. **Long-Lived Access Token** from Home Assistant
4. **Cursor AI** editor installed

---

## 🚀 Quick Start (5 minutes)

### Step 1: Install HA Cursor Agent

Install the agent in your Home Assistant:

1. Go to **Settings** → **Add-ons** → **Add-on Store**
2. Click **⋮** → **Repositories**
3. Add: `https://github.com/Coolver/home-assistant-cursor-agent`
4. Install **HA Cursor Agent**
5. Start the agent

### Step 2: Get Access Token

1. In Home Assistant, click your **Profile** (bottom left)
2. Scroll to **Long-Lived Access Tokens**
3. Click **CREATE TOKEN**
4. Name it `Cursor AI` and copy the token

### Step 3: Install MCP Server

```bash
npx @coolver/mcp-home-assistant
```

Or install globally:

```bash
npm install -g @coolver/mcp-home-assistant
```

### Step 4: Configure Cursor

Add to your `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "home-assistant": {
      "command": "npx",
      "args": ["-y", "@coolver/mcp-home-assistant"],
      "env": {
        "HA_AGENT_URL": "http://homeassistant.local:8099",
        "HA_TOKEN": "YOUR_LONG_LIVED_ACCESS_TOKEN_HERE"
      }
    }
  }
}
```

Or if installed globally:

```json
{
  "mcpServers": {
    "home-assistant": {
      "command": "mcp-home-assistant",
      "env": {
        "HA_AGENT_URL": "http://homeassistant.local:8099",
        "HA_TOKEN": "YOUR_LONG_LIVED_ACCESS_TOKEN_HERE"
      }
    }
  }
}
```

### Step 5: Restart Cursor

Restart Cursor AI and start chatting!

---

## 💬 Real-World Examples

Once configured, describe what you want in natural language. Cursor AI will analyze YOUR configuration and create tailored solutions:

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

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `HA_AGENT_URL` | URL of HA Cursor Agent | Yes | `http://homeassistant.local:8099` |
| `HA_TOKEN` | Long-Lived Access Token | Yes | - |

### Custom Agent URL

If your agent runs on a different URL:

```json
{
  "mcpServers": {
    "home-assistant": {
      "command": "npx",
      "args": ["-y", "@coolver/mcp-home-assistant"],
      "env": {
        "HA_AGENT_URL": "http://192.168.1.100:8099",
        "HA_TOKEN": "your_token_here"
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

---

## 🐛 Troubleshooting

### "Invalid token" error

1. Check your token is correct in `mcp.json`
2. Make sure HA Cursor Agent is running
3. Verify agent is accessible: `curl http://homeassistant.local:8099/api/health`

### "Connection refused"

1. Check HA Cursor Agent is started in Home Assistant
2. Verify the URL in `HA_AGENT_URL`
3. Make sure port 8099 is not blocked by firewall

### Check Agent Logs

Ask Cursor AI:
```
Show me the agent logs
```

This will display what's happening in the agent.

---

## 🔐 Security

- ✅ All communication goes through HA Cursor Agent (port 8099)
- ✅ Agent validates your token against Home Assistant
- ✅ Agent uses internal SUPERVISOR_TOKEN for operations
- ✅ Your token is stored only in local config file
- ⚠️ **Never commit `mcp.json` with your token to git!**

---

## 🤝 Related Projects

- **[HA Cursor Agent](https://github.com/Coolver/home-assistant-cursor-agent)** - Home Assistant add-on (required)
- **[Model Context Protocol](https://modelcontextprotocol.io/)** - Protocol specification

---

## 📝 License

MIT © Vladimir Eremeev

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

- 🐛 **Issues:** [GitHub Issues](https://github.com/Coolver/mcp-home-assistant/issues)
- 💡 **Discussions:** [GitHub Discussions](https://github.com/Coolver/mcp-home-assistant/discussions)

---

## ⭐ Show your support

Give a ⭐️ if this project helped you control your smart home with AI!
