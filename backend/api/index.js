// backend/api/index.js
// Root route handler for Vercel (handles "/" requests)
// PUBLIC API - No authentication required
export default async function handler(req, res) {
  // Enable CORS - Allow all origins for public access
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({ 
    message: 'Country & Capital Weather Explorer API',
    status: 'running',
    public: true,
    authentication: 'none required',
    endpoints: {
      weather: '/api/weather?q=cityname or /api/weather?lat=latitude&lon=longitude',
      test: '/api/test'
    },
    examples: {
      weatherByCity: '/api/weather?q=London',
      weatherByCoords: '/api/weather?lat=51.5074&lon=-0.1278'
    }
  });
}
