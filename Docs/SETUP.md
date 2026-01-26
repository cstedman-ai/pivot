# Pivot Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18 or higher
- npm (comes with Node.js)
- An OpenAI API key (get one at https://platform.openai.com/api-keys)

## Step-by-Step Setup

### 1. Install Dependencies

From the project root directory:

```bash
npm install
```

This will install dependencies for both frontend and backend workspaces.

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
NODE_ENV=development
```

**Important:** Never commit your `.env` file to version control!

### 3. Start the Application

From the project root directory:

```bash
npm run dev
```

This command will start:
- **Backend API** at http://localhost:3001
- **Frontend** at http://localhost:5173

The frontend is configured to proxy API requests to the backend automatically.

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Using the Application

1. **Enter Target Position**: Type the job title you're aiming for (e.g., "Senior Software Engineer", "Product Manager")

2. **Upload Resume**: Drag and drop your resume (PDF or DOCX format, max 5MB) or click to browse

3. **Analyze**: Click the "Analyze Resume" button

4. **View Results**: The AI will provide:
   - A summary of your current profile
   - Your existing skills
   - Skill gaps to address
   - Personalized learning resources
   - Recommended certifications
   - A step-by-step learning roadmap

## Production Build

To build for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

The backend will serve the built frontend automatically in production mode.

## Troubleshooting

### "OpenAI API key not configured"
- Make sure you created `backend/.env` with a valid OpenAI API key
- Restart the backend server after adding the key

### File upload errors
- Ensure the `backend/uploads` directory can be created
- Check file size (must be under 5MB)
- Only PDF and DOCX files are supported

### Port already in use
- Change the PORT in `backend/.env`
- Update the proxy target in `frontend/vite.config.ts` if needed

### Connection refused errors
- Ensure both backend and frontend are running
- Check that backend is listening on port 3001
- Verify frontend proxy configuration

## Project Structure

```
pivot/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── index.ts        # Server entry point
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React application
│   ├── src/
│   │   ├── main.tsx       # App entry point
│   │   ├── App.tsx        # Root component
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API client
│   │   └── types/         # TypeScript types
│   ├── package.json
│   └── tsconfig.json
└── package.json           # Root workspace config
```

## Technology Stack

### Frontend
- **React 18**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Lucide React**: Beautiful icon library

### Backend
- **Node.js + Express**: Web server framework
- **TypeScript**: Type-safe development
- **OpenAI API**: AI-powered analysis
- **Multer**: File upload handling
- **pdf-parse**: PDF text extraction
- **mammoth**: DOCX text extraction

## Features

✅ Resume upload (PDF/DOCX)
✅ AI-powered skill analysis
✅ Position-specific skill gap identification
✅ Personalized learning resources
✅ Certification recommendations
✅ Step-by-step career roadmap
✅ Modern, responsive UI
✅ Real-time analysis
✅ Error handling

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the logs in your terminal
3. Ensure your OpenAI API key is valid and has credits

