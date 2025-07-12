import React from 'react';
import { Search, Globe, FileText } from 'lucide-react';
import { Course } from '../../../types/course';

interface SEOStepProps {
  courseData: Partial<Course>;
  setCourseData: (data: Partial<Course>) => void;
}

const SEOStep: React.FC<SEOStepProps> = ({ courseData, setCourseData }) => {
  const handleInputChange = (field: keyof Course, value: any) => {
    setCourseData({ ...courseData, [field]: value });
  };

  const generateMetaTitle = () => {
    if (courseData.title) {
      const metaTitle = `${courseData.title} - Learn ${courseData.title} Online Course`;
      handleInputChange('meta_title', metaTitle);
    }
  };

  const generateMetaDescription = () => {
    if (courseData.short_description) {
      const metaDescription = `${courseData.short_description} Join thousands of students learning ${courseData.title}. Start your learning journey today!`;
      handleInputChange('meta_description', metaDescription);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold font-mono  text-blue-400 mb-4">SEO Optimization</h3>
        <p className="text-slate-400 mb-6 font-mono">
          Optimize your course for search engines to help students find your content more easily.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium font-mono text-slate-200">
              Meta Title
            </label>
            <button
              onClick={generateMetaTitle}
              className="text-sm text-blue-400 font-mono hover:text-blue-700"
            >
              Auto-generate
            </button>
          </div>
          <input
            type="text"
            value={courseData.meta_title || ''}
            onChange={(e) => handleInputChange('meta_title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter meta title for search engines"
            maxLength={60}
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-green-400">
              {(courseData.meta_title || '').length}/60 characters
            </p>
            <div className="flex items-center space-x-1">
              <Search className="w-4 h-4 font-mono text-gray-400" />
              <span className="text-sm text-slate-400 font-mono">Search engine title</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium font-mono text-slate-200">
              Meta Description
            </label>
            <button
              onClick={generateMetaDescription}
              className="text-sm text-blue-400 hover:text-blue-700"
            >
              Auto-generate
            </button>
          </div>
          <textarea
            value={courseData.meta_description || ''}
            onChange={(e) => handleInputChange('meta_description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter meta description for search engines"
            maxLength={160}
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-green-400">
              {(courseData.meta_description || '').length}/160 characters
            </p>
            <div className="flex items-center space-x-1">
              <FileText className="w-4 h-4 font-mono text-slate-400" />
              <span className="text-sm text-blue-400 font-mono">Search engine description</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-gray-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-white mt-0.5" />
            <div>
              <h4 className="font-semibold text-white font-mono mb-2">SEO Preview</h4>
              <div className="bg-slate-900  border border-gray-700 rounded-lg p-4">
                <div className="text-blue-600 text-lg font-medium font-mono mb-1">
                  {courseData.meta_title || courseData.title || 'Course Title'}
                </div>
                <div className="text-green-600 text-sm font-mono mb-2">
                  https://yoursite.com/course/{courseData.slug || 'course-slug'}
                </div>
                <div className="text-slate-400 text-sm font-mono">
                  {courseData.meta_description || courseData.short_description || 'Course description will appear here...'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-slate-200 font-mono mb-3">SEO Tips</h4>
          <ul className="space-y-2 text-sm text-slate-400 font-mono">
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
              <span>Keep your meta title under 60 characters for best display in search results</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
              <span>Write a compelling meta description that includes your target keywords</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
              <span>Make sure your slug is descriptive and includes relevant keywords</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
              <span>Your meta description should be between 150-160 characters</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SEOStep;