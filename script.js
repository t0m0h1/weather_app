const apiKey = '51262d2c6de67224dfb046c313a5f6c1';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButtonCurrent = document.getElementById('searchButton');
const searchButtonForecast = document.getElementById('searchButtonForecast');

// consts for the elements that will display the weather data
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const windElement = document.getElementById('wind');



// consts for the forecast elements
const forecastLocation = document.getElementById('forecastLocation');
const forecastTemperature = document.getElementById('forecastTemperature');
const forecastDescription = document.getElementById('forecastDescription');
const forecastWind = document.getElementById('forecastWind');


// Event listener for the search buttons

searchButtonCurrent.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});


searchButtonForecast.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchForecast(location);
    }
});



// Function to fetch the weather data
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
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            windElement.textContent = `Wind: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
            // Display error message on the UI
            alert('Error fetching weather data. Please try again later.');
        });
}



// fetch the forecast data
function fetchForecast(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch weather data. Please try again later.');
            }
            return response.json();
        })
        .then(data => {
            forecastLocation.textContent = data.name;
            forecastTemperature.textContent = `${Math.round(data.main.temp)}°C`;
            forecastDescription.textContent = data.weather[0].description;
            forecastWind.textContent = `Wind: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
            // Display error message on the UI
            alert('Error fetching weather data. Please try again later.');
        });
}