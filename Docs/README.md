# Pivot - Resume Analysis & Skill Gap Platform

A modern web application that helps users analyze their resumes, identify skill gaps for their target positions, and receive personalized learning resources and certification recommendations.

## Features

- 📄 **Resume Upload & Analysis**: Upload resumes in PDF or DOCX format
- 🎯 **Position Targeting**: Specify desired job position for personalized analysis
- 🔍 **AI-Powered Skill Gap Analysis**: Leverages OpenAI to analyze skills vs. requirements
- 📚 **Learning Resources**: Get curated resources to fill skill gaps
- 🎓 **Certification Recommendations**: Receive relevant certification suggestions
- ✨ **Modern UI**: Beautiful, responsive design with smooth user experience

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- TailwindCSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- OpenAI API for AI analysis
- Multer for file uploads
- PDF parsing (pdf-parse)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create `backend/.env` file with:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     PORT=3001
     ```

### Development

Run both frontend and backend in development mode:
```bash
npm run dev
```

This will start:
- Frontend at http://localhost:5173
- Backend at http://localhost:3001

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
pivot/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   └── package.json
├── backend/           # Express backend API
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── types/         # TypeScript types
│   └── package.json
└── package.json       # Root package.json
```

## API Endpoints

- `POST /api/analyze` - Upload resume and analyze skill gaps
- `GET /api/health` - Health check endpoint

## License

MIT

