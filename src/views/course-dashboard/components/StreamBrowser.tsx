import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { useStreaming } from '../../../context/StreamingProvider';

export default function StreamViewer() {
  const {
    joinStream,
    currentStream,
    activeStreams,
    remoteStream,
    chatMessages,
    sendChatMessage,
    leaveStream,
    isCreator,
    viewers
  } = useStreaming();

  const { userData: user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [remoteVideoRef, setRemoteVideoRef] = useState<HTMLVideoElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isWatching = currentStream && !isCreator;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (remoteVideoRef && remoteStream) {
      remoteVideoRef.srcObject = remoteStream;
    }
    
    return () => {
      if (remoteVideoRef) {
        remoteVideoRef.srcObject = null;
      }
    };
  }, [remoteStream, remoteVideoRef]);

  const handleJoinStream = async (streamId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await joinStream(streamId);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError('Failed to join stream');
      console.error('Join stream error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      sendChatMessage(messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLeaveStream = () => {
    if (remoteVideoRef) {
      remoteVideoRef.srcObject = null;
    }
    leaveStream();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <span className="ml-4 text-slate-300 mt-4">Loading stream...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <div className="bg-red-900/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-lg max-w-md">
          <div className="flex items-center">
            <span className="text-red-400 mr-2">⚠️</span>
            <strong>Error: </strong> {error}
          </div>
          <button 
            onClick={() => setError(null)}
            className="mt-3 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded text-red-300 hover:bg-red-600/30 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Watch Live Streams
          </h1>
          <div className="text-sm text-slate-400">
            Logged in as: {user?.email}
          </div>
        </div>

        {isWatching ? (
          // Watching a stream
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main video area */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-slate-800/50 p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-200">
                      {currentStream?.email}'s Stream
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        LIVE • {viewers} {viewers === 1 ? 'viewer' : 'viewers'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLeaveStream}
                    className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-600/30 transition-colors"
                  >
                    Leave Stream
                  </button>
                </div>

                {/* Video container */}
                <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <video
                    ref={setRemoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                    controls
                  />
                  
                  {/* Live indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-red-600/80 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-white">LIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-slate-800/50 h-full flex flex-col">
                <div className="p-4 border-b border-slate-800/50">
                  <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Live Chat
                  </h3>
                </div>

                {/* Chat messages */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
                >
                  {chatMessages?.length > 0 ? (
                    chatMessages?.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-lg ${
                          msg.isSystem
                            ? 'bg-purple-900/20 border border-purple-500/30'
                            : msg.user === user?.email
                              ? 'bg-blue-900/20 border border-blue-500/30'
                              : 'bg-slate-800/30 border border-slate-700/50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`font-medium text-sm ${
                            msg.isSystem 
                              ? 'text-purple-300' 
                              : msg.user === user?.email
                                ? 'text-blue-300'
                                : 'text-slate-200'
                          }`}>
                            {msg.isSystem ? 'System' : msg.user}
                          </span>
                          <span className="text-xs text-slate-500">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300">{msg.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      <div className="text-2xl mb-2">💬</div>
                      <p>No messages yet</p>
                      <p className="text-xs mt-1">Be the first to chat!</p>
                    </div>
                  )}
                </div>

                {/* Chat input */}
                <div className="p-4 border-t border-slate-800/50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-500"
                      placeholder="Type a message..."
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Stream selection
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-200">Available Streams</h2>
              {activeStreams?.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <div className="text-4xl mb-4">📺</div>
                  <p className="text-lg">No active streams available</p>
                  <p className="text-sm mt-2">Check back later or start your own stream!</p>
                </div>
              )}
            </div>

            {/* Stream grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeStreams?.map((stream) => (
                <div 
                  key={stream.id} 
                  className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-slate-800/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                >
                  {/* Stream thumbnail */}
                  <div className="bg-slate-800 h-48 flex items-center justify-center relative">
                    <div className="text-6xl text-slate-600">📹</div>
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-red-600/80 rounded-full">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-white">LIVE</span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-slate-900/80 rounded-full">
                      <span className="text-xs font-medium text-white">
                        {stream.viewerCount} {stream.viewerCount === 1 ? 'viewer' : 'viewers'}
                      </span>
                    </div>
                  </div>

                  {/* Stream info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-slate-200">
                      {stream.email}'s Stream
                    </h3>
                    <p className="text-slate-400 text-sm mb-3">
                      Started {new Date(stream.createdAt).toLocaleTimeString()}
                    </p>
                    <button
                      onClick={() => handleJoinStream(stream.id)}
                      disabled={loading}
                      className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? 'Joining...' : 'Watch Stream'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}