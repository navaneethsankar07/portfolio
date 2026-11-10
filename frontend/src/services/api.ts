import axios from 'axios';
import {
  Profile, Skill, Project, Experience, Article,
  ContactMessage, PublicStats, AdminStats, AuthUser
} from '../types';

const API_BASE_URL = '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401s
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccess = res.data.access;
          localStorage.setItem('access_token', newAccess);
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return apiClient(originalRequest);
        } catch (refreshErr) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
    }
    return Promise.reject(error);
  }
);

// Public API
export const api = {
  // Public
  getProfile: () => apiClient.get<Profile>('/profile/').then((r) => r.data),
  getSkills: (category?: string) =>
    apiClient.get<Skill[]>('/skills/', { params: { category } }).then((r) => r.data),
  getProjects: (category?: string, featured?: boolean) =>
    apiClient.get<Project[]>('/projects/', { params: { category, featured: featured ? 'true' : undefined } }).then((r) => r.data),
  getProjectDetail: (slug: string) => apiClient.get<Project>(`/projects/${slug}/`).then((r) => r.data),
  getExperiences: () => apiClient.get<Experience[]>('/experiences/').then((r) => r.data),
  getArticles: () => apiClient.get<Article[]>('/articles/').then((r) => r.data),
  getArticleDetail: (slug: string) => apiClient.get<Article>(`/articles/${slug}/`).then((r) => r.data),
  sendContactMessage: (msg: ContactMessage) => apiClient.post('/contact/', msg).then((r) => r.data),
  recordVisit: (path: string) => apiClient.post('/analytics/visit/', { path }),
  getPublicStats: () => apiClient.get<PublicStats>('/stats/').then((r) => r.data),

  // Auth
  login: (username: string, password: string) =>
    apiClient.post<{ access: string; refresh: string }>('/auth/token/', { username, password }).then((r) => r.data),
  getMe: () => apiClient.get<AuthUser>('/auth/me/').then((r) => r.data),

  // Admin Dashboard
  getAdminStats: () => apiClient.get<AdminStats>('/admin/dashboard/stats/').then((r) => r.data),
  updateProfile: (data: Partial<Profile>) => apiClient.put<Profile>('/admin/profile/', data).then((r) => r.data),

  // Admin Projects CRUD
  createProject: (data: Partial<Project>) => apiClient.post<Project>('/admin/projects/', data).then((r) => r.data),
  updateProject: (id: number, data: Partial<Project>) => apiClient.put<Project>(`/admin/projects/${id}/`, data).then((r) => r.data),
  deleteProject: (id: number) => apiClient.delete(`/admin/projects/${id}/`).then((r) => r.data),

  // Admin Skills CRUD
  createSkill: (data: Partial<Skill>) => apiClient.post<Skill>('/admin/skills/', data).then((r) => r.data),
  updateSkill: (id: number, data: Partial<Skill>) => apiClient.put<Skill>(`/admin/skills/${id}/`, data).then((r) => r.data),
  deleteSkill: (id: number) => apiClient.delete(`/admin/skills/${id}/`).then((r) => r.data),

  // Admin Articles CRUD
  createArticle: (data: Partial<Article>) => apiClient.post<Article>('/admin/articles/', data).then((r) => r.data),
  updateArticle: (id: number, data: Partial<Article>) => apiClient.put<Article>(`/admin/articles/${id}/`, data).then((r) => r.data),
  deleteArticle: (id: number) => apiClient.delete(`/admin/articles/${id}/`).then((r) => r.data),

  // Admin Experiences CRUD
  createExperience: (data: Partial<Experience>) => apiClient.post<Experience>('/admin/experiences/', data).then((r) => r.data),
  updateExperience: (id: number, data: Partial<Experience>) => apiClient.put<Experience>(`/admin/experiences/${id}/`, data).then((r) => r.data),
  deleteExperience: (id: number) => apiClient.delete(`/admin/experiences/${id}/`).then((r) => r.data),

  // Admin Messages
  getMessages: () => apiClient.get<ContactMessage[]>('/admin/messages/').then((r) => r.data),
  markMessageRead: (id: number, is_read: boolean) => apiClient.patch(`/admin/messages/${id}/`, { is_read }).then((r) => r.data),
  deleteMessage: (id: number) => apiClient.delete(`/admin/messages/${id}/`).then((r) => r.data),
};

