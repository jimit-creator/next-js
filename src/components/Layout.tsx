import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F9F5FF]">
      {/* Sidebar - 20% width */}
      <div className="w-[20%] flex-shrink-0">
        <Sidebar/>
      </div>
      
      {/* Main content - 80% width */}
      <div className="w-[80%] flex flex-col overflow-hidden">
        <Header/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 