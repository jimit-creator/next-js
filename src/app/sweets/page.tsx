'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SweetsCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

interface SweetsItem {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  pricePerKg: string;
  image: string | null;
  isAvailable: boolean;
  category: SweetsCategory;
}

interface CartItem {
  id: number;
  name: string;
  pricePerKg: number;
  weight: number; // in kg
  totalPrice: number;
}

export default function SweetsPage() {
  const [categories, setCategories] = useState<SweetsCategory[]>([]);
  const [sweetsItems, setSweetsItems] = useState<SweetsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, itemsRes] = await Promise.all([
        fetch('/api/sweets/categories'),
        fetch('/api/sweets/items')
      ]);

      if (categoriesRes.ok && itemsRes.ok) {
        const categoriesData = await categoriesRes.json();
        const itemsData = await itemsRes.json();
        
        setCategories(categoriesData);
        setSweetsItems(itemsData);
        
        if (categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: SweetsItem, weight: number) => {
    const pricePerKg = parseFloat(item.pricePerKg);
    const totalPrice = pricePerKg * weight;
    
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { 
              ...cartItem, 
              weight: cartItem.weight + weight,
              totalPrice: (cartItem.weight + weight) * pricePerKg
            }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        id: item.id,
        name: item.name,
        pricePerKg,
        weight,
        totalPrice
      }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateCartWeight = (itemId: number, weight: number) => {
    if (weight <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId 
          ? { ...item, weight, totalPrice: item.pricePerKg * weight }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const filteredItems = selectedCategory
    ? sweetsItems.filter(item => item.categoryId === selectedCategory && item.isAvailable)
    : sweetsItems.filter(item => item.isAvailable);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full"></div>
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
              <span className="text-xl font-bold text-gray-900">Grand Hotel Sweets</span>
            </Link>
            <nav className="flex space-x-6 items-center">
              <Link href="/rooms" className="text-gray-600 hover:text-gray-900">Rooms</Link>
              <Link href="/restaurant" className="text-gray-600 hover:text-gray-900">Restaurant</Link>
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5" />
                </svg>
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Traditional Sweets</h1>
          <p className="text-lg text-gray-600">Authentic Indian sweets made fresh daily</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === null
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Sweets
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sweets Items */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <SweetsCard key={item.id} item={item} onAddToCart={addToCart} />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No sweets available in this category</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Order</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500">Your cart is empty</div>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">${item.pricePerKg}/kg</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateCartWeight(item.id, Math.max(0.25, item.weight - 0.25))}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="w-16 text-center">{item.weight}kg</span>
                            <button
                              onClick={() => updateCartWeight(item.id, item.weight + 0.25)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                          <div className="font-semibold text-gray-900">
                            ${item.totalPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-xl font-bold text-orange-600">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sweets Card Component
function SweetsCard({ item, onAddToCart }: { item: SweetsItem; onAddToCart: (item: SweetsItem, weight: number) => void }) {
  const [selectedWeight, setSelectedWeight] = useState(0.25);
  const [customWeight, setCustomWeight] = useState('');
  const [useCustomWeight, setUseCustomWeight] = useState(false);

  const predefinedWeights = [0.25, 0.5, 1, 2];

  const handleAddToCart = () => {
    const weight = useCustomWeight ? parseFloat(customWeight) : selectedWeight;
    if (weight > 0) {
      onAddToCart(item, weight);
    }
  };

  const getPrice = () => {
    const weight = useCustomWeight ? parseFloat(customWeight) || 0 : selectedWeight;
    return (parseFloat(item.pricePerKg) * weight).toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 15.546V12a9 9 0 018.546-8.946A1.5 1.5 0 0113 4.5v3a6 6 0 106 6v3a1.5 1.5 0 01-1.5 1.5h-.546z" />
            </svg>
          </div>
          <div className="text-sm text-gray-600">{item.category?.name}</div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        
        <div className="text-lg font-bold text-orange-600 mb-4">${item.pricePerKg}/kg</div>
        
        {/* Weight Selection */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Select Weight:</div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {predefinedWeights.map((weight) => (
              <button
                key={weight}
                onClick={() => {
                  setSelectedWeight(weight);
                  setUseCustomWeight(false);
                }}
                className={`px-3 py-1 text-sm rounded border transition-colors ${
                  !useCustomWeight && selectedWeight === weight
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-orange-600'
                }`}
              >
                {weight}kg
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`custom-${item.id}`}
              checked={useCustomWeight}
              onChange={(e) => setUseCustomWeight(e.target.checked)}
              className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor={`custom-${item.id}`} className="text-sm text-gray-700">Custom:</label>
            <input
              type="number"
              value={customWeight}
              onChange={(e) => setCustomWeight(e.target.value)}
              placeholder="kg"
              min="0.1"
              step="0.1"
              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
              disabled={!useCustomWeight}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Total Price:</span>
          <span className="text-lg font-bold text-gray-900">${getPrice()}</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}