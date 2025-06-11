import { useState } from 'react';
import { FiUser, FiMenu, FiX } from 'react-icons/fi';

interface DonationCard {
  title: string;
  raised: string;
  donations: string;
  progress: string;
  image: string;
}

interface DonationPanelProps {
  donation: string;
}

const DonationPanel: React.FC<DonationPanelProps> = ({ donation = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop" }) => {
  const [showAll, setShowAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const donationCards: DonationCard[] = [
    {
      title: "Help End Malaria Deaths in the Countries",
      raised: "$30,400 raised",
      donations: "2.5K donations",
      progress: "75%",
      image: donation,
    },
    {
      title: "Support Clean Water Projects",
      raised: "$18,200 raised",
      donations: "1.2K donations",
      progress: "60%",
      image: donation,
    },
    {
      title: "Educate Children in Rural Areas",
      raised: "$25,000 raised",
      donations: "2.0K donations",
      progress: "80%",
      image: donation,
    },
  ];

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={togglePanel}
        className="lg:hidden fixed top-16 right-3 z-50 w-9 h-9 bg-gray-900 border border-[#A0FF06] text-[#A0FF06] rounded-full flex items-center justify-center hover:bg-[#A0FF06] hover:text-black transition-all shadow-lg shadow-[#A0FF06]/20"
      >
        {isOpen ? <FiX size={16} /> : <FiMenu size={16} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={togglePanel}
        />
      )}

      {/* Desktop Version - Hidden on mobile */}
      <div className="w-72 hidden lg:block overflow-hidden p-6">
        <div className="flex justify-end items-center pt-2 mb-3 space-x-3">
          <div
            onClick={() => console.log('Icon 1 clicked')}
            className="w-9 h-9 rounded-full border border-[#A0FF06] text-[#A0FF06] hover:bg-[#A0FF06] hover:text-black transition-colors flex items-center justify-center font-semibold text-sm cursor-pointer"
          >
            <FiUser size={18} />
          </div>

          <div
            onClick={() => console.log('Icon 2 clicked')}
            className="w-9 h-9 rounded-full border border-[#A0FF06] text-[#A0FF06] hover:bg-[#A0FF06] hover:text-black transition-colors flex items-center justify-center font-semibold text-sm cursor-pointer"
          >
            <FiUser size={18} />
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center justify-center gap-2 border border-[#A0FF06] text-[#A0FF06] font-medium py-1.5 px-4 rounded-full hover:bg-[#A0FF06] hover:text-black transition-colors text-sm"
          >
            {showAll ? "View less" : "View all"} <span className="ml-1">→</span>
          </button>
        </div>

        {/* Desktop Scrollable Content */}
        <div 
          className="space-y-4 overflow-y-auto scrollbar-hide max-h-[calc(100vh-140px)]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {(showAll ? donationCards : [donationCards[0]]).map((card, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-xl h-64 border border-[#A0FF06] shadow-lg shadow-[#A0FF06]/10 transition-all relative"
            >
              {/* Image with overlay */}
              <div className="relative p-3 pb-0">
                <img
                  src={card.image}
                  alt="Donation"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <span className="absolute bottom-3 right-4 text-white text-xs px-2 py-1 rounded-full">
                  {card.donations}
                </span>
              </div>

              {/* Text Content */}
              <div className="p-3 pt-3">
                <h4 className="font-medium text-white mb-1 text-sm leading-snug">
                  {card.title}
                </h4>
                <p className="text-[#A0FF06] font-bold text-sm">{card.raised}</p>
              </div>

              {/* Progress bar */}
              <div className="px-2">
                <div className="w-full h-2 bg-gray-600 border border-[#A0FF06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A0FF06]"
                    style={{ width: card.progress }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Slide-out Panel */}
      <div 
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-gray-900 border-l border-[#A0FF06] transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Panel Header */}
        <div className="p-4 border-b border-[#A0FF06]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[#A0FF06] font-semibold text-lg">Donations</h3>
            <button
              onClick={togglePanel}
              className="w-8 h-8 rounded-full border border-[#A0FF06] text-[#A0FF06] hover:bg-[#A0FF06] hover:text-black transition-colors flex items-center justify-center"
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="flex justify-center items-center space-x-3">
            <div
              onClick={() => console.log('Icon 1 clicked')}
              className="w-8 h-8 rounded-full border border-[#A0FF06] text-[#A0FF06] hover:bg-[#A0FF06] hover:text-black transition-colors flex items-center justify-center font-semibold text-sm cursor-pointer"
            >
              <FiUser size={16} />
            </div>

            <div
              onClick={() => console.log('Icon 2 clicked')}
              className="w-8 h-8 rounded-full border border-[#A0FF06] text-[#A0FF06] hover:bg-[#A0FF06] hover:text-black transition-colors flex items-center justify-center font-semibold text-sm cursor-pointer"
            >
              <FiUser size={16} />
            </div>

            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center justify-center gap-2 border border-[#A0FF06] text-[#A0FF06] font-medium py-1 px-3 rounded-full hover:bg-[#A0FF06] hover:text-black transition-colors text-xs"
            >
              {showAll ? "Less" : "All"} <span className="ml-1">→</span>
            </button>
          </div>
        </div>

        {/* Mobile Scrollable Content */}
        <div 
          className="p-4 space-y-4 overflow-y-auto scrollbar-hide h-[calc(100vh-120px)]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {(showAll ? donationCards : [donationCards[0]]).map((card, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-xl border border-[#A0FF06] shadow-lg shadow-[#A0FF06]/10 transition-all relative"
            >
              {/* Mobile Card Image */}
              <div className="relative p-3 pb-0">
                <img
                  src={card.image}
                  alt="Donation"
                  className="w-full h-28 object-cover rounded-lg"
                />
                <span className="absolute bottom-3 right-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                  {card.donations}
                </span>
              </div>

              {/* Mobile Card Content */}
              <div className="p-3 pt-3">
                <h4 className="font-medium text-white mb-2 text-sm leading-snug">
                  {card.title}
                </h4>
                <p className="text-[#A0FF06] font-bold text-sm mb-3">{card.raised}</p>
                
                {/* Mobile Progress bar */}
                <div className="w-full h-2 bg-gray-600 border border-[#A0FF06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A0FF06] transition-all duration-300"
                    style={{ width: card.progress }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DonationPanel;
