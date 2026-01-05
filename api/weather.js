// api/weather.js
// Vercel serverless function handler (for Vercel deployments)
import fetch from "node-fetch";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse query parameters
  // In Vercel, query params are available in req.query, but fallback to URL parsing
  let q, lat, lon;
  
  if (req.query && Object.keys(req.query).length > 0) {
    // Use req.query if available and not empty
    q = req.query.q;
    lat = req.query.lat;
    lon = req.query.lon;
  } else if (req.url) {
    // Fallback: parse from URL if req.query is empty
    try {
      const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
      q = url.searchParams.get('q');
      lat = url.searchParams.get('lat');
      lon = url.searchParams.get('lon');
    } catch (e) {
      console.error('Error parsing URL:', e);
    }
  }
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  // Validate API key
  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  // Validate input
  if (!q && (!lat || !lon)) {
    return res.status(400).json({ 
      error: "Missing query parameters. Use ?q=cityname or ?lat=latitude&lon=longitude" 
    });
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
    console.error("Weather API error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
