#!/usr/bin/env node

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { state } from './state.js';
import { cleanup } from './utils.js';
import { allTools } from './tools/index.js';

// Create an MCP server
const server = new McpServer({
    name: "MCP Selenium",
    version: "1.0.0"
});

// Register all tools
allTools.forEach(tool => {
    server.tool(
        tool.name,
        tool.description,
        tool.inputSchema,
        tool.handler
    );
});

// Resources
server.resource(
    "browser-status",
    new ResourceTemplate("browser-status://current"),
    async (uri) => ({
        contents: [{
            uri: uri.href,
            text: state.currentSession 
                ? `Active browser session: ${state.currentSession}`
                : "No active browser session"
        }]
    })
);

// Setup cleanup handlers
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);