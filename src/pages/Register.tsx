import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationForm } from '../components/auth/RegistrationForm';
import { useAuth } from '../hooks/useAuth';

export function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    const success = await register(email, password);
    if (success) {
      navigate('/register/doctor');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h1>
        
        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <RegistrationForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </div>
  );
}