import api from './api';
import { Job, Application, ApiResponse, AuthResponse, CategoryStat } from '@/types';

// ─── Auth ──────────────────────────────────────────────
export const authService = {
  register: async (name: string, email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    });
    return data;
  },

  login: async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return data;
  },

  getMe: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};

// ─── Jobs ──────────────────────────────────────────────
export const jobService = {
  getAll: async (params?: Record<string, string>) => {
    const { data } = await api.get<ApiResponse<Job[]>>('/jobs', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Job>>(`/jobs/${id}`);
    return data;
  },

  create: async (jobData: Partial<Job>) => {
    const { data } = await api.post<ApiResponse<Job>>('/jobs', jobData);
    return data;
  },

  update: async (id: string, jobData: Partial<Job>) => {
    const { data } = await api.put<ApiResponse<Job>>(`/jobs/${id}`, jobData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/jobs/${id}`);
    return data;
  },

  getCategoryStats: async () => {
    const { data } = await api.get<ApiResponse<CategoryStat[]>>(
      '/jobs/categories/stats'
    );
    return data;
  },
};

// ─── Applications ──────────────────────────────────────
export const applicationService = {
  create: async (applicationData: {
    job: string;
    name: string;
    email: string;
    resumeLink: string;
    coverNote: string;
  }) => {
    const { data } = await api.post<ApiResponse<Application>>(
      '/applications',
      applicationData
    );
    return data;
  },

  getAll: async (params?: Record<string, string>) => {
    const { data } = await api.get<ApiResponse<Application[]>>('/applications', {
      params,
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Application>>(`/applications/${id}`);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/applications/${id}`);
    return data;
  },
};
