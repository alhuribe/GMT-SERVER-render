// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// GTM Config
const gtmConfig = {
  containerId: process.env.GTM_CONTAINER_ID || 'GTM-KSM8PNQQ',
  authToken: process.env.GTM_AUTH_TOKEN || 'osNFw44qD-dPp46Vjnjc9Q'
};

// Middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h1>GTM Server Running</h1>
    <p>Container: ${gtmConfig.containerId}</p>
    <p>Endpoints:</p>
    <ul>
      <li>POST /gtm</li>
      <li>GET /health</li>
    </ul>
  `);
});

app.post('/gtm', (req, res) => {
  console.log('Received:', req.body);
  res.json({
    status: 'success',
    gtmId: gtmConfig.containerId,
    receivedAt: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});