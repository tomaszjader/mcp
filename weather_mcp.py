from mcp.server.fastmcp import FastMCP
import httpx
import asyncio

# Tworzymy serwer MCP z nazwą "Weather"
mcp = FastMCP("Weather")

@mcp.tool()
async def get_weather(latitude: float, longitude: float) -> str:
    """
    Pobiera aktualną pogodę na podstawie szerokości i długości geograficznej (latitude, longitude).
    Wykorzystuje darmowe API open-meteo bez potrzeby kluczy API.
    """
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,wind_speed_10m"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            
            current = data.get("current", {})
            temp = current.get("temperature_2m", "brak danych")
            wind = current.get("wind_speed_10m", "brak danych")
            
            return f"Temperatura: {temp}°C, Prędkość wiatru: {wind} km/h"
        except Exception as e:
            return f"Błąd podczas pobierania pogody: {str(e)}"

@mcp.tool()
async def get_weather_by_city(city: str) -> str:
    """
    Pobiera aktualną pogodę dla konkretnego miasta.
    Najpierw znajduje współrzędne miasta, a potem pyta o pogodę.
    """
    geocode_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=pl&format=json"
    
    async with httpx.AsyncClient() as client:
        try:
            geo_response = await client.get(geocode_url)
            geo_response.raise_for_status()
            geo_data = geo_response.json()
            
            results = geo_data.get("results")
            if not results:
                return f"Nie znaleziono miasta: {city}"
            
            lat = results[0].get("latitude")
            lon = results[0].get("longitude")
            country = results[0].get("country", "")
            
            # Mając współrzędne wywołujemy API pogodowe
            weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,wind_speed_10m"
            weather_response = await client.get(weather_url)
            weather_response.raise_for_status()
            weather_data = weather_response.json()
            
            current = weather_data.get("current", {})
            temp = current.get("temperature_2m", "brak danych")
            wind = current.get("wind_speed_10m", "brak danych")
            
            return f"Pogoda dla {city.capitalize()} ({country}): Temperatura: {temp}°C, Wiatr: {wind} km/h"
            
        except Exception as e:
            return f"Błąd podczas pobierania pogody dla miasta {city}: {str(e)}"

if __name__ == "__main__":
    # Start the server (uruchomienie serwera)
    mcp.run()
