import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Grand Hotel</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/customer/login" className="text-white/80 hover:text-white transition-colors duration-300 px-4 py-2">Customer Login</Link>
              <Link href="/admin/login" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm">Admin Portal</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Grand Hotel
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience luxury redefined with our premium accommodations, exquisite dining, and traditional sweets in a world-class hospitality setting
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/rooms" className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10">Book Your Stay</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link href="/restaurant" className="group relative backdrop-blur-md bg-white/10 border border-white/20 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                Explore Dining
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Our Premium</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">Discover our world-class hospitality services designed to exceed your expectations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Room Booking */}
            <div className="group relative backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-3xl hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15v4m8-4v4M8 11h8" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Luxury Accommodations</h3>
                <p className="text-white/80 mb-8 text-center leading-relaxed">
                  Choose from Premium, Deluxe, and Suite rooms with modern amenities and breathtaking views
                </p>
                <div className="text-center">
                  <Link href="/rooms" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Explore Rooms
                  </Link>
                </div>
              </div>
            </div>

            {/* Restaurant */}
            <div className="group relative backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-3xl hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Gourmet Dining</h3>
                <p className="text-white/80 mb-8 text-center leading-relaxed">
                  Savor exquisite cuisine crafted by our master chefs with fresh ingredients and authentic flavors
                </p>
                <div className="text-center">
                  <Link href="/restaurant" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    View Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Sweets */}
            <div className="group relative backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-3xl hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 15.546V12a9 9 0 018.546-8.946A1.5 1.5 0 0113 4.5v3a6 6 0 106 6v3a1.5 1.5 0 01-1.5 1.5h-.546z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Artisan Sweets</h3>
                <p className="text-white/80 mb-8 text-center leading-relaxed">
                  Indulge in traditional sweets made fresh daily, perfect for celebrations and special moments
                </p>
                <div className="text-center">
                  <Link href="/sweets" className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Sweet Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">Secure online payments and QR code options</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Service</h3>
              <p className="text-gray-600 text-sm">Fast ordering and delivery options</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Service</h3>
              <p className="text-gray-600 text-sm">Premium amenities and excellent hospitality</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile OTP</h3>
              <p className="text-gray-600 text-sm">Secure authentication for all bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="text-xl font-bold">Grand Hotel</span>
              </div>
              <p className="text-gray-400">Experience luxury and comfort with our premium services.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/rooms" className="hover:text-white">Room Booking</Link></li>
                <li><Link href="/restaurant" className="hover:text-white">Restaurant</Link></li>
                <li><Link href="/sweets" className="hover:text-white">Sweets</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/customer/login" className="hover:text-white">Customer Login</Link></li>
                <li><Link href="/admin/login" className="hover:text-white">Admin Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                123 Hotel Street<br />
                City, State 12345<br />
                Phone: +1 234 567 8900
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}