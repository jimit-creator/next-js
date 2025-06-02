import axios from 'axios';

export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    return error.response?.data?.error || 'An error occurred. Please try again.';
  }
  return 'An unexpected error occurred.';
}; 