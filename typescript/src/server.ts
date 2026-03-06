import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

export function createWeatherServer() {
    const server = new Server(
        { name: "Weather", version: "1.0.0" },
        { capabilities: { tools: {} } }
    );

    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: [
                {
                    name: "get_weather",
                    description: "Pobiera aktualną pogodę na podstawie szerokości i długości geograficznej (latitude, longitude). Wykorzystuje darmowe API open-meteo bez potrzeby kluczy API.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            latitude: { type: "number" },
                            longitude: { type: "number" },
                        },
                        required: ["latitude", "longitude"],
                    },
                },
                {
                    name: "get_weather_by_city",
                    description: "Pobiera aktualną pogodę dla konkretnego miasta. Najpierw znajduje współrzędne miasta, a potem pyta o pogodę.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            city: { type: "string" },
                        },
                        required: ["city"],
                    },
                },
            ],
        };
    });

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        if (request.params.name === "get_weather") {
            const { latitude, longitude } = request.params.arguments as any;
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;
            try {
                const resp = await fetch(url);
                if (!resp.ok) throw new Error("API error");
                const data: any = await resp.json();
                const temp = data?.current?.temperature_2m ?? "brak danych";
                const wind = data?.current?.wind_speed_10m ?? "brak danych";
                return {
                    content: [{ type: "text", text: `Temperatura: ${temp}°C, Prędkość wiatru: ${wind} km/h` }]
                };
            } catch (e: any) {
                return { content: [{ type: "text", text: `Błąd podczas pobierania pogody: ${e.message}` }] };
            }
        } else if (request.params.name === "get_weather_by_city") {
            const { city } = request.params.arguments as any;
            const geocode_url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pl&format=json`;
            try {
                const geoResp = await fetch(geocode_url);
                if (!geoResp.ok) throw new Error("Geocode API error");
                const geoData: any = await geoResp.json();
                const results = geoData.results;
                if (!results || results.length === 0) {
                    return { content: [{ type: "text", text: `Nie znaleziono miasta: ${city}` }] };
                }
                const lat = results[0].latitude;
                const lon = results[0].longitude;
                const country = results[0].country ?? "";

                const weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
                const weatherResp = await fetch(weather_url);
                if (!weatherResp.ok) throw new Error("Weather API error");
                const weatherData: any = await weatherResp.json();
                const temp = weatherData?.current?.temperature_2m ?? "brak danych";
                const wind = weatherData?.current?.wind_speed_10m ?? "brak danych";

                const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
                return {
                    content: [{ type: "text", text: `Pogoda dla ${capitalizedCity} (${country}): Temperatura: ${temp}°C, Wiatr: ${wind} km/h` }]
                };
            } catch (e: any) {
                return { content: [{ type: "text", text: `Błąd podczas pobierania pogody dla miasta ${city}: ${e.message}` }] };
            }
        }
        throw new Error("Unknown tool");
    });

    return server;
}
