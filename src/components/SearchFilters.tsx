import React from 'react';
import { Filter } from 'lucide-react';

type SearchFiltersProps = {
  onFilterChange: (filters: {
    expertise: string;
    city: string;
    minFees: string;
    maxFees: string;
  }) => void;
};

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      expertise: name === 'expertise' ? value : '',
      city: name === 'city' ? value : '',
      minFees: name === 'minFees' ? value : '',
      maxFees: name === 'maxFees' ? value : '',
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
            Specialty
          </label>
          <select
            id="expertise"
            name="expertise"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <select
            id="city"
            name="city"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Cities</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
            <option value="Phoenix">Phoenix</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Consultation Fees</label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minFees"
              placeholder="Min"
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="number"
              name="maxFees"
              placeholder="Max"
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}