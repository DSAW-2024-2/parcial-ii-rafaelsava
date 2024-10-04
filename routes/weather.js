const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

const{authToken} = require('./login');
router.use(authToken);

router.get('/', async (req, res) => {
    const { longitude, latitude } = req.query; 

    if (!longitude || !latitude) {
        return res.status(400).json({ error: 'Longitude and latitude are required' });
    }

    if (isNaN(longitude) || isNaN(latitude)) {
        return res.status(400).json({ error: 'Longitude and latitude must be numbers' });
    }
    
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`);
        const weatherData = await response.json();
        if (response.ok) {
            const currentTemperature = weatherData.current.temperature_2m;
            return res.json({
                message: 'The current temperature at the location with longitude ' + longitude + ' and latitude ' + latitude + ' is ' + currentTemperature + '°C'
            });
        } else {
            return res.status(500).json({ error: 'Failed to retrieve weather data from API. ' + weatherData.reason });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error occurred while fetching weather data' });
    }
});
module.exports = {router};