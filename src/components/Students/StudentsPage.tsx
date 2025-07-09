import React, { useState } from 'react';
import { Search, Filter, Users, Mail, Calendar, BookOpen, Star, MoreVertical, UserPlus, Download, Eye } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: number;
  completedCourses: number;
  totalProgress: number;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive';
  rating: number;
}

const StudentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'joinDate' | 'progress'>('joinDate');

  // Mock data
  const mockStudents: Student[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      enrolledCourses: 3,
      completedCourses: 1,
      totalProgress: 75,
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      status: 'active',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      enrolledCourses: 5,
      completedCourses: 3,
      totalProgress: 90,
      joinDate: '2024-01-10',
      lastActive: '2024-01-19',
      status: 'active',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      enrolledCourses: 2,
      completedCourses: 0,
      totalProgress: 25,
      joinDate: '2024-01-18',
      lastActive: '2024-01-18',
      status: 'inactive',
      rating: 4.2
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      enrolledCourses: 4,
      completedCourses: 2,
      totalProgress: 85,
      joinDate: '2024-01-12',
      lastActive: '2024-01-20',
      status: 'active',
      rating: 4.7
    }
  ];

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'progress') return b.totalProgress - a.totalProgress;
    return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === 'active').length;
  const avgProgress = Math.round(mockStudents.reduce((sum, s) => sum + s.totalProgress, 0) / totalStudents);

  return (
    <div className="space-y-6 w-[1500px] -ml-42 mt-14">
      <div className="flex items-center justify-between">
        <h2 className="text-6xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">Students</h2>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white font-mono px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
            <UserPlus className="w-5 h-5" />
            <span>Invite Students</span>
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-mono flex items-center space-x-2 hover:bg-gray-200 transition-colors">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="border-amber-500/50 bg-slate-900/50 border rounded-lg shadow-lg backdrop-blur-lg font-mono p-6 hover:shadow-md transition-shadow ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Total Students</p>
              <p className="text-2xl font-bold text-slate-400">{totalStudents}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="border-amber-500/50 bg-slate-900/50 border rounded-lg shadow-lg backdrop-blur-lg font-mono p-6 hover:shadow-md transition-shadow  ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Active Students</p>
              <p className="text-2xl font-bold text-slate-400">{activeStudents}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="border-amber-500/50 bg-slate-900/50 border rounded-lg shadow-lg backdrop-blur-lg font-mono p-6 hover:shadow-md transition-shadow  ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Avg Progress</p>
              <p className="text-2xl font-bold text-slate-400">{avgProgress}%</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="border-amber-500/50 bg-slate-900/50 border rounded-lg shadow-lg backdrop-blur-lg font-mono p-6 hover:shadow-md transition-shadow  ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Avg Rating</p>
              <p className="text-2xl font-bold text-slate-400">4.7</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="border-amber-500/50 bg-slate-900/50 border rounded-lg shadow-lg backdrop-blur-lg font-mono p-6 hover:shadow-md transition-shadow ">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-400"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-400"
            >
              <option value="joinDate">Join Date</option>
              <option value="name">Name</option>
              <option value="progress">Progress</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr className="border-b border-gray-700 ">
                <th className="text-left py-3 px-4 font-medium text-blue-400">Student</th>
                <th className="text-left py-3 px-4 font-medium text-blue-400">Courses</th>
                <th className="text-left py-3 px-4 font-medium text-blue-400">Progress</th>
                <th className="text-left py-3 px-4 font-medium text-blue-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-blue-400">Last Active</th>
                <th className="text-left py-3 px-4 font-medium text-blue-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-700 hover:bg-blue-900">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {getInitials(student.name)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-400">{student.name}</p>
                        <p className="text-sm text-green-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-medium text-slate-400">
                        {student.enrolledCourses} enrolled
                      </p>
                      <p className="text-sm text-slate-400">
                        {student.completedCourses} completed
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${student.totalProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-400">
                        {student.totalProgress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs text-black font-medium ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-green-400">
                      {new Date(student.lastActive).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-gray-800 hover:bg-gray-50 rounded">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-gray-800 hover:bg-gray-50 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
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

export default StudentsPage;