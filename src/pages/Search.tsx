import React, { useState } from 'react';
import { SearchFilters } from '../components/SearchFilters';
import { DoctorCard } from '../components/DoctorCard';
import { useSearchDoctors } from '../hooks/useSearchDoctors';
import { Search as SearchIcon } from 'lucide-react';

export function Search() {
  const { doctors, loading, error, searchDoctors } = useSearchDoctors();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
        <p className="mt-2 text-sm text-gray-600">
          Search for doctors by name, specialty, or location
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64">
          <SearchFilters
            onFilterChange={filters => {
              searchDoctors(filters);
            }}
          />
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </form>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No doctors found</div>
          ) : (
            <div className="space-y-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}