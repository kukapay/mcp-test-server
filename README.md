# MCP Test Server

Lightweight MCP test server for verifying client connectivity, with tools and prompts for integration. Try it at [kukayay.com](https://test.kukapay.com) or install locally.

## Features

- **Tools**:
  - `calculate_sum`: Sums an array of numbers.
- **Resources**:
  - Static: `test://data` - Returns static test data.
  - Dynamic: `user://{userId}` - Returns user profile data for a given `userId`.
- **Prompts**:
  - `greeting`: Generates a personalized greeting based on a name parameter.
- **Transports**:
  - Streamable HTTP (recommended for modern MCP clients).
  - Stdio (via `mcp-remote` for clients requiring stdio transport).
  - HTTP SSE (legacy, removed from MCP standard).

## Online Server

Test the server online at `https://test.kukapay.com` using the following configurations:

- Streamable HTTP Transport

For clients supporting Streamable HTTP transport:

```json
{
  "McpServers": {
    "Test Server": {
      "url": "https://test.kukapay.com/api/mcp"
    }
  }
}
```

- Stdio Transport

For clients requiring stdio transport, use `mcp-remote`:

```json
{
  "McpServers": {
    "Test Server": {
      "command": "npx",
      "args": ["mcp-remote", "-y", "https://test.kukapay.com/api/mcp"]
    }
  }
}
```

- HTTP SSE Transport (Legacy)

For clients supporting HTTP SSE (note: deprecated in MCP standard):

```json
{
  "McpServers": {
    "Test Server": {
      "url": "https://test.kukapay.com/api/sse"
    }
  }
}
```

## Local Installation

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kukapay/mcp-test-server.git
   cd mcp-test-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The server will be available at `http://localhost:3000`.

### Configuration

Configure your MCP client to connect to the local server using one of the following transport methods:

- Streamable HTTP Transport

```json
{
  "McpServers": {
    "Test Server": {
      "url": "http://localhost:3000/api/mcp"
    }
  }
}
```

- Stdio Transport

```json
{
  "McpServers": {
    "Test Server": {
      "command": "npx",
      "args": ["mcp-remote", "-y", "http://localhost:3000/api/mcp"]
    }
  }
}
```

- HTTP SSE Transport (Legacy)

```json
{
  "McpServers": {
    "Test Server": {
      "url": "http://localhost:3000/api/sse"
    }
  }
}
```

### Client-Specific Configuration

- **Claude Desktop**: Add the above configuration to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows).
- **Cursor**: Add to `~/.cursor/mcp.json`.
- **Windsurf**: Add to `~/.codeium/windsurf/mcp_config.json`.

## License

MIT License. See [LICENSE](LICENSE) for details.

