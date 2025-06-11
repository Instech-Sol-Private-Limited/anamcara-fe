import { useChat } from '../../../context/ChatProvider';
import { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiPlus, FiSettings, FiLogOut, FiSearch } from 'react-icons/fi';
import { IoNotificationsOff, IoNotificationsOutline } from "react-icons/io5";
import { Conversation as ConversationType } from '../../../types';
import { signOut } from '../../../utils/auth';
import LogoutConfirmModal from '../../dialogs/LogoutConfirmModal';

const chatIcons = [
    { id: 1, color: "#A0FF06" },
    { id: 2, color: "#1E90FF" },
    { id: 3, color: "#FF4500" },
    { id: 4, color: "#9932CC" },
    { id: 5, color: "#FF8C00" },
    { id: 6, color: "#00CED1" },
    { id: 7, color: "#FF1493" },
    { id: 8, color: "#32CD32" },
    { id: 9, color: "#FFD700" },
    { id: 10, color: "#8A2BE2" },
];

interface ChatSidebarProps {
    onToggleNotifications: () => void;
    isNotificationOff: boolean;
    isOpen: boolean;
    onClose?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
    onToggleNotifications, 
    isNotificationOff, 
    isOpen, 
    onClose 
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { conversations, currentConversation, setCurrentConversation, createConversation } = useChat();
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [screenSize, setScreenSize] = useState('desktop');

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) setScreenSize('mobile');
            else if (width < 768) setScreenSize('tablet');
            else if (width < 1024) setScreenSize('laptop');
            else if (width < 1440) setScreenSize('desktop');
            else setScreenSize('widescreen');
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSelectConversation = (id: string) => {
        setCurrentConversation(conversations.find(conv => conv.id === id) as ConversationType);
        // Auto-close on mobile/tablet
        if (onClose && (screenSize === 'mobile' || screenSize === 'tablet')) onClose();
    };

    const handleCreateNewChat = () => {
        createConversation();
        // Auto-close on mobile/tablet
        if (onClose && (screenSize === 'mobile' || screenSize === 'tablet')) onClose();
    };

    const handleLogoutClick = () => {
        setIsLogoutDialogOpen(true);
    };

    const handleConfirmLogout = async () => {
        try {
            await signOut();
            setIsLogoutDialogOpen(false);
            window.location.href = '/auth/login';
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    // Check if should use overlay mode (mobile/tablet)
    const isOverlayMode = screenSize === 'mobile' || screenSize === 'tablet';

    // Responsive width calculations
    const getResponsiveWidth = () => {
        if (!isOpen) {
            // Collapsed state - responsive icon sizes
            if (screenSize === 'mobile') return 'w-14'; // 56px
            if (screenSize === 'tablet') return 'w-16'; // 64px
            return 'w-20'; // 80px
        }
        
        // Expanded state - responsive widths
        if (screenSize === 'mobile') return 'w-56'; // Further reduced from w-64 to w-56 (224px)
        if (screenSize === 'tablet') return 'w-52'; // Further reduced from w-60 to w-52 (208px)
        if (screenSize === 'laptop') return 'w-64'; // 256px
        if (screenSize === 'desktop') return 'w-72'; // 288px
        return 'w-80'; // 320px for widescreen
    };

    // Responsive icon arrangements
    const getIconsToShow = () => {
        if (isOpen) {
            if (screenSize === 'mobile') return { first: chatIcons.slice(0, 4), second: chatIcons.slice(4, 8) };
            if (screenSize === 'tablet') return { first: chatIcons.slice(0, 5), second: chatIcons.slice(5, 10) };
            return { first: chatIcons.slice(0, 5), second: chatIcons.slice(5, 10) };
        } else {
            if (screenSize === 'mobile') return { collapsed: chatIcons.slice(0, 2) };
            return { collapsed: chatIcons.slice(0, 3) };
        }
    };

    const iconsConfig = getIconsToShow();

    // Consistent button/icon sizes for all elements
    const getButtonSize = () => {
        if (screenSize === 'mobile') return isOpen ? 'w-8 h-8' : 'w-7 h-7';
        if (screenSize === 'tablet') return 'w-9 h-9';
        return 'w-10 h-10';
    };

    // Responsive padding
    const getContainerPadding = () => {
        if (screenSize === 'mobile') return 'py-2 px-2';
        if (screenSize === 'tablet') return 'py-3 px-3';
        return 'py-4 px-3';
    };

    const responsiveWidth = getResponsiveWidth();
    const buttonSize = getButtonSize();
    const containerPadding = getContainerPadding();

    // Get positioning classes based on overlay mode
    const getPositionClasses = () => {
        if (isOverlayMode) {
            return `fixed top-0 left-0 h-full z-50 bg-black border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`;
        }
        return 'h-full relative';
    };

    return (
        <>
            {/* Backdrop for overlay mode */}
            {isOverlayMode && isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`flex flex-col text-[#A0FF06] ${responsiveWidth} ${containerPadding} overflow-hidden ${getPositionClasses()}`}>

                {/* Header Section - Action Buttons */}
                <div className={`mb-2 sm:mb-3 md:mb-4 w-full ${
                    isOpen ? 'flex justify-end' : 'flex flex-col items-center gap-2 sm:gap-3 md:gap-4'
                }`}>
                    {isOpen ? (
                        <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
                            <div 
                                onClick={handleCreateNewChat} 
                                className={`${buttonSize} rounded-full border border-[#A0FF06] flex items-center justify-center cursor-pointer hover:bg-[#A0FF06] hover:text-black transition-colors`}
                            >
                                <FiPlus size={screenSize === 'mobile' ? 16 : 20} />
                            </div>
                            <div className={`${buttonSize} rounded-full border border-[#A0FF06] flex items-center justify-center cursor-pointer hover:bg-[#A0FF06] hover:text-black transition-colors`}>
                                <FiSearch size={screenSize === 'mobile' ? 16 : 20} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div 
                                onClick={handleCreateNewChat} 
                                className={`${buttonSize} rounded-full border border-[#A0FF06] flex items-center justify-center cursor-pointer hover:bg-[#A0FF06] hover:text-black transition-colors`}
                            >
                                <FiPlus size={screenSize === 'mobile' ? 14 : 20} />
                            </div>
                            <div className={`${buttonSize} rounded-full border border-[#A0FF06] flex items-center justify-center cursor-pointer hover:bg-[#A0FF06] hover:text-black transition-colors`}>
                                <FiSearch size={screenSize === 'mobile' ? 14 : 20} />
                            </div>
                        </>
                    )}
                </div>

                {/* Chat Icons Section */}
                {isOpen && (
                    <div className="mb-4 sm:mb-5 md:mb-6">
                        <div ref={scrollContainerRef} className={`flex ${screenSize === 'mobile' ? 'justify-center' : ''} overflow-x-auto pb-2 sm:pb-3 scrollbar-hide`}>
                            {iconsConfig.first?.map(icon => (
                                <div
                                    key={icon.id}
                                    className={`flex-shrink-0 ${buttonSize} rounded-full border-2 border-[#A0FF06] flex items-center justify-center mx-1 cursor-pointer bg-black`}
                                    style={{ 
                                        background: `radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 100%), linear-gradient(45deg, ${icon.color}, transparent)` 
                                    }}
                                >
                                    <span className={`${
                                        screenSize === 'mobile' ? 'text-xs' : 
                                        screenSize === 'tablet' ? 'text-sm' :
                                        'text-sm'
                                    } font-bold text-[#A0FF06]`}>
                                        {icon.id}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {(iconsConfig.second && iconsConfig.second.length > 0) && (
                            <div className={`flex ${screenSize === 'mobile' ? 'justify-center' : ''} overflow-x-auto pt-2 scrollbar-hide`}>
                                {iconsConfig.second.map(icon => (
                                    <div
                                        key={icon.id}
                                        className={`flex-shrink-0 ${buttonSize} rounded-full border-2 border-[#A0FF06] flex items-center justify-center mx-1 cursor-pointer bg-black`}
                                        style={{ 
                                            background: `radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 100%), linear-gradient(45deg, ${icon.color}, transparent)` 
                                        }}
                                    >
                                        <span className={`${
                                            screenSize === 'mobile' ? 'text-xs' : 
                                            screenSize === 'tablet' ? 'text-sm' :
                                            'text-sm'
                                        } font-bold text-[#A0FF06]`}>
                                            {icon.id}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Collapsed State Icons */}
                {!isOpen && (
                    <div className="flex flex-col items-center mb-3 sm:mb-4">
                        {iconsConfig.collapsed?.map(icon => (
                            <div
                                key={icon.id}
                                className={`flex-shrink-0 ${buttonSize} rounded-full border-2 border-[#A0FF06] flex items-center justify-center mx-1 mb-2 cursor-pointer bg-black`}
                                style={{ 
                                    background: `radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 100%), linear-gradient(45deg, ${icon.color}, transparent)` 
                                }}
                            >
                                <span className={`${
                                    screenSize === 'mobile' ? 'text-xs' : 
                                    screenSize === 'tablet' ? 'text-xs' :
                                    'text-sm'
                                } font-bold text-[#A0FF06]`}>
                                    {icon.id}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto scrollbar-hide w-full px-1 sm:px-2 mt-2 sm:mt-3 md:mt-4">
                    {conversations.length === 0 ? (
                        <div className={`${isOpen ? 'p-3 sm:p-4' : 'p-2'} text-center text-[#A0FF06]`}>
                            {isOpen && (
                                <>
                                    <p className={screenSize === 'mobile' ? 'text-sm' : 'text-base'}>No conversations yet</p>
                                    <p className={`${screenSize === 'mobile' ? 'text-xs' : 'text-sm'} mt-1`}>Start a new chat to begin</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            {isOpen && (
                                <div className={`${screenSize === 'mobile' ? 'text-xs' : 'text-sm'} font-medium pl-2 mb-2 text-[#A0FF06]`}>
                                    Today
                                </div>
                            )}
                            <ul className="w-full">
                                {conversations.map((conversation) => (
                                    <li key={conversation.id} className="mb-1">
                                        <button
                                            onClick={() => handleSelectConversation(conversation.id)}
                                            className={`${isOpen ? 'p-2' : 'p-1 sm:p-2'} w-full rounded-md transition-colors ${
                                                currentConversation?.id === conversation.id
                                                    ? 'bg-gray-700 text-[#A0FF06]'
                                                    : 'hover:bg-gray-800 text-gray-300'
                                            }`}
                                        >
                                            {!isOpen ? (
                                                <div className={`flex-shrink-0 ${buttonSize} rounded-full border border-[#A0FF06] flex items-center hover:bg-[#A0FF06] justify-center text-[#A0FF06] hover:text-black mx-auto`}>
                                                    <FiMessageSquare size={screenSize === 'mobile' ? 12 : 20} />
                                                </div>
                                            ) : (
                                                <div className="flex items-center w-full">
                                                    <div className={`flex-shrink-0 ${buttonSize} rounded-full border border-[#A0FF06] flex items-center justify-center mr-2 sm:mr-3`}>
                                                        <FiMessageSquare size={screenSize === 'mobile' ? 12 : 16} className="text-white" />
                                                    </div>
                                                    <div className={`flex-1 truncate text-left ${screenSize === 'mobile' ? 'text-sm' : 'text-base'}`}>
                                                        {conversation.title || `Chat ${conversation.id.substr(-4)}`}
                                                    </div>
                                                    <div className={`text-gray-500 ${screenSize === 'mobile' ? 'text-xs' : 'text-xs'}`}>
                                                        •••
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Bottom Action Buttons */}
                <div className={`flex ${isOpen ? 'flex-col' : 'flex-col'} items-center gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 w-full pt-2`}>
                    {isOpen ? (
                        <>
                            <button
                                onClick={onToggleNotifications}
                                className={`w-full ${screenSize === 'mobile' ? 'px-2 py-1.5 text-xs' : 'px-3 py-2 text-sm'} rounded-md border border-[#A0FF06] flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors`}
                            >
                                {isNotificationOff ? (
                                    <IoNotificationsOff size={screenSize === 'mobile' ? 14 : 18} />
                                ) : (
                                    <IoNotificationsOutline size={screenSize === 'mobile' ? 14 : 18} />
                                )}
                                <span className="text-[#A0FF06]">
                                    {screenSize === 'mobile' ? 'Notify' : 'Notifications'}
                                </span>
                            </button>

                            <button className={`w-full ${screenSize === 'mobile' ? 'px-2 py-1.5 text-xs' : 'px-3 py-2 text-sm'} rounded-md border border-[#A0FF06] flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors`}>
                                <FiSettings size={screenSize === 'mobile' ? 14 : 18} />
                                <span className="text-[#A0FF06]">
                                    Settings
                                </span>
                            </button>

                            <button
                                onClick={handleLogoutClick}
                                className={`w-full ${screenSize === 'mobile' ? 'px-2 py-1.5 text-xs' : 'px-3 py-2 text-sm'} rounded-md border border-[#A0FF06] flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors`}
                            >
                                <FiLogOut size={screenSize === 'mobile' ? 14 : 18} />
                                <span className="text-[#A0FF06]">
                                    Logout
                                </span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={onToggleNotifications}
                                className={`${buttonSize} rounded-full border border-[#A0FF06] flex items-center justify-center cursor-pointer hover:bg-[#A0FF06] hover:text-black transition-colors mb-1 sm:mb-2`}
                            >
                                {isNotificationOff ? (
                                    <IoNotificationsOff size={screenSize === 'mobile' ? 14 : 20} />
                                ) : (
                                    <IoNotificationsOutline size={screenSize === 'mobile' ? 14 : 20} />
                                )}
                            </button>

                            <button className={`${buttonSize} rounded-full border border-[#A0FF06] flex items-center justify-center cursor-pointer hover:bg-[#A0FF06] hover:text-black transition-colors mb-1 sm:mb-2`}>
                                <FiSettings size={screenSize === 'mobile' ? 14 : 20} />
                            </button>

                            <button
                                onClick={handleLogoutClick}
                                className={`${buttonSize} rounded-full border border-[#A0FF06] flex items-center justify-center cursor-pointer hover:bg-[#A0FF06] hover:text-black transition-colors`}
                            >
                                <FiLogOut size={screenSize === 'mobile' ? 14 : 20} />
                            </button>
                        </>
                    )}
                </div>

                <LogoutConfirmModal
                    isOpen={isLogoutDialogOpen}
                    onClose={() => setIsLogoutDialogOpen(false)}
                    onConfirm={handleConfirmLogout}
                />
            </div>
        </>
    );
};

export default ChatSidebar;
