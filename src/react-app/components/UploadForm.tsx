import { useState } from 'react';
import { Upload, Check, AlertCircle } from 'lucide-react';

interface FormData {
  linkedinUrl: string;
  resume: File | null;
  recommendationLetter: File | null;
}

interface FormErrors {
  linkedinUrl?: string;
  resume?: string;
  recommendationLetter?: string;
}

export default function UploadForm() {
  const [formData, setFormData] = useState<FormData>({
    linkedinUrl: '',
    resume: null,
    recommendationLetter: null,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  const validateLinkedInUrl = (url: string): boolean => {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedinRegex.test(url);
  };

  const validateFile = (file: File): string | null => {
    if (file.type !== 'application/pdf') {
      return 'Only PDF files are allowed';
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB
      return 'File size must be less than 10MB';
    }
    return null;
  };

  const handleLinkedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, linkedinUrl: value }));
    
    if (value && !validateLinkedInUrl(value)) {
      setErrors(prev => ({ ...prev, linkedinUrl: 'Please enter a valid LinkedIn profile URL' }));
    } else {
      setErrors(prev => ({ ...prev, linkedinUrl: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'resume' | 'recommendationLetter') => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const error = validateFile(file);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
        return;
      } else {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: FormErrors = {};
    
    if (!formData.linkedinUrl) {
      newErrors.linkedinUrl = 'LinkedIn profile URL is required';
    } else if (!validateLinkedInUrl(formData.linkedinUrl)) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn profile URL';
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }
    
    if (!formData.recommendationLetter) {
      newErrors.recommendationLetter = 'Recommendation letter is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, log the data
      console.log('Form submitted with data:', {
        linkedinUrl: formData.linkedinUrl,
        resumeFileName: formData.resume?.name,
        recommendationLetterFileName: formData.recommendationLetter?.name,
      });
    }
  };

  const FileUploadField = ({ 
    id, 
    label, 
    file, 
    error, 
    onChange 
  }: { 
    id: string;
    label: string;
    file: File | null;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="file"
          id={id}
          accept=".pdf"
          onChange={onChange}
          className="hidden"
        />
        <label
          htmlFor={id}
          className={`relative block w-full p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 focus-within:ring-4 focus-within:ring-blue-500/20 ${
            error 
              ? 'border-red-300 bg-red-50 hover:border-red-400' 
              : file 
                ? 'border-green-300 bg-green-50 hover:border-green-400'
                : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
          }`}
        >
          <div className="flex items-center justify-center space-x-3">
            {file ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700 font-medium">{file.name}</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Click to upload PDF (max 10MB)</span>
              </>
            )}
          </div>
        </label>
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Documents
          </h2>
          <p className="text-lg text-gray-600">
            Provide your LinkedIn profile and documents to get started with your applications
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
              LinkedIn Profile URL *
            </label>
            <input
              type="url"
              id="linkedin"
              value={formData.linkedinUrl}
              onChange={handleLinkedInChange}
              placeholder="https://linkedin.com/in/your-profile"
              className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${
                errors.linkedinUrl 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
              required
            />
            {errors.linkedinUrl && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errors.linkedinUrl}</span>
              </div>
            )}
          </div>

          <FileUploadField
            id="resume"
            label="Resume *"
            file={formData.resume}
            error={errors.resume}
            onChange={(e) => handleFileChange(e, 'resume')}
          />

          <FileUploadField
            id="recommendation"
            label="Recommendation Letter *"
            file={formData.recommendationLetter}
            error={errors.recommendationLetter}
            onChange={(e) => handleFileChange(e, 'recommendationLetter')}
          />

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
