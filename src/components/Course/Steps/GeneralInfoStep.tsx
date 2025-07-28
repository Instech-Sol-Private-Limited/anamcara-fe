import React, { useRef } from 'react';
import { Upload, Link } from 'lucide-react';
import { Course, Category } from '../../../types/course';

interface GeneralInfoStepProps {
  courseData: Partial<Course>;
  setCourseData: (data: Partial<Course>) => void;
  categories: Category[];
}

const GeneralInfoStep: React.FC<GeneralInfoStepProps> = ({ courseData, setCourseData, categories }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof Course, value: any) => {
    setCourseData({ ...courseData, [field]: value });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    handleInputChange('title', title);
    if (!courseData.slug || courseData.slug === generateSlug(courseData.title || '')) {
      handleInputChange('slug', generateSlug(title));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      handleInputChange('thumbnail_url', imageUrl);
      
      // In a real application, you would upload the file to your server/cloud storage
      console.log('File selected:', file);
      console.log('File size:', file.size);
      console.log('File type:', file.type);
      
      // Show success message
      alert(`File "${file.name}" selected successfully! In production, this would be uploaded to your server.`);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-blue-500 font-mono mb-4">Course Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium font-mono text-slate-200 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              value={courseData.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 bg-slate-900/50  font-mono rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter course title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium font-mono text-slate-200 mb-2">
              Course Slug *
            </label>
            <input
              type="text"
              value={courseData.slug || ''}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 bg-slate-900/50  font-mono rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="course-slug"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium font-mono text-slate-200 mb-2">
          Short Description *
        </label>
        <textarea
          value={courseData.short_description || ''}
          onChange={(e) => handleInputChange('short_description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-700 bg-slate-900/50  font-mono rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of your course (max 200 characters)"
          maxLength={200}
        />
        <p className="text-sm text-slate-200 font-mono mt-1">
          {(courseData.short_description || '').length}/200 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Full Description *
        </label>
        <textarea
          value={courseData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={8}
          className="w-full px-3 py-2 border border-gray-700 bg-slate-900/50  font-mono rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Detailed description of your course content, learning objectives, and what students will achieve..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Category *
          </label>
          <select
            value={courseData.category_id || ''}
            onChange={(e) => handleInputChange('category_id', e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 bg-slate-900/50  font-mono rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium font-mono text-slate-200 mb-2">
            Difficulty Level
          </label>
          <select
            value={courseData.difficulty || 'beginner'}
            onChange={(e) => handleInputChange('difficulty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 bg-slate-900/50  font-mono rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium font-mono text-slate-200 mb-2">
            Language
          </label>
          <select
            value={courseData.language || 'English'}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 bg-slate-900/50  font-mono rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium font-mono text-slate-200 mb-2">
          Course Thumbnail
        </label>
        <div className="border-2 border-dashed border-gray-700 bg-slate-900/50  font-mono rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          {courseData.thumbnail_url ? (
            <div className="space-y-4">
              <img 
                src={courseData.thumbnail_url} 
                alt="Course thumbnail preview" 
                className="mx-auto max-h-48 rounded-lg font-mono object-cover"
              />
              <div>
                <p className="text-green-600 mb-2 font-mono">✓ Thumbnail uploaded successfully</p>
                <button
                  type="button"
                  onClick={triggerFileUpload}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Change Image
                </button>
              </div>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 text-gray-400  mx-auto mb-4" />
              <p className="text-slate-400 mb-2 font-mono">Upload course thumbnail</p>
              <p className="text-sm text-green-400 mb-4">Recommended size: 1280x720 pixels</p>
              <button
                type="button"
                onClick={triggerFileUpload}
                className="px-4 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choose File
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 font-mono textgra-y-700 mb-2">
          Preview Video URL (Optional)
        </label>
        <div className="relative">
          <Link className="w-5 h-5 text-gray-400 absolute  left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="url"
            value={courseData.preview_video_url || ''}
            onChange={(e) => handleInputChange('preview_video_url', e.target.value)}
            className="w-full pl-10 pr-4 py-2 font-mono border border-gray-700 bg-slate-900/50  font-monorounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoStep;