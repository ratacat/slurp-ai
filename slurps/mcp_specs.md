# Compiled Documentation

Generated on 2025-04-15T06:15:03.347Z

### installation

#### _docs_Authentication_overview.md

> Source: https://mcp-framework.com/docs/Authentication/overview
> Scraped: 4/15/2025, 12:15:00 AM

The MCP Framework provides built-in authentication support through various authentication providers. This allows you to secure your MCP server endpoints and ensure only authorized clients can access your tools and resources.

## Available Authentication Providers[​](_docs_Authentication_overview.md#available-authentication-providers)

### API Key Authentication[​](_docs_Authentication_overview.md#api-key-authentication)

The API Key authentication provider allows you to secure your endpoints using API keys. This is useful for simple authentication scenarios where you want to control access using predefined keys.
```
import { APIKeyAuthProvider } from "@modelcontextprotocol/mcp-framework";  
  
const authProvider = new APIKeyAuthProvider({  
  keys: ["your-api-key-1", "your-api-key-2"],  headerName: "X-API-Key" // Optional, defaults to "X-API-Key"});  
```
Clients must include the API key in the specified header:
```
X-API-Key: your-api-key-1  
```
### JWT Authentication[​](_docs_Authentication_overview.md#jwt-authentication)

The JWT authentication provider enables token-based authentication using JSON Web Tokens. This is suitable for more complex authentication scenarios where you need to include user information or other claims in the token.
```
import { JWTAuthProvider } from "@modelcontextprotocol/mcp-framework";  
  
const authProvider = new JWTAuthProvider({  
  secret: "your-jwt-secret",  algorithms: ["HS256"], // Optional, defaults to ["HS256"]  headerName: "Authorization", // Optional, defaults to "Authorization"  requireBearer: true // Optional, defaults to true});  
```
Clients must include the JWT token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...  
```
## Configuring Authentication[​](_docs_Authentication_overview.md#configuring-authentication)

You can configure authentication when setting up your SSE transport:
```
import { MCPServer, APIKeyAuthProvider } from "@modelcontextprotocol/mcp-framework";  
  
const server = new MCPServer({  
  transport: {    type: "sse",    options: {      auth: {        provider: new APIKeyAuthProvider({          keys: ["your-api-key"]        }),        endpoints: {          sse: true,    // Require auth for SSE connections          messages: true // Require auth for messages        }      }    }  }});  
```
### Endpoint Configuration[​](_docs_Authentication_overview.md#endpoint-configuration)

The `endpoints` configuration allows you to specify which endpoints require authentication:

*   `sse`: Controls authentication for the SSE connection endpoint
    *   Default: `false`
*   `messages`: Controls authentication for the message endpoint
    *   Default: `true`

## Error Handling[​](_docs_Authentication_overview.md#error-handling)

Authentication providers include built-in error handling that returns appropriate HTTP status codes and error messages:
```
// Example error response for invalid API key  
{  
  "error": "Invalid API key",  "status": 401,  "type": "authentication_error"}  
  
// Example error response for invalid JWT  
{  
  "error": "Invalid or expired JWT token",  "status": 401,  "type": "authentication_error"}  
```
## Best Practices[​](_docs_Authentication_overview.md#best-practices)

1.  **API Key Security**:
    
    *   Use long, random strings for API keys
    *   Rotate keys periodically
    *   Store keys securely
    *   Use HTTPS in production
2.  **JWT Security**:
    
    *   Use a strong secret key
    *   Set appropriate token expiration
    *   Include only necessary claims
    *   Use secure algorithms (HS256, RS256, etc.)
3.  **General Security**:
    
    *   Enable authentication for both SSE and message endpoints in production
    *   Use environment variables for secrets
    *   Implement rate limiting
    *   Monitor failed authentication attempts

#### _docs_Examples_fiscal-data.md

> Source: https://mcp-framework.com/docs/Examples/fiscal-data
> Scraped: 4/15/2025, 12:15:00 AM

Live Example

See MCP Framework in action with this US Treasury data server that provides real-time access to treasury statements and operating cash balances!

## Overview[​](_docs_Examples_fiscal-data.md#overview)

The [Fiscal Data MCP Server](https://github.com/QuantGeekDev/fiscal-data-mcp) demonstrates a practical implementation of an MCP server that connects to the US Treasury's Fiscal Data API. It showcases:

*   Tools for fetching specific treasury statements
*   Resources for historical data access
*   Prompts for generating formatted reports
*   Smart caching for API efficiency

## Features[​](_docs_Examples_fiscal-data.md#features)

### 1\. Daily Treasury Statements[​](_docs_Examples_fiscal-data.md#1-daily-treasury-statements)

Fetch treasury data for specific dates using the `get_daily_treasury_statement` tool:

Example usage:
```
User: Get the treasury statement for 2024-03-01  
```
### 2\. Historical Data Resource[​](_docs_Examples_fiscal-data.md#2-historical-data-resource)

Access 30 days of historical treasury data through the resource system:

*   Automatically cached for 1 hour
*   Updates on demand
*   Provides formatted JSON data

### 3\. Report Generation[​](_docs_Examples_fiscal-data.md#3-report-generation)

Generate formatted treasury reports using the `daily_treasury_report` prompt:
```
User: Generate a treasury report for 2024-03-01  
```
## Quick Start[​](_docs_Examples_fiscal-data.md#quick-start)

### 1\. Install and Use with Claude Desktop[​](_docs_Examples_fiscal-data.md#1-install-and-use-with-claude-desktop)

Add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json` **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`
```
{  
  "mcpServers": {    "fiscal-data": {      "command": "npx",      "args": ["fiscal-data-mcp"]    }  }}  
```
### 2\. Example Interactions[​](_docs_Examples_fiscal-data.md#2-example-interactions)

Once configured, you can interact with the server through Claude:
```
User: Can you get the treasury statement for the 20th of September 2023?  
```

#### _docs_Prompts_prompts-overview.md

> Source: https://mcp-framework.com/docs/Prompts/prompts-overview
> Scraped: 4/15/2025, 12:14:58 AM

## Working with Prompts

Power of Prompts

Prompts let you create reusable templates for AI interactions, making your MCP server more consistent and powerful!

## What are Prompts?[​](_docs_Prompts_prompts-overview.md#what-are-prompts)

Prompts are reusable templates that:

*   Define conversation flows
*   Provide structured context
*   Use dynamic data
*   Ensure consistent AI responses

Here's a simple example:
```
import { MCPPrompt } from "mcp-framework";  
import { z } from "zod";  
  
interface GreetingPromptInput {  
  userName: string;  timeOfDay: string;}  
  
class GreetingPrompt extends MCPPrompt<GreetingPromptInput> {  
  name = "greeting";  description = "Generates a personalized greeting";  
  schema = {    userName: {      type: z.string(),      description: "User's name",      required: true,    },    timeOfDay: {      type: z.enum(["morning", "afternoon", "evening"]),      description: "Time of day",      required: true,    },  };  
  async generateMessages({ userName, timeOfDay }) {    return [      {        role: "user",        content: {          type: "text",          text: `Good ${timeOfDay} ${userName}! How can I assist you today?`,        },      },    ];  }}  
```
## Creating Prompts[​](_docs_Prompts_prompts-overview.md#creating-prompts)

### Using the CLI[​](_docs_Prompts_prompts-overview.md#using-the-cli)

This creates a new prompt in `src/prompts/MyPrompt.ts`.

### Prompt Structure[​](_docs_Prompts_prompts-overview.md#prompt-structure)

Every prompt has:

1.  **Metadata**
```
name = "data-analysis";  
description = "Analyzes data with specific parameters";  
```
1.  **Input Schema**
```
schema = {  
  dataset: {    type: z.string(),    description: "Dataset to analyze",    required: true,  },  metrics: {    type: z.array(z.string()),    description: "Metrics to calculate",    required: true,  },};  
```
1.  **Message Generation**
```
async generateMessages(input) {  
  return [{    role: "user",    content: {      type: "text",      text: `Analyze ${input.dataset} for ${input.metrics.join(", ")}`    }  }];}  
```
## Advanced Features[​](_docs_Prompts_prompts-overview.md#advanced-features)

### Using Resources in Prompts[​](_docs_Prompts_prompts-overview.md#using-resources-in-prompts)
```
class DataAnalysisPrompt extends MCPPrompt {  
  async generateMessages({ datasetId }) {    const dataResource = new DatasetResource(datasetId);    const [data] = await dataResource.read();  
    return [      {        role: "user",        content: {          type: "text",          text: "Please analyze this dataset:",          resource: {            uri: data.uri,            text: data.text,            mimeType: data.mimeType,          },        },      },    ];  }}  
```
### Multi-step Prompts[​](_docs_Prompts_prompts-overview.md#multi-step-prompts)
```
class ReportPrompt extends MCPPrompt {  
  async generateMessages({ reportType }) {    return [      {        role: "system",        content: {          type: "text",          text: "You are a professional report writer.",        },      },      {        role: "user",        content: {          type: "text",          text: `Create a ${reportType} report using the following data:`,        },      },    ];  }}  
```
## Best Practices[​](_docs_Prompts_prompts-overview.md#best-practices)

Pro Tips

Follow these practices for better prompt design!

1.  **Clear Naming**
```
name = "financial-analysis"; // Good  
name = "fa"; // Bad  
```
1.  **Detailed Descriptions**
```
description =  
  "Analyzes financial data and provides insights with specific metrics";
```
1.  **Input Validation**
```
schema = {  
  email: {    type: z.string().email(),    description: "Valid email address",    required: true,  },};  
```
1.  **Structured Messages**
```
async generateMessages(input) {  
  return [    {      role: "system",      content: {        type: "text",        text: "Context setting message"      }    },    {      role: "user",      content: {        type: "text",        text: "Main instruction"      }    }  ];}  
```
## Examples[​](_docs_Prompts_prompts-overview.md#examples)

### Report Generator[​](_docs_Prompts_prompts-overview.md#report-generator)
```
class ReportGeneratorPrompt extends MCPPrompt {  
  name = "report-generator";  description = "Generates formatted reports from data";  
  schema = {    data: {      type: z.object({        title: z.string(),        sections: z.array(z.string()),      }),      description: "Report data structure",    },    format: {      type: z.enum(["short", "detailed"]),      description: "Report format",    },  };  
  async generateMessages({ data, format }) {    return [      {        role: "user",        content: {          type: "text",          text: `Generate a ${format} report titled "${            data.title          }" with the following sections: ${data.sections.join(", ")}`,        },      },    ];  }}  
```
## Next Steps[​](_docs_Prompts_prompts-overview.md#next-steps)

*   Learn about [Tools](_docs_Tools_tools-overview.md)
*   Learn about [Resources](_docs_Resources_resources-overview.md)
* [Get Started](_docs_quickstart.md)

#### _docs_Resources_resources-overview.md

> Source: https://mcp-framework.com/docs/Resources/resources-overview
> Scraped: 4/15/2025, 12:14:59 AM

What are Resources?

Resources are data sources that AI models can read or subscribe to. Think of them as a way to provide context, data, or state to your AI interactions!

## Understanding Resources[​](_docs_Resources_resources-overview.md#understanding-resources)

Resources can be:

*   Files
*   API endpoints
*   Database queries
*   Real-time data streams
*   Configuration data

Here's a simple example:
```
import { MCPResource } from "mcp-framework";  
  
class ConfigResource extends MCPResource {  
  uri = "resource://config";  name = "Configuration";  description = "System configuration settings";  mimeType = "application/json";  
  async read() {    return [      {        uri: this.uri,        mimeType: this.mimeType,        text: JSON.stringify({          version: "1.0.0",          environment: "production",          features: ["analytics", "reporting"],        }),      },    ];  }}  
```
## Creating Resources[​](_docs_Resources_resources-overview.md#creating-resources)

### Using the CLI[​](_docs_Resources_resources-overview.md#using-the-cli)
```
mcp add resource my-resource  
```
This creates a new resource in `src/resources/MyResource.ts`.

### Resource Structure[​](_docs_Resources_resources-overview.md#resource-structure)

Every resource has:

1.  **Metadata**
```
uri = "resource://my-data";  
name = "My Data Resource";  
description = "Provides access to my data";  
mimeType = "application/json";  
```
1.  **Read Method**
```
async read(): Promise<ResourceContent[]> {  
  // Fetch or generate your data  return [{    uri: this.uri,    mimeType: this.mimeType,    text: JSON.stringify(data)  }];}  
```
## Resource Types[​](_docs_Resources_resources-overview.md#resource-types)

### Static Resources[​](_docs_Resources_resources-overview.md#static-resources)
```
class DocumentationResource extends MCPResource {  
  uri = "resource://docs";  name = "Documentation";  mimeType = "text/markdown";  
  async read() {    return [      {        uri: this.uri,        mimeType: this.mimeType,        text: "# API Documentation\n\nWelcome to our API...",      },    ];  }}  
```
### Dynamic Resources[​](_docs_Resources_resources-overview.md#dynamic-resources)
```
class MarketDataResource extends MCPResource {  
  uri = "resource://market-data";  name = "Market Data";  mimeType = "application/json";  
  async read() {    const data = await this.fetch("https://api.market.com/latest");    return [      {        uri: this.uri,        mimeType: this.mimeType,        text: JSON.stringify(data),      },    ];  }}  
```
### Real-time Resources[​](_docs_Resources_resources-overview.md#real-time-resources)

Real-time Updates

Use subscription methods to handle real-time data streams!
```
class StockTickerResource extends MCPResource {  
  uri = "resource://stock-ticker";  name = "Stock Ticker";  mimeType = "application/json";  private ws: WebSocket | null = null;  
  async subscribe() {    this.ws = new WebSocket("wss://stocks.example.com");    this.ws.on("message", this.handleUpdate);  }  
  async unsubscribe() {    if (this.ws) {      this.ws.close();      this.ws = null;    }  }  
  async read() {    const latestData = await this.getLatestStockData();    return [      {        uri: this.uri,        mimeType: this.mimeType,        text: JSON.stringify(latestData),      },    ];  }}  
```
## Best Practices[​](_docs_Resources_resources-overview.md#best-practices)

1.  **URI Naming**
```
uri = "resource://domain/type/identifier";  
// Example: "resource://finance/stocks/AAPL"  
```
1.  **Error Handling**
```
async read() {  
  try {    const data = await this.fetchData();    return [{      uri: this.uri,      mimeType: this.mimeType,      text: JSON.stringify(data)    }];  } catch (error) {    throw new Error(`Failed to read resource: ${error.message}`);  }}  
```
1.  **Caching**
```
class CachedResource extends MCPResource {  
  private cache: any = null;  private lastFetch: number = 0;  private TTL = 60000; // 1 minute  
  async read() {    if (this.cache && Date.now() - this.lastFetch < this.TTL) {      return this.cache;    }  
    const data = await this.fetchFreshData();    this.cache = data;    this.lastFetch = Date.now();    return data;  }}  
```
## Advanced Usage[​](_docs_Resources_resources-overview.md#advanced-usage)

### Combining with Tools[​](_docs_Resources_resources-overview.md#combining-with-tools)
```
class DataResource extends MCPResource {  
  uri = "resource://data";  name = "Data Store";  
  async read() {    return [      {        uri: this.uri,        mimeType: "application/json",        text: JSON.stringify(await this.getData()),      },    ];  }}  
  
class DataProcessor extends MCPTool {  
  async execute(input) {    const resource = new DataResource();    const [data] = await resource.read();    return this.processData(JSON.parse(data.text));  }}  
```
## Next Steps[​](_docs_Resources_resources-overview.md#next-steps)

*   Learn about [Tools](_docs_Tools_tools-overview.md)
*   Learn about [Prompts](_docs_Prompts_prompts-overview.md)
* [Get Started](_docs_quickstart.md)

#### _docs_Tools_api-integration.md

> Source: https://mcp-framework.com/docs/Tools/api-integration
> Scraped: 4/15/2025, 12:15:01 AM

```
class AuthenticatedTool extends MCPTool {  
  private getAuthHeader() {    return `Bearer ${process.env.API_TOKEN}`;  }  
  async execute(input) {    const response = await this.fetch("https://api.service.com/data", {      headers: {        Authorization: this.getAuthHeader(),        "Content-Type": "application/json",      },    });    return response;  }}  
```
```
class ApiKeyTool extends MCPTool {  
  private apiKey = process.env.API_KEY;  
  async execute(input) {    const url = new URL("https://api.service.com/data");    url.searchParams.append("api_key", this.apiKey);  
    return this.fetch(url.toString());  }}  
```
```
class RobustApiTool extends MCPTool {  
  async execute(input) {    try {      const response = await this.fetch("https://api.example.com/data");  
      if (!response.ok) {        throw new Error(`API Error: ${response.status}`);      }  
      return response.json();    } catch (error) {      if (error.name === "AbortError") {        throw new Error("Request timed out");      }      if (error.name === "TypeError") {        throw new Error("Network error");      }      throw error;    }  }}  
```
```
import { MCPTool } from "mcp-framework";  
import { z } from "zod";  
  
interface GitHubInput {  
  username: string;  repo: string;}  
  
class GitHubStarsTool extends MCPTool<GitHubInput> {  
  name = "github-stars";  description = "Get star count for a GitHub repository";  
  schema = {    username: {      type: z.string(),      description: "GitHub username",    },    repo: {      type: z.string(),      description: "Repository name",    },  };  
  private headers = {    Authorization: `token ${process.env.GITHUB_TOKEN}`,    Accept: "application/vnd.github.v3+json",  };  
  async execute({ username, repo }) {    try {      const response = await this.fetch(        `https://api.github.com/repos/${username}/${repo}`,        { headers: this.headers }      );  
      if (!response.ok) {        throw new Error(`GitHub API Error: ${response.status}`);      }  
      const data = await response.json();  
      return {        stars: data.stargazers_count,        url: data.html_url,        description: data.description,      };    } catch (error) {      throw new Error(`Failed to fetch repo data: ${error.message}`);    }  }}  
  
export default GitHubStarsTool;  
```

#### _docs_Tools_tools-overview.md

> Source: https://mcp-framework.com/docs/Tools/tools-overview
> Scraped: 4/15/2025, 12:14:59 AM

Power of Tools

Tools are the powerhouse of your MCP server - they let AI models interact with external services, process data, and perform complex operations with type safety!
```
import { MCPTool } from "mcp-framework";  
import { z } from "zod";  
  
interface GreetingInput {  
  name: string;  language: string;}  
  
class GreetingTool extends MCPTool<GreetingInput> {  
  name = "greeting";  description = "Generate a greeting in different languages";  
  schema = {    name: {      type: z.string(),      description: "Name to greet",    },    language: {      type: z.enum(["en", "es", "fr"]),      description: "Language code (en, es, fr)",    },  };  
  async execute({ name, language }) {    const greetings = {      en: `Hello ${name}!`,      es: `¡Hola ${name}!`,      fr: `Bonjour ${name}!`,    };    return greetings[language];  }}  
```
This generates a tool template in `src/tools/MyTool.ts`.
```
schema = {  
  email: {    type: z.string().email(),    description: "User's email address",  },  count: {    type: z.number().min(1),    description: "Number of items to process",  },};  
```
```
interface DataInput {  
  userId: number;  fields: string[];}  
  
class DataTool extends MCPTool<DataInput> {  
  schema = {    userId: {      type: z.number(),      description: "User ID to fetch data for",    },    fields: {      type: z.array(z.string()),      description: "Fields to include in response",    },  };}  
```

#### _docs_Transports_http-stream-transport.md

> Source: https://mcp-framework.com/docs/Transports/http-stream-transport
> Scraped: 4/15/2025, 12:15:01 AM

The HTTP Stream Transport is the recommended transport mechanism for web-based MCP applications, implementing the Streamable HTTP transport protocol from the MCP specification version 2025-03-26.

## Overview[​](_docs_Transports_http-stream-transport.md#overview)

The HTTP Stream Transport provides a modern, flexible transport layer that supports both batch responses and streaming via Server-Sent Events (SSE). It offers advanced features like session management, resumable streams, and comprehensive authentication options.

## Key Features[​](_docs_Transports_http-stream-transport.md#key-features)

*   **Single Endpoint**: Uses a single HTTP endpoint for all MCP communication
*   **Multiple Response Modes**: Support for both batch (JSON) and streaming (SSE) responses
*   **Session Management**: Built-in session tracking and management
*   **Resumability**: Support for resuming broken SSE connections
*   **Authentication**: Comprehensive authentication support
*   **CORS**: Flexible CORS configuration for web applications

## Configuration[​](_docs_Transports_http-stream-transport.md#configuration)

The HTTP Stream Transport supports extensive configuration options:
```
import { MCPServer } from "mcp-framework";  
  
const server = new MCPServer({  
  transport: {    type: "http-stream",    options: {      port: 8080,                // Port to listen on (default: 8080)      endpoint: "/mcp",          // HTTP endpoint path (default: "/mcp")      responseMode: "batch",     // Response mode: "batch" or "stream" (default: "batch")      maxMessageSize: "4mb",     // Maximum message size (default: "4mb")      batchTimeout: 30000,       // Timeout for batch responses in ms (default: 30000)      headers: {                 // Custom headers for responses        "X-Custom-Header": "value"      },      cors: {                    // CORS configuration        allowOrigin: "*",        allowMethods: "GET, POST, DELETE, OPTIONS",        allowHeaders: "Content-Type, Accept, Authorization, x-api-key, Mcp-Session-Id, Last-Event-ID",        exposeHeaders: "Content-Type, Authorization, x-api-key, Mcp-Session-Id",        maxAge: "86400"      },      auth: {                    // Authentication configuration        provider: authProvider      },      session: {                 // Session configuration        enabled: true,           // Enable session management (default: true)        headerName: "Mcp-Session-Id", // Session header name (default: "Mcp-Session-Id")        allowClientTermination: true  // Allow clients to terminate sessions (default: true)      },      resumability: {            // Stream resumability configuration        enabled: false,          // Enable stream resumability (default: false)        historyDuration: 300000  // How long to keep message history in ms (default: 300000 - 5 minutes)      }    }  }});  
  
await server.start();  
```
### Quick Start Configuration[​](_docs_Transports_http-stream-transport.md#quick-start-configuration)

For a simple setup with recommended defaults, you can use:
```
import { MCPServer } from "mcp-framework";  
  
const server = new MCPServer({  
  transport: {    type: "http-stream",    options: {      port: 8080,      cors: {        allowOrigin: "*"      }    }  }});  
  
await server.start();  
```
### Using CLI to Create a Project with HTTP Transport[​](_docs_Transports_http-stream-transport.md#using-cli-to-create-a-project-with-http-transport)

You can use the MCP Framework CLI to create a new project with HTTP transport enabled:
```
mcp create my-mcp-server --http --port 1337 --cors  
```
This will create a new project with HTTP transport configured on port 1337 with CORS enabled.

## Configuration Options[​](_docs_Transports_http-stream-transport.md#configuration-options)

### Port and Endpoint[​](_docs_Transports_http-stream-transport.md#port-and-endpoint)

*   `port`: The HTTP port to listen on (default: 8080)
*   `endpoint`: The endpoint path for all MCP communication (default: "/mcp")

### Response Mode[​](_docs_Transports_http-stream-transport.md#response-mode)

The `responseMode` option controls how the server responds to client requests:

*   `batch`: Collects all responses for a request batch and sends them as a single JSON response (default)
*   `stream`: Opens an SSE stream for each request, allowing streaming responses
```
transport: {  
  type: "http-stream",  options: {    responseMode: "batch" // or "stream"  }}  
```
Batch mode is more efficient for simple operations, while stream mode is better for long-running operations that may benefit from progressive responses.

### Batch Timeout[​](_docs_Transports_http-stream-transport.md#batch-timeout)

When using `batch` mode, the `batchTimeout` option controls how long the server will wait for all responses to be collected before sending the batch:
```
batchTimeout: 30000 // 30 seconds (default)  
```
### Message Size Limit[​](_docs_Transports_http-stream-transport.md#message-size-limit)

The `maxMessageSize` option controls the maximum allowed size for incoming messages:
```
maxMessageSize: "4mb" // default  
```
### CORS Configuration[​](_docs_Transports_http-stream-transport.md#cors-configuration)

The HTTP Stream Transport provides comprehensive CORS support:
```
cors: {  
  allowOrigin: "*",                // Access-Control-Allow-Origin  allowMethods: "GET, POST, DELETE, OPTIONS", // Access-Control-Allow-Methods  allowHeaders: "Content-Type, Accept, Authorization, x-api-key, Mcp-Session-Id, Last-Event-ID", // Access-Control-Allow-Headers  exposeHeaders: "Content-Type, Authorization, x-api-key, Mcp-Session-Id", // Access-Control-Expose-Headers  maxAge: "86400"                 // Access-Control-Max-Age}  
```
### Session Management[​](_docs_Transports_http-stream-transport.md#session-management)

The HTTP Stream Transport provides built-in session management capabilities:
```
session: {  
  enabled: true,                  // Enable session management (default: true)  headerName: "Mcp-Session-Id",   // Session header name (default: "Mcp-Session-Id")  allowClientTermination: true    // Allow clients to terminate sessions (default: true)}  
```
When sessions are enabled:

*   A unique session ID is generated during initialization
*   The session ID is included in the `Mcp-Session-Id` header of the server's response
*   Clients must include this session ID in subsequent requests
*   Sessions can be explicitly terminated by clients via a DELETE request (if allowed)

### Stream Resumability[​](_docs_Transports_http-stream-transport.md#stream-resumability)

The HTTP Stream Transport can maintain message history to support resuming broken SSE connections:
```
resumability: {  
  enabled: false,               // Enable stream resumability (default: false)  historyDuration: 300000       // How long to keep message history in ms (default: 300000 - 5 minutes)}  
```
When enabled:

*   Each SSE event is assigned a unique ID
*   Clients can reconnect and provide the last received event ID using the `Last-Event-ID` header
*   The server will replay missed messages since that event ID

## HTTP Methods[​](_docs_Transports_http-stream-transport.md#http-methods)

The HTTP Stream Transport uses the following HTTP methods:

*   **POST**: For sending client requests, notifications, and responses
*   **GET**: For establishing SSE streams for receiving server messages
*   **DELETE**: For terminating sessions (when `session.allowClientTermination` is enabled)
*   **OPTIONS**: For CORS preflight requests

## Client Implementation[​](_docs_Transports_http-stream-transport.md#client-implementation)

Here's an example of how to implement a client for the HTTP Stream Transport:
```
/** Basic client for the HTTP Stream Transport */class HttpStreamClient {  
  private baseUrl: string;  private sessionId: string | null = null;  private eventSource: EventSource | null = null;    constructor(baseUrl: string) {  
    this.baseUrl = baseUrl;  }    async initialize() {  
    // Create initialization request    const initRequest = {      jsonrpc: "2.0",      id: "init-" + Date.now(),      method: "initialize",      params: { /* initialization parameters */ }    };        // Send initialize request  
    const response = await fetch(this.baseUrl, {      method: 'POST',      headers: {        'Content-Type': 'application/json',        'Accept': 'application/json, text/event-stream'      },      body: JSON.stringify(initRequest)    });        // Get session ID from response headers  
    this.sessionId = response.headers.get('Mcp-Session-Id');    console.log(`Session established: ${this.sessionId}`);        // Process the response  
    if (response.headers.get('Content-Type')?.includes('text/event-stream')) {      // Handle streaming response      this.processStream(response);    } else {      // Handle JSON response      const result = await response.json();      console.log('Initialization result:', result);    }        // Open SSE stream for server-to-client messages  
    this.openEventStream();  }    private openEventStream() {  
    const url = new URL(this.baseUrl);    if (this.sessionId) {      url.searchParams.append('session', this.sessionId);    }        this.eventSource = new EventSource(url.toString());  
        this.eventSource.onmessage = (event) => {  
      try {        const message = JSON.parse(event.data);        console.log('Received SSE message:', message);        // Process message...      } catch (e) {        console.error('Error parsing SSE message:', e);      }    };        this.eventSource.onerror = (error) => {  
      console.error('SSE connection error:', error);      this.reconnectEventStream();    };        console.log('SSE stream opened');  
  }    private reconnectEventStream() {  
    if (this.eventSource) {      this.eventSource.close();      this.eventSource = null;    }        setTimeout(() => this.openEventStream(), 1000);  
  }    private async processStream(response: Response) {  
    const reader = response.body?.getReader();    if (!reader) return;        const decoder = new TextDecoder();  
    let buffer = "";        try {  
      while (true) {        const { done, value } = await reader.read();        if (done) break;                buffer += decoder.decode(value, { stream: true });  
                // Process SSE events in buffer  
        const events = buffer.split("\n\n");        buffer = events.pop() || "";                for (const event of events) {  
          const lines = event.split("\n");          const data = lines.find(line => line.startsWith("data:"))?.slice(5);                    if (data) {  
            try {              const message = JSON.parse(data);              console.log('Received stream message:', message);              // Process message...            } catch (e) {              console.error('Error parsing stream message:', e);            }          }        }      }    } catch (e) {      console.error('Error reading stream:', e);    }  }    async sendRequest(method: string, params: any = {}) {  
    if (!this.sessionId) {      throw new Error('Session not initialized');    }        const request = {  
      jsonrpc: "2.0",      id: method + "-" + Date.now(),      method,      params    };        const response = await fetch(this.baseUrl, {  
      method: 'POST',      headers: {        'Content-Type': 'application/json',        'Accept': 'application/json, text/event-stream',        'Mcp-Session-Id': this.sessionId      },      body: JSON.stringify(request)    });        if (response.headers.get('Content-Type')?.includes('text/event-stream')) {  
      // Handle streaming response      this.processStream(response);      return null; // Response will be processed asynchronously    } else {      // Handle JSON response      return await response.json();    }  }    async terminate() {  
    if (!this.sessionId) return;        if (this.eventSource) {  
      this.eventSource.close();      this.eventSource = null;    }        try {  
      await fetch(this.baseUrl, {        method: 'DELETE',        headers: {          'Mcp-Session-Id': this.sessionId        }      });      console.log('Session terminated');    } catch (e) {      console.error('Error terminating session:', e);    }        this.sessionId = null;  
  }}  
```
## Security Considerations[​](_docs_Transports_http-stream-transport.md#security-considerations)

1.  **HTTPS**: Always use HTTPS in production environments
2.  **Authentication**: Enable authentication for all endpoints
3.  **CORS**: Configure appropriate CORS settings for your environment
4.  **Message Size**: Set appropriate message size limits
5.  **Session Timeout**: Implement session timeout logic for production use
6.  **Rate Limiting**: Implement rate limiting for production use

## Backward Compatibility[​](_docs_Transports_http-stream-transport.md#backward-compatibility)

The HTTP Stream Transport is designed to replace the deprecated SSE Transport while maintaining compatibility with the MCP protocol. If you're migrating from the SSE Transport:

1.  Update your server configuration to use `type: "http-stream"` instead of `type: "sse"`
2.  Update your client to use the single endpoint pattern instead of separate endpoints for SSE and messages
3.  Implement session management using the `Mcp-Session-Id` header

## Error Handling[​](_docs_Transports_http-stream-transport.md#error-handling)

The transport includes comprehensive error handling, with appropriate HTTP status codes and JSON-RPC error responses:

*   400 Bad Request: Invalid JSON, invalid message format
*   401 Unauthorized: Authentication failure
*   404 Not Found: Invalid session ID
*   405 Method Not Allowed: Unsupported HTTP method
*   406 Not Acceptable: Missing required Accept header
*   413 Payload Too Large: Message size exceeds limit
*   429 Too Many Requests: Rate limit exceeded
*   500 Internal Server Error: Server-side errors

JSON-RPC error responses follow the standard format with detailed information:
```
{  
  "jsonrpc": "2.0",  "id": "request-id",  "error": {    "code": -32000,    "message": "Error message",    "data": {      // Additional error information    }  }}  
```
* * *

## HTTP QUICKSTART \[EXPERIMENTAL\][​](_docs_Transports_http-stream-transport.md#http-quickstart-experimental)

Ready to build your first HTTP-based MCP server? Follow our [HTTP Quickstart Guide](_docs_http-quickstart.md) to create and run a project using the HTTP Stream Transport in just a few minutes.

#### _docs_Transports_sse.md

> Source: https://mcp-framework.com/docs/Transports/sse
> Scraped: 4/15/2025, 12:15:01 AM

> ⚠️ **DEPRECATED**: The SSE Transport has been deprecated as of MCP specification version 2025-03-26. Please use the [HTTP Stream Transport](_docs_Transports_http-stream-transport.md) instead, which implements the new Streamable HTTP transport specification.

The Server-Sent Events (SSE) transport enables HTTP-based communication between the MCP server and clients. It uses SSE for server-to-client messages and HTTP POST for client-to-server messages.

## Configuration[​](_docs_Transports_sse.md#configuration)

The SSE transport supports various configuration options to customize its behavior:
```
import { MCPServer } from "@modelcontextprotocol/mcp-framework";  
  
const server = new MCPServer({  
  transport: {    type: "sse",    options: {      port: 8080,                // Port to listen on (default: 8080)      endpoint: "/sse",          // SSE endpoint path (default: "/sse")      messageEndpoint: "/messages", // Message endpoint path (default: "/messages")      maxMessageSize: "4mb",     // Maximum message size (default: "4mb")      headers: {                 // Custom headers for SSE responses        "X-Custom-Header": "value"      },      cors: {                    // CORS configuration        allowOrigin: "*",        allowMethods: "GET, POST, OPTIONS",        allowHeaders: "Content-Type, Authorization, x-api-key",        exposeHeaders: "Content-Type, Authorization, x-api-key",        maxAge: "86400"      },      auth: {                    // Authentication configuration        provider: authProvider,        endpoints: {          sse: true,            // Require auth for SSE connections          messages: true        // Require auth for messages        }      }    }  }});  
```
### Port Configuration[​](_docs_Transports_sse.md#port-configuration)

The `port` option specifies which port the SSE server should listen on. Default is 8080.

### Endpoints[​](_docs_Transports_sse.md#endpoints)

*   `endpoint`: The path for the SSE connection endpoint (default: "/sse")
*   `messageEndpoint`: The path for receiving messages via POST (default: "/messages")

### Message Size Limit[​](_docs_Transports_sse.md#message-size-limit)

The `maxMessageSize` option controls the maximum allowed size for incoming messages. Accepts string values like "4mb", "1kb", etc.

You can specify custom headers to be included in SSE responses:
```
headers: {  
  "X-Custom-Header": "value",  "Cache-Control": "no-cache"}  
```
### CORS Configuration[​](_docs_Transports_sse.md#cors-configuration)

The SSE transport includes comprehensive CORS support with the following options:
```
cors: {  
  allowOrigin: "*",                   // Access-Control-Allow-Origin  allowMethods: "GET, POST, OPTIONS", // Access-Control-Allow-Methods  allowHeaders: "Content-Type, Authorization, x-api-key", // Access-Control-Allow-Headers  exposeHeaders: "Content-Type, Authorization, x-api-key", // Access-Control-Expose-Headers  maxAge: "86400"                    // Access-Control-Max-Age}  
```
### Authentication[​](_docs_Transports_sse.md#authentication)

The SSE transport supports authentication through various providers. See the [Authentication](_docs_Authentication_overview.md) documentation for details.
```
auth: {  
  provider: authProvider,    // Authentication provider instance  endpoints: {    sse: true,              // Require auth for SSE connections    messages: true          // Require auth for messages  }}  
```
## Connection Management[​](_docs_Transports_sse.md#connection-management)

### Keep-Alive[​](_docs_Transports_sse.md#keep-alive)

The SSE transport automatically manages connection keep-alive:

*   Sends keep-alive messages every 15 seconds
*   Includes ping messages with timestamps
*   Optimizes socket settings for long-lived connections

### Session Management[​](_docs_Transports_sse.md#session-management)

Each SSE connection is assigned a unique session ID that must be included in message requests:

1.  Client establishes SSE connection
2.  Server sends endpoint URL with session ID
3.  Client uses this URL for sending messages

### Error Handling[​](_docs_Transports_sse.md#error-handling)

The transport includes robust error handling:

*   Connection errors
*   Message parsing errors
*   Authentication failures
*   Size limit exceeded errors

Error responses include detailed information:
```
{  
  "jsonrpc": "2.0",  "id": null,  "error": {    "code": -32000,    "message": "Error message",    "data": {      "method": "method_name",      "sessionId": "session_id",      "connectionActive": true,      "type": "message_handler_error"    }  }}  
```
## Security Considerations[​](_docs_Transports_sse.md#security-considerations)

1.  **HTTPS**: Always use HTTPS in production environments
2.  **Authentication**: Enable authentication for both SSE and message endpoints
3.  **CORS**: Configure appropriate CORS settings for your environment
4.  **Message Size**: Set appropriate message size limits
5.  **Rate Limiting**: Implement rate limiting for production use

## Client Implementation[​](_docs_Transports_sse.md#client-implementation)

Here's an example of how to implement a client for the SSE transport:
```
// Establish SSE connection  
const eventSource = new EventSource('http://localhost:8080/sse');  
  
// Handle endpoint URL  
eventSource.addEventListener('endpoint', (event) => {  
  const messageEndpoint = event.data;  // Store messageEndpoint for sending messages});  
  
// Handle messages  
eventSource.addEventListener('message', (event) => {  
  const message = JSON.parse(event.data);  // Process message});  
  
// Send message  
async function sendMessage(message) {  
  const response = await fetch(messageEndpoint, {    method: 'POST',    headers: {      'Content-Type': 'application/json',      'Authorization': 'Bearer your-token' // If using authentication    },    body: JSON.stringify(message)  });    if (!response.ok) {  
    throw new Error(`HTTP error! status: ${response.status}`);  }}  
```

#### _docs_Transports_stdio-transport.md

> Source: https://mcp-framework.com/docs/Transports/stdio-transport
> Scraped: 4/15/2025, 12:15:00 AM

The STDIO transport is the default transport mechanism in MCP Framework. It uses standard input/output streams for communication between the client and server.

## Overview[​](_docs_Transports_stdio-transport.md#overview)

STDIO transport is ideal for:

*   CLI tools and applications
*   Local process communication
*   Simple integrations without network requirements
*   Development and testing scenarios

## How It Works[​](_docs_Transports_stdio-transport.md#how-it-works)

The STDIO transport:

1.  Uses standard input (stdin) to receive messages from the client
2.  Uses standard output (stdout) to send messages to the client
3.  Implements JSON-RPC 2.0 protocol for message formatting
4.  Maintains a direct, synchronous communication channel

## Features[​](_docs_Transports_stdio-transport.md#features)

*   **Simplicity**: No network configuration required
*   **Performance**: Direct process communication with minimal overhead
*   **Reliability**: Guaranteed message delivery within the same process
*   **Security**: Inherent security through process isolation
*   **Debugging**: Easy to debug with direct console output

## Implementation[​](_docs_Transports_stdio-transport.md#implementation)
```
import { MCPServer } from "mcp-framework";  
  
// STDIO is the default transport  
const server = new MCPServer();  
  
// Or explicitly specify STDIO transport  
const server = new MCPServer({  
  transport: {    type: "stdio"  
  }});  
  
await server.start();  
```
## Use Cases[​](_docs_Transports_stdio-transport.md#use-cases)

### CLI Tools[​](_docs_Transports_stdio-transport.md#cli-tools)

STDIO transport is perfect for CLI tools where the MCP server runs as part of the command-line application:
```
#!/usr/bin/env node  
import { MCPServer } from "mcp-framework";  
  
async function main() {  
  const server = new MCPServer();  await server.start();}  
  
main().catch(console.error);  
```
### Local Development[​](_docs_Transports_stdio-transport.md#local-development)

During development, STDIO transport provides a simple way to test and debug your MCP tools:
```
import { MCPServer } from "mcp-framework";  
  
const server = new MCPServer({  
  name: "dev-server",  version: "1.0.0"});  
  
await server.start();  
```
## Limitations[​](_docs_Transports_stdio-transport.md#limitations)

While STDIO transport is simple and efficient, it has some limitations:

*   Single client connection only
*   No network accessibility
*   No authentication mechanism
*   Process-bound lifecycle

For scenarios requiring multiple clients, network access, or authentication, consider using [SSE Transport](_docs_Transports_sse.md) instead.

## Best Practices[​](_docs_Transports_stdio-transport.md#best-practices)

1.  **Error Handling**   Implement proper error handling for process termination
    *   Handle SIGINT and SIGTERM signals appropriately
2.  **Logging**   Use stderr for logging to avoid interfering with transport messages
    *   Consider implementing a proper logging strategy
3.  **Process Management**   Properly close the server on process exit
    *   Handle cleanup operations in shutdown hooks

## Example Implementation[​](_docs_Transports_stdio-transport.md#example-implementation)

Here's a complete example showing best practices:
```
import { MCPServer } from "mcp-framework";  
  
class MyMCPServer {  
  private server: MCPServer;  
  constructor() {    this.server = new MCPServer({      name: "my-mcp-server",      version: "1.0.0",      transport: { type: "stdio" }    });  
    // Handle process signals    process.on('SIGINT', () => this.shutdown());    process.on('SIGTERM', () => this.shutdown());  }  
  async start() {    try {      await this.server.start();      console.error('Server started successfully'); // Use stderr for logging    } catch (error) {      console.error('Failed to start server:', error);      process.exit(1);    }  }  
  private async shutdown() {    console.error('Shutting down...');    try {      await this.server.stop();      process.exit(0);    } catch (error) {      console.error('Error during shutdown:', error);      process.exit(1);    }  }}  
  
// Start the server  
new MyMCPServer().start().catch(console.error);  
```
* * *

## STDIO QUICKSTART[​](_docs_Transports_stdio-transport.md#stdio-quickstart)

Ready to build your first STDIO-based MCP server? Follow our [Quickstart Guide](_docs_quickstart.md) to create and run a project using the STDIO Transport in just a few minutes.

#### _docs_Transports_transports-overview.md

> Source: https://mcp-framework.com/docs/Transports/transports-overview
> Scraped: 4/15/2025, 12:15:00 AM

MCP Framework supports multiple transport mechanisms for communication between the client and server. Each transport type has its own characteristics, advantages, and use cases.
```
const server = new MCPServer({  
  transport: {    type: "http-stream",    options: {      port: 8080,            // Optional (default: 8080)      endpoint: "/mcp",      // Optional (default: "/mcp")      responseMode: "batch", // Optional (default: "batch")      cors: {        allowOrigin: "*"     // Optional CORS configuration      },      auth: {        // Optional authentication configuration      }    }  }});  
```
```
const server = new MCPServer({  
  transport: {    type: "sse",    options: {      port: 8080,            // Optional (default: 8080)      endpoint: "/sse",      // Optional (default: "/sse")      messageEndpoint: "/messages", // Optional (default: "/messages")      auth: {        // Optional authentication configuration      }    }  }});  
```

#### _docs_debugging.md

> Source: https://mcp-framework.com/docs/debugging
> Scraped: 4/15/2025, 12:14:59 AM

## Debugging MCP Servers

tip

The Model Context Protocol provides an open-source Inspector tool that makes debugging your MCP servers easy!

## MCP Inspector[​](_docs_debugging.md#mcp-inspector)

The MCP Inspector is an external developer tool maintained by the Model Context Protocol team that helps you test and debug MCP servers. It provides a user interface for interacting with your server and testing your tools, resources, and prompts.

### Using the Inspector[​](_docs_debugging.md#using-the-inspector)

You can run the Inspector directly through `npx` without installation:
```
npx @modelcontextprotocol/inspector <path-to-your-server>  
```
For example, if you've built your MCP Framework server:
```
# First build your server  

npm run build  
  
# Then run the inspector  

npx @modelcontextprotocol/inspector dist/index.js  
```
### Customizing Ports[​](_docs_debugging.md#customizing-ports)

The Inspector runs both a client UI (default port 5173) and an MCP proxy server (default port 3000). You can customize these ports if needed:
```
CLIENT_PORT=8080 SERVER_PORT=9000 npx @modelcontextprotocol/inspector dist/index.js  
```
## Using the Inspector[​](_docs_debugging.md#using-the-inspector-1)

### Server Connection[​](_docs_debugging.md#server-connection)

When you open the Inspector in your browser, you'll see:

*   Connection status to your server
*   Server capabilities
*   Server metadata

### Testing Tools[​](_docs_debugging.md#testing-tools)

The Tools tab allows you to:

*   View all registered tools
*   See tool schemas and descriptions
*   Test tools with custom inputs
*   View execution results

Example testing workflow:

1.  Select your tool from the list
2.  Enter test inputs in the JSON editor
3.  Execute the tool
4.  Review the response

### Inspecting Resources[​](_docs_debugging.md#inspecting-resources)

The Resources tab enables you to:

*   Browse available resources
*   View resource metadata
*   Test resource content retrieval
*   Test subscriptions (if supported)

### Testing Prompts[​](_docs_debugging.md#testing-prompts)

In the Prompts tab, you can:

*   View available prompt templates
*   Test prompts with different arguments
*   Preview generated messages

## Framework Logging[​](_docs_debugging.md#framework-logging)

MCP Framework includes built-in logging that integrates well with the Inspector:
```
import { logger } from "mcp-framework";  
  
class MyTool extends MCPTool {  
  async execute(input) {    logger.info("Starting execution");  
    try {      const result = await this.process(input);      logger.info("Execution successful");      return result;    } catch (error) {      logger.error("Execution failed:", error);      throw error;    }  }}  
```
### Log Levels[​](_docs_debugging.md#log-levels)
```
logger.debug("Detailed information");  
logger.info("General information");  
logger.warn("Warning messages");  
logger.error("Error messages");  
```
## Development Workflow[​](_docs_debugging.md#development-workflow)

1.  **Start Development**   Launch your server with the Inspector
    *   Verify basic connectivity
    *   Check that your tools are listed
2.  **Iterative Testing**   Make changes to your server
    *   Rebuild (`npm run build`)
    *   Reconnect the Inspector
    *   Test the changes
    *   Monitor the logs
3.  **Test Edge Cases**   Try invalid inputs
    *   Test error handling
    *   Check concurrent operations

## Common Issues[​](_docs_debugging.md#common-issues)

### Tool Not Found[​](_docs_debugging.md#tool-not-found)

*   Ensure the tool is properly exported
*   Check that the tool name matches
*   Verify the tool is being loaded by the server

### Resource Errors[​](_docs_debugging.md#resource-errors)

*   Check resource URI formatting
*   Verify resource read implementation
*   Test subscription cleanup

### Prompt Issues[​](_docs_debugging.md#prompt-issues)

*   Validate prompt arguments
*   Check message generation
*   Verify resource references

## Best Practices[​](_docs_debugging.md#best-practices)

1.  **Use Descriptive Logging**
```
logger.info(`Processing request for user ${userId}`);  
logger.error(`Failed to fetch data: ${error.message}`);  
```
1.  **Handle Errors Gracefully**
```
try {  
  // Your operation} catch (error) {  
  logger.error(`Operation failed: ${error.message}`);  throw new Error(`Failed to complete operation: ${error.message}`);}  
```
1.  **Monitor Performance**
```
const start = Date.now();  
// ... operation ...  
logger.debug(`Operation took ${Date.now() - start}ms`);  
```

#### _docs_http-quickstart.md

> Source: https://mcp-framework.com/docs/http-quickstart
> Scraped: 4/15/2025, 12:14:59 AM

## Video Tutorial[​](_docs_http-quickstart.md#video-tutorial)

Watch our video tutorial for a step-by-step guide to creating and using HTTP MCP servers:

[![MCP Framework HTTP Tutorial](https://img.youtube.com/vi/C2O7NteeQUs/0.jpg)](https://youtu.be/C2O7NteeQUs)

* * *

This guide will walk you through creating a simple MCP server that uses the HTTP Stream Transport, allowing you to expose your AI tools via a web-accessible endpoint.

## Prerequisites[​](_docs_http-quickstart.md#prerequisites)

Before you begin, make sure you have:

*   **Node.js** (version 18 or later) installed
*   **npm** (Node Package Manager) installed
*   `mcp-framework` installed globally:

## Create a New HTTP Project[​](_docs_http-quickstart.md#create-a-new-http-project)

The easiest way to create an HTTP-enabled MCP server is to use the CLI with the `--http` flag:
```
mcp create weather-http-server --http --port 1337 --cors  
cd weather-http-server  
```
This command:

*   Creates a new project called "weather-http-server"
*   Configures it to use the HTTP Stream Transport on port 1337
*   Enables CORS to allow browser-based clients to connect

## Examine the Generated Configuration[​](_docs_http-quickstart.md#examine-the-generated-configuration)

Open `src/index.ts` to see the HTTP configuration:
```
import { MCPServer } from "mcp-framework";  
  
const server = new MCPServer({  
  transport: {    type: "http-stream",    options: {      port: 1337,      cors: {        allowOrigin: "*"      }    }  }});  
  
server.start();  
```
Use the CLI to create a new tool:

This creates `src/tools/WeatherTool.ts`. Let's modify it to handle weather requests:
```
import { MCPTool } from "mcp-framework";  
import { z } from "zod";  
  
interface WeatherInput {  
  city: string;}  
  
class WeatherTool extends MCPTool<WeatherInput> {  
  name = "weather";  description = "Get weather information for a city";  
  schema = {    city: {      type: z.string(),      description: "City name to get weather for",    },  };  
  async execute({ city }: WeatherInput) {    // In a real scenario, this would call a weather API    // For now, we return this sample data    return {      city,      temperature: 22,      condition: "Sunny",      humidity: 45,    };  }}  
  
export default WeatherTool;  
```
## Build and Start Your Server[​](_docs_http-quickstart.md#build-and-start-your-server)
```
# Build the project  

npm run build  
  
# Start the server  

npm start  
```
Your HTTP MCP server is now running at `http://localhost:1337/mcp`.

## Testing Your HTTP Server[​](_docs_http-quickstart.md#testing-your-http-server)

### Experimental Debugger[​](_docs_http-quickstart.md#experimental-debugger)

While we wait for HTTP Clients to come out in the wild, you can test your HTTP Server with our experimental debugger:

This tool will help you inspect and interact with your MCP server, sending requests and viewing responses. You can also follow our video tutorial at the top of this page for a demonstration.

### Contribute an HTTP Client[​](_docs_http-quickstart.md#contribute-an-http-client)

Have an HTTP Client? Add it to these docs by submitting a PR! We welcome contributions from the community to expand the ecosystem of MCP HTTP clients.

## Production Considerations[​](_docs_http-quickstart.md#production-considerations)

For production use, consider the following:

1.  **HTTPS**: Always use HTTPS in production. You can set up a reverse proxy like Nginx or use services like Cloudflare.
    
2.  **Authentication**: Add authentication to protect your endpoints. The framework supports various authentication providers like API keys and JWT tokens. See the [Authentication Options](_docs_Authentication_overview.md) documentation for more details.
    
3.  **Response Mode**: Choose the appropriate response mode based on your use case:
    
    *   `batch` (default): Collects all responses and sends them in a single JSON response
    *   `stream`: Opens an SSE stream for each request, allowing streaming responses
```
transport: {  
  type: "http-stream",  options: {    responseMode: "stream" // For streaming responses  }}  
```
1.  **Session Configuration**: Configure session management:
```
transport: {  
  type: "http-stream",  options: {    session: {      enabled: true,      headerName: "Mcp-Session-Id",      allowClientTermination: true    }  }}  
```
1.  **Stream Resumability**: Enable resumable streams for better reliability:
```
transport: {  
  type: "http-stream",  options: {    resumability: {      enabled: true,      historyDuration: 300000 // 5 minutes in milliseconds    }  }}  
```
## What's Next?[​](_docs_http-quickstart.md#whats-next)

Now that you have your HTTP MCP server running, you can:

1.  **Add more tools**: Extend your server with additional tools
2.  **Integrate with actual APIs**: Connect to real weather services
3.  **Add resources**: Implement caching or dynamic data sources
4.  **Create a better web client**: Build a sophisticated web UI
5.  **Set up authentication**: Add proper authentication for production
6.  **Deploy to a server**: Host your MCP server on a cloud provider

### Next Steps[​](_docs_http-quickstart.md#next-steps)

*   Learn more about [HTTP Stream Transport](_docs_Transports_http-stream-transport.md)
*   Explore [Authentication Options](_docs_Authentication_overview.md)
*   _Advanced Configuration and Deployment guides coming soon_

Need help or want to contribute to the MCP Framework? Join our community:

*   Join our [Discord community](https://discord.com/invite/3uqNS3KRP2) for discussions, support, and updates
*   Report issues or contribute to the [GitHub repository](https://github.com/humanloop/mcp-framework)

#### _docs_installation.md

> Source: https://mcp-framework.com/docs/installation
> Scraped: 4/15/2025, 12:14:56 AM

Setting up the MCP Framework is straightforward. You can either create a new project using our CLI or add it to an existing project.

## Using the CLI (Recommended)[​](_docs_installation.md#using-the-cli-recommended)

The easiest way to get started is using our CLI to create a new project:
```
# Install the CLI globally with npm  

npm install -g mcp-framework  
# The mcp CLI is now globally available  

  
# Create your new project with the mcp CLI  

mcp create my-mcp-server  
  
# Navigate to your project  

cd my-mcp-server  
  
# Install dependencies  

npm install  
```
This will create a new project with the following structure:
```
my-mcp-server/  
├── src/  
│   ├── tools/         # MCP Tools directory  

│   │   └── ExampleTool.ts  
│   └── index.ts       # Server entry point  

├── package.json  
└── tsconfig.json  
```
To open this project in vscode, use:

## Manual Installation[​](_docs_installation.md#manual-installation)

If you prefer to add MCP Framework to an existing project:
```
npm install mcp-framework  
```
Then create a minimal server in `src/index.ts`:
```
import { MCPServer } from "mcp-framework";  
  
const server = new MCPServer();  
  
server.start().catch((error) => {  
  console.error("Server error:", error);  process.exit(1);});  
```
## Requirements[​](_docs_installation.md#requirements)

*   Node.js 18 or later
*   TypeScript 5.0 or later
*   npm or yarn package manager

## Troubleshooting[​](_docs_installation.md#troubleshooting)

### Common Issues[​](_docs_installation.md#common-issues)

1.  **TypeScript Errors**:
    
    ```
    error TS2304: Cannot find name 'z'  
    
    ```
    
    Solution: Install zod - `npm install zod`
    
2.  **Module Resolution Issues**:
    
    ```
    Error: Cannot find module '@modelcontextprotocol/sdk'  
    
    ```
    
    Solution: Install peer dependencies - `npm install @modelcontextprotocol/sdk`
    

For more help, check our [GitHub Issues](https://github.com/QuantGeekDev/mcp-framework/issues) or join our [Discord community](https://discord.com/invite/3uqNS3KRP2).

#### _docs_introduction.md

> Source: https://mcp-framework.com/docs/introduction
> Scraped: 4/15/2025, 12:14:58 AM

This framework makes it easy to create and manage MCP (modelcontextprotocol) servers that can be used with MCP Clients like the Claude Desktop app.

It is simple and intuitive to use.

MCP-Framework gives you architecture out of the box, with automatic directory-based discovery for tools, resources, and prompts. Use our powerful MCP abstractions to define tools, resources, or prompts in an elegant way. Our cli makes getting started with your own MCP server a breeze

[Quickstart Guide](_docs_quickstart.md)

## Key Features[​](_docs_introduction.md#key-features)

*   **Tool Support**: Create custom tools that extend AI model capabilities
*   **Resource Management**: Handle external data sources and APIs
*   **Prompt Templates**: Define reusable prompt templates
*   **Multiple Transports**: Support for both STDIO and SSE (Server-Sent Events) communication
*   **Authentication**: Built-in JWT and API Key authentication for SSE transport
*   **Use the power of Typescript**: Full TypeScript support with type safety
*   **CLI Tool**: Easy project scaffolding and component creation
*   **Fast Development**: Elegant and fast development cycles

## How It Works[​](_docs_introduction.md#how-it-works)

MCP Framework provides four main components:

### 1\. Tools[​](_docs_introduction.md#1-tools)

Functions that AI models can invoke to:

*   Fetch data from APIs
*   Transform data
*   Perform computations
*   Interact with external services

### 2\. Resources[​](_docs_introduction.md#2-resources)

Data sources that can be:

*   Read by the AI model
*   Subscribed to for updates
*   Used to provide context

### 3\. Prompts[​](_docs_introduction.md#3-prompts)

Template systems that:

*   Define reusable conversation flows
*   Provide structured context
*   Guide model interactions

### 4\. Transports[​](_docs_introduction.md#4-transports)

Communication layers that:

*   Handle client-server communication
*   Support different use cases:
    *   **STDIO**: Perfect for CLI tools and local integrations
    *   **SSE**: Ideal for web applications with optional authentication

The framework handles all communication between your server and AI models, following the Model Context Protocol specification.

## When to Use MCP Framework[​](_docs_introduction.md#when-to-use-mcp-framework)

*   Building custom tools for AI models
*   Creating data integration services
*   Developing specialized AI assistants
*   Extending AI capabilities with external services
*   Building enterprise AI solutions
*   Creating web-based AI tools (using SSE transport)
*   Developing secure AI services with authentication

Ready to get started? Head to the [Installation](_docs_installation.md) guide to begin building your first MCP server, or learn more about our [transport options](_docs_Transports_transports-overview.md).

#### _docs_quickstart.md

> Source: https://mcp-framework.com/docs/quickstart
> Scraped: 4/15/2025, 12:14:58 AM

Let's create a simple MCP server with a basic tool. This guide will walk you through creating a weather information tool.

This creates `src/tools/WeatherTool.ts` Let's modify it to handle weather requests:
```
import { MCPTool } from "mcp-framework";  
import { z } from "zod";  
  
interface WeatherInput {  
  city: string;}  
  
class WeatherTool extends MCPTool<WeatherInput> {  
  name = "weather";  description = "Get weather information for a city";  
  schema = {    city: {      type: z.string(),      description: "City name to get weather for",    },  };  
  async execute({ city }: WeatherInput) {    // In a real scenario, this would call a weather API    // For now, we return this sample data    return {      city,      temperature: 22,      condition: "Sunny",      humidity: 45,    };  }}  
  
export default WeatherTool;  
```
For this quickstart, we'll use the default STDIO transport. To learn more about transports, check out:

You can test your tool using the Claude Desktop client. Add this to your Claude Desktop config:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json` **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

The example above shows a basic tool implementation. In practice, you might want to:

#### _docs_server-configuration.md

> Source: https://mcp-framework.com/docs/server-configuration
> Scraped: 4/15/2025, 12:14:59 AM

The MCP Framework provides extensive configuration options for customizing your server's behavior. This guide covers all available configuration options and best practices.
```
import { MCPServer } from "@modelcontextprotocol/mcp-framework";  
  
const server = new MCPServer({  
  name: "my-mcp-server",        // Server name  version: "1.0.0",            // Server version  basePath: "./dist",          // Base path for tools/prompts/resources  transport: {                 // Transport configuration    type: "sse",    options: {      // Transport-specific options    }  }});  
```
```
const server = new MCPServer({  
  name: "my-mcp-server",     // Default: package.json name or "unnamed-mcp-server"  version: "1.0.0"          // Default: package.json version or "0.0.0"});  
```
If not provided, the server will attempt to read these values from your project's package.json file.

The `basePath` option specifies where the server should look for tools, prompts, and resources:
```
const server = new MCPServer({  
  basePath: "./dist"  // Default: join(process.cwd(), 'dist')});  
```
The transport configuration determines how clients will communicate with your server:
```
const server = new MCPServer({  
  transport: {    type: "sse",              // "sse" or "stdio"    options: {      // Transport-specific options      port: 8080,      endpoint: "/sse",      // ... other options    }  }});  
```
The server automatically detects and enables capabilities based on your project structure:
```
interface ServerCapabilities {  
  tools?: {    enabled: true;  };  schemas?: {    enabled: true;  };  prompts?: {    enabled: true;  };  resources?: {    enabled: true;  };}  
```
The server also handles SIGINT signals (Ctrl+C) for graceful shutdown.
```
import { logger } from "@modelcontextprotocol/mcp-framework";  
  
// Log levels: debug, info, warn, error  
logger.debug("Debug message");  
logger.info("Info message");  
logger.warn("Warning message");  
logger.error("Error message");  
```
```
import { MCPServer, APIKeyAuthProvider } from "@modelcontextprotocol/mcp-framework";  
  
const server = new MCPServer({  
  name: "my-mcp-server",  version: "1.0.0",  basePath: "./dist",  transport: {    type: "sse",    options: {      port: 8080,      endpoint: "/sse",      messageEndpoint: "/messages",      maxMessageSize: "4mb",      headers: {        "X-Custom-Header": "value"      },      cors: {        allowOrigin: "*",        allowMethods: "GET, POST, OPTIONS",        allowHeaders: "Content-Type, Authorization, x-api-key",        exposeHeaders: "Content-Type, Authorization, x-api-key",        maxAge: "86400"      },      auth: {        provider: new APIKeyAuthProvider({          keys: ["your-api-key"]        }),        endpoints: {          sse: true,          messages: true        }      }    }  }});  
  
// Start the server  
await server.start();  
  
// Handle shutdown  
process.on('SIGINT', async () => {  
  await server.stop();});  
```

