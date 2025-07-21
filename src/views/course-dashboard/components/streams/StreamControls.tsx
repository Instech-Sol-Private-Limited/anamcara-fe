import { FaVideo, FaDesktop, FaMicrophone, FaMicrophoneSlash, FaVideoSlash } from 'react-icons/fa';
import { BiBroadcast, BiStop } from 'react-icons/bi';

interface StreamControlsProps {
    isCreator: boolean;
    isBroadcasting: boolean;
    isWatching: boolean | null;
    micActive: boolean;
    videoActive: boolean;
    isSharingScreen: boolean;
    toggleMic: () => void;
    toggleVideo: () => void;
    toggleScreenShare: () => void;
    startStream: () => void;
    stopStream: () => void;
    leaveStream: () => void;
}

export const StreamControls = ({
    isBroadcasting,
    isWatching,
    micActive,
    videoActive,
    isSharingScreen,
    toggleMic,
    toggleVideo,
    toggleScreenShare,
    startStream,
    stopStream,
    leaveStream
}: StreamControlsProps) => {
    return (
        <div className="grid grid-cols-4 gap-3">
            {/* Microphone Control */}
            <button
                onClick={toggleMic}
                disabled={!isBroadcasting}
                className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${micActive
                        ? 'bg-slate-800/50 hover:bg-[#a70075]/20 text-white'
                        : 'bg-red-600/20 text-red-400'
                    } ${!isBroadcasting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    } border border-slate-700/50`}
                aria-label={micActive ? 'Mute microphone' : 'Unmute microphone'}
            >
                {micActive ? (
                    <FaMicrophone className="text-lg" />
                ) : (
                    <FaMicrophoneSlash className="text-lg" />
                )}
                <span className="text-xs">{micActive ? 'Mute' : 'Unmute'}</span>
            </button>

            {/* Video Control */}
            <button
                onClick={toggleVideo}
                disabled={!isBroadcasting}
                className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${videoActive
                        ? 'bg-slate-800/50 hover:bg-[#a70075]/20 text-white'
                        : 'bg-red-600/20 text-red-400'
                    } ${!isBroadcasting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    } border border-slate-700/50`}
                aria-label={videoActive ? 'Turn off camera' : 'Turn on camera'}
            >
                {videoActive ? (
                    <FaVideo className="text-lg" />
                ) : (
                    <FaVideoSlash className="text-lg" />
                )}
                <span className="text-xs">{videoActive ? 'Video' : 'No Video'}</span>
            </button>

            {/* Screen Share Control */}
            <button
                onClick={toggleScreenShare}
                disabled={!isBroadcasting}
                className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${isSharingScreen
                        ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30'
                        : 'bg-slate-800/50 hover:bg-[#a70075]/20 text-white'
                    } ${!isBroadcasting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    } border border-slate-700/50`}
                aria-label={isSharingScreen ? 'Stop screen sharing' : 'Start screen sharing'}
            >
                <FaDesktop className="text-lg" />
                <span className="text-xs">{isSharingScreen ? 'Stop Share' : 'Screen'}</span>
            </button>

            {/* Stream Control (Start/Stop/Leave) */}
            <button
                onClick={isWatching ? leaveStream : (isBroadcasting ? stopStream : startStream)}
                className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${isWatching
                        ? 'bg-orange-600/20 hover:bg-orange-600/30 text-orange-400'
                        : isBroadcasting
                            ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400'
                            : 'bg-gradient-to-r from-[#cd00ae] to-[#820054] text-white hover:shadow-lg hover:shadow-[#a70075]/30'
                    } border border-slate-700/50 hover:scale-105`}
                aria-label={
                    isWatching
                        ? 'Leave stream'
                        : isBroadcasting
                            ? 'Stop streaming'
                            : 'Start streaming'
                }
            >
                {isWatching ? (
                    <>
                        <span className="text-lg">←</span>
                        <span className="text-xs">Leave</span>
                    </>
                ) : isBroadcasting ? (
                    <>
                        <BiStop className="text-lg" />
                        <span className="text-xs">Stop</span>
                    </>
                ) : (
                    <>
                        <BiBroadcast className="text-lg" />
                        <span className="text-xs">Go Live</span>
                    </>
                )}
            </button>
        </div>
    );
};