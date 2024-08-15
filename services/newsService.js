const axios = require('axios');
require('dotenv').config();

async function getNews(city, weatherCondition) {
    const keywords = `${city} weather`;

    const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
            q: keywords,
            language: 'en',
            apiKey: process.env.NEWS_API_KEY
        }
    });

    return response.data.articles.slice(0, 5).map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage
    }));
}

module.exports = { getNews };
