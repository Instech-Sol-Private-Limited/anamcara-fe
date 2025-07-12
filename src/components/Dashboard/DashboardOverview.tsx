import React from 'react';
import { BookOpen, Users, DollarSign, Star, TrendingUp, Eye } from 'lucide-react';
import { DashboardStats } from '../../types/course';

interface DashboardOverviewProps {
  stats: DashboardStats;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Published',
      value: stats.publishedCourses,
      icon: Eye,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-purple-500',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-600',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Featured Courses',
      value: stats.featuredCourses,
      icon: Star,
      color: 'bg-yellow-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Draft Courses',
      value: stats.draftCourses,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '-2%',
      changeType: 'negative'
    }
  ];

  return (
      <div className="space-y-6 w-[1600px] -ml-52 max-w-[1600px] mt-14 mx-auto px-2 sm:px-6 lg:px-12">
    <div className="flex items-center justify-between ">
      <h2 className="text-6xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 ">Dashboard Overview</h2>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-green-400">Last updated: </span>
        <span className="text-sm font-medium text-green-400">
          {new Date().toLocaleDateString()}
        </span>
      </div>
    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="border-amber-500/50 bg-slate-900/50 border rounded-lg shadow-lg backdrop-blur-lg font-mono p-6 hover:shadow-md transition-shadow  "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-400 font-mono">{card.title}</p>
                  <p className="text-2xl font-bold text-slate-400 mt-1">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {card.change}
                </span>
                <span className="text-sm text-green-400 ml-2">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6 ">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-slate-400">New student enrolled in "React Fundamentals"</span>
              <span className="text-xs text-green-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-400">Course "Advanced JavaScript" published</span>
              <span className="text-xs text-green-400">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-slate-400">Received 5-star review on "Python Basics"</span>
              <span className="text-xs text-green-400">2 days ago</span>
            </div>
          </div>
        </div>

        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-400 font-mono mb-4">Top Performing Courses</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-mono text-slate-400">React Fundamentals</p>
                <p className="text-xs text-green-400 font-mono">1,234 students</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium font-mono text-gray-900">$12,450</p>
                <p className="text-xs text-green-600 font-mono">+18%</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-mono text-slate-400">Python for Beginners</p>
                <p className="text-xs font-mono text-green-400">987 students</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium font-mono text-gray-900">$9,870</p>
                <p className="text-xs font-mono text-green-600">+12%</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono font-medium text-slate-400">JavaScript Mastery</p>
                <p className="text-xs font-mono text-green-400">756 students</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-medium text-gray-900">$7,560</p>
                <p className="text-xs font-mono text-green-600">+8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;