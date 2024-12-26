import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: string;
  validate?: (value: string) => boolean | string;
};

export function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  register,
  error,
  validate,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, { required: required && `${label} is required`, validate })}
        className={clsx(
          "mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
          error ? "border-red-300" : "border-gray-300"
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}