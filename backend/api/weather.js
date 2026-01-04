// backend/api/weather.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { q, lat, lon } = req.query;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  // Validate input
  if (!q && (!lat || !lon)) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  // Build OpenWeatherMap URL
  let url = "";
  if (q) {
    // Weather by city name
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${API_KEY}`;
  } else if (lat && lon) {
    // Weather by geolocation
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Handle errors from OpenWeatherMap
    if (data.cod && data.cod !== 200) {
      return res.status(data.cod).json({ error: data.message || "Error fetching weather" });
    }

    // Return data to frontend
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
