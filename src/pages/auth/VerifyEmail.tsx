import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession } from '../../utils/auth';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'verified' | 'unverified'>('loading');

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const { success } = await getSession();
        setStatus(success ? 'verified' : 'unverified');
        
        if (success) {
          setTimeout(() => navigate('/home'), 1500);
        }
      } catch (error) {
        console.error('Verification check error:', error);
        setStatus('unverified');
      }
    };

    checkVerification();
  }, [navigate]);

  if (status === 'loading') {
    return (
      <div className="text-center p-6">
        <div className="inline-flex space-x-2 p-4">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="w-2 h-2 bg-[#A0FF06] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <p className="text-gray-400">Checking verification status...</p>
      </div>
    );
  }

  if (status === 'verified') {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold text-[#A0FF06] mb-2">Email Verified</h2>
        <p className="text-gray-300">Redirecting you to home page...</p>
      </div>
    );
  }

  return (
    <div className="text-center p-6">
      <h2 className="text-xl font-semibold mb-3">Verification Needed</h2>
      <p className="text-gray-300 mb-4">
        Your email verification link has expired or is invalid.
      </p>
      <button
        onClick={() => navigate('/auth/register')}
        className="px-4 py-2 bg-[#A0FF06] hover:bg-lime-400 text-black rounded-md"
      >
        Register Again
      </button>
    </div>
  );
};

export default VerifyEmail;