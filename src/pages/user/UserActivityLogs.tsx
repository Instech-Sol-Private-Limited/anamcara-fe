import { useState, useEffect } from 'react';
import { Table, Tag, Empty } from 'antd';
import { SiLogstash } from "react-icons/si";
import { FaFire, FaCoins, FaCalendarAlt, FaSortAmountDown, FaFilter } from "react-icons/fa";
import { ColumnsType } from 'antd/es/table';
import supabase from '../../config/supabase';
import { useAuth } from '../../context/AuthProvider';

interface LogEntry {
    id: number;
    type: 'soulpoints' | 'anamicoins';
    action: string;
    points: number;
    created_at: string;
    category: string;
}

const UserActivityLogs = () => {
    const { userData } = useAuth();
    const [activeTab, setActiveTab] = useState<'all' | 'soulpoints' | 'anamicoins'>('all');
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const filteredLogs = logs.filter(log => {
        if (activeTab === 'all') return true;
        return log.type === activeTab;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const CustomEmpty = () => (
        <div className="py-12">
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <span className="text-white/80 font-mono">
                        No activity logs found
                    </span>
                }
            />
        </div>
    );

    const columns: ColumnsType<LogEntry> = [
        {
            title: (
                <span className="text-cyan-300 font-mono font-bold flex items-center gap-2 px-4">
                    <FaCalendarAlt className="text-xs" />
                    DATE
                </span>
            ),
            dataIndex: 'created_at',
            key: 'date',
            sorter: (a: LogEntry, b: LogEntry) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            sortDirections: ['descend', 'ascend'],
            defaultSortOrder: 'descend',
            render: (date: string) => (
                <span className="text-white/80 font-mono text-sm px-4">
                    {formatDate(date)}
                </span>
            ),
            width: '25%',
        },
        {
            title: (
                <span className="text-cyan-300 font-mono font-bold px-4">
                    ACTION
                </span>
            ),
            dataIndex: 'action',
            key: 'action',
            render: (action: string, record: LogEntry) => (
                <div className="flex items-center gap-2 px-4">
                    <Tag
                        className={`w-fit font-mono text-xs border px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${record.type === 'soulpoints'
                            ? 'bg-orange-500/10 text-orange-300 border-orange-500/30'
                            : 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                            }`}
                    >
                        {record.category.toUpperCase()}
                    </Tag>

                    <span className="text-white font-mono text-sm font-medium">
                        {action}
                    </span>
                </div>
            ),
            width: '45%',
        },
        {
            title: (
                <p className="text-cyan-300 font-mono font-bold flex items-center justify-end gap-2 pr-10">
                    <FaSortAmountDown className="text-xs" />
                    POINTS
                </p>
            ),
            dataIndex: 'points',
            key: 'points',
            sorter: (a: LogEntry, b: LogEntry) => a.points - b.points,
            sortDirections: ['descend', 'ascend'],
            render: (points: number, record: LogEntry) => (
                <div className="flex items-center justify-end pr-10">
                    {record.type === 'soulpoints' ? (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/40 hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20">
                            <FaFire className="text-orange-400 text-sm animate-pulse" />
                            <span className="text-orange-300 font-mono font-bold text-sm">
                                {points >= 0 ? '+' : ''}{points} SP
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 hover:from-yellow-500/30 hover:to-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20">
                            <FaCoins className="text-yellow-400 text-sm animate-spin" style={{ animationDuration: '3s' }} />
                            <span className="text-yellow-300 font-mono font-bold text-sm">
                                +{points} AC
                            </span>
                        </div>
                    )}
                </div>
            ),
            width: '30%',
            align: 'right',
        },
    ];

    useEffect(() => {
        const fetchUserHistoryLogs = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);

                const { data: anamicoinsData, error: anamicoinsError } = await supabase
                    .from('anamcoins_history')
                    .select('*')
                    .eq('user_id', userData.id);

                const { data: soulpointsData, error: soulpointsError } = await supabase
                    .from('soulpoints_history')
                    .select('*')
                    .eq('user_id', userData.id)
                    .order('created_at', { ascending: false });

                if (soulpointsError || anamicoinsError) {
                    throw soulpointsError || anamicoinsError;
                }

                const transformedSoulpoints: LogEntry[] = soulpointsData?.map((item: any) => ({
                    id: item.id,
                    type: 'soulpoints',
                    action: item.action,
                    points: item.points_earned,
                    created_at: item.created_at,
                    category: item.category || 'general'
                })) || [];

                const transformedAnamicoins: LogEntry[] = anamicoinsData?.map((item: any) => ({
                    id: item.id,
                    type: 'anamicoins',
                    action: item.action,
                    points: item.coins_earned,
                    created_at: item.created_at,
                    category: item.category || 'general'
                })) || [];

                const mergedLogs: LogEntry[] = [...transformedSoulpoints, ...transformedAnamicoins]
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                setLogs(mergedLogs);
            } catch (err) {
                console.error('Error fetching logs:', err);
                setError('Failed to load activity logs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserHistoryLogs();
    }, []);

    return (
        <div className="w-full rounded-2xl bg-[#111823] md:p-8 p-4 sm:p-6 flex flex-col max-w-full">
            {/* Header Section */}
            <div className="flex flex-row items-center mb-8">
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Enhanced Hexagon Icon Container */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 relative flex-shrink-0">
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-[#0766FF] via-[#00DCFF] to-[#0766FF] animate-pulse"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                boxShadow: '0 0 20px rgba(0, 220, 255, 0.5), 0 0 40px rgba(7, 102, 255, 0.3)',
                            }}
                        />
                        <div
                            className="absolute inset-[3px] bg-[#0A0E1A] flex items-center justify-center overflow-hidden"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            }}
                        >
                            <SiLogstash className="text-cyan-400 text-xl sm:text-2xl" />
                        </div>
                    </div>

                    {/* Enhanced Heading */}
                    <div>
                        <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-wider leading-tight">
                            ACTIVITY LOGS
                        </h1>
                        <div className="text-cyan-300 text-xs sm:text-sm font-mono mt-1 opacity-80 flex items-center gap-2">
                            <span className="animate-pulse">SYSTEM_STATUS: ONLINE</span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Tab Navigation */}
            <div className="flex flex-wrap gap-3 mb-8">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-3 rounded-xl font-mono text-sm transition-all duration-300 border-2 flex items-center gap-2 hover:scale-105 ${activeTab === 'all'
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/60 text-cyan-300 shadow-lg shadow-cyan-500/20'
                        : 'bg-[#111823]/50 border-white/10 text-white/60 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-cyan-500/5'
                        }`}
                >
                    <FaFilter className="text-xs" />
                    ALL_LOGS
                </button>

                <button
                    onClick={() => setActiveTab('soulpoints')}
                    className={`px-6 py-3 rounded-xl font-mono text-sm transition-all duration-300 border-2 flex items-center gap-2 hover:scale-105 ${activeTab === 'soulpoints'
                        ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/60 text-orange-300 shadow-lg shadow-orange-500/20'
                        : 'bg-[#111823]/50 border-white/10 text-white/60 hover:border-orange-400/40 hover:text-orange-300 hover:bg-orange-500/5'
                        }`}
                >
                    <FaFire className="text-xs animate-pulse" />
                    SOULPOINTS
                </button>

                <button
                    onClick={() => setActiveTab('anamicoins')}
                    className={`px-6 py-3 rounded-xl font-mono text-sm transition-all duration-300 border-2 flex items-center gap-2 hover:scale-105 ${activeTab === 'anamicoins'
                        ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-400/60 text-yellow-300 shadow-lg shadow-yellow-500/20'
                        : 'bg-[#111823]/50 border-white/10 text-white/60 hover:border-yellow-400/40 hover:text-yellow-300 hover:bg-yellow-500/5'
                        }`}
                >
                    <FaCoins className="text-xs animate-spin" style={{ animationDuration: '3s' }} />
                    ANAMICOINS
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-900/60 border border-red-400 text-red-200 font-mono text-sm">
                    {error}
                </div>
            )}

            {/* Enhanced Table Container */}
            <div className="flex-1 bg-transparent border border-white/10 rounded-2xl backdrop-blur-xl hover:border-white/10 overflow-hidden p-2">
                <Table
                    columns={columns}
                    dataSource={filteredLogs}
                    rowKey="id"
                    loading={loading}
                    locale={{
                        emptyText: <CustomEmpty />
                    }}
                    pagination={{
                        pageSize: 8,
                        showSizeChanger: false,
                        showQuickJumper: false,
                        className: "font-mono",
                        showTotal: (total, range) => (
                            <span className="text-white/60 font-mono text-sm">
                                {range[0]}-{range[1]} of {total} entries
                            </span>
                        ),
                    }}
                    size="middle"
                    scroll={{ x: true, y: '400px' }}
                    className="custom-table [&_.ant-empty-description]:text-white/80"
                />
            </div>
        </div>
    );
};

export default UserActivityLogs;