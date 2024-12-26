import React from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import type { Doctor } from '../types';

type DoctorCardProps = {
  doctor: Doctor;
};

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start gap-4">
        <img
          src={doctor.profile_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop'}
          alt={doctor.full_name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{doctor.full_name}</h3>
          <p className="text-sm text-gray-600">{doctor.qualification}</p>
          <p className="text-sm font-medium text-blue-600">{doctor.expertise}</p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {doctor.clinic_name} - {doctor.city}, {doctor.state}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              Available: {doctor.availability.days.join(', ')} ({doctor.availability.hours.start} - {doctor.availability.hours.end})
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-2" />
              Consultation Fee: ${doctor.fees}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Book Appointment
        </button>
      </div>
    </div>
  );
}