import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { ResumeParser } from '../services/resumeParser';
import OpenAI from 'openai';
import PDFDocument from 'pdfkit';
import JSZip from 'jszip';

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
  limits: { fileSize: 10 * 1024 * 1024 },
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

// Parse resume to structured data using AI
router.post('/parse', upload.single('resume'), async (req: Request, res: Response) => {
  let filePath: string | undefined;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    filePath = req.file.path;
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Parse resume text
    const parser = new ResumeParser(apiKey);
    const resumeText = await parser.parseResume(filePath, req.file.mimetype);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ 
        error: 'Resume appears to be empty or too short. Please upload a valid resume.' 
      });
    }

    // Use AI to structure the resume data
    const openai = new OpenAI({ apiKey });
    const structuredData = await parseResumeWithAI(openai, resumeText);

    // Clean up uploaded file
    await fs.unlink(filePath);

    res.json({
      success: true,
      data: {
        ...structuredData,
        rawText: resumeText,
      },
    });
  } catch (error) {
    if (filePath) {
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage, success: false });
  }
});

// Export resume in various formats
router.post('/export', async (req: Request, res: Response) => {
  try {
    const { resumeData, format } = req.body;

    if (!resumeData || !format) {
      return res.status(400).json({ error: 'Resume data and format are required' });
    }

    let content: Buffer | string;
    let contentType: string;
    let filename: string;

    switch (format) {
      case 'json':
        content = JSON.stringify(resumeData, null, 2);
        contentType = 'application/json';
        filename = 'resume.json';
        break;

      case 'md':
        content = generateMarkdown(resumeData);
        contentType = 'text/markdown';
        filename = 'resume.md';
        break;

      case 'pdf':
        content = await generatePDF(resumeData);
        contentType = 'application/pdf';
        filename = 'resume.pdf';
        break;

      case 'odt':
        content = await generateODT(resumeData);
        contentType = 'application/vnd.oasis.opendocument.text';
        filename = 'resume.odt';
        break;

      default:
        return res.status(400).json({ error: 'Unsupported export format' });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(content);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Export failed';
    res.status(500).json({ error: errorMessage });
  }
});

// AI-powered resume parsing
async function parseResumeWithAI(openai: OpenAI, resumeText: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a resume parser. Extract structured data from the resume text and return it as JSON. 
        The JSON must follow this exact structure:
        {
          "contact": {
            "fullName": "string",
            "email": "string",
            "phone": "string",
            "location": "string",
            "linkedin": "string or null",
            "website": "string or null"
          },
          "summary": "string (professional summary or objective)",
          "experience": [
            {
              "id": "unique string",
              "company": "string",
              "position": "string",
              "location": "string",
              "startDate": "string (e.g., 'Jan 2020')",
              "endDate": "string (e.g., 'Present' or 'Dec 2023')",
              "current": boolean,
              "highlights": ["array of bullet points"]
            }
          ],
          "education": [
            {
              "id": "unique string",
              "institution": "string",
              "degree": "string",
              "field": "string",
              "location": "string",
              "graduationDate": "string",
              "gpa": "string or null",
              "highlights": ["array of achievements"]
            }
          ],
          "skills": ["array of skills"],
          "certifications": ["array of certifications"],
          "languages": ["array of languages"]
        }
        Return ONLY valid JSON, no markdown or explanations.`,
      },
      {
        role: 'user',
        content: resumeText,
      },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('Failed to parse resume structure');
  }

  return JSON.parse(content);
}

// Generate Markdown from resume data
function generateMarkdown(data: any): string {
  const { contact, summary, experience, education, skills, certifications, languages } = data;

  let md = `# ${contact.fullName}\n\n`;
  
  // Contact info
  const contactParts = [contact.email, contact.phone, contact.location].filter(Boolean);
  if (contact.linkedin) contactParts.push(`[LinkedIn](${contact.linkedin})`);
  if (contact.website) contactParts.push(`[Website](${contact.website})`);
  md += contactParts.join(' | ') + '\n\n';

  // Summary
  if (summary) {
    md += `## Summary\n\n${summary}\n\n`;
  }

  // Experience
  if (experience?.length) {
    md += `## Experience\n\n`;
    for (const job of experience) {
      md += `### ${job.position} at ${job.company}\n`;
      md += `*${job.startDate} - ${job.endDate}* | ${job.location}\n\n`;
      if (job.highlights?.length) {
        for (const highlight of job.highlights) {
          md += `- ${highlight}\n`;
        }
      }
      md += '\n';
    }
  }

  // Education
  if (education?.length) {
    md += `## Education\n\n`;
    for (const edu of education) {
      md += `### ${edu.degree} in ${edu.field}\n`;
      md += `**${edu.institution}** | ${edu.graduationDate}`;
      if (edu.gpa) md += ` | GPA: ${edu.gpa}`;
      md += '\n';
      if (edu.highlights?.length) {
        for (const highlight of edu.highlights) {
          md += `- ${highlight}\n`;
        }
      }
      md += '\n';
    }
  }

  // Skills
  if (skills?.length) {
    md += `## Skills\n\n${skills.join(', ')}\n\n`;
  }

  // Certifications
  if (certifications?.length) {
    md += `## Certifications\n\n`;
    for (const cert of certifications) {
      md += `- ${cert}\n`;
    }
    md += '\n';
  }

  // Languages
  if (languages?.length) {
    md += `## Languages\n\n${languages.join(', ')}\n`;
  }

  return md;
}

// Generate PDF from resume data
async function generatePDF(data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const { contact, summary, experience, education, skills, certifications, languages } = data;

    // Header with name
    doc.fontSize(24).font('Helvetica-Bold').text(contact.fullName, { align: 'center' });
    doc.moveDown(0.3);

    // Contact info
    doc.fontSize(10).font('Helvetica');
    const contactLine = [contact.email, contact.phone, contact.location].filter(Boolean).join('  •  ');
    doc.text(contactLine, { align: 'center' });
    
    if (contact.linkedin || contact.website) {
      const links = [contact.linkedin, contact.website].filter(Boolean).join('  •  ');
      doc.text(links, { align: 'center' });
    }
    
    doc.moveDown();

    // Summary
    if (summary) {
      doc.fontSize(12).font('Helvetica-Bold').text('SUMMARY');
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.3);
      doc.fontSize(10).font('Helvetica').text(summary);
      doc.moveDown();
    }

    // Experience
    if (experience?.length) {
      doc.fontSize(12).font('Helvetica-Bold').text('EXPERIENCE');
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.3);

      for (const job of experience) {
        doc.fontSize(11).font('Helvetica-Bold').text(job.position);
        doc.fontSize(10).font('Helvetica')
          .text(`${job.company} | ${job.location} | ${job.startDate} - ${job.endDate}`);
        doc.moveDown(0.2);
        
        if (job.highlights?.length) {
          for (const highlight of job.highlights) {
            doc.text(`• ${highlight}`, { indent: 10 });
          }
        }
        doc.moveDown(0.5);
      }
    }

    // Education
    if (education?.length) {
      doc.fontSize(12).font('Helvetica-Bold').text('EDUCATION');
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.3);

      for (const edu of education) {
        doc.fontSize(11).font('Helvetica-Bold').text(`${edu.degree} in ${edu.field}`);
        let eduLine = `${edu.institution} | ${edu.graduationDate}`;
        if (edu.gpa) eduLine += ` | GPA: ${edu.gpa}`;
        doc.fontSize(10).font('Helvetica').text(eduLine);
        
        if (edu.highlights?.length) {
          for (const highlight of edu.highlights) {
            doc.text(`• ${highlight}`, { indent: 10 });
          }
        }
        doc.moveDown(0.5);
      }
    }

    // Skills
    if (skills?.length) {
      doc.fontSize(12).font('Helvetica-Bold').text('SKILLS');
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.3);
      doc.fontSize(10).font('Helvetica').text(skills.join('  •  '));
      doc.moveDown();
    }

    // Certifications
    if (certifications?.length) {
      doc.fontSize(12).font('Helvetica-Bold').text('CERTIFICATIONS');
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.3);
      for (const cert of certifications) {
        doc.fontSize(10).font('Helvetica').text(`• ${cert}`);
      }
      doc.moveDown();
    }

    // Languages
    if (languages?.length) {
      doc.fontSize(12).font('Helvetica-Bold').text('LANGUAGES');
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.3);
      doc.fontSize(10).font('Helvetica').text(languages.join('  •  '));
    }

    doc.end();
  });
}

// Generate ODT from resume data
async function generateODT(data: any): Promise<Buffer> {
  const zip = new JSZip();

  // ODT manifest
  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
  <manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.text"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
  <manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`;

  // Styles
  const styles = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-styles xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
  xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0">
  <office:styles>
    <style:style style:name="Heading1" style:family="paragraph">
      <style:text-properties fo:font-size="18pt" fo:font-weight="bold"/>
    </style:style>
    <style:style style:name="Heading2" style:family="paragraph">
      <style:text-properties fo:font-size="14pt" fo:font-weight="bold"/>
    </style:style>
    <style:style style:name="Bold" style:family="text">
      <style:text-properties fo:font-weight="bold"/>
    </style:style>
  </office:styles>
</office:document-styles>`;

  // Content
  const { contact, summary, experience, education, skills, certifications, languages } = data;
  
  let bodyContent = '';
  
  // Name
  bodyContent += `<text:p text:style-name="Heading1">${escapeXml(contact.fullName)}</text:p>`;
  
  // Contact
  const contactLine = [contact.email, contact.phone, contact.location].filter(Boolean).join(' • ');
  bodyContent += `<text:p>${escapeXml(contactLine)}</text:p>`;
  
  if (contact.linkedin) bodyContent += `<text:p>${escapeXml(contact.linkedin)}</text:p>`;
  if (contact.website) bodyContent += `<text:p>${escapeXml(contact.website)}</text:p>`;

  // Summary
  if (summary) {
    bodyContent += `<text:p text:style-name="Heading2">Summary</text:p>`;
    bodyContent += `<text:p>${escapeXml(summary)}</text:p>`;
  }

  // Experience
  if (experience?.length) {
    bodyContent += `<text:p text:style-name="Heading2">Experience</text:p>`;
    for (const job of experience) {
      bodyContent += `<text:p><text:span text:style-name="Bold">${escapeXml(job.position)}</text:span></text:p>`;
      bodyContent += `<text:p>${escapeXml(job.company)} | ${escapeXml(job.location)} | ${escapeXml(job.startDate)} - ${escapeXml(job.endDate)}</text:p>`;
      for (const highlight of job.highlights || []) {
        bodyContent += `<text:p>• ${escapeXml(highlight)}</text:p>`;
      }
    }
  }

  // Education
  if (education?.length) {
    bodyContent += `<text:p text:style-name="Heading2">Education</text:p>`;
    for (const edu of education) {
      bodyContent += `<text:p><text:span text:style-name="Bold">${escapeXml(edu.degree)} in ${escapeXml(edu.field)}</text:span></text:p>`;
      let eduLine = `${edu.institution} | ${edu.graduationDate}`;
      if (edu.gpa) eduLine += ` | GPA: ${edu.gpa}`;
      bodyContent += `<text:p>${escapeXml(eduLine)}</text:p>`;
    }
  }

  // Skills
  if (skills?.length) {
    bodyContent += `<text:p text:style-name="Heading2">Skills</text:p>`;
    bodyContent += `<text:p>${escapeXml(skills.join(', '))}</text:p>`;
  }

  // Certifications
  if (certifications?.length) {
    bodyContent += `<text:p text:style-name="Heading2">Certifications</text:p>`;
    for (const cert of certifications) {
      bodyContent += `<text:p>• ${escapeXml(cert)}</text:p>`;
    }
  }

  // Languages
  if (languages?.length) {
    bodyContent += `<text:p text:style-name="Heading2">Languages</text:p>`;
    bodyContent += `<text:p>${escapeXml(languages.join(', '))}</text:p>`;
  }

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0">
  <office:body>
    <office:text>
      ${bodyContent}
    </office:text>
  </office:body>
</office:document-content>`;

  zip.file('mimetype', 'application/vnd.oasis.opendocument.text');
  zip.file('META-INF/manifest.xml', manifest);
  zip.file('content.xml', content);
  zip.file('styles.xml', styles);

  return zip.generateAsync({ type: 'nodebuffer' });
}

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default router;
