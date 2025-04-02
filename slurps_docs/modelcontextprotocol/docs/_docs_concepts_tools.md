---
url: https://modelcontextprotocol.io/docs/concepts/tools
scrapeDate: 2025-04-02T20:05:23.440Z
library: docs

exactVersionMatch: false
---

Tools are a powerful primitive in the Model Context Protocol (MCP) that enable servers to expose executable functionality to clients. Through tools, LLMs can interact with external systems, perform computations, and take actions in the real world.

## Overview

Tools in MCP allow servers to expose executable functions that can be invoked by clients and used by LLMs to perform actions. Key aspects of tools include:
*   **Discovery**: Clients can list available tools through the `tools/list` endpoint
*   **Invocation**: Tools are called using the `tools/call` endpoint, where servers perform the requested operation and return results
*   **Flexibility**: Tools can range from simple calculations to complex API interactions

Like [resources](_docs_concepts_resources.md), tools are identified by unique names and can include descriptions to guide their usage. However, unlike resources, tools represent dynamic operations that can modify state or interact with external systems.

Each tool is defined with the following structure:

Here’s an example of implementing a basic tool in an MCP server:

Here are some examples of types of tools that a server could provide:

### System operations

Tools that interact with the local system:

### API integrations

Tools that wrap external APIs:

### Data processing

Tools that transform or analyze data:

## Best practices

When implementing tools:

1.  Provide clear, descriptive names and descriptions
2.  Use detailed JSON Schema definitions for parameters
3.  Include examples in tool descriptions to demonstrate how the model should use them
4.  Implement proper error handling and validation
5.  Use progress reporting for long operations
6.  Keep tool operations focused and atomic
7.  Document expected return value structures
8.  Implement proper timeouts
9.  Consider rate limiting for resource-intensive operations
10.  Log tool usage for debugging and monitoring

## Security considerations

When exposing tools:

### Input validation
*   Validate all parameters against the schema
*   Sanitize file paths and system commands
*   Validate URLs and external identifiers
*   Check parameter sizes and ranges
*   Prevent command injection

### Access control
*   Implement authentication where needed
*   Use appropriate authorization checks
*   Audit tool usage
*   Rate limit requests
*   Monitor for abuse

### Error handling
*   Don’t expose internal errors to clients
*   Log security-relevant errors
*   Handle timeouts appropriately
*   Clean up resources after errors
*   Validate return values

MCP supports dynamic tool discovery:

1.  Clients can list available tools at any time
2.  Servers can notify clients when tools change using `notifications/tools/list_changed`
3.  Tools can be added or removed during runtime
4.  Tool definitions can be updated (though this should be done carefully)

## Error handling

Tool errors should be reported within the result object, not as MCP protocol-level errors. This allows the LLM to see and potentially handle the error. When a tool encounters an error:

1.  Set `isError` to `true` in the result
2.  Include error details in the `content` array

Here’s an example of proper error handling for tools:

This approach allows the LLM to see that an error occurred and potentially take corrective action or request human intervention.

A comprehensive testing strategy for MCP tools should cover:
*   **Functional testing**: Verify tools execute correctly with valid inputs and handle invalid inputs appropriately
*   **Integration testing**: Test tool interaction with external systems using both real and mocked dependencies
*   **Security testing**: Validate authentication, authorization, input sanitization, and rate limiting
*   **Performance testing**: Check behavior under load, timeout handling, and resource cleanup
*   **Error handling**: Ensure tools properly report errors through the MCP protocol and clean up resources