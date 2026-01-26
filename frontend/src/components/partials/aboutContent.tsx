export interface AboutContent {
  title: string;
  subtitle: string;
  sections: AboutSection[];
}

export interface AboutSection {
  id: string;
  icon: string;
  title: string;
  type: 'text' | 'list' | 'grid' | 'highlight' | 'statement';
  content: string | string[] | GridItem[] | StatementBlock;
  colorScheme?: 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'primary' | 'gray';
}

export interface GridItem {
  icon: string;
  title: string;
  description: string;
  colorScheme: string;
}

export interface StatementBlock {
  heading: string;
  statement: string;
  details?: string;
  impact?: string;
}

export const aboutContent: AboutContent = {
  title: 'About Pivot',
  subtitle: 'Accelerate Your Career',
  sections: [
    {
      id: 'why-created',
      icon: '🎯',
      title: 'Why Pivot Was Created',
      type: 'text',
      content: [
        'Pivot was born from a real-world need identified in technical training programs, particularly in data center operations and IT infrastructure roles. During the development of comprehensive intern training programs, we discovered a critical gap: professionals and interns often don\'t know what skills they\'re missing until it\'s too late.',
        'Traditional training programs require weeks to identify skill gaps, and by then, valuable time and resources have been spent. Pivot solves this by providing instant, AI-powered analysis of your current skills against your target role, giving you a clear roadmap from day one.',
      ],
    },
    {
      id: 'problem-statement',
      icon: '📋',
      title: 'The Problem We\'re Solving',
      type: 'statement',
      colorScheme: 'gray',
      content: {
        heading: 'Problem Statement',
        statement: 'Organizations lack a defined framework for lateral career movement, creating uncertainty for employees seeking to explore new roles internally and limiting cross-functional knowledge development.',
        details: 'Multiple employees express interest in exploring alternative roles and expanding their skill sets within the organization. However, the gap between employee career aspirations and available pathways creates uncertainty around internal mobility and may hinder both talent retention and cross-functional knowledge development.',
      } as StatementBlock,
    },
    {
      id: 'problem-list',
      icon: '⚠️',
      title: 'Key Challenges',
      type: 'list',
      colorScheme: 'red',
      content: [
        '<strong>Unclear Career Paths:</strong> Professionals don\'t know what skills they need for their dream job',
        '<strong>Wasted Training Time:</strong> 8-week programs to discover you\'re missing fundamental skills',
        '<strong>Resource Inefficiency:</strong> Companies invest in training without knowing the starting point',
        '<strong>Certification Confusion:</strong> Overwhelmed by certification options without guidance',
        '<strong>Generic Advice:</strong> One-size-fits-all career guidance that doesn\'t match your experience',
        '<strong>No Internal Mobility Framework:</strong> Employees lack structured pathways for lateral career moves',
      ],
    },
    {
      id: 'solution',
      icon: '💡',
      title: 'Our Solution',
      type: 'grid',
      content: [
        {
          icon: '📄',
          title: 'Upload Your Resume',
          description: 'PDF, DOCX, ODT, or even images. We extract your skills automatically.',
          colorScheme: 'blue',
        },
        {
          icon: '🤖',
          title: 'AI Analysis',
          description: 'ChatGPT analyzes your experience against 32+ positions across 23 departments.',
          colorScheme: 'green',
        },
        {
          icon: '📊',
          title: 'Skill Gap Analysis',
          description: 'See exactly what you\'re missing, prioritized by importance.',
          colorScheme: 'purple',
        },
        {
          icon: '🚀',
          title: 'Personalized Roadmap',
          description: 'Get courses, certifications, and a step-by-step plan to your goal.',
          colorScheme: 'orange',
        },
      ] as GridItem[],
    },
    {
      id: 'project-detail',
      icon: '🔧',
      title: 'Project Details',
      type: 'statement',
      colorScheme: 'primary',
      content: {
        heading: 'What Pivot Delivers',
        statement: 'A web-based platform that delivers personalized lateral career pathways by analyzing employees\' resumes, current roles, and skill gaps to provide tailored learning resources, facilitate connections with relevant team leads throughout the learning journey, and coordinate shadowing opportunities in target roles.',
      } as StatementBlock,
    },
    {
      id: 'real-world-impact',
      icon: '🎓',
      title: 'Real-World Impact',
      type: 'text',
      content: [
        'Inspired by comprehensive training programs like our 8-week Data Center Intern curriculum, Pivot compresses weeks of evaluation into minutes. Instead of spending two months learning about cabling, optics, Dell node staging, and network devices only to discover missing prerequisites, you get that insight before you even start.',
      ],
    },
    {
      id: 'tagline',
      icon: '✨',
      title: '',
      type: 'highlight',
      colorScheme: 'primary',
      content: '"From 8 weeks of uncertainty to instant clarity"',
    },
    {
      id: 'who-its-for',
      icon: '👥',
      title: 'Who Pivot Is For',
      type: 'grid',
      content: [
        {
          icon: '✓',
          title: 'Data Center Technicians',
          description: '',
          colorScheme: 'green',
        },
        {
          icon: '✓',
          title: 'IT Infrastructure Engineers',
          description: '',
          colorScheme: 'green',
        },
        {
          icon: '✓',
          title: 'Software Engineers',
          description: '',
          colorScheme: 'green',
        },
        {
          icon: '✓',
          title: 'Career Changers',
          description: '',
          colorScheme: 'green',
        },
        {
          icon: '✓',
          title: 'Recent Graduates',
          description: '',
          colorScheme: 'green',
        },
        {
          icon: '✓',
          title: 'Technical Interns',
          description: '',
          colorScheme: 'green',
        },
        {
          icon: '✓',
          title: 'IT Professionals',
          description: '',
          colorScheme: 'green',
        },
        {
          icon: '✓',
          title: 'Anyone Seeking Growth',
          description: '',
          colorScheme: 'green',
        },
      ] as GridItem[],
    },
    {
      id: 'project-impact',
      icon: '🌟',
      title: 'Project Impact',
      type: 'statement',
      colorScheme: 'primary',
      content: {
        heading: 'Our Vision',
        statement: 'By establishing a structured framework for lateral career movement, this platform will empower employees to confidently pursue internal role transitions through personalized learning pathways, ultimately strengthening talent retention and accelerating cross-functional knowledge sharing across the organization.',
      } as StatementBlock,
    },
    {
      id: 'mission',
      icon: '🎯',
      title: 'Our Mission',
      type: 'statement',
      colorScheme: 'primary',
      content: {
        heading: 'What Drives Us',
        statement: 'To eliminate the guesswork from career development. Whether you\'re an intern starting your first week or a professional aiming for your next promotion, Pivot gives you the clarity, confidence, and actionable plan to accelerate your career.',
      } as StatementBlock,
    },
  ],
};

// Helper function to render section content
export const renderSectionContent = (section: AboutSection) => {
  switch (section.type) {
    case 'text': {
      const content = section.content;
      const textContent: string[] = Array.isArray(content) && typeof content[0] === 'string' 
        ? content as string[]
        : typeof content === 'string' 
        ? [content] 
        : [];
      return (
        <div className="space-y-3">
          {textContent.map((paragraph, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      );
    }

    case 'list': {
      const content = section.content;
      const listItems: string[] = Array.isArray(content) && typeof content[0] === 'string'
        ? content as string[]
        : [];
      const listBgColor = section.colorScheme === 'red' ? 'bg-red-50 border-red-400 text-red-800' : 'bg-gray-50 border-gray-400 text-gray-800';
      
      return (
        <div className={`${listBgColor} border-l-4 p-4 rounded`}>
          <ul className="space-y-2 text-sm">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
            ))}
          </ul>
        </div>
      );
    }

    case 'grid': {
      const gridItems = section.content as GridItem[];
      const isSimpleList = gridItems.every(item => !item.description);
      
      if (isSimpleList) {
        return (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {gridItems.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <span className={`text-${item.colorScheme}-600`}>{item.icon}</span>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        );
      }
      
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {gridItems.map((item, idx) => (
            <div key={idx} className={`bg-${item.colorScheme}-50 p-4 rounded-lg border border-${item.colorScheme}-200`}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className={`font-semibold text-${item.colorScheme}-900 mb-1`}>{item.title}</h4>
              {item.description && (
                <p className={`text-sm text-${item.colorScheme}-800`}>{item.description}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    case 'highlight': {
      const content = section.content as string;
      const highlightColor = section.colorScheme === 'primary' 
        ? 'from-primary-50 to-blue-50 border-primary-200 text-primary-900'
        : 'from-gray-50 to-gray-100 border-gray-200 text-gray-900';
      
      return (
        <div className={`bg-gradient-to-r ${highlightColor} p-4 rounded-lg border`}>
          <p className="font-medium text-center">{content}</p>
        </div>
      );
    }

    case 'statement': {
      const statement = section.content as StatementBlock;
      const statementBg = section.colorScheme === 'primary'
        ? 'bg-gradient-to-r from-primary-600 to-primary-800 text-white'
        : 'bg-gray-100 text-gray-900';
      
      return (
        <div className={`${statementBg} p-6 rounded-lg`}>
          {statement.heading && (
            <h4 className="text-lg font-bold mb-3">{statement.heading}</h4>
          )}
          <p className="leading-relaxed mb-3">
            <strong>{statement.statement}</strong>
          </p>
          {statement.details && (
            <p className="leading-relaxed text-sm opacity-90">{statement.details}</p>
          )}
          {statement.impact && (
            <p className="leading-relaxed mt-3">{statement.impact}</p>
          )}
        </div>
      );
    }

    default:
      return <div className="text-gray-700">Content not available</div>;
  }
};

