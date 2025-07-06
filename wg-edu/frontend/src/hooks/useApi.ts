import { useState, useEffect, useCallback } from 'react';
import { api, ApiResponse } from '@/lib/api';

interface UseApiOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  skip?: boolean;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useApi<T>({ endpoint, method = 'GET', body, skip = false }: UseApiOptions): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!skip);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (skip) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let response: ApiResponse<T>;
      
      switch (method) {
        case 'GET':
          response = await api.get<T>(endpoint);
          break;
        case 'POST':
          response = await api.post<typeof body, T>(endpoint, body);
          break;
        case 'PUT':
          response = await api.put<typeof body, T>(endpoint, body);
          break;
        case 'DELETE':
          response = await api.delete<T>(endpoint);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      
      if (response.status === 'success' && response.data) {
        setData(response.data);
      } else {
        throw new Error(response.message || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [endpoint, method, body, skip]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = async () => {
    await fetchData();
  };

  return { data, loading, error, refetch };
} 