import { useState } from 'react';
import { FaPaperPlane, FaPlus } from 'react-icons/fa';

const ChatInput: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (message.trim()) {
            console.log('Sending message:', message);
            // Yahan aap apna send message logic add kar sakte hain
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        
        <div className="w-full max-w-4xl mx-auto p-4 z-10">
            
            <div className="relative">
                <div className="flex items-center bg-gray-800 rounded-full border border-[#A0FF06] shadow-[0_0_10px_#A0FF06] overflow-hidden">
                    {/* Left Icon */}
                    <div className="flex-shrink-0 p-3">
                        <div className="w-8 h-8 bg-[#A0FF06] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#8FE000] transition-colors">
                            <FaPlus className="w-4 h-4 text-black" />
                        </div>
                    </div>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="flex-1 bg-transparent text-[#A0FF06] placeholder-gray-400 px-4 py-3 focus:outline-none text-sm sm:text-base"
                    />

                    {/* Send Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!message.trim()}
                        className="flex-shrink-0 p-3 text-[#A0FF06] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <FaPaperPlane className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Helper Text */}
                <div className="text-center mt-2">
                    <span className="text-xs text-gray-500">
                        Press Enter to send, Shift + Enter for new line
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
