const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API endpoints
app.get('/api/about', (req, res) => {
  res.json({
    name: 'Daniyal Alidana',
    title: 'Full Stack Developer',
    bio: 'Building amazing web experiences',
    contact: {
      github: 'https://github.com/daniyalalidana',
      email: 'your-email@example.com'
    }
  });
});

app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Portfolio Website',
      description: 'Personal portfolio and blog',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      url: 'https://daniyalalidana.github.io'
    },
    {
      id: 2,
      name: 'Backend API',
      description: 'RESTful API for portfolio data',
      technologies: ['Node.js', 'Express'],
      url: null
    }
  ]);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // In production, save to database or send email
  console.log('Contact form submission:', { name, email, message });
  
  res.json({ 
    success: true, 
    message: 'Message received. Will respond shortly!' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
