
import { MdOutlineLeaderboard  } from 'react-icons/md';
import { useAuth } from '../../context/AuthProvider';

const LeadershipBoard = () => {
    const { userData } = useAuth();

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 inset-0 w-full h-full object-cover z-10 opacity-30"
                style={{ pointerEvents: 'none' }}
            >
                <source src="/bg/userdashbaord.mp4" type="video/mp4" />

            </video>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(window.innerWidth < 640 ? 10 : 20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 p-3 sm:p-4 md:p-6">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="relative">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br from-[#0766FF] to-[#00DCFF]"
                                        style={{
                                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                            animation: 'pulse 2s ease-in-out infinite',
                                            boxShadow: '0 0 15px rgba(0, 220, 255, 0.4)',
                                        }}
                                    />
                                    <div
                                        className="absolute inset-[3px] sm:inset-[4px] bg-slate-900 flex items-center justify-center overflow-hidden"
                                        style={{
                                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                        }}
                                    >
                                        <MdOutlineLeaderboard className="text-cyan-400 text-xl sm:text-2xl z-10" />
                                    </div>
                                </div>
                            </div>

                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-wider">
                                    USER PORTAL
                                </h1>
                                <div className="text-cyan-300 text-xs sm:text-sm font-mono mt-1 opacity-80">
                                    SYSTEM_STATUS: ONLINE | CODE: {userData?.referral_code || 'GENERATING...'}
                                </div>
                            </div>
                        </div>

                        <div className="w-full sm:w-auto">
                            <div className="bg-slate-900/90 border border-cyan-400/30 rounded-lg p-3 sm:p-4 backdrop-blur-lg">
                                <div className="text-cyan-400 font-mono text-xs space-y-1 text-center sm:text-left">
                                    <div className="truncate">USER: {userData?.first_name} {userData?.last_name}</div>
                                    <div>EMAIL: {userData?.email}</div>
                                    <div>ACCESS: GRANTED</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LeadershipBoard;