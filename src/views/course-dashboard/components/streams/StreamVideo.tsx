import { BsArrowsFullscreen, BsGearFill } from 'react-icons/bs';
import { FaCommentDots, FaDesktop, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { useRef } from 'react';
import { useStreaming } from '../../../../context/StreamingProvider';
import { Eye } from 'lucide-react';
import { useAuth } from '../../../../context/AuthProvider';

interface StreamVideoProps {
    isCreator: boolean;
    currentStream: {
        email?: string;
    } | null;
    localVideoRef: React.RefObject<HTMLVideoElement | null>;
    remoteVideoRef: React.RefObject<HTMLVideoElement | null>;
    cameraBubbleRef: React.RefObject<HTMLVideoElement | null>;
    videoActive: boolean;
    isSharingScreen: boolean;
    shouldShowRemoteVideo: () => boolean;
    getAvatar: (email: string) => string;
    toggleFullscreen: (element: HTMLDivElement | null) => void;
    toggleChat: () => void;
    toggleVideo: () => void;
    toggleScreenShare: () => void;
    toggleMic: () => void;
    viewers: number;
}

export const StreamVideo = ({
    isCreator,
    currentStream,
    localVideoRef,
    remoteVideoRef,
    cameraBubbleRef,
    videoActive,
    isSharingScreen,
    shouldShowRemoteVideo,
    toggleScreenShare,
    getAvatar,
    toggleFullscreen,
    toggleChat,
    viewers
}: StreamVideoProps) => {
    const { userData } = useAuth();
    const streamContainerRef = useRef<HTMLDivElement>(null);
    const isBroadcasting = isCreator && currentStream !== null;
    const isWatching = currentStream && !isCreator;
    const {
        micActive,
        toggleMic,
        toggleVideo,

    } = useStreaming();
    const handleToggleFullscreen = () => {
        toggleFullscreen(streamContainerRef.current);
    };

    return (
        <div className="flex-1 flex flex-col gap-3">
            {/* Video header */}
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
                                onClick={toggleScreenShare}
                                className={`p-2 rounded-lg ${isSharingScreen ? 'bg-purple-600/20' : 'bg-slate-800/50 hover:bg-[#a70075]/20'} text-slate-300 hover:text-white border border-slate-700/50 transition-all`}
                                title={isSharingScreen ? 'Stop screen share' : 'Start screen share'}
                            >
                                <FaDesktop />
                            </button>
                        </>
                    )}
                    <button
                        onClick={toggleChat}
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

            {/* Video container */}
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
                                    className={`w-full h-full ${isSharingScreen ? 'object-contain' : 'object-cover'} bg-black ${videoActive || isSharingScreen ? '' : 'hidden'}`}
                                />
                                {/* Show avatar when video is disabled and not screen sharing */}
                                {!videoActive && !isSharingScreen && (
                                    <div className="flex items-center justify-center w-full h-full bg-slate-800">
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#cd00ae] to-[#820054] flex items-center justify-center text-4xl font-bold text-white">
                                            {userData?.email && getAvatar(userData?.email)}
                                        </div>
                                    </div>
                                )}

                                {/* Camera bubble during screen share */}
                                {isSharingScreen && videoActive && (
                                    <video
                                        ref={cameraBubbleRef}
                                        autoPlay
                                        muted
                                        playsInline
                                        className="absolute bottom-4 right-4 w-32 h-24 object-cover bg-black rounded-lg border-2 border-white/20"
                                    />
                                )}
                                {isSharingScreen && !videoActive && (
                                    <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
                                        <span className="text-white text-lg font-bold">
                                             {userData?.email && getAvatar(userData?.email)}
                                        </span>
                                    </div>
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
                            {viewers} {viewers === 1 ? 'viewer' : 'viewers'}
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
    );
};