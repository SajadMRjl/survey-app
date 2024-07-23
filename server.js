const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Proxy API requests
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:8000', // Backend server URL
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
);

// The "catchall" handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
