import OpenAI from 'openai';
import { AnalysisResult } from '../types';

export class AIAnalyzer {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async analyzeResume(resumeText: string, targetPosition: string): Promise<AnalysisResult> {
    const prompt = `You are an expert career advisor and technical recruiter. Analyze the following resume for someone targeting a "${targetPosition}" position.

Resume:
${resumeText}

Provide a comprehensive analysis in the following JSON format:
{
  "summary": "Brief 2-3 sentence summary of the candidate's current profile and readiness for the target position",
  "currentSkills": ["skill1", "skill2", ...] (list of skills identified in the resume),
  "skillGaps": [
    {
      "skill": "skill name",
      "importance": "critical|important|nice-to-have",
      "description": "Why this skill is needed for the target position"
    }
  ],
  "learningResources": [
    {
      "title": "Resource name",
      "type": "course|documentation|tutorial|book|video",
      "provider": "Platform or author",
      "url": "Direct URL to the resource",
      "estimatedTime": "e.g., 20 hours, 3 months",
      "level": "beginner|intermediate|advanced"
    }
  ],
  "certifications": [
    {
      "name": "Certification name",
      "provider": "Certifying organization",
      "relevance": "How this certification helps for the target position",
      "url": "URL to certification info",
      "estimatedCost": "e.g., $200, Free",
      "preparationTime": "e.g., 3-6 months"
    }
  ],
  "roadmap": ["Step 1: ...", "Step 2: ...", ...] (ordered list of steps to bridge the gap)
}

Be specific and provide real, actionable resources with actual URLs when possible. Focus on the most relevant and high-quality resources.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // Updated to use gpt-4o-mini (more cost-effective and available)
        messages: [
          {
            role: 'system',
            content: 'You are an expert career advisor specializing in skill gap analysis and professional development. Always respond with valid JSON only, no additional text.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      const analysis = JSON.parse(content) as AnalysisResult;
      return analysis;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw new Error('Failed to analyze resume. Please try again.');
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.openai.models.list();
      return true;
    } catch (error) {
      console.error('OpenAI connection failed:', error);
      return false;
    }
  }
}

