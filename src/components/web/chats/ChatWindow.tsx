import { useEffect, useRef, useState } from 'react';
import { useChat } from '../../../context/ChatProvider';
import { FaRobot, FaUser } from 'react-icons/fa';

const TypingIndicator: React.FC = () => (
    <div className="flex space-x-1 p-2">
        {[0, 1, 2].map((i) => (
            <div
                key={i}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#A0FF06] rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
        ))}
    </div>
);

const ChatWindow: React.FC = () => {
    const { currentMessages, loading, currentConversation } = useChat();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [screenSize, setScreenSize] = useState('desktop');

    // Enhanced screen size detection
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 480) setScreenSize('mobile');
            else if (width < 768) setScreenSize('tablet');
            else if (width < 1024) setScreenSize('laptop');
            else if (width < 1440) setScreenSize('desktop');
            else setScreenSize('widescreen');
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatTime = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const amOrPm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12;
        const formattedHours = hours.toString().padStart(2, '0');
        return `${formattedHours}:${minutes} ${amOrPm}`;
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages]);

    // Responsive configurations
    const getResponsiveConfig = () => {
        switch (screenSize) {
            case 'mobile':
                return {
                    containerPadding: 'px-2 py-3',
                    maxWidth: 'max-w-full',
                    messageMaxWidth: 'max-w-[95%]',
                    avatarSize: 'w-6 h-6',
                    iconSize: 'w-2.5 h-2.5',
                    textSize: 'text-xs',
                    timeSize: 'text-[8px]',
                    messagePadding: 'p-2',
                    spacing: 'space-y-2',
                    avatarMargin: 'mr-2 ml-2',
                    cardPadding: 'p-4',
                    cardMaxWidth: 'max-w-xs',
                    robotSize: 'w-8 h-8'
                };
            case 'tablet':
                return {
                    containerPadding: 'px-3 py-4',
                    maxWidth: 'max-w-full',
                    messageMaxWidth: 'max-w-[90%]',
                    avatarSize: 'w-7 h-7',
                    iconSize: 'w-3 h-3',
                    textSize: 'text-sm',
                    timeSize: 'text-[9px]',
                    messagePadding: 'p-2.5',
                    spacing: 'space-y-3',
                    avatarMargin: 'mr-2.5 ml-2.5',
                    cardPadding: 'p-5',
                    cardMaxWidth: 'max-w-sm',
                    robotSize: 'w-10 h-10'
                };
            case 'laptop':
                return {
                    containerPadding: 'px-4 py-5',
                    maxWidth: 'max-w-4xl mx-auto',
                    messageMaxWidth: 'max-w-[85%]',
                    avatarSize: 'w-8 h-8',
                    iconSize: 'w-3.5 h-3.5',
                    textSize: 'text-base',
                    timeSize: 'text-[10px]',
                    messagePadding: 'p-3',
                    spacing: 'space-y-4',
                    avatarMargin: 'mr-3 ml-3',
                    cardPadding: 'p-6',
                    cardMaxWidth: 'max-w-md',
                    robotSize: 'w-12 h-12'
                };
            case 'desktop':
                return {
                    containerPadding: 'px-6 py-6',
                    maxWidth: 'max-w-5xl mx-auto',
                    messageMaxWidth: 'max-w-[80%]',
                    avatarSize: 'w-9 h-9',
                    iconSize: 'w-4 h-4',
                    textSize: 'text-lg',
                    timeSize: 'text-xs',
                    messagePadding: 'p-4',
                    spacing: 'space-y-5',
                    avatarMargin: 'mr-3 ml-3',
                    cardPadding: 'p-8',
                    cardMaxWidth: 'max-w-lg',
                    robotSize: 'w-14 h-14'
                };
            case 'widescreen':
                return {
                    containerPadding: 'px-8 py-8',
                    maxWidth: 'max-w-6xl mx-auto',
                    messageMaxWidth: 'max-w-[75%]',
                    avatarSize: 'w-10 h-10',
                    iconSize: 'w-4.5 h-4.5',
                    textSize: 'text-xl',
                    timeSize: 'text-sm',
                    messagePadding: 'p-5',
                    spacing: 'space-y-6',
                    avatarMargin: 'mr-4 ml-4',
                    cardPadding: 'p-10',
                    cardMaxWidth: 'max-w-xl',
                    robotSize: 'w-16 h-16'
                };
            default:
                return {
                    containerPadding: 'px-6 py-6',
                    maxWidth: 'max-w-5xl mx-auto',
                    messageMaxWidth: 'max-w-[80%]',
                    avatarSize: 'w-9 h-9',
                    iconSize: 'w-4 h-4',
                    textSize: 'text-lg',
                    timeSize: 'text-xs',
                    messagePadding: 'p-4',
                    spacing: 'space-y-5',
                    avatarMargin: 'mr-3 ml-3',
                    cardPadding: 'p-8',
                    cardMaxWidth: 'max-w-lg',
                    robotSize: 'w-14 h-14'
                };
        }
    };

    const config = getResponsiveConfig();

    // Background image styles based on screen size
    const getBackgroundStyles = () => {
        const baseImageUrl = `url('http://localhost:5173/chat_robot%201.png')`;
        
        switch (screenSize) {
            case 'mobile':
                return {
                    backgroundImage: baseImageUrl,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'scroll'
                };
            case 'tablet':
                return {
                    backgroundImage: baseImageUrl,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'scroll'
                };
            case 'laptop':
                return {
                    backgroundImage: baseImageUrl,
                    backgroundSize: 'contain', 
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                
                };
            case 'desktop':
                return {
                    backgroundImage: baseImageUrl,
                    backgroundSize: '60%', // Specific size for desktop
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    
                };
            case 'widescreen':
                return {
                    backgroundImage: baseImageUrl,
                    backgroundSize: '50%', // Even smaller for widescreen
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                   
                };
            default:
                return {
                    backgroundImage: baseImageUrl,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                };
        }
    };

    if (!currentConversation) {
        return (
            <div 
                className="flex-1 overflow-y-auto flex items-center justify-center z-10 scrollbar-hide relative"
                style={getBackgroundStyles()}
            >
                {/* Background overlay */}
                <div className="absolute inset-0  bg-opacity-50"></div>
                
                <div className={`relative z-20 ${config.containerPadding}`}>
                    <div className={`text-center w-full ${config.cardMaxWidth} mx-auto bg-black bg-opacity-80 backdrop-blur-sm ${config.cardPadding} rounded-lg border border-[#A0FF06] shadow-lg shadow-green-500/20`}>
                        <div className="mb-4 text-green-400">
                            <FaRobot className={`mx-auto ${config.robotSize}`} />
                        </div>
                        
                        <h3 className={`font-medium text-[#A0FF06] mb-3 ${config.textSize}`}>
                            Start a new conversation
                        </h3>
                        <p className={`text-gray-400 leading-relaxed ${config.timeSize === 'text-[8px]' ? 'text-xs' : config.textSize === 'text-xs' ? 'text-sm' : config.textSize}`}>
                            Select an existing conversation from the sidebar or create a new one to begin chatting with the AI assistant.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const validMessages = Array.isArray(currentMessages) ? currentMessages.filter(msg => msg && msg.role && msg.content) : [];

    return (
        <div 
            className="flex-1 overflow-y-auto z-20 relative scrollbar-hide"
            style={getBackgroundStyles()}
        >
            {/* Background overlay */}
            <div className="absolute inset-0  bg-opacity-40"></div>
            
            <div className={`relative z-30 ${config.containerPadding}`}>
                {!validMessages.length ? (
                    <div className="flex items-center justify-center h-full min-h-[50vh]">
                        <div className={`text-center w-full ${config.cardMaxWidth} mx-auto  bg-opacity-80 backdrop-blur-sm ${config.cardPadding} rounded-lg border border-[#A0FF06] shadow-lg shadow-green-500/20`}>
                            <div className="mb-4 text-[#A0FF06]">
                                <FaRobot className={`mx-auto ${config.robotSize}`} />
                            </div>
                            <h3 className={`font-medium text-[#A0FF06] mb-3 ${config.textSize}`}>
                                How can I assist you today?
                            </h3>
                            <p className={`text-gray-400 leading-relaxed ${config.timeSize === 'text-[8px]' ? 'text-xs' : config.textSize === 'text-xs' ? 'text-sm' : config.textSize}`}>
                                Ask me anything about the world atmosphere or any other topic. I'm here to help!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className={`w-full ${config.maxWidth}`}>
                        <div className={`${config.spacing} w-full`}>
                            {validMessages.map((message, index) => (
                                <div
                                    key={message.id || `msg-${index}`}
                                    className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex w-full ${config.messageMaxWidth} ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        
                                        {/* Avatar */}
                                        <div className={`flex-shrink-0 ${message.role === 'user' ? config.avatarMargin.split(' ')[1] : config.avatarMargin.split(' ')[0]}`}>
                                            <div className={`rounded-full flex items-center justify-center border border-[#A0FF06] shadow-[0_0_6px_#A0FF06] bg-black bg-opacity-80 backdrop-blur-sm ${config.avatarSize} ${message.role === 'user' ? 'text-[#A0FF06]' : 'text-[#A0FF06]'}`}>
                                                {message.role === 'user' ? 
                                                    <FaUser className={config.iconSize} /> : 
                                                    <FaRobot className={config.iconSize} />
                                                }
                                            </div>
                                        </div>
                                        
                                        {/* Message Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className={`rounded-lg border border-[#A0FF06]  bg-opacity-80 backdrop-blur-sm shadow-[inset_0_0_6px_#A0FF06,_0_0_8px_#A0FF06] ${config.messagePadding}`}>
                                                <div className={`text-[#A0FF06] whitespace-pre-wrap break-words leading-relaxed ${config.textSize}`}>
                                                    {message.content}
                                                </div>
                                                <div className={`text-right mt-2 text-white opacity-70 ${config.timeSize}`}>
                                                    {formatTime()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Loading Indicator */}
                            {loading && (
                                <div className="flex justify-start w-full">
                                    <div className={`flex w-full ${config.messageMaxWidth}`}>
                                        <div className={`flex-shrink-0 ${config.avatarMargin.split(' ')[0]}`}>
                                            <div className={`rounded-full bg-opacity-80 backdrop-blur-sm text-[#A0FF06] border border-[#A0FF06] flex items-center justify-center shadow-[0_0_5px_#A0FF06] ${config.avatarSize}`}>
                                                <FaRobot className={config.iconSize} />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-white bg-gray-900 bg-opacity-90 backdrop-blur-sm border border-[#A0FF06] shadow-[0_0_8px_#A0FF06] rounded-lg font-mono whitespace-pre-wrap ${config.messagePadding} ${config.textSize}`}>
                                                <TypingIndicator />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
