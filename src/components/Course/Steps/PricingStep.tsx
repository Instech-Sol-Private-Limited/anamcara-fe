import React from 'react';
import { DollarSign, Percent, Tag, TrendingUp } from 'lucide-react';
import { Course } from '../../../types/course';

interface PricingStepProps {
  courseData: Partial<Course>;
  setCourseData: (data: Partial<Course>) => void;
}

const PricingStep: React.FC<PricingStepProps> = ({ courseData, setCourseData }) => {
  const handleInputChange = (field: keyof Course, value: any) => {
    setCourseData({ ...courseData, [field]: value });
  };

  const calculateDiscount = () => {
    if (courseData.price && courseData.discounted_price) {
      const discount = ((courseData.price - courseData.discounted_price) / courseData.price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const suggestedPrices = [
    { label: 'Free', price: 0, description: 'Great for building audience' },
    { label: 'Basic', price: 29, description: 'Perfect for introductory courses' },
    { label: 'Standard', price: 99, description: 'Most popular pricing tier' },
    { label: 'Premium', price: 199, description: 'For comprehensive courses' },
    { label: 'Professional', price: 299, description: 'Advanced professional training' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-blue-400 font-mono mb-4">Course Pricing</h3>
        <p className="text-slate-400 font-mono mb-6">
          Set competitive pricing for your course. You can always adjust these later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium font-mono text-slate-200 mb-2">
            Course Price *
          </label>
          <div className="relative">
            <DollarSign className="w-5 h-5 text-slate-400 absolute font-mono left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="number"
              value={courseData.price || ''}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 font-mono mb-2">
            Discounted Price (Optional)
          </label>
          <div className="relative">
            <Tag className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="number"
              value={courseData.discounted_price || ''}
              onChange={(e) => handleInputChange('discounted_price', parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          {courseData.price && courseData.discounted_price && courseData.discounted_price > 0 && (
            <p className="mt-1 text-sm text-green-600">
              {calculateDiscount()}% discount
            </p>
          )}
        </div>
      </div>

      <div className="bg-slate-900 border border-gray-700 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Percent className="w-5 h-5 text-slate-200 mt-0.5" />
          <div>
            <h4 className="font-semibold text-slate-200 font-mono mb-2">Pricing Preview</h4>
            <div className=" border border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                {courseData.discounted_price && courseData.discounted_price > 0 ? (
                  <>
                    <span className="text-2xl font-bold text-slate-400">
                      ${courseData.discounted_price || 0}
                    </span>
                    <span className="text-lg text-slate-400 line-through">
                      ${courseData.price || 0}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      {calculateDiscount()}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-slate-400">
                    {courseData.price === 0 ? 'Free' : `$${courseData.price || 0}`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-200 font-mono mb-3">Suggested Pricing</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestedPrices.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleInputChange('price', suggestion.price)}
              className={`p-4 border rounded-lg font-mono text-left transition-colors ${
                courseData.price === suggestion.price
                  ? 'border-blue-400 '
                  : 'border border-gray-700 hover:border-blue-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-400 font-mono">{suggestion.label}</span>
                <span className="text-lg font-bold text-blue-600">
                  {suggestion.price === 0 ? 'Free' : `$${suggestion.price}`}
                </span>
              </div>
              <p className="text-sm text-slate-400">{suggestion.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className=" border border-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-slate-200 font-mono mb-3">Pricing Tips</h4>
        <ul className="space-y-2 text-sm text-slate-400 font-mono">
          <li className="flex items-start space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
            <span>Research competitor pricing to stay competitive</span>
          </li>
          <li className="flex items-start space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
            <span>Consider offering early-bird discounts for new courses</span>
          </li>
          <li className="flex items-start space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
            <span>Free courses can help build your audience and reviews</span>
          </li>
          <li className="flex items-start space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
            <span>You can always adjust pricing based on demand</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PricingStep;