import React, { useState } from 'react';
import { Star, Filter, Search, ThumbsUp, MessageCircle, Flag, Eye, MoreVertical } from 'lucide-react';

interface Review {
  id: string;
  studentName: string;
  studentAvatar?: string;
  courseName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  status: 'published' | 'pending' | 'flagged';
  verified: boolean;
}

const ReviewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'pending' | 'flagged'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'helpful'>('date');

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      studentName: 'Alex Johnson',
      courseName: 'React Fundamentals',
      rating: 5,
      comment: 'Excellent course! The instructor explains complex concepts in a very clear and understandable way. The hands-on projects really helped me grasp the material.',
      date: '2024-01-20',
      helpful: 12,
      status: 'published',
      verified: true
    },
    {
      id: '2',
      studentName: 'Sarah Williams',
      courseName: 'Python for Data Science',
      rating: 4,
      comment: 'Great content and well-structured lessons. Would have liked more advanced examples, but overall very satisfied with the course.',
      date: '2024-01-19',
      helpful: 8,
      status: 'published',
      verified: true
    },
    {
      id: '3',
      studentName: 'Michael Brown',
      courseName: 'UI/UX Design Fundamentals',
      rating: 5,
      comment: 'This course completely changed my perspective on design. The practical exercises and real-world examples were incredibly valuable.',
      date: '2024-01-18',
      helpful: 15,
      status: 'published',
      verified: false
    },
    {
      id: '4',
      studentName: 'Emily Davis',
      courseName: 'JavaScript Mastery',
      rating: 3,
      comment: 'Good course but could use more interactive elements. Some sections felt a bit rushed.',
      date: '2024-01-17',
      helpful: 3,
      status: 'pending',
      verified: true
    },
    {
      id: '5',
      studentName: 'David Wilson',
      courseName: 'React Fundamentals',
      rating: 2,
      comment: 'The course content is outdated and doesn\'t cover the latest React features. Disappointed with the quality.',
      date: '2024-01-16',
      helpful: 1,
      status: 'flagged',
      verified: true
    }
  ];

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Calculate stats
  const totalReviews = mockReviews.length;
  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const pendingReviews = mockReviews.filter(r => r.status === 'pending').length;
  const flaggedReviews = mockReviews.filter(r => r.status === 'flagged').length;

  return (
    <div className="space-y-6 w-[1500px] -ml-42 mt-14">
      <div className="flex items-center justify-between">
        <h2 className="text-6xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">Reviews</h2>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Moderate Reviews
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6 ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Total Reviews</p>
              <p className="text-2xl font-bold text-slate-400">{totalReviews}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6 ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Average Rating</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-slate-400">{averageRating.toFixed(1)}</p>
                <div className="flex">
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6 ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Pending Reviews</p>
              <p className="text-2xl font-bold text-slate-400">{pendingReviews}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6 ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Flagged Reviews</p>
              <p className="text-2xl font-bold text-slate-400">{flaggedReviews}</p>
            </div>
            <Flag className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6 ">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value as any)}
              className="px-3 py-2 bg-slate-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 bg-slate-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Date</option>
              <option value="rating">Rating</option>
              <option value="helpful">Helpful</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="border border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {getInitials(review.studentName)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-blue-400">{review.studentName}</h4>
                      {review.verified && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-green-400">{review.courseName}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                  <button className="p-1 text-slate-400 hover:text-gray-800 hover:bg-gray-50 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-slate-400 mb-4">{review.comment}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{review.helpful} helpful</span>
                  </button>
                  <button className="flex items-center space-x-1 text-slate-400 hover:text-green-600">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View Course</span>
                  </button>
                </div>
                
                {review.status === 'pending' && (
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;