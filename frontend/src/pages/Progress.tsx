import { TrendingUp, Target, Award, CheckCircle2, Clock } from 'lucide-react';

export const Progress = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="w-8 h-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-800">Your Progress</h1>
            </div>
            <p className="text-lg text-gray-600">
              Track your learning journey and career development
            </p>
          </div>

          {/* Progress Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <Target className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-gray-800">0</span>
              </div>
              <h3 className="text-gray-600 font-medium">Active Goals</h3>
              <p className="text-sm text-gray-500 mt-1">Skills in progress</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-gray-800">0</span>
              </div>
              <h3 className="text-gray-600 font-medium">Completed</h3>
              <p className="text-sm text-gray-500 mt-1">Skills mastered</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <Clock className="w-8 h-8 text-orange-600" />
                <span className="text-3xl font-bold text-gray-800">0h</span>
              </div>
              <h3 className="text-gray-600 font-medium">Time Invested</h3>
              <p className="text-sm text-gray-500 mt-1">Learning hours</p>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
            <Award className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Progress Tracking Coming Soon!
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We're building an amazing progress tracking system that will help you monitor
              your learning journey, track completed courses, and celebrate your achievements.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-blue-50 rounded-lg px-4 py-2 text-sm text-blue-800">
                📊 Visual Progress Charts
              </div>
              <div className="bg-green-50 rounded-lg px-4 py-2 text-sm text-green-800">
                ✅ Skill Completion Tracking
              </div>
              <div className="bg-purple-50 rounded-lg px-4 py-2 text-sm text-purple-800">
                🎯 Goal Setting
              </div>
              <div className="bg-orange-50 rounded-lg px-4 py-2 text-sm text-orange-800">
                ⏱️ Time Tracking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

