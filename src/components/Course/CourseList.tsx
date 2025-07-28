import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, Trash2, Star, Users, BookOpen } from 'lucide-react';
import { Course } from '../../types/course';

interface CourseListProps {
  courses: Course[];
  onCreateCourse: () => void;
  onEditCourse: (course: Course) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onCreateCourse, onEditCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'created_at' | 'enrollment_count'>('created_at');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'enrollment_count') return (b.enrollment_count || 0) - (a.enrollment_count || 0);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 w-[1500px] -ml-42 mt-14">
      <div className="flex items-center justify-between">
        <h2 className=" text-6xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">My Courses</h2>
        <button
          onClick={onCreateCourse}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Course</span>
        </button>
      </div>

      <div className=" rounded-xl shadow-sm border border-amber-500/50 bg-slate-900/50 p-6  ">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative border-gray-700 border rounded-lg">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full font-mono border border-gray-900 rounded-lg focus:ring-2 focus:ring-500/50 focus:border-gray-700 "
            />
          </div>
          
          <div className="flex items-center space-x-3 ">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 text-slate-400 font-mono rounded-lg focus:ring-1 focus:ring-amber-500/50 bg-slate-900 border border-gray-700 focus:border-gray-700"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-slate-400 font-mono rounded-lg focus:ring-1 focus:ring-amber-500/50 bg-slate-900 border border-gray-700 focus:border-gray-700"
            >
              <option value="created_at">Date Created</option>
              <option value="title">Title</option>
              <option value="enrollment_count">Enrollment</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {sortedCourses.map((course) => (
            <div
              key={course.id}
              className=" rounded-lg p-4 hover:shadow-md transition-shadow border-gray-700 border-1 bg-slate-900/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold font-mono text-blue-400">{course.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium  ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                    {course.is_featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <p className="text-slate-400 mb-3 font-mono line-clamp-2">{course.short_description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm font-mono text-green-400">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.enrollment_count || 0} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{course.rating || 'N/A'}</span>
                    </div>
                    <span className="capitalize">{course.difficulty}</span>
                    <span>${course.price}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onEditCourse(course)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first course</p>
            <button
              onClick={onCreateCourse}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;