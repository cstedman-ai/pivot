# Pivot - Resume Analysis & Career Development Platform

A comprehensive career development platform that helps job seekers analyze their resumes, identify skill gaps, and organize their job search materials. Features AI-powered resume analysis using OpenAI's GPT-4.

## 🌟 Features

- **AI-Powered Resume Analysis**: Upload resumes and get detailed analysis with skill gap identification
- **Multiple File Format Support**: PDF, DOCX, DOC, TXT, HTML
- **Resume Organization**: Manage and organize multiple resume versions
- **Career Progress Tracking**: Track your job search progress and goals
- **Resource Library**: Access career development resources and materials
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## 🏗️ Architecture

This is a full-stack application consisting of:

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + OpenAI API
- **File Processing**: PDF, DOCX parsing for resume analysis

## 📋 Prerequisites

- Node.js 18+ and npm
- OpenAI API key (for resume analysis features)
- Git

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone git@github.com:cstedman-ai/pivot.git
cd pivot
```

### 2. Install dependencies

```bash
npm install
```

This will install dependencies for both frontend and backend (using npm workspaces).

### 3. Configure environment variables

Create a `.env` file in the `backend/` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-api-key-here
PORT=3001
NODE_ENV=development
```

### 4. Start the development servers

From the root directory:

```bash
npm run dev
```

This will start:
- Frontend dev server at `http://localhost:5173`
- Backend API server at `http://localhost:3001`

## 🧪 Testing

- Frontend: Visit `http://localhost:5173`
- Backend health check: `http://localhost:3001/api/health`

## 📦 Building for Production

### Build both frontend and backend:

```bash
npm run build
```

### Build individually:

```bash
npm run build:frontend
npm run build:backend
```

## 🌐 Deployment

This project is configured for deployment with:
- **Frontend**: GitHub Pages (static hosting)
- **Backend**: Separate hosting service (Railway, Render, Heroku, etc.)

### Quick Deploy to GitHub Pages

1. **Deploy the backend** to your chosen hosting service (see [DEPLOYMENT.md](./DEPLOYMENT.md))

2. **Configure the frontend** with your backend API URL:

```bash
cd frontend
cp .env.production.example .env.production
# Edit .env.production and set VITE_API_URL to your backend URL
```

3. **Deploy to GitHub Pages**:

```bash
npm run deploy
```

Your site will be available at: `https://cstedman-ai.github.io/pivot/`

### Detailed Deployment Instructions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions including:
- Step-by-step GitHub Pages setup
- Backend deployment options (Railway, Render, Heroku, Vercel)
- Environment variable configuration
- Troubleshooting guide
- GitHub Actions automation

## 📁 Project Structure

```
pivot/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── contexts/      # React contexts
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── package.json
├── backend/               # Express backend API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── types/        # TypeScript type definitions
│   └── package.json
├── Docs/                  # Documentation
├── Resources/             # Sample files and scripts
├── DEPLOYMENT.md          # Deployment guide
└── package.json           # Root package.json (workspaces)
```

## 🛠️ Available Scripts

### Root Level

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run deploy` - Deploy frontend to GitHub Pages
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend

### Frontend (`cd frontend`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

### Backend (`cd backend`)

- `npm run dev` - Start with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

## 🔧 Configuration Files

- `frontend/vite.config.ts` - Vite configuration
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `backend/tsconfig.json` - TypeScript configuration
- `.github/workflows/deploy.yml` - GitHub Actions workflow

## 🔑 Environment Variables

### Backend

```env
OPENAI_API_KEY=sk-...          # Required: OpenAI API key
PORT=3001                       # Optional: API server port
NODE_ENV=development            # Environment mode
```

### Frontend

```env
VITE_API_URL=/api              # API base URL (for production, use full URL)
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `backend/.env` or `frontend/vite.config.ts`

2. **OpenAI API errors**
   - Verify your API key is valid and has credits
   - Check the key is properly set in `backend/.env`

3. **Build errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear build caches: `rm -rf frontend/dist backend/dist`

4. **CORS errors**
   - The backend is configured with CORS enabled
   - Check that the API URL is correct in the frontend

### Debug Mode

The application includes a debug panel for troubleshooting API issues. Look for the debug icon in the UI.

## 📚 Documentation

Additional documentation is available in the `Docs/` directory:

- API documentation
- Architecture overview
- Feature documentation
- Setup guides
- Troubleshooting guides

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- React and Vite teams
- All open source contributors

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation in `Docs/`
- Review the [DEPLOYMENT.md](./DEPLOYMENT.md) guide

---

**Live Demo**: https://cstedman-ai.github.io/pivot/

**Repository**: https://github.com/cstedman-ai/pivot
