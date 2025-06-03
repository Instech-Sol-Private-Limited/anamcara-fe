import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { IoMdClose } from "react-icons/io";
import { message, Avatar } from 'antd';
import supabase from '../../config/supabase';
import { formatDate } from "../../pages/admin";
import { LoadingOutlined } from '@ant-design/icons';

interface ThreadReportType {
    key: string;
    id: number;
    reason: string;
    description: string | null;
    reporter_username: string;
    reporter_avatar_url: string;
    created_at: string;
}

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    selectedThread: string;
}

const ThreadReportsModal: React.FC<ModalProps> = ({ isOpen, setIsOpen, selectedThread }) => {
    const [reports, setReports] = useState<ThreadReportType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchThreadReports = async () => {
        if (!selectedThread) {
            setReports([]);
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('thread_reports')
                .select(`
                    id,
                    reason,
                    description,
                    user_id,
                    created_at,
                    profiles!inner(avatar_url, first_name, last_name)
                `)
                .eq('thread_id', selectedThread)
                .order('created_at', { ascending: true });

            if (error) {
                throw error;
            }
            if (data) {
                const formattedReports: ThreadReportType[] = data.map((report: any) => ({
                    key: report.id,
                    id: report.id,
                    reason: report.reason,
                    description: report.description,
                    reporter_username: `${report.profiles?.first_name} ${report.profiles?.last_name}` || 'Unknown User',
                    reporter_avatar_url: report.profiles?.avatar_url || '',
                    created_at: formatDate(report.created_at),
                }));
                setReports(formattedReports);
            }
        } catch (error: any) {
            console.error('Error fetching thread reports:', error.message);
            message.error(`Failed to load reports: ${error.message}`);
            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && selectedThread) {
            fetchThreadReports();
        } else if (!isOpen) {
            setReports([]);
        }
    }, [isOpen, selectedThread]);

    return (
        <ModalWrapper
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            width="w-[750px] md:w-[600px] lg:w-[750px]"
        >
            <IoMdClose
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-400 hover:text-[#00DCFF] transition-colors duration-300 z-10"
            />

            <div className="p-6 pt-10">
                {/* Enhanced Header */}
                <div className="text-center mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-wider mb-2">
                        THREAD REPORTS
                    </h3>
                    {/* <div className="text-cyan-300 text-sm font-mono opacity-80 mb-2">
                        THREAD_ID: <span className="text-[#00DCFF] font-medium">{selectedThread}</span>
                    </div> */}
                    <div className="w-24 h-1 bg-gradient-to-r from-[#0766FF] to-[#00DCFF] mx-auto rounded-full"></div>
                </div>

                {loading ? (
                    <div className="flex flex-col justify-center items-center py-16">
                        <div className="relative mb-4">
                            <LoadingOutlined
                                style={{ fontSize: 48, color: '#00DCFF' }}
                                spin
                            />
                            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
                        </div>
                        <div className="text-cyan-300 font-mono text-lg tracking-wider">LOADING.REPORTS...</div>
                    </div>
                ) : reports.length === 0 ? (
                    <div className="flex flex-col justify-center items-center py-16">
                        <div className="text-6xl mb-4 opacity-50">🛡️</div>
                        <div className="text-cyan-300 font-mono text-xl mb-2 tracking-wider">NO.REPORTS.FOUND</div>
                        <div className="text-gray-500 font-mono text-sm">This thread has no reports</div>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                        {reports.map((report) => (
                            <div
                                key={report.key}
                                className="group cursor-pointer transition-all duration-300 relative"
                            >
                                {/* Animated glow border */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div
                                        className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-[#0766FF] via-[#00DCFF] to-[#0766FF] animate-pulse"
                                        style={{
                                            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                            maskComposite: 'xor',
                                            padding: '2px'
                                        }}
                                    />
                                </div>

                                <div
                                    className="bg-[#111823] p-4 border border-[#00DCFF]/20 hover:border-[#00DCFF]/40 shadow-lg hover:shadow-[#0766FF]/10 transition-all duration-300 relative overflow-hidden"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                                    }}
                                >
                                    {/* Header with Reason and Report ID */}
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-gradient-to-r from-[#0766FF] to-[#00DCFF] rounded-full animate-pulse"></div>
                                            <h4 className="text-white text-lg font-bold font-mowaq tracking-wider capitalize">
                                                REASON: <span className="text-[#00DCFF]">{report.reason}</span>
                                            </h4>
                                        </div>
                                        <div className="px-3 py-1 bg-gradient-to-r from-[#0766FF]/20 to-[#00DCFF]/20 border border-[#00DCFF]/30 rounded-full">
                                            {/* <span className="text-cyan-300 text-xs font-mono tracking-wider">
                                                ID: {report.id}
                                            </span> */}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4">
                                        <p className="text-gray-300 leading-relaxed">
                                            <span className="text-[#00DCFF] font-medium font-mono text-sm tracking-wider">DESCRIPTION:</span>{' '}
                                            <span className="text-gray-300">{report.description || 'N/A'}</span>
                                        </p>
                                    </div>

                                    {/* Reporter Info and Date */}
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <Avatar 
                                                    src={report.reporter_avatar_url} 
                                                    size="small"
                                                    className="border-2 border-[#00DCFF]/30"
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#111823]"></div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400 font-mono tracking-wider">REPORTED_BY:</div>
                                                <div className="text-[#00DCFF] font-medium text-sm tracking-wide">
                                                    {report.reporter_username}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-400 font-mono tracking-wider">TIMESTAMP:</div>
                                            <div className="text-cyan-300 text-sm font-mono">
                                                {report.created_at}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtle background pattern */}
                                    <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                                        <div className="w-full h-full bg-gradient-to-br from-[#0766FF] to-[#00DCFF] transform rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </ModalWrapper>
    );
};

export default ThreadReportsModal;