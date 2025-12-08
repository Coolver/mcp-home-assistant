# Changelog

All notable changes to this project will be documented in this file.

## [3.2.11] - 2025-12-06

### ✨ New Feature

- ✅ Added `server.json` configuration file for MCP server registry integration

## [3.2.10] - 2025-12-06

### 📝 Documentation Update

- ✅ Updated README.md with improved documentation and feature descriptions

## [3.2.9] - 2025-12-06

### 📝 Documentation Update

- ✅ Updated README.md with improved documentation and feature descriptions

## [3.2.8] - 2025-12-06

### 📝 Documentation Update

- ✅ Updated README.md with improved documentation

## [3.2.7] - 2025-12-06

### ✨ Feature: Meaningful Git Commit Messages

**AI-powered automatic generation of descriptive commit messages**

- ✅ **Automatic commit message generation**: MCP server now automatically generates meaningful commit messages based on operation context
- ✅ **User-provided descriptions**: All write operations now accept optional `description` parameter for even more clarity
- ✅ **Context-aware messages**: Commit messages explain **what** changed and **why** (e.g., "Add automation: Control lights when motion detected")
- ✅ **Easy change tracking**: You can ask AI to show recent changes and quickly find what you need using meaningful descriptions

**Updated tools:**
- `ha_write_file` - Now accepts optional `description` parameter
- `ha_create_helper` - Now accepts optional `description` parameter
- `ha_create_automation` - Now accepts optional `description` parameter
- `ha_create_script` - Now accepts optional `description` parameter
- `ha_create_theme` / `ha_update_theme` - Now accepts optional `description` parameter
- `ha_apply_dashboard` - Now accepts optional `description` parameter

**Examples:**
- When creating an automation, provide: `"description": "Control living room lights when motion detected after sunset"`
- Result commit message: `"Add automation: Control living room lights when motion detected after sunset"`
- If no description provided, MCP automatically generates meaningful message based on operation context

**Requires:** HA Vibecode Agent v2.10.2+

## [3.2.2] - 2025-11-18

### 🔧 IMPROVED: Helper Deletion

**Enhanced `ha_delete_helper` to support config entry helpers**

**Changes:**
- ✅ `ha_delete_helper` now attempts to delete helpers created via UI/API (config entries)
- ✅ Works with both YAML-defined helpers and config entry helpers
- ✅ Better error handling and reporting

**Requires:** HA Cursor Agent v2.9.3+

## [3.2.1] - 2025-11-18

### ✨ NEW: Service Call Support

**Added ability to call Home Assistant services via MCP**

**New Tool:**
- `ha_call_service` - Call any Home Assistant service (number.set_value, light.turn_on, climate.set_temperature, etc.)

**Features:**
- ✅ Call any Home Assistant service through MCP
- ✅ Support for service_data and target parameters
- ✅ Examples: set number values, control lights, adjust thermostats, toggle switches
- ✅ Full integration with Home Assistant API

**Use Cases:**
- Set TRV temperature offsets: `number.set_value` with `{"entity_id": "number.alex_trv_local_temperature_offset", "value": -2.0}`
- Control lights: `light.turn_on` with target entity
- Adjust climate: `climate.set_temperature` with temperature value
- Any other Home Assistant service

**Implementation:**
- Added `callService()` method to HAClient
- Added `ha_call_service` tool definition
- Added handler in handlers registry
- Integrated with HA Cursor Agent API endpoint

**Requires:** HA Cursor Agent v2.9.2+

## [3.0.5] - 2025-11-10

### 🐛 Critical Bug Fix: Dashboard Apply

**Fixed 422 error when applying dashboards**

**Bug:**
- Dashboard creation failed with 422 Unprocessable Entity
- AI couldn't create dashboards

**Root Cause:**
- Parameter order mismatch in handler
- handler passed: (config, filename, register, backup)
- client expected: (config, backup, filename, register)

**Fix:**
- Corrected parameter order in handlers.ts
- Matches ha-client.ts signature

**Impact:**
- ✅ Dashboard creation now works
- ✅ AI can create and apply dashboards
- ✅ ha_apply_dashboard fully functional

**Requires:** HA Cursor Agent v2.7.2+

**Version:** 3.0.5 (PATCH - critical bug fix)

## [3.0.4] - 2025-11-10

### 🏗️ REFACTOR: Modular Architecture

**Internal refactor with 100% backward compatibility!**

**Part 1: Modular Tool Definitions**
- Created `src/tools/` directory structure
- Split tools into domain modules:
  * `files.ts` - File operations (4 tools)
  * `system.ts` - System operations (4 tools)
  * `dashboard.ts` - Dashboard operations (4 tools)
  * `index.ts` - Central export
- 12 tools migrated to modules
- Remaining 35 tools in old file (can migrate later)

**Part 2: Handler Registry Pattern**
- Created `src/handlers.ts` with typed handlers
- Replaced 428-line switch statement with registry lookup
- Clean, maintainable handler functions

**Benefits:**
- ✅ 75% reduction in index.ts (428 → 108 lines)
- ✅ Type-safe handler functions
- ✅ Easier to add new tools
- ✅ Better code organization
- ✅ Improved maintainability

**Backward Compatibility:**
- ✅ All 47 tool names unchanged
- ✅ All parameters unchanged
- ✅ All behavior unchanged
- ✅ No breaking changes
- ✅ Users don't need to update configs

**Git Stats:**
- index.ts: 428 → 108 lines (-75%)
- handlers.ts: +270 lines (new)
- tools/: +3 modules (new)

**Version:** 3.0.4 (PATCH - internal refactor, no API changes)

## [3.0.3] - 2025-11-10

### 🔧 Final Polish: Complete Rename

**Updated all remaining references to new package name:**

**Changes:**
- src/index.ts: server name 'mcp-home-assistant' → 'home-assistant-mcp'
- src/index.ts: version synced with package.json (3.0.3)
- QUICK_START.md: all paths and commands updated
- bin: simplified format to string path

**Version:** 3.0.3

## [3.0.2] - 2025-11-10

### 🐛 Bug Fix: NPM Publish Warnings

**Fixed NPM publish warnings:**
- repository.url: added `git+` prefix
- Added .npmrc with provenance=true

## [3.0.1] - 2025-11-10

### 🔧 Bug Fix: Bin Format

**Restored bin to object format after NPM auto-correction.**

## [3.0.0] - 2025-11-10

### 🎯 BREAKING: Package Renamed + SDK Upgraded

**MAJOR: Package renamed for consistency!**

**Old name:** `@coolver/mcp-home-assistant`  
**New name:** `@coolver/home-assistant-mcp`

**Breaking Changes:**
- Package name changed
- Users MUST update mcp.json:
  ```json
  "args": ["-y", "@coolver/home-assistant-mcp@latest"]
  ```
- SDK: 0.5.0 → 1.21.1 (new API)
- bin command: mcp-home-assistant → home-assistant-mcp

**Why:**
- Consistency with GitHub repo (home-assistant-mcp)
- Development stage (no users affected)
- Clearer naming (home-assistant first)

**Changes:**
- package.json: name, version (2.5.1 → 3.0.0), bin, SDK dependency
- README.md: all package references updated
- QUICK_START.md: all package references updated
- Repository: github.com/Coolver/home-assistant-mcp

**Requires:** HA Cursor Agent v2.6.0+

## [2.5.0] - 2025-11-09

### 🎯 MAJOR REFACTOR: AI-Driven Dashboard Generation

**Removed server-side generation - AI generates in Cursor now!**

**Changes:**
- ❌ REMOVED: ha_generate_dashboard tool
- ✅ UPDATED: ha_analyze_entities_for_dashboard (full entity data)
- ✅ KEPT: ha_apply_dashboard, ha_delete_dashboard

**New Workflow:**
1. User asks for dashboard
2. AI asks clarifying questions (conversational!)
3. AI analyzes entities
4. AI generates custom YAML in Cursor
5. AI proposes to user
6. AI applies via ha_apply_dashboard

**Benefits:**
- AI understands context
- Flexible custom layouts
- Conversational approach
- No rigid templates

**Requires:** HA Cursor Agent v2.5.0+

## [2.4.3] - 2025-11-09

### ✨ Feature: Full HA Restart Tool

**Added ha_restart tool:**
- Full Home Assistant restart (not just component reload)
- Use when config changes require full restart
- HA unavailable for ~60 seconds

**Requires:** HA Cursor Agent v2.4.7+

## [2.4.2] - 2025-11-09

### 🗑️ Feature: Dashboard Deletion

**Added ha_delete_dashboard tool:**
- Delete dashboard file
- Remove from configuration.yaml
- Restart Home Assistant
- Git backup

**Complete dashboard lifecycle:**
- ha_analyze_entities_for_dashboard → analyze
- ha_apply_dashboard → create + register
- ha_delete_dashboard → delete + unregister

**Requires:** HA Cursor Agent v2.4.5+

## [2.4.1] - 2025-11-09

### 🎯 Feature: Dashboard Auto-Registration

**Dashboard auto-registration parameters:**
- filename: custom dashboard filename
- register_dashboard: auto-register in configuration.yaml
- No manual UI steps needed!

**Requires:** HA Cursor Agent v2.4.2+

## [2.4.0] - 2025-11-09

### 🎨 MAJOR: Lovelace Dashboard Generator

**Initial dashboard generation tools:**
- ha_analyze_entities_for_dashboard
- ha_generate_dashboard (later removed in v2.5.0)
- ha_preview_dashboard
- ha_apply_dashboard

**Requires:** HA Cursor Agent v2.4.0+

## [2.3.4] - 2025-11-09

### 🔍 Feature: MCP Client Version Tracking

**Send MCP version to agent in request headers:**
- ✅ Added `X-MCP-Client-Version` header to all requests
- ✅ Version read from package.json automatically
- ✅ Enables agent to log which MCP version is connecting

**Changes:**
- src/ha-client.ts: added version reading from package.json
- src/ha-client.ts: added X-MCP-Client-Version to axios headers
- package.json: 2.3.3 → 2.3.4

**Impact:**
- Agent can now see MCP client version in logs
- Better debugging and compatibility tracking
- Helps identify version mismatches

**Requires:** HA Cursor Agent v2.3.13+

## [2.3.3] - 2025-11-09

### 🐛 Critical Bug Fix

**Fixed Health Check Endpoint:**
- ✅ Changed healthCheck() from GET `/` to GET `/api/health`
- ✅ MCP client now successfully connects to agent on startup
- ✅ Fixes "Failed to connect to HA Cursor Agent" error

**Root cause:**
- healthCheck() was calling wrong endpoint: `/` (ingress panel HTML)
- Should call: `/api/health` (health check JSON API)
- Agent was working, but MCP couldn't validate connection
- MCP exits if health check fails

**Impact:**
- MCP server now starts successfully
- All tools become available in Cursor
- Connection validation works correctly

**Changes:**
- src/ha-client.ts: healthCheck endpoint fix
- build/: recompiled TypeScript

## [2.3.1] - 2025-11-09

### 🔧 Feature: Repository Management

**Add-on Repository Management** - Add community repositories to access popular add-ons!

### New MCP Tools (2 repository tools)

**Repository Management:**
- `ha_list_repositories` - List all connected add-on repositories
- `ha_add_repository` - Add custom add-on repository URL

### Why This Matters

**Problem:** Users see only 1-2 add-ons because community repositories aren't connected.

**Solution:** AI can now:
1. Check which repositories are connected
2. Suggest adding popular repositories
3. Add repositories programmatically
4. Show available add-ons after adding repository

**Popular repositories:**
- Community: https://github.com/hassio-addons/repository
- Zigbee2MQTT: https://github.com/zigbee2mqtt/hassio-zigbee2mqtt
- ESPHome: https://github.com/esphome/hassio

### Changes

- Added `ha_list_repositories` tool
- Added `ha_add_repository` tool
- AI can now manage repository sources
- Better explanation when minimal add-ons available

### Requires

- HA Cursor Agent v2.3.10+

## [2.3.0] - 2025-11-09

### 🚀 MAJOR: Complete Add-on Management

**Full add-on lifecycle management** - Install, configure, and control Home Assistant add-ons via Cursor AI!

### New MCP Tools (12 add-on tools)

**Add-on Lifecycle:**
- `ha_list_addons` - List all available and installed add-ons
- `ha_list_installed_addons` - List only installed add-ons
- `ha_addon_info` - Get detailed add-on information
- `ha_addon_logs` - Read add-on logs for troubleshooting
- `ha_install_addon` - Install add-on (Zigbee2MQTT, Node-RED, etc)
- `ha_uninstall_addon` - Uninstall add-on
- `ha_start_addon` - Start add-on service
- `ha_stop_addon` - Stop add-on service
- `ha_restart_addon` - Restart add-on service
- `ha_update_addon` - Update add-on to latest version
- `ha_get_addon_options` - Get add-on configuration
- `ha_set_addon_options` - Configure add-on options

### Features

**Agent v2.3.0 adds Supervisor API:**
- Full add-on management via Supervisor API
- Timeout handling for long operations
- Error handling and user-friendly messages
- Log monitoring capabilities

**Full workflow now works:**
```
✅ "Install Zigbee2MQTT for my Sonoff dongle"
✅ "Setup Mosquitto MQTT broker"
✅ "My Zigbee2MQTT isn't working - check logs and fix"
✅ "Update all my add-ons"
```

### README Improvements

- ✅ Added "🔌 Manage Add-ons & Services" section
- ✅ Clear examples: Zigbee2MQTT, MQTT, Node-RED
- ✅ Shows natural language prompts for add-on operations
- ✅ Better visibility of service management features

**Impact:**
- Complete infrastructure setup automation
- Simplified Zigbee/MQTT configuration
- Automated add-on troubleshooting
- Aligned with agent v2.3.0

**Requires:** HA Cursor Agent v2.3.0+

## [2.2.2] - 2025-11-09

### 📝 Documentation Enhancement

**README Improvements**
- ✅ Added "📦 Extend with Community Integrations" section to main capabilities
- ✅ Clear examples of HACS usage with natural language prompts
- ✅ Better visibility of community integrations feature (1000+ repos)
- ✅ Improved feature discoverability in main README

**Impact:**
- Users better understand HACS capabilities from README
- Clear examples of how to use HACS through Cursor AI
- Better alignment with agent v2.2.3 documentation

## [2.2.1] - 2025-11-09

### 🧠 Tool Descriptions Enhancement

**Proactive HACS Support**
- ✅ Enhanced `ha_hacs_status` description - now instructs AI to ALWAYS check this first when HACS is mentioned
- ✅ Updated `ha_hacs_list_repositories` - reminds to check status and offer installation if needed
- ✅ Updated `ha_hacs_search` - same proactive installation logic
- ✅ Better AI behavior - automatically offers HACS installation when user requests custom integrations

**Impact:**
- AI now proactively suggests HACS installation
- Improved user experience - no need to manually discover HACS
- Aligned with agent v2.2.2 AI Instructions

## [2.2.0] - 2025-11-09

### 🚀 MAJOR: Complete HACS Integration with WebSocket

**Full HACS Management** - Browse, search, and install 1000+ integrations via Cursor AI!

### New MCP Tools

Added 7 HACS tools (4 new, 3 enhanced):

**Installation:**
- `ha_install_hacs` - Install HACS automatically
- `ha_hacs_status` - Check if HACS is installed

**Repository Management (NEW - WebSocket powered):**
- `ha_hacs_list_repositories` - List all HACS repositories ✨ Enhanced
- `ha_hacs_search` - Search by name/author/description ✨ NEW
- `ha_hacs_install_repository` - Install from HACS ✨ Enhanced  
- `ha_hacs_update_all` - Update all repositories ✨ NEW
- `ha_hacs_repository_details` - Get detailed repo info ✨ NEW

### Features

**Agent v2.2.0 adds WebSocket:**
- Persistent WebSocket connection to Home Assistant
- Real-time state access
- Service calls via WebSocket
- Auto-reconnect with backoff
- Background task management

**Full workflow now works:**
```
User: "Install HACS and then install Xiaomi Gateway 3"

AI:
1. Installs HACS from GitHub ✅
2. Restarts Home Assistant ✅
3. Waits for connection ✅
4. Searches: "xiaomi gateway" ✅
5. Finds: "AlexxIT/XiaomiGateway3" ✅
6. Installs via hacs.download ✅
7. Guides through config ✅
```

**What you can do:**
- 📦 "Install HACS"
- 🔍 "Search for Xiaomi integrations in HACS"
- ⬇️ "Install Xiaomi Gateway 3 from HACS"
- 🔄 "Update all my HACS integrations"
- 📊 "Show me details about the Xiaomi Gateway integration"

**Requirements:**
- HA Cursor Agent v2.2.0+ (with WebSocket)
- HACS configured via UI first time (one-time)

## [2.1.0] - 2025-11-09

### ✨ NEW: HACS Support (Initial)

Basic HACS installation support (file operations only).

**Note:** v2.1.0 only supported installation. v2.2.0 adds full repository management with WebSocket.

## [2.0.0] - 2025-11-08

### 🚨 BREAKING CHANGES

- **Removed `HA_TOKEN` support** - only `HA_AGENT_KEY` is accepted now
  - Old configurations with `HA_TOKEN` will **STOP WORKING**
  - Must update to `HA_AGENT_KEY` in your Cursor MCP configuration
  - Cleaner API without legacy naming

### Migration Required

**If you're using `HA_TOKEN`:**

```json
// OLD (will not work in v2.0.0+):
{
  "env": {
    "HA_TOKEN": "your-key"
  }
}

// NEW (required):
{
  "env": {
    "HA_AGENT_KEY": "your-key"
  }
}
```

**How to migrate:**
1. Update HA Cursor Agent add-on to v2.0.0
2. Get new configuration from Web UI (Settings → Add-ons → HA Cursor Agent → Open Web UI)
3. Copy the ready-to-use JSON config
4. Update Cursor: Settings → Tools & MCP → Edit your server or add new one
5. Restart Cursor

### Why This Change?

- ✅ Accurate naming: It's an Agent Key, not a HA Token
- ✅ No confusion with Home Assistant authentication tokens
- ✅ Simpler codebase
- ✅ Clear API semantics

### What Stays the Same

- ✅ Same MCP tools and functionality
- ✅ Same HA Cursor Agent API endpoints
- ✅ Only variable name changed

---

## [1.0.14] - 2025-11-08

### Documentation
- Fixed Ingress Panel access path in documentation

## [1.0.13] - 2025-11-08

### Documentation
- Updated setup instructions to use Cursor Settings UI

## [1.0.12] - 2025-11-08

### Documentation
- Updated agent version requirements

## [1.0.11] - 2025-11-08

### Documentation
- Updated to reference agent v1.0.11+

## [1.0.10] - 2025-11-08

### Documentation
- Updated to reference agent v1.0.10+

## [1.0.9] - 2025-11-08

### Added
- Support for `HA_AGENT_KEY` environment variable (with backward compatibility to `HA_TOKEN`)

## [1.0.8] - 2025-11-08

### Documentation
- Updated for API Key authentication instead of Long-Lived Tokens

## [1.0.7] - 2025-11-08

### Documentation
- Updated for HA Cursor Agent v1.0.9+ with API Key system

## [1.0.6] - 2025-11-08

### Fixed
- Fixed `ha_reload_config` to properly pass component parameter

### Added
- `ha_git_diff` tool for viewing differences between commits

## [1.0.5] - 2025-11-08

### Changed
- Updated tool descriptions with [READ-ONLY] and [WRITE] labels

## [1.0.4] - 2025-11-08

### Added
- Better log formatting for `ha_get_logs` tool

## [1.0.3] - 2025-11-08

### Added
- Git diff functionality

## [1.0.2] - 2025-11-08

### Documentation
- Updated README with improved instructions

## [1.0.1] - 2025-11-08

### Fixed
- Initial release fixes

## [1.0.0] - 2025-11-08

### Added
- Initial release
- MCP server for Home Assistant via HA Cursor Agent
- Full API coverage (files, entities, helpers, automations, scripts, system, backup, logs)
- TypeScript implementation
- NPM package publication
