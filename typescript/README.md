# Weather MCP Server (TypeScript)

Wersja w TypeScripcie dla serwera MCP dostarczającego pogodę. Oferuje identyczne dwie wersje transportowe co implementacja w Pythonie.

## Instalacja

```bash
npm install
```

## Budowanie i Uruchamianie

Najpierw skompiluj projekt za pomocą TypeScript:
```bash
npm run build
```

### Opcja 1: Serwer Webowy (SSE) - Dla przeglądarek i HTTP

Ta wersja uruchamia serwer na adresie `http://localhost:3000/sse`

```bash
npm run start:sse
```

### Opcja 2: Testowanie Zwykłego Serwera (stdio)

Aby przetestować serwer po kompilacji:

```bash
npx @modelcontextprotocol/inspector node dist/weather_mcp.js
```

Możesz też użyć wbudowanego w klienta Claude dodając do pliku `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "weather_ts": {
      "command": "node",
      "args": [
        "ŚCIEŻKA_ABSOLUTNA_DO_PLIKU/typescript/dist/weather_mcp.js"
      ]
    }
  }
}
```
