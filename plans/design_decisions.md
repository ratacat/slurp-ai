# SlurpAI Design Decisions

This document records significant design decisions made during the development of SlurpAI, including their rationale, benefits, and tradeoffs.

## Logging System - Use of console.error

**Date:** April 11, 2025  
**Decision Maker(s):** SlurpAI Development Team

### Decision

We have made a deliberate decision to route all log messages through stderr (`console.error`) rather than stdout (`console.log`). This applies to all logging levels including info, debug, and warning messages, not just error conditions.

### Justifications

1. **MCP Server Compatibility**
   - The Model Context Protocol (MCP) server has issues properly handling stdout output
   - Using stderr provides a more reliable communication channel with the MCP infrastructure

2. **Clear Separation of Concerns**
   - Application data output (documentation content, search results, etc.) is kept on stdout
   - Operational/status messages (progress indicators, warnings, etc.) are isolated to stderr
   - This separation makes it easier to pipe only the relevant data to other tools

3. **Error Highlighting in Terminals**
   - Most terminal environments apply distinctive formatting (often red text) to stderr output
   - This gives visual prominence to important operational messages
   - Helps debugging by making log messages stand out from normal command output

4. **Better Filtering Options**
   - Users can easily filter out all logging using standard shell techniques (e.g., `2>/dev/null`)
   - Allows for clean machine-readable output on stdout for scripting and automation

### Tradeoffs

1. **Divergence from CLI Conventions**
   - This approach breaks from standard CLI conventions where stdout is typically used for normal output
   - May be considered non-standard by CLI purists

2. **Test Modifications Required**
   - Required modifying existing tests that were originally written for `console.log`
   - Added some complexity to test fixtures and assertions

3. **Potential User Confusion**
   - Users expecting normal informational messages on stdout might be surprised
   - Could cause confusion for users not familiar with stderr/stdout separation

### Implementation Notes

This decision is implemented in the centralized logging utility (`src/utils/logger.js`), which routes all logging through `console.error` regardless of log level severity.