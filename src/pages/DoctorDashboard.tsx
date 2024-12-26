import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Doctor } from '../types';

export function DoctorDashboard() {
  const [profile, setProfile] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please complete your profile registration.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Doctor Dashboard</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-start gap-6">
          <img
            src={profile.profile_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop'}
            alt={profile.full_name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{profile.full_name}</h2>
            <p className="text-gray-600">{profile.qualification}</p>
            <p className="text-blue-600 font-medium">{profile.expertise}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Clinic Details</h3>
            <p className="text-gray-600">{profile.clinic_name}</p>
            <p className="text-gray-600">{profile.city}, {profile.state}</p>
            <p className="text-gray-600">Contact: {profile.contact}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Availability</h3>
            <p className="text-gray-600">
              Days: {profile.availability.days.join(', ')}
            </p>
            <p className="text-gray-600">
              Hours: {profile.availability.hours.start} - {profile.availability.hours.end}
            </p>
            <p className="text-gray-600">Consultation Fee: ${profile.fees}</p>
          </div>
        </div>
      </div>
    </div>
  );
}