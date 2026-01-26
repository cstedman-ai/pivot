import { FileText, Building2, Users, Briefcase, Upload } from 'lucide-react';

export const ResumeOrg = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="w-8 h-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-800">
                Resume & Organization Structure
              </h1>
            </div>
            <p className="text-lg text-gray-600">
              Manage your resumes and understand organizational hierarchies
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Resume Management */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Resume Management</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Store multiple versions of your resume, track updates, and compare different
                versions for various positions.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Multiple resume versions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Version history tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Position-specific optimization</span>
                </li>
              </ul>
            </div>

            {/* Organization Structure */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Organization Insights</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Understand typical organizational structures for your target position and
                identify career progression paths.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Career path visualization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Role relationships mapping</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Promotion requirements</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-5 text-center border border-gray-200">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Team Structure</h3>
              <p className="text-sm text-gray-600">
                Understand typical team compositions
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5 text-center border border-gray-200">
              <Briefcase className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Role Analysis</h3>
              <p className="text-sm text-gray-600">
                Deep dive into position requirements
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5 text-center border border-gray-200">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Resume Templates</h3>
              <p className="text-sm text-gray-600">
                Industry-specific resume formats
              </p>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl shadow-md p-8 text-center border border-primary-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Enhanced Features Coming Soon! 🚀
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're developing comprehensive resume management and organizational structure
              analysis tools to help you better understand career paths and optimize your
              resume for specific positions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

