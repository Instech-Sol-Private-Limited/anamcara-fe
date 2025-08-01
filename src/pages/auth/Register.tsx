import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../utils/auth';
import referralService from '../../utils/Refferal';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await signUp(email, password, firstName, lastName, referralCode);
      if (response.status === 'verified') {
        toast.success(response.message);
        navigate('/auth/login');
      } else {
        setVerificationSent(true);
        toast.success(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlReferralCode = referralService.getReferralCodeFromUrl();
    const storedReferralCode = referralService.getStoredReferralCode();

    if (urlReferralCode) {
      setReferralCode(urlReferralCode);
      referralService.storeReferralCode(urlReferralCode);
    } else if (storedReferralCode) {
      setReferralCode(storedReferralCode);
    }
  }, []);

  if (verificationSent) {
    return (
      <>
        <h2 className="text-xl font-semibold text-white text-center mb-4">Verify Your Email</h2>

        <div className="bg-blue-900/30 border border-blue-500 text-blue-100 px-4 py-3 rounded-md mb-4">
          <p className="text-center">
            We've sent a verification link to <strong>{email}</strong>
          </p>
        </div>

        <div className="text-gray-300 text-sm mb-4">
          <p className="mb-2">Please check your inbox and click the verification link to complete your registration.</p>
          <p>If you don't see the email, check your spam folder.</p>
        </div>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => setVerificationSent(false)}
            className="text-[#A0FF06] hover:underline font-medium"
          >
            Back to registration
          </button>
          <span className="text-gray-400 mx-2">|</span>
          <Link to="/auth/login" className="text-[#A0FF06] hover:underline font-medium">
            Go to login
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-white text-center mb-3">Register</h2>

      {referralCode && (
        <div className="bg-green-900/30 border border-green-500 text-green-100 px-3 py-2 rounded-md mb-3 text-sm">
          🎉 You're signing up with a referral code: <strong>{referralCode}</strong>
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-100 px-3 py-2 rounded-md mb-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2 text-sm">
        <div className="flex space-x-2">
          <div className="w-1/2">
            <label htmlFor="firstName" className="block text-gray-300 mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#A0FF06]"
              required
            />
          </div>

          <div className="w-1/2">
            <label htmlFor="lastName" className="block text-gray-300 mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#A0FF06]"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#A0FF06]"
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#A0FF06]"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-8 text-gray-400 hover:text-white text-sm"
          >
            {showPassword ? '👁' : '🙈'}
          </button>
        </div>

        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-gray-300 mb-1">Confirm Password</label>
          <input
            type={showConfPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#A0FF06]"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowConfPassword(!showConfPassword)}
            className="absolute right-2 top-8 text-gray-400 hover:text-white text-sm"
          >
            {showConfPassword ? '👁' : '🙈'}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 bg-gray-700 hover:bg-[#A0FF06] text-white font-medium rounded-md transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="px-3 text-xs text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-400">Already have an account? </span>
        <Link to="/auth/login" className="text-[#A0FF06] hover:underline font-medium">
          Login
        </Link>
      </div>
    </>
  );
};

export default Register;