import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, updateBlog, getBlogById } from '../../utils/blogs';
import { FaCheck, FaArrowLeft, FaSave, FaEye } from 'react-icons/fa';
import { Button, Card, Spin } from 'antd';
import blogImg from '/public/icons/admin/1.jpeg';
import ImageUploader from '../../components/addons/ImageUploder';
import BlogEditorPreview from '../../components/admin/BlogEditorPreview';
import { LoadingOutlined } from '@ant-design/icons';

interface BlogEditorProps {
  blogId?: string;
}

const CreateBlog: React.FC<BlogEditorProps> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const currentBlogId = params.id;
  const [formData, setFormData] = useState({
    content: '',
    description: '',
    id: '',
    image_url: '',
    title: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(!!currentBlogId);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    console.log(id, value);
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image_url: url,
    }));
  };

  const handleImageClear = () => {
    setFormData((prev) => ({
      ...prev,
      image_url: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!formData.title || !formData.content) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);

      const blogData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        image_url: formData.image_url,
        author_id: 'mock-user-id'
      };

      if (currentBlogId) {
        await updateBlog(String(currentBlogId), blogData);
        setSuccessMessage('Blog updated successfully!');
      } else {
        await createBlog(blogData);
        setSuccessMessage('Blog created successfully!');
      }

      setTimeout(() => {
        navigate('/admin/blogs');
      }, 1500);
    } catch (err) {
      console.error('Error saving blog:', err);
      setError('Failed to save blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        if (currentBlogId) {
          setInitialLoading(true);
          const response = await getBlogById(String(currentBlogId));
          if (response) {
            setFormData(response.data?.blog);
            setError(null);
          } else {
            throw new Error('Blog not found');
          }
        }
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog data. Please try again later.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchBlogData();
  }, [currentBlogId]);

  if (initialLoading) {
  return (
    <div className="flex justify-center items-center h-screen bg-[#050810]">
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <div className="relative">
          <LoadingOutlined
            style={{ fontSize: 48, color: '#00FFFF' }}
            spin
          />
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
        </div>
        <div className="text-cyan-300 font-mono mt-4 text-lg">
          LOADING.BLOGS...
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="relative w-full min-h-screen bg-[#050810] overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <div className="relative z-10 bg-[#0A0E1A] border-b-2 border-cyan-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Back Button */}
            <button
              onClick={() => navigate('/admin/blogs')}
              className="relative group px-4 py-2 font-mowaq font-bold tracking-wider text-cyan-400 transition-all duration-300 border border-cyan-500/50 hover:border-cyan-400 hover:text-cyan-300"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)',
                background: 'rgba(0, 255, 255, 0.05)'
              }}
            >
              <div className="flex items-center gap-2">
                <FaArrowLeft />
                <span>RETURN</span>
              </div>
            </button>

            {/* Title Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 relative">
                  {/* Outer glowing hexagon */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#0766FF] to-[#00DCFF]"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      animation: 'pulse 2s ease-in-out infinite',
                      boxShadow: '0 0 15px rgba(0, 220, 255, 0.4)',
                    }}
                  />
                  {/* Inner image holder */}
                  <div
                    className="absolute inset-[4px] bg-[#0A0E1A] flex items-center justify-center overflow-hidden"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                  >
                    <img
                      src={blogImg}
                      alt="Logo"
                      className="w-full h-full object-cover"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold font-mowaq text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-wider">
                  BLOG.COMPOSER
                </h1>
                <div className="text-cyan-300 text-sm font-mono mt-1 opacity-80">
                  SYSTEM_STATUS: ACTIVE | MODE: {currentBlogId ? 'EDIT' : 'CREATE'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        {/* Status Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-900/30 border-l-4 border-green-400 font-mowaq text-green-300">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>SUCCESS: {successMessage}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border-l-4 border-red-400 font-mowaq text-red-300">
            <div className="flex items-center gap-2">
              <span className="text-red-400">⚠</span>
              <span>ERROR: {error}</span>
            </div>
          </div>
        )}

        {/* Form Layout */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="relative">
              <div
                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/30 p-6 transition-all duration-500"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.05)'
                }}
              >
                {/* Panel Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-500/30">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                  <h2 className="text-xl font-mowaq font-bold text-cyan-300 tracking-wider">
                    INPUT.INTERFACE
                  </h2>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Title Field */}
                  <div>
                    <label className="block text-sm font-mowaq font-bold mb-2 text-cyan-300 tracking-wider">
                      TITLE.DESIGNATION *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0A0E1A] border border-cyan-500/50 text-cyan-100 font-mono focus:border-cyan-400 focus:outline-none transition-all duration-300"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                        boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.1)'
                      }}
                      placeholder="Enter blog title..."
                      required
                    />
                  </div>

                  {/* Description Field */}
                  <div>
                    <label className="block text-sm font-mowaq font-bold mb-2 text-cyan-300 tracking-wider">
                      DESCRIPTION.BRIEF
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0A0E1A] border border-cyan-500/50 text-cyan-100 font-mono focus:border-cyan-400 focus:outline-none transition-all duration-300"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                        boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.1)'
                      }}
                      placeholder="Brief description..."
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-mowaq font-bold mb-2 text-cyan-300 tracking-wider">
                      FEATURED.ASSET
                    </label>
                    <div
                      className="w-full bg-[#0A0E1A] border-2 border-cyan-500/50 transition-all duration-300"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                      }}
                    >
                      <ImageUploader
                        initialImageUrl={formData.image_url}
                        onImageUpload={handleImageUpload}
                        onImageClear={handleImageClear}
                      />
                    </div>
                  </div>

                  {/* Content Field */}
                  <div>
                    <label className="block text-sm font-mowaq font-bold mb-2 text-cyan-300 tracking-wider">
                      CONTENT.DATA *
                    </label>
                    <textarea
                      id="content"
                      value={formData.content}
                      onChange={handleChange}
                      rows={8}
                      className="w-full px-4 py-3 bg-[#0A0E1A] border border-cyan-500/50 text-cyan-100 font-mono focus:border-cyan-400 focus:outline-none transition-all duration-300 resize-none overflow-y-auto"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                        boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.1)'
                      }}
                      placeholder="Enter blog content..."
                      required
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="submit"
                      className="relative group px-8 py-4 font-mowaq font-bold tracking-wider text-black transition-all duration-300 overflow-hidden flex items-center gap-3"
                      style={{
                        background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
                        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)',
                        boxShadow: '0 0 20px rgba(239, 68, 68, 0.05)'
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <Spin size="small" />
                      ) : (
                        <FaCheck />
                      )}
                      <span>
                        {loading
                          ? (currentBlogId ? 'UPDATING...' : 'CREATING...')
                          : (currentBlogId ? 'UPDATE.BLOG' : 'DEPLOY.BLOG')
                        }
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/admin/blogs')}
                      className="px-6 py-4 font-mowaq font-bold tracking-wider text-red-400 border border-red-500/50 hover:border-red-400 hover:text-red-300 transition-all duration-300"
                      style={{
                        background: 'rgba(239, 68, 68, 0.05)',
                        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)'
                      }}
                    >
                      ABORT
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="relative">
              <div
                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/30 p-6 h-full transition-all duration-500"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.05)'
                }}
              >
                {/* Panel Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-500/30">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <h2 className="text-xl font-mowaq font-bold text-cyan-300 tracking-wider">
                    PREVIEW.RENDER
                  </h2>
                  <div className="ml-auto">
                    <FaEye className="text-cyan-400" />
                  </div>
                </div>

                {/* Preview Content */}
                <div className="space-y-4">
                  <div
                    className="bg-[#0A0E1A] p-4 border border-cyan-500/20 rounded"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                    }}
                  >
                    <BlogEditorPreview
                      title={formData.title}
                      description={formData.description}
                      content={formData.content}
                      imageUrl={formData.image_url}
                      showFullContent={true}
                    />
                  </div>

                  {!formData.title && !formData.content && (
                    <div className="text-center text-gray-500 font-mowaq py-12">
                      <div className="text-4xl mb-4">👁️</div>
                      <div>PREVIEW.AWAITING.INPUT</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default CreateBlog;