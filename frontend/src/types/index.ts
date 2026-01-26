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

