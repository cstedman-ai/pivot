# Pivot API Documentation

## Base URL

Development: `http://localhost:3001/api`

## Endpoints

### Health Check

Check if the API is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "message": "Pivot API is running",
  "timestamp": "2025-10-28T12:00:00.000Z"
}
```

---

### Analyze Resume

Upload a resume and get AI-powered skill gap analysis.

**Endpoint:** `POST /api/analyze`

**Content-Type:** `multipart/form-data`

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| resume | File | Yes | PDF or DOCX file (max 5MB) |
| targetPosition | String | Yes | Desired job position |

**Example Request (using cURL):**
```bash
curl -X POST http://localhost:3001/api/analyze \
  -F "resume=@/path/to/resume.pdf" \
  -F "targetPosition=Senior Software Engineer"
```

**Example Request (using JavaScript/Axios):**
```javascript
const formData = new FormData();
formData.append('resume', fileObject);
formData.append('targetPosition', 'Senior Software Engineer');

const response = await axios.post('/api/analyze', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "summary": "Brief overview of candidate's profile...",
    "currentSkills": [
      "JavaScript",
      "React",
      "Node.js"
    ],
    "skillGaps": [
      {
        "skill": "TypeScript",
        "importance": "critical",
        "description": "Type safety is essential for senior roles..."
      },
      {
        "skill": "System Design",
        "importance": "important",
        "description": "Senior engineers must design scalable systems..."
      }
    ],
    "learningResources": [
      {
        "title": "TypeScript Deep Dive",
        "type": "course",
        "provider": "Udemy",
        "url": "https://example.com/typescript-course",
        "estimatedTime": "20 hours",
        "level": "intermediate"
      }
    ],
    "certifications": [
      {
        "name": "AWS Certified Solutions Architect",
        "provider": "Amazon Web Services",
        "relevance": "Essential for cloud architecture skills...",
        "url": "https://aws.amazon.com/certification/",
        "estimatedCost": "$150",
        "preparationTime": "2-3 months"
      }
    ],
    "roadmap": [
      "Step 1: Complete TypeScript fundamentals course",
      "Step 2: Build 2-3 projects using TypeScript",
      "Step 3: Study system design patterns"
    ]
  }
}
```

**Error Responses:**

**400 Bad Request** - Missing or invalid input:
```json
{
  "error": "No resume file uploaded",
  "success": false
}
```

```json
{
  "error": "Target position is required",
  "success": false
}
```

```json
{
  "error": "Only PDF and DOCX files are allowed",
  "success": false
}
```

```json
{
  "error": "Resume appears to be empty or too short. Please upload a valid resume.",
  "success": false
}
```

**500 Internal Server Error** - Server or processing error:
```json
{
  "error": "Failed to analyze resume. Please try again.",
  "success": false
}
```

```json
{
  "error": "OpenAI API key not configured",
  "success": false
}
```

## Data Models

### SkillGap
```typescript
interface SkillGap {
  skill: string;
  importance: 'critical' | 'important' | 'nice-to-have';
  description: string;
}
```

### LearningResource
```typescript
interface LearningResource {
  title: string;
  type: 'course' | 'documentation' | 'tutorial' | 'book' | 'video';
  provider: string;
  url: string;
  estimatedTime: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}
```

### Certification
```typescript
interface Certification {
  name: string;
  provider: string;
  relevance: string;
  url: string;
  estimatedCost: string;
  preparationTime: string;
}
```

### AnalysisResult
```typescript
interface AnalysisResult {
  summary: string;
  currentSkills: string[];
  skillGaps: SkillGap[];
  learningResources: LearningResource[];
  certifications: Certification[];
  roadmap: string[];
}
```

## Rate Limits

Currently, there are no rate limits enforced. However, consider implementing rate limiting in production to prevent abuse.

## Error Handling

All errors follow this structure:
```typescript
{
  error: string;      // Human-readable error message
  success: false;     // Always false for errors
}
```

## CORS Configuration

The API is configured to accept requests from any origin in development. In production, configure CORS appropriately in `backend/src/index.ts`.

## File Upload Specifications

- **Maximum file size:** 5MB
- **Allowed MIME types:**
  - `application/pdf`
  - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
  - `application/msword`
- **Upload directory:** `backend/uploads/` (automatically created)
- **File cleanup:** Files are automatically deleted after processing

## Authentication

Currently, the API does not require authentication. For production use, consider implementing:
- API key authentication
- JWT tokens
- Rate limiting per user/IP
- User accounts

## Testing the API

### Using cURL

**Health check:**
```bash
curl http://localhost:3001/api/health
```

**Analyze resume:**
```bash
curl -X POST http://localhost:3001/api/analyze \
  -F "resume=@./my-resume.pdf" \
  -F "targetPosition=Product Manager"
```

### Using Postman

1. Create a new POST request to `http://localhost:3001/api/analyze`
2. Go to "Body" tab
3. Select "form-data"
4. Add key "resume" with type "File" and upload your file
5. Add key "targetPosition" with type "Text" and enter the position
6. Send the request

### Using HTTPie

```bash
http -f POST localhost:3001/api/analyze \
  resume@my-resume.pdf \
  targetPosition="Data Scientist"
```

## Environment Variables

Required environment variables for the backend:

```env
OPENAI_API_KEY=sk-your-api-key    # Required for AI analysis
PORT=3001                          # Server port (optional, defaults to 3001)
NODE_ENV=development               # Environment (optional)
```

## Dependencies

The API relies on the following external services:
- **OpenAI API**: For AI-powered resume analysis
  - Ensure your API key has sufficient credits
  - Uses GPT-4 Turbo model

## Performance Considerations

- Resume parsing typically takes 1-3 seconds
- AI analysis typically takes 5-15 seconds
- Total processing time: 6-18 seconds per request
- Consider implementing caching for repeated analyses
- Use queuing system for high-volume scenarios

