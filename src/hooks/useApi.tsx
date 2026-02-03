// hooks/useApi.ts
import { useState, useCallback } from 'react';
import axios, { type RawAxiosResponseHeaders } from 'axios';

export function useApi<T = any>(u ?: string) {
  const [data, setData] = useState<T | null>(null);
  const [linkHeader, setLinkHeader] = useState<RawAxiosResponseHeaders>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url?: string,
    body?: any,
    params?: Record<string, any>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url : u ? u : url,
        data: body,
        params,
        headers:{
          'Accept': 'application/vnd.github.v3+json',
        }
      });
      setData(response.data);
      setLinkHeader(response.headers);


      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Convenience methods with params
  const get = useCallback((url?: string, params?: Record<string, any>) => 
    request('GET', url, undefined, params), [request]);

  const post = useCallback((url: string, body?: any, params?: Record<string, any>) => 
    request('POST', url, body, params), [request]);

  const put = useCallback((url: string, body?: any, params?: Record<string, any>) => 
    request('PUT', url, body, params), [request]);

  const patch = useCallback((url: string, body?: any, params?: Record<string, any>) => 
    request('PATCH', url, body, params), [request]);

  const remove = useCallback((url: string, params?: Record<string, any>) => 
    request('DELETE', url, undefined, params), [request]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    linkHeader,
    loading,
    error,
    request,
    get,
    post,
    put,
    patch,
    remove,
    reset,

  };
}