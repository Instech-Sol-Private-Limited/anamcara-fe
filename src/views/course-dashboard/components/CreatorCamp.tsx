import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthProvider';

export default function CreatorCamp() {
  const { userData: user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [streamHistory, setStreamHistory] = useState([
    {
      id: '1',
      title: 'Gaming Session #47',
      date: '2025-07-18',
      duration: '2h 34m',
      peakViewers: 156,
      totalViews: 1247,
      anaCoinsEarned: 89.50,
      status: 'completed'
    },
    {
      id: '2',
      title: 'React Tutorial Stream',
      date: '2025-07-16',
      duration: '1h 45m',
      peakViewers: 89,
      totalViews: 743,
      anaCoinsEarned: 52.30,
      status: 'completed'
    },
    {
      id: '3',
      title: 'Music Production Live',
      date: '2025-07-14',
      duration: '3h 12m',
      peakViewers: 203,
      totalViews: 1859,
      anaCoinsEarned: 127.80,
      status: 'completed'
    },
    {
      id: '4',
      title: 'Q&A with Community',
      date: '2025-07-12',
      duration: '1h 15m',
      peakViewers: 67,
      totalViews: 456,
      anaCoinsEarned: 34.20,
      status: 'completed'
    },
    {
      id: '5',
      title: 'Art Stream - Digital Painting',
      date: '2025-07-10',
      duration: '2h 58m',
      peakViewers: 178,
      totalViews: 1324,
      anaCoinsEarned: 98.70,
      status: 'completed'
    }
  ]);

  // Calculate overall stats
  const totalViews = streamHistory.reduce((sum, stream) => sum + stream.totalViews, 0);
  const totalStreams = streamHistory.length;
  const totalAnaCoins = streamHistory.reduce((sum, stream) => sum + stream.anaCoinsEarned, 0);
  const avgViewersPerStream = Math.round(totalViews / totalStreams);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    return (
      <span className="px-2 py-1 bg-green-900/30 border border-green-500/30 text-green-300 text-xs rounded-full">
        Completed
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <span className="ml-4 text-slate-300 mt-4">Loading creator dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="w-full max-w-7xl mx-auto sm:p-6">
        {/* Header Section - Profile Style */}
        <div className="relative mb-6 sm:mb-8">
          {/* Cover Background */}
          <div className="h-32 sm:h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-t-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 text-white">
              <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Creator Camp</h1>
              <p className="text-purple-100 text-sm sm:text-base">Your streaming journey dashboard</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-b-2xl border-x border-b border-slate-700/50 px-4 sm:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-6">
                {/* Avatar */}
                <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center md:text-xl text-lg lg:text-2xl font-bold text-white">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>

                {/* User Info */}
                <div className='w-[calc(100%-80px)] sm:w-auto'>
                  <h2 className="md:text-lg text-sm lg:text-xl font-bold text-white mb-1 truncate max-w-[180px] sm:max-w-none">
                    {user?.email}
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base">Content Creator</p>
                  <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2 text-xs sm:text-sm">
                    <span className="text-slate-300">
                      Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <span className="hidden sm:inline w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span className="text-green-400">Active Streamer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-700/50">
              <div className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                  {totalViews.toLocaleString()}
                </div>
                <div className="text-slate-400 text-xs sm:text-sm">Total Views</div>
              </div>

              <div className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">
                  {totalStreams}
                </div>
                <div className="text-slate-400 text-xs sm:text-sm">Total Streams</div>
              </div>

              <div className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-1">
                  {totalAnaCoins.toFixed(2)}
                </div>
                <div className="text-slate-400 text-xs sm:text-sm">AnaCoins Earned</div>
              </div>

              <div className="text-center">
                <div className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-1">
                  {avgViewersPerStream}
                </div>
                <div className="text-slate-400 text-xs sm:text-sm">Avg Views/Stream</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stream History Section */}
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 border-b border-slate-700/50">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Stream History</h3>
            <p className="text-slate-400 text-sm sm:text-base">Track your past streaming sessions and performance</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left p-3 sm:p-6 text-slate-300 font-semibold text-xs sm:text-sm">Stream</th>
                  <th className="text-left p-3 sm:p-6 text-slate-300 font-semibold text-xs sm:text-sm hidden sm:table-cell">Date</th>
                  <th className="text-left p-3 sm:p-6 text-slate-300 font-semibold text-xs sm:text-sm hidden md:table-cell">Duration</th>
                  <th className="text-left p-3 sm:p-6 text-slate-300 font-semibold text-xs sm:text-sm">Peak</th>
                  <th className="text-left p-3 sm:p-6 text-slate-300 font-semibold text-xs sm:text-sm hidden sm:table-cell">Total</th>
                  <th className="text-left p-3 sm:p-6 text-slate-300 font-semibold text-xs sm:text-sm">AnaCoins</th>
                  <th className="text-left p-3 sm:p-6 text-slate-300 font-semibold text-xs sm:text-sm hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {streamHistory.map((stream, index) => (
                  <tr
                    key={stream.id}
                    className={`hover:bg-slate-800/30 transition-colors ${index !== streamHistory.length - 1 ? 'border-b border-slate-800/50' : ''
                      }`}
                  >
                    <td className="p-3 sm:p-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                          <span className="text-purple-400 text-sm sm:text-base">📺</span>
                        </div>
                        <div>
                          <div className="font-medium text-white text-sm sm:text-base line-clamp-1">{stream.title}</div>
                          <div className="text-xs text-slate-400">#{stream.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-6 text-slate-300 text-xs sm:text-sm hidden sm:table-cell">
                      {formatDate(stream.date)}
                    </td>
                    <td className="p-3 sm:p-6 text-slate-300 text-xs sm:text-sm hidden md:table-cell">
                      {stream.duration}
                    </td>
                    <td className="p-3 sm:p-6">
                      <span className="text-purple-400 font-semibold text-sm sm:text-base">
                        {stream.peakViewers}
                      </span>
                    </td>
                    <td className="p-3 sm:p-6 text-blue-400 font-semibold text-sm sm:text-base hidden sm:table-cell">
                      {stream.totalViews.toLocaleString()}
                    </td>
                    <td className="p-3 sm:p-6">
                      <span className="text-green-400 font-semibold text-sm sm:text-base">
                        ₳{stream.anaCoinsEarned.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-3 sm:p-6 hidden md:table-cell">
                      {getStatusBadge(stream.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {streamHistory.length === 0 && (
            <div className="text-center py-12 sm:py-16 text-slate-400">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📊</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-slate-300">
                No streams yet
              </h3>
              <p className="text-sm sm:text-base">Start streaming to see your performance data here!</p>
            </div>
          )}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-xl border border-purple-500/30 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-400 text-sm sm:text-base">👥</span>
              </div>
              <h4 className="font-semibold text-white text-sm sm:text-base">Best Performance</h4>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-purple-400 mb-1">203 viewers</p>
            <p className="text-xs sm:text-sm text-slate-400">
              Highest concurrent viewers in a single stream
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-xl border border-blue-500/30 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-sm sm:text-base">⏱️</span>
              </div>
              <h4 className="font-semibold text-white text-sm sm:text-base">Total Streaming Time</h4>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-blue-400 mb-1">11h 44m</p>
            <p className="text-xs sm:text-sm text-slate-400">Across all streaming sessions</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl border border-green-500/30 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-green-400 text-sm sm:text-base">💎</span>
              </div>
              <h4 className="font-semibold text-white text-sm sm:text-base">Earning Rate</h4>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-green-400 mb-1">₳8.63/hr</p>
            <p className="text-xs sm:text-sm text-slate-400">Average AnaCoins earned per hour</p>
          </div>
        </div>
      </div>
    </div>
  );
}