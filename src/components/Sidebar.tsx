"use client"; // Ensure this is a client component

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const pathname = usePathname();
  const isLoggedIn = !!Cookies.get('authToken'); // Check if the user is logged in

  const menuItems = [
    {
      title: 'Menu',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { path: '/users', label: 'Users', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      ]
    },
  ];

  return (
    <aside  className="h-screen bg-white border-r border-gray-200 overflow-hidden">
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-[#7F56D9]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl font-semibold text-gray-900">CRM</span>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)] p-4">
      {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.title}
            </h2>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${pathname === item.path
                      ? 'bg-[#F9F5FF] text-[#7F56D9]'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <svg
                    className={`h-5 w-5 ${pathname === item.path ? 'text-[#7F56D9]' : 'text-gray-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar; 