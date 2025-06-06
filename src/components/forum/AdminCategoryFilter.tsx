import React, { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Category {
  id: string;
  category_name: string;
}

interface AdminCategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onToggle: (category: string) => void;
  isLoading?: boolean;
}

const AdminCategoryFilter: React.FC<AdminCategoryFilterProps> = ({
  categories,
  selectedCategories,
  onToggle,
  isLoading = false
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderSkeletons = () => (
    <div className="flex gap-2">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="w-20 h-8 bg-gradient-to-r from-slate-700/50 to-slate-600/50 animate-pulse"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
          }}
        />
      ))}
    </div>
  );

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      const timer = setTimeout(checkScrollPosition, 100);
      return () => {
        slider.removeEventListener('scroll', checkScrollPosition);
        clearTimeout(timer);
      };
    }
  }, [categories]);

  return (
    <div className="w-full mb-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="px-3 py-1 text-xs font-bold font-mowaq tracking-wider text-black"
            style={{
              background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            }}
          >
            FILTER
          </div>
          <h2 className="text-white font-mowaq text-lg font-medium tracking-wider">
            CATEGORIES.FILTER
          </h2>
        </div>
        
        {selectedCategories.length > 0 && (
          <button
            onClick={() => selectedCategories.forEach(cat => onToggle(cat))}
            className="px-3 py-1 text-xs font-mowaq tracking-wider text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 transition-all duration-200"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))'
            }}
          >
            CLEAR.ALL
          </button>
        )}
      </div>

      {/* Filter Container */}
      <div 
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 p-4 overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
          boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.05)'
        }}
      >
        {/* Glowing Border Effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 -z-10"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
            filter: 'blur(4px)'
          }}
        />

        <div className={`relative ${showLeftArrow ? "px-8" : ""}`}>
          {/* Left Arrow */}
          {showLeftArrow && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-full z-10 flex items-center z-20">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 from-60% to-transparent" />
              <button
                onClick={() => scroll('left')}
                className="relative z-20 p-2 bg-gradient-to-r from-[#0766FF]/30 to-[#00DCFF]/30 hover:from-[#0766FF] hover:to-[#00DCFF] text-cyan-400 hover:text-white ml-2 transition-all duration-300"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))'
                }}
                aria-label="Scroll left"
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Scrollable Categories */}
          <div
            ref={sliderRef}
            className="overflow-x-auto py-2 hide-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-3 px-1">
              {isLoading ? renderSkeletons() : (
                <>
                  {/* All Categories Button */}
                  <button
                    onClick={() => selectedCategories.forEach(cat => onToggle(cat))}
                    className={`flex items-center px-4 py-2 cursor-pointer min-w-fit flex-shrink-0 transition-all duration-300 font-mowaq text-xs tracking-wider ${
                      selectedCategories.length === 0
                        ? `bg-gradient-to-r from-[#0766FF] to-[#00DCFF] text-white shadow-lg shadow-[#0766FF]/30`
                        : 'bg-gradient-to-r from-slate-700/50 to-slate-600/50 text-cyan-400 hover:from-slate-600/70 hover:to-slate-500/70 hover:text-cyan-300'
                    }`}
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                    }}
                  >
                    <span className="font-medium">ALL.CATEGORIES</span>
                  </button>

                  {/* Category Buttons */}
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => onToggle(category.category_name)}
                      className={`flex items-center px-4 py-2 cursor-pointer min-w-fit flex-shrink-0 transition-all duration-300 font-mowaq text-xs tracking-wider relative ${
                        selectedCategories.includes(category.category_name)
                          ? `bg-gradient-to-r from-[#0766FF] to-[#00DCFF] text-white shadow-lg shadow-[#0766FF]/30`
                          : 'bg-gradient-to-r from-slate-700/50 to-slate-600/50 text-cyan-400 hover:from-slate-600/70 hover:to-slate-500/70 hover:text-cyan-300'
                      }`}
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                      }}
                    >
                      <span className="font-medium truncate max-w-32">
                        {category.category_name.toUpperCase()}
                      </span>
                      
                      {selectedCategories.includes(category.category_name) && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00DCFF] border border-slate-800 flex items-center justify-center"
                             style={{
                               clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                             }}>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 flex items-center justify-end z-20">
              <div className="absolute inset-0 bg-gradient-to-l from-slate-800 from-60% to-transparent" />
              <button
                onClick={() => scroll('right')}
                className="relative z-20 p-2 bg-gradient-to-r from-[#0766FF]/30 to-[#00DCFF]/30 hover:from-[#0766FF] hover:to-[#00DCFF] text-cyan-400 hover:text-white mr-2 transition-all duration-300"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))'
                }}
                aria-label="Scroll right"
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-3 h-3">
          <div className="w-full h-0.5 bg-cyan-400"></div>
          <div className="w-0.5 h-full bg-cyan-400"></div>
        </div>
        <div className="absolute bottom-2 right-2 w-3 h-3">
          <div className="w-full h-0.5 bg-cyan-400 absolute bottom-0"></div>
          <div className="w-0.5 h-full bg-cyan-400 absolute right-0"></div>
        </div>
      </div>

      {/* Active Filters Display */}
      {selectedCategories.length > 0 && (
        <div className="mt-3 flex items-center gap-2 text-xs font-mowaq text-cyan-400">
          <span className="tracking-wider">ACTIVE.FILTERS:</span>
          <div className="flex gap-1">
            {selectedCategories.map((category, index) => (
              <span key={category} className="text-[#00DCFF]">
                {category.toUpperCase()}{index < selectedCategories.length - 1 && ','}
              </span>
            ))}
          </div>
        </div>
      )}

      <style >{`
        .hide-scrollbar {
          -webkit-scrollbar: none;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AdminCategoryFilter;