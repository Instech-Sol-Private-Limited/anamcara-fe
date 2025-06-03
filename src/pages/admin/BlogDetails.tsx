import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiEye, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';
import { deleteBlog, getBlogById } from '../../utils/blogs';
import DeleteBlogModal from '../../components/dialogs/DeleteBlogModal';
import { toast } from 'react-toastify';
import BlogPostWithComments from '../../components/admin/BlogPostWithComments';
import { LoadingOutlined } from '@ant-design/icons';

interface Blog {
    id: string;
    title: string;
    description?: string;
    content: string;
    image_url?: string;
    posted_at?: string;
    views?: number;
    author_id?: string;
    profiles?: {
        first_name: string;
        last_name: string;
        avatar_url?: string;
    };
}

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDeleteConfirm = async () => {
        if (!id) return;

        try {
            const response = await deleteBlog(id);
            if (response.success) {
                // @ts-ignore
                toast.success(response.data?.message || "Blog deleted successfully!");
                navigate('/admin/blogs');
            } else {
                toast.error(response.error || "Failed to delete blog");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the blog");
        } finally {
            setIsDeleteOpen(false);
        }
    };

    const handleEdit = () => {
        if (!blog) return;
        navigate(`/admin/blogs/edit/${blog.id}`);
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                setError(null);

                if (id) {
                    const response = await getBlogById(id);
                    if (response.success) {
                        // @ts-ignore
                        setBlog(response.data?.blog);
                    } else {
                        setError('Failed to load blog');
                    }
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                setError('An error occurred while loading the blog');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return (
        <div className="w-full rounded-2xl bg-[#111823] min-h-[calc(100vh-125px)] flex items-center justify-center">
            <div className="flex flex-col justify-center items-center">
                <div className="relative">
                    <LoadingOutlined
                        style={{ fontSize: 48, color: '#00FFFF' }}
                        spin
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
                </div>
                <div className="text-cyan-300 font-mono mt-4 text-lg tracking-wider">LOADING.BLOG.DATA...</div>
                <div className="text-cyan-500 font-mono text-sm mt-1">SYSTEM.STATUS: PROCESSING</div>
            </div>
        </div>
    );

    if (error) return (
        <div className="w-full rounded-2xl bg-[#111823] min-h-[calc(100vh-125px)] flex items-center justify-center p-6">
            <div className="text-center">
                <div
                    className="mb-6 p-6 bg-red-900/20 border border-red-500/30 backdrop-blur-sm relative"
                    style={{
                        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                        boxShadow: 'inset 0 0 20px rgba(255, 0, 0, 0.1)'
                    }}
                >
                    <div className="text-red-300 font-mono text-lg mb-4 tracking-wider">ERROR.DETECTED</div>
                    <p className="text-red-400 mb-4">{error}</p>
                    
                    {/* Corner Accents */}
                    <div className="absolute top-1 left-1 w-3 h-3">
                        <div className="w-full h-0.5 bg-red-400"></div>
                        <div className="w-0.5 h-full bg-red-400"></div>
                    </div>
                    <div className="absolute bottom-1 right-1 w-3 h-3">
                        <div className="w-full h-0.5 bg-red-400 absolute bottom-0"></div>
                        <div className="w-0.5 h-full bg-red-400 absolute right-0"></div>
                    </div>
                </div>
                
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 font-mowaq tracking-wider text-black font-bold transition-all duration-300"
                    style={{
                        background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                    }}
                >
                    RETURN.BACK
                </button>
            </div>
        </div>
    );

    if (!blog) return (
        <div className="w-full rounded-2xl bg-[#111823] min-h-[calc(100vh-125px)] flex items-center justify-center p-6">
            <div className="text-center">
                <div
                    className="mb-6 p-6 bg-yellow-900/20 border border-yellow-500/30 backdrop-blur-sm relative"
                    style={{
                        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                        boxShadow: 'inset 0 0 20px rgba(255, 255, 0, 0.1)'
                    }}
                >
                    <div className="text-yellow-300 font-mono text-lg mb-4 tracking-wider">BLOG.NOT.FOUND</div>
                    <p className="text-yellow-400 mb-4">The requested blog data could not be located</p>
                    
                    {/* Corner Accents */}
                    <div className="absolute top-1 left-1 w-3 h-3">
                        <div className="w-full h-0.5 bg-yellow-400"></div>
                        <div className="w-0.5 h-full bg-yellow-400"></div>
                    </div>
                    <div className="absolute bottom-1 right-1 w-3 h-3">
                        <div className="w-full h-0.5 bg-yellow-400 absolute bottom-0"></div>
                        <div className="w-0.5 h-full bg-yellow-400 absolute right-0"></div>
                    </div>
                </div>
                
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 font-mono tracking-wider text-black font-bold transition-all duration-300"
                    style={{
                        background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                    }}
                >
                    RETURN.BACK
                </button>
            </div>
        </div>
    );

    return (
        <>
            <div className='w-full rounded-2xl bg-[#111823] min-h-[calc(100vh-125px)] py-8 px-4 sm:px-6 lg:px-8'>
                {/* Back button */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/admin/blogs')}
                        className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-mowaq tracking-wider group"
                    >
                        <div
                            className="flex items-center px-4 py-2 bg-[#0A0E1A] border border-cyan-500/30 group-hover:border-cyan-500/50 transition-all duration-300"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                            }}
                        >
                            <FiArrowLeft className="h-5 w-5 mr-2" />
                            BACK.TO.BLOGS
                        </div>
                    </button>
                </div>

                {/* Blog header */}
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-wider mb-3">
                                {blog.title}
                            </h1>
                            {blog.description && (
                                <div
                                    className="p-4 bg-[#0A0E1A] border-l-4 border-cyan-400 max-w-3xl relative"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
                                    }}
                                >
                                    <p className="text-lg text-cyan-300 font-sans-serif italic tracking-wide">
                                        {blog.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleEdit}
                                className="p-3 bg-[#0A0E1A] border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all duration-300 group"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                                }}
                                title="Edit Blog"
                            >
                                <FiEdit2 className="text-xl" />
                            </button>

                            <button
                                onClick={() => setIsDeleteOpen(true)}
                                className="p-3 bg-[#0A0E1A] border border-red-500/30 text-red-400 hover:text-red-300 hover:border-red-500/50 transition-all duration-300 group"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                                }}
                                title="Delete Blog"
                            >
                                <FiTrash2 className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Meta information */}
                    <div className="flex flex-wrap items-center gap-6">
                        {/* Author Info */}
                        <div
                            className="flex items-center p-3 bg-[#0A0E1A] border border-cyan-500/30"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                            }}
                        >
                            {blog.profiles?.avatar_url ? (
                                <div className="relative w-10 h-10 mr-3">
                                    <img
                                        src={blog.profiles.avatar_url}
                                        alt={`${blog.profiles.first_name} ${blog.profiles.last_name}`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Author';
                                        }}
                                    />
                                </div>
                            ) : (
                                <div 
                                    className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center mr-3"
                                    style={{
                                        clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                                    }}
                                >
                                    <FiUser className="h-5 w-5 text-cyan-400" />
                                </div>
                            )}
                            <div>
                                <span className="block text-cyan-300 font-medium font-mono tracking-wide">
                                    {blog.profiles?.first_name} {blog.profiles?.last_name}
                                </span>
                                <span className="text-xs text-cyan-500 font-mono">AUTHOR</span>
                            </div>
                        </div>

                        {/* Date Info */}
                        {blog.posted_at && (
                            <div
                                className="flex items-center p-3 bg-[#0A0E1A] border border-cyan-500/30"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                                }}
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center mr-3"
                                    style={{
                                        clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                                    }}
                                >
                                    <FiCalendar className="h-5 w-5 text-cyan-400" />
                                </div>
                                <div>
                                    <span className="block text-cyan-300 font-medium font-mono tracking-wide">
                                        {new Date(blog.posted_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span className="text-xs text-cyan-500 font-mono">PUBLISHED</span>
                                </div>
                            </div>
                        )}

                        {/* Views Info */}
                        <div
                            className="flex items-center p-3 bg-[#0A0E1A] border border-cyan-500/30"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                            }}
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center mr-3"
                                style={{
                                    clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                                }}
                            >
                                <FiEye className="h-5 w-5 text-cyan-400" />
                            </div>
                            <div>
                                <span className="block text-cyan-300 font-medium font-mono tracking-wide">
                                    {blog.views?.toLocaleString() || 0}
                                </span>
                                <span className="text-xs text-cyan-500 font-mono">VIEWS</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured image */}
                {blog.image_url && (
                    <div className="mb-10 relative">
                        <div
                            className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 p-3 overflow-hidden"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
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
                            
                            <img
                                src={blog.image_url}
                                alt={blog.title}
                                className="w-full h-auto max-h-[500px] object-cover"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                                }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Blog+Image';
                                }}
                            />

                            {/* Corner Accents */}
                            <div className="absolute top-2 left-2 w-4 h-4">
                                <div className="w-full h-0.5 bg-cyan-400"></div>
                                <div className="w-0.5 h-full bg-cyan-400"></div>
                            </div>
                            <div className="absolute bottom-2 right-2 w-4 h-4">
                                <div className="w-full h-0.5 bg-cyan-400 absolute bottom-0"></div>
                                <div className="w-0.5 h-full bg-cyan-400 absolute right-0"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Blog content */}
                <div className="relative">
                    <div
                        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 p-8 relative"
                        style={{
                            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
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

                        {/* Content Label */}
                        <div
                            className="absolute top-3 right-3 px-3 py-1 text-xs font-bold font-mono tracking-wider text-black"
                            style={{
                                background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
                                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                                boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                            }}
                        >
                            CONTENT
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <div className="text-cyan-100 leading-relaxed space-y-6 font-sans-serif">
                                {blog.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-lg">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-2 left-2 w-4 h-4">
                            <div className="w-full h-0.5 bg-cyan-400"></div>
                            <div className="w-0.5 h-full bg-cyan-400"></div>
                        </div>
                        <div className="absolute bottom-2 right-2 w-4 h-4">
                            <div className="w-full h-0.5 bg-cyan-400 absolute bottom-0"></div>
                            <div className="w-0.5 h-full bg-cyan-400 absolute right-0"></div>
                        </div>
                    </div>

                    {/* System Status Bar */}
                    <div
                        className="flex items-center justify-between mt-4 p-3 bg-[#0A0E1A] border border-cyan-500/30"
                        style={{
                            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                        }}
                    >
                        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>CONTENT.LOADED</span>
                        </div>
                        <div className="text-xs font-mono text-cyan-400 tracking-wider">
                            SYSTEM.STATUS: READY
                        </div>
                    </div>
                </div>
            </div>

            <BlogPostWithComments id={id} />
            
            {/* Delete confirmation modal */}
            <DeleteBlogModal
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default BlogDetails;