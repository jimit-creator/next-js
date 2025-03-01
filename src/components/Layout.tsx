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
      {/* Sidebar - 20% width */}
      
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    
      
      {/* Main content - 80% width */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 