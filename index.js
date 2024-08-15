const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Services
const weatherService = require('./services/weatherService');
const newsService = require('./services/newsService');

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Weather-Affected News Hub' });
});

app.get('/api/weather-news', async (req, res) => {
    try {
        const city = req.query.city || 'Toronto';
        const weatherData = await weatherService.getWeather(city);
        const newsData = await newsService.getNews(city, weatherData.condition);

        res.render('index', { title: 'Weather-Affected News Hub', weather: weatherData, news: newsData });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
