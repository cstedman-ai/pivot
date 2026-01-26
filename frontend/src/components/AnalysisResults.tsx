import { useRef, useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Award, 
  Map, 
  ExternalLink,
  TrendingUp,
  Download,
  Loader2
} from 'lucide-react';
import { AnalysisResult } from '../types';
import html2pdf from 'html2pdf.js';

interface AnalysisResultsProps {
  results: AnalysisResult;
}

export const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'important':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'nice-to-have':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return '📚';
      case 'documentation':
        return '📖';
      case 'tutorial':
        return '🎓';
      case 'book':
        return '📕';
      case 'video':
        return '🎥';
      default:
        return '📄';
    }
  };

  const handleSaveAsPDF = async () => {
    if (!contentRef.current) return;

    setIsGeneratingPDF(true);

    try {
      const opt = {
        margin: 10,
        filename: `career-analysis-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(opt).from(contentRef.current).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Save Assessment Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveAsPDF}
          disabled={isGeneratingPDF}
          className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Save Assessment as PDF</span>
            </>
          )}
        </button>
      </div>

      {/* PDF Content Wrapper */}
      <div ref={contentRef} className="space-y-8">
      {/* Summary */}
      <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-800">Analysis Summary</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">{results.summary}</p>
      </section>

      {/* Current Skills */}
      <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">Current Skills</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {results.currentSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Skill Gaps */}
      <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-800">Skill Gaps to Address</h2>
        </div>
        <div className="space-y-4">
          {results.skillGaps.map((gap, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getImportanceColor(gap.importance)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{gap.skill}</h3>
                <span className="text-xs font-medium uppercase px-2 py-1 rounded">
                  {gap.importance}
                </span>
              </div>
              <p className="text-sm">{gap.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Resources */}
      <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Recommended Resources</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {results.learningResources.map((resource, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                  <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getLevelColor(resource.level)}`}>
                  {resource.level}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{resource.provider}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">⏱️ {resource.estimatedTime}</span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm font-medium"
                >
                  <span>View</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Recommended Certifications</h2>
        </div>
        <div className="space-y-4">
          {results.certifications.map((cert, index) => (
            <div key={index} className="p-5 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.provider}</p>
                </div>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-gray-700 mb-3">{cert.relevance}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>💰 {cert.estimatedCost}</span>
                <span>📅 {cert.preparationTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl shadow-md p-6 border border-primary-200">
        <div className="flex items-center space-x-3 mb-4">
          <Map className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-800">Your Learning Roadmap</h2>
        </div>
        <div className="space-y-3">
          {results.roadmap.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <p className="text-gray-800 pt-1 flex-1">{step}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

