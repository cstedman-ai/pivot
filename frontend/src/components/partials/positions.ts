interface Position {
  id: string;
  title: string;
  department: string;
  level: 'entry' | 'mid' | 'senior' | 'lead' | 'principal' | 'executive';
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  responsibilities: string[];
  salaryRange: string;
  remote: boolean;
}

export const positions: Position[] = [
  // AI/ML Platform Services
  {
    id: 'ml-engineer-senior',
    title: 'Senior Machine Learning Engineer',
    department: 'AI/ML Platform Services',
    level: 'senior',
    description: 'Design and implement machine learning models and systems at scale',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'MLOps'],
    niceToHaveSkills: ['Kubernetes', 'AWS SageMaker', 'Model Optimization', 'Deep Learning'],
    responsibilities: [
      'Build and deploy ML models to production',
      'Optimize model performance and scalability',
      'Collaborate with data scientists and engineers',
      'Implement MLOps best practices',
    ],
    salaryRange: '$150K - $200K',
    remote: true,
  },
  {
    id: 'ai-research-scientist',
    title: 'AI Research Scientist',
    department: 'AI/ML Platform Services',
    level: 'senior',
    description: 'Conduct cutting-edge AI research and develop novel algorithms',
    requiredSkills: ['Deep Learning', 'Research', 'Python', 'Mathematics', 'Statistics'],
    niceToHaveSkills: ['NLP', 'Computer Vision', 'Reinforcement Learning', 'Publications'],
    responsibilities: [
      'Conduct research in AI and machine learning',
      'Publish papers and present at conferences',
      'Prototype and validate new algorithms',
      'Collaborate with product teams on AI features',
    ],
    salaryRange: '$160K - $220K',
    remote: true,
  },

  // Accounting
  {
    id: 'senior-accountant',
    title: 'Senior Accountant',
    department: 'Accounting',
    level: 'senior',
    description: 'Manage financial reporting and accounting operations',
    requiredSkills: ['GAAP', 'Financial Reporting', 'Excel', 'QuickBooks', 'CPA'],
    niceToHaveSkills: ['NetSuite', 'SQL', 'Audit Experience', 'Tax Planning'],
    responsibilities: [
      'Prepare monthly financial statements',
      'Manage general ledger and reconciliations',
      'Support annual audit process',
      'Ensure compliance with accounting standards',
    ],
    salaryRange: '$90K - $120K',
    remote: false,
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    department: 'Accounting',
    level: 'mid',
    description: 'Analyze financial data and support business decisions',
    requiredSkills: ['Financial Analysis', 'Excel', 'Financial Modeling', 'SQL'],
    niceToHaveSkills: ['Python', 'Tableau', 'PowerBI', 'FP&A'],
    responsibilities: [
      'Build financial models and forecasts',
      'Analyze variance and trends',
      'Support budgeting and planning',
      'Present insights to leadership',
    ],
    salaryRange: '$80K - $110K',
    remote: true,
  },

  // Compute
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    department: 'Compute',
    level: 'senior',
    description: 'Design and implement cloud infrastructure solutions',
    requiredSkills: ['AWS', 'Azure', 'Cloud Architecture', 'Kubernetes', 'Terraform'],
    niceToHaveSkills: ['GCP', 'Service Mesh', 'Cost Optimization', 'Security'],
    responsibilities: [
      'Design scalable cloud architectures',
      'Implement infrastructure as code',
      'Optimize cloud costs and performance',
      'Lead technical initiatives',
    ],
    salaryRange: '$160K - $210K',
    remote: true,
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    department: 'Compute',
    level: 'mid',
    description: 'Build and maintain CI/CD pipelines and infrastructure',
    requiredSkills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Python'],
    niceToHaveSkills: ['Terraform', 'Ansible', 'Jenkins', 'GitOps'],
    responsibilities: [
      'Maintain CI/CD pipelines',
      'Deploy and monitor applications',
      'Automate infrastructure tasks',
      'Support development teams',
    ],
    salaryRange: '$120K - $150K',
    remote: true,
  },

  // Customer Experience
  {
    id: 'cx-designer',
    title: 'Customer Experience Designer',
    department: 'Customer Experience',
    level: 'mid',
    description: 'Design and optimize customer journeys and experiences',
    requiredSkills: ['UX Research', 'Journey Mapping', 'Figma', 'User Testing', 'Analytics'],
    niceToHaveSkills: ['Service Design', 'Qualitative Research', 'A/B Testing', 'Prototyping'],
    responsibilities: [
      'Conduct user research and testing',
      'Map customer journeys',
      'Design experience improvements',
      'Collaborate with product and design teams',
    ],
    salaryRange: '$100K - $130K',
    remote: true,
  },

  // Customer Support
  {
    id: 'support-engineer-senior',
    title: 'Senior Support Engineer',
    department: 'Customer Support',
    level: 'senior',
    description: 'Provide technical support and resolve complex customer issues',
    requiredSkills: ['Technical Support', 'Troubleshooting', 'Customer Service', 'APIs', 'SQL'],
    niceToHaveSkills: ['Scripting', 'DevOps', 'Zendesk', 'Salesforce'],
    responsibilities: [
      'Resolve escalated customer issues',
      'Debug technical problems',
      'Improve support documentation',
      'Mentor junior support staff',
    ],
    salaryRange: '$90K - $120K',
    remote: true,
  },

  // Data Center Operations
  {
    id: 'datacenter-technician',
    title: 'Data Center Technician',
    department: 'Data Center Operations',
    level: 'mid',
    description: 'Maintain and monitor data center infrastructure',
    requiredSkills: ['Server Hardware', 'Networking', 'Linux', 'Monitoring', 'Troubleshooting'],
    niceToHaveSkills: ['HVAC', 'Power Systems', 'Cabling', 'CompTIA'],
    responsibilities: [
      'Monitor data center operations 24/7',
      'Perform hardware maintenance',
      'Respond to incidents',
      'Document procedures',
    ],
    salaryRange: '$70K - $95K',
    remote: false,
  },

  // Engineering Operations
  {
    id: 'sre-senior',
    title: 'Senior Site Reliability Engineer',
    department: 'Engineering Operations',
    level: 'senior',
    description: 'Ensure reliability and performance of production systems',
    requiredSkills: ['SRE', 'Kubernetes', 'Monitoring', 'Incident Response', 'Python'],
    niceToHaveSkills: ['Terraform', 'Service Mesh', 'Chaos Engineering', 'Go'],
    responsibilities: [
      'Design and implement SRE practices',
      'Monitor system reliability and performance',
      'Lead incident response',
      'Build automation tools',
    ],
    salaryRange: '$150K - $190K',
    remote: true,
  },

  // IT Data Engineering
  {
    id: 'data-engineer-senior',
    title: 'Senior Data Engineer',
    department: 'IT Data Engineering',
    level: 'senior',
    description: 'Build and maintain data pipelines and infrastructure',
    requiredSkills: ['Python', 'SQL', 'ETL', 'Data Warehousing', 'Spark'],
    niceToHaveSkills: ['Airflow', 'DBT', 'Snowflake', 'Kafka', 'AWS'],
    responsibilities: [
      'Design and build data pipelines',
      'Optimize data warehouse performance',
      'Implement data quality checks',
      'Support analytics and ML teams',
    ],
    salaryRange: '$140K - $180K',
    remote: true,
  },
  {
    id: 'data-engineer-mid',
    title: 'Data Engineer',
    department: 'IT Data Engineering',
    level: 'mid',
    description: 'Develop and maintain data pipelines',
    requiredSkills: ['Python', 'SQL', 'ETL', 'Data Modeling'],
    niceToHaveSkills: ['Spark', 'Kafka', 'Cloud Platforms', 'Docker'],
    responsibilities: [
      'Build data pipelines',
      'Write efficient SQL queries',
      'Maintain data quality',
      'Document data flows',
    ],
    salaryRange: '$110K - $140K',
    remote: true,
  },

  // IT Software Engineering
  {
    id: 'software-engineer-senior',
    title: 'Senior Software Engineer',
    department: 'IT Software Engineering',
    level: 'senior',
    description: 'Design and build scalable software systems',
    requiredSkills: ['Programming', 'System Design', 'Microservices', 'APIs', 'Databases'],
    niceToHaveSkills: ['Cloud', 'Kubernetes', 'CI/CD', 'Agile'],
    responsibilities: [
      'Design and implement features',
      'Write clean, maintainable code',
      'Conduct code reviews',
      'Mentor junior engineers',
    ],
    salaryRange: '$150K - $190K',
    remote: true,
  },
  {
    id: 'fullstack-engineer',
    title: 'Full Stack Engineer',
    department: 'IT Software Engineering',
    level: 'mid',
    description: 'Build end-to-end features across frontend and backend',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'APIs', 'SQL'],
    niceToHaveSkills: ['TypeScript', 'GraphQL', 'AWS', 'Docker'],
    responsibilities: [
      'Develop full-stack features',
      'Build responsive UIs',
      'Implement REST APIs',
      'Write tests',
    ],
    salaryRange: '$120K - $150K',
    remote: true,
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer',
    department: 'IT Software Engineering',
    level: 'mid',
    description: 'Build modern, responsive user interfaces',
    requiredSkills: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript'],
    niceToHaveSkills: ['Next.js', 'TailwindCSS', 'Testing', 'Performance'],
    responsibilities: [
      'Build responsive web applications',
      'Implement UI components',
      'Optimize performance',
      'Collaborate with designers',
    ],
    salaryRange: '$110K - $140K',
    remote: true,
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    department: 'IT Software Engineering',
    level: 'mid',
    description: 'Build scalable backend services and APIs',
    requiredSkills: ['Python', 'APIs', 'Databases', 'Microservices', 'System Design'],
    niceToHaveSkills: ['Go', 'Kubernetes', 'Message Queues', 'Caching'],
    responsibilities: [
      'Design and implement APIs',
      'Build scalable services',
      'Optimize database queries',
      'Ensure system reliability',
    ],
    salaryRange: '$120K - $150K',
    remote: true,
  },

  // Networking
  {
    id: 'network-engineer',
    title: 'Network Engineer',
    department: 'Networking',
    level: 'senior',
    description: 'Design and maintain network infrastructure',
    requiredSkills: ['Networking', 'BGP', 'TCP/IP', 'Routing', 'Switching'],
    niceToHaveSkills: ['SDN', 'Network Automation', 'Security', 'CCNP'],
    responsibilities: [
      'Design network architectures',
      'Configure network devices',
      'Troubleshoot network issues',
      'Implement security measures',
    ],
    salaryRange: '$120K - $160K',
    remote: false,
  },

  // Physical Security
  {
    id: 'security-analyst',
    title: 'Security Analyst',
    department: 'Physical Security',
    level: 'mid',
    description: 'Monitor and respond to security incidents',
    requiredSkills: ['Security', 'Surveillance Systems', 'Incident Response', 'Risk Assessment'],
    niceToHaveSkills: ['Access Control', 'CCTV', 'Security Protocols', 'Compliance'],
    responsibilities: [
      'Monitor security systems',
      'Respond to security incidents',
      'Conduct risk assessments',
      'Maintain security documentation',
    ],
    salaryRange: '$70K - $95K',
    remote: false,
  },

  // Product
  {
    id: 'product-manager-senior',
    title: 'Senior Product Manager',
    department: 'Product',
    level: 'senior',
    description: 'Define product strategy and drive execution',
    requiredSkills: ['Product Management', 'Strategy', 'User Research', 'Analytics', 'Roadmapping'],
    niceToHaveSkills: ['Agile', 'SQL', 'A/B Testing', 'Technical Background'],
    responsibilities: [
      'Define product vision and strategy',
      'Build product roadmaps',
      'Work with engineering and design',
      'Analyze metrics and user feedback',
    ],
    salaryRange: '$150K - $190K',
    remote: true,
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    department: 'Product',
    level: 'mid',
    description: 'Manage product features and collaborate with teams',
    requiredSkills: ['Product Management', 'User Stories', 'Analytics', 'Communication'],
    niceToHaveSkills: ['Technical Background', 'Design Thinking', 'SQL', 'APIs'],
    responsibilities: [
      'Write user stories and requirements',
      'Prioritize product backlog',
      'Coordinate with stakeholders',
      'Track feature performance',
    ],
    salaryRange: '$120K - $150K',
    remote: true,
  },

  // Product Marketing
  {
    id: 'product-marketing-manager',
    title: 'Product Marketing Manager',
    department: 'Product Marketing',
    level: 'mid',
    description: 'Drive go-to-market strategy and product positioning',
    requiredSkills: ['Product Marketing', 'GTM Strategy', 'Positioning', 'Content Creation', 'Analytics'],
    niceToHaveSkills: ['Competitive Analysis', 'Sales Enablement', 'Marketing Automation', 'SEO'],
    responsibilities: [
      'Develop go-to-market strategies',
      'Create product positioning and messaging',
      'Enable sales teams',
      'Analyze market and competition',
    ],
    salaryRange: '$110K - $140K',
    remote: true,
  },

  // Demand Gen
  {
    id: 'demand-gen-manager',
    title: 'Demand Generation Manager',
    department: 'Demand Gen',
    level: 'mid',
    description: 'Drive lead generation and marketing campaigns',
    requiredSkills: ['Digital Marketing', 'Lead Generation', 'Marketing Automation', 'Analytics', 'Campaign Management'],
    niceToHaveSkills: ['SEO', 'SEM', 'Content Marketing', 'HubSpot', 'Salesforce'],
    responsibilities: [
      'Plan and execute demand gen campaigns',
      'Optimize lead generation',
      'Manage marketing automation',
      'Analyze campaign performance',
    ],
    salaryRange: '$100K - $130K',
    remote: true,
  },

  // Leadership Positions
  {
    id: 'engineering-manager',
    title: 'Engineering Manager',
    department: 'IT Software Engineering',
    level: 'lead',
    description: 'Lead and mentor engineering teams',
    requiredSkills: ['Leadership', 'Team Management', 'Software Engineering', 'Agile', 'Mentoring'],
    niceToHaveSkills: ['System Design', 'Hiring', 'Project Management', 'Technical Strategy'],
    responsibilities: [
      'Manage engineering team',
      'Conduct 1:1s and performance reviews',
      'Plan technical roadmap',
      'Hire and mentor engineers',
    ],
    salaryRange: '$170K - $220K',
    remote: true,
  },
  {
    id: 'director-engineering',
    title: 'Director of Engineering',
    department: 'IT Software Engineering',
    level: 'executive',
    description: 'Lead multiple engineering teams and drive technical strategy',
    requiredSkills: ['Leadership', 'Technical Strategy', 'Team Building', 'Architecture', 'Business Acumen'],
    niceToHaveSkills: ['Product Sense', 'Stakeholder Management', 'Budget Management', 'Hiring'],
    responsibilities: [
      'Lead multiple engineering teams',
      'Set technical direction',
      'Drive organizational initiatives',
      'Partner with product and business',
    ],
    salaryRange: '$220K - $300K',
    remote: true,
  },
];

// Helper functions
export const getPositionsByDepartment = (department: string): Position[] => {
  return positions.filter(pos => pos.department === department);
};

export const getPositionsByLevel = (level: Position['level']): Position[] => {
  return positions.filter(pos => pos.level === level);
};

export const searchPositions = (query: string): Position[] => {
  const lowerQuery = query.toLowerCase();
  return positions.filter(pos => 
    pos.title.toLowerCase().includes(lowerQuery) ||
    pos.department.toLowerCase().includes(lowerQuery) ||
    pos.requiredSkills.some(skill => skill.toLowerCase().includes(lowerQuery)) ||
    pos.description.toLowerCase().includes(lowerQuery)
  );
};

export const getRemotePositions = (): Position[] => {
  return positions.filter(pos => pos.remote);
};

export const getDepartments = (): string[] => {
  return Array.from(new Set(positions.map(pos => pos.department))).sort();
};

export type { Position };

