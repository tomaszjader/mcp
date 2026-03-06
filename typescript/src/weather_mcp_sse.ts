import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createWeatherServer } from "./server.js";

const app = express();
const port = 3000;

const server = createWeatherServer();
let transport: SSEServerTransport;

app.use(express.json());

app.get("/sse", async (req, res) => {
    transport = new SSEServerTransport("/messages", res);
    await server.connect(transport);
});

app.post("/messages", async (req, res) => {
    if (transport) {
        await transport.handlePostMessage(req, res);
    } else {
        res.status(400).send("No active SSE connection");
    }
});

app.listen(port, () => {
    console.log(`Uruchamianie serwera pogody MCP (tryb SSE) na porcie ${port}...`);
    console.log(`Dostęp przez http://localhost:${port}/sse`);
});
