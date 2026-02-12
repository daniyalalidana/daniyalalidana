# Daniyalalidana Portfolio - Full Stack Application

A modern, production-ready full-stack portfolio website built with Node.js/Express backend and vanilla JavaScript frontend.

## Project Structure

```
├── frontend/                 # Static frontend files
│   ├── index.html           # Main HTML
│   ├── styles.css           # Styling
│   ├── script.js            # Main JavaScript
│   └── js/
│       └── api.js           # API service layer
├── backend/                 # Node.js Express API
│   ├── server.js            # Main server file
│   ├── package.json         # Dependencies
│   └── ...
├── docker-compose.yml       # Docker compose setup
├── Dockerfile.backend       # Backend Docker image
└── Dockerfile.frontend      # Frontend Docker image
```

## Features

✅ **Backend API (Node.js/Express)**
- RESTful API endpoints
- CORS enabled
- Health check endpoint
- Environment variable configuration
- Production-ready error handling

✅ **Frontend**
- Responsive design
- Dark/Light theme toggle
- Dynamic content loading from API
- Service layer for API communication
- Mobile-friendly navigation

✅ **DevOps**
- Docker containerization
- Docker Compose orchestration
- GitHub Actions CI/CD pipeline
- Health checks and auto-restart

✅ **Professional Standards**
- Modular code structure
- Environment configuration
- Git workflow
- Production deployment ready

## Quick Start

### Local Development

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Start Backend Server**
```bash
npm run dev
```
Server runs on: `http://localhost:5000`

3. **Serve Frontend**
```bash
# Using Python
python -m http.server 8000

# Or using Node http-server
npx http-server -p 8000
```
Frontend available at: `http://localhost:8000`

### Using Docker

1. **Build and Run with Docker Compose**
```bash
docker-compose up --build
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:8080`

2. **Just backend**
```bash
docker build -f Dockerfile.backend -t backend .
docker run -p 5000:5000 backend
```

3. **Just frontend**
```bash
docker build -f Dockerfile.frontend -t frontend .
docker run -p 8080:8080 frontend
```

## API Endpoints

### Health Check
```
GET /health
```
Response: `{ "status": "ok", "timestamp": "..." }`

### Get Profile
```
GET /api/about
```

### Get Projects
```
GET /api/projects
```

### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
```

For frontend, the API URL can be configured in `js/api.js`:
```javascript
const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';
```

## Development Workflow

1. **Frontend**: Edit HTML, CSS, JS files directly
2. **Backend**: Make changes and restart server (`npm run dev` auto-reloads)
3. **API Integration**: Update `js/api.js` for new endpoints

## Deployment Options

### Heroku
```bash
git push heroku main
```

### Vercel (Frontend)
```bash
vercel deploy
```

### Railway.app
```bash
railway link
railway deploy
```

### DigitalOcean / AWS
Use Docker images for deployment.

## Monitoring & Logs

Docker Compose logs:
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

Check backend health:
```bash
curl http://localhost:5000/health
```

## Performance Tips

1. Enable gzip compression in production
2. Use CDN for static assets
3. Implement caching headers
4. Monitor API response times

## Security Considerations

- CORS configured for trusted origins
- Input validation on contact form
- XSS protection (HTML escaping)
- No sensitive data in client-side code

## File Structure

```
.
├── backend/
│   ├── server.js              # Express app
│   ├── package.json           # Dependencies
│   ├── .env.example           # Environment template
│   ├── .gitignore
│   └── README.md              # Backend docs
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions
├── index.html
├── styles.css
├── script.js
├── js/
│   └── api.js                 # API service
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── .dockerignore
└── .gitignore
```

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: (Ready for MongoDB/PostgreSQL)
- **Deployment**: Docker, GitHub Actions
- **Hosting**: Heroku, Vercel, AWS, etc.

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - feel free to use for personal and commercial projects

## Contact

- GitHub: [@daniyalalidana](https://github.com/daniyalalidana)
- Email: your-email@example.com
- LinkedIn: [Daniyal Alidana](https://linkedin.com/in/daniyalalidana)

---

Built with ❤️ using modern web technologies
