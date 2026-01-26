import axios from 'axios';
import { AnalysisResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeResume = async (
  file: File,
  targetPosition: string
): Promise<AnalysisResult> => {
  console.group('📤 Resume Upload Request');
  console.log('File:', {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: new Date(file.lastModified).toISOString()
  });
  console.log('Target Position:', targetPosition);
  console.log('API Base URL:', API_BASE_URL);
  console.log('Full URL:', `${API_BASE_URL}/analyze`);
  
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('targetPosition', targetPosition);

  console.log('FormData contents:');
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}:`, `File(${value.name}, ${value.size} bytes, ${value.type})`);
    } else {
      console.log(`  ${key}:`, value);
    }
  }

  try {
    console.log('⏳ Sending request...');
    
    // For file uploads with FormData, use axios directly without custom instance
    // This ensures the browser sets Content-Type with the proper multipart boundary
    const response = await axios.post<{ success: boolean; data: AnalysisResult }>(
      `${API_BASE_URL}/analyze`,
      formData
    );

    console.log('✅ Response received:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      dataKeys: Object.keys(response.data)
    });
    console.groupEnd();

    return response.data.data;
  } catch (error: any) {
    console.error('❌ Upload failed:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data,
      responseHeaders: error.response?.headers,
      requestURL: error.config?.url,
      requestMethod: error.config?.method,
    });
    console.groupEnd();
    throw error;
  }
};

export const checkHealth = async (): Promise<{ status: string; message: string }> => {
  const response = await api.get('/health');
  return response.data;
};

