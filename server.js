const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// OpenWeatherMap API key
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Weather endpoint
app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.json({ error: "City name is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const weatherData = response.data;
    res.json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      condition: weatherData.weather[0].description,
      weather: weatherData.weather[0].main,
      icon: weatherData.weather[0].icon,
      min: weatherData.main.temp_min,
      max: weatherData.main.temp_max,
    });
  } catch (error) {
    res.json({ error: "City not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
