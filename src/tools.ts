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
    name: 'ha_create_helper',
    description: '[WRITE] Create a Home Assistant helper. MODIFIES configuration - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Helper type (input_boolean, input_number, input_text, input_select, input_datetime)',
        },
        config: {
          type: 'object',
          description: 'Helper configuration object',
        },
      },
      required: ['type', 'config'],
    },
  },
  {
    name: 'ha_list_helpers',
    description: '[READ-ONLY] List all helpers in Home Assistant. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
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
];


