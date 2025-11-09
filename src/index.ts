#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { HAClient } from './ha-client.js';
import { tools } from './tools.js';

// Get configuration from environment
const HA_AGENT_URL = process.env.HA_AGENT_URL || 'http://homeassistant.local:8099';
const HA_AGENT_KEY = process.env.HA_AGENT_KEY;

if (!HA_AGENT_KEY) {
  console.error('Error: HA_AGENT_KEY environment variable is required');
  console.error('Please set it in Cursor: Settings → Tools & MCP → Add Custom MCP Server');
  console.error('Or manually in ~/.cursor/mcp.json');
  process.exit(1);
}

// Initialize HA client
const haClient = new HAClient({
  baseURL: HA_AGENT_URL,
  token: HA_AGENT_KEY,
});

// Create MCP server
const server = new Server(
  {
    name: 'mcp-home-assistant',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tool list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Register tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args) {
    return {
      content: [{ type: 'text', text: 'Error: No arguments provided' }],
      isError: true,
    };
  }

  try {
    let result: any;

    switch (name) {
      // File Operations
      case 'ha_read_file':
        result = await haClient.readFile(args.path as string);
        return {
          content: [{ type: 'text', text: result }],
        };

      case 'ha_write_file':
        await haClient.writeFile(args.path as string, args.content as string);
        return {
          content: [{ type: 'text', text: `File written successfully: ${args.path}` }],
        };

      case 'ha_list_files':
        result = await haClient.listFiles(args.directory as string);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_delete_file':
        await haClient.deleteFile(args.path as string);
        return {
          content: [{ type: 'text', text: `File deleted successfully: ${args.path}` }],
        };

      // Entity Operations
      case 'ha_list_entities':
        result = await haClient.listEntities(args.domain as string);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_get_entity_state':
        result = await haClient.getEntityState(args.entity_id as string);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      // Helper Operations
      case 'ha_create_helper':
        result = await haClient.createHelper(args.type as string, args.config);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_list_helpers':
        result = await haClient.listHelpers();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      // Automation Operations
      case 'ha_create_automation':
        result = await haClient.createAutomation(args.config);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_list_automations':
        result = await haClient.listAutomations();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      // Script Operations
      case 'ha_create_script':
        result = await haClient.createScript(args.config);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_list_scripts':
        result = await haClient.listScripts();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      // Git/Backup Operations
      case 'ha_git_commit':
        result = await haClient.gitCommit(args.message as string);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_git_history':
        result = await haClient.gitHistory(args.limit as number);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_git_rollback':
        result = await haClient.gitRollback(args.commit_hash as string);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_git_diff':
        result = await haClient.gitDiff(args.commit1 as string, args.commit2 as string);
        return {
          content: [{ type: 'text', text: result.diff || 'No changes' }],
        };

      // System Operations
      case 'ha_check_config':
        result = await haClient.checkConfig();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_reload_config':
        result = await haClient.reloadConfig(args.component as string);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_get_logs':
        result = await haClient.getLogs(args.limit as number, args.level as string);
        // Format logs for better readability
        if (result.logs && Array.isArray(result.logs)) {
          const formattedLogs = result.logs.map((log: any) => 
            `[${log.timestamp}] ${log.level.padEnd(8)} ${log.message}`
          ).join('\n');
          return {
            content: [{ 
              type: 'text', 
              text: `Agent Logs (${result.count} entries):\n\n${formattedLogs}` 
            }],
          };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };

      case 'ha_install_hacs':
        result = await haClient.hacsInstall();
        break;

      case 'ha_hacs_status':
        result = await haClient.hacsStatus();
        break;

      case 'ha_hacs_list_repositories':
        result = await haClient.hacsListRepositories();
        break;

      case 'ha_hacs_install_repository':
        result = await haClient.hacsInstallRepository(
          args.repository as string,
          args.category as string
        );
        break;

      case 'ha_hacs_search':
        result = await haClient.hacsSearch(
          args.query as string,
          args.category as string
        );
        break;

      case 'ha_hacs_update_all':
        result = await haClient.hacsUpdateAll();
        break;

      case 'ha_hacs_repository_details':
        result = await haClient.hacsGetRepositoryDetails(
          args.repository_id as string
        );
        break;

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || error.message || 'Unknown error';
    return {
      content: [{ type: 'text', text: `Error: ${errorMessage}` }],
      isError: true,
    };
  }
});

// Start server
async function main() {
  // Test connection on startup
  try {
    const health = await haClient.healthCheck();
    console.error(`✅ Connected to HA Cursor Agent v${health.version}`);
    console.error(`📁 Config path: ${health.config_path}`);
    console.error(`🔄 Git enabled: ${health.git_enabled}`);
  } catch (error: any) {
    console.error('❌ Failed to connect to HA Cursor Agent');
    console.error(`URL: ${HA_AGENT_URL}`);
    console.error(`Error: ${error.message}`);
    console.error('\nPlease ensure:');
    console.error('1. HA Cursor Agent add-on is running');
    console.error('2. HA_AGENT_URL is correct');
    console.error('3. HA_AGENT_KEY is valid');
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🚀 MCP Home Assistant server running');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

