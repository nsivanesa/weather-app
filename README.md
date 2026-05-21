# WEATHERLY

A minimalist, client-side weather lookup app built with HTML, CSS, and vanilla JavaScript. WEATHERLY fetches current weather conditions from OpenWeatherMap and displays location, temperature, condition, humidity, and wind speed in a clean responsive layout.

## Files

- `index.html` — main app structure and form
- `styles.css` — visual design, layout, and responsiveness
- `script.js` — form handling, API request, and result rendering

## Setup

1. Copy or create an OpenWeatherMap API key from https://openweathermap.org/api.
2. Open `index.html` in a browser to use the app locally.
3. Enter your API key in the app form before requesting weather data.

## Usage

- Enter a city name and optional country or country code.
- Click **Get Weather**.
- The app shows the current weather, humidity, and wind speed.

## Deploy to GitHub Pages

1. Commit the files to your repository.
2. Push to GitHub.
3. In the repository settings, enable GitHub Pages and select the `main` branch and `/ (root)` folder.
4. Visit the published URL shown in GitHub Pages settings.

> Note: GitHub Pages hosts static assets publicly, so keep your API key out of the repo. Use a free-tier OpenWeatherMap key with domain restrictions if possible, and do not commit the key to source control.
