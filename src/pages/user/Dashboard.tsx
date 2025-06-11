import { useEffect, useState, useRef } from 'react';
import { FaUsers, FaCoins, FaCopy, FaRocket, FaFire, FaShare, FaGift, FaTags, FaGamepad, FaTicketAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Added new icons
import { useAuth } from '../../context/AuthProvider';
import { LoadingOutlined } from '@ant-design/icons';
import referralService, { ReferralData } from '../../utils/Refferal';
import { getUserSoulpoints, getSoulpointsHistory, SoulpointsData, SoulpointsHistory } from '../../utils/soulpoints';
import anamCoinsService, { AnamCoinsData } from '../../utils/anamcoins';
interface ReferralStats {
    totalReferrals: number;
    activeReferrals: number;
    totalEarnings: number; // This will now represent soulpoints instead of anamcoins
    pendingRewards: number;
}

// Dummy product data
const dummyProducts = [
    {
        id: 1,
        name: 'Digital Art Pack',
        type: 'Digital Item',
        imageUrl: 'https://public-files.gumroad.com/q8nhb95lvfoawg4i0kf2u2ij91kh',
        icon: FaGamepad,
        themeColor: 'cyan'
    },
    {
        id: 2,
        name: '20% Off Coupon',
        type: 'Discount',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFM2dIymwL_wFnZBrXXrSy_IyrS3oEH8ikEQ&s',
        icon: FaTags,
        themeColor: 'amber'
    },
    {
        id: 3,
        name: 'Exclusive Beta Access',
        type: 'Limited Drop',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3z5ZsK-Z2VwMRa0Nz4gFSW7GA2MPteyMRfQ&s',
        icon: FaTicketAlt,
        themeColor: 'purple'
    },
    {
        id: 4,
        name: 'Cyber Skin Bundle',
        type: 'Digital Item',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjSJIWYwY3PTHH69ThokY73_NquBfX2y7gwA&s',
        icon: FaRocket,
        themeColor: 'green'
    },
    {
        id: 5,
        name: 'Soundtrack Vol. 1',
        type: 'Digital Item',
        imageUrl: 'https://via.placeholder.com/150/FF69B4/FFFFFF?text=Music',
        icon: FaCoins,
        themeColor: 'pink'
    },
    {
        id: 6,
        name: 'Early Access Pass',
        type: 'Limited Drop',
        imageUrl: 'https://via.placeholder.com/150/FF4500/FFFFFF?text=Early+Pass',
        icon: FaFire,
        themeColor: 'orange'
    },
    // NEW PRODUCTS
    {
        id: 7,
        name: 'Premium Avatar Frame',
        type: 'Cosmetic',
        imageUrl: 'https://via.placeholder.com/150/00FFFF/000000?text=Avatar+Frame',
        icon: FaGift,
        themeColor: 'cyan'
    },
    {
        id: 8,
        name: 'Course: Mastering AI Art',
        type: 'Online Course',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
        icon: FaGamepad,
        themeColor: 'purple'
    },
    {
        id: 9,
        name: 'Sticker Pack',
        type: 'Merch',
        imageUrl: 'https://via.placeholder.com/150/FFD700/000000?text=Stickers',
        icon: FaTags,
        themeColor: 'amber'
    },
    {
        id: 10,
        name: 'VIP Discord Role',
        type: 'Membership',
        imageUrl: 'https://via.placeholder.com/150/00FF00/000000?text=VIP+Role',
        icon: FaGift,
        themeColor: 'green'
    },
    {
        id: 11,
        name: 'Limited Edition Hoodie',
        type: 'Apparel',
        imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
        icon: FaRocket,
        themeColor: 'orange'
    }
];


const UserDashboard = () => {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(true);
    const [referralStats, setReferralStats] = useState<ReferralStats>({
        totalReferrals: 0,
        activeReferrals: 0,
        totalEarnings: 0,
        pendingRewards: 0
    });
    const [referralLink, setReferralLink] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const [recentReferrals, setRecentReferrals] = useState<ReferralData[]>([]);
    const [loadingError, setLoadingError] = useState<string | null>(null);
    const [soulpoints, setSoulpoints] = useState<SoulpointsData | null>(null);
    const [soulpointsHistory, setSoulpointsHistory] = useState<SoulpointsHistory[]>([]);
    const [autoScrollIndex, setAutoScrollIndex] = useState(0);
    const [anamCoinsData, setAnamCoinsData] = useState<AnamCoinsData | null>(null);
    const productsToShow = [...dummyProducts, ...dummyProducts]; // duplicate for infinite effect
    const productRowRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const row = productRowRef.current;
        if (!row) return;

        const card = row.firstChild as HTMLElement | null;
        if (!card) return;
        const cardWidth = card.offsetWidth + 24; // 24px for gap

        let scrollAmount = cardWidth * dummyProducts.length; // Start at the middle set
        row.scrollLeft = scrollAmount;

        let isUnmounted = false;

        const scroll = () => {
            if (!row) return;
            scrollAmount += cardWidth;
            row.scrollTo({ left: scrollAmount, behavior: 'smooth' });

            // If we've scrolled past the second set, reset instantly to the start of the middle set
            if (scrollAmount >= cardWidth * dummyProducts.length * 2) {
                setTimeout(() => {
                    if (isUnmounted) return;
                    row.scrollTo({ left: cardWidth * dummyProducts.length, behavior: 'auto' });
                    scrollAmount = cardWidth * dummyProducts.length;
                }, 400); // wait for smooth scroll to finish
            }
        };

        const interval = setInterval(scroll, 2000);

        return () => {
            isUnmounted = true;
            clearInterval(interval);
        };
    }, []);


    useEffect(() => {
        const loadDashboardData = async () => {
            if (!userData?.id) return;
            try {
                setLoading(true);
                setLoadingError(null);

                // Get referral stats from your service
                const stats = await referralService.getReferralStats(userData.id);

                // Get soulpoints data and history
                const [soulpointsResponse, historyResponse] = await Promise.all([
                    getUserSoulpoints(userData.id),
                    getSoulpointsHistory(userData.id, 10)
                ]);

                if (stats) {
                    // Generate referral link using the actual referral code
                    const link = referralService.generateReferralLink(stats.referralCode);
                    setReferralLink(link);

                    // Calculate earnings (use actual soulpoints)
                    setReferralStats({
                        totalReferrals: stats.totalReferrals,
                        activeReferrals: stats.totalReferrals,
                        totalEarnings: soulpointsResponse.data?.points || 0, // Use actual soulpoints
                        pendingRewards: 0 // Remove pending rewards or calculate from actual data
                    });
                }

                const anamCoinsResponse = await anamCoinsService.getUserAnamCoins(userData.id);
                if (anamCoinsResponse.success) {
                    setAnamCoinsData(anamCoinsResponse.data ?? null);
                }
                // Get recent referrals
                const referrals = await referralService.getUserReferrals(userData.id, 5);
                setRecentReferrals(referrals);

                if (soulpointsResponse.success && soulpointsResponse.data) {
                    setSoulpoints(soulpointsResponse.data);
                }

                if (historyResponse.success) {
                    setSoulpointsHistory(historyResponse.data);
                }

            } catch (error) {
                console.error('Error loading dashboard data:', error);
                setLoadingError('Failed to load dashboard data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [userData?.id]);

    const copyReferralLink = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (error) {
            console.error('Failed to copy referral link:', error);
        }
    };

    const scrollProducts = (direction: 'left' | 'right') => {
        const row = productRowRef.current;
        if (!row) return;
        const card = row.firstChild as HTMLElement | null;
        if (!card) return;
        // Responsive scroll amount: smaller on mobile
        const isMobile = window.innerWidth <= 400;
        const cardWidth = card.offsetWidth + (isMobile ? 12 : 24);
        row.scrollBy({ left: direction === 'left' ? -cardWidth * 2 : cardWidth * 2, behavior: 'smooth' });
    };
    // Cyber-themed stat card component
    const CyberStatCard = ({ icon: Icon, title, value, subtitle, accentColor, glowColor, bgClass }: any) => {
        const cutSize = 'clamp(12px, 3vw, 20px)';
        const clipPathValue = `polygon(0% 0%, calc(100% - ${cutSize}) 0%, 100% ${cutSize}, 100% 100%, ${cutSize} 100%, 0% calc(100% - ${cutSize}))`;

        return (
            <div className="relative group">
                <div
                    className={`absolute inset-0 ${bgClass} opacity-20 blur-md group-hover:opacity-40 transition-all duration-500`}
                    style={{ clipPath: clipPathValue }}
                ></div>

                <div
                    className="relative bg-slate-900/90 border-2 border-slate-600/50 hover:border-cyan-400/70 p-3 sm:p-4 md:p-6 backdrop-blur-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-500/20"
                    style={{ clipPath: clipPathValue }}
                >
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `
                            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                        `,
                            backgroundSize: '15px 15px sm:20px sm:20px'
                        }}></div>

                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex items-center space-x-1">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${glowColor} rounded-full animate-pulse`}></div>
                        <span className="text-cyan-400 text-xs sm:text-xs font-mono uppercase tracking-wider hidden sm:inline">ACTIVE</span>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center sm:justify-between mb-2 sm:mb-4 space-y-2 sm:space-y-0">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${bgClass} rounded-lg flex items-center justify-center border border-cyan-400/30`}>
                            <Icon className="text-white text-base sm:text-lg md:text-xl" />
                        </div>
                        <div className="text-center sm:text-right">
                            <div className={`text-2xl sm:text-3xl md:text-4xl font-bold font-mono ${accentColor} tracking-wider`}>
                                {typeof value === 'number' && value > 999 ? `${(value / 1000).toFixed(1)}K` : value}
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 text-center sm:text-left">
                        <h3 className="text-cyan-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1 font-mono">{title}</h3>
                        <p className="text-slate-400 text-xs font-mono">{subtitle}</p>
                    </div>

                    <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-cyan-400/50"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-cyan-400/50"></div>
                </div>
            </div>
        );
    };


    const CyberProductCard = ({ product }: { product: typeof dummyProducts[0] }) => {
        const Icon = product.icon;
        const borderColorClass = `border-${product.themeColor}-500/50`;
        const hoverBorderColorClass = `hover:border-${product.themeColor}-400/70`;
        const bgColorClass = `bg-gradient-to-br from-${product.themeColor}-500/10 to-${product.themeColor}-600/10`;
        const textColorClass = `text-${product.themeColor}-400`;

        return (
            <div className={`relative group w-48 sm:w-56 flex-shrink-0 bg-slate-900/80 border-2 ${borderColorClass} ${hoverBorderColorClass} rounded-lg backdrop-blur-md transition-all duration-300 group-hover:shadow-xl group-hover:shadow-${product.themeColor}-500/20 p-3`}>
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
                        linear-gradient(rgba(var(--${product.themeColor}-rgb, 6, 182, 212), 0.2) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(var(--${product.themeColor}-rgb, 6, 182, 212), 0.2) 1px, transparent 1px)
                    `,
                        backgroundSize: '15px 15px'
                    }}></div>
                <style >{`
                    :root {
                        --cyan-rgb: 6, 182, 212;
                        --amber-rgb: 245, 158, 11;
                        --purple-rgb: 168, 85, 247;
                        --green-rgb: 34, 197, 94;
                        --pink-rgb: 236, 72, 153;
                        --orange-rgb: 249, 115, 22;
                    }
                `}</style>

                <div className="relative z-10">
                    <div className="w-full h-24 sm:h-28 bg-slate-800/50 rounded-md mb-3 flex items-center justify-center overflow-hidden border border-slate-700">
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <Icon className={`text-4xl ${textColorClass} opacity-70`} />
                        )}
                    </div>
                    <h3 className={`text-sm font-bold font-mono truncate ${textColorClass}`}>{product.name}</h3>
                    <p className="text-slate-400 text-xs font-mono">{product.type}</p>
                    <button className={`mt-3 w-full py-1.5 text-xs font-mono rounded border ${borderColorClass} ${textColorClass} bg-${product.themeColor}-500/10 hover:bg-${product.themeColor}-500/20 transition-colors`}>
                        VIEW ITEM
                    </button>
                </div>
                <div className={`absolute top-1 right-1 w-1.5 h-1.5 bg-${product.themeColor}-400 rounded-full animate-pulse`}></div>
            </div>
        );
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden px-4">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px sm:50px sm:50px',
                        animation: 'grid-move 20s linear infinite'
                    }}></div>
                </div>

                <div className="flex flex-col items-center justify-center text-center relative z-10">
                    <div className="flex flex-col justify-center items-center h-[60vh]">
                        <div className="relative">
                            <LoadingOutlined
                                style={{ fontSize: window.innerWidth < 640 ? 36 : 48, color: '#00FFFF' }}
                                spin
                            />
                            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
                        </div>
                        <div className="space-y-2 mt-2">
                            <p className="text-cyan-400 font-mono text-lg sm:text-xl font-bold tracking-wider">LOADING REFERRAL DATA</p>
                            <div className="flex items-center justify-center space-x-1">
                                {[0, 0.2, 0.4].map((delay, i) => (
                                    <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: `${delay}s` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loadingError) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden px-4">
                <div className="text-center">
                    <div className="text-red-400 text-6xl mb-4">⚠️</div>
                    <h2 className="text-red-400 font-mono text-xl mb-2">SYSTEM ERROR</h2>
                    <p className="text-slate-400 font-mono text-sm mb-4">{loadingError}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded font-mono text-sm hover:bg-cyan-500/30 transition-all"
                    >
                        RETRY
                    </button>
                </div>
            </div>
        );
    }

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
                                        <FaRocket className="text-cyan-400 text-xl sm:text-2xl z-10" />
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

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <CyberStatCard
                        icon={FaUsers}
                        title="TOTAL REFERRALS"
                        value={referralStats.totalReferrals}
                        subtitle="Members recruited"
                        accentColor="text-cyan-400"
                        glowColor="bg-cyan-400"
                        bgClass="bg-gradient-to-br from-cyan-500/20 to-blue-600/20"
                    />
                    <CyberStatCard
                        icon={FaFire}
                        title="ACTIVE REFERRALS"
                        value={referralStats.activeReferrals}
                        subtitle="Currently active"
                        accentColor="text-green-400"
                        glowColor="bg-green-400"
                        bgClass="bg-gradient-to-br from-green-500/20 to-emerald-600/20"
                    />
                    <CyberStatCard
                        icon={FaCoins}
                        title="TOTAL ANAMCOINS"
                        value={anamCoinsData?.total_coins || 0}
                        subtitle="Lifetime AnamCoins"
                        accentColor="text-amber-400"
                        glowColor="bg-amber-400"
                        bgClass="bg-gradient-to-br from-amber-500/20 to-orange-600/20"
                    />
                    <CyberStatCard
                        icon={FaFire}
                        title="TOTAL SOULPOINTS"
                        value={soulpoints?.points || 0}
                        subtitle={`Level ${soulpoints?.level || 1}`}
                        accentColor="text-orange-400"
                        glowColor="bg-orange-400"
                        bgClass="bg-gradient-to-br from-orange-500/20 to-red-600/20"
                    />
                </div>

                {/* Referral Link Section */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-4 sm:mb-6">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                                <FaShare className="text-white text-xs sm:text-sm" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-wider">REFERRAL_LINK</h2>
                            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></div>
                        </div>
                    </div>

                    <div className="bg-slate-900/90 border-2 border-slate-600/50 rounded-lg backdrop-blur-lg p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="flex-1 w-full">
                                <label className="text-cyan-400 text-sm font-mono mb-2 block">YOUR REFERRAL URL:</label>
                                <div className="bg-slate-800/50 border border-slate-600/30 rounded p-3 font-mono text-sm text-white break-all">
                                    {referralLink || 'Generating referral link...'}
                                </div>
                            </div>
                            <button
                                onClick={copyReferralLink}
                                disabled={!referralLink}
                                className={`flex items-center space-x-2 px-4 py-2 rounded border font-mono text-sm transition-all duration-300 w-full sm:w-auto justify-center ${copySuccess
                                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                    : referralLink
                                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30'
                                        : 'bg-slate-500/20 text-slate-400 border-slate-500/30 cursor-not-allowed'
                                    }`}
                            >
                                <FaCopy className="text-xs" />
                                <span>{copySuccess ? 'COPIED!' : 'COPY'}</span>
                            </button>
                        </div>
                        <div className="mt-4 text-slate-400 text-xs font-mono">
                            💡 Share this link with friends to earn AnamCoins when they join!
                        </div>
                    </div>
                </div>

                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded flex items-center justify-center">
                                <FaGift className="text-white text-xs sm:text-sm" />
                            </div>
                            <h2 className="text-xl xs:text-lg sm:text-2xl font-bold text-white font-mono tracking-wider break-words max-w-full xs:max-w-xs" style={{ wordBreak: 'break-word' }}>
                                REDEEM_STORE_PREVIEW
                            </h2>
                            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent flex-shrink-0"></div>
                        </div>
                        {/* View More Button */}
                        <button
                            className="mt-3 sm:mt-0 sm:ml-auto w-full sm:w-auto px-4 py-1.5 rounded bg-purple-600/20 text-purple-300 font-mono text-xs sm:text-sm border border-purple-400/30 hover:bg-purple-600/40 transition-all"
                            onClick={() => {
                                window.location.href = '/redeem-store';
                            }}
                        >
                            VIEW MORE
                        </button>
                    </div>
                    <p className="text-slate-400 font-mono text-sm mb-4">
                        Browse digital items, discounts, limited drops & more. Spend your Soulpoints!
                    </p>
                    <div className="relative">
                        {/* Left Scroll Button */}
                        <button
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-purple-600/40 border border-purple-400/30 rounded-full p-2 text-purple-300 transition-all shadow-lg flex"
                            style={{ display: window.innerWidth <= 400 ? 'flex' : undefined }}
                            onClick={() => scrollProducts('left')}
                            aria-label="Scroll left"
                        >
                            <FaChevronLeft />
                        </button>
                        {/* Product Row */}
                        <div
                            ref={productRowRef}
                            className="flex space-x-3 xs:space-x-4 sm:space-x-6 pb-4 cyber-scrollbar overflow-x-auto"
                            style={{
                                scrollBehavior: 'smooth',
                                minWidth: 0,
                                paddingLeft: window.innerWidth <= 400 ? '32px' : undefined,
                                paddingRight: window.innerWidth <= 400 ? '32px' : undefined,
                            }}
                        >
                            {productsToShow.map((product, idx) => (
                                <CyberProductCard key={product.id + '-' + idx} product={product} />
                            ))}
                        </div>
                        {/* Right Scroll Button */}
                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-purple-600/40 border border-purple-400/30 rounded-full p-2 text-purple-300 transition-all shadow-lg flex"
                            style={{ display: window.innerWidth <= 400 ? 'flex' : undefined }}
                            onClick={() => scrollProducts('right')}
                            aria-label="Scroll right"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>



                {/* Recent Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Recent Referrals */}
                    <div className="relative">
                        <div className="bg-slate-900/90 border-2 border-slate-600/50 rounded-lg backdrop-blur-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-b border-slate-600/50 p-3 sm:p-4">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                                        <FaUsers className="text-white text-xs sm:text-sm" />
                                    </div>
                                    <span className="text-white font-mono font-bold tracking-wide text-sm sm:text-base">RECENT_REFERRALS</span>
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="p-3 sm:p-4 space-y-3 min-h-[250px] max-h-[250px] overflow-y-auto cyber-scrollbar">
                                {recentReferrals.length > 0 ? (
                                    recentReferrals.map((referral) => (
                                        <div key={referral.id} className="bg-slate-800/50 border border-slate-600/30 rounded p-3 hover:border-cyan-400/50 transition-all duration-300">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-white text-sm font-medium font-mono">
                                                        {referral.referred_user?.first_name} {referral.referred_user?.last_name}
                                                    </p>
                                                    <p className="text-slate-400 text-xs font-mono">
                                                        {referral.referred_user?.email}
                                                    </p>
                                                    <p className="text-slate-400 text-xs font-mono">
                                                        Joined: {new Date(referral.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="px-2 py-1 rounded text-xs font-mono font-bold border bg-green-500/20 text-green-400 border-green-500/30">
                                                    +30 SP
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-6 sm:py-8">
                                        <div className="text-slate-500 text-xl sm:text-2xl mb-2">👥</div>
                                        <p className="text-slate-500 font-mono text-sm">NO_REFERRALS_YET</p>
                                        <p className="text-slate-400 font-mono text-xs mt-1">Share your link to get started!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Referral Earnings History */}
                    {/* <div className="relative">
                        <div className="bg-slate-900/90 border-2 border-slate-600/50 rounded-lg backdrop-blur-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border-b border-slate-600/50 p-3 sm:p-4">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded flex items-center justify-center">
                                        <FaCoins className="text-white text-xs sm:text-sm" />
                                    </div>
                                    <span className="text-white font-mono font-bold tracking-wide text-sm sm:text-base">ANAMCOINS</span>
                                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="p-3 sm:p-4 space-y-3 min-h-[250px] max-h-[250px] overflow-y-auto cyber-scrollbar">
                                {recentReferrals.length > 0 ? (
                                    recentReferrals.slice(0, 5).map((referral) => (
                                        <div key={referral.id} className="bg-slate-800/50 border border-slate-600/30 rounded p-3 hover:border-amber-400/50 transition-all duration-300">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-white text-sm font-medium font-mono">Referral Bonus</p>
                                                    <p className="text-slate-400 text-xs font-mono">
                                                        From: {referral.referred_user?.first_name} {referral.referred_user?.last_name}
                                                    </p>
                                                    <p className="text-slate-400 text-xs font-mono">
                                                        {new Date(referral.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="px-2 py-1 rounded text-xs font-mono font-bold border bg-amber-500/20 text-amber-400 border-amber-500/30">
                                                    +10 SP
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-6 sm:py-8">
                                        <div className="text-slate-500 text-xl sm:text-2xl mb-2">💰</div>
                                        <p className="text-slate-500 font-mono text-sm">NO_EARNINGS_YET</p>
                                        <p className="text-slate-400 font-mono text-xs mt-1">Start referring to earn soulpoints!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div> */}

                    {/* NEW SOULPOINTS ACTIVITY LOG */}
                    <div className="relative">
                        <div className="bg-slate-900/90 border-2 border-slate-600/50 rounded-lg backdrop-blur-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 border-b border-slate-600/50 p-3 sm:p-4">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center">
                                        <FaFire className="text-white text-xs sm:text-sm" />
                                    </div>
                                    <span className="text-white font-mono font-bold tracking-wide text-sm sm:text-base">SOULPOINTS_LOG</span>
                                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="p-3 sm:p-4 space-y-3 min-h-[250px] max-h-[250px] overflow-y-auto cyber-scrollbar">
                                {soulpointsHistory.length > 0 ? (
                                    soulpointsHistory.map((item) => (
                                        <div key={item.id} className="bg-slate-800/50 border border-slate-600/30 rounded p-3 hover:border-orange-400/50 transition-all duration-300">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white text-sm font-medium font-mono truncate">
                                                        {item.description}
                                                    </p>
                                                    <p className="text-slate-400 text-xs font-mono">
                                                        {new Date(item.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="px-2 py-1 rounded text-xs font-mono font-bold border bg-orange-500/20 text-orange-400 border-orange-500/30 ml-2 flex-shrink-0">
                                                    +{item.points_earned} SP
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-6 sm:py-8">
                                        <div className="text-slate-500 text-xl sm:text-2xl mb-2">🔥</div>
                                        <p className="text-slate-500 font-mono text-sm">NO_ACTIVITY_YET</p>
                                        <p className="text-slate-400 font-mono text-xs mt-1">Start earning soulpoints!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;