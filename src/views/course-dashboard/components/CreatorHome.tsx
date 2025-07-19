import { GraduationCap, MessageSquare, MoreHorizontal, Play, Share2, Shield } from 'lucide-react';
import { useState } from 'react';

const CreatorHome = () => {
  const [showVideoPlaceholder, setShowVideoPlaceholder] = useState(true);

  return (
    <div className="space-y-10 py-4">
      {/* Start Streaming Section - Enhanced */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-[#a70075]/30 rounded-xl p-6 shadow-lg shadow-[#a70075]/10 hover:shadow-[#a70075]/20 transition-all duration-300 group">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#cd00ae] to-[#820054] group-hover:from-[#820054] group-hover:to-[#cd00ae] transition-all duration-500">
                Start Streaming by Going Live
              </h2>
              <p className="mb-4 text-slate-300">
                If you're streaming from a computer, you need software that broadcasts your content to StreamVibe.
              </p>
              <p className="mb-6 text-slate-300">
                Don't worry, we've got you! Creator Camp is a free and easy to use resource that will help you set up your first stream on StreamVibe!
              </p>
            </div>
            <button className="bg-gradient-to-r from-[#a70075] to-[#cd00ae] hover:from-[#cd00ae] hover:to-[#a70075] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md shadow-[#a70075]/30 hover:shadow-[#cd00ae]/40 w-full lg:w-auto">
              Go to Creator Camp
            </button>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-br from-[#310050]/80 to-[#a70075]/80 rounded-xl p-0.5">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:40px_40px] opacity-10"></div>
            <div className="relative bg-gradient-to-br from-slate-900/70 to-slate-800/70 rounded-xl h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 mb-6 bg-gradient-to-br from-[#a70075] to-[#cd00ae] rounded-full flex items-center justify-center shadow-lg shadow-[#a70075]/40 group-hover:scale-105 transition-transform">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">SoulStream Creator Camp</h3>
              <p className="text-sm text-green-400/80 mb-4">Learn the basics of streaming</p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-[#a70075]/20 text-[#cd00ae] border border-[#a70075]/30">New</span>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300">Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#cd00ae] to-[#820054]">
          Features For You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Add a link to your Social Media',
              description: 'These links will display in the "About Me" section of your Channel.',
              icon: Share2,
              status: 'NOT STARTED'
            },
            {
              title: 'Make chat safer with AutoMod',
              description: 'AutoMod detects inappropriate or harmful messages and holds them for review.',
              icon: Shield,
              status: 'NOT STARTED'
            },
            {
              title: 'Set customized chat rules',
              description: 'Communicate your personal rules and expectations for your community.',
              icon: MessageSquare,
              status: 'NOT STARTED'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 rounded-xl p-6 shadow-lg shadow-[#a70075]/10 hover:shadow-[#a70075]/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-300">{feature.status}</span>
                <button className="text-slate-400 hover:text-[#cd00ae] transition-colors duration-200">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-full flex items-center justify-center border border-slate-700/30">
                  <feature.icon className="h-6 w-6 text-[#cd00ae]" />
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-slate-200">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stream Quality Check with Video Player */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 rounded-xl p-6 shadow-lg shadow-[#a70075]/10 hover:shadow-[#a70075]/20 transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#cd00ae] to-[#820054]">
          Check your stream quality
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg overflow-hidden relative">
            {showVideoPlaceholder ? (
              <div 
                className="aspect-video bg-gradient-to-br from-[#310050] to-[#a70075] rounded-lg flex flex-col items-center justify-center shadow-inner shadow-[#a70075]/30 cursor-pointer"
                onClick={() => setShowVideoPlaceholder(false)}
              >
                <div className="w-20 h-20 bg-[#a70075]/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#a70075]/50 mb-4">
                  <Play className="h-8 w-8 text-white fill-white/90" />
                </div>
                <span className="text-white/80 text-sm">Click to check stream</span>
              </div>
            ) : (
              <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/50">No video available</span>
                </div>
                <button 
                  onClick={() => setShowVideoPlaceholder(true)}
                  className="absolute top-2 right-2 bg-slate-800/80 hover:bg-slate-700/80 text-white p-2 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div>
            <p className="mb-4 text-slate-300">
              While these are not required to stream, a fast internet connection, good audio and good lighting can drastically improve the viewing experience for your audience.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Was this useful?</span>
              <button className="bg-gradient-to-r from-[#a70075] to-[#cd00ae] hover:from-[#cd00ae] hover:to-[#a70075] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md shadow-[#a70075]/30">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorHome;