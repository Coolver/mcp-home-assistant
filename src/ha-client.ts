import axios, { AxiosInstance } from 'axios';

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

  async writeFile(path: string, content: string): Promise<void> {
    await this.client.post(`/api/files/write`, {
      path,
      content,
    });
  }

  async listFiles(directory: string = '/'): Promise<string[]> {
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

  // Helpers API
  async createHelper(type: string, config: any): Promise<any> {
    const response = await this.client.post(`/api/helpers/create`, {
      type,
      config,
    });
    return response.data;
  }

  async listHelpers(): Promise<any> {
    const response = await this.client.get(`/api/helpers/list`);
    return response.data;
  }

  async deleteHelper(entityId: string): Promise<void> {
    await this.client.delete(`/api/helpers/delete/${entityId}`);
  }

  // Automations API
  async createAutomation(config: any): Promise<any> {
    const response = await this.client.post(`/api/automations/create`, config);
    return response.data;
  }

  async listAutomations(): Promise<any[]> {
    const response = await this.client.get(`/api/automations/list`);
    return response.data.automations;
  }

  async deleteAutomation(automationId: string): Promise<void> {
    await this.client.delete(`/api/automations/delete/${automationId}`);
  }

  // Scripts API
  async createScript(config: any): Promise<any> {
    const response = await this.client.post(`/api/scripts/create`, config);
    return response.data;
  }

  async listScripts(): Promise<any[]> {
    const response = await this.client.get(`/api/scripts/list`);
    return response.data.scripts;
  }

  async deleteScript(scriptId: string): Promise<void> {
    await this.client.delete(`/api/scripts/delete/${scriptId}`);
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

  async healthCheck(): Promise<any> {
    const response = await this.client.get(`/`);
    return response.data;
  }

  // HACS API
  async hacsInstall(): Promise<any> {
    const response = await this.client.post(`/api/hacs/install`);
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
}

