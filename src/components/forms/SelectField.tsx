import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type SelectFieldProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  register: UseFormRegister<any>;
  error?: string;
};

export function SelectField({
  label,
  name,
  options,
  required = false,
  register,
  error,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}