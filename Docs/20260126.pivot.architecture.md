# Pivot - System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
│                      (Web Browser)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   FRONTEND (React)                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Components:                                          │   │
│  │  - Header                                             │   │
│  │  - FileUpload                                         │   │
│  │  - AnalysisResults                                    │   │
│  │                                                        │   │
│  │  Pages:                                               │   │
│  │  - Home (main interface)                              │   │
│  │                                                        │   │
│  │  Services:                                            │   │
│  │  - API Client (Axios)                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Tech: React 18, TypeScript, TailwindCSS, Vite              │
│  Port: 5173 (dev)                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API
                         │ POST /api/analyze
                         │ GET /api/health
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  BACKEND (Express.js)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Routes:                                              │   │
│  │  - /api/analyze (POST) - Resume analysis endpoint    │   │
│  │  - /api/health (GET) - Health check                  │   │
│  │                                                        │   │
│  │  Middleware:                                          │   │
│  │  - CORS                                               │   │
│  │  - Multer (file uploads)                              │   │
│  │  - Express JSON/URL parser                            │   │
│  │                                                        │   │
│  │  Services:                                            │   │
│  │  ┌──────────────────┐  ┌──────────────────┐         │   │
│  │  │ ResumeParser     │  │ AIAnalyzer       │         │   │
│  │  │ - parsePDF()     │  │ - analyzeResume()│         │   │
│  │  │ - parseDOCX()    │  │ - testConnection()│        │   │
│  │  └──────────────────┘  └──────────────────┘         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Tech: Node.js, Express, TypeScript, Multer                 │
│  Port: 3001                                                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS API Calls
                         │ (OpenAI GPT-4)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    OPENAI API                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Model: GPT-4 Turbo                                   │   │
│  │  Purpose: Resume & skill gap analysis                 │   │
│  │  Input: Resume text + target position                 │   │
│  │  Output: Structured JSON analysis                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Provider: OpenAI                                           │
│  Authentication: API Key                                    │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Resume Upload & Analysis Flow

```
User Action                    Frontend                Backend                External
    │                             │                       │                      │
    ├─1. Enter position          ─┤                       │                      │
    │   & upload resume            │                       │                      │
    │                              │                       │                      │
    ├─2. Click Analyze            ─┤                       │                      │
    │                              │                       │                      │
    │                              ├─3. POST /api/analyze ─┤                      │
    │                              │    (FormData)          │                      │
    │                              │                        │                      │
    │                              │                        ├─4. Validate file    │
    │                              │                        │    (type, size)      │
    │                              │                        │                      │
    │                              │                        ├─5. Save to uploads/ │
    │                              │                        │                      │
    │                              │                        ├─6. Parse resume     │
    │                              │                        │    (PDF/DOCX)        │
    │                              │                        │                      │
    │                              │                        ├─7. Extract text     │
    │                              │                        │                      │
    │                              │                        ├─8. Call OpenAI     ─┤
    │                              │                        │                      │
    │                              │                        │                      ├─9. Analyze
    │                              │                        │                      │    with GPT-4
    │                              │                        │                      │
    │                              │                        │                      ├─10. Return JSON
    │                              │                        │◄─────────────────────┤
    │                              │                        │                      │
    │                              │                        ├─11. Delete file     │
    │                              │                        │                      │
    │                              │◄─12. Return analysis ──┤                      │
    │                              │     (JSON)             │                      │
    │                              │                        │                      │
    │◄──13. Display results   ────┤                        │                      │
    │     (formatted UI)           │                        │                      │
```

## Component Architecture

### Frontend Component Hierarchy

```
App
 │
 ├── Header
 │    └── Logo & Title
 │
 └── Home (Page)
      │
      ├── Upload Form
      │    ├── Target Position Input
      │    └── FileUpload Component
      │         └── Drag & Drop Area
      │
      └── AnalysisResults Component
           ├── Summary Section
           ├── Current Skills
           ├── Skill Gaps
           ├── Learning Resources
           ├── Certifications
           └── Roadmap
```

### Backend Service Architecture

```
Express Server
 │
 ├── Middleware Layer
 │    ├── CORS
 │    ├── Body Parser
 │    └── Multer (File Upload)
 │
 ├── Routes Layer
 │    ├── /api/health
 │    └── /api/analyze
 │
 ├── Services Layer
 │    ├── ResumeParser Service
 │    │    ├── PDF Parser (pdf-parse)
 │    │    └── DOCX Parser (mammoth)
 │    │
 │    └── AIAnalyzer Service
 │         └── OpenAI Client
 │
 └── Types Layer
      └── TypeScript Interfaces
```

## Technology Stack Details

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 5.3.3 | Type safety |
| Vite | 5.0.8 | Build tool |
| TailwindCSS | 3.3.6 | Styling |
| Axios | 1.6.2 | HTTP client |
| Lucide React | 0.294.0 | Icons |
| React Router | 6.20.1 | Routing |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 4.18.2 | Web framework |
| TypeScript | 5.3.3 | Type safety |
| OpenAI SDK | 4.20.1 | AI integration |
| Multer | 1.4.5 | File uploads |
| pdf-parse | 1.1.1 | PDF parsing |
| mammoth | 1.6.0 | DOCX parsing |
| CORS | 2.8.5 | Cross-origin |
| dotenv | 16.3.1 | Environment vars |

## File Structure

```
pivot/
│
├── package.json              # Root workspace config
├── README.md                 # Project overview
├── SETUP.md                  # Setup instructions
├── FEATURES.md               # Feature documentation
├── API.md                    # API documentation
├── ARCHITECTURE.md           # This file
├── .gitignore                # Git exclusions
│
├── frontend/                 # React application
│   ├── package.json          # Frontend dependencies
│   ├── tsconfig.json         # TypeScript config
│   ├── vite.config.ts        # Vite configuration
│   ├── tailwind.config.js    # Tailwind config
│   ├── postcss.config.js     # PostCSS config
│   ├── index.html            # HTML entry point
│   │
│   └── src/
│       ├── main.tsx          # App entry point
│       ├── App.tsx           # Root component
│       ├── index.css         # Global styles
│       ├── vite-env.d.ts     # Vite types
│       │
│       ├── components/       # Reusable components
│       │   ├── Header.tsx
│       │   ├── FileUpload.tsx
│       │   └── AnalysisResults.tsx
│       │
│       ├── pages/            # Page components
│       │   └── Home.tsx
│       │
│       ├── services/         # API integration
│       │   └── api.ts
│       │
│       └── types/            # TypeScript types
│           └── index.ts
│
└── backend/                  # Express API
    ├── package.json          # Backend dependencies
    ├── tsconfig.json         # TypeScript config
    ├── .env.example          # Environment template
    │
    └── src/
        ├── index.ts          # Server entry point
        │
        ├── routes/           # API endpoints
        │   └── analyze.ts
        │
        ├── services/         # Business logic
        │   ├── resumeParser.ts
        │   └── aiAnalyzer.ts
        │
        └── types/            # TypeScript types
            └── index.ts
```

## Security Considerations

### Implemented
- ✅ File type validation (PDF/DOCX only)
- ✅ File size limits (5MB max)
- ✅ Environment variable for API keys
- ✅ Temporary file cleanup
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling

### Recommended for Production
- 🔒 Authentication (JWT/API keys)
- 🔒 Rate limiting
- 🔒 HTTPS enforcement
- 🔒 Input sanitization
- 🔒 Content Security Policy
- 🔒 File scanning for malware
- 🔒 API key rotation
- 🔒 Logging and monitoring

## Scalability Considerations

### Current Limitations
- Synchronous processing (blocks during analysis)
- No caching mechanism
- Single server instance
- No load balancing

### Scaling Strategies
1. **Horizontal Scaling**: Deploy multiple instances with load balancer
2. **Queue System**: Use Redis/RabbitMQ for async processing
3. **Caching**: Cache common analyses with Redis
4. **CDN**: Serve static frontend assets via CDN
5. **Database**: Add PostgreSQL for user accounts and history
6. **Microservices**: Split into separate services (upload, parse, analyze)

## Development Workflow

```
┌──────────────┐
│   Developer  │
└──────┬───────┘
       │
       ├─1. Edit code
       │
       ├─2. TypeScript compiler checks
       │
       ├─3. Hot reload (Vite/tsx watch)
       │
       ├─4. Test in browser
       │
       ├─5. Git commit
       │
       └─6. Build & deploy
```

## Deployment Architecture

### Development
```
Local Machine
├── Frontend (Vite Dev Server: 5173)
└── Backend (tsx watch: 3001)
```

### Production
```
Server/Cloud
├── Frontend (Static files served by Backend)
└── Backend (Node.js Express: 3001)
     └── Serves both API and frontend
```

## Error Handling Flow

```
Error Occurs
    │
    ├── Frontend Error
    │    ├── Network Error → Display connection error
    │    ├── Validation Error → Show field error
    │    └── API Error → Display API error message
    │
    └── Backend Error
         ├── File Error → Return 400 with message
         ├── OpenAI Error → Return 500 with message
         └── Server Error → Return 500 with message
```

## Performance Metrics

| Operation | Expected Time |
|-----------|---------------|
| File Upload | < 1 second |
| Resume Parsing | 1-3 seconds |
| AI Analysis | 5-15 seconds |
| Results Display | < 1 second |
| **Total Process** | **6-18 seconds** |

## Monitoring Points

### Key Metrics to Track
- API response times
- OpenAI API latency
- File upload sizes
- Error rates by type
- Active concurrent requests
- Resume parsing success rate
- User session duration

## Future Enhancements

### Short Term
- User authentication
- Save analysis history
- Export results to PDF
- Email results

### Medium Term
- Multiple resume comparison
- Job board integration
- Progress tracking
- Community features

### Long Term
- Mobile applications
- Enterprise features
- Advanced analytics
- Machine learning models

