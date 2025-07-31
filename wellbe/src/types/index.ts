// User and Profile Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  isOnboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  height: number; // in cm
  currentWeight: number; // in kg
  targetWeight?: number; // in kg
  activityLevel: 'sedentary' | 'lightly_active' | 'active' | 'very_active';
  primaryGoal: 'lose_weight' | 'gain_muscle' | 'maintain_fitness' | 'improve_health';
  weeklyWeightChangeGoal?: number; // in kg per week
  tdee?: number; // Total Daily Energy Expenditure
  bmi?: number;
  bodyFatPercentage?: number;
}

// Onboarding Types
export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  isCompleted: boolean;
}

export interface OnboardingData {
  primaryGoal?: 'lose_weight' | 'gain_muscle' | 'maintain_fitness' | 'improve_health';
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  height?: number;
  currentWeight?: number;
  targetWeight?: number;
  activityLevel?: 'sedentary' | 'lightly_active' | 'active' | 'very_active';
  weeklyWeightChangeGoal?: number;
  bodyPhoto?: string;
}

// Food and Nutrition Types
export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  barcode?: string;
  servingSize: string;
  servingUnit: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface LoggedFood {
  id: string;
  foodItem: FoodItem;
  quantity: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  loggedAt: string;
  userId: string;
}

export interface FoodAnalysisResult {
  foods: Array<{
    name: string;
    quantity: string;
    confidence: number;
    nutrition: Omit<FoodItem, 'id' | 'name'>;
  }>;
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Exercise and Workout Types
export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  equipment: string[];
  instructions: string[];
  gifUrl?: string;
  videoUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'strength' | 'cardio' | 'flexibility' | 'balance';
}

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  weight?: number; // in kg
  reps?: number;
  duration?: number; // in seconds for time-based exercises
  distance?: number; // in meters for cardio
  restTime?: number; // in seconds
  isCompleted: boolean;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  duration?: number; // in minutes
  totalVolume?: number; // total weight lifted
  isCompleted: boolean;
  scheduledDate?: string;
  completedAt?: string;
  userId: string;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  workouts: Workout[];
  imageUrl?: string;
  createdBy: string;
  isPopular: boolean;
}

// Progress Tracking Types
export interface WeightEntry {
  id: string;
  weight: number;
  date: string;
  userId: string;
}

export interface BodyMeasurement {
  id: string;
  type: 'waist' | 'chest' | 'arms' | 'thighs' | 'hips';
  value: number; // in cm
  date: string;
  userId: string;
}

export interface WorkoutProgress {
  date: string;
  totalWorkouts: number;
  totalVolume: number;
  totalDuration: number;
}

// Gym Finder Types
export interface Gym {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating?: number;
  priceLevel?: '$' | '$$' | '$$$' | '$$$$';
  openingHours?: string[];
  phoneNumber?: string;
  website?: string;
  photos?: string[];
  reviews?: Array<{
    author: string;
    rating: number;
    text: string;
    time: string;
  }>;
}

// 3D Avatar Types
export interface Avatar {
  id: string;
  type: 'current' | 'goal';
  modelUrl: string; // URL to .glb file
  thumbnailUrl?: string;
  userId: string;
  createdAt: string;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Nutrition: undefined;
  Workouts: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type NutritionStackParamList = {
  NutritionHome: undefined;
  FoodCamera: undefined;
  FoodSearch: undefined;
  BarcodeScanner: undefined;
  FoodDetails: { foodId: string };
  MealLog: { mealType: string };
};

export type WorkoutStackParamList = {
  WorkoutHome: undefined;
  WorkoutPlanner: undefined;
  ProgramLibrary: undefined;
  WorkoutDetails: { workoutId: string };
  ActiveWorkout: { workoutId: string };
  ExerciseDetails: { exerciseId: string };
};

export type ProgressStackParamList = {
  ProgressHome: undefined;
  WeightTracker: undefined;
  Measurements: undefined;
  WorkoutHistory: undefined;
  NutritionHistory: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  Settings: undefined;
  GymFinder: undefined;
  AvatarViewer: undefined;
  HealthSync: undefined;
};

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Theme and UI Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: object;
    h2: object;
    h3: object;
    body: object;
    caption: object;
  };
}