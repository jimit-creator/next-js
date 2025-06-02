'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Room {
  id: number;
  roomNumber: string;
  roomType: 'premium' | 'deluxe' | 'suite';
  price: string;
  description: string;
  amenities: string[];
  isAvailable: boolean;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms');
      if (response.ok) {
        const data = await response.json();
        setRooms(data.map((room: any) => ({
          ...room,
          amenities: JSON.parse(room.amenities || '[]')
        })));
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(room => 
    selectedType === 'all' || room.roomType === selectedType
  );

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'deluxe': return 'bg-green-100 text-green-800';
      case 'suite': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Grand Hotel</span>
            </Link>
            <nav className="flex space-x-6 items-center">
              <Link href="/restaurant" className="text-white/80 hover:text-white transition-colors duration-300">Restaurant</Link>
              <Link href="/sweets" className="text-white/80 hover:text-white transition-colors duration-300">Sweets</Link>
              <Link href="/customer/login" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Luxury
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Accommodations
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">Choose from our exquisite collection of premium rooms designed for ultimate comfort and luxury</p>
        </div>

        {/* Booking Form */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 mb-16 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Check Availability</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">Check-in Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">Check-out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">Room Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              >
                <option value="all" className="bg-slate-800">All Types</option>
                <option value="premium" className="bg-slate-800">Premium</option>
                <option value="deluxe" className="bg-slate-800">Deluxe</option>
                <option value="suite" className="bg-slate-800">Suite</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
                Check Availability
              </button>
            </div>
          </div>
        </div>

        {/* Room Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="group relative backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl overflow-hidden hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Premium Room</h3>
              </div>
              <p className="text-white/80 mb-6 text-center leading-relaxed">Comfortable rooms with essential amenities and stunning city views</p>
              <div className="text-3xl font-bold text-blue-400 mb-6 text-center">$150<span className="text-lg text-white/60">/night</span></div>
              <ul className="text-white/80 space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>High-Speed WiFi & AC</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Smart TV & Mini Bar</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Panoramic City View</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>24/7 Premium Service</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="group relative backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl overflow-hidden hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Deluxe Room</h3>
              </div>
              <p className="text-white/80 mb-6 text-center leading-relaxed">Spacious rooms with premium amenities and serene garden views</p>
              <div className="text-3xl font-bold text-emerald-400 mb-6 text-center">$250<span className="text-lg text-white/60">/night</span></div>
              <ul className="text-white/80 space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  <span>All Premium Features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  <span>Private Garden Balcony</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  <span>Tranquil Garden View</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  <span>Premium Concierge Service</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="group relative backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl overflow-hidden hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Luxury Suite</h3>
              </div>
              <p className="text-white/80 mb-6 text-center leading-relaxed">Ultra-luxury suites with breathtaking ocean views and exclusive amenities</p>
              <div className="text-3xl font-bold text-purple-400 mb-6 text-center">$450<span className="text-lg text-white/60">/night</span></div>
              <ul className="text-white/80 space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>All Deluxe Features</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Separate Living Area</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Panoramic Ocean View</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Private Jacuzzi & Butler</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Available Rooms */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-32 ${room.roomType === 'premium' ? 'bg-blue-100' : room.roomType === 'deluxe' ? 'bg-green-100' : 'bg-purple-100'} flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">Room {room.roomNumber}</div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoomTypeColor(room.roomType)}`}>
                      {room.roomType.charAt(0).toUpperCase() + room.roomType.slice(1)}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xl font-bold text-gray-900">${room.price}/night</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {room.isAvailable ? 'Available' : 'Occupied'}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1">Amenities:</div>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs text-gray-500">+{room.amenities.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    disabled={!room.isAvailable}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      room.isAvailable 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {room.isAvailable ? 'Book Now' : 'Not Available'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No rooms available for the selected criteria</div>
          </div>
        )}
      </div>
    </div>
  );
}