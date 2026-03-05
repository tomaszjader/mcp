import uvicorn
from weather_mcp import mcp

# Tworzymy osobną aplikację używającą Server-Sent Events (SSE)
# To pozwala na korzystanie z serwera w przeglądarce i innych narzędziach po HTTP.
app = mcp.sse_app()

if __name__ == "__main__":
    print("Uruchamianie serwera pogody MCP (tryb SSE) na porcie 3000...")
    print("Dostęp przez http://localhost:3000/sse")
    # Uruchamiamy aplikację uvicorn tak, by można ją było podpiąć jako serwer http/sse
    uvicorn.run("weather_mcp_sse:app", host="0.0.0.0", port=3000)
