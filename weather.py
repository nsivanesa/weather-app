import os
import sys
import requests

API_URL = "https://api.openweathermap.org/data/2.5/weather"
LOCATION = "Melbourne,AU"
UNITS = "metric"


def get_api_key():
    """Load the OpenWeatherMap API key from the environment."""
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "Missing OPENWEATHER_API_KEY environment variable."
        )
    return api_key


def fetch_weather(api_key):
    """Request current weather data for Melbourne from OpenWeatherMap."""
    params = {
        "q": LOCATION,
        "appid": api_key,
        "units": UNITS,
    }

    try:
        response = requests.get(API_URL, params=params, timeout=10)
        response.raise_for_status()
    except requests.RequestException as exc:
        raise ConnectionError(
            f"Weather request failed: {exc}"
        ) from exc

    try:
        return response.json()
    except ValueError as exc:
        raise ValueError("Invalid JSON response from weather service.") from exc


def parse_weather(data):
    """Extract temperature and conditions from the API response."""
    if not isinstance(data, dict):
        raise TypeError("Unexpected weather data format.")

    main = data.get("main")
    weather = data.get("weather")

    if not main or not isinstance(main, dict):
        raise ValueError("Weather response missing 'main' section.")
    if not weather or not isinstance(weather, list):
        raise ValueError("Weather response missing 'weather' section.")

    temperature = main.get("temp")
    conditions = weather[0].get("description") if weather else None

    if temperature is None or conditions is None:
        raise ValueError("Incomplete weather information in response.")

    return temperature, conditions.capitalize()


def display_weather(temperature, conditions):
    """Print the weather information in a user-friendly format."""
    print("Current weather in Melbourne, Australia:")
    print(f"Temperature: {temperature:.1f} °C")
    print(f"Conditions: {conditions}")


def main():
    try:
        api_key = get_api_key()
        data = fetch_weather(api_key)
        temperature, conditions = parse_weather(data)
        display_weather(temperature, conditions)
    except (EnvironmentError, ConnectionError, TypeError, ValueError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
