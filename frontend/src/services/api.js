import axios from 'axios';
import store from '../store';
import { logout } from '../store/slices/authSlice';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5002/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request caching
const getCacheKey = (config) => {
  return `${config.method}:${config.url}:${JSON.stringify(config.params || {})}`;
};

const isCacheable = (config) => {
  return config.method === 'get' && !config.noCache;
};

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Check cache for GET requests
    if (isCacheable(config)) {
      const cacheKey = getCacheKey(config);
      const cachedResponse = cache.get(cacheKey);
      if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_DURATION) {
        return Promise.reject({
          config,
          response: cachedResponse.data,
          isCache: true,
        });
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Cache successful GET responses
    if (isCacheable(response.config)) {
      const cacheKey = getCacheKey(response.config);
      cache.set(cacheKey, {
        data: response,
        timestamp: Date.now(),
      });
    }
    return response;
  },
  (error) => {
    // Return cached response if available
    if (error.isCache) {
      return error.response;
    }

    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

// Cache invalidation helper
export const invalidateCache = (pattern) => {
  if (pattern) {
    const regex = new RegExp(pattern);
    for (const key of cache.keys()) {
      if (regex.test(key)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
};

// Students API
export const studentsAPI = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => {
    invalidateCache('/students');
    return api.post('/students', data);
  },
  update: (id, data) => {
    invalidateCache('/students');
    return api.put(`/students/${id}`, data);
  },
  delete: (id) => {
    invalidateCache('/students');
    return api.delete(`/students/${id}`);
  },
  bulkUpload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    invalidateCache('/students');
    return api.post('/students/bulk-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Vaccination Drives API
export const vaccinationDrivesAPI = {
  getAll: (params) => {
    const queryParams = {
      page: params?.page || 1,
      limit: params?.limit || 10,
      search: params?.search || '',
      sortBy: params?.sortBy || 'dateAdministered',
      sortOrder: params?.sortOrder || 'desc',
    };
    return api.get('/vaccination-drives', { params: queryParams });
  },
  getById: (id) => api.get(`/vaccination-drives/${id}`),
  create: (data) => {
    invalidateCache('/vaccination-drives');
    return api.post('/vaccination-drives', data);
  },
  update: (id, data) => {
    invalidateCache('/vaccination-drives');
    return api.put(`/vaccination-drives/${id}`, data);
  },
  markVaccinated: (id, data) => {
    invalidateCache('/vaccination-drives');
    return api.post(`/vaccination-drives/${id}/mark-vaccinated`, data);
  },
};

// Reports API
export const reportsAPI = {
  getVaccinationStatus: (params) => api.get('/reports/vaccination-status', { params }),
  getDriveSummary: (params) => api.get('/reports/drive-summary', { params }),
};

export default api; 