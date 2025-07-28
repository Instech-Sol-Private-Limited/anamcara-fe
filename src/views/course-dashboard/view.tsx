import React, { useState } from 'react';
import {
  Home, Radio, Bell, BarChart3, Users, FileText, Settings, Gift, UserPlus, Wrench, Puzzle, GraduationCap, Shield, ChevronDown, ChevronRight, Star, Eye, MessageSquare,
  Calendar, Music, Gamepad2, Monitor, Headphones, Zap, Target, DollarSign, Clock, Play,
  Share2, MoreHorizontal, Maximize, Send, HelpCircle, CheckCircle, Cog, Palette,
  Plus,
  Edit,
} from 'lucide-react';
import { Copy } from 'lucide-react';

interface CreatorDashboardProps {
  onNavigate?: (path: string) => void;
}

const CreatorDashboard: React.FC<CreatorDashboardProps> = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home, hasDropdown: false },
    { id: 'stream-manager', label: 'Manager', icon: Radio, hasDropdown: false },
    { id: 'alerts', label: 'Alerts', icon: Bell, hasDropdown: false },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      hasDropdown: true,
      subItems: [
        // { id: 'analytics-overview', label: 'Overview' },
        // { id: 'analytics-audience', label: 'Audience' },
        // { id: 'analytics-revenue', label: 'Revenue' },
        // { id: 'analytics-performance', label: 'Performance' }
      ]
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      hasDropdown: true,
      subItems: [
        { id: 'community-moderation', label: 'Moderation' },
        { id: 'community-chat', label: 'Chat Settings' },
        { id: 'community-followers', label: 'Followers' },
        { id: 'community-subscribers', label: 'Subscribers' }
      ]
    },
    {
      id: 'content',
      label: 'Content',
      icon: FileText,
      hasDropdown: true,
      subItems: [
        { id: 'content-videos', label: 'Videos' },
        { id: 'content-clips', label: 'Clips' },
        { id: 'content-highlights', label: 'Highlights' },
        { id: 'content-schedule', label: 'Schedule' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      hasDropdown: true,
      subItems: [
        { id: 'settings-profile', label: 'Profile' },
        { id: 'settings-stream', label: 'Stream' },
        { id: 'settings-notifications', label: 'Notifications' },
        { id: 'settings-privacy', label: 'Privacy' }
      ]
    },
    {
      id: 'viewer-rewards',
      label: 'Rewards',
      icon: Gift,
      hasDropdown: true,
      subItems: [
        { id: 'rewards-points', label: 'Channel Points' },
        { id: 'rewards-predictions', label: 'Predictions' },
        { id: 'rewards-polls', label: 'Polls' },
        { id: 'rewards-goals', label: 'Goals' }
      ]
    },
    { id: 'stream-together', label: 'Streams', icon: UserPlus, hasDropdown: false },
    { id: 'streaming-tools', label: 'Tools', icon: Wrench, hasDropdown: false },
    { id: 'extensions', label: 'Extensions', icon: Puzzle, hasDropdown: false },
    { id: 'creator-camp', label: 'Creator', icon: GraduationCap, hasDropdown: false },
    { id: 'safety-center', label: 'Center', icon: Shield, hasDropdown: false }
  ];

  const navigateToPage = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // All theme/dark/light logic removed, default to light mode classes
  const renderDashboardHome = () => (

    <div className="space-y-8 pb-20">
      {/* Welcome Section */}
      <div className="rounded-2xl p-8 border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg -mt-16  ">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">Welcome, hamzakhurram!</h1>
            <p className="text-lg text-green-400 mt-2">Ready to create amazing content today?</p>
          </div>
          <div className="text-6xl">🥇</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Followers', value: '12.5K', icon: Users, color: 'text-blue-400' },
          { label: 'Live Viewers', value: '1,234', icon: Eye, color: 'text-green-400' },
          { label: 'Stream Hours', value: '456', icon: Clock, color: 'text-purple-400' },
          { label: 'Revenue', value: '$2,890', icon: DollarSign, color: 'text-yellow-400' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-6 w-6 ${stat.color}`} />
                <span className="text-2xl font-bold text-slate-400">{stat.value}</span>
              </div>
              <p className="text-sm text-green-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Start Streaming Section */}
      <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Start Streaming by Going Live</h2>
            <p className="mb-6 text-slate-400">
              If you're streaming from a computer, you need software that broadcasts your content to StreamVibe.
            </p>
            <p className="mb-6 text-slate-400">
              Don't worry, we've got you! Creator Camp is a free and easy to use resource that will help you set up your first stream on StreamVibe!
            </p>
            <button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Go to Creator Camp
            </button>
          </div>
          <div className="rounded-xl p-6bg-gradient-to-br from-slate-800 to-slate-900  p-4 border border-slate-700/50 shadow-lg">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-400">SoulStream Creator Camp</h3>
              <p className="text-sm text-green-400">Learn the basics of streaming</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-2xl font-bold font-mono mb-6 text-blue-400">Features For You</h2>
        {/* <p className="mb-6 text-slate-400">Learn ways to improve and promote your channel</p> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Add a link to your Social Media',
              description: 'These links will display in the "About Me" section of your Channel.',
              icon: Share2,
              status: 'NOT STARTED'
            },
            {
              title: 'Make chat safer with AutoMod',
              description: 'AutoMod detects inappropriate or harmful messages and holds them for review.',
              icon: Shield,
              status: 'NOT STARTED'
            },
            {
              title: 'Set customized chat rules',
              description: 'Communicate your personal rules and expectations for your community.',
              icon: MessageSquare,
              status: 'NOT STARTED'
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className=" border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">{feature.status}</span>
                  <button className="text-slate-400 hover:text-slate-400">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-center mb-4">
                  <Icon className="h-12 w-12 mx-auto mb-3 text-amber-700" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-400">{feature.title}</h3>
                <p className="text-sm text-green-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stream Quality Check */}
      <div className=" border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Check your stream quality</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg p-4 ">
            <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
              <Play className="h-12 w-12 text-white" />
            </div>
          </div>
          <div>
            <p className="mb-4 text-slate-400">
              While these are not required to stream, a fast internet connection, good audio and good lighting can drastically improve the viewing experience for your audience.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-green-400">Was this useful?</span>
              <button className="bg-blue-600 hover:bg-text-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStreamManager = () => (
    <div className="space-y-6 pb-20">
      {/* Header with stats */}
      <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6 -mt-16">
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">0:00:00</div>
            <div className="text-sm text-green-400">Session</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">0</div>
            <div className="text-sm text-green-400">Viewers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">0</div>
            <div className="text-sm text-green-400">Followers</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stream Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-blue-400">Stream Preview</h2>
            <button className="text-slate-400 hover:text-slate-400">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="relative aspect-video rounded-lg border-2 border-dashed flex items-center justify-center border-amber-500/50 bg-slate-900/50  backdrop-blur-lg font-mono  shadow-lg  p-6">
            <div className="text-center">
              <div className="text-6xl mb-4 text-gray-400">📺</div>
              <div className="text-lg font-semibold mb-2 font-mono text-green-400">OFFLINE</div>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="p-2 rounded bg-white text-slate-400">
                <Cog className="h-4 w-4" />
              </button>
              <button className="p-2 rounded bg-white text-slate-400">
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-400">Quick Actions</h3>
              <button className="text-slate-400 hover:text-slate-400">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {[
                { icon: Edit, label: 'Edit Stream Info', color: 'from-purple-500 to-purple-600' },
                { icon: Calendar, label: 'Schedule Stream', color: 'from-blue-500 to-blue-600' },
                { icon: Target, label: 'Raid Channel', color: 'from-pink-500 to-pink-600' },
                { icon: Star, label: 'Host Channel', color: 'from-yellow-500 to-yellow-600' },
                { icon: UserPlus, label: 'Add Moderator', color: 'from-green-500 to-green-600' }
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className={`p-4 rounded-lg bg-gradient-to-br ${action.color} text-white hover:scale-105 transition-transform duration-200 flex flex-col items-center space-y-2`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs text-center">{action.label}</span>
                  </button>
                );
              })}
              <button className="p-4 rounded-lg border-2 border-dashed flex flex-col items-center justify-center space-y-2 border-gray-300 text-slate-400 hover:border-gray-400">
                <Plus className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <div className=" mt-10 border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-400">Activity Feed</h3>
              <button className="text-slate-400 hover:text-slate-400">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center py-8">
              <div className="text-lg font-semibold mb-2 text-slate-400">It's quiet. Too quiet...</div>
              <p className="text-sm text-green-400">
                We'll show your new follows, subs, cheers, and raids activity here.
              </p>
            </div>
          </div>

          {/* My Chat */}
          <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-400">My Chat</h3>
              <button className="text-slate-400 hover:text-slate-400">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center py-4">
              <p className="text-md text-green-400">Welcome to the chat room!</p>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="text"
                placeholder="Send a message"
                className="flex-1 px-3 py-2 border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6"
              />
              <button className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Collaboration */}
          <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-400">Collaboration</h3>
              <button className="text-slate-400 hover:text-slate-400">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <button className="w-full mb-4 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Invite Guests</span>
            </button>

            <div>
              <h4 className="font-semibold mb-2 text-blue-400">FAVORITES</h4>
              <p className="text-sm text-slate-400">
                You haven't added any collaborators yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const renderAlerts = () => (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="text-start">
        <h1 className="rounded-2xl text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 p-8 border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mowaq  shadow-lg -mt-16">
          SoulStream Alerts!
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* New ways to recognize */}
          <div>
            <h2 className="text-2xl font-bold mb-6 font-mono text-blue-400">New ways to recognize</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Hype Train Alerts',
                  description: 'Customize your hype train alerts to stay on top of when a Hype Train has started and to hype up your stream\'s accomplishments even more!',
                  image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
                  badge: '↗ 11% Avg. Gift/Bits Revenue',
                  color: 'text-green-400'
                },
                {
                  title: 'Celebrations',
                  description: 'Celebrate by adding emote filled fireworks or emote flamethrowers to any alert to amp up community support in a brand new way.',
                  image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
                  badge: '↗ 14% Avg. Gift/Bits Revenue',
                  color: 'text-green-400'
                },
                {
                  title: 'Creator Goals',
                  description: 'Set up Goal alerts to celebrate your community members for contributing to your goal.',
                  image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=400',
                  badge: 'NEW',
                  color: 'text-purple-400'
                }
              ].map((alert, index) => (
                <div key={index} className="rounded-lg font-mono border overflow-hidden border-amber-500/50 bg-slate-900/50 backdrop-blur-lg font-mono  shadow-lg p-3">
                  <div className="relative">
                    <img src={alert.image} alt={alert.title} className="w-full h-32 object-cover" />
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold ${alert.color} bg-black/60`}>
                      {alert.badge}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-blue-400">{alert.title}</h3>
                    <p className="text-sm font-mono text-slate-400">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="text-green-400 hover:text-green-500 font-semibold flex items-center mx-auto">
                Show More <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Easy to use */}
          <div>
            <h2 className="text-2xl font-bold mb-6 font-mono text-blue-400">Easy to use</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Keep existing alerts',
                  description: 'No need to move all your alerts over from your current provider.',
                  icon: CheckCircle
                },
                {
                  title: 'Fully Customizable',
                  description: 'Our alerts offer easy customization options to fit your brand.',
                  icon: Palette
                },
                {
                  title: 'How it works',
                  description: '1. Create Alert Box ➕\n2. Copy Browser Source URL\n3. Add to your streaming software',
                  icon: HelpCircle
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h3 className="font-semibold mb-2 text-blue-400">{feature.title}</h3>
                    <p className="text-sm text-slate-400 whitespace-pre-line">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streamer Favorites */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Streamer Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Sound Alerts',
                  description: 'Let your community play sounds during your stream',
                  icon: Headphones,
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Chat Commands',
                  description: 'Create custom commands for your chat',
                  icon: MessageSquare,
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'Stream Overlays',
                  description: 'Beautiful overlays to enhance your stream',
                  icon: Monitor,
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'Donation Goals',
                  description: 'Track progress towards your goals',
                  icon: Target,
                  color: 'from-orange-500 to-red-500'
                }
              ].map((favorite, index) => {
                const Icon = favorite.icon;
                return (
                  <div key={index} className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${favorite.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 text-blue-400">{favorite.title}</h3>
                    <p className="text-sm text-slate-400">{favorite.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Updates */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-400 font-mono">Updates</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'New Alert Animations Added',
                  description: 'We\'ve added 15 new animation styles for your alerts',
                  date: '2 days ago',
                  type: 'Feature'
                },
                {
                  title: 'Performance Improvements',
                  description: 'Faster loading times and better reliability',
                  date: '1 week ago',
                  type: 'Update'
                },
                {
                  title: 'Mobile App Released',
                  description: 'Manage your alerts on the go with our new mobile app',
                  date: '2 weeks ago',
                  type: 'Feature'
                }
              ].map((update, index) => (
                <div key={index} className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-blue-400">{update.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${update.type === 'Feature'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                          }`}>{update.type}</span>
                      </div>
                      <p className="text-sm text-slate-400">{update.description}</p>
                    </div>
                    <span className="text-xs text-green-400">{update.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold mb-6 font-mono text-blue-400">FAQ</h2>
            <div className="space-y-4">
              {[
                {
                  question: 'How do I set up my first alert?',
                  answer: 'Click "Create Alert Box" in the sidebar, customize your settings, and copy the browser source URL to your streaming software.'
                },
                {
                  question: 'Can I use custom sounds?',
                  answer: 'Yes! You can upload your own sound files or choose from our library of pre-made sounds.'
                },
                {
                  question: 'Is there a limit to how many alerts I can create?',
                  answer: 'Free accounts can create up to 5 alert boxes. Premium accounts have unlimited alert boxes.'
                }
              ].map((faq, index) => (
                <div key={index} className="rounded-lg  p-4 border border-amber-500/50 bg-slate-900/50 backdrop-blur-lg font-mono  shadow-lg ">
                  <h3 className="font-semibold mb-2 text-blue-400">{faq.question}</h3>
                  <p className="text-sm text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Your Alerts */}
          <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Your Alerts</h3>
            <div className="text-center py-8">
              <div className="text-lg font-semibold mb-2 text-slate-400">Alerts Boxes - 0/10</div>
              <button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 mb-4">
                <Plus className="h-4 w-4" />
                <span>Create Alert Box</span>
              </button>
              <div className="text-lg font-semibold mb-2 text-slate-400">No Alert Boxes</div>
              <p className="text-sm text-green-400">Create an Alert Box to get started</p>
            </div>
          </div>

          {/* Activity Feed Controls */}
          <div className=" border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-blue-400">Activity Feed Controls</h3>
            <p className="text-sm mb-4 text-slate-400">
              Skip, replay, or block StreamVibe alerts with your activity feed.
            </p>
            <div className="flex items-center justify-center">
              <Cog className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStreamingTools = () => (
    <div className="space-y-8 pb-20">
      {/* Third Party Connections */}
      <div>
        <h2 className="text-5xl font-bold rounded-xl mb-7 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 p-8 border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mowaq  shadow-lg -mt-16">Third Party Connections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Crowd Control',
              url: 'https://crowdcontrol.live/',
              description: 'Crowd Control is the ultimate interactive gaming experience for your streams. Let your viewers take control of your game - whether it\'s sending you powerups, inverting your controllers, spawning new enemies, or anything in between. Over 100 games are supported, including Minecraft, Elden Ring, GTA V, and more.',
              icon: '😄',
              bgColor: 'bg-yellow-400',
              badge: 'NEW'
            },
            {
              name: 'StreamElements',
              url: 'https://streamelements.com/',
              description: 'A full suite for all your streaming needs. Bot, Overlays, Loyalty points, Giveaways and much more for new and veteran streamers alike.',
              icon: '🚀',
              bgColor: 'bg-blue-500',
              badge: 'NEW'
            },
            {
              name: 'Streamlabs',
              url: 'https://streamlabs.com/',
              description: 'Streamlabs is home to a comprehensive suite of live streaming tools and features to help streamers grow their audience and make a living creating content. Streamlabs offers tools like alerts, tips, chatbot, merch, logo maker, twitch panel maker, a charity platform, and dozens of interactive widgets.',
              icon: '🎮',
              bgColor: 'bg-green-400',
              badge: 'NEW'
            },
            {
              name: 'Throne',
              url: 'https://throne.com/',
              description: 'Throne is the gifting platform for the creator economy. Join over 350,000 creators and try Throne\'s free, fun, and privacy-first wishlist so your community can support you whilst keeping your details private. With Throne, you can add almost any link on the internet, integrate directly with your favorite tools, add your favorite gift-giving events, and more.',
              icon: '👑',
              bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
              badge: 'NEW'
            }
          ].map((tool, index) => (
            <div key={index} className=" border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-3">
              <div className={`h-32 flex items-center justify-center text-6xl ${tool.bgColor}`}>
                {tool.icon}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-blue-400">{tool.name}</h3>
                  {tool.badge && (
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded font-semibold">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <a href={tool.url} className="text-green-400 hover:text-blue-300 text-sm mb-3 block">
                  {tool.url}
                </a>
                <p className="text-sm leading-relaxed text-slate-400">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Events Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Crowd Control Events Now',
              badge: 'NEW',
              color: 'bg-yellow-400'
            },
            {
              title: 'StreamElements Events Now',
              badge: 'NEW',
              color: 'bg-blue-500'
            },
            {
              title: 'Streamlabs Events Now Integrate',
              badge: 'NEW',
              color: 'bg-green-400'
            },
            {
              title: 'Throne Events Now',
              badge: 'NEW',
              color: 'bg-gradient-to-br from-purple-500 to-pink-500'
            }
          ].map((event, index) => (
            <div key={index} className=" border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-400">{event.title}</h4>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded font-semibold">
                  {event.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streaming Software */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Open Broadcaster Software',
              url: 'https://obsproject.com/',
              description: 'Free and open source software for recording and live streaming. Source code is available to everyone to contribute and improve.',
              icon: '💥',
              bgColor: 'bg-teal-500',
              badge: 'NEW'
            },
            {
              name: 'Streamlabs Desktop',
              url: 'https://streamlabs.com/streamlabs-live-streaming-software',
              description: 'Streamlabs Desktop is a free, open-source, all-in-one streaming software for new streamers and power users alike. Everything you need to live stream is available in one solution.',
              icon: '🙂',
              bgColor: 'bg-red-500',
              badge: 'NEW'
            },
            {
              name: 'Lightstream Studio',
              url: 'https://golightstream.com/twitch',
              description: 'Stream from your Xbox or PlayStation without a capture card or high-end PC. Setup your overlays and alerts in any browser – Lightstream will add them to your stream automatically every time you go live. Try it free!.',
              icon: '🕹',
              bgColor: 'bg-orange-400',
              badge: 'NEW'
            },
            {
              name: 'Talk Studio',
              url: 'https://streamlabs.com/talk-studio',
              description: 'Create professional live streams from your browser in seconds. Invite guests, customize your broadcast, add your branding, and grow your viewership. Intuitive and bundled with powerful features. No downloads required.',
              icon: '⚔',
              bgColor: 'bg-yellow-400',
              badge: 'NEW'
            }
          ].map((tool, index) => (
            <div key={index} className="rounded-xl border overflow-hidden border-amber-500/50 bg-slate-900/50 backdrop-blur-lg font-mono  shadow-lg">
              <div className={`h-32 flex items-center justify-center text-6xl ${tool.bgColor}`}>
                {tool.icon}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-blue-400">{tool.name}</h3>
                  {tool.badge && (
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded font-semibold">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <a href={tool.url} className="text-green-400 hover:text-green-500 text-sm mb-3 block">
                  {tool.url}
                </a>
                <p className="text-sm leading-relaxed text-slate-400">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExtensions = () => (
    <div className="space-y- pb-20">
      <div className="flex items-center justify-between -mt-16">
        <h1 className=" text-5xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">Extensions</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
          Browse All Extensions
        </button>
      </div>

      {/* Featured Extensions */}
      <div>
        <h2 className="text-2xl font-bold mb-6 mt-3 text-blue-400">Featured Extensions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'StreamLabs Overlay',
              description: 'Add interactive overlays to your stream with alerts, chat, and more.',
              category: 'Overlay',
              rating: 4.8,
              installs: '2.5M+',
              icon: Monitor,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              name: 'Sound Alerts',
              description: 'Let viewers play custom sounds during your stream.',
              category: 'Interactive',
              rating: 4.6,
              installs: '1.8M+',
              icon: Headphones,
              color: 'from-purple-500 to-pink-500'
            },
            {
              name: 'Chat Commands',
              description: 'Create custom chat commands and moderation tools.',
              category: 'Moderation',
              rating: 4.7,
              installs: '3.2M+',
              icon: MessageSquare,
              color: 'from-green-500 to-emerald-500'
            },
            {
              name: 'Donation Tracker',
              description: 'Track donations and display goals on your stream.',
              category: 'Monetization',
              rating: 4.9,
              installs: '1.2M+',
              icon: DollarSign,
              color: 'from-yellow-500 to-orange-500'
            },
            {
              name: 'Game Integration',
              description: 'Connect your games with stream for interactive gameplay.',
              category: 'Gaming',
              rating: 4.5,
              installs: '950K+',
              icon: Gamepad2,
              color: 'from-red-500 to-pink-500'
            },
            {
              name: 'Music Player',
              description: 'Play music during your stream with copyright protection.',
              category: 'Audio',
              rating: 4.4,
              installs: '750K+',
              icon: Music,
              color: 'from-indigo-500 to-purple-500'
            }
          ].map((extension, index) => {
            const Icon = extension.icon;
            return (
              <div key={index} className="rounded-xl border overflow-hidden transition-all duration-300 p-3 border-amber-500/50 bg-slate-900/50  backdrop-blur-lg font-mono  shadow-lg">
                <div className={`h-32 bg-gradient-to-br ${extension.color} flex items-center justify-center`}>
                  <Icon className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-blue-400">{extension.name}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">{extension.category}</span>
                  </div>
                  <p className="text-sm mb-4 text-slate-400">
                    {extension.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1 text-blue-400">
                          {extension.rating}
                        </span>
                      </div>
                      <span className="text-xs text-green-400">
                        {extension.installs}
                      </span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200">
                      Install
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-6 font-mono mt-8 text-blue-400">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Overlays', icon: Monitor, count: 45 },
            { name: 'Interactive', icon: Zap, count: 32 },
            { name: 'Moderation', icon: Shield, count: 28 },
            { name: 'Gaming', icon: Gamepad2, count: 67 },
            { name: 'Audio', icon: Headphones, count: 23 },
            { name: 'Analytics', icon: BarChart3, count: 19 }
          ].map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                className="p-4 rounded-lg border text-center transition-all duration-200  overflow-hidden border-amber-500/50 bg-slate-900/50  backdrop-blur-lg font-mono  shadow-lg"
              >
                <Icon className="h-8 w-8 mx-auto mb-2 text-amber-700" />
                <h3 className="font-semibold font-mono text-sm text-blue-400">
                  {category.name}
                </h3>
                <p className="text-xs text-green-400">
                  {category.count} extensions
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* My Extensions */}
      <div>
        <h2 className="text-2xl font-bold mb-6 mt-8 text-blue-400">My Extensions</h2>
        <div className="rounded-lg border p-8 text-center overflow-hidden border-amber-500/50 bg-slate-900/50  backdrop-blur-lg font-mono  shadow-lg">
          <Puzzle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2 text-blue-400">
            No Extensions Installed
          </h3>
          <p className="mb-4 text-slate-400">
            Browse our extension library to enhance your streaming experience.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
            Browse Extensions
          </button>
        </div>
      </div>
    </div>
  );


  const renderStreamTogether = () => (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="text-center">
        <h1 className=" mb-4 text-5xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 -mt-16">
          Streaming is Better, Together
        </h1>
        <p className="text-lg mb-6 font-mono text-slate-400">
          More chat, more viewers, and more ways to collaborate on StreamVibe.
        </p>
        <button className="bg-blue-400 font-mono hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
          📺 Start Streaming Together
        </button>
      </div>

      {/* Setup Instructions */}
      <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-400">
              Get your streaming software ready to accept collaborators over video
            </h3>
            <p className="text-slate-400">
              Stream Together works over audio, but uses browser sources to enable collaborators to show up on your stream.
            </p>
            <p className="mt-2 text-slate-400">
              Want more help setting up video? <a href="#" className="text-blue-400 hover:text-purple-300">Follow our help article</a> or <a href="#" className="text-blue-400 hover:text-blue-500">watch this video</a> 📺.
            </p>
          </div>
          <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Copy className="h-4 w-4" />
            <span>Copy Browser Source URL</span>
          </button>
        </div>
      </div>

      {/* New ways to collaborate */}
      <div>
        <h2 className="text-2xl font-mono font-bold mb-6 text-blue-400">
          New ways to collaborate
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Shared Hype Trains */}
          <div className="rounded-lg border overflow-hidden p-3 border-amber-500/50 bg-slate-900/50  backdrop-blur-lg font-mono  shadow-lg ">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-600 p-6 text-white">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">M</span>
                  </div>
                  <span className="font-semibold">MISTERARTHUR</span>
                </div>
                <div className="text-sm">
                  🎁 Shared Hype Train
                </div>
                <div className="text-lg font-bold">Lvl 110</div>
                <div className="text-sm">99%</div>
              </div>
              <div className="text-xs">fanfan</div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 text-blue-400">
                Shared Hype Trains are here!
              </h3>
              <p className="text-sm text-slate-400">
                In Stream Together session with Shared Chat enabled, your communities will be able to kick off a new shared Hype Train in all the usual ways—using Bits, Subbing, and Gifting. By your powers combined, build the biggest, hypest locomotive known to mankind while giving your viewers access to exclusive rewards. <a href="#" className="text-blue-400 hover:text-blue-500">Learn More</a> ➜
              </p>
            </div>
          </div>

          {/* Shared Viewership */}
          <div className="rounded-lg border overflow-hidden p-3 border-amber-500/50 bg-slate-900/50  backdrop-blur-lg font-mono  shadow-lg">
            <div className="h-48 bg-gradient-to-br from-pink-500 to-orange-500 p-6 text-white">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-red-500 text-xs font-bold mb-1">● LIVE</div>
                  <div className="text-xs">👥 2,190</div>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-red-500 text-xs font-bold mb-1">● LIVE</div>
                  <div className="text-xs">👥 1,742</div>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-red-500 text-xs font-bold mb-1">● LIVE</div>
                  <div className="text-xs">👥 1,830</div>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-red-500 text-xs font-bold mb-1">● LIVE</div>
                  <div className="text-xs">👥 1,790</div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 text-blue-400">
                Introducing Shared Viewership
              </h3>
              <p className="text-sm font-mono text-slate-400">
                Shared Chat now unlocks Shared Viewership. Combine view counts, boost discoverability, and bring your communities together like never before. <a href="#" className="text-blue-400 hover:text-blue-500">Learn More</a> ➜
              </p>
            </div>
          </div>

          {/* Shared Chat */}
          <div className="rounded-lg border overflow-hidden p-3 border-amber-500/50 bg-slate-900/50  backdrop-blur-lg font-mono  shadow-lg">
            <div className="h-48 bg-gradient-to-br from-green-500 to-teal-500 p-6 text-white">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                  <span className="text-xs font-semibold">pokimane</span>
                  <span className="text-xs">hello everyone!</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                  <span className="text-xs font-semibold">xqc</span>
                  <span className="text-xs">poggers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-pink-600 rounded-full"></div>
                  <span className="text-xs font-semibold">valkyrae</span>
                  <span className="text-xs">this is amazing!</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 text-blue-400">
                Shared Chat: A new way to amp up your collaborations
              </h3>
              <p className="text-sm font-mono text-slate-400">
                Enable Shared Chat during a Stream Together session, and you can bring your communities together into a fun, combined chat experience. <a href="#" className="text-blue-400 hover:text-blue-500">Try It Out</a> ➜
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Favorites */}
      <div>
        <div className="flex items-center font-mono justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-400">
            Manage Favorites
          </h2>
          <button className="text-blue-400 hover:text-blue-500 font-medium">
            Add Favorites
          </button>
        </div>
        <p className="mb-4 font-mono text-slate-400">
          Add trusted friends and streamers to your Favorites to quickly see their live status in Stream Manager. Your Favorites can knock when you're live and open to collaborating. <a href="#" className="text-blue-400 hover:text-blue-500">Learn more</a>
        </p>
        <div className="p-8 rounded-lg border text-center border-amber-500/50 bg-slate-900/50 backdrop-blur-lg font-mono  shadow-lg">
          <h3 className="font-semibold font-mono mb-2 text-blue-400">
            Favorites
          </h3>
          <p className="text-sm mb-4 font-mono text-slate-400">
            You haven't added any collaborators yet.
          </p>
          <button className="bg-blue-400 font-mono hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
            Add Favorites
          </button>
        </div>
      </div>
    </div>
  );


  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderDashboardHome();
      case 'stream-manager':
        return renderStreamManager();
      case 'alerts':
        return renderAlerts();
      case 'streaming-tools':
        return renderStreamingTools();
      case 'stream-together':
        return renderStreamTogether();
      case 'extensions':
        return renderExtensions();
      case 'analytics':
        // case 'analytics-overview':
        // case 'analytics-audience':
        // case 'analytics-revenue':
        // case 'analytics-performance':
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4 text-slate-400">Coming Soon</h2>
            <p className="text-slate-400">This feature is under development.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-950 text-slate-400">
      <div className="pt-16">
        {/* Top Tab Navigation */}
        <div className="flex justify-center -ml-1.5 left-0 w-full -mt-10">
          <nav className="flex space-x-2 px-4 py-2 ">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedMenus.includes(item.id);
              const isActive = currentPage === item.id || currentPage.startsWith(item.id);

              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => {
                      if (item.hasDropdown) {
                        toggleMenu(item.id);
                      } else {
                        navigateToPage(item.id);
                      }
                    }}
                    className={`flex items-center font-mono text-sm space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-blue-700'
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.hasDropdown && (
                      <>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </>
                    )}
                  </button>

                  {/* Dropdown for sub-items */}
                  {item.hasDropdown && isExpanded && (
                    <div className="absolute top-full left-0 mt-1 bg-card border rounded-md shadow-md w-48">
                      {item.subItems?.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => navigateToPage(subItem.id)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${currentPage === subItem.id
                              ? 'bg-blue-100 text-blue-600'
                              : 'text-slate-600 hover:text-slate-800 hover:bg-gray-100'
                            }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <main className="pt-28 px-4">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );

};

export default CreatorDashboard;