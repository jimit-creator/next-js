"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Fixed import
import Cookies from 'js-cookie'; // Import js-cookie
import Loading from '@/components/Loading';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/login', { username, password });
      
      // Store the token in cookies
      Cookies.set('authToken', response.data.token, { expires: 7 }); // Expires in 7 days

      // Redirect to dashboard on successful login
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'An error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        {loading && <Loading />}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
          <h2 className="text-2xl mb-4">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4 w-full" disabled={loading}>
            {loading ? <Loading/ > : 'Login'}
          </button>
        </form>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to Our App</h1>
          <p className="mt-4">Please log in to continue.</p>
        </div>
      </div>
    </div>
  );
}