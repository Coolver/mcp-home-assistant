/**
 * File Operation Tools
 */

export const fileTools = [
  {
    name: 'ha_read_file',
    description: '[READ-ONLY] Read and display linter errors from the current workspace. You can provide paths to specific files or directories, or omit the argument to get diagnostics for all files.\n\n- If a file path is provided, returns diagnostics for that file only\n- If a directory path is provided, returns diagnostics for all files within that directory\n- If no path is provided, returns diagnostics for all files in the workspace\n- This tool can return linter errors that were already present before your edits, so avoid calling it with a very wide scope of files\n- NEVER call this tool on a file unless you\'ve edited it or are about to edit it',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the file relative to /config (e.g., "configuration.yaml", "automations.yaml", "scripts/my_script.yaml")',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'ha_write_file',
    description: '[WRITE] Write content to a file in Home Assistant. MODIFIES configuration - requires approval.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the file relative to /config',
        },
        content: {
          type: 'string',
          description: 'Content to write to the file',
        },
      },
      required: ['path', 'content'],
    },
  },
  {
    name: 'ha_list_files',
    description: '[READ-ONLY] List files and directories in Home Assistant. Safe operation - only reads data.',
    inputSchema: {
      type: 'object',
      properties: {
        directory: {
          type: 'string',
          description: 'Directory path relative to /config (default: "/")',
        },
      },
    },
  },
  {
    name: 'ha_delete_file',
    description: '[WRITE] Delete a file from Home Assistant. DESTRUCTIVE - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to the file to delete',
        },
      },
      required: ['path'],
    },
  },
];



























