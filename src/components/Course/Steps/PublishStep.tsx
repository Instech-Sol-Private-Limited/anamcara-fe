import React from 'react';
import { CheckCircle, AlertCircle, Clock, Globe, Users, Star } from 'lucide-react';
import { Course } from '../../../types/course';

interface PublishStepProps {
  courseData: Partial<Course>;
  setCourseData: (data: Partial<Course>) => void;
  onPublish: () => void;
}

const PublishStep: React.FC<PublishStepProps> = ({ courseData, setCourseData, onPublish }) => {
  const handleInputChange = (field: keyof Course, value: any) => {
    setCourseData({ ...courseData, [field]: value });
  };

  const getValidationItems = () => {
    const items = [
      {
        id: 'title',
        label: 'Course title',
        valid: !!(courseData.title && courseData.title.length > 0),
        required: true
      },
      {
        id: 'description',
        label: 'Course description',
        valid: !!(courseData.description && courseData.description.length > 50),
        required: true
      },
      {
        id: 'category',
        label: 'Course category',
        valid: !!(courseData.category_id),
        required: true
      },
      {
        id: 'price',
        label: 'Pricing information',
        valid: !!(courseData.price !== undefined && courseData.price >= 0),
        required: true
      },
      {
        id: 'sections',
        label: 'At least one section',
        valid: !!(courseData.sections && courseData.sections.length > 0),
        required: true
      },
      {
        id: 'lessons',
        label: 'At least one lesson',
        valid: !!(courseData.sections && courseData.sections.some(s => s.lessons.length > 0)),
        required: true
      },
      {
        id: 'thumbnail',
        label: 'Course thumbnail',
        valid: !!(courseData.thumbnail_url),
        required: false
      },
      {
        id: 'preview',
        label: 'Preview video',
        valid: !!(courseData.preview_video_url),
        required: false
      },
      {
        id: 'seo',
        label: 'SEO optimization',
        valid: !!(courseData.meta_title && courseData.meta_description),
        required: false
      }
    ];

    return items;
  };

  const validationItems = getValidationItems();
  const requiredValid = validationItems.filter(item => item.required).every(item => item.valid);
  const allValid = validationItems.every(item => item.valid);
  const validCount = validationItems.filter(item => item.valid).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-mono font-semibold text-blue-400 mb-4">Publish Course</h3>
        <p className="text-slate-400 font-mono mb-6">
          Review your course details and publish when ready. You can always update your course after publishing.
        </p>
      </div>

      <div className="bg-slate-900 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-slate-400 font-mono">Course Readiness</h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400 font-mono">
              {validCount}/{validationItems.length} complete
            </span>
            <div className="w-32 bg-gray-200 font-mono rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(validCount / validationItems.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {validationItems.map((item) => (
            <div key={item.id} className="flex items-center font-mono space-x-3">
              {item.valid ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className={`w-5 h-5 ${item.required ? 'text-red-500' : 'text-yellow-500'}`} />
              )}
              <span className={`text-sm ${item.valid ? 'text-slate-400' : item.required ? 'text-red-700' : 'text-yellow-700'}`}>
                {item.label}
                {item.required && !item.valid && ' (Required)'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-slate-400 font-mono mb-3">Publishing Options</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={courseData.is_featured || false}
                onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-slate-400 font-mono">Feature this course</span>
                <p className="text-xs text-slate-400 font-mono">Display prominently on your profile</p>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-slate-900 border border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-slate-400 font-mono mb-3">Course Status</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <span className="text-sm font-medium text-slate-400 font-mono">
                  {courseData.status === 'published' ? 'Published' : 'Draft'}
                </span>
                <p className="text-xs text-slate-400 font-mono">
                  {courseData.status === 'published' 
                    ? 'Your course is live and visible to students'
                    : 'Your course is saved but not yet published'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-slate-400 font-mono mb-3">What happens when you publish?</h4>
        <ul className="space-y-2 text-sm text-slate-400 font-mono">
          <li className="flex items-start space-x-2">
            <Globe className="w-4 h-4 mt-0.5" />
            <span>Your course becomes publicly available to students</span>
          </li>
          <li className="flex items-start space-x-2">
            <Users className="w-4 h-4 mt-0.5" />
            <span>Students can enroll and start learning immediately</span>
          </li>
          <li className="flex items-start space-x-2">
            <Star className="w-4 h-4 mt-0.5" />
            <span>Course appears in search results and category listings</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 mt-0.5" />
            <span>You can continue to update content and add new lessons</span>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-slate-400 font-mono">
          {!requiredValid && (
            <p className="text-red-600 ">Please complete all required fields before publishing</p>
          )}
          {requiredValid && !allValid && (
            <p className="text-yellow-600">Your course is ready to publish. Consider completing optional items for better visibility.</p>
          )}
          {allValid && (
            <p className="text-green-600">Your course is fully optimized and ready to publish!</p>
          )}
        </div>
        
        <button
          onClick={onPublish}
          disabled={!requiredValid}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            requiredValid
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-black cursor-not-allowed'
          }`}
        >
          {courseData.status === 'published' ? 'Update Course' : 'Publish Course'}
        </button>
      </div>
    </div>
  );
};

export default PublishStep;