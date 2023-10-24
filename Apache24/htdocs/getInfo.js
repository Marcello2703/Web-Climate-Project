function getIPAddress() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('ip-address').textContent = data.ip;
            document.getElementById('user-city').textContent = data.city;
            getWeatherInfo(data.city)
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
            document.getElementById('ip-address').textContent = 'Unable to retrieve IP address';
        });
}

function getWeatherInfo(city) {
    const apiKey = 'chave';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const temperature = data.main.temp - 273;
            const weatherDescription = data.weather[0].description;
            const humidity = data.main.humidity; 
            const feelsLike = data.main.feels_like - 273;

            document.getElementById('weather-info').textContent = `Weather in ${city}: ${temperature.toFixed(1)}°C,
            Description: ${weatherDescription}, Humidity: ${humidity}%, Feels Like: ${feelsLike.toFixed(1)}°C`;
        })
        .catch(error => {
            console.error('Error fetching weather information:', error);
            document.getElementById('weather-info').textContent = 'Unable to retrieve weather information';
        });
}

getIPAddress();