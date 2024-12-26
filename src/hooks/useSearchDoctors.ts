import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Doctor } from '../types';

export function useSearchDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchDoctors = async (filters: {
    expertise?: string;
    city?: string;
    minFees?: string;
    maxFees?: string;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('is_verified', true);

      if (filters.expertise) {
        query = query.eq('expertise', filters.expertise);
      }
      if (filters.city) {
        query = query.eq('city', filters.city);
      }
      if (filters.minFees) {
        query = query.gte('fees', parseInt(filters.minFees));
      }
      if (filters.maxFees) {
        query = query.lte('fees', parseInt(filters.maxFees));
      }

      const { data, error } = await query;

      if (error) throw error;
      setDoctors(data as Doctor[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchDoctors({});
  }, []);

  return { doctors, loading, error, searchDoctors };
}