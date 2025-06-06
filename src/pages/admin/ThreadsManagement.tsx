import { Table, Avatar, Button, Dropdown, MenuProps, message } from 'antd';
import { FaComments, FaCheckCircle, FaStar } from 'react-icons/fa';
import {
    DeleteOutlined,
    MoreOutlined,
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import supabase from '../../config/supabase'; // Ensure this path is correct
import { useEffect, useState } from 'react';
import { Thread } from '../../types'; // Ensure this path and type definition are correct
import { FaEye } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import threadImg from '/public/icons/admin/2.jpeg';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import AdminCategoryFilter from '../../components/forum/AdminCategoryFilter';
interface ThreadType {
    key: string; // This should be a unique identifier, ideally the thread's actual ID
    id: number; // A sequential ID for display purposes
    title: string;
    author: {
        username: string;
        avatar_url: string;
    };
    published: string;
    reactions: {
        likes: number;
        dislikes: number;
    };
    is_active: boolean;
    category_name: string;
}

const ThreadsManagement = () => {
    const location = useLocation();
    const [threads, setThreads] = useState<ThreadType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalThreads, setTotalThreads] = useState(0);
    const [loading, setLoading] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [categories, setCategories] = useState<{ id: string, category_name: string }[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [filteredThreads, setFilteredThreads] = useState<ThreadType[]>([]);

    const toggleThreadStatus = async (threadId: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('threads')
                .update({ is_active: !currentStatus })
                .eq('id', threadId);

            if (error) {
                throw error;
            }

            message.success(`Thread ${currentStatus ? 'deactivated' : 'activated'} successfully`);
            fetchData(); // Refresh the data
        } catch (error) {
            message.error(`Failed to ${currentStatus ? 'deactivate' : 'activate'} thread`);
            console.error('Error updating thread status:', error);
        }
    };


    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('threadcategory')
                .select('id, category_name')
                .order('category_name');

            if (error) throw error;
            if (data) setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    const handleCategoryToggle = (categoryName: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryName)) {
                return prev.filter(cat => cat !== categoryName);
            } else {
                return [...prev, categoryName];
            }
        });
    };


    const handleDeleteThread = async (threadId: string) => {
        try {
            const { error } = await supabase
                .from('threads')
                .update({ is_deleted: true })
                .eq('id', threadId);

            if (error) {
                throw error;
            }

            message.success(`Thread deleted successfully`);
            fetchData();
        } catch (error) {
            message.error(`Failed to delete thread`);
            console.error('Error updating thread status:', error);
        }
    };

    const getMenuItems = (record: ThreadType): MenuProps['items'] => [
        {
            key: 'view',
            label: (
                <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#0766FF]/20 rounded-lg transition-all duration-200">
                    <FaEye className="text-[#00DCFF] text-sm" />
                    <span className="text-white font-medium">View Thread</span>
                </div>
            ),
            onClick: () => {
                window.open(`http://localhost:3000/threads/${record.key}`, '_blank');
            }
        },
        {
            key: 'toggle_status',
            label: (
                <div className="flex items-center gap-3 px-3 py-2 hover:bg-[#0766FF]/20 rounded-lg transition-all duration-200">
                    {record.is_active ? (
                        <>
                            <CloseOutlined className="text-orange-400 text-sm" />
                            <span className="text-white font-medium">Deactivate</span>
                        </>
                    ) : (
                        <>
                            <CheckOutlined className="text-green-400 text-sm" />
                            <span className="text-white font-medium">Activate</span>
                        </>
                    )}
                </div>
            ),
            onClick: () => toggleThreadStatus(record.key, record.is_active)
        },
        {
            key: 'delete',
            label: (
                <div className="flex items-center gap-3 px-3 py-2 hover:bg-red-500/20 rounded-lg transition-all duration-200">
                    <DeleteOutlined className="text-red-400 text-sm" />
                    <span className="text-red-400 font-medium">Delete Thread</span>
                </div>
            ),
            onClick: () => handleDeleteThread(record.key)
        },
    ];

    const columns: ColumnsType<ThreadType> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 70,
            align: 'center',
            render: (text) => (
                <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0766FF] to-[#00DCFF] rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">{text}</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00DCFF] rounded-full border-2 border-[#111823] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Thread Details',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div className="flex flex-col gap-2 py-2">
                    <h3 className="text-white font-semibold text-base leading-tight hover:text-[#00DCFF] transition-colors cursor-pointer">
                        {text.length > 50 ? `${text.slice(0, 50)}...` : text}
                    </h3>
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1 text-gray-400">
                            <div className="w-2 h-2 bg-[#0766FF] rounded-full"></div>
                            <span>{formatDate(record.published)}</span>
                        </div>
                        <div className="px-2 py-1 bg-[#0766FF]/20 text-[#00DCFF] rounded-full border border-[#0766FF]/30">
                            {record.category_name}
                        </div>
                    </div>
                </div>
            ),
            responsive: ['sm'],
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            width: 200,
            render: (author) => (
                <div className="flex items-center gap-4 py-2">
                    <div className="relative">
                        <Avatar
                            src={author.avatar_url}
                            size={44}
                            className="border-3 border-[#0766FF]/50 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#0766FF] to-[#00DCFF] rounded-full border-2 border-[#111823] flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-semibold text-sm">{author.username}</span>
                        <span className="text-gray-400 text-xs">Thread Author</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            width: 140,
            align: 'center',
            render: (active) => (
                <div className="flex justify-center">
                    {active ? (
                        <div className="relative px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                                <span className="text-green-300 font-semibold text-xs">ACTIVE</span>
                            </div>
                        </div>
                    ) : (
                        <div className="relative px-4 py-2 bg-gradient-to-r from-gray-500/20 to-slate-500/20 border border-gray-500/40 rounded-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <span className="text-gray-300 font-semibold text-xs">INACTIVE</span>
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Engagement',
            key: 'reactions',
            align: 'center',
            width: 150,
            render: (_, record) => (
                <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="w-3 h-3 bg-green-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">↑</span>
                        </div>
                        <span className="text-green-300 font-bold text-sm">{record.reactions.likes}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="w-3 h-3 bg-red-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">↓</span>
                        </div>
                        <span className="text-red-300 font-bold text-sm">{record.reactions.dislikes}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <Dropdown
                    menu={{ items: getMenuItems(record) }}
                    placement="bottomRight"
                    overlayClassName="custom-dropdown-menu"
                    trigger={['click']}
                >
                    <Button
                        shape="circle"
                        icon={<MoreOutlined className="text-xl" />}
                        className="border-0 bg-gradient-to-r from-[#0766FF]/30 to-[#00DCFF]/30 text-white hover:from-[#0766FF] hover:to-[#00DCFF] transition-all duration-300 shadow-lg hover:shadow-[#0766FF]/30 w-12 h-12"
                        size="large"
                    />
                </Dropdown>
            ),
        },
    ];

    const mobileColumns: ColumnsType<ThreadType> = [
        {
            title: 'Thread',
            key: 'mobile_thread',
            render: (_, record) => (
                <div className="py-2">
                    {/* Thread header with ID and status */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-[#0766FF] to-[#00DCFF] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">{record.id}</span>
                            </div>
                            {record.is_active ? (
                                <div className="px-2 py-1 bg-green-500/20 border border-green-500/40 rounded-md">
                                    <span className="text-green-300 font-semibold text-xs">ACTIVE</span>
                                </div>
                            ) : (
                                <div className="px-2 py-1 bg-gray-500/20 border border-gray-500/40 rounded-md">
                                    <span className="text-gray-300 font-semibold text-xs">INACTIVE</span>
                                </div>
                            )}
                        </div>
                        <Dropdown
                            menu={{ items: getMenuItems(record) }}
                            placement="bottomRight"
                            overlayClassName="custom-dropdown-menu"
                            trigger={['click']}
                        >
                            <Button
                                shape="circle"
                                icon={<MoreOutlined />}
                                className="border-0 bg-gradient-to-r from-[#0766FF]/30 to-[#00DCFF]/30 text-white hover:from-[#0766FF] hover:to-[#00DCFF] transition-all duration-300 w-8 h-8"
                                size="small"
                            />
                        </Dropdown>
                    </div>

                    {/* Thread title */}
                    <h3 className="text-white font-semibold text-sm leading-tight hover:text-[#00DCFF] transition-colors cursor-pointer mb-2">
                        {record.title.length > 40 ? `${record.title.slice(0, 40)}...` : record.title}
                    </h3>

                    {/* Author info */}
                    <div className="flex items-center gap-2 mb-2">
                        <Avatar
                            src={record.author.avatar_url}
                            size={24}
                            className="border border-[#0766FF]/50"
                        />
                        <span className="text-white text-xs font-medium">{record.author.username}</span>
                        <div className="px-1.5 py-0.5 bg-[#0766FF]/20 text-[#00DCFF] rounded text-xs">
                            {record.category_name}
                        </div>
                    </div>

                    {/* Engagement and date */}
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <span className="text-green-300">↑{record.reactions.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-red-300">↓{record.reactions.dislikes}</span>
                            </div>
                        </div>
                        <span className="text-gray-400">{formatDate(record.published)}</span>
                    </div>
                </div>
            ),
        },
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const fetchData = async (retryCount = 0) => {
        setLoading(true);
        try {
            const { data, error, status } = await supabase
                .from('threads')
                .select(`
                    *,
                    profiles!inner(avatar_url)
                `)
                .eq('is_deleted', false)
                .order('publish_date', { ascending: true });

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                const formatted = data.map((thread: Thread, index: number) => ({
                    key: thread.id, // Use actual thread ID as key
                    id: index + 1, // Sequential ID for display
                    title: thread.title,
                    published: thread.publish_date,
                    is_active: thread.is_active,
                    reactions: {
                        likes: thread.total_likes || 0,
                        dislikes: thread.total_dislikes || 0
                    },
                    author: {
                        username: thread.author_name || 'Unknown',
                        avatar_url: thread.profiles?.avatar_url || '',
                    },
                    category_name: thread.category_name || 'Uncategorized',
                }));

                setThreads(formatted);
                setTotalThreads(data.length || 0);
            }
        } catch (error) {
            console.error('Error fetching threads:', error);
            if (retryCount < 3) {
                setTimeout(() => fetchData(retryCount + 1), 1000);
            } else {
                message.error('Failed to fetch threads after multiple attempts');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination: any) => {
        const { current, pageSize } = pagination;
        setCurrentPage(current);
        setPageSize(pageSize);
    };

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, [currentPage, pageSize, location]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (selectedCategories.length === 0) {
            setFilteredThreads(threads);
        } else {
            const filtered = threads.filter(thread =>
                selectedCategories.includes(thread.category_name)
            );
            setFilteredThreads(filtered);
        }
    }, [threads, selectedCategories]);




    return (
        <div className="w-full rounded-2xl bg-[#111823] min-h-[calc(100vh-125px)] p-1 xs:p-1 md:p-2 lg:p-6 relative overflow-hidden sm:p-2 [@media(max-width:350px)]:p-0">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-[#0766FF]/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-20 right-20 w-24 h-24 bg-[#00DCFF]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-[#0766FF]/5 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 mb-8">

                <div className="flex w-full items-start gap-2 sm:gap-4 mb-4 sm:mb-6 flex-col xs:flex-row justify-start">
                    {/* Hexagonal Badge */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative flex-shrink-0">
                        {/* Outer glowing hex border */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-[#0766FF] to-[#00DCFF]"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                animation: 'pulse 2s ease-in-out infinite',
                                boxShadow: '0 0 15px rgba(0, 220, 255, 0.5)',
                            }}
                        />
                        {/* Inner image container */}
                        <div
                            className="absolute inset-[2px] sm:inset-[4px] bg-[#0A0E1A] flex items-center justify-center overflow-hidden"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            }}
                        >
                            <img
                                src={threadImg}
                                alt="Threads"
                                className="w-full h-full object-cover"
                                style={{
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Text Label */}
                    <div className="text-left xs:text-left">
                        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-wider leading-tight">
                            MANAGE THREADS
                        </h1>
                        <div className="text-cyan-300 text-xs sm:text-sm font-mowaq mt-1 opacity-80">
                            SYSTEM_STATUS: ONLINE
                        </div>
                    </div>
                </div>
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                    {/* Total Threads */}
                    <div className="relative">
                        <div
                            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 p-3 sm:p-4 md:p-6 relative overflow-hidden"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                                boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.05)'
                            }}
                        >
                            {/* Glowing Border Effect */}
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 -z-10"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                                    filter: 'blur(4px)'
                                }}
                            />

                            {/* Status Label */}
                            <div
                                className="absolute top-1 right-1 sm:top-2 sm:right-2 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-bold font-mowaq tracking-wider text-black"
                                style={{
                                    background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
                                    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                                }}
                            >
                                TOTAL
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                    <p className="text-cyan-300 text-xs sm:text-sm mb-1 sm:mb-2 font-mowaq tracking-wider truncate">THREADS.COUNT</p>
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono">
                                        {selectedCategories.length > 0 ? filteredThreads.length : totalThreads}
                                    </p>
                                    <div className="text-[10px] sm:text-xs text-cyan-500 font-mowaq mt-1 truncate">
                                        {selectedCategories.length > 0 ? 'FILTERED.COUNT' : 'SYSTEM.TRACKED'}
                                    </div>
                                </div>

                                <div
                                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center ml-2"
                                    style={{
                                        clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                                    }}
                                >
                                    <FaComments className="text-cyan-400 text-lg sm:text-xl md:text-2xl" />
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-1 left-1 w-3 h-3">
                                <div className="w-full h-0.5 bg-cyan-400"></div>
                                <div className="w-0.5 h-full bg-cyan-400"></div>
                            </div>
                            <div className="absolute bottom-1 right-1 w-3 h-3">
                                <div className="w-full h-0.5 bg-cyan-400 absolute bottom-0"></div>
                                <div className="w-0.5 h-full bg-cyan-400 absolute right-0"></div>
                            </div>
                        </div>
                    </div>

                    {/* Active Threads */}
                    <div className="relative">
                        <div
                            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 p-3 sm:p-4 md:p-6 relative overflow-hidden"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                                boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.05)'
                            }}
                        >
                            {/* Glowing Border Effect */}
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 -z-10"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                                    filter: 'blur(4px)'
                                }}
                            />

                            {/* Status Label */}
                            <div
                                className="absolute top-1 right-1 sm:top-2 sm:right-2 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-bold font-mowaq tracking-wider text-black"
                                style={{
                                    background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
                                    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                                }}
                            >
                                ACTIVE
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                    <p className="text-green-300 text-xs sm:text-sm mb-1 sm:mb-2 font-mowaq tracking-wider truncate">THREADS.ONLINE</p>
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono">{threads.filter(t => t.is_active).length}</p>
                                    <div className="text-[10px] sm:text-xs text-green-500 font-mowaq mt-1 truncate">STATUS.VERIFIED</div>
                                </div>
                                <div
                                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center ml-2"
                                    style={{
                                        clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                                    }}
                                >
                                    <FaCheckCircle className="text-green-400 text-lg sm:text-xl md:text-2xl" />
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-1 left-1 w-3 h-3">
                                <div className="w-full h-0.5 bg-green-400"></div>
                                <div className="w-0.5 h-full bg-green-400"></div>
                            </div>
                            <div className="absolute bottom-1 right-1 w-3 h-3">
                                <div className="w-full h-0.5 bg-green-400 absolute bottom-0"></div>
                                <div className="w-0.5 h-full bg-green-400 absolute right-0"></div>
                            </div>
                        </div>
                    </div>

                    {/* Total Engagement */}
                    <div className="relative">
                        <div
                            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-purple-500/30 p-3 sm:p-4 md:p-6 relative overflow-hidden"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                                boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.05)'
                            }}
                        >
                            {/* Glowing Border Effect */}
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-500/20 -z-10"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                                    filter: 'blur(4px)'
                                }}
                            />

                            {/* Status Label */}
                            <div
                                className="absolute top-2 right-2 px-2 py-1 text-xs font-bold font-mowaq tracking-wider text-black"
                                style={{
                                    background: 'linear-gradient(45deg, #AA00FF, #8800CC)',
                                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                                    boxShadow: '0 0 10px rgba(170, 0, 255, 0.3)'
                                }}
                            >
                                ENGAGE
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                    <p className="text-purple-300 text-xs sm:text-sm mb-1 sm:mb-2 font-mowaq tracking-wider truncate">ENGAGEMENT.TOTAL</p>
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono">{threads.reduce((sum, t) => sum + t.reactions.likes, 0)}</p>
                                    <div className="text-[10px] sm:text-xs text-purple-500 font-mowaq mt-1 truncate">METRICS.CALCULATED</div>
                                </div>
                                <div
                                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center ml-2"
                                    style={{
                                        clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                                    }}
                                >
                                    <FaStar className="text-purple-400 text-lg sm:text-xl md:text-2xl" />
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-1 left-1 w-3 h-3">
                                <div className="w-full h-0.5 bg-purple-400"></div>
                                <div className="w-0.5 h-full bg-purple-400"></div>
                            </div>
                            <div className="absolute bottom-1 right-1 w-3 h-3">
                                <div className="w-full h-0.5 bg-purple-400 absolute bottom-0"></div>
                                <div className="w-0.5 h-full bg-purple-400 absolute right-0"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <AdminCategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onToggle={handleCategoryToggle}
                isLoading={loading}
            />

            {/* Table Container */}
            <div className="relative z-10">
                <div
                    className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 overflow-hidden relative"
                    style={{
                        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                        boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.05)'
                    }}
                >
                    {/* Glowing Border Effect */}
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 -z-10"
                        style={{
                            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                            filter: 'blur(4px)'
                        }}
                    />

                    {/* Table Label */}
                    <div
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold font-mono tracking-wider text-black z-20"
                        style={{
                            background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
                            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                        }}
                    >
                        DATA.TABLE
                    </div>

                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-[60vh] p-8">
                            <div className="relative">
                                <LoadingOutlined
                                    style={{ fontSize: 48, color: '#00FFFF' }}
                                    spin
                                />
                                <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
                            </div>
                            <div className="text-cyan-300 font-mono mt-4 text-lg tracking-wider">LOADING.THREADS.DATA...</div>
                            <div className="text-cyan-500 font-mono text-sm mt-1">SYSTEM.STATUS: PROCESSING</div>
                        </div>
                    ) : (
                        <div className="p-2 sm:p-4 md:p-6">
                            <Table
                                columns={windowWidth < 768 ? mobileColumns : columns}
                                dataSource={filteredThreads} // Changed from 'threads' to 'filteredThreads'
                                loading={loading}
                                pagination={{
                                    current: currentPage,
                                    pageSize: pageSize,
                                    total: filteredThreads.length, // Changed from 'totalThreads' to 'filteredThreads.length'
                                    showSizeChanger: false,
                                    pageSizeOptions: ['10', '20', '50'],
                                    showTotal: (total, range) => (
                                        <span className="text-cyan-400 font-mono text-xs sm:text-sm tracking-wider">
                                            <span className="hidden sm:inline">DISPLAYING </span>[{range[0]}-{range[1]}] OF [{total}]<span className="hidden sm:inline"> RECORDS</span>
                                            {selectedCategories.length > 0 && (
                                                <span className="ml-2 text-[#00DCFF]">
                                                    | FILTERED
                                                </span>
                                            )}
                                        </span>
                                    ),
                                    className: "custom-pagination",
                                    simple: windowWidth < 640,
                                    size: windowWidth < 640 ? 'small' : 'default',
                                }}
                                onChange={handleTableChange}
                                bordered={false}
                                scroll={{ x: windowWidth < 768 ? 350 : 768 }}
                                className="custom-dark-table"
                                size={windowWidth < 768 ? "small" : "middle"}
                                rowClassName={(record) =>
                                    `hover:bg-[#0766FF]/10 transition-all duration-300 ${!record.is_active ? 'opacity-70' : ''
                                    }`
                                }
                            />
                        </div>

                    )}

                    {/* Corner Accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 z-10">
                        <div className="w-full h-0.5 bg-cyan-400"></div>
                        <div className="w-0.5 h-full bg-cyan-400"></div>
                    </div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 z-10">
                        <div className="w-full h-0.5 bg-cyan-400 absolute bottom-0"></div>
                        <div className="w-0.5 h-full bg-cyan-400 absolute right-0"></div>
                    </div>
                </div>

                {/* System Status Bar */}
                <div
                    className="flex items-center justify-between mt-3 sm:mt-4 p-2 sm:p-3 bg-[#0A0E1A] border border-cyan-500/30"
                    style={{
                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                    }}
                >
                    <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-mowaq text-cyan-400 tracking-wider">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="truncate">THREADS.MANAGEMENT.ONLINE</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-mowaq text-cyan-400 tracking-wider truncate ml-2">
                        <span className="hidden xs:inline">SYSTEM.STATUS: </span>OPERATIONAL
                    </div>
                </div>
            </div>

            <style>{`
    .custom-dark-table .ant-table {
        background: transparent !important;
        color: white !important;
    }
        .custom-dark-table .ant-empty-description {
  color: #fff !important;
  font-weight: 600;
}
  .custom-dark-table .ant-empty-image > svg {
  filter: drop-shadow(0 0 6px #00dcff88);
}
.custom-dark-table .ant-empty-image > svg path,
.custom-dark-table .ant-empty-image > svg ellipse,
.custom-dark-table .ant-empty-image > svg circle,
.custom-dark-table .ant-empty-image > svg rect {
  fill: #00DCFF !important; /* Use your main theme color */
  stroke: #00DCFF !important;
  opacity: 1 !important;
}
    .custom-dark-table .ant-table-thead > tr > th {
        background: linear-gradient(135deg, #0766FF20, #00DCFF10) !important;
        border-bottom: 2px solid #0766FF40 !important;
        color: #00DCFF !important;
        font-weight: 700 !important;
        padding: 20px 16px !important;
        font-size: 14px !important;
        text-transform: uppercase !important;
        letter-spacing: 0.5px !important;
    }
    .custom-dark-table .ant-table-tbody > tr > td {
        background: transparent !important;
        border-bottom: 1px solid #0766FF15 !important;
        padding: 20px 16px !important;
    }
    .custom-dark-table .ant-table-tbody > tr:hover > td {
        background: linear-gradient(135deg, #0766FF08, #00DCFF05) !important;
        box-shadow: inset 0 0 20px rgba(7, 102, 255, 0.1) !important;
    }
    .custom-dropdown-menu .ant-dropdown-menu {
        background: linear-gradient(135deg, #111823, #1a1f2e) !important;
        border: 2px solid #0766FF30 !important;
        border-radius: 12px !important;
        box-shadow: 0 20px 40px rgba(7, 102, 255, 0.3) !important;
        backdrop-filter: blur(20px) !important;
        padding: 8px !important;
    }
    .custom-dropdown-menu .ant-dropdown-menu-item {
        color: white !important;
        padding: 8px 4px !important;
        margin: 4px 0 !important;
        border-radius: 8px !important;
    }
    .custom-pagination .ant-pagination-item {
        background: linear-gradient(135deg, #0766FF20, #00DCFF10) !important;
        border: 1px solid #0766FF40 !important;
        border-radius: 8px !important;
    }
    .custom-pagination .ant-pagination-item a {
        color: #00DCFF !important;
        font-weight: 600 !important;
    }
    .custom-pagination .ant-pagination-item-active {
        background: linear-gradient(135deg, #0766FF, #00DCFF) !important;
        border-color: #00DCFF !important;
        box-shadow: 0 4px 20px rgba(7, 102, 255, 0.4) !important;
    }
    .custom-pagination .ant-pagination-item-active a {
        color: white !important;
    }
    .custom-pagination .ant-pagination-prev, .custom-pagination .ant-pagination-next {
        background: linear-gradient(135deg, #0766FF20, #00DCFF10) !important;
        border: 1px solid #0766FF40 !important;
        border-radius: 8px !important;
    }
    .custom-pagination .ant-pagination-prev:hover, .custom-pagination .ant-pagination-next:hover {
        background: linear-gradient(135deg, #0766FF40, #00DCFF20) !important;
    }
    @keyframes animate-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
    }
    .animate-reverse {
        animation-direction: reverse;
    }
    @media (max-width: 640px) {
        .custom-dark-table .ant-table-thead > tr > th {
            padding: 12px 6px !important;
            font-size: 11px !important;
        }
        .custom-dark-table .ant-table-tbody > tr > td {
            padding: 12px 6px !important;
        }
        .custom-pagination .ant-pagination-item {
            min-width: 28px !important;
            height: 28px !important;
            line-height: 26px !important;
            margin-right: 4px !important;
        }
        .custom-pagination .ant-pagination-prev,
        .custom-pagination .ant-pagination-next {
            min-width: 28px !important;
            height: 28px !important;
            line-height: 26px !important;
        }
        .custom-dropdown-menu .ant-dropdown-menu {
            min-width: 180px !important;
        }
        /* Reduce padding of the main table container */
        .custom-dark-table {
            padding-left: 2px !important;
            padding-right: 2px !important;
        }
    }
    @media (max-width: 350px) {
        .custom-dark-table .ant-table-thead > tr > th {
            padding: 6px 2px !important;
            font-size: 10px !important;
        }
        .custom-dark-table .ant-table-tbody > tr > td {
            padding: 6px 2px !important;
        }
        /* Reduce padding of the main table container even more */
        .custom-dark-table {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }
        /* Make action button smaller */
        .custom-dark-table .ant-btn {
            min-width: 24px !important;
            height: 24px !important;
            font-size: 14px !important;
        }
    }
`}</style>
        </div>
    );
};

export default ThreadsManagement;