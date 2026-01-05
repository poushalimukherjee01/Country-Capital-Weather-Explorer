// backend/server.js
import express from 'express';
import cors from 'cors';
import weatherRouter from './routes/weather.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route - fixes 404 on base URL
app.get('/', (req, res) => {
  res.json({ 
    message: 'Country & Capital Weather Explorer API',
    status: 'running',
    endpoints: {
      weather: '/api/weather?q=cityname or /api/weather?lat=latitude&lon=longitude'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Weather API route
app.use('/api/weather', weatherRouter);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Key configured: ${process.env.OPENWEATHER_API_KEY ? 'Yes' : 'No'}`);
});

export default app;
