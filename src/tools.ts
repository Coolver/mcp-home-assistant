import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const tools: Tool[] = [
  // File Operations (Read-only)
  {
    name: 'ha_read_file',
    description: '[READ-ONLY] Read a file from Home Assistant configuration directory. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the file relative to /config (e.g., "configuration.yaml", "automations.yaml", "scripts/my_script.yaml")',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'ha_write_file',
    description: '[WRITE] Write content to a file in Home Assistant. MODIFIES configuration - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the file relative to /config',
        },
        content: {
          type: 'string',
          description: 'Content to write to the file',
        },
      },
      required: ['path', 'content'],
    },
  },
  {
    name: 'ha_list_files',
    description: '[READ-ONLY] List files and directories in Home Assistant. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        directory: {
          type: 'string',
          description: 'Directory path relative to /config (default: "/")',
        },
      },
    },
  },
  {
    name: 'ha_delete_file',
    description: '[WRITE] Delete a file from Home Assistant. DESTRUCTIVE - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the file to delete',
        },
      },
      required: ['path'],
    },
  },

  // Entity Operations (Read-only)
  {
    name: 'ha_list_entities',
    description: '[READ-ONLY] List all entities in Home Assistant. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Optional domain filter (e.g., "light", "climate", "sensor")',
        },
      },
    },
  },
  {
    name: 'ha_get_entity_state',
    description: '[READ-ONLY] Get entity state and attributes. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        entity_id: {
          type: 'string',
          description: 'Entity ID (e.g., "light.living_room", "climate.bedroom")',
        },
      },
      required: ['entity_id'],
    },
  },

  // Helper Operations
  {
    name: 'ha_list_helpers',
    description: '[READ-ONLY] List all helpers in Home Assistant. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_create_helper',
    description: '[WRITE] Create a Home Assistant helper via YAML configuration. MODIFIES configuration - requires approval. Helper will be created in YAML file and reloaded automatically.',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['input_boolean', 'input_text', 'input_number', 'input_datetime', 'input_select'],
          description: 'Helper type',
        },
        config: {
          type: 'object',
          description: 'Helper configuration (must include "name" field)',
        },
      },
      required: ['type', 'config'],
    },
  },
  {
    name: 'ha_delete_helper',
    description: '[WRITE] Delete a Home Assistant helper from YAML configuration. MODIFIES configuration - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        entity_id: {
          type: 'string',
          description: 'Full entity ID of helper to delete (e.g., "input_boolean.my_switch")',
        },
      },
      required: ['entity_id'],
    },
  },

  // Automation Operations
  {
    name: 'ha_create_automation',
    description: '[WRITE] Create new automation in Home Assistant. MODIFIES configuration - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        config: {
          type: 'object',
          description: 'Automation configuration (id, alias, trigger, condition, action)',
        },
      },
      required: ['config'],
    },
  },
  {
    name: 'ha_list_automations',
    description: '[READ-ONLY] List all automations in Home Assistant. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_delete_automation',
    description: '[WRITE] Delete automation from Home Assistant. MODIFIES configuration - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        automation_id: {
          type: 'string',
          description: 'Automation ID to delete (e.g., "my_automation")',
        },
      },
      required: ['automation_id'],
    },
  },

  // Script Operations
  {
    name: 'ha_create_script',
    description: '[WRITE] Create new script in Home Assistant. MODIFIES configuration - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        config: {
          type: 'object',
          description: 'Script configuration object',
        },
      },
      required: ['config'],
    },
  },
  {
    name: 'ha_list_scripts',
    description: '[READ-ONLY] List all scripts in Home Assistant. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_delete_script',
    description: '[WRITE] Delete script from Home Assistant. MODIFIES configuration - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        script_id: {
          type: 'string',
          description: 'Script ID to delete (e.g., "my_script")',
        },
      },
      required: ['script_id'],
    },
  },

  // Git/Backup Operations
  {
    name: 'ha_git_commit',
    description: '[WRITE] Commit configuration to Git. Creates backup snapshot.',
    inputSchema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Commit message describing the changes',
        },
      },
      required: ['message'],
    },
  },
  {
    name: 'ha_git_history',
    description: '[READ-ONLY] Get Git commit history. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Number of commits to retrieve (default: 20)',
        },
      },
    },
  },
  {
    name: 'ha_git_rollback',
    description: '[WRITE] Rollback configuration to specific commit. DESTRUCTIVE - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {
        commit_hash: {
          type: 'string',
          description: 'Git commit hash to rollback to',
        },
      },
      required: ['commit_hash'],
    },
  },
  {
    name: 'ha_git_diff',
    description: '[READ-ONLY] Show differences between commits. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        commit1: {
          type: 'string',
          description: 'First commit hash (optional). If omitted, shows uncommitted changes',
        },
        commit2: {
          type: 'string',
          description: 'Second commit hash (optional). If omitted with commit1, shows changes since commit1 to HEAD',
        },
      },
    },
  },

  // System Operations
  {
    name: 'ha_check_config',
    description: '[READ-ONLY] Validate Home Assistant configuration. Safe operation - only checks, does not modify.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_reload_config',
    description: '[WRITE] Reload Home Assistant configuration. APPLIES changes - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Component to reload: "automations", "scripts", "templates", "core", or "all" (default: "all")',
          enum: ['automations', 'scripts', 'templates', 'core', 'all'],
        },
      },
    },
  },
  {
    name: 'ha_restart',
    description: '[WRITE] FULL restart of Home Assistant. Completely restarts HA Core. Use when configuration changes require full restart (e.g., new dashboards, integrations). HA will be unavailable for 30-60 seconds. DISRUPTIVE - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_get_logs',
    description: '[READ-ONLY] Get agent logs to troubleshoot issues. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Number of log entries to retrieve (default: 100)',
        },
        level: {
          type: 'string',
          description: 'Filter by log level: DEBUG, INFO, WARNING, ERROR (optional)',
          enum: ['DEBUG', 'INFO', 'WARNING', 'ERROR'],
        },
      },
    },
  },
  {
    name: 'ha_install_hacs',
    description: '[WRITE] Install HACS (Home Assistant Community Store). Downloads latest HACS from GitHub, installs to custom_components, and restarts Home Assistant. Opens access to 1000+ integrations. MODIFIES configuration - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_uninstall_hacs',
    description: '[WRITE] Uninstall HACS (Home Assistant Community Store). Removes HACS directory, storage files, and restarts Home Assistant. DESTRUCTIVE - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_hacs_status',
    description: '[READ-ONLY] Check if HACS is installed and get version info. ALWAYS call this FIRST when user mentions HACS or asks about custom integrations. If not installed, offer to install via ha_install_hacs. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_hacs_list_repositories',
    description: '[READ-ONLY] List available HACS repositories (integrations, themes, plugins). Requires HACS to be installed and configured. If HACS not installed, use ha_hacs_status first and offer installation. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_hacs_install_repository',
    description: '[WRITE] Install integration/theme/plugin from HACS. Requires HACS to be installed. MODIFIES configuration - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {
        repository: {
          type: 'string',
          description: 'Repository name to install (e.g., "AlexxIT/XiaomiGateway3")',
        },
        category: {
          type: 'string',
          description: 'Repository category: integration, theme, plugin, appdaemon, netdaemon, python_script (default: integration)',
          enum: ['integration', 'theme', 'plugin', 'appdaemon', 'netdaemon', 'python_script'],
        },
      },
      required: ['repository'],
    },
  },
  {
    name: 'ha_hacs_search',
    description: '[READ-ONLY] Search HACS repositories by name, author, or description. If HACS not installed yet, use ha_hacs_status first and offer to install HACS. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query (e.g., "xiaomi", "gateway", "sensor")',
        },
        category: {
          type: 'string',
          description: 'Filter by category (optional)',
          enum: ['integration', 'theme', 'plugin', 'appdaemon', 'netdaemon', 'python_script'],
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'ha_hacs_update_all',
    description: '[WRITE] Update all installed HACS repositories to latest versions. Home Assistant restart required after updates. MODIFIES configuration - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_hacs_repository_details',
    description: '[READ-ONLY] Get detailed information about a specific HACS repository (stars, authors, versions, etc). Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        repository_id: {
          type: 'string',
          description: 'Repository identifier (e.g., "AlexxIT/XiaomiGateway3" or part of entity_id)',
        },
      },
      required: ['repository_id'],
    },
  },

  // ==================== Add-on Management ====================

  {
    name: 'ha_list_store_addons',
    description: '[READ-ONLY] List ALL add-ons from add-on store catalog (complete list from all repositories). Use this to browse available add-ons and make recommendations. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_list_addons',
    description: '[READ-ONLY] List available Home Assistant add-ons (limited list). For complete catalog, use ha_list_store_addons. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_list_installed_addons',
    description: '[READ-ONLY] List only installed add-ons. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_addon_info',
    description: '[READ-ONLY] Get detailed information about a specific add-on (configuration, state, version, etc). Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Add-on slug (e.g., "core_mosquitto", "a0d7b954_zigbee2mqtt")',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'ha_addon_logs',
    description: '[READ-ONLY] Get add-on logs for troubleshooting. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Add-on slug',
        },
        lines: {
          type: 'number',
          description: 'Number of log lines to return (default: 100)',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'ha_install_addon',
    description: '[WRITE] Install a Home Assistant add-on. MODIFIES system - requires approval. Installation can take several minutes.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Add-on slug to install (e.g., "core_mosquitto" for Mosquitto MQTT, "a0d7b954_zigbee2mqtt" for Zigbee2MQTT)',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'ha_uninstall_addon',
    description: '[WRITE] Uninstall a Home Assistant add-on. DESTRUCTIVE - requires approval! Removes add-on and its data.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Add-on slug to uninstall',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'ha_start_addon',
    description: '[WRITE] Start an add-on. MODIFIES system - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Add-on slug to start',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'ha_stop_addon',
    description: '[WRITE] Stop a running add-on. MODIFIES system - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Add-on slug to stop',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'ha_restart_addon',
    description: '[WRITE] Restart an add-on. MODIFIES system - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Add-on slug to restart',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'ha_update_addon',
    description: '[WRITE] Update an add-on to latest version. MODIFIES system - requires approval. Update can take several minutes.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Add-on slug to update',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'ha_get_addon_options',
    description: '[READ-ONLY] Get add-on configuration options. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Add-on slug',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'ha_set_addon_options',
    description: '[WRITE] Set add-on configuration options. MODIFIES configuration - requires approval. Add-on may need restart.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Add-on slug',
        },
        options: {
          type: 'object',
          description: 'Configuration options to set (key-value pairs)',
        },
      },
      required: ['slug', 'options'],
    },
  },
  {
    name: 'ha_list_repositories',
    description: '[READ-ONLY] List all add-on repositories connected to Home Assistant. Shows which sources provide available add-ons. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_add_repository',
    description: '[WRITE] Add a custom add-on repository to Home Assistant. MODIFIES configuration - requires approval. Use to add community repositories with popular add-ons (Zigbee2MQTT, Node-RED, ESPHome, etc).',
    inputSchema: {
      type: 'object',
      properties: {
        repository_url: {
          type: 'string',
          description: 'Repository URL to add (e.g., https://github.com/hassio-addons/repository)',
        },
      },
      required: ['repository_url'],
    },
  },

  // ==================== Lovelace Dashboard ====================

  {
    name: 'ha_analyze_entities_for_dashboard',
    description: '[READ-ONLY] Get complete entity list for AI-driven dashboard generation. Returns entities grouped by domain with attributes. AI will use this data to generate custom dashboard based on user requirements. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_preview_dashboard',
    description: '[READ-ONLY] Preview current Lovelace dashboard configuration. Shows existing ui-lovelace.yaml if configured. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_apply_dashboard',
    description: '[WRITE] Apply generated dashboard configuration to Home Assistant. Creates file, auto-registers in configuration.yaml, and restarts HA. Creates automatic Git backup. MODIFIES configuration - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {
        dashboard_config: {
          type: 'object',
          description: 'Dashboard configuration object (from ha_generate_dashboard)',
        },
        create_backup: {
          type: 'boolean',
          description: 'Create Git backup before applying (default: true)',
        },
        filename: {
          type: 'string',
          description: 'Dashboard filename (default: ai-dashboard.yaml)',
        },
        register_dashboard: {
          type: 'boolean',
          description: 'Auto-register dashboard in configuration.yaml (default: true)',
        },
      },
      required: ['dashboard_config'],
    },
  },
  {
    name: 'ha_delete_dashboard',
    description: '[WRITE] Delete dashboard file and remove from configuration.yaml. Restarts Home Assistant. Creates automatic Git backup. DESTRUCTIVE - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {
        filename: {
          type: 'string',
          description: 'Dashboard filename to delete (e.g., ai-dashboard.yaml)',
        },
        remove_from_config: {
          type: 'boolean',
          description: 'Remove from configuration.yaml (default: true)',
        },
        create_backup: {
          type: 'boolean',
          description: 'Create Git backup before deleting (default: true)',
        },
      },
      required: ['filename'],
    },
  },
];


