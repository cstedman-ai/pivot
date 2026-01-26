import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { ResumeParser } from '../services/resumeParser';
import { AIAnalyzer } from '../services/aiAnalyzer';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (increased for images)
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.oasis.opendocument.text',
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.odt', '.png', '.jpg', '.jpeg'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (allowedMimes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, ODT, PNG, and JPG files are allowed'));
    }
  },
});

router.post('/analyze', upload.single('resume'), async (req: Request, res: Response) => {
  let filePath: string | undefined;

  console.log('\n📥 === NEW UPLOAD REQUEST ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body fields:', Object.keys(req.body));
  console.log('File received:', req.file ? 'YES' : 'NO');
  
  if (req.file) {
    console.log('File details:', {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });
  }

  try {
    if (!req.file) {
      console.error('❌ Error: No file in request');
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    const { targetPosition } = req.body;
    console.log('Target position:', targetPosition);

    if (!targetPosition || typeof targetPosition !== 'string') {
      console.error('❌ Error: Invalid target position');
      return res.status(400).json({ error: 'Target position is required' });
    }

    filePath = req.file.path;
    console.log('✅ Validation passed, processing file...');

    // Get API key for image parsing (if needed)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('❌ Error: OpenAI API key not configured');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Parse resume (pass API key for image OCR)
    console.log('📄 Parsing resume...');
    const parser = new ResumeParser(apiKey);
    const resumeText = await parser.parseResume(filePath, req.file.mimetype);
    console.log('Resume text length:', resumeText.length, 'characters');

    if (!resumeText || resumeText.trim().length < 50) {
      console.error('❌ Error: Resume text too short or empty');
      return res.status(400).json({ 
        error: 'Resume appears to be empty or too short. Please upload a valid resume.' 
      });
    }

    // Analyze with AI
    console.log('🤖 Analyzing with AI...');
    const analyzer = new AIAnalyzer(apiKey);
    const analysis = await analyzer.analyzeResume(resumeText, targetPosition);
    console.log('✅ Analysis complete');

    // Clean up uploaded file
    await fs.unlink(filePath);
    console.log('🗑️  Cleaned up temp file');
    console.log('=== REQUEST COMPLETED SUCCESSFULLY ===\n');

    res.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    // Clean up file on error
    if (filePath) {
      try {
        await fs.unlink(filePath);
        console.log('🗑️  Cleaned up temp file after error');
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    console.error('❌ ERROR PROCESSING REQUEST:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.log('=== REQUEST FAILED ===\n');
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ 
      error: errorMessage,
      success: false 
    });
  }
});

export default router;

