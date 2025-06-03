import React, { useState, useRef, useEffect } from 'react';
import { FaUpload, FaImage, FaSpinner, FaTimes, FaCheckCircle } from 'react-icons/fa';
import supabase from '../../config/supabase';

interface ImageUploaderProps {
  initialImageUrl?: string;
  onImageUpload: (url: string) => void;
  onImageClear: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  initialImageUrl = '',
  onImageUpload,
  onImageClear
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [previewSrc, setPreviewSrc] = useState<string>(initialImageUrl);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImageUrl) {
      setPreviewSrc(initialImageUrl);
      setUploadSuccess(true);
    }
  }, [initialImageUrl]);


  const createLocalPreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewSrc(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const getConsistentUrl = (url: string): string => {

    const baseUrl = url.split('?')[0];

    return `${baseUrl}?t=${Date.now()}`;
  };

  const uploadToSupabase = async (file: File) => {
    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);
    setUploadSuccess(false);

    try {

      createLocalPreview(file);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `blog_images/${fileName}`;


      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 15);
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 300);


      const { error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);

      if (error) throw error;


      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        throw new Error('Failed to get public URL for uploaded image');
      }


      console.log('Uploaded Image URL:', publicUrlData.publicUrl);

      const consistentUrl = getConsistentUrl(publicUrlData.publicUrl);


      setPreviewSrc(consistentUrl);
      onImageUpload(consistentUrl);


      setUploadProgress(100);
      setUploadSuccess(true);

      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);

    } catch (error: any) {
      console.error('Error uploading image:', error);
      setUploadError(error.message || 'Failed to upload image');
      setIsUploading(false);
      setUploadProgress(0);
      setUploadSuccess(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;


    if (!file.type.includes('image/')) {
      setUploadError('Please select an image file');
      return;
    }


    if (file.size > 6 * 1024 * 1024) {
      setUploadError('Image size should be less than 6MB');
      return;
    }

    uploadToSupabase(file);
  };

  const handleClearImage = () => {
    setPreviewSrc('');
    setUploadError(null);
    setUploadSuccess(false);
    onImageClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageError = () => {

    if (!isUploading) {
      setUploadError('Image failed to load. Please try again or use a different image.');
    }
  };

 return (
    <div className="w-full">
      {previewSrc ? (
        <div className="relative mb-4">
          {/* Image Container with Cyberpunk Styling */}
          <div
            className="relative w-full h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 p-2 overflow-hidden"
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
            
            <img
              src={previewSrc}
              alt="Blog cover"
              className="w-full h-full object-cover"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
              }}
              onError={handleImageError}
            />

            {/* Upload Overlay */}
            {isUploading && (
              <div 
                className="absolute inset-0 bg-slate-900/80 flex items-center justify-center"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                }}
              >
                <div className="text-center">
                  <FaSpinner className="animate-spin mx-auto mb-2 text-cyan-400" size={24} />
                  <p className="text-cyan-100 font-mono text-sm tracking-wider">UPLOADING...</p>
                </div>
              </div>
            )}

            {/* Success Indicator */}
            {uploadSuccess && !isUploading && (
              <div
                className="absolute bottom-3 right-3 px-3 py-1 text-xs font-mono tracking-wider text-black flex items-center"
                style={{
                  background: 'linear-gradient(45deg, #00FFFF, #00CCFF',
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                  boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
                }}
              >
                <FaCheckCircle className="mr-1" />
                <span>UPLOADED</span>
              </div>
            )}

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

          {/* Clear Button */}
          <button
            onClick={handleClearImage}
            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 text-white flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
            }}
            type="button"
          >
            <FaTimes size={12} />
          </button>
        </div>
      ) : (
        <div className="mb-4">
          {/* No Image Container */}
          <div
            className="w-full h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-dashed border-cyan-500/30 flex items-center justify-center relative"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
              boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.05)'
            }}
          >
            {/* Glowing Border Effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 -z-10"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                filter: 'blur(4px)'
              }}
            />
            
            <div className="text-center text-cyan-400">
              <FaImage size={40} className="mx-auto mb-3 opacity-60" />
              <p className="font-mono text-sm tracking-wider mb-1">NO.IMAGE.SELECTED</p>
              <p className="text-xs text-cyan-300 font-mono tracking-wide mb-1">
                SUPPORTED: JPG | PNG | WEBP
              </p>
              <p className="text-xs text-cyan-500 font-mono tracking-wide">
                MAX.SIZE: 6MB
              </p>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4">
              <div className="w-full h-0.5 bg-cyan-400/50"></div>
              <div className="w-0.5 h-full bg-cyan-400/50"></div>
            </div>
            <div className="absolute bottom-2 right-2 w-4 h-4">
              <div className="w-full h-0.5 bg-cyan-400/50 absolute bottom-0"></div>
              <div className="w-0.5 h-full bg-cyan-400/50 absolute right-0"></div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Progress Bar */}
      {isUploading && (
        <div className="w-full mb-4">
          <div className="flex justify-between text-sm text-cyan-400 font-mono mb-2 tracking-wider">
            <span>UPLOAD.PROGRESS</span>
            <span>{uploadProgress}%</span>
          </div>
          <div
            className="w-full h-3 bg-slate-900 border border-cyan-500/30 relative overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ease-in-out relative"
              style={{ 
                width: `${uploadProgress}%`,
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
              }}
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div
          className="text-red-300 text-sm p-3 mb-4 bg-slate-900 border border-red-500/30 font-mono tracking-wide"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            boxShadow: 'inset 0 0 10px rgba(255, 0, 0, 0.1)'
          }}
        >
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
            ERROR: {uploadError}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex flex-col space-y-2">
        <div className="flex">
          <label
            className={`relative flex-1 flex items-center justify-center px-6 py-3 font-mono text-sm tracking-wider transition-all duration-300 cursor-pointer overflow-hidden ${
              isUploading || uploadSuccess 
                ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold'
            }`}
            style={{
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              boxShadow: isUploading || uploadSuccess ? 'none' : '0 0 20px rgba(0, 255, 255, 0.3)'
            }}
          >
            {/* Button glow effect */}
            {!isUploading && !uploadSuccess && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 -z-10"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                  filter: 'blur(4px)'
                }}
              />
            )}
            
            {isUploading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                UPLOADING.DATA...
              </>
            ) : uploadSuccess ? (
              <>
                <FaCheckCircle className="mr-2 text-cyan-400" />
                IMAGE.UPLOADED
              </>
            ) : (
              <>
                <FaUpload className="mr-2" />
                UPLOAD.IMAGE
              </>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={isUploading || uploadSuccess}
            />

            {/* Corner Accents for Button */}
            {!isUploading && !uploadSuccess && (
              <>
                <div className="absolute top-1 left-1 w-2 h-2">
                  <div className="w-full h-0.5 bg-black/50"></div>
                  <div className="w-0.5 h-full bg-black/50"></div>
                </div>
                <div className="absolute bottom-1 right-1 w-2 h-2">
                  <div className="w-full h-0.5 bg-black/50 absolute bottom-0"></div>
                  <div className="w-0.5 h-full bg-black/50 absolute right-0"></div>
                </div>
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;