'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'M3 10h11M9 21V3m11 11h-6' },  // Dashboard icon
    { path: '/users', label: 'Users', icon: 'M17 20h5v-1a7 7 0 00-14 0v1h5m-7 0H2v-1a7 7 0 0114 0v1h-5' },  // Users icon
  ];

  return (
    <aside
      className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none ${!isSidebarOpen ? '-translate-x-full lg:translate-x-0 lg:w-20' : ''
        }`}
    >
      {/* sidebar header */}
      <div className={`flex items-center justify-between flex-shrink-0 p-2 ${!isSidebarOpen ? 'lg:justify-center' : ''}`}>
        <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
          K<span className={!isSidebarOpen ? 'lg:hidden' : ''}>-WD</span>
        </span>
        <button onClick={toggleSidebar} className="p-2 rounded-md lg:hidden">
          <svg
            className="w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Sidebar links */}
      <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
        {menuItems.map((item) => item && (
          <div key={item.path}> {/* Wrap Link and SVG in a parent div */}
            <Link
              href={item.path}
              className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${pathname === item.path ? 'text-[#7F56D9]' : 'text-gray-500'} ${!isSidebarOpen ? 'justify-center' : ''
                }`}
            >
              <svg
                className={`w-6 h-6 ${pathname === item.path ? 'text-[#7F56D9]' : 'text-gray-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              <span className={!isSidebarOpen ? 'lg:hidden' : ''}>{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;