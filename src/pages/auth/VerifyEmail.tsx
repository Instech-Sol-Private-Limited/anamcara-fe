import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const searchParams = new URLSearchParams(location.search);
      const userEmail = searchParams.get('user');

      if (!userEmail) {
        setStatus('error');
        return;
      }

      setEmail(userEmail);
      setStatus('loading');

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL_LOCAL}/users/verify?email=${userEmail}`
        );

        if (response.status === 200) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="max-w-[500px] mx-auto mt-16 p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg text-center text-white">
      {status === 'loading' && (
        <>
          <h2 className="text-2xl font-semibold mb-3">Verifying Email...</h2>
          <p className="text-gray-300">Please wait while we verify your account.</p>
        </>
      )}

      {status === 'success' && (
        <>
          <h2 className="text-2xl font-semibold text-[#A0FF06] mb-2">🎉 Email Verified Successfully!</h2>
          <p className="text-gray-300 mb-4">
            Your email <strong className="text-white">{email}</strong> has been verified.
            You can now log in to your account.
          </p>
          <button
            onClick={() => navigate('/auth/login')}
            className="w-full py-2 bg-[#A0FF06] text-black font-medium rounded-md hover:bg-lime-400 transition"
          >
            Go to Login
          </button>
        </>
      )}

      {status === 'error' && (
        <>
          <h2 className="text-2xl font-semibold text-red-400 mb-2"> Verification Failed</h2>
          <p className="text-gray-300 mb-4">
            We couldn't verify your email. The link may be invalid or expired.
          </p>
          <button
            onClick={() => navigate('/auth/login')}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition"
          >
            Return to Login
          </button>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
