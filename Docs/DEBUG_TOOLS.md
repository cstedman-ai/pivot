# Debug Tools Guide

## Overview

Comprehensive debugging tools have been added to help diagnose upload and API communication issues.

## What Was Added

### 1. Frontend Debug Panel (UI Component)
A visual debug panel in the bottom-right corner of the home page that shows:
- Environment variables and configuration
- Browser information
- Current URL details
- Quick backend connectivity test

**How to use:**
1. Click the yellow "Debug" button in the bottom-right corner
2. View all configuration settings
3. Click "Test Backend Connection" to verify backend is reachable

### 2. Frontend Console Logging
Detailed console logs for the entire upload and analysis process.

**Log Groups:**
- 🔧 **Application Configuration** - Shows on page load
  - API URL configuration
  - Environment mode (dev/prod)
  - Current window location

- 🚀 **Resume Analysis Started** - Shows when form is submitted
  - File name and target position
  - Validation results

- 📤 **Resume Upload Request** - Shows during file upload
  - File details (name, size, type, last modified)
  - FormData contents
  - API endpoint URL
  - Request/response status
  - Any errors with full details

### 3. Backend Console Logging
Comprehensive server-side logging for every upload request.

**Log Sections:**
- 📥 **NEW UPLOAD REQUEST** - Header with timestamp
  - Request headers (including Content-Type with boundary)
  - Body fields
  - File received status
  - File details (name, size, mimetype, path)
  - Target position

- Progress logs:
  - ✅ Validation passed
  - 📄 Parsing resume
  - 🤖 Analyzing with AI
  - 🗑️ Cleaned up temp file

- Success:
  - ✅ Analysis complete
  - === REQUEST COMPLETED SUCCESSFULLY ===

- Errors:
  - ❌ Specific error messages
  - Error stack traces
  - === REQUEST FAILED ===

## How to View Logs

### Browser Console (Frontend)
1. **Chrome/Edge**: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
2. **Firefox**: Press `F12` or `Cmd+Option+K` (Mac) / `Ctrl+Shift+K` (Windows)
3. **Safari**: Enable Developer menu first (Preferences → Advanced → Show Develop menu), then `Cmd+Option+C`

The console will show grouped logs with emojis for easy identification.

### Backend Terminal
The backend logs appear in the terminal where you ran `npm run dev` in the backend directory.

Look for:
- 📥 headers to identify upload requests
- Status emojis (✅ ❌ ⚠️ 📄 🤖)
- Error messages in red

## Debugging Common Issues

### Issue: "unknownUploadURL_Title" or similar errors

**What to check:**

1. **Open Debug Panel**
   - Click the yellow "Debug" button
   - Check "VITE_API_URL" value
   - Should show: `undefined (using default)` or a valid URL
   - Check "API_BASE_URL (computed)" - should be `/api` in dev mode

2. **Check Browser Console**
   - Look for the 🔧 Application Configuration group
   - Verify "API Base URL" is correct
   - Look for any red error messages in the 📤 Resume Upload Request group

3. **Check Backend Terminal**
   - Look for 📥 NEW UPLOAD REQUEST messages
   - If you don't see these when uploading, the request isn't reaching the backend
   - Check that backend is running on port 3001

4. **Test Backend Connection**
   - In Debug Panel, click "Test Backend Connection"
   - Should show: `✅ Backend is reachable!`
   - If it fails, backend is not running or not accessible

### Issue: File not being uploaded

**Debug steps:**

1. **Check File Details in Console**
   ```
   📤 Resume Upload Request
   File: {name: "resume.pdf", size: 123456, type: "application/pdf"}
   ```
   - Verify file type is supported
   - Verify file size < 10MB

2. **Check FormData in Console**
   ```
   FormData contents:
     resume: File(resume.pdf, 123456 bytes, application/pdf)
     targetPosition: Software Engineer
   ```
   - Both fields should be present

3. **Check Backend Logs**
   ```
   📥 === NEW UPLOAD REQUEST ===
   File received: YES
   ```
   - If "NO", the file isn't reaching the backend
   - Check Content-Type header - should include `boundary=`

### Issue: Backend errors

**Check backend console for:**

1. **API Key Issues**
   ```
   ❌ Error: OpenAI API key not configured
   ```
   - Solution: Check `backend/.env` file has `OPENAI_API_KEY`

2. **File Parsing Issues**
   ```
   ❌ Error: Resume text too short or empty
   ```
   - The file was uploaded but couldn't be parsed
   - Check file is valid PDF/DOC/DOCX/ODT/PNG/JPG

3. **AI Analysis Issues**
   ```
   ❌ ERROR PROCESSING REQUEST: [error details]
   ```
   - Check error stack trace for specific issue
   - May be OpenAI API rate limit or network issue

## Quick Troubleshooting Checklist

- [ ] Backend is running (`http://localhost:3001/api/health` returns OK)
- [ ] Frontend is running (`http://localhost:5173` loads)
- [ ] Debug Panel shows correct API URL
- [ ] "Test Backend Connection" succeeds
- [ ] Browser console shows 🔧 Application Configuration on page load
- [ ] File upload shows 📤 Resume Upload Request in console
- [ ] Backend terminal shows 📥 NEW UPLOAD REQUEST when uploading
- [ ] Backend shows "File received: YES"
- [ ] Content-Type header includes `boundary=` parameter

## Expected Successful Upload Flow

### Frontend Console:
```
🔧 Application Configuration
  VITE_API_URL (env): undefined (using default)
  API Base URL: /api
  Mode: development

🚀 Resume Analysis Started
  File selected: resume.pdf
  Target position: Software Engineer

📤 Resume Upload Request
  File: {name: "resume.pdf", size: 123456, type: "application/pdf", ...}
  Target Position: Software Engineer
  API Base URL: /api
  Full URL: /api/analyze
  FormData contents:
    resume: File(resume.pdf, 123456 bytes, application/pdf)
    targetPosition: Software Engineer
  ⏳ Sending request...
  ✅ Response received: {status: 200, statusText: "OK", ...}
```

### Backend Terminal:
```
📥 === NEW UPLOAD REQUEST ===
Timestamp: 2025-11-04T14:30:00.000Z
File received: YES
File details: {
  fieldname: 'resume',
  originalname: 'resume.pdf',
  mimetype: 'application/pdf',
  size: 123456,
  ...
}
Target position: Software Engineer
✅ Validation passed, processing file...
📄 Parsing resume...
Resume text length: 2500 characters
🤖 Analyzing with AI...
✅ Analysis complete
🗑️  Cleaned up temp file
=== REQUEST COMPLETED SUCCESSFULLY ===
```

## Disabling Debug Tools

Once the issue is resolved, you can:

1. **Remove Debug Panel** - Delete or comment out `<DebugPanel />` in `frontend/src/pages/Home.tsx`
2. **Reduce Console Logging** - Remove or comment out `console.log()` statements
3. **Keep for Production** - Debug tools are safe to keep, they only log to console

## Files Modified

- `frontend/src/components/DebugPanel.tsx` (NEW)
- `frontend/src/services/api.ts`
- `frontend/src/pages/Home.tsx`
- `backend/src/routes/analyze.ts`

## Date
Added: November 4, 2025


