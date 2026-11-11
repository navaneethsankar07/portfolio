export interface Profile {
  id: number;
  name: string;
  title: string;
  headline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  resume_url: string;
  available_for_hire: boolean;
  status_text: string;
  avatar_url: string;
  years_experience_label: string;
  updated_at: string;
}

export type SkillCategory = 'backend' | 'frontend' | 'database' | 'devops' | 'programming' | 'tools';

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  category_display?: string;
  proficiency: number;
  icon_name: string;
  level_label: string;
  featured: boolean;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  category: 'fullstack' | 'realtime' | 'marketplace' | 'backend';
  category_display?: string;
  description: string;
  architecture_notes: string;
  tech_stack: string[];
  key_features: string[];
  live_url: string;
  github_url: string;
  image_url: string;
  featured: boolean;
  order: number;
  created_at: string;
}

export interface Experience {
  id: number;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  key_achievements: string[];
  technologies: string[];
  is_education: boolean;
  order: number;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  read_time: string;
  published: boolean;
  views: number;
  created_at: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export interface PublicStats {
  projects_count: number;
  skills_count: number;
  articles_count: number;
  total_visits: number;
  years_experience: string;
  github_repos: string;
  open_to_work: boolean;
}

export interface AdminStats {
  overview: {
    total_projects: number;
    total_skills: number;
    total_articles: number;
    total_messages: number;
    unread_messages: number;
    total_visits: number;
    visits_today: number;
    visits_last_7_days: number;
  };
  recent_messages: ContactMessage[];
  recent_visits: {
    id: number;
    path: string;
    ip_hash: string;
    visited_at: string;
  }[];
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

