import { useState } from 'react';
import { Settings as SettingsIcon, Save, CheckCircle2, Zap, Brain, Sparkles } from 'lucide-react';

export const Settings = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4-turbo');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const llmModels = [
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      description: 'Most capable model with advanced reasoning and analysis',
      icon: '🚀',
      recommended: true,
      features: ['Best accuracy', 'Detailed insights', 'Complex analysis'],
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      description: 'Powerful model with excellent analytical capabilities',
      icon: '⚡',
      recommended: false,
      features: ['High accuracy', 'Comprehensive', 'Reliable'],
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      description: 'Fast and efficient model for quick analysis',
      icon: '💨',
      recommended: false,
      features: ['Fast response', 'Cost effective', 'Good accuracy'],
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      description: 'Advanced model with nuanced understanding',
      icon: '🧠',
      recommended: false,
      features: ['Detailed analysis', 'Thoughtful insights', 'Context aware'],
      comingSoon: true,
    },
    {
      id: 'claude-3-sonnet',
      name: 'Claude 3 Sonnet',
      provider: 'Anthropic',
      description: 'Balanced performance and speed',
      icon: '🎯',
      recommended: false,
      features: ['Balanced approach', 'Good reasoning', 'Efficient'],
      comingSoon: true,
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'Google',
      description: 'Google\'s advanced AI model',
      icon: '✨',
      recommended: false,
      features: ['Multi-modal', 'Strong reasoning', 'Versatile'],
      comingSoon: true,
    },
  ];

  const handleSave = () => {
    // TODO: Save to backend/localStorage
    console.log('Saving model selection:', selectedModel);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <SettingsIcon className="w-8 h-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
            </div>
            <p className="text-lg text-gray-600">
              Configure your resume analysis preferences
            </p>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Settings saved successfully!</span>
            </div>
          )}

          {/* LLM Selection Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-800">AI Model Selection</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Choose the AI model that will analyze your resume and provide personalized recommendations.
            </p>

            {/* Model Cards */}
            <div className="space-y-4">
              {llmModels.map((model) => (
                <div
                  key={model.id}
                  className={`relative border-2 rounded-lg p-5 cursor-pointer transition-all ${
                    selectedModel === model.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  } ${model.comingSoon ? 'opacity-60 cursor-not-allowed' : ''}`}
                  onClick={() => !model.comingSoon && setSelectedModel(model.id)}
                >
                  {/* Coming Soon Badge */}
                  {model.comingSoon && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Recommended Badge */}
                  {model.recommended && !model.comingSoon && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Recommended</span>
                      </span>
                    </div>
                  )}

                  <div className="flex items-start space-x-4">
                    {/* Radio Button */}
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedModel === model.id
                            ? 'border-primary-600 bg-primary-600'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {selectedModel === model.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>

                    {/* Model Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{model.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{model.name}</h3>
                          <p className="text-sm text-gray-500">{model.provider}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{model.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {model.features.map((feature, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              selectedModel === model.id
                                ? 'bg-primary-100 text-primary-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Settings Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-800">Analysis Preferences</h2>
            </div>
            
            <div className="space-y-4">
              {/* Detail Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analysis Detail Level
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                  <option value="detailed">Detailed - Comprehensive analysis</option>
                  <option value="standard">Standard - Balanced insights</option>
                  <option value="quick">Quick - Essential points only</option>
                </select>
              </div>

              {/* Resource Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Resources per Skill
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                  <option value="3">3 resources (concise)</option>
                  <option value="5">5 resources (recommended)</option>
                  <option value="10">10 resources (extensive)</option>
                </select>
              </div>

              {/* Include Certifications */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="include-certs"
                  defaultChecked
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="include-certs" className="text-sm text-gray-700">
                  Include certification recommendations
                </label>
              </div>

              {/* Include Roadmap */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="include-roadmap"
                  defaultChecked
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="include-roadmap" className="text-sm text-gray-700">
                  Generate learning roadmap
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              <Save className="w-5 h-5" />
              <span>Save Settings</span>
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Note about AI Models</h3>
            <p className="text-sm text-blue-800">
              Different models may provide varying perspectives and recommendations. The default
              GPT-4 Turbo model offers the most comprehensive analysis. Models marked as "Coming Soon"
              will be available in future updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

