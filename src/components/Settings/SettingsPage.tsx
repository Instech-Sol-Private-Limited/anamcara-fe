import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Globe, Palette, Save, Eye, EyeOff } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    courseUpdates: true,
    studentMessages: true,
    marketingEmails: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Palette }
  ];

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6 ">
      <div>
        <h3 className="text-lg font-semibold text-blue-400 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
            <input
              type="text"
              defaultValue="Sarah"
              className="w-full px-3 py-2 text-slate-400 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
            <input
              type="text"
              defaultValue="Johnson"
              className="w-full text-slate-400 px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
            <input
              type="email"
              defaultValue="sarah.johnson@email.com"
              className="w-full px-3 py-2 text-slate-400 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-3 py-2 text-slate-400 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Bio</label>
        <textarea
          rows={4}
          defaultValue="Experienced web developer and instructor with 8+ years in the industry. Passionate about teaching modern web technologies and helping students achieve their goals."
          className="w-full px-3 py-2 text-slate-400 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Profile Picture</label>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xl">
            SJ
          </div>
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Upload New Photo
            </button>
            <p className="text-sm text-green-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-blue-400 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-700">
              <div>
                <h4 className="font-medium text-slate-400">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-green-400">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'pushNotifications' && 'Receive push notifications on your device'}
                  {key === 'courseUpdates' && 'Get notified about course updates and new content'}
                  {key === 'studentMessages' && 'Receive notifications when students send messages'}
                  {key === 'marketingEmails' && 'Receive promotional emails and updates'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-blue-400 mb-4">Security Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-slate-400 mb-2">Two-Factor Authentication</h4>
        <p className="text-sm text-slate-400 mb-4">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </p>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Enable 2FA
        </button>
      </div>

      <div className="bg-slate-900/50 border border-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-slate-400 mb-2">Active Sessions</h4>
        <p className="text-sm text-green-400 mb-4">
          Manage your active sessions across different devices.
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-slate-400">Current Session - Chrome on MacOS</p>
              <p className="text-xs text-green-400">Last active: Now</p>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Current</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-slate-400">Safari on iPhone</p>
              <p className="text-xs text-green-400">Last active: 2 hours ago</p>
            </div>
            <button className="text-sm text-red-600 hover:text-red-800">Revoke</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-blue-400 mb-4">Billing Information</h3>
        <div className="bg-slate-900/50 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-400">Pro Plan</h4>
              <p className="text-sm text-green-400">$29/month • Next billing: Feb 15, 2024</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Manage Plan
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-slate-400 mb-4">Payment Methods</h4>
        <div className="space-y-3">
          <div className="border border-gray-700 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div>
                <p className="font-medium text-green-400">•••• •••• •••• 4242</p>
                <p className="text-sm text-slate-400">Expires 12/25</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default</span>
              <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
            </div>
          </div>
          <button className="w-full p-4 border-2 border-dashed border-gray-700 rounded-lg text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-colors">
            + Add Payment Method
          </button>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-slate-400 mb-4">Billing History</h4>
        <div className="space-y-2">
          {[
            { date: 'Jan 15, 2024', amount: '$29.00', status: 'Paid' },
            { date: 'Dec 15, 2023', amount: '$29.00', status: 'Paid' },
            { date: 'Nov 15, 2023', amount: '$29.00', status: 'Paid' }
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700">
              <div>
                <p className="font-medium text-slate-400">{invoice.date}</p>
                <p className="text-sm text-green-400">Pro Plan</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-slate-400">{invoice.amount}</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {invoice.status}
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-800">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-blue-400 mb-4">General Preferences</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400  mb-2">Language</label>
            <select className="w-full px-3 py-2 text-white bg-slate-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Timezone</label>
            <select className="w-full px-3 py-2 border border-gray-700 text-white rounded-lg focus:ring-2 bg-slate-900/50 focus:ring-blue-500 focus:border-transparent">
              <option value="UTC-8">Pacific Time (UTC-8)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
              <option value="UTC+1">Central European Time (UTC+1)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Date Format</label>
            <select className="w-full px-3 py-2 border border-gray-700 text-white bg-slate-900/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-slate-400 mb-4">Dashboard Preferences</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-slate-400">Show course thumbnails</h5>
              <p className="text-sm text-green-400">Display course thumbnails in lists</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-slate-400">Auto-save drafts</h5>
              <p className="text-sm text-green-400">Automatically save course drafts while editing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'notifications': return renderNotificationsTab();
      case 'security': return renderSecurityTab();
      case 'billing': return renderBillingTab();
      case 'preferences': return renderPreferencesTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6 w-[1500px] -ml-42 mt-14">
      <div className="flex items-center justify-between">
        <h2 className="text-6xl  font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-400 text-white border border-blue-400'
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="border-amber-500/50 bg-slate-900/50 border  backdrop-blur-lg font-mono  shadow-lg rounded-xl p-6">
            {renderTabContent()}
            
            <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-700">
              <button className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => alert('Settings saved successfully!')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;