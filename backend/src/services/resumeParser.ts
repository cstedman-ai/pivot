import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs/promises';
import JSZip from 'jszip';
import { parseString } from 'xml2js';
import OpenAI from 'openai';

export class ResumeParser {
  private openai: OpenAI | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async parseResume(filePath: string, mimeType: string): Promise<string> {
    try {
      if (mimeType === 'application/pdf') {
        return await this.parsePDF(filePath);
      } else if (
        mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mimeType === 'application/msword'
      ) {
        return await this.parseDOCX(filePath);
      } else if (mimeType === 'application/vnd.oasis.opendocument.text') {
        return await this.parseODT(filePath);
      } else if (mimeType === 'image/png' || mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
        return await this.parseImage(filePath);
      } else {
        throw new Error('Unsupported file type. Please upload PDF, DOC, DOCX, ODT, PNG, or JPG files.');
      }
    } catch (error) {
      console.error('Error parsing resume:', error);
      throw new Error('Failed to parse resume. Please ensure the file is not corrupted.');
    }
  }

  private async parsePDF(filePath: string): Promise<string> {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  }

  private async parseDOCX(filePath: string): Promise<string> {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  private async parseODT(filePath: string): Promise<string> {
    const dataBuffer = await fs.readFile(filePath);
    const zip = await JSZip.loadAsync(dataBuffer);
    
    const contentFile = zip.file('content.xml');
    if (!contentFile) {
      throw new Error('Invalid ODT file: content.xml not found');
    }
    
    const contentXml = await contentFile.async('text');
    
    return new Promise((resolve, reject) => {
      parseString(contentXml, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        
        try {
          // Extract text from the XML structure
          const text = this.extractTextFromODTXml(result);
          resolve(text);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private extractTextFromODTXml(xmlObj: any): string {
    let text = '';
    
    const traverse = (obj: any) => {
      if (typeof obj === 'string') {
        text += obj + ' ';
      } else if (Array.isArray(obj)) {
        obj.forEach(item => traverse(item));
      } else if (obj && typeof obj === 'object') {
        // Check for text nodes
        if (obj['text:p']) {
          traverse(obj['text:p']);
          text += '\n';
        }
        if (obj['text:h']) {
          traverse(obj['text:h']);
          text += '\n';
        }
        if (obj['text:span']) {
          traverse(obj['text:span']);
        }
        if (obj['_']) {
          text += obj['_'] + ' ';
        }
        
        // Traverse all other properties
        Object.keys(obj).forEach(key => {
          if (key !== '_' && key !== '$') {
            traverse(obj[key]);
          }
        });
      }
    };
    
    traverse(xmlObj);
    return text.trim();
  }

  private async parseImage(filePath: string): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured for image parsing');
    }

    try {
      console.log('Starting image parsing for:', filePath);
      
      // Read the image file as base64
      const imageBuffer = await fs.readFile(filePath);
      console.log('Image buffer size:', imageBuffer.length, 'bytes');
      
      const base64Image = imageBuffer.toString('base64');
      console.log('Base64 encoded, length:', base64Image.length);
      
      // Determine the mime type based on file extension
      const ext = filePath.toLowerCase().split('.').pop();
      const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
      console.log('Detected MIME type:', mimeType);
      
      // Use GPT-4 Vision to extract text from the image
      console.log('Calling OpenAI Vision API...');
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o', // Updated to use gpt-4o which has vision capabilities
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Extract all text from this resume image. Preserve the formatting and structure as much as possible. Include all contact information, work experience, education, skills, and any other text visible in the image. Return ONLY the extracted text, no additional commentary or explanation.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 4096,
      });

      console.log('OpenAI API response received');
      const extractedText = response.choices[0]?.message?.content;
      
      if (!extractedText) {
        console.error('No content in API response');
        throw new Error('No text could be extracted from the image');
      }

      console.log('Extracted text length:', extractedText.length, 'characters');
      console.log('First 200 chars:', extractedText.substring(0, 200));
      
      return extractedText;
    } catch (error: any) {
      console.error('Detailed error parsing image with OCR:', {
        message: error.message,
        type: error.constructor.name,
        code: error.code,
        status: error.status,
        response: error.response?.data,
      });
      
      // Provide more specific error messages
      if (error.code === 'insufficient_quota') {
        throw new Error('OpenAI API quota exceeded. Please check your API usage and billing.');
      } else if (error.code === 'invalid_api_key') {
        throw new Error('Invalid OpenAI API key. Please check your configuration.');
      } else if (error.status === 400) {
        throw new Error('Invalid image format or size. Please try a different image.');
      } else if (error.message.includes('model')) {
        throw new Error('Vision model not available. Please check OpenAI API status.');
      }
      
      throw new Error(`Failed to extract text from image: ${error.message || 'Unknown error'}`);
    }
  }
}

