/**
 * API client for communicating with the backend
 */

export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
}

// Use relative URL for API which will be handled by Nginx
const API_BASE_URL = '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Try to parse error response
      try {
        const errorData = await response.json();
        return errorData as ApiResponse<T>;
      } catch {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    }
    
    return await response.json() as ApiResponse<T>;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * API client with methods for different endpoints
 */
export const api = {
  // Health check
  health: () => fetchAPI<{ status: string }>('/health'),
  
  // Example GET request
  get: <T>(endpoint: string) => fetchAPI<T>(endpoint, { method: 'GET' }),
  
  // Example POST request
  post: <T, U>(endpoint: string, data: T) => 
    fetchAPI<U>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // Example PUT request
  put: <T, U>(endpoint: string, data: T) => 
    fetchAPI<U>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  // Example DELETE request
  delete: <T>(endpoint: string) => 
    fetchAPI<T>(endpoint, { method: 'DELETE' }),
}; 