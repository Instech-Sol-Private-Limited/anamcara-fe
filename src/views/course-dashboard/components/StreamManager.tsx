import { useRef, useState, useEffect } from 'react';
import { BiBroadcast, BiStop } from 'react-icons/bi';
import { FaVideo, FaDesktop, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaCommentDots } from 'react-icons/fa';
import { BsGearFill, BsArrowsFullscreen } from 'react-icons/bs';
import { MoreHorizontal, Send, Eye, MessageCircle } from 'lucide-react';
import { useStreaming } from '../../../context/StreamingProvider';
import { useAuth } from '../../../context/AuthProvider';

const StreamManager = () => {
  const {
    currentStream,
    isCreator,
    remoteStream,
    isSharingScreen,
    videoActive,
    micActive,
    viewers,
    chatMessages,
    startStream,
    stopStream,
    leaveStream,
    toggleMic,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    sendChatMessage,
    toggleFullscreen,
    localVideoRef,
    remoteVideoRef,
    cameraBubbleRef,
  } = useStreaming();

  const { userData } = useAuth();
  const [message, setMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const streamContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isBroadcasting = isCreator && currentStream !== null;
  const isWatching = currentStream && !isCreator;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendChatMessage(message);
      setMessage('');
    }
  };

  const handleToggleScreenShare = () => {
    if (!isBroadcasting) return;
    isSharingScreen ? stopScreenShare() : startScreenShare();
  };

  const handleToggleFullscreen = () => {
    toggleFullscreen(streamContainerRef.current);
  };

  const handleLeaveStream = () => {
    leaveStream();
  };

  const getAvatar = (email: string) => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  const shouldShowRemoteVideo = () => {
    if (!remoteStream) return false;
    const videoTracks = remoteStream.getVideoTracks();
    return videoTracks?.length > 0 && videoTracks[0].enabled;
  };

  const getStreamStatus = () => {
    if (isBroadcasting) return { status: 'LIVE', color: 'text-red-400' };
    if (isWatching) return { status: 'WATCHING', color: 'text-green-400' };
    return { status: 'OFFLINE', color: 'text-slate-400' };
  };

  const streamStatus = getStreamStatus();

  return (
    <div className="h-full flex flex-col gap-6 md:p-6 bg-slate-950/90 text-slate-200 rounded-2xl border border-slate-800/50">
      {/* Enhanced Stream Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-slate-800/50 shadow-lg shadow-[#a70075]/10">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className={`text-2xl font-mono font-medium ${streamStatus.color}`}>
              {streamStatus.status}
            </div>
            <div className="text-xs text-pink-300 uppercase tracking-wider">Status</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-mono font-medium text-purple-300 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {viewers}
            </div>
            <div className="text-xs text-pink-300 uppercase tracking-wider">Viewers</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-mono font-medium text-purple-300 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {chatMessages?.length}
            </div>
            <div className="text-xs text-pink-300 uppercase tracking-wider">Messages</div>
          </div>

          {(isBroadcasting || isWatching) && (
            <div className="text-center">
              <div className="text-sm font-medium text-purple-300">
                {isBroadcasting 
                  ? (isSharingScreen ? 'Screen Share' : 'Camera')
                  : `Watching ${currentStream?.email}`
                }
              </div>
              <div className="text-xs text-pink-300 uppercase tracking-wider">
                {isBroadcasting ? 'Source' : 'Stream'}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">
            {userData.email}
          </span>

          {isWatching ? (
            <button
              onClick={handleLeaveStream}
              className="px-6 py-2 rounded-full font-medium flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200"
            >
              Leave Stream
            </button>
          ) : !isBroadcasting ? (
            <button
              onClick={startStream}
              className="px-6 py-2 rounded-full font-medium flex items-center gap-2 bg-gradient-to-r from-[#cd00ae] to-[#820054] text-white hover:shadow-lg hover:shadow-[#a70075]/30 transition-all duration-200"
            >
              <BiBroadcast /> Go Live
            </button>
          ) : (
            <button
              onClick={stopStream}
              className="px-6 py-2 rounded-full font-medium flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-200"
            >
              <BiStop /> End Stream
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stream Content */}
        <div className={`${isChatOpen ? 'lg:col-span-2' : 'lg:col-span-3'} flex flex-col gap-6`}>
          {/* Stream Preview */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd00ae] to-[#820054]">
                {isBroadcasting 
                  ? 'Your Stream' 
                  : isWatching 
                    ? `Watching ${currentStream?.email}`
                    : 'Stream Preview'
                }
              </h2>
              
              <div className="flex gap-2">
                {isBroadcasting && (
                  <>
                    <button
                      onClick={toggleMic}
                      className={`p-2 rounded-lg ${micActive ? 'bg-slate-800/50 hover:bg-[#a70075]/20' : 'bg-red-600/20'} text-slate-300 hover:text-white border border-slate-700/50 transition-all`}
                      title={micActive ? 'Mute' : 'Unmute'}
                    >
                      {micActive ? <FaMicrophone /> : <FaMicrophoneSlash />}
                    </button>
                    <button
                      onClick={toggleVideo}
                      className={`p-2 rounded-lg ${videoActive ? 'bg-slate-800/50 hover:bg-[#a70075]/20' : 'bg-red-600/20'} text-slate-300 hover:text-white border border-slate-700/50 transition-all`}
                      title={videoActive ? 'Turn off camera' : 'Turn on camera'}
                    >
                      {videoActive ? <FaVideo /> : <FaVideoSlash />}
                    </button>
                    <button
                      onClick={handleToggleScreenShare}
                      className={`p-2 rounded-lg ${isSharingScreen ? 'bg-purple-600/20' : 'bg-slate-800/50 hover:bg-[#a70075]/20'} text-slate-300 hover:text-white border border-slate-700/50 transition-all`}
                      title={isSharingScreen ? 'Stop screen share' : 'Start screen share'}
                    >
                      <FaDesktop />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-[#a70075]/20 text-slate-300 hover:text-white border border-slate-700/50 transition-all"
                  title="Toggle Chat"
                >
                  <FaCommentDots />
                </button>
                <button className="p-2 rounded-lg bg-slate-800/50 hover:bg-[#a70075]/20 text-slate-300 hover:text-white border border-slate-700/50">
                  <BsGearFill />
                </button>
                <button
                  onClick={handleToggleFullscreen}
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-[#a70075]/20 text-slate-300 hover:text-white border border-slate-700/50"
                  title="Toggle Fullscreen"
                >
                  <BsArrowsFullscreen />
                </button>
              </div>
            </div>

            <div
              ref={streamContainerRef}
              className="relative h-[500px] bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-slate-800/50 overflow-hidden flex items-center justify-center shadow-lg shadow-[#a70075]/10"
            >
              {(isBroadcasting || isWatching) ? (
                <>
                  {isBroadcasting ? (
                    <>
                      <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className={`w-full h-full object-cover bg-black ${videoActive || isSharingScreen ? '' : 'hidden'}`}
                      />
                      {/* Show avatar when video is disabled and not screen sharing */}
                      {!videoActive && !isSharingScreen && (
                        <div className="flex items-center justify-center w-full h-full bg-slate-800">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#cd00ae] to-[#820054] flex items-center justify-center text-4xl font-bold text-white">
                            {getAvatar(userData.email as string)}
                          </div>
                        </div>
                      )}

                      {/* Camera bubble during screen share */}
                      {isSharingScreen && (
                        <>
                          {videoActive && (
                            <video
                              ref={cameraBubbleRef}
                              autoPlay
                              muted
                              playsInline
                              className="absolute bottom-4 right-4 w-32 h-24 object-cover bg-black rounded-lg border-2 border-white/20"
                            />
                          )}
                          {!videoActive && (
                            <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
                              <span className="text-white text-lg font-bold">
                                {getAvatar(userData.email as string)}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className={`w-full h-full object-contain bg-black ${shouldShowRemoteVideo() ? '' : 'hidden'}`}
                      />
                      {/* Show avatar when remote video is disabled */}
                      {!shouldShowRemoteVideo() && (
                        <div className="flex items-center justify-center w-full h-full bg-slate-800">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#cd00ae] to-[#820054] flex items-center justify-center text-4xl font-bold text-white">
                            {getAvatar(currentStream?.email || "")}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Live indicator */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-red-600 to-pink-600 rounded-full">
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">
                      {isBroadcasting ? 'LIVE' : 'WATCHING'}
                    </span>
                  </div>

                  {/* Viewer count overlay */}
                  <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {viewers} viewers
                  </div>

                  <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg text-sm">
                    {isBroadcasting 
                      ? (isSharingScreen ? 'Screen Sharing' : 'Camera')
                      : `Watching ${currentStream?.email}`
                    }
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <div className="text-5xl mb-4 text-[#a70075]/50">📺</div>
                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd00ae] to-[#820054] mb-1">
                    STREAM OFFLINE
                  </h3>
                  <p className="text-pink-300 mb-4">
                    Click "Go Live" to start streaming
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Stream Controls */}
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-lg flex flex-col items-center gap-1 ${micActive ? 'bg-slate-800/50' : 'bg-red-600/20'} border border-slate-700/50 transition-all hover:scale-105`}
              disabled={!isBroadcasting}
            >
              {micActive ? <FaMicrophone /> : <FaMicrophoneSlash />}
              <span className="text-xs">{micActive ? 'Mute' : 'Unmute'}</span>
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-lg flex flex-col items-center gap-1 ${videoActive ? 'bg-slate-800/50' : 'bg-red-600/20'} border border-slate-700/50 transition-all hover:scale-105`}
              disabled={!isBroadcasting}
            >
              {videoActive ? <FaVideo /> : <FaVideoSlash />}
              <span className="text-xs">{videoActive ? 'Video' : 'No Video'}</span>
            </button>
            <button
              onClick={handleToggleScreenShare}
              className={`p-3 rounded-lg flex flex-col items-center gap-1 ${isSharingScreen ? 'bg-purple-600/20' : 'bg-slate-800/50'} border border-slate-700/50 transition-all hover:scale-105`}
              disabled={!isBroadcasting}
            >
              <FaDesktop />
              <span className="text-xs">{isSharingScreen ? 'Stop Share' : 'Screen'}</span>
            </button>
            <button
              onClick={isWatching ? handleLeaveStream : (isBroadcasting ? stopStream : startStream)}
              className={`p-3 rounded-lg flex flex-col items-center gap-1 ${
                isWatching 
                  ? 'bg-orange-600/20' 
                  : isBroadcasting 
                    ? 'bg-red-600/20' 
                    : 'bg-gradient-to-r from-[#cd00ae] to-[#820054]'
              } border border-slate-700/50 transition-all hover:scale-105`}
            >
              {isWatching ? (
                <>
                  <span>←</span>
                  <span className="text-xs">Leave</span>
                </>
              ) : isBroadcasting ? (
                <>
                  <BiStop />
                  <span className="text-xs">Stop</span>
                </>
              ) : (
                <>
                  <BiBroadcast />
                  <span className="text-xs">Go Live</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Chat Sidebar */}
        {isChatOpen && (
          <div className="flex flex-col flex-grow bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-slate-800/50 shadow-lg !h-[650px] shadow-[#a70075]/10 overflow-hidden ">
            <div className="p-4 border-b border-slate-800/50">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd00ae] to-[#820054] flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Stream Chat ({chatMessages?.length})
                </h3>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {viewers}
                  </div>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-1 rounded-lg hover:bg-[#a70075]/20 text-slate-300 hover:text-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto flex-grow p-4 space-y-3 min-h-0 h-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700 scrollbar-thumb-rounded-full"
            >
              {chatMessages?.length > 0 ? (
                chatMessages?.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg transition-all hover:scale-[1.02] ${
                      msg.isSystem
                        ? 'bg-[#a70075]/10 border border-[#a70075]/20'
                        : msg.user === userData.email
                          ? 'bg-purple-600/20 border border-purple-500/30 ml-4'
                          : 'bg-slate-800/30 border border-slate-700/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`font-medium text-sm ${
                        msg.isSystem 
                          ? 'text-[#cd00ae]' 
                          : msg.user === userData.email
                            ? 'text-purple-300'
                            : 'text-slate-200'
                      }`}>
                        {msg.user === userData.email ? 'You' : msg.user}:
                      </span>
                      <span className="text-xs text-slate-500">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-300">{msg.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <div className="text-2xl mb-2">💬</div>
                  <p>No messages yet.</p>
                  <p className="text-xs mt-1">Be the first to chat!</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-800/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isBroadcasting || isWatching 
                      ? "Send a message..." 
                      : "Join a stream to chat"
                  }
                  disabled={!isBroadcasting && !isWatching}
                  className="flex-1 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 focus:outline-none focus:ring-1 focus:ring-[#a70075] text-white placeholder-slate-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!message.trim() || (!isBroadcasting && !isWatching)}
                  className="p-2 bg-gradient-to-r from-[#cd00ae] to-[#820054] text-white rounded-lg hover:shadow-lg hover:shadow-[#a70075]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamManager;