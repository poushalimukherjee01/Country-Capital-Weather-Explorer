// backend/api/test.js
// Public test endpoint - No authentication required
// This endpoint allows recruiters/testers to verify the API is working
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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return a simple test response
  res.status(200).json({
    success: true,
    message: 'API is working correctly! No authentication required.',
    timestamp: new Date().toISOString(),
    endpoints: {
      weather: '/api/weather?q=London',
      test: '/api/test'
    },
    note: 'This API is publicly accessible for testing purposes'
  });
}
