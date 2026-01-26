#!/bin/bash

echo "🧪 Quick Backend Upload Test"
echo "============================="
echo ""

# Create a simple test file
echo "Test Resume - John Doe
Email: john@example.com
Phone: 555-1234

EXPERIENCE:
Software Engineer at Tech Company (2020-2023)
- Developed web applications using React and Node.js
- Led team of 5 developers
- Improved performance by 40%

SKILLS:
- JavaScript, TypeScript
- React, Node.js
- Python, SQL" > /tmp/test-resume.txt

echo "📄 Created test resume file"
echo ""
echo "🚀 Attempting upload to backend..."
echo ""

# Try to upload
curl -X POST http://localhost:3001/api/analyze \
  -F "resume=@/tmp/test-resume.txt" \
  -F "targetPosition=Software Engineer" \
  -w "\n\n📊 HTTP Status: %{http_code}\n" \
  2>&1

echo ""
echo "✅ Test complete!"
echo ""
echo "If you see a 500 error about file type, that's OK - it means the backend is receiving requests!"
echo "If you see connection refused, the backend is not running."
