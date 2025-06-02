"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import debounce from 'lodash/debounce'; // Import debounce from lodash

type User = {
    id: number;
    username: string;
    createdAt: string;
};

type PaginationData = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

type ApiResponse = {
    data: User[];
    pagination: PaginationData;
};

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('username');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false
    });
    const router = useRouter();

    useEffect(() => {
        const debouncedFetchUsers = debounce(fetchUsers, 300); // Use debounce
        debouncedFetchUsers();
        return () => {
            debouncedFetchUsers.cancel(); // Cleanup on unmount
        };
    }, [search, sort, order, pagination.page, pagination.limit]);

    const fetchUsers = async () => {
        setLoading(true);
        const token = Cookies.get('authToken');

        try {
            const response = await axios.get<ApiResponse>(
                `/api/users?search=${search}&sort=${sort}&order=${order}&page=${pagination.page}&limit=${pagination.limit}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            setUsers(response.data.data);
            setPagination(response.data.pagination);
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'An error occurred. Please try again.';
            setError(errorMessage);
            if (err.response?.status === 401) {
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (field: string) => {
        const newOrder = sort === field && order === 'asc' ? 'desc' : 'asc';
        setSort(field);
        setOrder(newOrder);
    };

    const handlePageChange = (newPage: number) => {
        setPagination(prev => ({
            ...prev,
            page: newPage
        }));
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = parseInt(e.target.value);
        setPagination(prev => ({
            ...prev,
            page: 1, // Reset to first page when changing limit
            limit: newLimit
        }));
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
                    <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search by username"
                            value={search}
                            className="border rounded py-2 px-3 flex-grow"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="flex items-center">
                            <span className="mr-2">Rows per page:</span>
                            <select
                                value={pagination.limit}
                                onChange={handleLimitChange}
                                className="border rounded py-2 px-3"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    
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
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                        hasNextPage={pagination.hasNextPage}
                        hasPrevPage={pagination.hasPrevPage}
                    />
                </div>
            )}
        </Layout>
    );
};

export default UserList;