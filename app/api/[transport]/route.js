const { createMcpHandler } = require("@vercel/mcp-adapter");
const { McpServer, ResourceTemplate } = require("@modelcontextprotocol/sdk/server/mcp");
const { z } = require("zod");

const handler = createMcpHandler(
  (server) => {
    // Add a simple calculator tool
    server.tool(
      "calculate_sum",
      "Calculate the sum of the given numbers.",
      {
        numbers: z.array(z.number()),
      },
      async ({ numbers }) => {
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return {
          content: [{ type: "text", text: `Sum: ${sum}` }],
        };
      }
    );

    // Add a test resource
    server.resource(
      "test_data",
      "test://data",
      async (uri) => ({
        contents: [{
          uri: uri.href,
          text: "This is test data content",
          mimeType: "text/plain",
        }],
      })
    );

    // Add a dynamic resource with parameters
    server.resource(
      "user_info",
      new ResourceTemplate("user://{userId}", { list: undefined }),
      async (uri, { userId }) => ({
        contents: [{
          uri: uri.href,
          text: `User profile for ID: ${userId}`,
          mimeType: "text/plain",
        }],
      })
    );

    // Add a test prompt
    server.prompt(
      "greeting",
      { name: z.string() },
      ({ name }) => ({
        messages: [{
          role: "user",
          content: {
            type: "text",
            text: `Generate a personalized greeting for ${name}`,
          },
        }],
      })
    );
  },
  {
    name: "mcp-test-server",
    version: "1.0.0",
  },
  {
    redisUrl: process.env.REDIS_URL,
    basePath: "/api",
    verboseLogs: true,
  }
);

module.exports = {
  GET: handler,
  POST: handler,
};