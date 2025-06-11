import { useState, useEffect } from "react";
import { GiSailboat } from "react-icons/gi";
import { MdMotionPhotosPaused } from "react-icons/md";
import { GiTwirlyFlower } from "react-icons/gi";
import { home } from "../../../public";
// Add your mobile video import here
// import { homeMobile } from "../../../public";

function Home() {
  const [_menuOpen, setMenuOpen] = useState(false);
  const [_isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubscribe = () => {
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setMenuOpen(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
   <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-auto">
      {/* Desktop Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="hidden lg:block fixed top-0 left-0 w-full h-full object-cover object-center z-0"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto'
        }}
      >
        <source src={home} type="video/mp4" />
      </video>

      {/* Mobile Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="lg:hidden fixed top-0 left-0 w-full h-full object-cover object-center z-0"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto'
        }}
      >

        <source src="/Mobile.mp4" type="video/mp4" />
        <source src={home} type="video/mp4" />
      </video>

      <div className="w-11/12 sm:w-10/12 md:w-4/5 pt-16 sm:pt-20 lg:pt-6 h-full">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 relative w-full">
          {/* Content Box */}
          <div className="relative px-4 sm:px-5 py-4 md:py-7 xl:py-12 2xl:py-16 lg:w-1/2 w-full max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] h-fit font-mowaq bg-[rgba(51,255,0,0.01)] backdrop-blur-md shadow-xl rounded-xl border-glow text-center">
            <h1 className="text-white pt-3 sm:pt-5 font-bold text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
              Beyond Human Connection, 
            </h1>

            <h1 className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-2xl mt-2">
              Empowering Every Individual
            </h1>

            <h1 className="text-white text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-xl mt-3 sm:mt-4">
              Transform Your Experience
            </h1>
            <h3
              className="text-white mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-sans"
            >
              ANAMCARA AI transforms everyday interactions into personalized
              experiences that inspire and empower.
            </h3>

            {/* Input Box */}
            <div className="flex flex-col sm:flex-row justify-center items-center font-bold mt-4 sm:mt-6 gap-2 sm:gap-2">
              <input
                className="rounded-md py-2 px-3 w-full sm:w-2/3 md:w-1/2 text-white/70 bg-black/20 text-sm sm:text-base"
                type="text"
                placeholder="Enter email"
              />

              <button
                type="button"
                className="py-2 px-4 rounded-lg cursor-pointer text-black bg-[#ADFF00] w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
                onClick={handleSubscribe}
              >
                Subscribe Now!
              </button>
            </div>

            {/* Icons */}
            <div className="flex justify-center gap-3 sm:gap-4 py-3 sm:py-4 text-2xl sm:text-3xl md:text-4xl text-[#ADFF00]">
              <GiSailboat />
              <MdMotionPhotosPaused />
              <GiTwirlyFlower />
            </div>
          </div>

          {/* Video Section */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="lg:w-1/2 lg:block hidden w-full h-auto lg:h-[500px] xl:h-[600px] rounded-xl lg:rounded-full opacity-70"
            controlsList="nodownload nofullscreen noremoteplaybook"
            disablePictureInPicture
          >
            <source src="/vid5.mp4" type="video/mp4" />
          </video>

          {showNotification && (
            <div className={`fixed z-50 bottom-16 sm:bottom-20 right-4 sm:right-6`}>
              <div className="bg-black text-white px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg shadow-lg border-2 border-[#ff6fff] animate-fade-in-out transition-opacity duration-500 w-max">
                ✅ Subscription successful!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;