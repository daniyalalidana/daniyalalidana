# Backend API

A modern Node.js backend API for the daniyalalidana portfolio.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /health` - Check if server is running

### About
- `GET /api/about` - Get profile information

### Projects
- `GET /api/projects` - Get list of projects

### Contact
- `POST /api/contact` - Submit contact form
  - Body: `{ name, email, message }`

## Technology Stack

- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management
- **Nodemon** - Development auto-reload

## Deployment

Ready to deploy on:
- Heroku
- Vercel
- Railway
- AWS
- DigitalOcean
