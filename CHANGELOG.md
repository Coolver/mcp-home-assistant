# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2025-11-08

### Added
- **[READ-ONLY] and [WRITE] labels** for all tools to help Cursor determine approval requirements
  - READ-ONLY tools: read, list, get, check, diff, logs - safe operations
  - WRITE tools: write, create, delete, rollback, reload - require approval

### Changed
- Updated all tool descriptions with safety labels
- Improved Cursor's ability to auto-approve safe operations

## [1.0.3] - 2025-11-08

### Added
- **ha_git_diff tool** - Show differences between commits or current uncommitted changes
  - View changes before committing
  - Compare between any two commits
  - See what was modified in each change

### Changed
- Updated tools documentation

## [1.0.1] - 2025-11-08

### Changed
- **Improved README and descriptions** - Focus on AI-driven system building, not just querying
- Updated examples to showcase complex automation creation
- Added real-world use case: Climate Control V3 installation
- Emphasized AI's ability to analyze and create tailored solutions
- Updated package description to reflect core value proposition

### Documentation
- Added `SETUP_AUTOMATION.md` - Step-by-step GitHub Actions setup
- Added `TOKEN_SETUP_VISUAL.md` - Visual guide for token configuration
- Better examples showing end-to-end system creation

## [1.0.0] - 2025-11-08

### Added
- Initial release of MCP Home Assistant
- Full integration with HA Cursor Agent
- File management (read, write, list, delete)
- Entity management (list, get state)
- Helpers management (list, create, delete)
- Automations management (list, create, delete)
- Scripts management (list, create, delete)
- System operations (check config, reload)
- Git versioning (commit, history, rollback)
- Agent logs access with filtering
- Comprehensive documentation
- TypeScript support with full type definitions

### Tools Implemented
- 18 MCP tools for complete Home Assistant control
- Natural language integration with Cursor AI
- Real-time agent log monitoring

### Documentation
- Complete README with quick start guide
- Usage examples for common scenarios
- Troubleshooting section
- Security best practices

[1.0.0]: https://github.com/Coolver/mcp-home-assistant/releases/tag/v1.0.0

