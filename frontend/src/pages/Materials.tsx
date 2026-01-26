import { Folder, FileText, Download, Star, Clock } from 'lucide-react';

export const Materials = () => {
  const materialTypes = [
    {
      title: 'Study Guides',
      icon: FileText,
      color: 'blue',
      count: 0,
      description: 'Comprehensive guides for various topics',
    },
    {
      title: 'Practice Projects',
      icon: Folder,
      color: 'green',
      count: 0,
      description: 'Hands-on projects to build your skills',
    },
    {
      title: 'Templates',
      icon: Star,
      color: 'purple',
      count: 0,
      description: 'Ready-to-use templates and boilerplates',
    },
    {
      title: 'Reference Sheets',
      icon: FileText,
      color: 'orange',
      count: 0,
      description: 'Quick reference materials and cheat sheets',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <Folder className="w-8 h-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-800">Materials Library</h1>
            </div>
            <p className="text-lg text-gray-600">
              Access study materials, templates, and practice resources
            </p>
          </div>

          {/* Material Type Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {materialTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${getColorClasses(type.color)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      {type.count} items
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{type.title}</h2>
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </div>
              );
            })}
          </div>

          {/* Recent Materials Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recently Added</h2>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-center py-12">
              <Download className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No materials yet</p>
              <p className="text-sm text-gray-400">
                Materials will appear here after you complete a resume analysis
              </p>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl shadow-md p-8 text-center border border-primary-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Materials Library Coming Soon! 📚
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We're building a comprehensive materials library that will provide you with
              downloadable study guides, project templates, interview prep materials, and
              more based on your skill gaps.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-blue-50 rounded-lg px-4 py-2 text-sm text-blue-800">
                📄 Study Guides
              </div>
              <div className="bg-green-50 rounded-lg px-4 py-2 text-sm text-green-800">
                💼 Project Templates
              </div>
              <div className="bg-purple-50 rounded-lg px-4 py-2 text-sm text-purple-800">
                📝 Interview Prep
              </div>
              <div className="bg-orange-50 rounded-lg px-4 py-2 text-sm text-orange-800">
                🎯 Practice Problems
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

