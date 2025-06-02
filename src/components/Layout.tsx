'use client';

import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-y-hidden bg-white">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 