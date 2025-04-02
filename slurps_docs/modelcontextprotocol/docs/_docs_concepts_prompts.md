---
url: https://modelcontextprotocol.io/docs/concepts/prompts
scrapeDate: 2025-04-02T20:05:23.193Z
library: docs

exactVersionMatch: false
---

Prompts enable servers to define reusable prompt templates and workflows that clients can easily surface to users and LLMs. They provide a powerful way to standardize and share common LLM interactions.

## Overview

Prompts in MCP are predefined templates that can:
*   Accept dynamic arguments
*   Include context from resources
*   Chain multiple interactions
*   Guide specific workflows
*   Surface as UI elements (like slash commands)

## Prompt structure

Each prompt is defined with:

## Discovering prompts

Clients can discover available prompts through the `prompts/list` endpoint:

## Using prompts

To use a prompt, clients make a `prompts/get` request:

## Dynamic prompts

Prompts can be dynamic and include:

### Embedded resource context

When handling the `prompts/get` request:

### Multi-step workflows

## Example implementation

Here’s a complete example of implementing prompts in an MCP server:

## Best practices

When implementing prompts:

1.  Use clear, descriptive prompt names
2.  Provide detailed descriptions for prompts and arguments
3.  Validate all required arguments
4.  Handle missing arguments gracefully
5.  Consider versioning for prompt templates
6.  Cache dynamic content when appropriate
7.  Implement error handling
8.  Document expected argument formats
9.  Consider prompt composability
10.  Test prompts with various inputs

## UI integration

Prompts can be surfaced in client UIs as:
*   Slash commands
*   Quick actions
*   Context menu items
*   Command palette entries
*   Guided workflows
*   Interactive forms

## Updates and changes

Servers can notify clients about prompt changes:

1.  Server capability: `prompts.listChanged`
2.  Notification: `notifications/prompts/list_changed`
3.  Client re-fetches prompt list

## Security considerations

When implementing prompts:
*   Validate all arguments
*   Sanitize user input
*   Consider rate limiting
*   Implement access controls
*   Audit prompt usage
*   Handle sensitive data appropriately
*   Validate generated content
*   Implement timeouts
*   Consider prompt injection risks
*   Document security requirements