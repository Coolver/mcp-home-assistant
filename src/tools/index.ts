/**
 * MCP Tools - Modular Tool Definitions
 * 
 * Tools are organized by domain. Modular files (files.ts, system.ts, dashboard.ts)
 * override the corresponding definitions in ../tools.ts. All other tools are
 * served from ../tools.ts until they're migrated to their own modules.
 */

import { fileTools } from './files.js';
import { systemTools } from './system.js';
import { dashboardTools } from './dashboard.js';
import { skillsTools } from './skills.js';
import { tools as allTools } from '../tools.js';

const migratedToolNames = [
  'ha_read_file', 'ha_write_file', 'ha_list_files', 'ha_delete_file',
  'ha_check_config', 'ha_reload_config', 'ha_restart', 'ha_get_logs',
  'ha_dashboard_enhancements_status', 'ha_install_dashboard_enhancements',
  'ha_list_dashboards', 'ha_read_dashboard', 'ha_export_dashboard', 'ha_apply_dashboard_by_id',
  'ha_list_bundled_skills', 'ha_get_bundled_skill', 'ha_install_bundled_skill',
  'ha_analyze_entities_for_dashboard', 'ha_preview_dashboard', 'ha_apply_dashboard', 'ha_delete_dashboard',
];

const remainingTools = allTools.filter(
  tool => !migratedToolNames.includes(tool.name)
);

export const tools = [
  ...fileTools,
  ...systemTools,
  ...dashboardTools,
  ...skillsTools,
  ...remainingTools,
];

export { fileTools, systemTools, dashboardTools };

