# Resume Upload Error Fix

## Issue
When attempting to upload a resume, users were seeing the following error messages:
- `unknownUploadURL_Title`
- `unknownUploadURL_Message`

## Root Cause
The issue had **two problems**:

### 1. Environment Configuration Issue
The frontend `.env` file had incorrect or missing configuration for the API URL. The `VITE_API_URL` environment variable was either:
- Not defined at all, or
- Configured incorrectly on the same line as another environment variable

### 2. Axios Content-Type Header Issue (PRIMARY CAUSE)
The main issue was in `frontend/src/services/api.ts`. When uploading files with `FormData`:
- The axios instance had a default `Content-Type: application/json` header
- The code was trying to override it with `Content-Type: multipart/form-data`
- **However**, when manually setting `multipart/form-data`, the browser doesn't add the required `boundary` parameter
- The backend couldn't parse the request without the boundary, causing upload failures
- Correct format should be: `multipart/form-data; boundary=----WebKitFormBoundary...`

This is a common axios pitfall when handling file uploads.

## Fix Applied

### 1. Frontend API Service (`frontend/src/services/api.ts`) - PRIMARY FIX
**Changed the file upload implementation to use axios directly instead of the configured instance:**

Before (BROKEN):
```typescript
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeResume = async (file: File, targetPosition: string) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('targetPosition', targetPosition);

  const response = await api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // ❌ Missing boundary!
    },
  });
  return response.data.data;
};
```

After (FIXED):
```typescript
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeResume = async (file: File, targetPosition: string) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('targetPosition', targetPosition);

  // Use axios directly for file uploads - lets browser set Content-Type with boundary
  const response = await axios.post(`${API_BASE_URL}/analyze`, formData);
  return response.data.data;
};
```

**Why this works:**
- Using axios directly (not the configured instance) avoids the default `Content-Type` header
- The browser automatically sets: `Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...`
- The backend can now properly parse the multipart request

### 2. Frontend Configuration (`frontend/.env`)
- Cleaned up the `.env` file to have proper line breaks
- Left `VITE_API_URL` commented out/undefined to use the default `/api` path
- This allows Vite's development proxy (configured in `vite.config.ts`) to handle routing

**Current Configuration:**
```env
# API URL for backend (relative path for dev proxy, full URL for production)
# Leave empty to use default /api which works with Vite proxy in dev mode
# VITE_API_URL=
```

### 3. Backend Configuration (`backend/.env`)
- Ensured proper formatting with line breaks
- Verified OpenAI API key is present
- Confirmed PORT and NODE_ENV settings

## How It Works

### Development Mode
1. Frontend makes requests to `/api/analyze`
2. Vite's proxy (see `frontend/vite.config.ts`) intercepts these requests
3. Proxy forwards them to `http://localhost:3001/api/analyze`
4. Backend processes the request and returns the response

### Production Mode
- Set `VITE_API_URL` to your production backend URL
- Example: `VITE_API_URL=https://api.yourproduction.com/api`

## Testing the Fix

1. **Stop all running servers** (frontend and backend)

2. **Start the backend:**
   ```bash
   cd backend
   npm run dev
   ```
   You should see: `🚀 Pivot API server running on port 3001`

3. **Start the frontend** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```
   You should see: `Local: http://localhost:5173/`

4. **Test the upload:**
   - Navigate to `http://localhost:5173`
   - Select a target position from the dropdown
   - Upload a resume (PDF, DOC, DOCX, ODT, PNG, or JPG)
   - Click "Analyze Resume"
   - The upload should now work without showing the `unknownUploadURL` errors

## Common Issues

### Issue: Still seeing errors after the fix
**Solution:** Make sure to restart both the frontend and backend development servers. Environment variable changes require a server restart to take effect.

### Issue: Backend not responding
**Solution:** 
1. Check that the backend is running on port 3001
2. Check the backend console for errors
3. Verify the OpenAI API key is valid in `backend/.env`

### Issue: CORS errors
**Solution:** The backend has CORS enabled. If you're still seeing CORS errors:
1. Make sure both servers are running
2. Check that the frontend is accessing `http://localhost:5173`
3. Verify the proxy configuration in `frontend/vite.config.ts`

## Related Files
- `frontend/.env` - Frontend environment configuration
- `frontend/vite.config.ts` - Vite proxy configuration (lines 9-14)
- `frontend/src/services/api.ts` - API client configuration (line 4)
- `backend/.env` - Backend environment configuration
- `backend/src/index.ts` - Backend server and CORS setup

## Date
Fixed: November 4, 2025

