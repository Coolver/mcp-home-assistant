#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { HAClient } from './ha-client.js';
import { tools } from './tools/index.js';
import { toolHandlers } from './handlers.js';

// Get configuration from environment
const HA_AGENT_URL = process.env.HA_AGENT_URL || 'http://homeassistant.local:8099';
const HA_AGENT_KEY = process.env.HA_AGENT_KEY;

if (!HA_AGENT_KEY) {
  console.error('❌ Error: HA_AGENT_KEY environment variable is required');
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
    name: 'home-assistant-mcp',
    version: '3.2.18',
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
    // Look up handler from registry
    const handler = toolHandlers[name];
    
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }
    
    // Execute handler
    return await handler(haClient, args);
  } catch (error: any) {
    let errorMessage: string;
    
    // Handle axios errors
    if (error.response?.data) {
      const data = error.response.data;
      if (typeof data.detail === 'string') {
        errorMessage = data.detail;
      } else if (typeof data.detail === 'object') {
        errorMessage = JSON.stringify(data.detail, null, 2);
      } else if (typeof data === 'string') {
        errorMessage = data;
      } else if (typeof data === 'object') {
        errorMessage = JSON.stringify(data, null, 2);
      } else {
        errorMessage = String(data);
      }
    } else if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === 'object') {
      errorMessage = JSON.stringify(error, null, 2);
    } else {
      errorMessage = String(error || 'Unknown error');
    }
    
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
    console.log(`✅ Connected to HA Vibecode Agent v${health.version}`);
    console.log(`📁 Config path: ${health.config_path}`);
    console.log(`🔄 Git versioning auto: ${health.git_versioning_auto}`);
  } catch (error: any) {
    console.error('❌ Failed to connect to HA Vibecode Agent');
    console.error(`URL: ${HA_AGENT_URL}`);
    console.error(`Error: ${error.message}`);
    console.error('\nPlease ensure:');
    console.error('1. HA Vibecode Agent add-on is running');
    console.error('2. HA_AGENT_URL is correct');
    console.error('3. HA_AGENT_KEY is valid');
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('🚀 MCP Home Assistant server running');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
