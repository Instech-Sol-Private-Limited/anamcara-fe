import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, BookOpen, Eye, Calendar, BarChart3, PieChart } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 45230,
      revenueChange: 15.2,
      totalStudents: 2847,
      studentsChange: 23.1,
      courseViews: 15420,
      viewsChange: 8.7,
      conversionRate: 3.2,
      conversionChange: 0.5
    },
    topCourses: [
      { name: 'React Fundamentals', revenue: 12450, students: 1234, rating: 4.8 },
      { name: 'Python for Beginners', revenue: 9870, students: 987, rating: 4.6 },
      { name: 'JavaScript Mastery', revenue: 7560, students: 756, rating: 4.7 },
      { name: 'UI/UX Design', revenue: 5430, students: 543, rating: 4.5 },
      { name: 'Data Science Basics', revenue: 4320, students: 432, rating: 4.4 }
    ],
    revenueData: [
      { month: 'January', revenue: 3200 },
      { month: 'February', revenue: 3800 },
      { month: 'March', revenue: 4200 },
      { month: 'April', revenue: 3900 },
      { month: 'May', revenue: 4800 },
      { month: 'Jun', revenue: 5200 }
    ],
    studentGrowth: [
      { month: 'January', students: 1200 },
      { month: 'February', students: 1450 },
      { month: 'March', students: 1680 },
      { month: 'April', students: 1920 },
      { month: 'May', students: 2340 },
      { month: 'Jun', students: 2847 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6 w-[1500px] -ml-42 mt-14">
      <div className="flex items-center justify-between">
        <h2 className="text-6xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">Analytics</h2>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-400 bg-gray-700"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6  ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-400">
                {formatCurrency(analyticsData.overview.totalRevenue)}
              </p>
              <p className={`text-sm font-medium ${
                analyticsData.overview.revenueChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatPercentage(analyticsData.overview.revenueChange)} vs last period
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6  ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Total Students</p>
              <p className="text-2xl font-bold text-slate-400">
                {analyticsData.overview.totalStudents.toLocaleString()}
              </p>
              <p className={`text-sm font-medium ${
                analyticsData.overview.studentsChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatPercentage(analyticsData.overview.studentsChange)} vs last period
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6  ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Course Views</p>
              <p className="text-2xl font-bold text-slate-400">
                {analyticsData.overview.courseViews.toLocaleString()}
              </p>
              <p className={`text-sm font-medium ${
                analyticsData.overview.viewsChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatPercentage(analyticsData.overview.viewsChange)} vs last period
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6  ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-slate-400">
                {analyticsData.overview.conversionRate}%
              </p>
              <p className={`text-sm font-medium ${
                analyticsData.overview.conversionChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatPercentage(analyticsData.overview.conversionChange)} vs last period
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6  ">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-blue-400">Revenue Trend</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.revenueData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">{item.month}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(item.revenue / 6000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-400 w-16 text-right">
                    {formatCurrency(item.revenue)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Growth */}
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6  ">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-blue-400">Student Growth</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.studentGrowth.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">{item.month}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(item.students / 3000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-400 w-16 text-right">
                    {item.students.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Courses */}
      <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6  ">
        <h3 className="text-lg font-semibold text-blue-400 mb-6">Top Performing Courses</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-blue-400">Course</th>
                <th className="text-left py-3 px-4 font-medium text-blue-400">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-blue-400">Students</th>
                <th className="text-left py-3 px-4 font-medium text-blue-400">Rating</th>
                <th className="text-left py-3 px-4 font-medium text-blue-400">Performance</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topCourses.map((course, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-slate-400">{course.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-slate-400">
                      {formatCurrency(course.revenue)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-green-400">{course.students.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-slate-400">{course.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(course.revenue / 15000) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;