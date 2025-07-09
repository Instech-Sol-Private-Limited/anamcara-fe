import React from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  Plus,
  GraduationCap,
  Star,
  Calendar
} from 'lucide-react';

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'courses', icon: BookOpen, label: 'My Courses' },
    { id: 'create-course', icon: Plus, label: 'Create Course' },
    { id: 'students', icon: Users, label: 'Students' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'reviews', icon: Star, label: 'Reviews' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="shadow-sm  ">
      <div className="max-w-full mx-auto px-4 sm:px-6 flex justify-center font-mowaq lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
          </div>
          
          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1 ">
            {/* bg-gray-700 py-2 px-24 rounded-br-4xl rounded-tr-full rounded-bl-full shadow-lg  */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xl mt-5 font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? ' text-blue-400 border-b-2 border-blue-400'
                      : 'text-slate-400 hover:text-white hover:bg-blue-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e.target.value)}
              className="px-3 py-2  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {menuItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;