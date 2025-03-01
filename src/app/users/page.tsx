"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';

type User = {
    id: number; // Adjust the type based on your actual data structure
    username: string;
    createdAt: string; // Assuming createdAt is a string, adjust as necessary
};

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('username'); // Default sort field
    const [order, setOrder] = useState<'asc' | 'desc'>('asc'); // Default order
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = Cookies.get('authToken'); // Get the token from cookies

            try {
                const response = await axios.get(`/api/users?search=${search}&sort=${sort}&order=${order}`, {
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
    }, [search, sort, order, router]);

    const handleSort = (field: string) => {
        const newOrder = sort === field && order === 'asc' ? 'desc' : 'asc';
        setSort(field);
        setOrder(newOrder);
    };

    return (
        <Layout>
                <h1 className="text-2xl font-semibold whitespace-nowrap mb-4">User List</h1>

                {loading ? (
                    <Loading />
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <input
                            type="text"
                            placeholder="Search by username"
                            value={search}
                            className="border rounded w-full py-2 px-3 mb-4"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th onClick={() => handleSort('id')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-gray-100">
                                            ID {sort === 'id' ? (order === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                        <th onClick={() => handleSort('username')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-gray-100">
                                            Username {sort === 'username' ? (order === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                        <th onClick={() => handleSort('createdAt')} className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-gray-100">
                                            Created At {sort === 'createdAt' ? (order === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-100">
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
           
        </Layout>
    );
};

export default UserList;