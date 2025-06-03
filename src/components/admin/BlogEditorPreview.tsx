import React from 'react';
import { FaCalendarAlt, FaEye } from 'react-icons/fa';

interface BlogEditorPreviewProps {
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  showFullContent?: boolean;
}

const BlogEditorPreview: React.FC<BlogEditorPreviewProps> = ({
  title,
  description,
  content,
  imageUrl,
  showFullContent = false
}) => {
  // Format content for display
  const displayContent = content
    ? (showFullContent ? content : (content.length > 200 ? `${content.substring(0, 200)}...` : content))
    : 'Your blog content will appear here. Start typing in the content field to see a preview.';

  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden">
      {/* Blog Image */}
      {imageUrl && (
        <div
          className="w-full h-48 overflow-hidden border border-cyan-500/30 mb-4"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
            }}
            onError={(e) => {
              // If image fails to load, replace with placeholder
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Blog+Image';
            }}
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="relative">
        <div
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 p-6 relative w-full transition-all duration-300"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
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

          {/* Header with meta info */}
          <div className="flex items-center text-sm text-cyan-400 mb-4 font-mono">
            <div
              className="flex items-center mr-6 px-3 py-1 bg-[#0A0E1A] border border-cyan-500/30"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
              }}
            >
              <FaCalendarAlt className="mr-2 text-cyan-400" />
              <span className="tracking-wider">{new Date().toLocaleDateString()}</span>
            </div>
            <div
              className="flex items-center px-3 py-1 bg-[#0A0E1A] border border-cyan-500/30"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
              }}
            >
              <FaEye className="mr-2 text-cyan-400" />
              <span className="tracking-wider">0 VIEWS</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-mowaq tracking-wider leading-tight">
            {title || 'BLOG.TITLE.PREVIEW'}
          </h2>

          {/* Description */}
          {description && (
            <div
              className="mb-4 p-3 bg-[#0A0E1A] border-l-4 border-cyan-400"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
              }}
            >
              <p className="text-cyan-300 font-sans-serif text-sm italic tracking-wide">
                {description}
              </p>
            </div>
          )}

          {/* Content Preview */}
          <div
  className="bg-[#0A0E1A] p-4 border border-cyan-500/20 mb-4 overflow-y-auto custom-scroll"
  style={{
    maxHeight: '330px',
    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
    boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.1)'
  }}
>
  <div className="text-cyan-100 font-sans-serif text-sm whitespace-pre-line break-words w-full leading-relaxed">
    {displayContent}
  </div>
</div>

          {/* System Status Bar */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-cyan-500/30">
            <div className="flex items-center gap-2 text-xs font-mowaq text-cyan-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>PREVIEW.ACTIVE</span>
            </div>
            <div className="text-xs font-mono text-cyan-400 tracking-wider">
              SYSTEM.STATUS: READY
            </div>
          </div>

          {/* Preview Label */}
          <div
            className="absolute top-3 right-3 px-2 py-1 text-xs font-bold font-mono tracking-wider text-black"
            style={{
              background: 'linear-gradient(45deg, #00FFFF, #00CCFF)',
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
            }}
          >
            PREVIEW
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

        {/* Animated Scanning Line */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
          }}
        >
          <div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
            style={{
              animation: 'scan 3s ease-in-out infinite',
              top: '0%'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default BlogEditorPreview;