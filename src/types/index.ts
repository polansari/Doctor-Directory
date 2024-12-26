export type Doctor = {
  id: string;
  created_at: string;
  full_name: string;
  qualification: string;
  expertise: string;
  clinic_name: string;
  city: string;
  state: string;
  contact: string;
  fees: number;
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
  };
  profile_url: string;
  user_id: string;
};

export type User = {
  id: string;
  email: string;
  role: 'doctor' | 'admin' | 'patient';
};