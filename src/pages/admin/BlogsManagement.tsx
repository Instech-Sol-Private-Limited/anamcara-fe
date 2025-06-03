import { useEffect, useState, useRef } from 'react';
import { FaEdit, FaPlus, FaTrash, FaEye, FaCalendar, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteBlog, getBlogs } from '../../utils/blogs';
import { useAuth } from '../../context/AuthProvider';
import DeleteBlogModal from '../../components/dialogs/DeleteBlogModal';
import blogImg from '/public/icons/admin/1.jpeg';
import { LoadingOutlined } from '@ant-design/icons';
import { useGlitterEffect } from "../../components/addons/useGlitterEffect";



interface Blog {
    id: string;
    title: string;
    description?: string;
    content: string;
    image_url?: string;
    posted_at?: string;
    views?: number;
    author_id?: string;
}

const BlogsManagement = () => {
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const { userData } = useAuth();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    // const buttonRef = useRef<HTMLButtonElement>(null);
    // const glitterRef = useRef<HTMLDivElement>(null);

    // useGlitterEffect(buttonRef, glitterRef);

    const handleDeleteClick = (blog: Blog) => {
        setBlogToDelete(blog);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!blogToDelete) return;

        try {
            setLoading(true);
            await deleteBlog(blogToDelete.id);
            setOffset(0);
            setBlogs([]);
            fetchBlogs(0, true);

            setSuccessMessage('Blog deleted successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            console.error('Error deleting blog:', err);
            setError('Failed to delete blog. Please try again.');
            setTimeout(() => setError(null), 3000);
        } finally {
            setLoading(false);
            setIsDeleteDialogOpen(false);
            setBlogToDelete(null);
        }
    };

    const handleCreateBlog = () => {
        navigate('/admin/blogs/create');
    };

    const handleEditBlog = (blogId: string) => {
        navigate(`/admin/blogs/edit/${blogId}`);
    };

    const handleViewBlog = (blogId: string) => {
        navigate(`/admin/blogs/blog-details/${blogId}`);
    };

    const handleLoadMore = () => {
        const newOffset = offset + limit;
        setOffset(newOffset);
        fetchBlogs(newOffset);
    };

    const fetchBlogs = async (currentOffset: number, reset: boolean = true) => {
        try {
            reset ? setLoading(true) : setLoadingMore(true);

            if (userData?.id) {
                const response: any = await getBlogs(currentOffset, limit, userData.id);

                if (response.success) {
                    const newBlogs = response.data?.blogs || [];

                    if (reset) {
                        setBlogs(newBlogs);
                    } else {
                        setBlogs(prev => [...prev, ...newBlogs]);
                    }

                    // If we get fewer blogs than the limit, there are no more to load
                    setHasMore(newBlogs.length === limit);
                } else {
                    setError(response.message || 'Failed to load blogs');
                }
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load blogs. Please try again later.');
        } finally {
            reset ? setLoading(false) : setLoadingMore(false);
        }
    };

    useEffect(() => {
        if (userData.id) {
            fetchBlogs(0, true);
        }
    }, [userData]);

useEffect(() => {
        const handleClick = () => setOpenMenuId(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div
            className="
                w-full rounded-2xl bg-[#111823]
                min-h-[calc(100vh-125px)]
                md:p-6 p-2
                sm:p-4
                flex flex-col
                max-w-full
            "
            style={{
                minHeight: 'calc(100vh - 80px)',
                height: '100%',
            }}
        >
            {/* Header Section */}
              <div className="flex flex-row items-center justify-between mb-4 gap-2 sm:gap-4 flex-wrap">
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Hexagon Icon Container */}
                    <div className="w-10 h-10 sm:w-14 sm:h-14 relative flex-shrink-0">
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-[#0766FF] to-[#00DCFF]"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                animation: 'pulse 2s ease-in-out infinite',
                                boxShadow: '0 0 15px rgba(0, 220, 255, 0.4)',
                            }}
                        />
                        <div
                            className="absolute inset-[4px] bg-[#0A0E1A] flex items-center justify-center overflow-hidden"
                            style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            }}
                        >
                            <img
                                src={blogImg}
                                alt="Blogs"
                                className="w-full h-full object-cover"
                                style={{
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                }}
                            />
                        </div>
                    </div>
                    {/* Heading */}
                   <div>
                        <h1 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-wider leading-tight">
                            MANAGE BLOGS
                        </h1>
                        <div className="text-cyan-300 text-xs sm:text-sm font-mono mt-1 opacity-80">
                            SYSTEM_STATUS: ONLINE
                        </div>
                    </div>
                </div>

              <div className="relative w-full sm:w-fit flex justify-end">
                    <button
                        onClick={handleCreateBlog}
                        className="relative group px-8 py-4 font-bold tracking-wide text-black transition-all duration-300 overflow-hidden font-mowaq
                            bg-gradient-to-r from-cyan-400 to-blue-400
                            rounded-xl
                            shadow
                            flex items-center justify-center
                            sm:px-8 sm:py-4
                            px-4 py-3
                        "
                        style={{
                            background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
                            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)',
                            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <FaPlus className="text-lg" />
                            <span className="hidden xs:inline sm:inline md:inline lg:inline xl:inline 2xl:inline
                                max-[400px]:hidden
                            ">
                                CREATE BLOG
                            </span>
                        </div>
                        {/* Glitter spark */}
                        <div
                            className="absolute w-16 h-16 rounded-full bg-white opacity-20 blur-md pointer-events-none z-10"
                            style={{
                                mixBlendMode: 'screen',
                                top: 0,
                                left: 0,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    </button>
                </div>
            </div>

            {/* Alert Messages */}
            {successMessage && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-xl text-green-300 backdrop-blur-sm">
                    {successMessage}
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-300 backdrop-blur-sm">
                    {error}
                </div>
            )}

            {/* Blog List */}
            {loading ? (
                <div className="flex flex-col justify-center items-center h-[60vh]">
                    <div className="relative">
                        <LoadingOutlined
                            style={{ fontSize: 48, color: '#00FFFF' }} // Same color as entity loader
                            spin
                        />
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
                    </div>
                    <div className="text-cyan-300 font-mono mt-4 text-lg">LOADING.BLOGS...</div>
                </div>
            ) : (
                <>
                    {blogs.length === 0 ? (
                        <div className="flex flex-col justify-center items-center h-[60vh]">
                            <div className="text-center">
                                <div className="text-6xl mb-4">📝</div>
                                <div className="text-cyan-300 font-mono text-xl mb-2">NO.BLOGS.FOUND</div>
                                <div className="text-gray-500 font-mono">Create your first blog post</div>
                            </div>
                        </div>
                    ) : (
                       <div
                            className="
                                space-y-3
                                overflow-y-auto
                                scrollbar-hide
                                max-h-[55vh]
                                sm:max-h-[60vh]
                                min-h-[200px]
                                sm:min-h-[300px]
                                px-0 sm:px-1
                            "
                            style={{
                                maxHeight: '55vh',
                                minHeight: '200px',
                            }}
                        >
                            {blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="group transition-all duration-300 relative rounded-xl"
                                >
                                    {/* Card Content */}
                                    <div
                                        className={`
                                            flex flex-col md:flex-row items-stretch min-h-24 sm:min-h-32
                                            overflow-hidden bg-[#111823]
                                            border border-[#00DCFF]/20 hover:border-[#00DCFF]/40
                                            shadow-lg hover:shadow-[#0766FF]/10
                                            transition-all duration-300 relative
                                        `}
                                        style={{
                                            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                                        }}
                                    >
                                        {/* Image Section */}
                                        {blog.image_url && (
                                            <div className="md:w-64 w-full h-40 md:h-auto overflow-hidden relative">
                                                <img
                                                    src={blog.image_url}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/256x128?text=Blog+Image';
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* Content Section */}
                                        <div className={`flex-1 p-2 xs:p-3 sm:p-6 flex flex-col justify-between bg-[#111823] ${!blog.image_url ? 'w-full' : ''}`}>
                                            <div>
                                                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 cursor-pointer hover:text-[#00DCFF] transition-colors duration-300 line-clamp-1 font-mowaq">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                                                    {blog.description || blog.content.substring(0, 150) + '...'}
                                                </p>
                                            </div>
                                            {/* Bottom Row */}
                                            <div className="flex justify-between items-center">
                                                {/* Left Side - Date and Views */}
                                                <div className="flex items-center gap-2 xs:gap-4 text-xs text-gray-500 flex-wrap">
                                                    <div className="flex items-center gap-1">
                                                        <FaCalendar className="text-[#0766FF]" />
                                                        {blog.posted_at ? new Date(blog.posted_at).toLocaleDateString() : 'Draft'}
                                                    </div>
                                                    {blog.views && (
                                                        <div className="flex items-center gap-1">
                                                            <FaEye className="text-[#00DCFF]" />
                                                            {blog.views.toLocaleString()}
                                                        </div>
                                                    )}
                                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${blog.posted_at
                                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                        }`}>
                                                        {blog.posted_at ? 'Published' : 'Draft'}
                                                    </div>
                                                </div>
                                                {/* Right Side - Action Buttons */}
                                                <div className="hidden xs:flex gap-2 max-[500px]:hidden">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewBlog(blog.id);
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-[#00DCFF] hover:bg-[#00DCFF]/10 rounded-lg transition-all duration-300"
                                                        title="View"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditBlog(blog.id);
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-[#0766FF] hover:bg-[#0766FF]/10 rounded-lg transition-all duration-300"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(blog);
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mobile: 3-dots menu (OUTSIDE overflow-hidden card) */}
                                    <div className="xs:hidden flex max-[500px]:flex absolute top-2 right-2 z-30">
                                        <button
                                            onClick={e => {
                                                e.stopPropagation();
                                                setOpenMenuId(openMenuId === blog.id ? null : blog.id);
                                            }}
                                            className="p-2 text-gray-400 hover:text-[#00DCFF] hover:bg-[#00DCFF]/10 rounded-lg transition-all duration-300"
                                            title="More"
                                        >
                                            <FaEllipsisV />
                                        </button>
                                        {openMenuId === blog.id && (
                                            <div
                                                className="absolute right-0 top-10 z-40 bg-[#181f2a] border border-[#00DCFF]/20 rounded-lg shadow-lg flex flex-col min-w-[120px] overflow-hidden"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                <button
                                                    onClick={() => {
                                                        setOpenMenuId(null);
                                                        handleViewBlog(blog.id);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-[#00DCFF]/10 hover:text-[#00DCFF] transition"
                                                >
                                                    <FaEye /> View
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setOpenMenuId(null);
                                                        handleEditBlog(blog.id);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-[#0766FF]/10 hover:text-[#0766FF] transition"
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setOpenMenuId(null);
                                                        handleDeleteClick(blog);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 transition"
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Load More Button */}
                    {blogs.length > 9 && hasMore && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="flex items-center px-8 py-3 bg-gradient-to-r from-[#0766FF] to-[#00DCFF] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#0766FF]/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loadingMore ? (
                                    <>
                                        <div className='w-5 h-5 rounded-full border-t-2 border-l-2 border-white animate-spin mr-2' />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        Load More
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </>
            )}


            <DeleteBlogModal
                isOpen={isDeleteDialogOpen}
                setIsOpen={setIsDeleteDialogOpen}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default BlogsManagement;