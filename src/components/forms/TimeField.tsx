import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type TimeFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: string;
};

export function TimeField({
  label,
  name,
  required = false,
  register,
  error,
}: TimeFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="time"
        id={name}
        {...register(name)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}