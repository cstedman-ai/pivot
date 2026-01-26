# Pivot - Quick Start Guide

Get up and running in 5 minutes! 🚀

## Prerequisites

- Node.js 18+ installed
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## 🎯 Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure OpenAI API Key

Create `backend/.env` file:
```bash
echo "OPENAI_API_KEY=sk-your-key-here" > backend/.env
echo "PORT=3001" >> backend/.env
```

**Important:** Replace `sk-your-key-here` with your actual OpenAI API key!

### Step 3: Start the Application

```bash
npm run dev
```

That's it! Open http://localhost:5173 in your browser.

## 📝 Using the Application

1. **Enter your target position** (e.g., "Senior Software Engineer")
2. **Upload your resume** (PDF or DOCX, max 5MB)
3. **Click "Analyze Resume"**
4. **View your personalized results:**
   - Current skills detected
   - Skill gaps to address
   - Learning resources
   - Certification recommendations
   - Step-by-step roadmap

## 🎨 What You'll See

### Before Analysis
- Clean, modern interface
- Drag-and-drop file upload
- Target position input field
- Info cards explaining the process

### After Analysis
- Summary of your profile
- Color-coded skill gaps (critical, important, nice-to-have)
- Curated learning resources with direct links
- Relevant certifications with costs and timelines
- Personalized learning roadmap

## 🔧 Troubleshooting

### "OpenAI API key not configured"
- Make sure you created `backend/.env` with your API key
- Restart the server: Stop (Ctrl+C) and run `npm run dev` again

### "Port already in use"
- Change the port in `backend/.env` to a different number (e.g., 3002)
- Update `frontend/vite.config.ts` proxy target if needed

### File upload fails
- Ensure file is PDF or DOCX format
- Check file size is under 5MB
- Make sure the file isn't corrupted

### Analysis takes too long
- Normal processing time is 6-18 seconds
- Check your internet connection
- Verify your OpenAI API key has credits

## 📚 Next Steps

Once you're comfortable with the basics:

1. **Read FEATURES.md** - Learn about all features
2. **Check API.md** - Understand the API endpoints
3. **Review ARCHITECTURE.md** - Explore system design
4. **See SETUP.md** - Detailed setup instructions

## 💡 Tips for Best Results

### For Resume Upload
- Use a well-formatted, recent resume
- Include clear skill sections
- List specific technologies and tools
- Mention projects and achievements

### For Target Position
- Be specific (e.g., "Senior React Developer" vs "Developer")
- Use standard industry titles
- Consider adding level (Junior, Mid, Senior, Lead)

### Interpreting Results

**Critical Skills** 🔴
- Must-have for the position
- Focus on these first
- Usually technical core requirements

**Important Skills** 🟠
- Significantly strengthen your profile
- Address after critical gaps
- Often specialized knowledge

**Nice-to-Have Skills** 🟡
- Competitive advantages
- Lower priority
- Can differentiate you from others

## 🎓 Example Positions to Try

- Software Engineer
- Full Stack Developer
- Data Scientist
- Product Manager
- DevOps Engineer
- UX/UI Designer
- Machine Learning Engineer
- Cloud Architect
- Cybersecurity Analyst
- Business Analyst

## 🚨 Common Mistakes to Avoid

1. **Don't use a generic position** - Be specific!
   - ❌ Bad: "Engineer"
   - ✅ Good: "Senior Backend Engineer"

2. **Don't upload a poorly formatted resume**
   - Use a standard resume template
   - Ensure text is selectable (not images)

3. **Don't ignore the roadmap**
   - Follow the steps in order
   - They're personalized to your situation

4. **Don't skip the learning resources**
   - These are curated specifically for you
   - Click through and explore them

## 🔄 Running Multiple Analyses

You can analyze different scenarios:
- Different target positions
- Updated versions of your resume
- Resumes for different people

Click "Start New Analysis" to run another analysis.

## 📊 Understanding the Analysis

### Summary
A brief overview of where you stand and your readiness for the target position.

### Current Skills
Skills the AI detected in your resume - verify these are accurate!

### Skill Gaps
What you're missing compared to typical requirements for the position.

### Learning Resources
Specific courses, tutorials, and materials to learn the missing skills.

### Certifications
Industry-recognized certifications that would strengthen your profile.

### Roadmap
A step-by-step plan to bridge your skill gaps systematically.

## 🎯 Setting Goals

After your analysis:
1. **Short term (1-3 months)**: Focus on critical skills
2. **Medium term (3-6 months)**: Address important skills
3. **Long term (6-12 months)**: Pursue certifications

## 💬 Getting Help

If you run into issues:
1. Check the console for error messages (F12 in browser)
2. Review the terminal output for backend errors
3. Verify your OpenAI API key is valid
4. Check that you have API credits remaining
5. Ensure both frontend and backend are running

## 🌟 Pro Tips

- **Save your results**: Take screenshots or copy to a doc
- **Track progress**: Re-run analysis after learning new skills
- **Be honest**: Upload your real resume for accurate results
- **Stay focused**: Don't try to learn everything at once
- **Follow the roadmap**: The steps are ordered for a reason

## 🚀 Ready to Accelerate Your Career?

Open http://localhost:5173 and start your journey! 

Good luck with your career development! 🎉

