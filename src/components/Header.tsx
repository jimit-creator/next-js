"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove('authToken');
    // Redirect to login page
    router.push('/login');
  };

  return (
    <header className="flex-shrink-0 border-b">
      <div className="flex items-center justify-between p-2">
        {/* Navbar left */}
        <div className="flex items-center space-x-3">
          <span className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">K-WD</span>
          {/* Toggle sidebar button */}
          <button onClick={toggleSidebar} className="p-2 rounded-md focus:outline-none focus:ring">
            <svg
              className={`w-4 h-4 text-gray-600 ${isSidebarOpen ? 'transform transition-transform -rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* Navbar right */}
        <div className="relative flex items-center space-x-3">
          {/* avatar button */}
          <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring">
              <img
                className="object-cover w-8 h-8 rounded-full"
                src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                alt="Ahmed Kamel"
              />
            </button>
            {/* Dropdown card */}
            {isOpen && (
              <div
                className="absolute mt-3 transform -translate-x-full bg-white rounded-md shadow-lg min-w-max"
              >
                <div className="flex flex-col p-4 space-y-1 font-medium border-b">
                  <span className="text-gray-800">Ahmed Kamel</span>
                  <span className="text-sm text-gray-400">ahmed.kamel@example.com</span>
                </div>
                <div className="flex items-center justify-center p-4 text-blue-700 underline border-t">
                  <a href='#' onClick={handleLogout}>Logout</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 