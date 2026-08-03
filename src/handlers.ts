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
 * Generate meaningful commit message based on operation context
 * Uses user-provided description if available, otherwise generates from context
 */
function generateCommitMessage(operation: string, args: any): string {
  // If user provided a description, use it (most meaningful)
  if (args.description && args.description.trim()) {
    // Add operation context to make it clearer
    switch (operation) {
      case 'write_file':
        const path = args.path || '';
        const fileName = path.split('/').pop() || path;
        if (fileName.includes('automation')) {
          return `Automations: ${args.description}`;
        } else if (fileName.includes('script')) {
          return `Scripts: ${args.description}`;
        } else if (fileName.includes('configuration')) {
          return `Configuration: ${args.description}`;
        } else if (fileName.includes('theme')) {
          return `Theme: ${args.description}`;
        } else if (fileName.includes('dashboard') || fileName.includes('lovelace')) {
          return `Dashboard: ${args.description}`;
        }
        return args.description;
      
      case 'create_helper':
        return `Add helper: ${args.description}`;
      
      case 'create_automation':
        return `Add automation: ${args.description}`;
      
      case 'create_script':
        return `Add script: ${args.description}`;
      
      case 'update_theme':
        return `Update theme: ${args.description}`;
      
      case 'create_theme':
        return `Create theme: ${args.description}`;
      
      case 'apply_dashboard':
      case 'apply_dashboard_by_id':
        return `Update dashboard: ${args.description}`;

      case 'export_dashboard':
        return `Export dashboard: ${args.description || args.dashboard_id}`;
      
      default:
        return args.description;
    }
  }

  // Fallback to auto-generated messages if no description provided
  switch (operation) {
    case 'write_file':
      const path = args.path || '';
      const fileName = path.split('/').pop() || path;
      // Detect file type and generate appropriate message
      if (fileName.includes('automation')) {
        return `Update automations: modify ${fileName}`;
      } else if (fileName.includes('script')) {
        return `Update scripts: modify ${fileName}`;
      } else if (fileName.includes('configuration')) {
        return `Update configuration: modify ${fileName}`;
      } else if (fileName.includes('theme')) {
        return `Update theme: modify ${fileName}`;
      } else if (fileName.includes('dashboard') || fileName.includes('lovelace')) {
        return `Update dashboard: modify ${fileName}`;
      }
      return `Update file: ${fileName}`;

    case 'create_helper':
      const helperType = args.type || 'helper';
      const helperName = args.config?.name || args.config?.entity_id || 'helper';
      return `Add helper: ${helperType} - ${helperName}`;

    case 'delete_helper':
      return `Remove helper: ${args.entity_id}`;

    case 'create_automation':
      const automationAlias = args.config?.alias || args.config?.id || 'automation';
      return `Add automation: ${automationAlias}`;

    case 'update_automation':
      const updateAutomationAlias = args.config?.alias || args.automation_id || 'automation';
      return args.description || `Update automation: ${updateAutomationAlias}`;

    case 'delete_automation':
      return `Remove automation: ${args.automation_id}`;

    case 'create_script':
      const scriptAlias = args.config?.alias || Object.keys(args.config || {})[0] || 'script';
      return `Add script: ${scriptAlias}`;

    case 'update_script':
      const updateScriptAlias = args.config?.alias || Object.keys(args.config || {})[0] || args.script_id || 'script';
      return args.description || `Update script: ${updateScriptAlias}`;

    case 'delete_script':
      return `Remove script: ${args.script_id}`;

    case 'create_theme':
      return `Create theme: ${args.theme_name}`;

    case 'update_theme':
      return `Update theme: ${args.theme_name}`;

    case 'delete_theme':
      return `Remove theme: ${args.theme_name}`;

    case 'apply_dashboard':
      const dashboardName = args.filename || 'dashboard';
      return `Update dashboard: ${dashboardName}`;

    case 'apply_dashboard_by_id':
      return `Update dashboard: ${args.dashboard_id}`;

    case 'export_dashboard':
      return `Export dashboard: ${args.dashboard_id}`;

    case 'delete_dashboard':
      return `Remove dashboard: ${args.filename}`;

    default:
      return `Update configuration: ${operation}`;
  }
}

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
    const commitMessage = generateCommitMessage('write_file', args);
    await client.writeFile(args.path, args.content, commitMessage);
    return successResponse(`File written successfully: ${args.path}`);
  },

  'ha_list_files': async (client, args) => {
    const result = await client.listFiles(args);
    return jsonResponse(result);
  },

  'ha_delete_file': async (client, args) => {
    await client.deleteFile(args.path);
    return successResponse(`File deleted successfully: ${args.path}`);
  },

  // Entity Operations
  'ha_list_entities': async (client, args) => {
    const result = await client.listEntities(args);
    return jsonResponse(result);
  },

  'ha_get_entity_state': async (client, args) => {
    const result = await client.getEntityState(args.entity_id);
    return jsonResponse(result);
  },

  'ha_rename_entity': async (client, args) => {
    const result = await client.renameEntity(args.old_entity_id, args.new_entity_id);
    return jsonResponse(result);
  },

  'ha_list_exposed_entities': async (client, args) => {
    const result = await client.listExposedEntities(args.assistant);
    return jsonResponse(result);
  },

  'ha_expose_entities': async (client, args) => {
    const result = await client.exposeEntities(args.entity_ids, args.should_expose, args.assistant);
    return jsonResponse(result);
  },

  // Entity Registry Operations
  'ha_get_entity_registry': async (client, args) => {
    const result = await client.getEntityRegistryList(args);
    return jsonResponse(result);
  },

  'ha_get_entity_registry_entry': async (client, args) => {
    const result = await client.getEntityRegistryEntry(args.entity_id);
    return jsonResponse(result);
  },

  'ha_update_entity_registry': async (client, args) => {
    const { entity_id, ...updateData } = args;
    const result = await client.updateEntityRegistry(entity_id, updateData);
    return jsonResponse(result);
  },

  'ha_remove_entity_registry_entry': async (client, args) => {
    const result = await client.removeEntityRegistryEntry(args.entity_id);
    return jsonResponse(result);
  },

  'ha_find_dead_entities': async (client, args) => {
    const result = await client.findDeadEntities();
    return jsonResponse(result);
  },

  // Area Registry Operations
  'ha_get_area_registry': async (client, args) => {
    const result = await client.getAreaRegistryList(args);
    return jsonResponse(result);
  },

  'ha_get_area_registry_entry': async (client, args) => {
    const result = await client.getAreaRegistryEntry(args.area_id);
    return jsonResponse(result);
  },

  'ha_create_area': async (client, args) => {
    const result = await client.createAreaRegistryEntry(args.name, args.aliases);
    return jsonResponse(result);
  },

  'ha_update_area': async (client, args) => {
    const result = await client.updateAreaRegistryEntry(args.area_id, args.name, args.aliases);
    return jsonResponse(result);
  },

  'ha_delete_area': async (client, args) => {
    const result = await client.deleteAreaRegistryEntry(args.area_id);
    return jsonResponse(result);
  },

  // Device Registry Operations
  'ha_get_device_registry': async (client, args) => {
    const result = await client.getDeviceRegistryList(args);
    return jsonResponse(result);
  },

  'ha_get_device_registry_entry': async (client, args) => {
    const result = await client.getDeviceRegistryEntry(args.device_id, args.include_entities);
    return jsonResponse(result);
  },

  'ha_update_device_registry': async (client, args) => {
    const { device_id, ...updateData } = args;
    const result = await client.updateDeviceRegistry(device_id, updateData);
    return jsonResponse(result);
  },

  'ha_remove_device_registry_entry': async (client, args) => {
    const result = await client.removeDeviceRegistryEntry(args.device_id);
    return jsonResponse(result);
  },

  // Helper Operations
  'ha_list_helpers': async (client, args) => {
    const result = await client.listHelpers(args);
    return jsonResponse(result);
  },
  'ha_create_helper': async (client, args) => {
    const commitMessage = generateCommitMessage('create_helper', args);
    const result = await client.createHelper(args.type, args.config, commitMessage);
    return jsonResponse(result);
  },
  'ha_delete_helper': async (client, args) => {
    const commitMessage = generateCommitMessage('delete_helper', args);
    const result = await client.deleteHelper(args.entity_id, commitMessage);
    return jsonResponse(result);
  },

  // Automation Operations
  'ha_create_automation': async (client, args) => {
    const commitMessage = generateCommitMessage('create_automation', args);
    const result = await client.createAutomation(args.config, commitMessage);
    return jsonResponse(result);
  },

  'ha_list_automations': async (client, args) => {
    const result = await client.listAutomations(args);
    return jsonResponse(result);
  },

  'ha_get_automation': async (client, args) => {
    const result = await client.getAutomation(args.automation_id);
    return jsonResponse(result);
  },

  'ha_update_automation': async (client, args) => {
    const commitMessage = generateCommitMessage('update_automation', args);
    const result = await client.updateAutomation(args.automation_id, args.config, commitMessage);
    return jsonResponse(result);
  },

  'ha_delete_automation': async (client, args) => {
    const commitMessage = generateCommitMessage('delete_automation', args);
    const result = await client.deleteAutomation(args.automation_id, commitMessage);
    return jsonResponse(result);
  },

  // Script Operations
  'ha_create_script': async (client, args) => {
    const commitMessage = generateCommitMessage('create_script', args);
    const result = await client.createScript(args.config, commitMessage);
    return jsonResponse(result);
  },

  'ha_list_scripts': async (client, args) => {
    const result = await client.listScripts(args);
    return jsonResponse(result);
  },

  'ha_get_script': async (client, args) => {
    const result = await client.getScript(args.script_id);
    return jsonResponse(result);
  },

  'ha_update_script': async (client, args) => {
    const commitMessage = generateCommitMessage('update_script', args);
    const result = await client.updateScript(args.script_id, args.config, commitMessage);
    return jsonResponse(result);
  },

  'ha_delete_script': async (client, args) => {
    const commitMessage = generateCommitMessage('delete_script', args);
    await client.deleteScript(args.script_id, commitMessage);
    return successResponse(`Script deleted: ${args.script_id}`);
  },

  // Git/Backup Operations
  'ha_git_commit': async (client, args) => {
    // message is optional: if not provided and git_versioning_auto=false,
    // the API returns suggested_message that needs user confirmation
    const result = await client.gitCommit(args.message);
    
    // If needs_confirmation is true, return the suggestion for user to confirm/edit
    if (result.needs_confirmation) {
      return jsonResponse({
        needs_confirmation: true,
        suggested_message: result.suggested_message,
        summary: result.summary,
        files_modified: result.files_modified || [],
        files_added: result.files_added || [],
        files_deleted: result.files_deleted || [],
        diff: result.diff || '',
        message: 'Commit message suggestion - user needs to confirm or edit before committing'
      });
    }
    
    return jsonResponse(result);
  },

  'ha_git_pending': async (client, args) => {
    const result = await client.gitPending();
    return jsonResponse(result);
  },

  'ha_git_history': async (client, args) => {
    const result = await client.gitHistory(args.limit);
    return jsonResponse(result);
  },

  'ha_create_checkpoint': async (client, args) => {
    const result = await client.createCheckpoint(args.user_request);
    return jsonResponse(result);
  },

  'ha_end_checkpoint': async (client, args) => {
    const result = await client.endCheckpoint();
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

  'ha_get_repairs': async (client, args) => {
    const result = await client.getRepairs();
    return jsonResponse(result);
  },

  'ha_get_snapshot': async (client, args) => {
    const result = await client.getSnapshot(args);
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
    const result = await client.hacsListRepositories(args);
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
    const result = await client.listStoreAddons(args);
    return jsonResponse(result);
  },

  'ha_list_addons': async (client, args) => {
    const result = await client.listAvailableAddons(args);
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
  'ha_dashboard_enhancements_status': async (client, args) => {
    const result = await client.dashboardEnhancementsStatus();
    return jsonResponse(result);
  },

  'ha_install_dashboard_enhancements': async (client, args) => {
    const result = await client.installDashboardEnhancements();
    return jsonResponse(result);
  },

  'ha_list_dashboards': async (client, args) => {
    const result = await client.listDashboards();
    return jsonResponse(result);
  },

  'ha_list_bundled_skills': async (client, args) => {
    const result = await client.listBundledSkills();
    return jsonResponse(result);
  },

  'ha_get_bundled_skill': async (client, args) => {
    const result = await client.getBundledSkill(args.skill_name);
    return jsonResponse(result);
  },

  'ha_install_bundled_skill': async (client, args) => {
    const result = await client.installBundledSkill(args.skill_name, args.target_subdir);
    return jsonResponse(result);
  },

  'ha_read_dashboard': async (client, args) => {
    const result = await client.readDashboard(args.dashboard_id);
    return jsonResponse(result);
  },

  'ha_analyze_entities_for_dashboard': async (client, args) => {
    const result = await client.analyzeEntitiesForDashboard(args);
    return jsonResponse(result);
  },

  'ha_preview_dashboard': async (client, args) => {
    const result = await client.previewDashboard();
    return jsonResponse(result);
  },

  'ha_export_dashboard': async (client, args) => {
    const commitMessage = generateCommitMessage('export_dashboard', args);
    const result = await client.exportDashboard(args.dashboard_id, args.filename);
    return jsonResponse(result);
  },

  'ha_apply_dashboard_by_id': async (client, args) => {
    const commitMessage = generateCommitMessage('apply_dashboard_by_id', args);
    const result = await client.applyDashboardById(
      args.dashboard_id,
      args.dashboard_config,
      args.create_backup,
      commitMessage
    );
    return jsonResponse(result);
  },

  'ha_apply_dashboard': async (client, args) => {
    const commitMessage = generateCommitMessage('apply_dashboard', args);
    const result = await client.applyDashboard(
      args.dashboard_config,
      args.create_backup,
      args.filename,
      args.register_dashboard,
      commitMessage
    );
    return jsonResponse(result);
  },

  'ha_delete_dashboard': async (client, args) => {
    const commitMessage = generateCommitMessage('delete_dashboard', args);
    const result = await client.deleteDashboard(
      args.filename,
      args.remove_from_config,
      args.create_backup,
      commitMessage
    );
    return jsonResponse(result);
  },

  // Service Calls
  'ha_call_service': async (client, args) => {
    const serviceData = args.service_data ?? args.data;
    const result = await client.callService(
      args.domain,
      args.service,
      serviceData,
      args.target
    );
    return jsonResponse(result);
  },

  // History & Statistics
  'ha_get_history': async (client, args) => {
    const result = await client.getHistory(args.entity_id, args.start, args.end, args.minimal_response);
    return jsonResponse(result);
  },

  'ha_get_statistics': async (client, args) => {
    const result = await client.getStatistics(args.entity_id, args.period, args.start, args.end);
    return jsonResponse(result);
  },

  // Blueprints
  'ha_list_blueprints': async (client, args) => {
    const result = await client.listBlueprints(args.domain);
    return jsonResponse(result);
  },

  'ha_import_blueprint': async (client, args) => {
    const result = await client.importBlueprint(args.url);
    return jsonResponse(result);
  },

  // Calendar & Todo
  'ha_list_calendars': async (client, args) => {
    const result = await client.listCalendars();
    return jsonResponse(result);
  },

  'ha_get_calendar_events': async (client, args) => {
    const result = await client.getCalendarEvents(args.entity_id, args.start, args.end);
    return jsonResponse(result);
  },

  'ha_list_todos': async (client, args) => {
    const result = await client.listTodos(args.entity_id);
    return jsonResponse(result);
  },

  'ha_create_todo': async (client, args) => {
    const result = await client.createTodo(args.entity_id, args.item);
    return jsonResponse(result);
  },

  // Zones
  'ha_list_zones': async (client, args) => {
    const result = await client.listZones();
    return jsonResponse(result);
  },

  'ha_create_zone': async (client, args) => {
    const result = await client.createZone(args.name, args.latitude, args.longitude, args.radius, args.icon);
    return jsonResponse(result);
  },

  'ha_delete_zone': async (client, args) => {
    const result = await client.deleteZone(args.zone_id);
    return jsonResponse(result);
  },

  // Themes
  'ha_list_themes': async (client, args) => {
    const result = await client.listThemes();
    return jsonResponse(result);
  },

  'ha_get_theme': async (client, args) => {
    const result = await client.getTheme(args.theme_name);
    return jsonResponse(result);
  },

  'ha_create_theme': async (client, args) => {
    const commitMessage = generateCommitMessage('create_theme', args);
    const result = await client.createTheme(args.theme_name, args.theme_config, commitMessage);
    return jsonResponse(result);
  },

  'ha_update_theme': async (client, args) => {
    const commitMessage = generateCommitMessage('update_theme', args);
    const result = await client.updateTheme(args.theme_name, args.theme_config, commitMessage);
    return jsonResponse(result);
  },

  'ha_delete_theme': async (client, args) => {
    const commitMessage = generateCommitMessage('delete_theme', args);
    const result = await client.deleteTheme(args.theme_name, commitMessage);
    return jsonResponse(result);
  },

  'ha_reload_themes': async (client, args) => {
    const result = await client.reloadThemes();
    return jsonResponse(result);
  },

  'ha_check_theme_config': async (client, args) => {
    const result = await client.checkThemeConfig();
    return jsonResponse(result);
  },
};

