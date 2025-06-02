// src/components/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    hasNextPage,
    hasPrevPage,
}) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const pagesToShow = [];
    if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(5, totalPages); i++) {
            pagesToShow.push(i);
        }
    } else if (currentPage >= totalPages - 2) {
        for (let i = Math.max(1, totalPages - 4); i <= totalPages; i++) {
            pagesToShow.push(i);
        }
    } else {
        pagesToShow.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
    }

    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!hasPrevPage}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        hasPrevPage ? 'bg-white text-gray-700 hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        hasNextPage ? 'bg-white text-gray-700 hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(currentPage * 10, totalPages * 10)}</span> of{' '}
                        <span className="font-medium">{totalPages * 10}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                                currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <span className="sr-only">First</span>
                            &laquo;
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={!hasPrevPage}
                            className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${
                                hasPrevPage ? 'bg-white text-gray-500 hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <span className="sr-only">Previous</span>
                            &larr;
                        </button>
                        {pagesToShow.map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                                    currentPage === pageNum
                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                        : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                {pageNum}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!hasNextPage}
                            className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${
                                hasNextPage ? 'bg-white text-gray-500 hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <span className="sr-only">Next</span>
                            &rarr;
                        </button>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                                currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <span className="sr-only">Last</span>
                            &raquo;
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;