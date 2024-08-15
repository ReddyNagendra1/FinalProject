const axios = require('axios');
require('dotenv').config();

async function getWeather(city) {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: `${city}`,
            searchIn: 'title',
            appid: process.env.WEATHER_API_KEY,
            units: 'metric'
        }
    });

    return {
        city: response.data.name,
        temperature: response.data.main.temp,
        condition: response.data.weather[0].description,
        windSpeed: response.data.wind.speed
    };
}

module.exports = { getWeather };

