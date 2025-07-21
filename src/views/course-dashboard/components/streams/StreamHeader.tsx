import { BiBroadcast, BiStop } from 'react-icons/bi';
import { Eye, MessageCircle } from 'lucide-react';
import { useAuth } from '../../../../context/AuthProvider';

interface StreamHeaderProps {
    isCreator: boolean;
    currentStream: {
        email?: string;
    } | null;
    onGoLiveClick: () => void;
    onStopStream: () => void;
    onLeaveStream: () => void;
    viewers: number;
    chatMessages: any[];
    streamStatus: {
        status: string;
        color: string;
    };
}

export const StreamHeader = ({
    isCreator,
    currentStream,
    onGoLiveClick,
    onStopStream,
    onLeaveStream,
    viewers,
    chatMessages,
    streamStatus
}: StreamHeaderProps) => {
    const { userData } = useAuth();
    const isBroadcasting = isCreator && currentStream !== null;
    const isWatching = currentStream && !isCreator;

    return (
        <div className="flex flex-wrap gap-4 justify-between items-center p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-slate-800/50 shadow-lg shadow-[#a70075]/10">
            {/* Status indicators */}
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
                        {chatMessages?.length || 0}
                    </div>
                    <div className="text-xs text-pink-300 uppercase tracking-wider">Messages</div>
                </div>

                {(isBroadcasting || isWatching) && (
                    <div className="text-center">
                        <div className="text-sm font-medium text-purple-300">
                            {isBroadcasting
                                ? (currentStream?.email || "Your Stream")
                                : `Watching ${currentStream?.email}`
                            }
                        </div>
                        <div className="text-xs text-pink-300 uppercase tracking-wider">
                            {isBroadcasting ? 'Streamer' : 'Watching'}
                        </div>
                    </div>
                )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">
                    {userData.email}
                </span>

                {isWatching ? (
                    <button
                        onClick={onLeaveStream}
                        className="px-6 py-2 rounded-full font-medium flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200"
                    >
                        Leave Stream
                    </button>
                ) : !isBroadcasting ? (
                    <button
                        onClick={onGoLiveClick}
                        className="px-6 py-2 rounded-full font-medium flex items-center gap-2 bg-gradient-to-r from-[#cd00ae] to-[#820054] text-white hover:shadow-lg hover:shadow-[#a70075]/30 transition-all duration-200"
                    >
                        <BiBroadcast className="h-5 w-5" /> Go Live
                    </button>
                ) : (
                    <button
                        onClick={onStopStream}
                        className="px-6 py-2 rounded-full font-medium flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-200"
                    >
                        <BiStop className="h-5 w-5" /> End Stream
                    </button>
                )}
            </div>
        </div>
    );
};