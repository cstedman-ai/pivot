import { useState, useRef } from 'react';
import { 
  FileText, Upload, X, Plus, Trash2, Download,
  User, Mail, Phone, MapPin, Linkedin, Globe,
  Briefcase, GraduationCap, Wrench, Award, Languages,
  ChevronDown, ChevronUp, Loader2, FileJson, FileType, FileCode
} from 'lucide-react';
import { ResumeData, WorkExperience, Education, ExportFormat } from '../types';
import { parseResume, exportResume, downloadBlob } from '../services/api';

const emptyResume: ResumeData = {
  contact: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
};

export const ResumeOrg = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    contact: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    certifications: false,
    languages: false,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newCert, setNewCert] = useState('');
  const [newLang, setNewLang] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.oasis.opendocument.text',
      'image/png',
      'image/jpeg',
    ];
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.odt', '.png', '.jpg', '.jpeg'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      setError('Please upload a PDF, DOC, DOCX, ODT, PNG, or JPG file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setError(null);
    setIsLoading(true);

    try {
      const data = await parseResume(file);
      setResumeData(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to parse resume. Please try again.');
      setSelectedFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (format: ExportFormat) => {
    if (!resumeData) return;

    setIsExporting(true);
    try {
      const blob = await exportResume(resumeData, format);
      const extensions: Record<ExportFormat, string> = {
        pdf: 'pdf',
        json: 'json',
        md: 'md',
        odt: 'odt',
      };
      const filename = `${resumeData.contact.fullName.replace(/\s+/g, '_') || 'resume'}.${extensions[format]}`;
      downloadBlob(blob, filename);
    } catch (err: any) {
      setError(err.response?.data?.error || `Failed to export as ${format.toUpperCase()}`);
    } finally {
      setIsExporting(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateContact = (field: string, value: string) => {
    if (!resumeData) return;
    setResumeData({
      ...resumeData,
      contact: { ...resumeData.contact, [field]: value },
    });
  };

  const updateSummary = (value: string) => {
    if (!resumeData) return;
    setResumeData({ ...resumeData, summary: value });
  };

  const addExperience = () => {
    if (!resumeData) return;
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: [''],
    };
    setResumeData({ ...resumeData, experience: [...resumeData.experience, newExp] });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    if (!resumeData) return;
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    if (!resumeData) return;
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id),
    });
  };

  const addEducation = () => {
    if (!resumeData) return;
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      location: '',
      graduationDate: '',
      gpa: '',
      highlights: [],
    };
    setResumeData({ ...resumeData, education: [...resumeData.education, newEdu] });
  };

  const updateEducation = (id: string, field: string, value: any) => {
    if (!resumeData) return;
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    if (!resumeData) return;
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id),
    });
  };

  const addSkill = () => {
    if (!resumeData || !newSkill.trim()) return;
    setResumeData({ ...resumeData, skills: [...resumeData.skills, newSkill.trim()] });
    setNewSkill('');
  };

  const removeSkill = (index: number) => {
    if (!resumeData) return;
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  const addCertification = () => {
    if (!resumeData || !newCert.trim()) return;
    setResumeData({ ...resumeData, certifications: [...resumeData.certifications, newCert.trim()] });
    setNewCert('');
  };

  const removeCertification = (index: number) => {
    if (!resumeData) return;
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter((_, i) => i !== index),
    });
  };

  const addLanguage = () => {
    if (!resumeData || !newLang.trim()) return;
    setResumeData({ ...resumeData, languages: [...(resumeData.languages || []), newLang.trim()] });
    setNewLang('');
  };

  const removeLanguage = (index: number) => {
    if (!resumeData) return;
    setResumeData({
      ...resumeData,
      languages: (resumeData.languages || []).filter((_, i) => i !== index),
    });
  };

  const startNew = () => {
    setResumeData({ ...emptyResume });
    setSelectedFile(null);
    setError(null);
  };

  const clearResume = () => {
    setResumeData(null);
    setSelectedFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const SectionHeader = ({ 
    title, 
    icon: Icon, 
    section, 
    color 
  }: { 
    title: string; 
    icon: any; 
    section: string; 
    color: string;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-3 bg-indigo-500/20 rounded-xl">
                <FileText className="w-8 h-8 text-indigo-400" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                Resume Builder
              </h1>
            </div>
            <p className="text-lg text-slate-400">
              Upload, edit, and export your resume in multiple formats
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 flex items-center gap-3">
              <X className="w-5 h-5" />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-auto hover:text-red-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {!resumeData ? (
            /* Upload Section */
            <div className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-indigo-400 bg-indigo-500/10'
                    : 'border-slate-600 hover:border-indigo-500 hover:bg-slate-800/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-16 h-16 text-indigo-400 animate-spin" />
                    <p className="text-xl font-medium text-slate-300">Parsing your resume...</p>
                    <p className="text-sm text-slate-500">This may take a moment</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-16 h-16 mx-auto mb-4 text-slate-500" />
                    <p className="text-xl font-medium text-slate-300 mb-2">
                      Drop your resume here, or click to browse
                    </p>
                    <p className="text-sm text-slate-500">
                      Supports PDF, DOC, DOCX, ODT, PNG, and JPG files (max 10MB)
                    </p>
                  </>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.odt,.png,.jpg,.jpeg"
                  onChange={handleChange}
                />
              </div>

              <div className="text-center">
                <span className="text-slate-500">or</span>
              </div>

              <button
                onClick={startNew}
                className="w-full p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-slate-300 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Start with a blank resume
              </button>
            </div>
          ) : (
            /* Editor Section */
            <div className="space-y-6">
              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <span className="text-slate-300 font-medium">
                    {selectedFile?.name || 'New Resume'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-slate-500 mr-2">Export as:</span>
                  <button
                    onClick={() => handleExport('pdf')}
                    disabled={isExporting}
                    className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <FileType className="w-4 h-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    disabled={isExporting}
                    className="px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <FileJson className="w-4 h-4" />
                    JSON
                  </button>
                  <button
                    onClick={() => handleExport('md')}
                    disabled={isExporting}
                    className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <FileCode className="w-4 h-4" />
                    MD
                  </button>
                  <button
                    onClick={() => handleExport('odt')}
                    disabled={isExporting}
                    className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    ODT
                  </button>
                  <button
                    onClick={clearResume}
                    className="px-3 py-2 bg-slate-600 hover:bg-slate-500 text-slate-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    New
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
                <SectionHeader title="Contact Information" icon={User} section="contact" color="bg-indigo-500/20 text-indigo-400" />
                {expandedSections.contact && (
                  <div className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            value={resumeData.contact.fullName}
                            onChange={e => updateContact('fullName', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="email"
                            value={resumeData.contact.email}
                            onChange={e => updateContact('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="tel"
                            value={resumeData.contact.phone}
                            onChange={e => updateContact('phone', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            value={resumeData.contact.location}
                            onChange={e => updateContact('location', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="New York, NY"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">LinkedIn (optional)</label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="url"
                            value={resumeData.contact.linkedin || ''}
                            onChange={e => updateContact('linkedin', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="linkedin.com/in/johndoe"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Website (optional)</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="url"
                            value={resumeData.contact.website || ''}
                            onChange={e => updateContact('website', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="johndoe.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
                <SectionHeader title="Professional Summary" icon={FileText} section="summary" color="bg-purple-500/20 text-purple-400" />
                {expandedSections.summary && (
                  <div className="p-6">
                    <textarea
                      value={resumeData.summary}
                      onChange={e => updateSummary(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      placeholder="A brief professional summary highlighting your key qualifications and career objectives..."
                    />
                  </div>
                )}
              </div>

              {/* Experience */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
                <SectionHeader title="Work Experience" icon={Briefcase} section="experience" color="bg-emerald-500/20 text-emerald-400" />
                {expandedSections.experience && (
                  <div className="p-6 space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="p-4 bg-slate-900/50 border border-slate-600 rounded-xl space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-slate-500">Position {index + 1}</span>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={exp.position}
                            onChange={e => updateExperience(exp.id, 'position', e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Job Title"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Company Name"
                          />
                          <input
                            type="text"
                            value={exp.location}
                            onChange={e => updateExperience(exp.id, 'location', e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Location"
                          />
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
                              className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                              placeholder="Start Date"
                            />
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                              disabled={exp.current}
                              className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                              placeholder="End Date"
                            />
                          </div>
                        </div>
                        <label className="flex items-center gap-2 text-sm text-slate-400">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={e => {
                              updateExperience(exp.id, 'current', e.target.checked);
                              if (e.target.checked) updateExperience(exp.id, 'endDate', 'Present');
                            }}
                            className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
                          />
                          Currently working here
                        </label>
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Highlights / Achievements</label>
                          {exp.highlights.map((highlight, hIndex) => (
                            <div key={hIndex} className="flex gap-2 mb-2">
                              <input
                                type="text"
                                value={highlight}
                                onChange={e => {
                                  const newHighlights = [...exp.highlights];
                                  newHighlights[hIndex] = e.target.value;
                                  updateExperience(exp.id, 'highlights', newHighlights);
                                }}
                                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                                placeholder="Achievement or responsibility..."
                              />
                              <button
                                onClick={() => {
                                  const newHighlights = exp.highlights.filter((_, i) => i !== hIndex);
                                  updateExperience(exp.id, 'highlights', newHighlights);
                                }}
                                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => updateExperience(exp.id, 'highlights', [...exp.highlights, ''])}
                            className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" /> Add highlight
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addExperience}
                      className="w-full p-3 border-2 border-dashed border-slate-600 hover:border-indigo-500 rounded-xl text-slate-400 hover:text-indigo-400 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" /> Add Work Experience
                    </button>
                  </div>
                )}
              </div>

              {/* Education */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
                <SectionHeader title="Education" icon={GraduationCap} section="education" color="bg-blue-500/20 text-blue-400" />
                {expandedSections.education && (
                  <div className="p-6 space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="p-4 bg-slate-900/50 border border-slate-600 rounded-xl space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-slate-500">Education {index + 1}</span>
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={e => updateEducation(edu.id, 'institution', e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Institution Name"
                          />
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Degree (e.g., Bachelor's)"
                          />
                          <input
                            type="text"
                            value={edu.field}
                            onChange={e => updateEducation(edu.id, 'field', e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Field of Study"
                          />
                          <input
                            type="text"
                            value={edu.location}
                            onChange={e => updateEducation(edu.id, 'location', e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Location"
                          />
                          <input
                            type="text"
                            value={edu.graduationDate}
                            onChange={e => updateEducation(edu.id, 'graduationDate', e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Graduation Date"
                          />
                          <input
                            type="text"
                            value={edu.gpa || ''}
                            onChange={e => updateEducation(edu.id, 'gpa', e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                            placeholder="GPA (optional)"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={addEducation}
                      className="w-full p-3 border-2 border-dashed border-slate-600 hover:border-indigo-500 rounded-xl text-slate-400 hover:text-indigo-400 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" /> Add Education
                    </button>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
                <SectionHeader title="Skills" icon={Wrench} section="skills" color="bg-orange-500/20 text-orange-400" />
                {expandedSections.skills && (
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resumeData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-sm"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(index)}
                            className="hover:text-red-400 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={e => setNewSkill(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addSkill()}
                        className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                        placeholder="Add a skill..."
                      />
                      <button
                        onClick={addSkill}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Certifications */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
                <SectionHeader title="Certifications" icon={Award} section="certifications" color="bg-yellow-500/20 text-yellow-400" />
                {expandedSections.certifications && (
                  <div className="p-6">
                    <div className="space-y-2 mb-4">
                      {resumeData.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-600 rounded-lg"
                        >
                          <span className="text-slate-300">{cert}</span>
                          <button
                            onClick={() => removeCertification(index)}
                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCert}
                        onChange={e => setNewCert(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addCertification()}
                        className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                        placeholder="Add a certification..."
                      />
                      <button
                        onClick={addCertification}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Languages */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
                <SectionHeader title="Languages" icon={Languages} section="languages" color="bg-pink-500/20 text-pink-400" />
                {expandedSections.languages && (
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(resumeData.languages || []).map((lang, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-500/20 text-pink-300 rounded-full text-sm"
                        >
                          {lang}
                          <button
                            onClick={() => removeLanguage(index)}
                            className="hover:text-red-400 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newLang}
                        onChange={e => setNewLang(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addLanguage()}
                        className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-indigo-500"
                        placeholder="Add a language..."
                      />
                      <button
                        onClick={addLanguage}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
