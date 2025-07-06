'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function ServerStatusCard() {
  const [, setStatus] = useState<string>('Loading...');
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        setIsLoading(true);
        // Try to fetch from the API proxy first
        try {
          const response = await fetch('/api/health');
          if (response.ok) {
            const data = await response.json();
            setStatus(data.status || 'healthy');
            setIsHealthy(true);
            setIsLoading(false);
            return;
          }
        } catch (proxyError) {
          console.log('Proxy API error, trying direct connection:', proxyError);
        }

        // Fallback to direct API call
        const response = await api.health();
        setStatus(response.status || 'healthy');
        setIsHealthy(true);
      } catch (error) {
        console.error('Error checking server status:', error);
        setStatus('Error');
        setIsHealthy(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkServerStatus();
    // Set up polling every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-sm font-medium text-gray-500 truncate">Server Status</dt>
        {isLoading ? (
          <dd className="mt-1 text-3xl font-semibold text-gray-400">Loading...</dd>
        ) : (
          <dd className={`mt-1 text-3xl font-semibold ${isHealthy ? 'text-green-600' : 'text-red-600'}`}>
            {isHealthy ? 'Healthy' : 'Unhealthy'}
          </dd>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {isLoading ? 'Checking status...' : `Last checked: ${new Date().toLocaleTimeString()}`}
        </p>
      </div>
    </div>
  );
} 