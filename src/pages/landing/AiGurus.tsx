import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, Zap, Shield, Sword, Star, Moon, Sun, Flame, Snowflake, Wind, Heart, Diamond } from 'lucide-react';
import { CiLock } from "react-icons/ci";
import { divine } from '../../../public';

const GuardianSelector = () => {
  const [selectedGuardian, setSelectedGuardian] = useState(6);
  const [activeIndex, setActiveIndex] = useState(6);
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const guardians = [
    { id: 0, name: "LUMINA", title: "The Seer", description: "Master of foresight and divine revelation.", icon: Eye, color: "from-purple-400 to-pink-400", locked: true },
    { id: 1, name: "NYRA", title: "The Oracle", description: "Master of cosmic wisdom and ancient knowledge.", icon: Star, color: "from-blue-400 to-purple-400", locked: true },
    { id: 2, name: "VARNAK", title: "The Warrior", description: "Fierce protector with unmatched combat prowess.", icon: Sword, color: "from-red-400 to-orange-400", locked: true },
    { id: 3, name: "THAROS", title: "The Shadow", description: "Silent guardian of the void and master of stealth.", icon: Moon, color: "from-gray-400 to-black", locked: true },
    { id: 4, name: "ZEPHYR", title: "The Storm", description: "Controller of winds and lightning's fury.", icon: Zap, color: "from-cyan-400 to-blue-400", locked: true },
    { id: 5, name: "AEGIS", title: "The Shield", description: "Unbreakable defender of the innocent.", icon: Shield, color: "from-green-400 to-teal-400", locked: true },
    { id: 6, name: "DIVINE", title: "The Radiant", description: "Bearer of eternal flame and solar power.", icon: Sun, color: "from-yellow-400 to-orange-400", locked: false },
    { id: 7, name: "PYREX", title: "The Inferno", description: "Master of fire and molten destruction.", icon: Flame, color: "from-red-500 to-yellow-400", locked: true },
    { id: 8, name: "GLACIUS", title: "The Frost", description: "Wielder of ice and eternal winter.", icon: Snowflake, color: "from-blue-300 to-cyan-300", locked: true },
    { id: 9, name: "VENTUS", title: "The Gale", description: "Spirit of the wind and sky.", icon: Wind, color: "from-green-300 to-blue-300", locked: true },
    { id: 10, name: "VITA", title: "The Life", description: "Guardian of nature and healing energy.", icon: Heart, color: "from-pink-400 to-green-400", locked: true },
    { id: 11, name: "LUXOR", title: "The Eternal", description: "Ancient being of pure cosmic energy.", icon: Diamond, color: "from-purple-500 to-pink-500", locked: true }
  ];

  useEffect(() => {
    // Load Swiper CSS
    const swiperCSS = document.createElement('link');
    swiperCSS.rel = 'stylesheet';
    swiperCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.css';
    document.head.appendChild(swiperCSS);

    // Load Swiper JS
    const swiperScript = document.createElement('script');
    swiperScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js';
    swiperScript.onload = () => {
      if (window.Swiper && swiperRef.current) {
        const swiper = new window.Swiper(swiperRef.current, {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          initialSlide: 6,
          coverflowEffect: {
            rotate: 15,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          on: {
            slideChange: function () {
              const currentIndex = this.activeIndex;
              setActiveIndex(currentIndex);
              setSelectedGuardian(guardians[currentIndex]?.id || guardians[6].id);
            },
          },
        });
        setSwiperInstance(swiper);
      }
    };
    document.body.appendChild(swiperScript);

    return () => {
      document.head.removeChild(swiperCSS);
      document.body.removeChild(swiperScript);
    };
  }, []);

  const handleCardClick = (guardian, index) => {
    if (guardian.locked) return;
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
    setSelectedGuardian(guardian.id);
  };

  const selectedGuardianData = guardians.find(g => g.id === selectedGuardian) || guardians[6];

  return (
    <>
      <style jsx>{`
        .swiper {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
        }
        
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 200px;
          height: 280px;
        }
        
        .swiper-slide-active .guardian-card {
          transform: scale(1.15) translateY(-20px);
          z-index: 10;
        }
        
        .swiper-slide-active .guardian-card .card-border {
          border-color: rgb(34 211 238);
          box-shadow: 0 25px 50px -12px rgba(34, 211, 238, 0.4);
        }
        
        .swiper-slide-active .guardian-card .card-content {
          background: rgba(17, 24, 39, 0.9);
        }
        
        .swiper-slide-active .guardian-card .card-icon {
          font-size: 5rem;
        }
        
        .swiper-button-next,
        .swiper-button-prev {
          background: rgba(168, 85, 247, 0.2);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          margin-top: -25px;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(168, 85, 247, 0.4);
        }
        
        .swiper-button-next::after,
        .swiper-button-prev::after {
          color: rgb(196, 181, 253);
          font-size: 18px;
          font-weight: bold;
        }
        
        .swiper-pagination-bullet {
          background: rgb(75, 85, 99);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          background: rgb(34, 211, 238);
          width: 32px;
          border-radius: 4px;
        }
        
        .swiper-3d .swiper-slide-shadow-left,
        .swiper-3d .swiper-slide-shadow-right {
          background-image: none;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden relative">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 min-h-screen container mx-auto px-4 py-8">
          {/* Header */}
          <div className="relative text-center mb-12">
            <div className="inline-block px-6 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-purple-300 font-mono text-sm tracking-widest">STEP 1 OF 3</span>
            </div>

            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
              CHOOSE YOUR GUARDIAN
            </h1>
          </div>

          {/* Main Guardian Display */}
          <div className="relative mb-16 text-center">
            <div className="relative inline-block mb-8">
              <div className="w-80 h-80 mx-auto relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedGuardianData.color} rounded-full blur-2xl opacity-40 animate-pulse`}></div>
                <div className={`relative w-full h-full bg-gradient-to-br ${selectedGuardianData.color} rounded-full border-4 border-white/30 flex items-center justify-center backdrop-blur-sm shadow-2xl`}>
                  <selectedGuardianData.icon size={120} className="text-white drop-shadow-2xl" />
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <h2 className="text-5xl font-black mb-2 text-white tracking-wider">
              {selectedGuardianData.name}
            </h2>
            <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${selectedGuardianData.color} bg-clip-text text-transparent`}>
              {selectedGuardianData.title}
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {selectedGuardianData.description}
            </p>
          </div>

          {/* Swiper Guardian Cards */}
          <div className="relative mb-8">
            <div className="swiper" ref={swiperRef}>
              <div className="swiper-wrapper">
                {guardians.map((guardian, index) => (
                  <div key={guardian.id} className="swiper-slide">
                    <div
                      className="guardian-card cursor-pointer transition-all duration-500 ease-out h-full"
                      onClick={() => handleCardClick(guardian, index)}
                    >
                      <div className={`card-border relative w-full h-full rounded-xl border-2 transition-all duration-500 backdrop-blur-sm overflow-hidden ${guardian.locked
                          ? 'border-gray-600 bg-gray-800/40'
                          : 'border-purple-400/30 bg-purple-500/10 hover:border-purple-400/50'
                        }`}>

                        {guardian.locked && (
                          <div className="absolute w-full h-full gap-4 z-30 bg-black/60 rounded-xl flex flex-col items-center justify-center backdrop-blur-sm ">
                            <CiLock className="w-8 h-8 text-gray-400" />
                            <span className="text-gray-400 font-bold text-sm tracking-wider">LOCKED</span>
                          </div>
                        )}

                        {/* Character illustration area */}
                        <div className={`w-full h-48 bg-gradient-to-br ${guardian.color} flex items-center justify-center relative`}>
                          <div className="absolute inset-0 bg-black/20"></div>
                          {guardian.name === "DIVINE" ? (
                            <img src={divine} alt="divine" className='h-full' />
                          ) : (
                            <guardian.icon size={64} className="card-icon relative z-10 text-white drop-shadow-lg transition-all duration-500" />
                          )}


                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>

                        {/* Text area */}
                        <div className="card-content p-3 text-center bg-gray-900/80 transition-all duration-500">
                          <h3 className="text-sm font-black mb-1 text-white tracking-wider">
                            {guardian.name}
                          </h3>
                          <p className={`text-xs font-bold bg-gradient-to-r ${guardian.color} bg-clip-text text-transparent`}>
                            {guardian.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>

              {/* Pagination */}
              <div className="swiper-pagination"></div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-black text-xl tracking-wider shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm">
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuardianSelector;