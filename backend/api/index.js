// backend/api/index.js
// Root route handler for Vercel (handles "/" requests)
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

  res.status(200).json({ 
    message: 'Country & Capital Weather Explorer API',
    status: 'running',
    endpoints: {
      weather: '/api/weather?q=cityname or /api/weather?lat=latitude&lon=longitude'
    }
  });
}
