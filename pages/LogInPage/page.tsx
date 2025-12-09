'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, User, LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation: Check username is not empty
    if (username.trim().length === 0) {
      setError('Please enter a username');
      return;
    }

    // Simulate login process
    setIsLoading(true);

    setTimeout(() => {
      // Store username in localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('isLoggedIn', 'true');

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('userLoggedIn'));

      // Redirect to home page
      router.push('/');
    }, 1000);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError(''); // Clear error when user types
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/winter-home1.jpg)',
      }}
    >
      {/* Overlay for better form visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-white drop-shadow-lg mb-2">Peakster</div>
          <p className="text-white text-lg drop-shadow-md">Welcome back! Please login to continue.</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>

          <form onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    error
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-[#C41E3A] focus:border-[#C41E3A]'
                  }`}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <p className="text-sm text-red-800 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || username.trim().length === 0}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors flex items-center justify-center gap-2 ${
                isLoading || username.trim().length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#C41E3A] hover:bg-[#A01830]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-white drop-shadow-md">
          <p>Don't have an account? Just enter any username to get started!</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
