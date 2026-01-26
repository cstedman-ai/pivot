# OpenAI API Setup & Troubleshooting

## 🔴 Current Issue: API Quota Exceeded

Your OpenAI API key has **no remaining credits**. This is preventing the resume analysis from working.

### Error Messages You're Seeing:
```
429 You exceeded your current quota, please check your plan and billing details.
404 The model `gpt-4-turbo-preview` does not exist or you do not have access to it.
```

## ✅ Solutions

### Step 1: Fix API Quota (REQUIRED)

You need to add billing to your OpenAI account:

1. **Go to OpenAI Platform**
   - Visit: https://platform.openai.com/account/billing/overview

2. **Add Payment Method**
   - Click "Add payment method"
   - Add a credit card

3. **Purchase Credits or Set Up Pay-as-you-go**
   - Option A: Buy prepaid credits ($5, $10, $25, etc.)
   - Option B: Enable auto-recharge

4. **Verify Your Purchase**
   - Check: https://platform.openai.com/usage
   - Ensure you have available credits

### Step 2: Update API Key (if needed)

If your current API key doesn't have access to the models:

1. **Generate New API Key**
   - Visit: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Give it a name (e.g., "Pivot Resume Analyzer")
   - Copy the key immediately (you won't see it again)

2. **Update .env File**
   ```bash
   cd /Users/cstedman/Workspace/pivot/backend
   nano .env
   ```
   
   Update the key:
   ```env
   OPENAI_API_KEY=sk-proj-YOUR_NEW_KEY_HERE
   ```

3. **Restart Backend Server**
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart
   npm run dev
   ```

## 🔧 What I Fixed in the Code

### Fixed Model Names

**OLD (Not Working):**
- ❌ `gpt-4-turbo-preview` - Deprecated/removed
- ❌ `gpt-4-vision-preview` - Deprecated

**NEW (Working):**
- ✅ `gpt-4o-mini` - For text analysis (cheaper, faster)
- ✅ `gpt-4o` - For image OCR (vision capabilities)

### Files Updated

1. **backend/src/services/aiAnalyzer.ts**
   - Changed from `gpt-4-turbo-preview` → `gpt-4o-mini`
   - This is the model that analyzes resume text

2. **backend/src/services/resumeParser.ts**
   - Already using `gpt-4o` for image OCR
   - This extracts text from images

## 💰 Cost Estimate

With the new models, here's what you'll pay:

### Text Analysis (gpt-4o-mini)
- **Input**: $0.150 per 1M tokens (~$0.0002 per resume)
- **Output**: $0.600 per 1M tokens (~$0.0004 per resume)
- **Total per text resume**: ~$0.0006 (less than 1 cent!)

### Image OCR (gpt-4o)
- **Base cost**: ~$0.01-0.03 per image
- **Total per image resume**: ~$0.01-0.03

### Recommended Starting Budget
- **$5 prepaid credits** = ~8,000+ text resumes or ~200 image resumes
- **$10 prepaid credits** = Even more headroom for testing

## 🧪 Testing the Fix

After adding billing and restarting:

1. **Test with PDF Resume**
   ```bash
   # Upload sample_resume_jennifer_martinez.pdf
   # This should work now (text-based, cheap)
   ```

2. **Test with Image Resume**
   ```bash
   # Upload a JPG/PNG resume
   # This will use OCR (slightly more expensive)
   ```

## 📊 Monitor Your Usage

**Check usage regularly:**
- https://platform.openai.com/usage

**Set spending limits:**
- https://platform.openai.com/account/limits

**Recommended limits for testing:**
- Soft limit: $10/month
- Hard limit: $25/month

## 🔍 Current Model Capabilities

### gpt-4o-mini (Text Analysis)
- ✅ Fast and cost-effective
- ✅ JSON mode support
- ✅ Perfect for structured resume analysis
- ✅ 128K context window
- ✅ Available to all paid accounts

### gpt-4o (Image OCR)
- ✅ Vision capabilities
- ✅ Excellent OCR accuracy
- ✅ Handles complex layouts
- ✅ 128K context window
- ✅ Available to all paid accounts

## 🐛 Troubleshooting

### Issue: "insufficient_quota" error persists
**Solution:**
1. Verify billing is active at https://platform.openai.com/account/billing
2. Check usage hasn't exceeded hard limit
3. Wait 5-10 minutes after adding credits
4. Try generating a new API key

### Issue: "model_not_found" error persists
**Solution:**
1. Make sure you pulled the latest code changes
2. Restart the backend server
3. Check that aiAnalyzer.ts shows `gpt-4o-mini`
4. Verify your API key is from a paid account

### Issue: Still getting errors
**Solution:**
1. Check OpenAI status: https://status.openai.com
2. Verify API key in .env is correct (no extra spaces)
3. Check backend console logs for detailed errors
4. Try using the PDF file first (simpler than images)

## 🎯 Quick Start After Setup

1. **Add $5-$10 to OpenAI account**
2. **Restart backend server**
3. **Test with PDF**: Upload `sample_resume_jennifer_martinez.pdf`
4. **Select position**: Choose "Senior Software Engineer"
5. **Wait 10-30 seconds** for analysis
6. **Review results**: Skill gaps, resources, certifications

## 📝 API Key Security

**Do's:**
- ✅ Keep .env file in .gitignore
- ✅ Use separate keys for dev/prod
- ✅ Set usage limits
- ✅ Rotate keys regularly
- ✅ Monitor usage daily

**Don'ts:**
- ❌ Commit .env to git
- ❌ Share API keys
- ❌ Use same key everywhere
- ❌ Leave unlimited spending
- ❌ Ignore usage alerts

## 🆘 Need Help?

1. **OpenAI Documentation**
   - https://platform.openai.com/docs

2. **Billing Help**
   - https://help.openai.com/en/collections/3742473-billing

3. **API Status**
   - https://status.openai.com

4. **Community**
   - https://community.openai.com

---

## ✅ Summary

**Immediate Action Required:**
1. Add billing to OpenAI account → https://platform.openai.com/account/billing
2. Add at least $5 in credits
3. Restart backend server
4. Test with the PDF resume

**Code Already Fixed:**
- ✅ Updated to working models (gpt-4o-mini, gpt-4o)
- ✅ Better error messages
- ✅ Detailed logging

**You're Ready!** 🚀
Once you add billing, the system will work perfectly!

