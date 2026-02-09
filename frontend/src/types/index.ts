export interface SkillGap {
  skill: string;
  importance: 'critical' | 'important' | 'nice-to-have';
  description: string;
}

export interface LearningResource {
  title: string;
  type: 'course' | 'documentation' | 'tutorial' | 'book' | 'video';
  provider: string;
  url: string;
  estimatedTime: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Certification {
  name: string;
  provider: string;
  relevance: string;
  url: string;
  estimatedCost: string;
  preparationTime: string;
}

export interface AnalysisResult {
  summary: string;
  currentSkills: string[];
  skillGaps: SkillGap[];
  learningResources: LearningResource[];
  certifications: Certification[];
  roadmap: string[];
}

// Resume data types for editing
export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  highlights: string[];
}

export interface ResumeData {
  contact: ContactInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  languages?: string[];
  rawText?: string;
}

export type ExportFormat = 'pdf' | 'json' | 'md' | 'odt';
