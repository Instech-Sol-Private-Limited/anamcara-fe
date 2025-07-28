import { useState } from 'react';
import TopNavigation from '../../components/Layout/TopNavigation';
import DashboardOverview from '../../components/Dashboard/DashboardOverview';
import CourseList from '../../components/Course/CourseList';
import CourseCreator from '../../components/Course/CourseCreator';
import StudentsPage from '../../components/Students/StudentsPage';
import AnalyticsPage from '../../components/Analytics/AnalyticsPage';
import ReviewsPage from '../../components/Reviews/ReviewsPage';
import SchedulePage from '../../components/Schedule/SchedulePage';
import SettingsPage from '../../components/Settings/SettingsPage';
import { Course, Category, DashboardStats } from '../../types/course';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Mock data
  const mockStats: DashboardStats = {
    totalCourses: 12,
    publishedCourses: 8,
    draftCourses: 4,
    totalStudents: 2847,
    totalRevenue: 45230,
    featuredCourses: 3
  };

  const mockCategories: Category[] = [
    { id: '1', name: 'Web Development', slug: 'web-development', description: 'Learn web development skills' },
    { id: '2', name: 'Data Science', slug: 'data-science', description: 'Master data science concepts' },
    { id: '3', name: 'Design', slug: 'design', description: 'Creative design courses' },
    { id: '4', name: 'Marketing', slug: 'marketing', description: 'Digital marketing strategies' },
    { id: '5', name: 'Business', slug: 'business', description: 'Business and entrepreneurship' }
  ];

  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Complete React Development Course',
      slug: 'complete-react-development',
      description: 'Learn React from scratch with hands-on projects and real-world applications.',
      short_description: 'Master React development with hands-on projects and practical examples.',
      thumbnail_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      preview_video_url: 'https://youtube.com/watch?v=example',
      category_id: '1',
      price: 99.99,
      discounted_price: 79.99,
      difficulty: 'intermediate',
      status: 'published',
      language: 'English',
      is_published: true,
      is_featured: true,
      meta_title: 'Complete React Development Course - Learn React Online',
      meta_description: 'Master React development with hands-on projects and practical examples. Join thousands of students learning React.',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-20T15:30:00Z',
      sections: [],
      enrollment_count: 1234,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Python for Data Science',
      slug: 'python-for-data-science',
      description: 'Comprehensive Python course focused on data science applications.',
      short_description: 'Learn Python programming with focus on data science and machine learning.',
      thumbnail_url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      category_id: '2',
      price: 149.99,
      difficulty: 'beginner',
      status: 'published',
      language: 'English',
      is_published: true,
      is_featured: false,
      created_at: '2024-01-10T08:00:00Z',
      updated_at: '2024-01-18T12:00:00Z',
      sections: [],
      enrollment_count: 987,
      rating: 4.6
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      slug: 'ui-ux-design-fundamentals',
      description: 'Learn the basics of user interface and user experience design.',
      short_description: 'Master UI/UX design principles and create beautiful user interfaces.',
      thumbnail_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      category_id: '3',
      price: 79.99,
      difficulty: 'beginner',
      status: 'draft',
      language: 'English',
      is_published: false,
      is_featured: false,
      created_at: '2024-01-22T14:00:00Z',
      updated_at: '2024-01-22T16:00:00Z',
      sections: [],
      enrollment_count: 0,
      rating: 0
    }
  ];

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setActiveTab('create-course');
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setActiveTab('create-course');
  };

  const handleBackToCourses = () => {
    setEditingCourse(null);
    setActiveTab('courses');
  };

  const handleSaveCourse = (courseData: Partial<Course>) => {
    console.log('Saving course:', courseData);
    // Here you would typically save to your backend
    setActiveTab('courses');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview stats={mockStats} />;
      case 'courses':
        return (
          <CourseList
            courses={mockCourses}
            onCreateCourse={handleCreateCourse}
            onEditCourse={handleEditCourse}
          />
        );
      case 'create-course':
        return (
          <CourseCreator
            course={editingCourse || undefined}
            categories={mockCategories}
            onBack={handleBackToCourses}
            onSave={handleSaveCourse}
          />
        );
      case 'students':
        return <StudentsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <div className="flex items-center justify-center h-64  ">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>
              <p className="text-gray-500">This section is coming soon!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full pt-5 bg-slate-950">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;