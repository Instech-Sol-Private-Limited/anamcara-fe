import { useState } from 'react';
import { BiBroadcast } from 'react-icons/bi';
import { motion } from 'framer-motion';

interface StreamDetails {
    title: string;
    category: string;
    newCategory: string;
    // isPrivate: boolean;
}

const categories = [
    'Gaming',
    'Music',
    'Education',
    'Coding',
    'Art',
    'Just Chatting',
    'Podcast',
    'IRL',
    'Tech',
    'Sports',
    'Battleground',
    'Vibe Zone',
    'Soundwave',
    'Wilderness'
];

export const StreamSetupForm = ({ onStartStream }: { onStartStream: (details: StreamDetails) => void }) => {
    const [streamDetails, setStreamDetails] = useState<StreamDetails>({
        title: '',
        category: '',
        newCategory: '',
        // isPrivate: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setStreamDetails(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!streamDetails.title.trim()) return;

        const finalCategory = streamDetails.category === 'other'
            ? streamDetails.newCategory
            : streamDetails.category;

        if (!finalCategory.trim()) return;

        onStartStream({
            ...streamDetails,
            category: finalCategory
        });
    };

    const isValid = streamDetails.title.trim() &&
        (streamDetails.category !== 'other' || streamDetails.newCategory.trim());

    return (
        <div className="relative h-full w-full flex items-center justify-center md:p-6">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-[#cd00ae] to-[#820054] opacity-10"
                        style={{
                            width: Math.random() * 300 + 100,
                            height: Math.random() * 300 + 100,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, Math.random() * 200 - 100],
                            y: [0, Math.random() * 200 - 100],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />
                ))}
            </div>

            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-800/50 md:p-8 p-4 shadow-2xl shadow-[#a70075]/20"
            >
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#cd00ae] to-[#820054] mb-2">
                    Setup Your Stream
                </h2>
                <p className="text-slate-400 mb-6">Configure your stream before going live</p>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
                            Stream Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={streamDetails.title}
                            onChange={handleChange}
                            placeholder="What are you streaming today?"
                            className="w-full px-4 py-3 bg-slate-800/50 rounded-lg border border-slate-700/50 focus:outline-none focus:ring-1 focus:ring-[#a70075] text-white placeholder-slate-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1">
                            Category *
                        </label>
                        <select
                            id="category"
                            name="category"
                            className={`w-full p-3 rounded-lg md:text-base text-sm border appearance-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pre focus:border-transparent border-white/30 hover:border-pink/70 bg-slate-800 text-white`}
                            value={streamDetails.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="" className="text-black/50 dark:text-white/50 !bg-main/90">
                                Select a category
                            </option>
                            {categories.map(cat => (
                                <option
                                    key={cat}
                                    value={cat}
                                    className="text-black dark:text-white !bg-main/90 hover:bg-pre/10"
                                >
                                    {cat}
                                </option>
                            ))}
                            <option value="other" className="text-black/50 dark:text-white/50 !bg-main/90">Other (specify below)</option>

                        </select>

                        {streamDetails.category === 'other' && (
                            <div className="mt-3">
                                <input
                                    type="text"
                                    name="newCategory"
                                    value={streamDetails.newCategory}
                                    onChange={handleChange}
                                    placeholder="Enter new category name"
                                    className="w-full px-4 py-3 bg-slate-800/50 rounded-lg border border-slate-700/50 focus:outline-none focus:ring-1 focus:ring-[#a70075] text-white placeholder-slate-500"
                                    required
                                />
                            </div>
                        )}
                    </div>

                    {/* <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isPrivate"
                            name="isPrivate"
                            checked={streamDetails.isPrivate}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-[#a70075] focus:ring-[#a70075]"
                        />
                        <label htmlFor="isPrivate" className="ml-2 text-sm text-slate-300">
                            Private Stream (only people with link can join)
                        </label>
                    </div> */}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`w-full py-3 px-6 rounded-full font-bold flex items-center justify-center gap-2 ${isValid
                                ? 'bg-gradient-to-r from-[#cd00ae] to-[#820054] hover:shadow-lg hover:shadow-[#a70075]/50'
                                : 'bg-slate-800/50 cursor-not-allowed'
                                } text-white transition-all duration-200`}
                        >
                            <BiBroadcast className="h-5 w-5" />
                            Start Streaming
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
