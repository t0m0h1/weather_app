const apiKey = '51262d2c6de67224dfb046c313a5f6c1';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast';

const locationInput = document.getElementById('locationInput');
const searchButtonCurrent = document.getElementById('searchButtonCurrent');
const searchButtonForecast = document.getElementById('searchButtonForecast');

const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const windElement = document.getElementById('wind');

const forecastLocation = document.getElementById('forecastLocation');
const forecastTemperature = document.getElementById('forecastTemperature');
const forecastDescription = document.getElementById('forecastDescription');
const forecastWind = document.getElementById('forecastWind');

searchButtonCurrent.addEventListener('click', () => {
    const location = locationInput.value.trim(); // Remove leading/trailing spaces
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location.'); // Provide feedback for empty input
    }
});

searchButtonForecast.addEventListener('click', () => {
    const location = locationInput.value.trim(); // Remove leading/trailing spaces
    if (location) {
        fetchForecast(location);
    } else {
        alert('Please enter a location.'); // Provide feedback for empty input
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch weather data. Please try again later.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data); // Update UI with weather data
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
            alert('Error fetching weather data. Please try again later.');
        });
}

function fetchForecast(location) {
    const url = `${apiForecast}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch forecast data. Please try again later.');
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data); // Update UI with forecast data
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error.message);
            alert('Error fetching forecast data. Please try again later.');
        });
}

function displayWeather(data) {
    locationElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    windElement.textContent = `Wind: ${data.wind.speed} m/s`;
}

function displayForecast(data) {
    forecastLocation.textContent = data.city.name;
    forecastTemperature.textContent = `${Math.round(data.list[0].main.temp)}°C`;
    forecastDescription.textContent = data.list[0].weather[0].description;
    forecastWind.textContent = `Wind: ${data.list[0].wind.speed} m/s`;
}
