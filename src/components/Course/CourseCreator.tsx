import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Save, Eye } from 'lucide-react';
import { Course, Category } from '../../types/course';
import GeneralInfoStep from './Steps/GeneralInfoStep';
import CurriculumStep from './Steps/CurriculumStep';
import SEOStep from './Steps/SEOStep';
import PricingStep from './Steps/PricingStep';
import PublishStep from './Steps/PublishStep';

interface CourseCreatorProps {
  course?: Course;
  categories: Category[];
  onBack: () => void;
  onSave: (course: Partial<Course>) => void;
}

const CourseCreator: React.FC<CourseCreatorProps> = ({ course, categories, onBack, onSave }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [courseData, setCourseData] = useState<Partial<Course>>({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    thumbnail_url: '',
    preview_video_url: '',
    category_id: '',
    price: 0,
    discounted_price: 0,
    difficulty: 'beginner',
    status: 'draft',
    language: 'English',
    is_published: false,
    is_featured: false,
    meta_title: '',
    meta_description: '',
    sections: [],
    ...course
  });

  const steps = [
    { id: 'general', title: 'General Info', component: GeneralInfoStep },
    { id: 'curriculum', title: 'Curriculum', component: CurriculumStep },
    { id: 'seo', title: 'SEO', component: SEOStep },
    { id: 'pricing', title: 'Pricing', component: PricingStep },
    { id: 'publish', title: 'Publish', component: PublishStep }
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleSave = () => {
    onSave(courseData);
  };

  const handlePublish = () => {
    setCourseData(prev => ({ ...prev, status: 'published', is_published: true }));
    onSave({ ...courseData, status: 'published', is_published: true });
  };

  return (
    <div className="space-y-6 w-[1500px] -ml-42 mt-14">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-slate-400 hover:text-gray-800 hover:bg-from-amber-400 via-orange-500 to-red-600 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-6xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">
            {course ? 'Edit Course' : 'Create New Course'}
          </h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      <div className=" rounded-xl shadow-sm border border-amber-500/50 bg-slate-900/50">
        {/* Step Navigation */}
        <div className="border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleStepClick(index)}
                  className={`flex items-center space-x-2 px-4 py-2 font-mono rounded-lg transition-colors ${
                    index === currentStep
                      ? 'bg-blue-900 text-green-400 font-mono border border-gray-700'
                      : index < currentStep
                      ? 'text-green-600 hover:bg-blue-900'
                      : 'text-white hover:bg-blue-500'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full font-mono flex items-center justify-center text-sm font-medium ${
                    index === currentStep
                      ? 'bg-blue-500 text-white'
                      : index < currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className="font-medium">{step.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-blue-600 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          <CurrentStepComponent
            courseData={courseData}
            setCourseData={setCourseData}
            categories={categories}
            onPublish={handlePublish}
          />
        </div>

        {/* Step Navigation Buttons */}
        <div className="border border-gray-700 p-6 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-lg flex font-mono items-center space-x-2 transition-colors ${
              currentStep === 0
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-slate-400 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-3">
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handlePublish}
                className="px-6 py-2 bg-green-600 font-mono text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Publish Course</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white font-mono rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreator;