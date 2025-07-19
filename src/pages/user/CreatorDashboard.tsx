import {
  Home,
  Radio,
  BarChart3,
  Users,
  FileText,
  Settings,
  GraduationCap,
  DollarSign,
  Clock,
  Eye
} from 'lucide-react';
import { FaStudiovinari } from 'react-icons/fa';
import TabsHeader from '../../views/course-dashboard/TabsHeader';
import { useState } from 'react';
import CreatorHome from '../../views/course-dashboard/components/CreatorHome';
import StreamManager from '../../views/course-dashboard/components/StreamManager';
import StreamBrowser from '../../views/course-dashboard/components/StreamBrowser';
import { StreamingProvider } from '../../context/StreamingProvider';

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const dashboardTabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'stream-manager', label: 'Stream Manager', icon: <Radio className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'content', label: 'Content', icon: <FileText className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'creator-camp', label: 'Creator', icon: <GraduationCap className="w-5 h-5" /> },
  ];

  const statsData = [
    {
      id: 1,
      title: "Total Followers",
      value: "12.5K",
      trend: "+12% this month",
      icon: <Users className="w-5 h-5" />,
      bgColor: "from-purple-600/20 to-purple-900/20"
    },
    {
      id: 2,
      title: "Live Viewers",
      value: "1,234",
      trend: "+24% today",
      icon: <Eye className="w-5 h-5" />,
      bgColor: "from-pink-600/20 to-rose-900/20"
    },
    {
      id: 3,
      title: "Stream Hours",
      value: "456",
      trend: "8h avg daily",
      icon: <Clock className="w-5 h-5" />,
      bgColor: "from-amber-600/20 to-orange-900/20"
    },
    {
      id: 4,
      title: "Revenue",
      value: "20 Anamcoins",
      trend: "≈ $160 USD",
      icon: <DollarSign className="w-5 h-5" />,
      bgColor: "from-blue-600/20 to-indigo-900/20"
    }
  ];

  return (
    <div className="h-[calc(100vh-150px)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700 scrollbar-thumb-rounded-full bg-slate-950/90 p-4 md:p-6 rounded-3xl border border-slate-800/50">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative group cursor-pointer">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#310050] to-[#a70075] rounded-full flex items-center justify-center shadow-2xl shadow-[#a70075]/50 group-hover:shadow-[#a70075] transition-all duration-300">
            <FaStudiovinari className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:scale-110 transition-transform" />
          </div>
          <div className="absolute text-sm -top-1 -right-1 h-6 w-fit px-1 flex items-center justify-center text-white bg-gradient-to-bl from-green-500/80 to-green-500/40 rounded-md group-hover:from-green-400/90 group-hover:to-green-500/60 transition-colors">
            <span>NEW</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-[#cd00ae] to-[#820054] font-mowaq hover:bg-gradient-to-r transition-all duration-500 cursor-default">
            Creator Studio
          </h1>
          <p className="text-slate-400 mt-1 hover:text-slate-300 transition-colors cursor-default">
            Track top performers across the community
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-4 border border-slate-700/50 hover:border-[#a70075]/50 hover:shadow-lg hover:shadow-[#a70075]/20 transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-center gap-2 text-slate-300 mb-1 group">
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-[#a70075]/20 transition-colors">
                  {stat.icon}
                </div>
                <span className="text-xs group-hover:text-white transition-colors">{stat.trend}</span>
              </div>
              <div className="mt-2 group">
                <p className="text-sm text-slate-400 group-hover:text-white transition-colors">{stat.title}</p>
                <p className="text-xl font-bold text-white group-hover:text-[#cd00ae] transition-colors">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full relative mt-10">
        {/* <div className='sticky -top-[30px] py-1 backdrop-blur-lg z-50'> */}
        <TabsHeader
          tabs={dashboardTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mainColor="#a70075"
          activeTextColor="#ffffff"
        />
        {/* </div> */}

        {/* Content */}
        <div className='w-full'>
          <StreamingProvider>
            {activeTab === "home" ? <CreatorHome />
              : activeTab === "stream-manager" ?
                <StreamManager />
                : activeTab === 'analytics' ?
                  <StreamBrowser /> : null}
          </StreamingProvider>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;