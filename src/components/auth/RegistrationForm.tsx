import React from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../forms/InputField';

type RegistrationFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: (data: RegistrationFormData) => Promise<void>;
  isLoading: boolean;
};

export function RegistrationForm({ onSubmit, isLoading }: Props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistrationFormData>();
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <InputField
        label="Email"
        name="email"
        type="email"
        register={register}
        required
        error={errors.email?.message}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        register={register}
        required
        error={errors.password?.message}
      />

      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        register={register}
        required
        error={errors.confirmPassword?.message}
        validate={(value) => value === password || "Passwords do not match"}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}