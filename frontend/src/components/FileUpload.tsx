import { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export const FileUpload = ({ onFileSelect, selectedFile }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
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

  const handleFile = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.oasis.opendocument.text',
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];

    const allowedExtensions = ['.pdf', '.doc', '.docx', '.odt', '.png', '.jpg', '.jpeg'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      alert('Please upload a PDF, DOC, DOCX, ODT, PNG, or JPG file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    onFileSelect(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    onFileSelect(null as any);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drop your resume here, or click to browse
          </p>
          <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, ODT, PNG, and JPG files (max 10MB)</p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.odt,.png,.jpg,.jpeg"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="border-2 border-primary-500 rounded-lg p-6 bg-primary-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-primary-600" />
              <div>
                <p className="font-medium text-gray-800">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="p-2 hover:bg-red-100 rounded-full transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

