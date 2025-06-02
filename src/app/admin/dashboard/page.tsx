'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalRooms: number;
  occupiedRooms: number;
  totalOrders: number;
  todayRevenue: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRooms: 0,
    occupiedRooms: 0,
    totalOrders: 0,
    todayRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // In a real application, you would fetch actual stats from the API
      // For demo purposes, we'll use sample data
      setStats({
        totalRooms: 15,
        occupiedRooms: 8,
        totalOrders: 24,
        todayRevenue: 3250.50,
        pendingOrders: 6,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">View Site</Link>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Admin Dashboard</h1>
          <p className="text-gray-600">Manage your hotel operations from here</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Room Occupancy</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.occupiedRooms}/{stats.totalRooms}</p>
                <p className="text-sm text-gray-500">{Math.round((stats.occupiedRooms / stats.totalRooms) * 100)}% occupied</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Today's Revenue</h3>
                <p className="text-2xl font-bold text-green-600">${stats.todayRevenue.toFixed(2)}</p>
                <p className="text-sm text-gray-500">All bookings & orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
                <p className="text-2xl font-bold text-orange-600">{stats.totalOrders}</p>
                <p className="text-sm text-gray-500">Food & sweets orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Orders</h3>
                <p className="text-2xl font-bold text-red-600">{stats.pendingOrders}</p>
                <p className="text-sm text-gray-500">Requires attention</p>
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Room Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Room Management</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage room availability, bookings, and pricing</p>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">View All Rooms</button>
              <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">Manage Bookings</button>
              <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">Update Pricing</button>
            </div>
          </div>

          {/* Food Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Restaurant Management</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage menu items, categories, and orders</p>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg">Manage Menu</button>
              <button className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg">View Orders</button>
              <button className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg">Update Inventory</button>
            </div>
          </div>

          {/* Sweets Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 15.546V12a9 9 0 018.546-8.946A1.5 1.5 0 0113 4.5v3a6 6 0 106 6v3a1.5 1.5 0 01-1.5 1.5h-.546z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Sweets Management</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage sweets inventory and orders</p>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg">Manage Sweets</button>
              <button className="w-full text-left px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg">View Orders</button>
              <button className="w-full text-left px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg">Update Stock</button>
            </div>
          </div>

          {/* Staff Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Staff Management</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage staff accounts and permissions</p>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg">View Staff</button>
              <button className="w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg">Add Staff</button>
              <button className="w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg">Manage Permissions</button>
            </div>
          </div>

          {/* Discount Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Discount Coupons</h3>
            </div>
            <p className="text-gray-600 mb-4">Create and manage discount coupons</p>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">View Coupons</button>
              <button className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">Create Coupon</button>
              <button className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">Usage Reports</button>
            </div>
          </div>

          {/* Reports & Analytics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Reports & Analytics</h3>
            </div>
            <p className="text-gray-600 mb-4">View business intelligence reports</p>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">Sales Reports</button>
              <button className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">Occupancy Reports</button>
              <button className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">Export Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}