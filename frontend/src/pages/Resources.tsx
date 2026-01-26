import { BookOpen, ExternalLink, Search, Filter } from 'lucide-react';

export const Resources = () => {
  const resourceCategories = [
    {
      title: 'Online Learning Platforms',
      icon: '🎓',
      items: [
        { name: 'Coursera', url: 'https://www.coursera.org' },
        { name: 'Udemy', url: 'https://www.udemy.com' },
        { name: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning' },
        { name: 'Pluralsight', url: 'https://www.pluralsight.com' },
      ],
    },
    {
      title: 'Free Resources',
      icon: '📚',
      items: [
        { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org' },
        { name: 'Khan Academy', url: 'https://www.khanacademy.org' },
        { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu' },
        { name: 'YouTube Educational', url: 'https://www.youtube.com/education' },
      ],
    },
    {
      title: 'Certification Providers',
      icon: '🏆',
      items: [
        { name: 'AWS Certifications', url: 'https://aws.amazon.com/certification' },
        { name: 'Google Cloud Certifications', url: 'https://cloud.google.com/certification' },
        { name: 'Microsoft Learn', url: 'https://learn.microsoft.com' },
        { name: 'CompTIA', url: 'https://www.comptia.org' },
      ],
    },
    {
      title: 'Documentation & Guides',
      icon: '📖',
      items: [
        { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
        { name: 'DevDocs', url: 'https://devdocs.io' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
        { name: 'GitHub Guides', url: 'https://guides.github.com' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-800">Learning Resources</h1>
            </div>
            <p className="text-lg text-gray-600">
              Curated collection of platforms and tools to accelerate your learning
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-8 border border-gray-200">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Resource Categories */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {resourceCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-4xl">{category.icon}</span>
                  <h2 className="text-xl font-bold text-gray-800">{category.title}</h2>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-gray-700 group-hover:text-primary-600 font-medium">
                          {item.name}
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl shadow-md p-6 border border-primary-200">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              💡 Pro Tip
            </h3>
            <p className="text-gray-700">
              After analyzing your resume, you'll receive personalized resource recommendations
              tailored to your specific skill gaps. The resources above are general starting
              points for various learning paths.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

