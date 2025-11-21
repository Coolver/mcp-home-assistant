/**
 * Tool Handlers Registry
 * Maps tool names to handler functions
 */

import { HAClient } from './ha-client.js';

// Handler function type
type ToolHandler = (client: HAClient, args: any) => Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }>;

// Helper to format JSON response
const jsonResponse = (data: any) => {
  // Handle undefined, null, or other edge cases
  let text: string;
  try {
    if (data === undefined) {
      text = 'undefined';
    } else if (data === null) {
      text = 'null';
    } else {
      text = JSON.stringify(data, null, 2);
    }
  } catch (error) {
    text = `Error serializing response: ${error}`;
  }
  
  return {
    content: [{ type: 'text', text }],
  };
};

// Helper to format success message
const successResponse = (message: string) => ({
  content: [{ type: 'text', text: message || 'Success' }],
});

/**
 * Tool Handlers Registry
 * 
 * Each handler is a function that takes (client, args) and returns a response
 */
export const toolHandlers: Record<string, ToolHandler> = {
  // File Operations
  'ha_read_file': async (client, args) => {
    const result = await client.readFile(args.path);
    return { content: [{ type: 'text', text: result }] };
  },

  'ha_write_file': async (client, args) => {
    await client.writeFile(args.path, args.content);
    return successResponse(`File written successfully: ${args.path}`);
  },

  'ha_list_files': async (client, args) => {
    const result = await client.listFiles(args.directory);
    return jsonResponse(result);
  },

  'ha_delete_file': async (client, args) => {
    await client.deleteFile(args.path);
    return successResponse(`File deleted successfully: ${args.path}`);
  },

  // Entity Operations
  'ha_list_entities': async (client, args) => {
    const result = await client.listEntities(args.domain);
    return jsonResponse(result);
  },

  'ha_get_entity_state': async (client, args) => {
    const result = await client.getEntityState(args.entity_id);
    return jsonResponse(result);
  },

  // Helper Operations
  'ha_list_helpers': async (client, args) => {
    const result = await client.listHelpers();
    return jsonResponse(result);
  },
  'ha_create_helper': async (client, args) => {
    const result = await client.createHelper(args.type, args.config);
    return jsonResponse(result);
  },
  'ha_delete_helper': async (client, args) => {
    const result = await client.deleteHelper(args.entity_id);
    return jsonResponse(result);
  },

  // Automation Operations
  'ha_create_automation': async (client, args) => {
    const result = await client.createAutomation(args.config);
    return jsonResponse(result);
  },

  'ha_list_automations': async (client, args) => {
    const result = await client.listAutomations();
    return jsonResponse(result);
  },

  'ha_delete_automation': async (client, args) => {
    const result = await client.deleteAutomation(args.automation_id);
    return jsonResponse(result);
  },

  // Script Operations
  'ha_create_script': async (client, args) => {
    const result = await client.createScript(args.config);
    return jsonResponse(result);
  },

  'ha_list_scripts': async (client, args) => {
    const result = await client.listScripts();
    return jsonResponse(result);
  },

  'ha_delete_script': async (client, args) => {
    await client.deleteScript(args.script_id);
    return successResponse(`Script deleted: ${args.script_id}`);
  },

  // Git/Backup Operations
  'ha_git_commit': async (client, args) => {
    const result = await client.gitCommit(args.message);
    return jsonResponse(result);
  },

  'ha_git_history': async (client, args) => {
    const result = await client.gitHistory(args.limit);
    return jsonResponse(result);
  },

  'ha_git_rollback': async (client, args) => {
    const result = await client.gitRollback(args.commit_hash);
    return jsonResponse(result);
  },

  'ha_git_diff': async (client, args) => {
    const result = await client.gitDiff(args.commit1, args.commit2);
    return jsonResponse(result);
  },

  // System Operations
  'ha_check_config': async (client, args) => {
    const result = await client.checkConfig();
    return jsonResponse(result);
  },

  'ha_reload_config': async (client, args) => {
    const result = await client.reloadConfig(args.component);
    return jsonResponse(result);
  },

  'ha_restart': async (client, args) => {
    const result = await client.restartHomeAssistant();
    return jsonResponse(result);
  },

  'ha_get_logs': async (client, args) => {
    const result = await client.getLogs(args.limit, args.level);
    return jsonResponse(result);
  },

  'ha_logbook_entries': async (client, args) => {
    const result = await client.getLogbookEntries(args || {});
    return jsonResponse(result);
  },

  // HACS Operations
  'ha_install_hacs': async (client, args) => {
    const result = await client.hacsInstall();
    return jsonResponse(result);
  },

  'ha_uninstall_hacs': async (client, args) => {
    const result = await client.hacsUninstall();
    return jsonResponse(result);
  },

  'ha_hacs_status': async (client, args) => {
    const result = await client.hacsStatus();
    return jsonResponse(result);
  },

  'ha_hacs_list_repositories': async (client, args) => {
    const result = await client.hacsListRepositories();
    return jsonResponse(result);
  },

  'ha_hacs_install_repository': async (client, args) => {
    const result = await client.hacsInstallRepository(args.repository, args.category);
    return jsonResponse(result);
  },

  'ha_hacs_search': async (client, args) => {
    const result = await client.hacsSearch(args.query, args.category);
    return jsonResponse(result);
  },

  'ha_hacs_update_all': async (client, args) => {
    const result = await client.hacsUpdateAll();
    return jsonResponse(result);
  },

  'ha_hacs_repository_details': async (client, args) => {
    const result = await client.hacsGetRepositoryDetails(args.repository_id);
    return jsonResponse(result);
  },

  // Add-on Operations
  'ha_list_store_addons': async (client, args) => {
    const result = await client.listStoreAddons();
    return jsonResponse(result);
  },

  'ha_list_addons': async (client, args) => {
    const result = await client.listAvailableAddons();
    return jsonResponse(result);
  },

  'ha_list_installed_addons': async (client, args) => {
    const result = await client.listInstalledAddons();
    return jsonResponse(result);
  },

  'ha_addon_info': async (client, args) => {
    const result = await client.getAddonInfo(args.slug);
    return jsonResponse(result);
  },

  'ha_addon_logs': async (client, args) => {
    const result = await client.getAddonLogs(args.slug, args.lines);
    return jsonResponse(result);
  },

  'ha_install_addon': async (client, args) => {
    const result = await client.installAddon(args.slug);
    return jsonResponse(result);
  },

  'ha_uninstall_addon': async (client, args) => {
    const result = await client.uninstallAddon(args.slug);
    return jsonResponse(result);
  },

  'ha_start_addon': async (client, args) => {
    const result = await client.startAddon(args.slug);
    return jsonResponse(result);
  },

  'ha_stop_addon': async (client, args) => {
    const result = await client.stopAddon(args.slug);
    return jsonResponse(result);
  },

  'ha_restart_addon': async (client, args) => {
    const result = await client.restartAddon(args.slug);
    return jsonResponse(result);
  },

  'ha_update_addon': async (client, args) => {
    const result = await client.updateAddon(args.slug);
    return jsonResponse(result);
  },

  'ha_get_addon_options': async (client, args) => {
    const result = await client.getAddonOptions(args.slug);
    return jsonResponse(result);
  },

  'ha_set_addon_options': async (client, args) => {
    const result = await client.setAddonOptions(args.slug, args.options);
    return jsonResponse(result);
  },

  'ha_list_repositories': async (client, args) => {
    const result = await client.listRepositories();
    return jsonResponse(result);
  },

  'ha_add_repository': async (client, args) => {
    const result = await client.addRepository(args.repository_url);
    return jsonResponse(result);
  },

  // Dashboard Operations
  'ha_analyze_entities_for_dashboard': async (client, args) => {
    const result = await client.analyzeEntitiesForDashboard();
    return jsonResponse(result);
  },

  'ha_preview_dashboard': async (client, args) => {
    const result = await client.previewDashboard();
    return jsonResponse(result);
  },

  'ha_apply_dashboard': async (client, args) => {
    const result = await client.applyDashboard(
      args.dashboard_config,
      args.create_backup,
      args.filename,
      args.register_dashboard
    );
    return jsonResponse(result);
  },

  'ha_delete_dashboard': async (client, args) => {
    const result = await client.deleteDashboard(
      args.filename,
      args.remove_from_config,
      args.create_backup
    );
    return jsonResponse(result);
  },

  // Service Calls
  'ha_call_service': async (client, args) => {
    const result = await client.callService(
      args.domain,
      args.service,
      args.service_data,
      args.target
    );
    return jsonResponse(result);
  },
};

