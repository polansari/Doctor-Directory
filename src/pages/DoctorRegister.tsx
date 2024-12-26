import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useFileUpload } from '../hooks/useFileUpload';
import { InputField } from '../components/forms/InputField';
import { SelectField } from '../components/forms/SelectField';
import { TimeField } from '../components/forms/TimeField';

type FormData = {
  full_name: string;
  qualification: string;
  expertise: string;
  clinic_name: string;
  city: string;
  state: string;
  contact: string;
  fees: number;
  availability_start: string;
  availability_end: string;
  profile_image: FileList;
};

const expertiseOptions = [
  { value: 'Cardiology', label: 'Cardiology' },
  { value: 'Dermatology', label: 'Dermatology' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'Pediatrics', label: 'Pediatrics' },
  { value: 'Orthopedics', label: 'Orthopedics' },
];

export function DoctorRegister() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { uploadFile, uploading } = useFileUpload();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Please login first');

      let profile_url = '';
      if (data.profile_image[0]) {
        profile_url = await uploadFile(data.profile_image[0], 'profiles');
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          qualification: data.qualification,
          expertise: data.expertise,
          clinic_name: data.clinic_name,
          city: data.city,
          state: data.state,
          contact: data.contact,
          fees: data.fees,
          availability: {
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            hours: {
              start: data.availability_start,
              end: data.availability_end,
            },
          },
          profile_url,
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;
      navigate('/dashboard/doctor');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Doctor Registration</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="Full Name"
            name="full_name"
            register={register}
            required
            error={errors.full_name?.message}
          />

          <InputField
            label="Qualification"
            name="qualification"
            register={register}
            required
            error={errors.qualification?.message}
          />

          <SelectField
            label="Expertise"
            name="expertise"
            options={expertiseOptions}
            register={register}
            required
            error={errors.expertise?.message}
          />

          <InputField
            label="Clinic/Hospital Name"
            name="clinic_name"
            register={register}
            required
            error={errors.clinic_name?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="City"
              name="city"
              register={register}
              required
              error={errors.city?.message}
            />
            <InputField
              label="State"
              name="state"
              register={register}
              required
              error={errors.state?.message}
            />
          </div>

          <InputField
            label="Contact Number"
            name="contact"
            type="tel"
            register={register}
            required
            error={errors.contact?.message}
          />

          <InputField
            label="Consultation Fees"
            name="fees"
            type="number"
            register={register}
            required
            error={errors.fees?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <TimeField
              label="Available From"
              name="availability_start"
              register={register}
              required
              error={errors.availability_start?.message}
            />
            <TimeField
              label="Available Until"
              name="availability_end"
              register={register}
              required
              error={errors.availability_end?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              {...register('profile_image')}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}