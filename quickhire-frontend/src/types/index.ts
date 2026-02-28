export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
  description: string;
  requirements: string[];
  salary: string;
  tags: string[];
  companyLogo: string;
  featured: boolean;
  createdBy: string;
  applicationCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  job: string | Job;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CategoryStat {
  _id: string;
  count: number;
}
