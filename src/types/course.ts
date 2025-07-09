export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail_url: string;
  preview_video_url?: string;
  category_id: string;
  price: number;
  discounted_price?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published' | 'archived';
  language: string;
  is_published: boolean;
  is_featured: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  sections: Section[];
  enrollment_count?: number;
  rating?: number;
}

export interface Section {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  sort_order: number;
  is_published: boolean;
  lessons: Lesson[];
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  section_id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'download';
  description?: string;
  content_url?: string;
  content_text?: string;
  duration_minutes?: number;
  is_preview: boolean;
  sort_order: number;
  resources?: any;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface DashboardStats {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalStudents: number;
  totalRevenue: number;
  featuredCourses: number;
}