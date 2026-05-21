const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const countryInput = document.getElementById("country-input");
const apiKeyInput = document.getElementById("api-key-input");
const messageText = document.getElementById("message");
const resultCard = document.getElementById("weather-result");
const locationName = document.getElementById("location-name");
const conditionText = document.getElementById("condition-text");
const temperatureValue = document.getElementById("temperature-value");
const humidityValue = document.getElementById("humidity-value");
const windValue = document.getElementById("wind-value");
const weatherIcon = document.getElementById("weather-icon");

function showMessage(text, isError = true) {
  messageText.textContent = text;
  messageText.style.color = isError ? "#d04545" : "#2b9bbf";
}

function hideResult() {
  resultCard.classList.add("hidden");
}

function showResult() {
  resultCard.classList.remove("hidden");
}

function formatWind(speed) {
  return `${speed.toFixed(1)} m/s`;
}

function buildQuery(city, country) {
  const location = country ? `${city.trim()},${country.trim()}` : city.trim();
  return encodeURIComponent(location);
}

async function fetchWeather(query, apiKey) {
  const url = `${apiUrl}?q=${query}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || "Unable to fetch weather data.";
    throw new Error(message);
  }

  return response.json();
}

function renderWeather(data) {
  const name = data.name;
  const country = data.sys?.country;
  const temp = data.main?.temp;
  const weather = data.weather?.[0];
  const humidity = data.main?.humidity;
  const wind = data.wind?.speed;

  if (!name || !country || temp == null || !weather || humidity == null || wind == null) {
    throw new Error("Weather response did not include all required fields.");
  }

  locationName.textContent = `${name}, ${country}`;
  conditionText.textContent = weather.description;
  temperatureValue.textContent = temp.toFixed(1);
  humidityValue.textContent = `${humidity}%`;
  windValue.textContent = formatWind(wind);

  const iconCode = weather.icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  weatherIcon.alt = weather.main;

  showResult();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  hideResult();

  const city = cityInput.value.trim();
  const country = countryInput.value.trim();
  const apiKey = apiKeyInput.value.trim();

  if (!city) {
    showMessage("Please enter a city name.");
    return;
  }

  if (!apiKey) {
    showMessage("Please enter your OpenWeatherMap API key.");
    return;
  }

  showMessage("Looking up weather…", false);

  try {
    const query = buildQuery(city, country);
    const data = await fetchWeather(query, apiKey);
    renderWeather(data);
    showMessage("", false);
  } catch (error) {
    showMessage(error.message || "Could not load weather information.");
  }
});
