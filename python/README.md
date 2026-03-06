# Weather MCP Server

Prosty serwer Model Context Protocol (MCP) dostarczający informacje o pogodzie za pomocą darmowego API [Open-Meteo](https://open-meteo.com/).

Serwer występuje w dwóch wersjach transportowych:
1. **Zwykłej (stdio)** – idealna do integracji z klientami MCP uruchamianymi lokalnie (np. Claude Desktop, Cursor).
2. **Webowej (SSE)** – pozwala na dostęp do serwera z poziomu przeglądarki oraz klientów wykonujących żądania HTTP.

## Wymagania

- Python 3.10+
- `pip` (menedżer pakietów Pythona)

## Instalacja

1. Sklonuj to repozytorium lub pobierz pliki.
2. Zainstaluj wymagane zależności:
```bash
pip install -r requirements.txt
```

## Dostępne narzędzia (Tools)

Serwer wystawia dwa narzędzia dla agentów AI:

1. `get_weather(latitude: float, longitude: float)`
   - Pobiera aktualną temperaturę i prędkość wiatru na podstawie dokładnych współrzędnych geograficznych.

2. `get_weather_by_city(city: str)`
   - Pobiera aktualną pogodę dla podanego miasta (najpierw wyszukuje jego współrzędne w API geokodowania, a następnie pyta o pogodę).

## Jak uruchomić?

### Opcja 1: Serwer Webowy (SSE) - Dla przeglądarek i klientów HTTP

Ta wersja uruchamia serwer na adresie `http://localhost:3000/sse`.
```bash
python weather_mcp_sse.py
```

### Opcja 2: Testowanie Zwykłego Serwera (MCP Inspector)

Aby przetestować serwer stdio w środowisku deweloperskim z UI:
```bash
npx @modelcontextprotocol/inspector uv run weather_mcp.py
```
*(wymaga zainstalowanego Node.js / `npx` oraz narzędzia `uv`)*

Alternatywnie korzystając wbudowanego polecenia mcp:
```bash
mcp dev weather_mcp.py
```

### Opcja 3: Integracja stdio z klientem MCP (np. Claude Desktop, Cursor)

Dodaj następującą konfigurację do ustawień klienta (dla Claude Desktop jest to plik `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "weather": {
      "command": "python",
      "args": [
        "ŚCIEŻKA_ABSOLUTNA_DO_PLIKU/weather_mcp.py"
      ]
    }
  }
}
```
*Uwaga: Pamiętaj, aby podmienić `ŚCIEŻKA_ABSOLUTNA_DO_PLIKU` na rzeczywistą ścieżkę do pobranego skryptu na Twoim komputerze.*

## Licencja
MIT - używaj dowolnie.
