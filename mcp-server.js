#!/usr/bin/env node --no-warnings

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises'; // Use promises API for async file reading
import dotenv from 'dotenv';
// Fix imports to match the actual file paths
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js"; // Revert to McpServer
import { McpError, ErrorCode, ReadResourceRequestSchema } from '@modelcontextprotocol/sdk/types.js';

// Direct ESM imports now that modules have been converted
import { log } from './src/utils/logger.js';
import { z } from 'zod'; // Re-add Zod import
import { runSlurpWorkflow } from './src/slurpWorkflow.js';

// Replicate __dirname behavior in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the script's directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Main function to initialize and run the MCP server.
 * @async
 */
async function main() {
  log.info("Initializing Slurp MCP Server...");

  // 1. Initialize MCP Server
  const server = new McpServer( // Revert to McpServer
    {
      // Server Information
      name: "slurp-mcp-server",
      version: "1.0.0", // TODO: Maybe pull from package.json later?
      // Add any other relevant server info here
    },
    {
      // Server Capabilities
      capabilities: {
        // Declare support for tools and resources as planned
        tools: {}, // Empty object indicates basic support
        resources: {}, // Empty object indicates basic support
        // Add other capabilities like prompts if needed later
      }
    }
  );
  // --- Tool and Resource Handlers ---

  // Schema defined inline below
  // Register the slurp_url tool
  server.tool(
    'slurp_url',
    'Scrapes documentation starting from a given URL, compiles it into a single Markdown file, and returns a resource URI to the compiled content.',
    { // Define schema inline as an object literal
      url: z.string().describe("The starting URL for documentation scraping.")
    },
    async (args, extra) => { // Add 'extra' parameter
      
      // Expect args to be { url: "..." }
      const url = args.url;

      // Basic validation
      if (typeof url !== 'string') {
          log.error(`Invalid URL parameter received. Expected a string, got: ${JSON.stringify(url)}`);
          throw new McpError(ErrorCode.InvalidParams, `Invalid URL parameter type received: ${typeof url}`);
      }

      log.debug(`Extracted URL: ${url}`);

      log.info(`Received slurp_url request for URL: ${url}`); // Use extracted url variable

      try {
        // Progress updates removed as progressToken is no longer handled.

        // Call the refactored workflow function
        log.debug('Starting runSlurpWorkflow...');
        log.debug(`Calling runSlurpWorkflow with URL: ${url}`); // Use extracted url variable
        // Pass the signal from the 'extra' object to the workflow options
        const result = await runSlurpWorkflow(url, { signal: extra.signal });

        if (result.success && result.compiledFilePath) {
          // Construct the resource URI using the 'slurp' scheme
          // Ensure the path is relative and uses forward slashes for URI consistency
          const relativePath = result.compiledFilePath.replace(/\\/g, '/');
          const resourceUri = `slurp://${relativePath}`;

          log.success(`Workflow successful for ${url}. Compiled file: ${result.compiledFilePath}`);
          return {
            // Return the resource URI in the tool result
            resource_uri: resourceUri,
            message: `Successfully scraped and compiled documentation. Resource available at: ${resourceUri}`
          };
        } else {
          // Workflow reported failure
          const errorMessage = result.error?.message || 'Unknown error during Slurp workflow.';
          log.error(`Slurp workflow failed for ${url}: ${errorMessage}`);
          // Return a structured MCP error
           throw new McpError(ErrorCode.InternalError, `Slurp workflow failed: ${errorMessage}`);
          // Alternatively, return error content:
          // return {
          //   isError: true,
          //   content: [{ type: 'text', text: `Slurp workflow failed: ${errorMessage}` }]
          // };
        }
      } catch (error) {
        // Catch unexpected errors during the handler execution
        log.error(`Unexpected error in slurp_url handler for ${url}: ${error.message}`);
         if (error.stack) {
             log.verbose(error.stack);
         }
         // Throw structured MCP error
         throw new McpError(ErrorCode.InternalError, `Unexpected server error: ${error.message}`);
        // Alternatively, return error content:
        // return {
        //   isError: true,
        //   content: [{ type: 'text', text: `Unexpected server error: ${error.message}` }]
        // };
      }
    }
  );


  // --- New Tool for Reading Slurp Resources ---
  server.tool(
    'read_slurp_resource',
    'Reads the content of a compiled Slurp resource file given its slurp:// URI.',
    { // Schema for the tool
      uri: z.string().describe("The slurp:// URI of the resource to read.")
    },
    async (args, extra) => {
      const requestedUri = args.uri;
      log.info(`Received read_slurp_resource request for URI: ${requestedUri}`);

      const SLURP_SCHEME = 'slurp://';

      if (typeof requestedUri !== 'string' || !requestedUri.startsWith(SLURP_SCHEME)) {
        log.error(`Invalid or unsupported URI scheme for read_slurp_resource: ${requestedUri}`);
        throw new McpError(ErrorCode.InvalidParams, `Invalid or unsupported URI scheme: ${requestedUri}. Must start with 'slurp://'.`);
      }

      // Extract relative path, remove scheme prefix
      const relativePath = requestedUri.substring(SLURP_SCHEME.length);

      // Basic path sanitization/validation
      if (relativePath.includes('..') || path.isAbsolute(relativePath)) {
          log.error(`Invalid path specified in URI: ${relativePath}`);
          throw new McpError(ErrorCode.InvalidParams, `Invalid path specified in URI: ${relativePath}`);
      }

      // Construct absolute path relative to the project root directory
      const absolutePath = path.resolve(process.cwd(), relativePath);

      // Security check: Ensure the resolved path is still within the project directory
      if (!absolutePath.startsWith(process.cwd())) {
           log.error(`Attempted to access path outside project directory: ${relativePath}`);
           throw new McpError(ErrorCode.InvalidParams, `Attempted to access path outside project directory: ${relativePath}`);
      }

      try {
        log.verbose(`Attempting to read file at: ${absolutePath}`);
        const fileContent = await fs.readFile(absolutePath, { encoding: 'utf-8' });
        log.success(`Successfully read file for URI: ${requestedUri}`);

        // Return the content directly in the tool result
        // Note: MCP Tools might display this as a simple string or within a structure.
        // We'll return an object with a 'content' key for clarity.
        return {
          uri: requestedUri,
          content: fileContent
        };
      } catch (error) {
        if (error.code === 'ENOENT') {
          log.error(`File not found for URI ${requestedUri} at path ${absolutePath}`);
          throw new McpError(ErrorCode.NotFound, `Resource file not found: ${requestedUri}`); // Use NotFound code
        } else {
          log.error(`Error reading file for URI ${requestedUri}: ${error.message}`);
          throw new McpError(ErrorCode.InternalError, `Server error reading resource file: ${error.message}`);
        }
      }
    }
  );

  // --- Resource Handler ---

  // ReadResourceRequestSchema is imported at the top now

  server.resource('slurp://{+path}', async (request) => { // Add URI template

    let requestedUri;
    // Check if params is an array (likely from mcp read-resource) or object (schema standard)
    if (Array.isArray(request.params)) {
      log.debug('Detected params as array, attempting to get URI from first element.');
      requestedUri = request.params[0];
    } else if (request.params && typeof request.params === 'object') {
      log.debug('Detected params as object, attempting to get URI from params.uri.');
      requestedUri = request.params.uri;
    }

    // Validate the extracted URI
    if (typeof requestedUri !== 'string') {
      log.error(`Resource handler failed: Could not extract valid URI string. Request params: ${JSON.stringify(request.params)}`);
      throw new McpError(ErrorCode.InvalidParams, `Invalid request: URI parameter missing, not a string, or incorrect format.`);
    }

    log.verbose(`Received resources/read request for URI: ${requestedUri}`);

    const SLURP_SCHEME = 'slurp://';

    if (!requestedUri || !requestedUri.startsWith(SLURP_SCHEME)) {
      // This shouldn't happen if client uses resources correctly, but good to check
      throw new McpError(ErrorCode.InvalidParams, `Invalid or unsupported URI scheme for resources/read: ${requestedUri}`);
    }

    // Extract relative path, remove scheme prefix
    const relativePath = requestedUri.substring(SLURP_SCHEME.length);

    // Basic path sanitization/validation
    if (relativePath.includes('..') || path.isAbsolute(relativePath)) {
        throw new McpError(ErrorCode.InvalidParams, `Invalid path specified in URI: ${relativePath}`);
    }

    // Construct absolute path relative to the project root directory
    const absolutePath = path.resolve(process.cwd(), relativePath);

    // Security check: Ensure the resolved path is still within the project directory
    // This prevents accessing files outside the intended scope via tricky relative paths
    if (!absolutePath.startsWith(process.cwd())) {
         throw new McpError(ErrorCode.InvalidParams, `Attempted to access path outside project directory: ${relativePath}`);
    }


    try {
      log.verbose(`Attempting to read file at: ${absolutePath}`);
      const fileContent = await fs.readFile(absolutePath, { encoding: 'utf-8' });
      log.success(`Successfully read file for URI: ${requestedUri}`);

      // Return the content in the expected MCP format
      return {
        contents: [
          {
            uri: requestedUri,
            mimeType: 'text/markdown', // Assume compiled output is Markdown
            text: fileContent,
          },
        ],
      };
    } catch (error) {
      if (error.code === 'ENOENT') {
        log.error(`File not found for URI ${requestedUri} at path ${absolutePath}`);
        throw new McpError(ErrorCode.InvalidParams, `Resource not found: ${requestedUri}`); // Use InvalidParams as per spec suggestion for unknown URIs
      } else {
        log.error(`Error reading file for URI ${requestedUri}: ${error.message}`);
        throw new McpError(ErrorCode.InternalError, `Server error reading resource: ${error.message}`);
      }
    }
  });

  // --- Connect Transport and Start ---

  // 2. Initialize Transport (Stdio for local execution)
  const transport = new StdioServerTransport();

  // 3. Connect Server to Transport and Start Listening
  try {
    await server.connect(transport);
    log.success(`Slurp MCP Server running on stdio transport.`);
    log.verbose(`Capabilities declared: ${JSON.stringify(server.capabilities)}`);

    // Keep the server running until the transport closes
    await new Promise((resolve) => {
        transport.onclose = resolve;
        // Optional: Add specific error handling for transport errors
        transport.onerror = (error) => {
            log.error(`Transport error: ${error.message}`);
            // Depending on the error, you might want to exit or attempt recovery
            process.exit(1); // Exit on transport error for simplicity
        };
    });

    log.info("Slurp MCP Server transport closed. Exiting.");

  } catch (error) {
    log.error(`Failed to start or connect Slurp MCP Server: ${error.message}`);
    if (error.stack) {
        log.verbose(error.stack);
    }
    process.exit(1); // Exit if server fails to start
  }
} // <-- Closing brace for main function now goes here

// Run the server
// Run the server using an IIAFE
(async () => {
  try {
    await main();
  } catch (error) {
    // Catch any uncaught errors during async main execution
    log.error(`Unhandled error during server execution: ${error.message}`);
    if (error.stack) {
         log.verbose(error.stack);
    }
    process.exit(1);
  }
})();