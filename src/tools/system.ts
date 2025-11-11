/**
 * System Operation Tools
 * Configuration validation, reload, restart, logs
 */

export const systemTools = [
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
];
















