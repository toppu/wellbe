export const CONFIG = {
  // API Configuration
  API_BASE_URL: __DEV__ ? 'http://localhost:3000/api' : 'https://api.wellbe.app',
  
  // Development Settings
  USE_MOCK_SERVICES: true, // Set to false when real APIs are ready
  
  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
    },
    USER: {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/profile',
      PREFERENCES: '/user/preferences',
    },
    NUTRITION: {
      FOOD_SEARCH: '/nutrition/food/search',
      FOOD_DETAILS: '/nutrition/food',
      ANALYZE_IMAGE: '/nutrition/analyze-image',
      BARCODE_SCAN: '/nutrition/barcode',
      LOG_FOOD: '/nutrition/log',
      DAILY_LOG: '/nutrition/daily',
      NUTRITION_HISTORY: '/nutrition/history',
    },
    EXERCISE: {
      SEARCH: '/exercise/search',
      DETAILS: '/exercise',
      CATEGORIES: '/exercise/categories',
      BY_MUSCLE: '/exercise/muscle',
    },
    WORKOUT: {
      GENERATE: '/workout/generate',
      SAVE: '/workout/save',
      HISTORY: '/workout/history',
      PROGRAMS: '/workout/programs',
      LOG_SESSION: '/workout/log',
    },
    PROGRESS: {
      WEIGHT: '/progress/weight',
      MEASUREMENTS: '/progress/measurements',
      STATS: '/progress/stats',
    },
    LOCATION: {
      GYMS: '/location/gyms',
    },
  },
  
  // Third-party API Keys (use environment variables in production)
  API_KEYS: {
    LOGMEAL: process.env.EXPO_PUBLIC_LOGMEAL_API_KEY || 'demo-key',
    FATSECRET: process.env.EXPO_PUBLIC_FATSECRET_API_KEY || 'demo-key',
    EXERCISEDB: process.env.EXPO_PUBLIC_EXERCISEDB_API_KEY || 'demo-key',
    GOOGLE_PLACES: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || 'demo-key',
  },
  
  // App Settings
  APP: {
    NAME: 'wellbe',
    VERSION: '1.0.0',
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
    REQUEST_TIMEOUT: 10000, // 10 seconds
  },
};