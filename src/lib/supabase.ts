import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  full_description: string;
  location: string;
  year: string;
  area: string;
  main_image: string;
  gallery_images: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface About {
  id: string;
  title: string;
  content1: string;
  content2: string;
  projects_count: string;
  awards_count: string;
  satisfaction_rate: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  instagram_url: string;
  linkedin_url: string;
  created_at: string;
  updated_at: string;
}

export interface Hero {
  id: string;
  title: string;
  subtitle: string;
  background_image: string;
  created_at: string;
  updated_at: string;
}
