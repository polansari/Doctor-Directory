import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
  };
}