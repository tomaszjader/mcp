# Weather MCP Server

Prosty serwer Model Context Protocol (MCP) dostarczający informacje o pogodzie za pomocą darmowego API [Open-Meteo](https://open-meteo.com/).

Ten projekt dostarcza ten sam serwer w dwóch różnych technologiach:
1. **[Wersja Python](python/README.md)** 
2. **[Wersja TypeScript](typescript/README.md)**

Obie wersje posiadają identyczną funkcjonalność i występują w dwóch wariantach transportowych:
1. **Zwykłej (stdio)** – idealna do integracji z klientami MCP uruchamianymi lokalnie (np. Claude Desktop, Cursor).
2. **Webowej (SSE)** – pozwala na dostęp do serwera z poziomu przeglądarki oraz klientów wykonujących żądania HTTP.

## Dostępne narzędzia (Tools)

Serwer (niezależnie od wybranej wersji) wystawia dwa narzędzia dla agentów AI:

1. `get_weather(latitude: float, longitude: float)`
   - Pobiera aktualną temperaturę i prędkość wiatru na podstawie dokładnych współrzędnych geograficznych.

2. `get_weather_by_city(city: str)`
   - Pobiera aktualną pogodę dla podanego miasta (najpierw wyszukuje jego współrzędne w API geokodowania, a następnie pyta o pogodę).

## Instrukcje instalacji i uruchomienia

Szczegółowe instrukcje instalacji, uruchomienia i konfiguracji (np. z klientem Claude Desktop) znajdziesz w plikach README poszczególnych wersji:
- [Instrukcja dla wersji Python](python/README.md)
- [Instrukcja dla wersji TypeScript](typescript/README.md)

## Licencja
MIT - używaj dowolnie.
