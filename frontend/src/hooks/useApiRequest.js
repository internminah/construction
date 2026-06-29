'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Creates an authenticated API fetch helper that:
 *  - Attaches the adminToken from localStorage automatically
 *  - On 401 (expired/invalid token): clears token and redirects to /admin/login
 *  - Returns { ok, status, data } always — never throws
 */
export function useApiRequest() {
  const router = useRouter();

  const apiRequest = useCallback(async (url, options = {}) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const fullUrl = url.startsWith('http') ? url : `${apiUrl}${url}`;

    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(fullUrl, { ...options, headers });

      // Session expired or invalid token
      if (res.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('adminToken');
        }
        router.push('/admin/login');
        return { ok: false, status: 401, data: null, message: 'Session expired. Please log in again.' };
      }

      let data = null;
      try {
        data = await res.json();
      } catch (_) {
        // non-JSON response
      }

      return {
        ok: res.ok,
        status: res.status,
        data,
        message: data?.message || (res.ok ? 'Success' : `Request failed (${res.status})`)
      };
    } catch (err) {
      console.error('API request failed:', err);
      return { ok: false, status: 0, data: null, message: err.message || 'Network error' };
    }
  }, [router]);

  return apiRequest;
}
