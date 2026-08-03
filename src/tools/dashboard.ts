/**
 * Dashboard Tools
 * Lovelace dashboard generation and management (YAML + storage mode)
 */

export const dashboardTools = [
  {
    name: 'ha_dashboard_enhancements_status',
    description:
      '[READ-ONLY] Check optional Mushroom/HACS dashboard enhancements. Native HA cards work without this. Use before suggesting prettier cards. Safe operation.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'ha_install_dashboard_enhancements',
    description:
      '[WRITE] Install Mushroom via HACS and register Lovelace resource. Only call after user explicitly approves in chat. Not required for dashboards. MODIFIES configuration - requires approval!',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'ha_list_dashboards',
    description:
      '[READ-ONLY] List all Lovelace dashboards (YAML-registered in configuration.yaml and storage mode in .storage). Call this first before editing any dashboard. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_read_dashboard',
    description:
      '[READ-ONLY] Read Lovelace dashboard config by id (e.g. primary, lovelace, home-main). Returns normalized config for YAML and storage dashboards. Prefer over ha_preview_dashboard. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        dashboard_id: {
          type: 'string',
          description: 'Dashboard id from ha_list_dashboards (e.g. primary, lovelace, home-main)',
        },
      },
      required: ['dashboard_id'],
    },
  },
  {
    name: 'ha_analyze_entities_for_dashboard',
    description:
      '[READ-ONLY] Get entities for AI-driven dashboard generation with pagination/filtering. Safe operation - only reads data. Use summary_only=true to reduce payload; if has_next=true, request next page.',
    inputSchema: {
      type: 'object',
      properties: {
        domains: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional domain filters (e.g., ["climate", "light"])',
        },
        summary_only: {
          type: 'boolean',
          description: 'If true, return lightweight entity summary instead of full state objects',
        },
        page: {
          type: 'number',
          description: 'Page number (1-based, default 1)',
        },
        page_size: {
          type: 'number',
          description: 'Entities per page (default 250, max 500)',
        },
        full_list: {
          type: 'boolean',
          description: 'If true, return full list without pagination',
        },
      },
    },
  },
  {
    name: 'ha_preview_dashboard',
    description:
      '[READ-ONLY] Legacy preview of ui-lovelace.yaml only. For storage dashboards use ha_list_dashboards + ha_read_dashboard instead. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'ha_export_dashboard',
    description:
      '[READ-ONLY] Export a storage-mode dashboard to YAML text and suggested filename for migration to YAML mode. Does not write files. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        dashboard_id: {
          type: 'string',
          description: 'Storage dashboard id (e.g. primary)',
        },
        filename: {
          type: 'string',
          description: 'Optional suggested output path (e.g. dashboards/home-main.yaml)',
        },
      },
      required: ['dashboard_id'],
    },
  },
  {
    name: 'ha_apply_dashboard_by_id',
    description:
      '[WRITE] Apply Lovelace config to an existing dashboard by id (YAML file or .storage JSON). Creates Git backup by default. MODIFIES configuration - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {
        dashboard_id: {
          type: 'string',
          description: 'Dashboard id from ha_list_dashboards',
        },
        dashboard_config: {
          type: 'object',
          description: 'Full Lovelace dashboard config (views, resources, etc.)',
        },
        create_backup: {
          type: 'boolean',
          description: 'Create Git backup before applying (default: true)',
        },
        description: {
          type: 'string',
          description: 'Optional: used in Git commit message',
        },
      },
      required: ['dashboard_id', 'dashboard_config'],
    },
  },
  {
    name: 'ha_apply_dashboard',
    description:
      '[WRITE] Create or overwrite a YAML dashboard file and optionally register in configuration.yaml. For existing dashboards prefer ha_apply_dashboard_by_id. Creates Git backup. MODIFIES configuration - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {
        dashboard_config: {
          type: 'object',
          description: 'Dashboard configuration object',
        },
        create_backup: {
          type: 'boolean',
          description: 'Create Git backup before applying (default: true)',
        },
        filename: {
          type: 'string',
          description: 'Dashboard filename (default: ai-dashboard.yaml); must contain a hyphen',
        },
        register_dashboard: {
          type: 'boolean',
          description: 'Auto-register dashboard in configuration.yaml (default: true)',
        },
        description: {
          type: 'string',
          description: 'Optional: used in Git commit message',
        },
      },
      required: ['dashboard_config'],
    },
  },
  {
    name: 'ha_delete_dashboard',
    description:
      '[WRITE] Delete YAML dashboard file and remove from configuration.yaml. Creates Git backup. DESTRUCTIVE - requires approval!',
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
