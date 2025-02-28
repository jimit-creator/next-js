"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove('authToken');

    // Redirect to login page
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex-shrink-0">
      <div className="h-full px-6 flex items-center justify-between">
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors"
          title="Log out"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header; 