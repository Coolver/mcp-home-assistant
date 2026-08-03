/**
 * Bundled Cursor skills — optional delivery via agent
 */

export const skillsTools = [
  {
    name: 'ha_list_bundled_skills',
    description:
      '[READ-ONLY] List Cursor Agent Skills bundled with the HA addon (optional). Use to offer skill install to user — never required. Safe operation.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'ha_get_bundled_skill',
    description:
      '[READ-ONLY] Get bundled skill file contents (e.g. home-assistant-dashboards). Use to write into user .cursor/skills/ after they approve. Safe operation.',
    inputSchema: {
      type: 'object',
      properties: {
        skill_name: {
          type: 'string',
          description: 'Skill directory name from ha_list_bundled_skills',
        },
      },
      required: ['skill_name'],
    },
  },
  {
    name: 'ha_install_bundled_skill',
    description:
      '[WRITE] Copy bundled skill into /config/.cursor/skills/ (when config is IDE workspace). Optional — ask user first. MODIFIES files - requires approval!',
    inputSchema: {
      type: 'object',
      properties: {
        skill_name: { type: 'string', description: 'Skill name to install' },
        target_subdir: {
          type: 'string',
          description: 'Under /config (default: .cursor/skills)',
        },
      },
      required: ['skill_name'],
    },
  },
];
