"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = Cookies.get('authToken'); // Get the token from cookies

            try {
                const response = await axios.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                    },
                });
                setUsers(response.data);
            } catch (err: any) {
                const errorMessage = err.response?.data?.error || 'An error occurred. Please try again.';
                setError(errorMessage);
                if (err.response?.status === 401) {
                    router.push('/login'); // Redirect to login if unauthorized
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [router]);

    return (
        <Layout>
            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold mb-4">User List</h1>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Username
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            Created At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {users.map((user: { id: string; username: string; createdAt: string }) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{user.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-500">{new Date(user.createdAt).toLocaleString()}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default UserList; 