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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Grand Hotel</span>
            </Link>
            <nav className="flex space-x-6">
              <Link href="/restaurant" className="text-gray-600 hover:text-gray-900">Restaurant</Link>
              <Link href="/sweets" className="text-gray-600 hover:text-gray-900">Sweets</Link>
              <Link href="/customer/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Rooms</h1>
          <p className="text-lg text-gray-600">Choose from our collection of premium accommodations</p>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Check Availability</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="premium">Premium</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Check Availability
              </button>
            </div>
          </div>
        </div>

        {/* Room Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Premium Room</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Comfortable rooms with essential amenities and city views</p>
              <div className="text-2xl font-bold text-blue-600 mb-4">$150/night</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• WiFi & AC</li>
                <li>• TV & Mini Bar</li>
                <li>• City View</li>
                <li>• 24/7 Room Service</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Deluxe Room</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Spacious rooms with premium amenities and garden views</p>
              <div className="text-2xl font-bold text-green-600 mb-4">$250/night</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• All Premium Features</li>
                <li>• Private Balcony</li>
                <li>• Garden View</li>
                <li>• Premium Room Service</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Suite</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">Luxury suites with ocean views and premium amenities</p>
              <div className="text-2xl font-bold text-purple-600 mb-4">$450/night</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• All Deluxe Features</li>
                <li>• Separate Living Area</li>
                <li>• Ocean View</li>
                <li>• Jacuzzi & Premium Service</li>
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