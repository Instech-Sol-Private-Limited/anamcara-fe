import { ChartPie, TrendingUp, Trophy, MessageCircle, Coins, Filter, Globe } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import supabase from '../../config/supabase';
import { tabs, filterOptions } from '../../constants';
import { useAuth } from '../../context/AuthProvider';

interface UserEngagementData {
    user_id: string;
    name: string;
    first_name?: string;
    last_name?: string;
    points: number;
    level: number;
    soul_title: string;
    anamCoins: number;
    weeklySoulpoints: number;
    weeklyAnamcoins: number;
    rank?: number;
    location?: string;
    city?: string;
    country?: string;
    is_asian?: boolean;
    posts: number;
    replies: number;
    reactions: number;
    engagement: number;
    growth: string;
    progress: number;
    title?: string; // Added for soul-title-ladder
}

interface ThreadEngagementMetrics {
    thread_count: number;
    comment_count: number;
    subcomment_count: number;
    reaction_count: number;
    total_engagement: number;
}

interface TopEngagerData extends UserEngagementData, ThreadEngagementMetrics { }

interface LeaderboardData {
    'soul-of-fame': UserEngagementData[];
    'weekly-earners': UserEngagementData[];
    'wealthiest-souls': UserEngagementData[];
    'soul-title-ladder': UserEngagementData[];
    'top-engagers': TopEngagerData[];
}

const LeadershipBoard = () => {
    const { userId } = useAuth();
    const [activeTab, setActiveTab] = useState<keyof LeaderboardData>('soul-of-fame');
    const [selectedFilter, setSelectedFilter] = useState('worldwide');
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [bgStyle, setBgStyle] = useState({ width: '0px', transform: 'translateX(0px)' });
    const [userStats, setUserStats] = useState<UserEngagementData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [availableCountries, setAvailableCountries] = useState<string[]>([]);
    const [availableCities, setAvailableCities] = useState<string[]>([]);

    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
        'soul-of-fame': [],
        'weekly-earners': [],
        'wealthiest-souls': [],
        'soul-title-ladder': [],
        'top-engagers': []
    });

    const getRankColor = (rank: number) => {
        if (rank === 1) return 'text-yellow-400';
        if (rank === 2) return 'text-gray-300';
        if (rank === 3) return 'text-amber-600';
        return 'text-blue-400';
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return '👑';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return '🏅';
    };

    const getFilteredData = (tabData: UserEngagementData[]) => {
        if (!tabData) return [];

        let filteredData = [...tabData];

        if (activeTab === 'weekly-earners' && selectedFilter !== 'all') {
            if (selectedFilter === 'anamcoins') {
                filteredData.sort((a, b) => b.weeklyAnamcoins - a.weeklyAnamcoins);
            } else if (selectedFilter === 'soulpoints') {
                filteredData.sort((a, b) => b.weeklySoulpoints - a.weeklySoulpoints);
            }
        } else if (activeTab === 'soul-of-fame') {
            if (selectedFilter === 'country' && selectedCountry) {
                filteredData = filteredData.filter(user => user.country === selectedCountry);
            } else if (selectedFilter === 'city' && selectedCity) {
                filteredData = filteredData.filter(user => user.city === selectedCity);
            } else if (selectedFilter === 'asia') {
                filteredData = filteredData.filter(user => user.is_asian);
            }
        }

        return filteredData.slice(0, 10).map((user, index) => ({
            ...user,
            rank: index + 1,
        }));
    };

    // const getFilteredData = (tabData: UserEngagementData[]) => {
    //     if (!tabData) return [];

    //     let filteredData = [...tabData];

    //     if (activeTab === 'weekly-earners' && selectedFilter !== 'all') {
    //         if (selectedFilter === 'anamcoins') {
    //             filteredData.sort((a, b) => b.weeklyAnamcoins - a.weeklyAnamcoins);
    //         } else if (selectedFilter === 'soulpoints') {
    //             filteredData.sort((a, b) => b.weeklySoulpoints - a.weeklySoulpoints);
    //         }
    //     }

    //     return filteredData.slice(0, 10).map((user, index) => ({
    //         ...user,
    //         rank: index + 1,
    //     }));
    // };

    const getFilterOptions = (): string[] => {
        if (activeTab === 'weekly-earners') {
            return ['all', 'anamcoins', 'soulpoints'];
        }
        return (filterOptions as any)[activeTab] || ['worldwide'];
    };

    const fetchLeaderboardData = async () => {
        try {
            setLoading(true);
            const now = new Date();
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));

            // Fetch all data in parallel
            const [
                { data: soulpointsData },
                { data: soulpointsHistory },
                { data: anamcoinsData },
                { data: anamcoinsHistory },
                { data: profilesData },
                { data: threadsData },
                { data: commentsData },
                { data: subcommentsData },
                { data: reactionsData }
            ] = await Promise.all([
                supabase.from('soulpoints').select('*'),
                supabase.from('soulpoints_history')
                    .select('*')
                    .gte('created_at', startOfWeek.toISOString())
                    .lte('created_at', endOfWeek.toISOString()),
                supabase.from('anamcoins').select('*'),
                supabase.from('anamcoins_history')
                    .select('*')
                    .gte('created_at', startOfWeek.toISOString())
                    .lte('created_at', endOfWeek.toISOString()),
                supabase.from('profiles').select('*'),
                supabase.from('threads').select('*'),
                supabase.from('threadcomments').select('*'),
                supabase.from('threadsubcomments').select('*'),
                supabase.from('thread_reactions').select('*')
            ]);

            // Get all unique user IDs
            const userIds = new Set([
                ...(soulpointsData?.map((user: any) => user.user_id) || []),
                ...(anamcoinsData?.map((user: any) => user.user_id) || []),
                ...(profilesData?.map((user: any) => user.id) || []),
                ...(threadsData?.map((thread: any) => thread.author_id) || []),
                ...(commentsData?.map((comment: any) => comment.user_id) || []),
                ...(subcommentsData?.map((sub: any) => sub.user_id) || []),
                ...(reactionsData?.map((reaction: any) => reaction.user_id) || [])
            ]);

            // Process engagement metrics
            const processEngagement = (userId: string): ThreadEngagementMetrics => {
                const threadCount = threadsData?.filter((t: any) => t.author_id === userId).length || 0;
                const commentCount = commentsData?.filter((c: any) => c.user_id === userId).length || 0;
                const subcommentCount = subcommentsData?.filter((s: any) => s.user_id === userId).length || 0;
                const reactionCount = reactionsData?.filter((r: any) => r.user_id === userId).length || 0;

                return {
                    thread_count: threadCount,
                    comment_count: commentCount,
                    subcomment_count: subcommentCount,
                    reaction_count: reactionCount,
                    total_engagement: (threadCount * 5) + (commentCount * 3) + (subcommentCount * 2) + reactionCount
                };
            };

            // Process user data
            const processedData: UserEngagementData[] = Array.from(userIds).map((userId: string) => {
                const userSoulpoints = soulpointsData?.find((sp: any) => sp.user_id === userId);
                const userAnamcoins = anamcoinsData?.find((ac: any) => ac.user_id === userId);
                const userProfile = profilesData?.find((p: any) => p.id === userId);
                const engagement = processEngagement(userId);

                // Calculate weekly points
                const weeklySoulpoints = soulpointsHistory
                    ?.filter((entry: any) => entry.user_id === userId)
                    ?.reduce((sum: number, entry: any) => sum + (entry.points_earned || 0), 0) || 0;

                const weeklyAnamcoins = anamcoinsHistory
                    ?.filter((entry: any) => entry.user_id === userId)
                    ?.reduce((sum: number, entry: any) => sum + (entry.coins_earned || 0), 0) || 0;

                // Format name and location
                const name = userProfile ?
                    `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() ||
                    `User ${userId.substring(0, 6)}` :
                    `User ${userId.substring(0, 6)}`;

                const locationParts = [];
                if (userProfile?.city) locationParts.push(userProfile.city);
                if (userProfile?.country) locationParts.push(userProfile.country);
                const location = locationParts.join(', ') || 'Global';

                return {
                    user_id: userId,
                    name,
                    first_name: userProfile?.first_name || '',
                    last_name: userProfile?.last_name || '',
                    points: userSoulpoints?.points || 0,
                    level: userSoulpoints?.level || 0,
                    soul_title: userSoulpoints?.soul_title || 'Beginner',
                    anamCoins: userAnamcoins?.total_coins || 0,
                    weeklySoulpoints,
                    weeklyAnamcoins,
                    location,
                    city: userProfile?.city || '',
                    country: userProfile?.country || '',
                    is_asian: userProfile?.is_asian || false,
                    posts: engagement.thread_count,
                    replies: engagement.comment_count + engagement.subcomment_count,
                    reactions: engagement.reaction_count,
                    engagement: engagement.total_engagement,
                    growth: `${Math.floor(Math.random() * 100)}%`,
                    progress: ((userSoulpoints?.points || 0) % 1000) / 10,
                };
            });
            const countries = Array.from(new Set(processedData.map(user => user.country).filter(Boolean) as string[]));
            const cities = Array.from(new Set(processedData.map(user => user.city).filter(Boolean) as string[]));

            setAvailableCountries(countries);
            setAvailableCities(cities);
            const userData = processedData.find(item => item.user_id === userId);

            if (userData)
                setUserStats(userData)

            // Create the leaderboard data structure
            const data: LeaderboardData = {
                'soul-of-fame': processedData
                    .sort((a, b) => b.points - a.points)
                    .map((user, index) => ({
                        ...user,
                        rank: index + 1,
                    })),
                'weekly-earners': processedData
                    .sort((a, b) => (b.weeklySoulpoints + b.weeklyAnamcoins) - (a.weeklySoulpoints + a.weeklyAnamcoins))
                    .map((user, index) => ({
                        ...user,
                        rank: index + 1,
                    })),
                'wealthiest-souls': processedData
                    .sort((a, b) => b.anamCoins - a.anamCoins)
                    .map((user, index) => ({
                        ...user,
                        rank: index + 1,
                    })),
                'soul-title-ladder': processedData
                    .sort((a, b) => b.level - a.level)
                    .map((user, index) => ({
                        ...user,
                        rank: index + 1,
                        title: user.soul_title,
                    })),
                'top-engagers': processedData
                    .sort((a, b) => b.engagement - a.engagement)
                    .map((user, index) => {
                        const engagement = processEngagement(user.user_id);
                        return {
                            ...user,
                            ...engagement,
                            rank: index + 1,
                        } as TopEngagerData;
                    })
            };

            setLeaderboardData(data);
        } catch (err) {
            console.error('Error fetching leaderboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        const activeEl = tabRefs.current[activeTab];
        if (activeEl) {
            const { offsetWidth, offsetLeft } = activeEl;
            setBgStyle({
                width: `${offsetWidth}px`,
                transform: `translateX(${offsetLeft}px)`,
            });
        }
    }, [activeTab, leaderboardData]);

    useEffect(() => {
        fetchLeaderboardData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 p-6 flex items-center justify-center">
                <div className="text-white">Loading leaderboard data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-3 sm:p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#0766FF] to-[#00DCFF] rounded-full flex items-center justify-center shadow-2xl shadow-[#00DCFF]/30">
                        <ChartPie className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                        <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0766FF] to-[#00DCFF] font-mowaq">
                        Leadership Board
                    </h1>
                    <p className="text-slate-400 mt-1">Track top performers across the community</p>
                </div>
            </div>

            {/* Stats Cards */}
            <p className='text-white lg:text-lg font-semibold text-base mb-3'>My Stats</p>

            <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total Soulpoints</p>
                            <p className="text-2xl font-bold text-white">{userStats?.points.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Last Week Earned SP</p>
                            <p className="text-2xl font-bold text-white">{userStats?.weeklySoulpoints}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
                            <Coins className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total Anamcoins</p>
                            <p className="text-2xl font-bold text-white">{userStats?.anamCoins}</p>
                        </div>
                    </div>
                </div>

                {/* <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Top Engagers</p>
                            <p className="text-2xl font-bold text-white">{stats.topEngagers.toLocaleString()}</p>
                        </div>
                    </div>
                </div> */}
            </div>

            {/* Tabs */}
            <div className="bg-slate-900 rounded-xl border border-slate-700/50 shadow-xl">
                {/* Tab Headers */}
                <div className="group flex items-center gap-1 mb-6 lg:w-[calc(100%-60px)] md:w-[calc(100%-40px)] w-[calc(100%-30px)] overflow-x-auto mx-auto mt-3 bg-white/10 shadow-[0px_0px_16px] shadow-black/10 skew-x-[-27deg] p-1 rounded-xl relative scrollbar-hide group-hover:scrollbar-default">
                    {/* Sliding Background */}
                    <div
                        className={`absolute top-1 bottom-1 bg-gradient-to-r ${tabs.find((t) => t.id === activeTab)?.color
                            } rounded-lg border transition-all duration-300`}
                        style={{
                            ...bgStyle,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            position: 'absolute',
                            top: '0.25rem',
                            bottom: '0.25rem',
                        }}
                    />

                    {tabs.map((tab: any) => (
                        <button
                            key={tab.id}
                            // @ts-ignore
                            ref={(el) => (tabRefs.current[tab.id] = el)}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSelectedFilter(tab.id === 'weekly-earners' ? 'all' : 'worldwide');
                            }}
                            className={`relative flex items-center cursor-pointer justify-center gap-2 md:px-6 px-3 md:py-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap skew-x-[27deg] ${activeTab === tab.id
                                ? 'text-white font-semibold'
                                : 'text-black/80 dark:text-white/80 hover:text-white'} w-auto lg:flex-1`}
                        >
                            <div className={`transform transition-all duration-300 ${activeTab === tab.id ? 'scale-110' : 'scale-100'}`}>
                                <span className="text-lg">{tab.icon}</span>
                            </div>
                            <span className="lg:text-sm md:text-xs text-[10px] font-medium text-nowrap">
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Update the filter UI section */}
                {Object.keys(filterOptions || {}).includes(activeTab) && (
                    <div className="p-4 border-b border-slate-700/50">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-slate-400" />
                                    <select
                                        value={selectedFilter}
                                        onChange={(e) => {
                                            setSelectedFilter(e.target.value);
                                            setSelectedCountry(null);
                                            setSelectedCity(null);
                                        }}
                                        className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {getFilterOptions().map((option: string) => (
                                            <option key={option} value={option}>
                                                {option.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Country dropdown */}
                                {activeTab === 'soul-of-fame' && selectedFilter === 'country' && (
                                    <select
                                        value={selectedCountry || ''}
                                        onChange={(e) => setSelectedCountry(e.target.value || null)}
                                        className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Country</option>
                                        {availableCountries.map(country => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                )}

                                {/* City dropdown */}
                                {activeTab === 'soul-of-fame' && selectedFilter === 'city' && (
                                    <select
                                        value={selectedCity || ''}
                                        onChange={(e) => setSelectedCity(e.target.value || null)}
                                        className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select City</option>
                                        {availableCities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content */}
                <div className="p-4">
                    {activeTab === 'soul-of-fame' && (
                        <div className="space-y-3">
                            {getFilteredData(leaderboardData['soul-of-fame'])?.map((user, index) => (
                                <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600 transition-all duration-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{getRankIcon(user.rank || 0)}</span>
                                                <span className={`text-2xl font-bold ${getRankColor(user.rank || 0)}`}>#{user.rank}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">{user.name}</h3>
                                                <p className="text-slate-400 text-sm flex items-center gap-1">
                                                    <Globe className="w-3 h-3" />
                                                    {user.location} • {user.is_asian ? 'Asia' : 'Global'} • Level {user.level}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                                {user.points.toLocaleString()} <span className="text-slate-400 text-sm">SP</span>
                                            </p>
                                            <p className="text-slate-400 text-sm">{user.soul_title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'weekly-earners' && (
                        <div className="space-y-3">
                            {getFilteredData(leaderboardData['weekly-earners'])?.map((user, index) => (
                                <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600 transition-all duration-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{getRankIcon(user.rank || 0)}</span>
                                                <span className={`text-2xl font-bold ${getRankColor(user.rank || 0)}`}>#{user.rank}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">{user.name}</h3>
                                                <p className="text-green-400 text-sm font-medium">{user.growth}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {selectedFilter === 'all' && (
                                                <>
                                                    <p className="text-lg font-bold text-blue-400">{user.weeklySoulpoints.toLocaleString()} SP</p>
                                                    <p className="text-lg font-bold text-yellow-400">{user.weeklyAnamcoins.toLocaleString()} AC</p>
                                                </>
                                            )}
                                            {selectedFilter === 'soulpoints' && (
                                                <p className="text-2xl font-bold text-blue-400">{user.weeklySoulpoints.toLocaleString()} SP</p>
                                            )}
                                            {selectedFilter === 'anamcoins' && (
                                                <p className="text-2xl font-bold text-yellow-400">{user.weeklyAnamcoins.toLocaleString()} AC</p>
                                            )}
                                        </div>
                                    </div>
                                    {selectedFilter !== 'all' && (
                                        <div className="mt-2 text-right">
                                            <span className="text-xs text-slate-500">
                                                Showing: {selectedFilter === 'anamcoins' ? 'AnamCoins Only' : 'SoulPoints Only'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'wealthiest-souls' && (
                        <div className="space-y-3">
                            {leaderboardData['wealthiest-souls']?.slice(0, 10).map((user, index) => (
                                <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600 transition-all duration-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{getRankIcon(user.rank || 0)}</span>
                                                <span className={`text-2xl font-bold ${getRankColor(user.rank || 0)}`}>#{user.rank}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">{user.name}</h3>
                                                <p className="text-green-400 text-sm font-medium">{user.growth}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">
                                                {user.anamCoins.toLocaleString()}
                                            </p>
                                            <p className="text-slate-400 text-sm">AnamCoins</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'soul-title-ladder' && (
                        <div className="space-y-3">
                            {leaderboardData['soul-title-ladder']?.slice(0, 10).map((user, index) => (
                                <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600 transition-all duration-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{getRankIcon(user.rank || 0)}</span>
                                                <span className={`text-2xl font-bold ${getRankColor(user.rank || 0)}`}>#{user.rank}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">{user.name}</h3>
                                                <p className="text-purple-400 text-sm font-medium">{user.soul_title}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                                                Level {user.level}
                                            </p>
                                            <div className="w-24 bg-slate-700 rounded-full h-2 mt-2">
                                                <div
                                                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${user.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'top-engagers' && (
                        <div className="space-y-3">
                            {leaderboardData['top-engagers']?.slice(0, 10).map((user, index) => (
                                <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600 transition-all duration-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{getRankIcon(user.rank || 0)}</span>
                                                <span className={`text-2xl font-bold ${getRankColor(user.rank || 0)}`}>#{user.rank}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">{user.name}</h3>
                                                <p className="text-slate-400 text-sm flex items-center gap-1">
                                                    <MessageCircle className="w-3 h-3" />
                                                    {user.posts} posts • {user.replies} replies • {user.reactions} reactions
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                                                {user.engagement.toLocaleString()}
                                            </p>
                                            <p className="text-slate-400 text-sm">Engagement Score</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeadershipBoard;