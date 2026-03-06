import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createWeatherServer } from "./server.js";

async function main() {
    const server = createWeatherServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Uruchamianie serwera pogody MCP (tryb stdio)...");
}

main().catch(console.error);
