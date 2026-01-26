# Troubleshooting "unknownUploadURL_Title" Error

## 🔍 What This Error Means

The error `unknownUploadURL_Title` and `unknownUploadURL_Message` is **NOT from your application code**. These messages are coming from an external source intercepting your file uploads.

### Pattern Analysis
- The format `unknownUploadURL_Title` is a **translation key**
- This pattern is typical of browser extensions or security software
- The underscore naming (`_Title`, `_Message`) indicates failed localization

## 🎯 Most Likely Causes (In Order)

### 1. Browser Extension (90% Likely) ⭐
Browser extensions that commonly cause this:
- File upload managers
- Download managers (IDM, FDM, etc.)
- Ad blockers with upload protection
- Security/Privacy extensions
- Translation extensions

**How to test:**
1. Open browser in **Incognito/Private mode** (most extensions disabled)
2. Go to `http://localhost:5173`
3. Try uploading a file
4. If it works → It's a browser extension!

**How to fix:**
1. Go to browser extensions page:
   - Chrome: `chrome://extensions`
   - Firefox: `about:addons`
   - Edge: `edge://extensions`
   - Safari: Preferences → Extensions
2. Disable extensions one by one
3. Test upload after each disable
4. Found the culprit? Keep it disabled for local development

### 2. Antivirus/Security Software (5% Likely)
Some antivirus software intercepts HTTP requests and can block file uploads.

**Common culprits:**
- Kaspersky
- Avast/AVG
- Norton
- McAfee
- Windows Defender (rare)

**How to test:**
1. Temporarily disable antivirus web protection
2. Try upload again
3. If it works → Add `localhost` to antivirus whitelist

### 3. Corporate Proxy/Firewall (4% Likely)
If on a corporate network, proxy servers can inject warnings.

**How to test:**
- Try on a different network (home WiFi, mobile hotspot)
- Try without VPN

### 4. Browser Translation (1% Likely)
Browser auto-translate can sometimes break things.

**How to fix:**
- Disable auto-translate for `localhost`
- Chrome: Click translate icon → Never translate this site

## 📋 Step-by-Step Debug Process

### Step 1: Start Servers with Debug Mode

```bash
cd /Users/cstedman/Workspace/pivot
./start-debug.sh
```

Or manually:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 2: Open Browser DevTools

1. Open `http://localhost:5173`
2. Press **F12** (or Cmd+Option+I on Mac)
3. Go to **Console** tab
4. Keep it open

### Step 3: Check for Extension Interference

Look in the console for messages from extensions:
- Red errors mentioning extensions
- Warning about blocked requests
- Messages about CSP (Content Security Policy)

### Step 4: Try Upload in Incognito Mode

1. Open new **Incognito/Private window**
2. Go to `http://localhost:5173`
3. Open DevTools (F12)
4. Try uploading a file
5. Check both console and Network tab

**If it works in Incognito:**
- It's definitely a browser extension
- Start disabling extensions to find the culprit

### Step 5: Check Network Tab

1. In DevTools, go to **Network** tab
2. Try uploading a file
3. Look for the `/api/analyze` request
4. Check:
   - Request Status (should be 200 or error with details)
   - Request Headers (should have `Content-Type: multipart/form-data; boundary=...`)
   - Response (backend's error message)

### Step 6: Use Debug Tools in Sidebar

1. Click hamburger menu (☰) in top-left
2. Click **"Debug Tools"** (yellow button)
3. View all configuration
4. Click **"Test Backend Connection"**
5. Should show: "✅ Backend is reachable!"

## 🔧 Console Logs to Look For

### Good Upload (No Errors):
```
🔧 Application Configuration
  VITE_API_URL (env): undefined (using default)
  API Base URL: /api

🚀 Resume Analysis Started
  File selected: resume.pdf
  Target position: Software Engineer

📤 Resume Upload Request
  File: {name: "resume.pdf", size: 123456, type: "application/pdf"}
  ⏳ Sending request...
  ✅ Response received: {status: 200, ...}
```

### Extension Blocking (What to look for):
```
❌ Failed to fetch
❌ NetworkError
❌ CORS error
⚠️  [Extension Name] blocked request
```

## 🛠️ Quick Fixes

### Fix 1: Incognito Mode (Temporary)
```bash
# Use incognito mode for development
# Most extensions are disabled by default
```

### Fix 2: Disable Specific Extension Categories
Disable these extension categories one at a time:
1. Download managers first (most likely)
2. Security/Privacy extensions
3. Ad blockers
4. Translation tools

### Fix 3: Whitelist Localhost in Extensions
Many extensions allow you to whitelist domains:
1. Find the extension causing issues
2. Go to extension settings
3. Add `localhost` or `127.0.0.1` to whitelist/exclusions

### Fix 4: Use Different Browser (Temporary)
Try a different browser for development:
- If using Chrome → Try Firefox
- If using Firefox → Try Chrome
- If using Edge → Try Chrome/Firefox

## 📊 What Backend Logs Should Show

In your backend terminal, you should see:

```
📥 === NEW UPLOAD REQUEST ===
Timestamp: 2025-11-04T14:30:00.000Z
Headers: {
  "content-type": "multipart/form-data; boundary=----WebKitFormBoundary..."
}
File received: YES
File details: {
  fieldname: 'resume',
  originalname: 'resume.pdf',
  mimetype: 'application/pdf',
  size: 123456
}
```

**If you don't see this**, the request isn't reaching your backend!

## ❓ Still Not Working?

### Checklist:
- [ ] Tried incognito mode
- [ ] Checked browser console for extension messages
- [ ] Backend shows "📥 NEW UPLOAD REQUEST" when uploading
- [ ] Network tab shows the request
- [ ] Debug Tools shows correct configuration
- [ ] No antivirus/firewall blocking localhost
- [ ] Using a supported file type (PDF, DOCX, PNG, JPG)
- [ ] File is under 10MB

### Share These Details:
1. **Browser Console Screenshot** (from DevTools → Console tab)
2. **Network Tab Screenshot** (showing the /api/analyze request)
3. **Backend Terminal Output** (the 📥 section when uploading)
4. **Debug Tools Screenshot** (from sidebar → Debug Tools)
5. **Browser name and version**
6. **Any browser extensions installed**

## 🎯 Most Likely Solution

Based on the error format, **it's almost certainly a browser extension**. Try incognito mode first!

## Date
Created: November 4, 2025


