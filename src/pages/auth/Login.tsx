import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signinUser } from '../../utils/users';
import { signIn } from '../../utils/auth';
import { useAuth } from '../../context/AuthProvider';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await signIn(email, password)

      if (response.success) {
        if (response.data && response.data.session && response.data.session.access_token) {
          localStorage.setItem('access_token', response.data.session.access_token);
          navigate('/home')
          setAuthData({
            accessToken: response.data?.session.access_token || null,
            userId: response.data.session.user?.id || null,
            role: response.data.profile.role,
          })
          setSuccess(true);
        }

      } else {
        setError(response.message);
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-white text-center mb-4">Login</h2>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-100 px-3 py-2 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-800/30 border border-green-500 text-green-100 px-3 py-2 rounded-md mb-4 text-sm text-center">
          Login successful!{' '}
          <Link
            to="/home"
            className="text-[#A0FF06] hover:underline ml-2 font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#A0FF06]"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#A0FF06]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-gray-400 hover:text-white text-sm"
          >
            {showPassword ? '👁' : '🙈'}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 bg-gray-700 hover:bg-[#A0FF06] text-white font-medium rounded-md transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <div className="mb-2">
          <span className="text-gray-400">Don't have an account? </span>
          <Link to="/auth/register" className="text-[#A0FF06] hover:underline font-medium">
            Register
          </Link>
        </div>

        <div>
          <Link to="/auth/forgot-password" className="text-[#A0FF06] hover:underline font-medium">
            Forgot password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
