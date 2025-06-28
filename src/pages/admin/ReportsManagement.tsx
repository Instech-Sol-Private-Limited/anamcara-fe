import { Table, Button, Dropdown, Empty, Switch, message } from 'antd';
import {
    MoreOutlined,
} from '@ant-design/icons';


import { FaEye, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getReportedThreads, getReportsByPostId } from '../../utils/reports';
import supabase from '../../config/supabase';
import ThreadReportsModal from '../../components/dialogs/ThreadReportsModal';
import { LoadingOutlined } from '@ant-design/icons';


interface ThreadReportType {
    key: number;
    id: number;
    item_id: string; // thread_id or post_id
    item_title: string;
    total_reports: number;
    status: 'active' | 'inactive';
    type: 'thread' | 'post'; // New field to distinguish type
}

const ReportsManagement = () => {
    const [viewOpen, setViewOpen] = useState<boolean>(false);
const [modalType, setModalType] = useState<'thread' | 'post'>('thread');
const [selectedThread, setSelectedThread] = useState<string>(''); // for threads
const [selectedPost, setSelectedPost] = useState<string>('');     // for posts
    const [threads, setThreads] = useState<ThreadReportType[]>([]);
    const [loading, setLoading] = useState(false);
    const [reports, setReports] = useState<ThreadReportType[]>([]);
    const [reportFilter, setReportFilter] = useState<'all' | 'threads' | 'posts'>('all');

    const toggleItemStatus = async (record: ThreadReportType) => {
        try {
            setLoading(true);
            const newStatus = record.status === 'active' ? false : true;
            const tableName = record.type === 'thread' ? 'threads' : 'posts';

            const { error } = await supabase.from(tableName)
                .update({ is_active: newStatus })
                .eq('id', record.item_id);

            if (error) {
                throw error;
            }

            message.success(`${record.type} ${newStatus ? 'activated' : 'deactivated'} successfully`);
            await fetchAllReports();
        } catch (error) {
            message.error(`Failed to ${record.status === 'active' ? 'deactivate' : 'activate'} ${record.type}`);
        } finally {
            setLoading(false);
        }
    };
    const handleViewDetails = (record: ThreadReportType) => {
  if (record.type === 'thread') {
    setModalType('thread');
    setSelectedThread(record.item_id);
    setSelectedPost('');
  } else {
    setModalType('post');
    setSelectedPost(record.item_id);
    setSelectedThread('');
  }
  setViewOpen(true);
};


    const columns = [
        {
            title: <span className="text-cyan-400 font-mono text-xs sm:text-sm">ID</span>,
            dataIndex: 'id',
            key: 'id',
            width: 60,
            render: (text: number) => (
                <div className="flex items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full mr-1 sm:mr-2 animate-pulse"></div>
                    <span className="text-gray-300 font-mono text-xs">{String(text + 1).padStart(3, '0')}</span>
                </div>
            ),
        },
        {
            title: <span className="text-cyan-400 font-mono text-xs sm:text-sm">TYPE</span>,
            dataIndex: 'type',
            key: 'type',
            width: 80,
            render: (type: 'thread' | 'post') => (
                <div className={`px-2 py-1 rounded text-xs font-mono font-bold ${type === 'thread'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                    }`}>
                    {type.toUpperCase()}
                </div>
            ),
        },
        {
            title: <span className="text-cyan-400 font-mono text-xs sm:text-sm">ITEM ID</span>,
            dataIndex: 'item_id',
            key: 'item_id',
            render: (text: string) => (
                <div className="bg-gray-800/50 px-1 sm:px-3 py-1 rounded border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300">
                    <span className="text-green-400 font-mono text-xs break-all">
  {text ? text.slice(0, 8) : ''}
  ...
</span>
                </div>
            ),
        },
        {
            title: <span className="text-cyan-400 font-mono text-xs sm:text-sm">TITLE</span>,
            dataIndex: 'item_title',
            key: 'item_title',
            render: (text: string) => (
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <FaShieldAlt className="text-purple-400 text-xs hidden sm:block" />
                    <span className="text-white font-medium text-xs sm:text-sm hover:text-cyan-300 transition-colors duration-200 truncate">
                        {text.length > 20 ? `${text.slice(0, 20)}...` : text}
                    </span>
                </div>
            ),
        },
        {
            title: <span className="text-cyan-400 font-mono text-xs sm:text-sm">REP</span>,
            dataIndex: 'total_reports',
            key: 'total_reports',
            align: 'center' as const,
            width: 60,
            render: (text: number) => (
                <div className="flex items-center justify-center">
                    <div className={`
                    px-2 py-1 rounded-full border-2 font-mono text-xs font-bold
                    ${text >= 20 ? 'bg-red-500/20 border-red-400 text-red-300' :
                            text >= 10 ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300' :
                                'bg-green-500/20 border-green-400 text-green-300'}
                `}>
                        {text}
                    </div>
                    {text >= 15 && <FaExclamationTriangle className="text-red-400 ml-1 animate-pulse text-xs" />}
                </div>
            ),
        },
        {
            title: <span className="text-cyan-400 font-mono text-xs sm:text-sm">STATUS</span>,
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            width: 80,
            render: (status: 'active' | 'inactive', record: ThreadReportType) => (
                <div className="flex items-center justify-center">
                    <div className="relative">
                        <Switch
                            size="small"
                            checked={status === 'active'}
                            onChange={() => toggleItemStatus(record)}
                            className={`
                            cyber-switch transition-all duration-300
                            ${status === 'active' ? 'bg-green-500' : 'bg-gray-600'}
                        `}
                        />
                        <div className={`
                        absolute -inset-1 rounded-full blur-sm opacity-50 pointer-events-none
                        ${status === 'active' ? 'bg-green-400' : 'bg-gray-500'}
                    `}></div>
                    </div>
                </div>
            ),
        },
        {
            title: <span className="text-cyan-400 font-mono text-xs sm:text-sm">ACT</span>,
            key: 'actions',
            align: 'center' as const,
            width: 50,
            render: (_: any, record: ThreadReportType) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'view',
                                label: (
                                    <Button
                                        type="text"
                                        icon={<FaEye className="text-cyan-400" />}
                                        className="text-gray-300 hover:text-cyan-300 bg-transparent border-none cyber-btn text-xs"
                                        onClick={() => handleViewDetails(record)}
                                    >
                                        View
                                    </Button>
                                ),
                            }
                        ]
                    }}
                    placement="bottomRight"
                    overlayClassName="cyber-dropdown"
                >
                    <Button
                        size="small"
                        shape="circle"
                        icon={<MoreOutlined className="text-sm" />}
                        className="bg-gray-800/50 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 cyber-action-btn"
                    />
                </Dropdown>
            ),
        },
    ];

    const fetchAllReports = async () => {
        setLoading(true);
        try {
            const [threadsResponse, postsResponse] = await Promise.all([
                getReportedThreads(),
                getReportsByPostId('all') // Assuming you modify the API to accept 'all' to get all post reports
            ]);

            const allReports: ThreadReportType[] = [];

            // Process thread reports
            if (threadsResponse.success && threadsResponse.data) {
                const threadReports = threadsResponse.data.map((item: any, index: number) => ({
                    key: `thread-${index}`,
                    id: index,
                    item_id: item.thread_id,
                    item_title: item.title,
                    total_reports: item.total_reports,
                    status: item.is_active ? 'active' : 'inactive',
                    type: 'thread' as const,
                }));
                allReports.push(...threadReports);
            }

            // Process post reports (you'll need to modify your API to return similar structure)
            if (postsResponse.success && postsResponse.data) {
                const postReports = postsResponse.data.map((item: any, index: number) => ({
                    key: `post-${index}`,
                    id: allReports.length + index,
                    item_id: item.post_id,
                    item_title: item.title || item.content?.substring(0, 50) + '...',
                    total_reports: item.total_reports,
                    status: item.is_active ? 'active' : 'inactive',
                    type: 'post' as const,
                }));
                allReports.push(...postReports);
            }

            setReports(allReports);
        } catch (error) {
            message.error('Failed to fetch reports');
        } finally {
            setLoading(false);
        }
    };

    const getFilteredReports = () => {
        switch (reportFilter) {
            case 'threads':
                return reports.filter(report => report.type === 'thread');
            case 'posts':
                return reports.filter(report => report.type === 'post');
            default:
                return reports;
        }
    };

    const FilterButtons = () => (
        <div className="flex flex-wrap gap-2 mb-4">
            <Button
                type={reportFilter === 'all' ? 'primary' : 'default'}
                onClick={() => setReportFilter('all')}
                className={`cyber-filter-btn ${reportFilter === 'all' ? 'active' : ''}`}
                size="small"
            >
                All Reports ({reports.length})
            </Button>
            <Button
                type={reportFilter === 'threads' ? 'primary' : 'default'}
                onClick={() => setReportFilter('threads')}
                className={`cyber-filter-btn ${reportFilter === 'threads' ? 'active' : ''}`}
                size="small"
            >
                Threads ({reports.filter(r => r.type === 'thread').length})
            </Button>
            <Button
                type={reportFilter === 'posts' ? 'primary' : 'default'}
                onClick={() => setReportFilter('posts')}
                className={`cyber-filter-btn ${reportFilter === 'posts' ? 'active' : ''}`}
                size="small"
            >
                Posts ({reports.filter(r => r.type === 'post').length})
            </Button>
        </div>
    );

    useEffect(() => {
        fetchAllReports();
    }, []);

const totalReports = reports.length;
const highRiskReports = reports.filter(r => r.total_reports >= 15).length;
const activeReports = reports.filter(r => r.status === 'active').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-2 sm:p-4 lg:p-6 relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px',
                        animation: 'grid-move 20s linear infinite'
                    }}
                ></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex items-center space-x-2 sm:space-x-4 mb-3 sm:mb-4">
                        {/* Hexagon Icon Wrapper */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 relative flex-shrink-0">
                            {/* Outer Glowing Hex Border */}
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                                style={{
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                    animation: 'pulse 2s ease-in-out infinite',
                                    boxShadow: '0 0 15px rgba(34,211,238,0.6)',
                                }}
                            />
                            {/* Inner Background & Icon */}
                            <div
                                className="absolute inset-[2px] sm:inset-[3px] lg:inset-[4px] bg-[#0A0E1A] flex items-center justify-center"
                                style={{
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                }}
                            >
                                <FaShieldAlt className="text-white text-sm sm:text-lg lg:text-2xl" />
                            </div>
                        </div>

                        {/* Heading Text */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-wider leading-tight">
                                REPORTS
                            </h1>
                            <div className="text-cyan-300 text-xs sm:text-sm font-mono mt-1 opacity-80">
                                SYSTEM_STATUS: ONLINE
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
    {/* Total Reports Card */}
    <div className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 p-3 sm:p-4 lg:p-6 relative overflow-hidden"
            style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.05)'
            }}>
                                {/* Glowing Border Effect */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 -z-10"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                                        filter: 'blur(4px)'
                                    }}
                                />

                                {/* Status Label */}
                               <div className="absolute top-1 sm:top-2 right-1 sm:right-2 px-1 sm:px-2 py-0.5 sm:py-1 text-xs font-bold font-mono tracking-wider text-black"
                style={{
                    background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
                    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                }}>
                TOTAL
            </div>
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-cyan-300 text-xs sm:text-sm mb-1 sm:mb-2 font-mono tracking-wider">REPORTS</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">{totalReports}</p>
                    <div className="text-xs text-cyan-500 font-mono mt-1">TRACKED</div>
                </div>
                                    <div
                                        className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center flex-shrink-0"
                                        style={{
                                            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                                        }}
                                    >
                                        <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-cyan-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-1 left-1 w-2 h-2 sm:w-3 sm:h-3">
                                    <div className="w-full h-0.5 bg-cyan-400"></div>
                                    <div className="w-0.5 h-full bg-cyan-400"></div>
                                </div>
                                <div className="absolute bottom-1 right-1 w-2 h-2 sm:w-3 sm:h-3">
                                    <div className="w-full h-0.5 bg-cyan-400 absolute bottom-0"></div>
                                    <div className="w-0.5 h-full bg-cyan-400 absolute right-0"></div>
                                </div>
                            </div>
                        </div>

                        {/* High Risk Card */}
                        <div className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-yellow-500/30 p-3 sm:p-4 lg:p-6 relative overflow-hidden"
            style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                boxShadow: 'inset 0 0 20px rgba(255, 193, 7, 0.05)'
            }}>
                                {/* Glowing Border Effect */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 -z-10"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                                        filter: 'blur(4px)'
                                    }}
                                />

                                {/* Status Label */}
                                <div
                                    className="absolute top-1 sm:top-2 right-1 sm:right-2 px-1 sm:px-2 py-0.5 sm:py-1 text-xs font-bold font-mono tracking-wider text-black"
                                    style={{
                                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                                        clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
                                    }}
                                >
                                    RISK
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-yellow-300 text-xs sm:text-sm mb-1 sm:mb-2 font-mono tracking-wider">HIGH RISK</p>
                                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">
                                            {threads.filter(t => t.total_reports >= 15).length}
                                        </p>
                                        <div className="text-xs text-yellow-500 font-mono mt-1">ALERT</div>
                                    </div>

                                    <div
                                        className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center flex-shrink-0"
                                        style={{
                                            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                                        }}
                                    >
                                        <FaExclamationTriangle className="text-yellow-400 text-sm sm:text-lg lg:text-2xl animate-pulse" />
                                    </div>
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-1 left-1 w-2 h-2 sm:w-3 sm:h-3">
                                    <div className="w-full h-0.5 bg-yellow-400"></div>
                                    <div className="w-0.5 h-full bg-yellow-400"></div>
                                </div>
                                <div className="absolute bottom-1 right-1 w-2 h-2 sm:w-3 sm:h-3">
                                    <div className="w-full h-0.5 bg-yellow-400 absolute bottom-0"></div>
                                    <div className="w-0.5 h-full bg-yellow-400 absolute right-0"></div>
                                </div>
                            </div>
                        </div>

                        {/* Active Threads Card */}
                        <div className="relative">
                            <div
                                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-green-500/30 p-3 sm:p-4 lg:p-6 relative overflow-hidden"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                                    boxShadow: 'inset 0 0 20px rgba(0, 255, 0, 0.05)'
                                }}
                            >
                                {/* Glowing Border Effect */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 -z-10"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                                        filter: 'blur(4px)'
                                    }}
                                />

                                {/* Status Label */}
                                <div
                                    className="absolute top-1 sm:top-2 right-1 sm:right-2 px-1 sm:px-2 py-0.5 sm:py-1 text-xs font-bold font-mono tracking-wider text-black"
                                    style={{
                                        background: 'linear-gradient(45deg, #00FF88, #00CC66)',
                                        clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                                        boxShadow: '0 0 10px rgba(0, 255, 136, 0.3)'
                                    }}
                                >
                                    ACTIVE
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-green-300 text-xs sm:text-sm mb-1 sm:mb-2 font-mono tracking-wider">ACTIVE</p>
                                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-mono">
                                            {threads.filter(t => t.status === 'active').length}
                                        </p>
                                        <div className="text-xs text-green-500 font-mono mt-1">ONLINE</div>
                                    </div>

                                    <div
                                        className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center flex-shrink-0"
                                        style={{
                                            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                                        }}
                                    >
                                        <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-1 left-1 w-2 h-2 sm:w-3 sm:h-3">
                                    <div className="w-full h-0.5 bg-green-400"></div>
                                    <div className="w-0.5 h-full bg-green-400"></div>
                                </div>
                                <div className="absolute bottom-1 right-1 w-2 h-2 sm:w-3 sm:h-3">
                                    <div className="w-full h-0.5 bg-green-400 absolute bottom-0"></div>
                                    <div className="w-0.5 h-full bg-green-400 absolute right-0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Table Container */}
                <div className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 p-3 sm:p-4 lg:p-6 shadow-2xl shadow-cyan-500/10 relative">
                    <div className="absolute top-1 left-1 w-2 h-2 sm:w-3 sm:h-3">
                        <div className="w-full h-0.5 bg-cyan-400"></div>
                        <div className="w-0.5 h-full bg-cyan-400"></div>
                    </div>
                    <div className="absolute bottom-1 right-1 w-2 h-2 sm:w-3 sm:h-3">
                        <div className="w-full h-0.5 bg-cyan-400 absolute bottom-0"></div>
                        <div className="w-0.5 h-full bg-cyan-400 absolute right-0"></div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                        <h2 className="text-sm sm:text-lg lg:text-xl font-bold font-mowaq text-white">
                            THREAT ANALYSIS MATRIX
                        </h2>
                        <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-xs sm:text-sm font-mono">SYSTEM ACTIVE</span>
                        </div>
                    </div>

                    <div className="cyber-table-container overflow-x-auto">
                        {loading ? (
                            <div className="flex flex-col justify-center items-center h-[40vh] sm:h-[60vh]">
                                <div className="relative">
                                    <LoadingOutlined
                                        style={{ fontSize: 32, color: '#00FFFF' }}
                                        className="sm:text-5xl"
                                        spin
                                    />
                                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
                                </div>
                                <div className="text-cyan-300 font-mono mt-4 text-sm sm:text-lg">LOADING...</div>
                            </div>
                        ) : (
                            <Table
                                columns={columns}
                                dataSource={getFilteredReports()}
                                pagination={false}
                                className="cyber-table"
                                size="small"
                                scroll={{ x: 400 }}
                                locale={{
                                    emptyText: (
                                        <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                            description={
                                                <div className="text-center">
                                                    <p className="text-gray-400 font-mono mb-2 text-sm">
                                                        NO THREAT DATA
                                                    </p>
                                                    <div className="flex justify-center space-x-1">
                                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                                                        <div
                                                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                                                            style={{ animationDelay: '0.1s' }}
                                                        ></div>
                                                        <div
                                                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                                                            style={{ animationDelay: '0.2s' }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    ),
                                }}
                            />
                        )}
                        <ThreadReportsModal
  isOpen={viewOpen}
  setIsOpen={setViewOpen}
  type={modalType}
  selectedThread={modalType === 'thread' ? selectedThread : undefined}
  selectedPost={modalType === 'post' ? selectedPost : undefined}
/>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style>{`
                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(30px, 30px); }
                }

                .cyber-table .ant-table {
                    background: transparent !important;
                    color: white !important;
                }

                .cyber-table .ant-table-thead > tr > th {
                    background: rgba(0, 255, 255, 0.1) !important;
                    border-bottom: 2px solid rgba(0, 255, 255, 0.3) !important;
                    color: #00ffff !important;
                    font-weight: bold !important;
                    padding: 16px 12px !important;
                }

                .cyber-table .ant-table-tbody > tr > td {
                    background: rgba(17, 24, 39, 0.5) !important;
                    border-bottom: 1px solid rgba(0, 255, 255, 0.1) !important;
                    padding: 16px 12px !important;
                    transition: all 0.3s ease !important;
                }

                .cyber-table .ant-table-tbody > tr:hover > td {
                    background: rgba(0, 255, 255, 0.05) !important;
                    box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1) !important;
                }

                .cyber-switch.ant-switch-checked {
                    background: #10b981 !important;
                    box-shadow: 0 0 20px rgba(16, 185, 129, 0.5) !important;
                }

                .cyber-action-btn:hover {
                    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5) !important;
                    transform: scale(1.05) !important;
                }

                .cyber-dropdown .ant-dropdown-menu {
                    background: rgba(17, 24, 39, 0.95) !important;
                    border: 1px solid rgba(0, 255, 255, 0.3) !important;
                    backdrop-filter: blur(10px) !important;
                }

                .cyber-dropdown .ant-dropdown-menu-item {
                    color: #e5e7eb !important;
                }

                .cyber-dropdown .ant-dropdown-menu-item:hover {
                    background: rgba(0, 255, 255, 0.1) !important;
                }

                .ant-table-wrapper {
                    border-radius: 12px !important;
                    overflow: hidden !important;
                }

                .ant-spin-dot-item {
                    background-color: #00ffff !important;
                }

                
                @media (max-width: 400px) {
                    
                    .cyber-table .ant-table-thead,
  .cyber-table .ant-table-thead > tr,
  .cyber-table .ant-table-thead > tr > th {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
  }
                    .cyber-table .ant-table-tbody > tr {
                        display: block !important;
                        margin-bottom: 16px !important;
                        border-radius: 8px !important;
                        box-shadow: 0 2px 8px rgba(0,255,255,0.05) !important;
                        border: 1px solid rgba(0,255,255,0.08) !important;
                        background: rgba(17,24,39,0.7) !important;
                        padding: 8px !important;
                    }
                    
                    .cyber-table .ant-table-tbody > tr > td {
                        display: flex !important;
                        width: 100% !important;
                        box-sizing: border-box !important;
                        align-items: center !important;
                        justify-content: space-between !important;
                        padding: 8px 4px !important;
                        font-size: 12px !important;
                        border: none !important;
                        border-bottom: 1px solid rgba(0,255,255,0.06) !important;
                        background: transparent !important;
                        position: relative !important;
                    }
                    
                    .cyber-table .ant-table-tbody > tr > td:last-child {
                        border-bottom: none !important;
                    }
                    
                    /* Add data labels for each column */
                    .cyber-table .ant-table-tbody > tr > td:nth-child(1):before {
                        content: "ID: ";
                    }
                    .cyber-table .ant-table-tbody > tr > td:nth-child(2):before {
                        content: "THREAD: ";
                    }
                    .cyber-table .ant-table-tbody > tr > td:nth-child(3):before {
                        content: "TITLE: ";
                    }
                    .cyber-table .ant-table-tbody > tr > td:nth-child(4):before {
                        content: "REPORTS: ";
                    }
                    .cyber-table .ant-table-tbody > tr > td:nth-child(5):before {
                        content: "STATUS: ";
                    }
                    .cyber-table .ant-table-tbody > tr > td:nth-child(6):before {
                        content: "ACTIONS: ";
                    }
                    
                    .cyber-table .ant-table-tbody > tr > td:before {
                        font-weight: bold !important;
                        color: #00ffff !important;
                        font-size: 10px !important;
                        margin-right: 8px !important;
                        flex-shrink: 0 !important;
                        min-width: 60px !important;
                        text-transform: uppercase !important;
                        letter-spacing: 0.04em !important;
                        font-family: 'Courier New', monospace !important;
                        display: inline-block !important;
                    }
                    
                    /* Adjust content styling */
                    .cyber-table .ant-table-tbody > tr > td > div,
                    .cyber-table .ant-table-tbody > tr > td > span {
                        font-size: 11px !important;
                        flex: 1 !important;
                        text-align: right !important;
                    }
                    
                    /* Action buttons adjustments */
                    .cyber-action-btn,
                    .cyber-table .ant-btn {
                        min-width: 24px !important;
                        height: 24px !important;
                        font-size: 10px !important;
                        padding: 0 !important;
                    }
                    
                    /* Container adjustments */
                    .cyber-table-container {
                        padding: 0 !important;
                        overflow-x: visible !important;
                    }
                    
                    .cyber-table .ant-table {
                        width: 100% !important;
                    }
                    
                    .cyber-table .ant-table-content {
                        overflow-x: visible !important;
                    }
                    
                    /* Thread ID styling for mobile */
                    .cyber-table .ant-table-tbody > tr > td:nth-child(2) > div {
                        padding: 2px 6px !important;
                        font-size: 10px !important;
                    }
                    
                    /* Title column adjustment */
                    .cyber-table .ant-table-tbody > tr > td:nth-child(3) > div > span {
                        font-size: 10px !important;
                        max-width: 120px !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                        white-space: nowrap !important;
                    }
                    
                    /* Reports badge adjustment */
                    .cyber-table .ant-table-tbody > tr > td:nth-child(4) > div > div {
                        font-size: 10px !important;
                        padding: 2px 6px !important;
                        min-width: 24px !important;
                    }
                    
                    /* Switch component adjustment */
                    .cyber-table .ant-switch {
                        min-width: 28px !important;
                        height: 16px !important;
                    }
                    
                    /* Dropdown adjustments */
                    .cyber-dropdown .ant-dropdown-menu {
                        min-width: 80px !important;
                    }
                    
                   .cyber-dropdown .ant-dropdown-menu-item {
                        padding: 4px 8px !important;
                        font-size: 10px !important;
                    }
                }

/* === Filter Button Styles === */
.cyber-filter-btn {
    background: rgba(17, 24, 39, 0.8) !important;
    border: 1px solid rgba(0, 255, 255, 0.3) !important;
    color: #e5e7eb !important;
    font-family: monospace !important;
    font-size: 12px !important;
    font-weight: bold !important;
    transition: all 0.3s ease !important;
}
.cyber-filter-btn:hover {
    background: rgba(0, 255, 255, 0.1) !important;
    border-color: rgba(0, 255, 255, 0.6) !important;
    color: #00ffff !important;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3) !important;
}
.cyber-filter-btn.active,
.cyber-filter-btn.ant-btn-primary {
    background: rgba(0, 255, 255, 0.2) !important;
    border-color: #00ffff !important;
    color: #00ffff !important;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.4) !important;
}

/* === Mobile Styles for Table Columns === */
@media (max-width: 400px) {
    .cyber-table .ant-table-tbody > tr > td:nth-child(1):before {
        content: "ID: ";
    }
    .cyber-table .ant-table-tbody > tr > td:nth-child(2):before {
        content: "TYPE: ";
    }
    .cyber-table .ant-table-tbody > tr > td:nth-child(3):before {
        content: "ITEM ID: ";
    }
    .cyber-table .ant-table-tbody > tr > td:nth-child(4):before {
        content: "TITLE: ";
    }
    .cyber-table .ant-table-tbody > tr > td:nth-child(5):before {
        content: "REPORTS: ";
    }
    .cyber-table .ant-table-tbody > tr > td:nth-child(6):before {
        content: "STATUS: ";
    }
    .cyber-table .ant-table-tbody > tr > td:nth-child(7):before {
        content: "ACTIONS: ";
    }
}
            `}</style>

        </div>
    );
};

export default ReportsManagement;