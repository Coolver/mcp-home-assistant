import axios, { AxiosInstance } from 'axios';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read version from package.json
let MCP_VERSION = 'unknown';
try {
  const packagePath = join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
  MCP_VERSION = packageJson.version;
} catch (error) {
  console.error('Warning: Could not read MCP version from package.json');
}

export interface HAClientConfig {
  baseURL: string;
  token: string;
}

export class HAClient {
  private client: AxiosInstance;

  constructor(config: HAClientConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json',
        'X-MCP-Client-Version': MCP_VERSION,
      },
      // Default timeout for all API calls (overridable per-request)
      // Increased to 90s to better support heavy operations like list_automations
      timeout: 90000,
    });
  }

  // Files API
  async readFile(path: string): Promise<string> {
    const response = await this.client.get(`/api/files/read`, {
      params: { path },
    });
    return response.data.content;
  }

  async writeFile(path: string, content: string, commitMessage?: string): Promise<void> {
    await this.client.post(`/api/files/write`, {
      path,
      content,
      commit_message: commitMessage,
    });
  }

  async listFiles(options?: {
    directory?: string;
    pattern?: string;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/files/list`, {
      params,
    });
    return response.data;
  }

  async deleteFile(path: string): Promise<void> {
    await this.client.delete(`/api/files/delete`, {
      params: { path },
    });
  }

  // Entities API
  async listEntities(options?: {
    domain?: string;
    search?: string;
    fuzzy?: boolean;
    fuzzy_threshold?: number;
    page?: number;
    page_size?: number;
    ids_only?: boolean;
    summary_only?: boolean;
    area_id?: string;
    area_name?: string;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/entities/list`, { params });
    return response.data;
  }

  async getEntityState(entityId: string): Promise<any> {
    const response = await this.client.get(`/api/entities/state/${entityId}`);
    return response.data;
  }

  async renameEntity(oldEntityId: string, newEntityId: string): Promise<any> {
    const response = await this.client.post(`/api/entities/rename`, {
      old_entity_id: oldEntityId,
      new_entity_id: newEntityId,
    });
    return response.data;
  }

  async listExposedEntities(assistant?: string): Promise<any> {
    const params = assistant ? { assistant } : {};
    const response = await this.client.get(`/api/entities/exposed`, { params });
    return response.data;
  }

  async exposeEntities(entityIds: string[], shouldExpose?: boolean, assistant?: string): Promise<any> {
    const response = await this.client.post(`/api/entities/expose`, {
      entity_ids: entityIds,
      should_expose: shouldExpose ?? true,
      assistant: assistant ?? 'conversation',
    });
    return response.data;
  }

  // Entity Registry API
  async getEntityRegistryList(options?: {
    search?: string;
    domain?: string;
    area_id?: string;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/registries/entities/list`, { params });
    return response.data;
  }

  async getEntityRegistryEntry(entityId: string): Promise<any> {
    const response = await this.client.get(`/api/registries/entities/${entityId}`);
    return response.data.entity;
  }

  async updateEntityRegistry(entityId: string, updateData: any): Promise<any> {
    const response = await this.client.post(`/api/registries/entities/update`, {
      entity_id: entityId,
      ...updateData,
    });
    return response.data;
  }

  async removeEntityRegistryEntry(entityId: string): Promise<any> {
    const response = await this.client.post(`/api/registries/entities/remove`, {
      entity_id: entityId,
    });
    return response.data;
  }

  async findDeadEntities(): Promise<any> {
    const response = await this.client.get(`/api/registries/entities/dead`);
    return response.data;
  }

  // Area Registry API
  async getAreaRegistryList(options?: {
    search?: string;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/registries/areas/list`, { params });
    return response.data;
  }

  async getAreaRegistryEntry(areaId: string): Promise<any> {
    const response = await this.client.get(`/api/registries/areas/${areaId}`);
    return response.data.area;
  }

  async createAreaRegistryEntry(name: string, aliases?: string[]): Promise<any> {
    const response = await this.client.post(`/api/registries/areas/create`, {
      name,
      aliases,
    });
    return response.data;
  }

  async updateAreaRegistryEntry(areaId: string, name?: string, aliases?: string[]): Promise<any> {
    const response = await this.client.post(`/api/registries/areas/update`, {
      area_id: areaId,
      name,
      aliases,
    });
    return response.data;
  }

  async deleteAreaRegistryEntry(areaId: string): Promise<any> {
    const response = await this.client.post(`/api/registries/areas/delete`, {
      area_id: areaId,
    });
    return response.data;
  }

  // Device Registry API
  async getDeviceRegistryList(options?: {
    search?: string;
    area_id?: string;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/registries/devices/list`, { params });
    return response.data;
  }

  async getDeviceRegistryEntry(deviceId: string, includeEntities?: boolean): Promise<any> {
    const response = await this.client.get(`/api/registries/devices/${deviceId}`, {
      params: includeEntities ? { include_entities: true } : {},
    });
    // Return full response (device + entities if requested)
    return response.data;
  }

  async updateDeviceRegistry(deviceId: string, updateData: any): Promise<any> {
    const response = await this.client.post(`/api/registries/devices/update`, {
      device_id: deviceId,
      ...updateData,
    });
    return response.data;
  }

  async removeDeviceRegistryEntry(deviceId: string): Promise<any> {
    const response = await this.client.post(`/api/registries/devices/remove`, {
      device_id: deviceId,
    });
    return response.data;
  }

  // Helpers API
  async createHelper(type: string, config: any, commitMessage?: string): Promise<any> {
    const response = await this.client.post(`/api/helpers/create`, {
      type,
      config,
      commit_message: commitMessage,
    });
    return response.data;
  }

  async listHelpers(options?: {
    domain?: string;
    search?: string;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/helpers/list`, { params });
    return response.data;
  }

  async deleteHelper(entityId: string, commitMessage?: string): Promise<any> {
    const response = await this.client.delete(`/api/helpers/delete/${entityId}`, {
      params: { commit_message: commitMessage },
    });
    return response.data;
  }

  // Automations API
  async createAutomation(config: any, commitMessage?: string): Promise<any> {
    const response = await this.client.post(`/api/automations/create`, {
      ...config,
      commit_message: commitMessage,
    });
    return response.data;
  }

  async listAutomations(options?: {
    ids_only?: boolean;
    search?: string;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/automations/list`, {
      params,
    });
    return response.data;
  }

  async getAutomation(automationId: string): Promise<any> {
    const response = await this.client.get(`/api/automations/get/${automationId}`);
    return response.data;
  }

  async updateAutomation(automationId: string, config: any, commitMessage?: string): Promise<any> {
    const response = await this.client.put(`/api/automations/update/${automationId}`, {
      ...config,
      commit_message: commitMessage,
    });
    return response.data;
  }

  async deleteAutomation(automationId: string, commitMessage?: string): Promise<any> {
    const response = await this.client.delete(`/api/automations/delete/${automationId}`, {
      params: { commit_message: commitMessage },
    });
    return response.data;
  }

  // Scripts API
  async createScript(config: any, commitMessage?: string): Promise<any> {
    const response = await this.client.post(`/api/scripts/create`, {
      ...config,
      commit_message: commitMessage,
    });
    return response.data;
  }

  async listScripts(options?: {
    ids_only?: boolean;
    search?: string;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/scripts/list`, {
      params,
    });
    return response.data;
  }

  async getScript(scriptId: string): Promise<any> {
    const response = await this.client.get(`/api/scripts/get/${scriptId}`);
    return response.data;
  }

  async updateScript(scriptId: string, config: any, commitMessage?: string): Promise<any> {
    const response = await this.client.put(`/api/scripts/update/${scriptId}`, {
      ...config,
      commit_message: commitMessage,
    });
    return response.data;
  }

  async deleteScript(scriptId: string, commitMessage?: string): Promise<any> {
    const response = await this.client.delete(`/api/scripts/delete/${scriptId}`, {
      params: { commit_message: commitMessage },
    });
    return response.data;
  }

  // Git/Backup API
  async gitCommit(message?: string): Promise<any> {
    const response = await this.client.post(`/api/backup/commit`, {
      message: message || null,
    });
    return response.data;
  }

  async gitPending(): Promise<any> {
    const response = await this.client.get(`/api/backup/pending`);
    return response.data;
  }

  async gitHistory(limit: number = 20): Promise<any[]> {
    const response = await this.client.get(`/api/backup/history`, {
      params: { limit },
    });
    return response.data.commits;
  }

  async gitRollback(commitHash: string): Promise<any> {
    const response = await this.client.post(`/api/backup/rollback/${commitHash}`);
    return response.data;
  }

  async gitDiff(commit1?: string, commit2?: string): Promise<any> {
    const response = await this.client.get(`/api/backup/diff`, {
      params: { commit1, commit2 },
    });
    return response.data;
  }

  // System API
  async checkConfig(): Promise<any> {
    const response = await this.client.post(`/api/system/check-config`);
    return response.data;
  }

  async reloadConfig(component: string = 'all'): Promise<any> {
    const response = await this.client.post(`/api/system/reload`, null, {
      params: { component },
    });
    return response.data;
  }

  async getLogs(limit: number = 100, level?: string): Promise<any> {
    const response = await this.client.get(`/api/logs`, {
      params: { limit, level },
    });
    return response.data;
  }

  async getRepairs(): Promise<any> {
    const response = await this.client.get(`/api/system/repairs`);
    return response.data;
  }

  async getSnapshot(options?: {
    include?: string;
    domains?: string;
    area_id?: string;
    summary_only?: boolean;
  }): Promise<any> {
    const params: any = {};
    if (options?.include) params.include = options.include;
    if (options?.domains) params.domains = options.domains;
    if (options?.area_id) params.area_id = options.area_id;
    if (options?.summary_only !== undefined) params.summary_only = options.summary_only;
    const response = await this.client.get(`/api/snapshot`, { params });
    return response.data;
  }

  async getLogbookEntries(params: Record<string, any> = {}): Promise<any> {
    const response = await this.client.get(`/api/logbook`, {
      params,
    });
    return response.data;
  }

  // History & Statistics
  async getHistory(entityId: string, start?: string, end?: string, minimalResponse?: boolean): Promise<any> {
    const params: any = { entity_id: entityId };
    if (start) params.start = start;
    if (end) params.end = end;
    if (minimalResponse !== undefined) params.minimal_response = minimalResponse;
    const response = await this.client.get(`/api/history/list`, { params });
    return response.data;
  }

  async getStatistics(entityId: string, period?: string, start?: string, end?: string): Promise<any> {
    const params: any = { entity_id: entityId };
    if (period) params.period = period;
    if (start) params.start = start;
    if (end) params.end = end;
    const response = await this.client.get(`/api/history/statistics`, { params });
    return response.data;
  }

  // Blueprints
  async listBlueprints(domain?: string): Promise<any> {
    const response = await this.client.get(`/api/blueprints/list`, { params: { domain: domain || 'automation' } });
    return response.data;
  }

  async importBlueprint(url: string): Promise<any> {
    const response = await this.client.post(`/api/blueprints/import`, { url });
    return response.data;
  }

  // Calendar & Todo
  async listCalendars(): Promise<any> {
    const response = await this.client.get(`/api/calendar/list`);
    return response.data;
  }

  async getCalendarEvents(entityId: string, start?: string, end?: string): Promise<any> {
    const params: any = { entity_id: entityId };
    if (start) params.start = start;
    if (end) params.end = end;
    const response = await this.client.get(`/api/calendar/events`, { params });
    return response.data;
  }

  async listTodos(entityId: string): Promise<any> {
    const response = await this.client.get(`/api/calendar/todos`, { params: { entity_id: entityId } });
    return response.data;
  }

  async createTodo(entityId: string, item: string): Promise<any> {
    const response = await this.client.post(`/api/calendar/todos/create`, { entity_id: entityId, item });
    return response.data;
  }

  // Zones
  async listZones(): Promise<any> {
    const response = await this.client.get(`/api/zones/list`);
    return response.data;
  }

  async createZone(name: string, latitude: number, longitude: number, radius?: number, icon?: string): Promise<any> {
    const data: any = { name, latitude, longitude };
    if (radius) data.radius = radius;
    if (icon) data.icon = icon;
    const response = await this.client.post(`/api/zones/create`, data);
    return response.data;
  }

  async deleteZone(zoneId: string): Promise<any> {
    const response = await this.client.delete(`/api/zones/delete`, { params: { zone_id: zoneId } });
    return response.data;
  }

  async healthCheck(): Promise<any> {
    const response = await this.client.get(`/api/health`);
    return response.data;
  }

  // HACS API
  async hacsInstall(): Promise<any> {
    const response = await this.client.post(`/api/hacs/install`);
    return response.data;
  }

  async hacsUninstall(): Promise<any> {
    const response = await this.client.post(`/api/hacs/uninstall`);
    return response.data;
  }

  async hacsStatus(): Promise<any> {
    const response = await this.client.get(`/api/hacs/status`);
    return response.data;
  }

  async hacsListRepositories(options?: {
    category?: string;
    search?: string;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/hacs/repositories`, { params });
    return response.data;
  }

  async hacsInstallRepository(repository: string, category: string = 'integration'): Promise<any> {
    const response = await this.client.post(`/api/hacs/install_repository`, { repository, category });
    return response.data;
  }

  async hacsSearch(query: string, category?: string): Promise<any> {
    const response = await this.client.get(`/api/hacs/search`, {
      params: { query, category },
    });
    return response.data;
  }

  async hacsUpdateAll(): Promise<any> {
    const response = await this.client.post(`/api/hacs/update_all`);
    return response.data;
  }

  async hacsGetRepositoryDetails(repositoryId: string): Promise<any> {
    const response = await this.client.get(`/api/hacs/repository/${repositoryId}`);
    return response.data;
  }

  // Add-ons API
  async listStoreAddons(options?: {
    search?: string;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/addons/store`, { params });
    return response.data;
  }

  async listAvailableAddons(options?: {
    search?: string;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/addons/available`, { params });
    return response.data;
  }

  async listInstalledAddons(): Promise<any> {
    const response = await this.client.get(`/api/addons/installed`);
    return response.data;
  }

  async getAddonInfo(slug: string): Promise<any> {
    const response = await this.client.get(`/api/addons/${slug}/info`);
    return response.data;
  }

  async getAddonLogs(slug: string, lines?: number): Promise<any> {
    const response = await this.client.get(`/api/addons/${slug}/logs`, {
      params: lines ? { lines } : {},
    });
    return response.data;
  }

  async installAddon(slug: string): Promise<any> {
    const response = await this.client.post(`/api/addons/${slug}/install`, {}, {
      timeout: 600000, // 10 minutes for installation
    });
    return response.data;
  }

  async uninstallAddon(slug: string): Promise<any> {
    const response = await this.client.post(`/api/addons/${slug}/uninstall`);
    return response.data;
  }

  async startAddon(slug: string): Promise<any> {
    const response = await this.client.post(`/api/addons/${slug}/start`);
    return response.data;
  }

  async stopAddon(slug: string): Promise<any> {
    const response = await this.client.post(`/api/addons/${slug}/stop`);
    return response.data;
  }

  async restartAddon(slug: string): Promise<any> {
    const response = await this.client.post(`/api/addons/${slug}/restart`);
    return response.data;
  }

  async updateAddon(slug: string): Promise<any> {
    const response = await this.client.post(`/api/addons/${slug}/update`, {}, {
      timeout: 600000, // 10 minutes for update
    });
    return response.data;
  }

  async getAddonOptions(slug: string): Promise<any> {
    const response = await this.client.get(`/api/addons/${slug}/options`);
    return response.data;
  }

  async setAddonOptions(slug: string, options: any): Promise<any> {
    const response = await this.client.post(`/api/addons/${slug}/options`, { options });
    return response.data;
  }

  async listRepositories(): Promise<any> {
    const response = await this.client.get(`/api/addons/repositories`);
    return response.data;
  }

  async addRepository(repositoryUrl: string): Promise<any> {
    const response = await this.client.post(`/api/addons/repositories/add`, { repository_url: repositoryUrl });
    return response.data;
  }

  // Lovelace Dashboard API
  async analyzeEntitiesForDashboard(options?: {
    domains?: string[];
    summary_only?: boolean;
    page?: number;
    page_size?: number;
    full_list?: boolean;
  }): Promise<any> {
    const params = options || {};
    const response = await this.client.get(`/api/lovelace/analyze`, { params });
    return response.data;
  }

  async previewDashboard(): Promise<any> {
    const response = await this.client.get(`/api/lovelace/preview`);
    return response.data;
  }

  async dashboardEnhancementsStatus(): Promise<any> {
    const response = await this.client.get(`/api/lovelace/dashboards/enhancements/status`);
    return response.data;
  }

  async installDashboardEnhancements(): Promise<any> {
    const response = await this.client.post(`/api/lovelace/dashboards/enhancements/install`);
    return response.data;
  }

  async listDashboards(): Promise<any> {
    const response = await this.client.get(`/api/lovelace/dashboards/list`);
    return response.data;
  }

  async listBundledSkills(): Promise<any> {
    const response = await this.client.get(`/api/skills/bundled`);
    return response.data;
  }

  async getBundledSkill(skillName: string): Promise<any> {
    const response = await this.client.get(`/api/skills/bundled/${encodeURIComponent(skillName)}`);
    return response.data;
  }

  async installBundledSkill(skillName: string, targetSubdir?: string): Promise<any> {
    const response = await this.client.post(
      `/api/skills/bundled/${encodeURIComponent(skillName)}/install`,
      null,
      { params: { target_subdir: targetSubdir } }
    );
    return response.data;
  }

  async readDashboard(dashboardId: string): Promise<any> {
    const response = await this.client.get(`/api/lovelace/dashboards/${encodeURIComponent(dashboardId)}`);
    return response.data;
  }

  async exportDashboard(dashboardId: string, filename?: string): Promise<any> {
    const response = await this.client.post(`/api/lovelace/dashboards/${encodeURIComponent(dashboardId)}/export`, {
      filename,
    });
    return response.data;
  }

  async applyDashboardById(
    dashboardId: string,
    dashboardConfig: any,
    createBackup: boolean = true,
    commitMessage?: string
  ): Promise<any> {
    const response = await this.client.post(`/api/lovelace/dashboards/${encodeURIComponent(dashboardId)}/apply`, {
      dashboard_config: dashboardConfig,
      create_backup: createBackup,
      commit_message: commitMessage,
    });
    return response.data;
  }

  async applyDashboard(dashboardConfig: any, createBackup: boolean = true, filename: string = 'ai-dashboard.yaml', registerDashboard: boolean = true, commitMessage?: string): Promise<any> {
    const response = await this.client.post(`/api/lovelace/apply`, {
      dashboard_config: dashboardConfig,
      create_backup: createBackup,
      filename: filename,
      register_dashboard: registerDashboard,
      commit_message: commitMessage,
    });
    return response.data;
  }

  async deleteDashboard(filename: string, removeFromConfig: boolean = true, createBackup: boolean = true, commitMessage?: string): Promise<any> {
    const response = await this.client.delete(`/api/lovelace/delete/${filename}`, {
      params: {
        remove_from_config: removeFromConfig,
        create_backup: createBackup,
        commit_message: commitMessage,
      }
    });
    return response.data;
  }

  // System API
  async restartHomeAssistant(): Promise<any> {
    const response = await this.client.post(`/api/system/restart`);
    return response.data;
  }

  // Checkpoint API
  async createCheckpoint(userRequest: string): Promise<any> {
    const response = await this.client.post(`/api/backup/checkpoint`, null, {
      params: { user_request: userRequest },
    });
    return response.data;
  }

  async endCheckpoint(): Promise<any> {
    const response = await this.client.post(`/api/backup/checkpoint/end`);
    return response.data;
  }

  // Service API
  async callService(domain: string, service: string, serviceData?: any, target?: any): Promise<any> {
    const response = await this.client.post(`/api/entities/call_service`, {
      domain,
      service,
      service_data: serviceData,
      target: target,
    });
    return response.data;
  }

  // Themes API
  async listThemes(): Promise<any[]> {
    const response = await this.client.get(`/api/themes/list`);
    return response.data.themes || [];
  }

  async getTheme(themeName: string): Promise<any> {
    const response = await this.client.get(`/api/themes/get`, {
      params: { theme_name: themeName },
    });
    return response.data;
  }

  async createTheme(themeName: string, themeConfig: any, commitMessage?: string): Promise<any> {
    const response = await this.client.post(`/api/themes/create`, {
      theme_name: themeName,
      theme_config: themeConfig,
      commit_message: commitMessage,
    });
    return response.data;
  }

  async updateTheme(themeName: string, themeConfig: any, commitMessage?: string): Promise<any> {
    const response = await this.client.put(`/api/themes/update`, {
      theme_name: themeName,
      theme_config: themeConfig,
      commit_message: commitMessage,
    });
    return response.data;
  }

  async deleteTheme(themeName: string, commitMessage?: string): Promise<any> {
    const response = await this.client.delete(`/api/themes/delete`, {
      params: { theme_name: themeName, commit_message: commitMessage },
    });
    return response.data;
  }

  async reloadThemes(): Promise<any> {
    const response = await this.client.post(`/api/themes/reload`);
    return response.data;
  }

  async checkThemeConfig(): Promise<any> {
    const response = await this.client.get(`/api/themes/check_config`);
    return response.data;
  }
}

