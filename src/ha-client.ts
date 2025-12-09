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
      timeout: 30000,
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

  async listFiles(directory: string = '/'): Promise<any[]> {
    const response = await this.client.get(`/api/files/list`, {
      params: { directory },
    });
    return response.data.files;
  }

  async deleteFile(path: string): Promise<void> {
    await this.client.delete(`/api/files/delete`, {
      params: { path },
    });
  }

  // Entities API
  async listEntities(domain?: string): Promise<any[]> {
    const response = await this.client.get(`/api/entities/list`, {
      params: domain ? { domain } : {},
    });
    return response.data.entities;
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

  // Entity Registry API
  async getEntityRegistryList(): Promise<any[]> {
    const response = await this.client.get(`/api/registries/entities/list`);
    return response.data.entities;
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

  // Area Registry API
  async getAreaRegistryList(): Promise<any[]> {
    const response = await this.client.get(`/api/registries/areas/list`);
    return response.data.areas;
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
  async getDeviceRegistryList(): Promise<any[]> {
    const response = await this.client.get(`/api/registries/devices/list`);
    return response.data.devices;
  }

  async getDeviceRegistryEntry(deviceId: string): Promise<any> {
    const response = await this.client.get(`/api/registries/devices/${deviceId}`);
    return response.data.device;
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

  async listHelpers(): Promise<any> {
    const response = await this.client.get(`/api/helpers/list`);
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

  async listAutomations(): Promise<any[]> {
    const response = await this.client.get(`/api/automations/list`);
    return response.data.automations;
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

  async listScripts(): Promise<any[]> {
    const response = await this.client.get(`/api/scripts/list`);
    return response.data.scripts;
  }

  async deleteScript(scriptId: string, commitMessage?: string): Promise<any> {
    const response = await this.client.delete(`/api/scripts/delete/${scriptId}`, {
      params: { commit_message: commitMessage },
    });
    return response.data;
  }

  // Git/Backup API
  async gitCommit(message: string): Promise<any> {
    const response = await this.client.post(`/api/backup/commit`, {
      message,
    });
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
    const response = await this.client.post(`/api/system/reload?component=${component}`);
    return response.data;
  }

  async getLogs(limit: number = 100, level?: string): Promise<any> {
    const response = await this.client.get(`/api/logs`, {
      params: { limit, level },
    });
    return response.data;
  }

  async getLogbookEntries(params: Record<string, any> = {}): Promise<any> {
    const response = await this.client.get(`/api/logbook`, {
      params,
    });
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

  async hacsListRepositories(): Promise<any> {
    const response = await this.client.get(`/api/hacs/repositories`);
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
  async listStoreAddons(): Promise<any> {
    const response = await this.client.get(`/api/addons/store`);
    return response.data;
  }

  async listAvailableAddons(): Promise<any> {
    const response = await this.client.get(`/api/addons/available`);
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
  async analyzeEntitiesForDashboard(): Promise<any> {
    const response = await this.client.get(`/api/lovelace/analyze`);
    return response.data;
  }

  async previewDashboard(): Promise<any> {
    const response = await this.client.get(`/api/lovelace/preview`);
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

