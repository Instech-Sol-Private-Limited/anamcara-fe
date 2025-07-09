import React, { useState } from 'react';
import { Calendar, Clock, Plus, Video, Users, MapPin, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScheduleEvent {
  id: string;
  title: string;
  type: 'live-session' | 'office-hours' | 'webinar' | 'meeting';
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  attendees: number;
  maxAttendees?: number;
  location?: string;
  isOnline: boolean;
  status: 'scheduled' | 'completed' | 'cancelled';
  description?: string;
}

const SchedulePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showEventModal, setShowEventModal] = useState(false);

  // Mock schedule data
  const mockEvents: ScheduleEvent[] = [
    {
      id: '1',
      title: 'React Fundamentals - Live Q&A',
      type: 'live-session',
      date: '2024-01-22',
      startTime: '14:00',
      endTime: '15:30',
      duration: 90,
      attendees: 45,
      maxAttendees: 50,
      isOnline: true,
      status: 'scheduled',
      description: 'Live Q&A session for React Fundamentals course students'
    },
    {
      id: '2',
      title: 'Office Hours - Python Help',
      type: 'office-hours',
      date: '2024-01-23',
      startTime: '16:00',
      endTime: '17:00',
      duration: 60,
      attendees: 12,
      maxAttendees: 20,
      isOnline: true,
      status: 'scheduled',
      description: 'Open office hours for Python course students'
    },
    {
      id: '3',
      title: 'Web Development Trends 2024',
      type: 'webinar',
      date: '2024-01-25',
      startTime: '19:00',
      endTime: '20:30',
      duration: 90,
      attendees: 120,
      maxAttendees: 200,
      isOnline: true,
      status: 'scheduled',
      description: 'Public webinar about upcoming web development trends'
    },
    {
      id: '4',
      title: 'Course Planning Meeting',
      type: 'meeting',
      date: '2024-01-24',
      startTime: '10:00',
      endTime: '11:00',
      duration: 60,
      attendees: 5,
      isOnline: false,
      location: 'Conference Room A',
      status: 'scheduled',
      description: 'Planning meeting for new course development'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'live-session': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'office-hours': return 'bg-green-100 text-green-800 border-green-200';
      case 'webinar': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'meeting': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const upcomingEvents = mockEvents
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const todayEvents = mockEvents.filter(event => {
    const today = new Date().toISOString().split('T')[0];
    return event.date === today;
  });

  return (
    <div className="space-y-6 w-[1500px] -ml-42 mt-14">
      <div className="flex items-center justify-between">
        <h2 className="text-6xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">Schedule</h2>
        <div className="flex items-center space-x-3">
          {/* <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-sm rounded ${
                viewMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm rounded ${
                viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-sm rounded ${
                viewMode === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Day
            </button>
          </div> */}
          <button
            onClick={() => setShowEventModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Schedule Event</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Today's Events</p>
              <p className="text-2xl font-bold text-slate-400">{todayEvents.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-mediumtext-blue-400">This Week</p>
              <p className="text-2xl font-bold text-slate-400">8</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Total Attendees</p>
              <p className="text-2xl font-bold text-slate-400">182</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">Live Sessions</p>
              <p className="text-2xl font-bold text-slate-400">12</p>
            </div>
            <Video className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2 border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-blue-400">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                className="p-2 hover:bg-gray-900 rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                className="p-2 hover:bg-gray-900 rounded-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-slate-400">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const hasEvents = mockEvents.some(event => event.date === date.toISOString().split('T')[0]);
              
              return (
                <div
                  key={i}
                  className={`p-2 h-12 border border-gray-800 ${
                    isCurrentMonth ? 'bg-slate-900' : 'bg-slate-900'
                  } ${isToday ? 'bg-blue-400 border-blue-400' : ''} hover:bg-blue-400 cursor-pointer`}
                >
                  <div className={`text-sm ${isCurrentMonth ? 'text-white' : 'text-white'}`}>
                    {date.getDate()}
                  </div>
                  {hasEvents && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-6">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type.replace('-', ' ')}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {event.isOnline ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                    <span>{event.isOnline ? 'Online' : event.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''} attendees</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                      <Edit className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule New Event</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="live-session">Live Session</option>
                  <option value="office-hours">Office Hours</option>
                  <option value="webinar">Webinar</option>
                  <option value="meeting">Meeting</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  alert('Event scheduled successfully!');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;