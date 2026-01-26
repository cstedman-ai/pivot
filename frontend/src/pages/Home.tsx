import { useState, useEffect } from 'react';
import { FileUpload } from '../components/FileUpload';
import { AnalysisResults } from '../components/AnalysisResults';
import { analyzeResume } from '../services/api';
import { AnalysisResult } from '../types';
import { Loader2, Target, ChevronDown } from 'lucide-react';
import { positions, getDepartments } from '../components/partials/positions';

export const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetPosition, setTargetPosition] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  // Log environment on mount
  useEffect(() => {
    console.group('🔧 Application Configuration');
    console.log('VITE_API_URL (env):', import.meta.env.VITE_API_URL || 'undefined (using default)');
    console.log('API Base URL:', import.meta.env.VITE_API_URL || '/api');
    console.log('Mode:', import.meta.env.MODE);
    console.log('Is Dev:', import.meta.env.DEV);
    console.log('Is Prod:', import.meta.env.PROD);
    console.log('Window Location:', window.location.href);
    console.groupEnd();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.group('🚀 Resume Analysis Started');
    console.log('File selected:', file?.name);
    console.log('Target position:', targetPosition);

    if (!file || !targetPosition.trim()) {
      console.warn('⚠️ Validation failed: Missing file or position');
      console.groupEnd();
      setError('Please upload a resume and enter a target position');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('📡 Calling analyzeResume...');
      const analysisResults = await analyzeResume(file, targetPosition);
      console.log('✅ Analysis successful:', Object.keys(analysisResults));
      console.groupEnd();
      setResults(analysisResults);
    } catch (err: any) {
      console.error('❌ Analysis error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response,
        status: err.response?.status,
        data: err.response?.data
      });
      console.groupEnd();
      
      const errorMessage = err.response?.data?.error || 
        err.message || 
        'Failed to analyze resume. Please try again.';
      
      console.error('Setting error message:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setTargetPosition('');
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {!results ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-3">
                Accelerate Your Career Growth
              </h1>
              <p className="text-lg text-gray-600">
                Upload your resume and discover the skills you need to land your dream job
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Target Position Dropdown */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4" />
                    <span>Target Position</span>
                  </label>
                  <div className="relative">
                    <select
                      value={targetPosition}
                      onChange={(e) => setTargetPosition(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                      disabled={loading}
                    >
                      <option value="">Select a position...</option>
                      {getDepartments().map((department) => {
                        const deptPositions = positions.filter(
                          (pos) => pos.department === department
                        );
                        return (
                          <optgroup key={department} label={department}>
                            {deptPositions.map((position) => (
                              <option key={position.id} value={position.title}>
                                {position.title} ({position.level})
                              </option>
                            ))}
                          </optgroup>
                        );
                      })}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {targetPosition && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected: <span className="font-medium text-primary-600">{targetPosition}</span>
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Resume Upload
                  </label>
                  <FileUpload onFileSelect={setFile} selectedFile={file} />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !file || !targetPosition.trim()}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <span>Analyze Resume</span>
                  )}
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-3">📄</div>
                <h3 className="font-semibold text-gray-800 mb-2">Upload Resume</h3>
                <p className="text-sm text-gray-600">
                  PDF, DOC, DOCX, ODT, PNG, and JPG formats supported
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-semibold text-gray-800 mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">
                  Powered by advanced AI technology
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="font-semibold text-gray-800 mb-2">Get Resources</h3>
                <p className="text-sm text-gray-600">
                  Personalized learning path
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Your Career Analysis</h1>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
              >
                Start New Analysis
              </button>
            </div>
            <AnalysisResults results={results} />
          </div>
        )}
      </div>
    </div>
  );
};

