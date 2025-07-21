import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Eye, MoreHorizontal, Send } from 'lucide-react';

interface ChatMessage {
    id: string;
    user: string;
    text: string;
    timestamp: Date;
    isSystem?: boolean;
}

interface StreamChatProps {
    chatMessages: ChatMessage[];
    sendChatMessage: (message: string) => void;
    isBroadcasting: boolean;
    isWatching: boolean | null;
    viewers: number;
    onCloseChat: () => void;
    currentUserEmail: string | null;
}

export const StreamChat = ({
    chatMessages,
    sendChatMessage,
    isBroadcasting,
    isWatching,
    viewers,
    onCloseChat,
    currentUserEmail
}: StreamChatProps) => {
    const [message, setMessage] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
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

    const getAvatar = (email: string) => {
        return email ? email.charAt(0).toUpperCase() : "U";
    };

    return (
        <div className="flex flex-col flex-grow bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-slate-800/50 shadow-lg !h-[650px] shadow-[#a70075]/10 overflow-hidden">
            {/* Chat header */}
            <div className="p-4 border-b border-slate-800/50">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd00ae] to-[#820054] flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Stream Chat ({chatMessages.length})
                    </h3>
                    <div className="flex items-center gap-2">
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {viewers}
                        </div>
                        <button
                            onClick={onCloseChat}
                            className="p-1 rounded-lg hover:bg-[#a70075]/20 text-slate-300 hover:text-white"
                            aria-label="Close chat"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages container */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700 scrollbar-thumb-rounded-full"
            >
                {chatMessages.length > 0 ? (
                    chatMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`p-3 rounded-lg transition-all hover:scale-[1.02] ${msg.isSystem
                                ? 'bg-[#a70075]/10 border border-[#a70075]/20'
                                : msg.user === currentUserEmail
                                    ? 'bg-purple-600/20 border border-purple-500/30 ml-4'
                                    : 'bg-slate-800/30 border border-slate-700/50'
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    {!msg.isSystem && (
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#cd00ae] to-[#820054] flex items-center justify-center text-xs font-bold text-white">
                                            {getAvatar(msg.user)}
                                        </div>
                                    )}
                                    <span className={`font-medium text-sm ${msg.isSystem
                                        ? 'text-[#cd00ae]'
                                        : msg.user === currentUserEmail
                                            ? 'text-purple-300'
                                            : 'text-slate-200'
                                        }`}>
                                        {msg.isSystem ? 'System' : msg.user === currentUserEmail ? 'You' : msg.user.split('@')[0]}
                                    </span>
                                </div>
                                <span className="text-xs text-slate-500">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-slate-300">{msg.text}</p>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-8 text-slate-400">
                        <div className="text-2xl mb-2">💬</div>
                        <p>No messages yet</p>
                        <p className="text-xs mt-1">Be the first to chat!</p>
                    </div>
                )}
            </div>

            {/* Message input */}
            <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-slate-800/50"
            >
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
                        aria-label="Chat message input"
                    />
                    <button
                        type="submit"
                        disabled={!message.trim() || (!isBroadcasting && !isWatching)}
                        className="p-2 bg-gradient-to-r from-[#cd00ae] to-[#820054] text-white rounded-lg hover:shadow-lg hover:shadow-[#a70075]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        aria-label="Send message"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </form>
        </div>
    );
};