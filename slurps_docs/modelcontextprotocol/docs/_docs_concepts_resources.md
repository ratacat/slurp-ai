---
url: https://modelcontextprotocol.io/docs/concepts/resources
scrapeDate: 2025-04-02T20:05:23.137Z
library: docs

exactVersionMatch: false
---

Resources are a core primitive in the Model Context Protocol (MCP) that allow servers to expose data and content that can be read by clients and used as context for LLM interactions.

## Overview

Resources represent any kind of data that an MCP server wants to make available to clients. This can include:
*   File contents
*   Database records
*   API responses
*   Live system data
*   Screenshots and images
*   Log files
*   And more

Each resource is identified by a unique URI and can contain either text or binary data.

## Resource URIs

Resources are identified using URIs that follow this format:

For example:
*   `file:///home/user/documents/report.pdf`
*   `postgres://database/customers/schema`
*   `screen://localhost/display1`

The protocol and path structure is defined by the MCP server implementation. Servers can define their own custom URI schemes.

## Resource types

Resources can contain two types of content:

### Text resources

Text resources contain UTF-8 encoded text data. These are suitable for:
*   Source code
*   Configuration files
*   Log files
*   JSON/XML data
*   Plain text

### Binary resources

Binary resources contain raw binary data encoded in base64. These are suitable for:
*   Images
*   PDFs
*   Audio files
*   Video files
*   Other non-text formats

## Resource discovery

Clients can discover available resources through two main methods:

### Direct resources

Servers expose a list of concrete resources via the `resources/list` endpoint. Each resource includes:

### Resource templates

For dynamic resources, servers can expose [URI templates](https://datatracker.ietf.org/doc/html/rfc6570) that clients can use to construct valid resource URIs:

## Reading resources

To read a resource, clients make a `resources/read` request with the resource URI.

The server responds with a list of resource contents:

## Resource updates

MCP supports real-time updates for resources through two mechanisms:

### List changes

Servers can notify clients when their list of available resources changes via the `notifications/resources/list_changed` notification.

### Content changes

Clients can subscribe to updates for specific resources:

1.  Client sends `resources/subscribe` with resource URI
2.  Server sends `notifications/resources/updated` when the resource changes
3.  Client can fetch latest content with `resources/read`
4.  Client can unsubscribe with `resources/unsubscribe`

## Example implementation

Here’s a simple example of implementing resource support in an MCP server:

## Best practices

When implementing resource support:

1.  Use clear, descriptive resource names and URIs
2.  Include helpful descriptions to guide LLM understanding
3.  Set appropriate MIME types when known
4.  Implement resource templates for dynamic content
5.  Use subscriptions for frequently changing resources
6.  Handle errors gracefully with clear error messages
7.  Consider pagination for large resource lists
8.  Cache resource contents when appropriate
9.  Validate URIs before processing
10.  Document your custom URI schemes

## Security considerations

When exposing resources:
*   Validate all resource URIs
*   Implement appropriate access controls
*   Sanitize file paths to prevent directory traversal
*   Be cautious with binary data handling
*   Consider rate limiting for resource reads
*   Audit resource access
*   Encrypt sensitive data in transit
*   Validate MIME types
*   Implement timeouts for long-running reads
*   Handle resource cleanup appropriately