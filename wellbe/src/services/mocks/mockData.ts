import { User, UserProfile, FoodItem, Exercise, Workout, WorkoutProgram, Gym, WeightEntry, BodyMeasurement } from '../../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profileImage: 'https://example.com/avatar1.jpg',
    isOnboardingComplete: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    profileImage: 'https://example.com/avatar2.jpg',
    isOnboardingComplete: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
  },
];

// Mock User Profiles
export const mockUserProfiles: UserProfile[] = [
  {
    id: '1',
    userId: '1',
    gender: 'male',
    dateOfBirth: '1990-05-15',
    height: 180,
    currentWeight: 75.2,
    targetWeight: 70.0,
    activityLevel: 'active',
    primaryGoal: 'lose_weight',
    weeklyWeightChangeGoal: -0.5,
    tdee: 2200,
    bmi: 23.3,
    bodyFatPercentage: 15.0,
  },
];

// Mock Food Items
export const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Grilled Chicken Breast',
    brand: 'Generic',
    servingSize: '100',
    servingUnit: 'g',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
  },
  {
    id: '2',
    name: 'Brown Rice',
    brand: 'Generic',
    servingSize: '100',
    servingUnit: 'g',
    calories: 123,
    protein: 2.6,
    carbs: 25,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    sodium: 1,
  },
  {
    id: '3',
    name: 'Avocado',
    brand: 'Generic',
    servingSize: '100',
    servingUnit: 'g',
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    fiber: 7,
    sugar: 0.7,
    sodium: 7,
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    brand: 'Fage',
    servingSize: '170',
    servingUnit: 'g',
    calories: 100,
    protein: 18,
    carbs: 6,
    fat: 0,
    fiber: 0,
    sugar: 6,
    sodium: 65,
  },
  {
    id: '5',
    name: 'Banana',
    brand: 'Generic',
    servingSize: '1',
    servingUnit: 'medium',
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    fiber: 3.1,
    sugar: 14,
    sodium: 1,
  },
];

// Mock Exercises
export const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    targetMuscle: 'Chest',
    equipment: ['Bodyweight'],
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your body in a straight line throughout',
    ],
    gifUrl: 'https://example.com/pushups.gif',
    difficulty: 'beginner',
    category: 'strength',
  },
  {
    id: '2',
    name: 'Squats',
    targetMuscle: 'Legs',
    equipment: ['Bodyweight'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower down as if sitting back into a chair',
      'Keep knees behind toes and chest up',
      'Return to starting position',
    ],
    gifUrl: 'https://example.com/squats.gif',
    difficulty: 'beginner',
    category: 'strength',
  },
  {
    id: '3',
    name: 'Bench Press',
    targetMuscle: 'Chest',
    equipment: ['Barbell', 'Bench'],
    instructions: [
      'Lie on bench with feet flat on floor',
      'Grip bar slightly wider than shoulder width',
      'Lower bar to chest with control',
      'Press bar back up to starting position',
    ],
    gifUrl: 'https://example.com/benchpress.gif',
    difficulty: 'intermediate',
    category: 'strength',
  },
  {
    id: '4',
    name: 'Deadlift',
    targetMuscle: 'Back',
    equipment: ['Barbell'],
    instructions: [
      'Stand with feet hip-width apart, bar over midfoot',
      'Bend at hips and knees to grip bar',
      'Keep chest up and back straight',
      'Drive through heels to stand up straight',
    ],
    gifUrl: 'https://example.com/deadlift.gif',
    difficulty: 'advanced',
    category: 'strength',
  },
  {
    id: '5',
    name: 'Running',
    targetMuscle: 'Cardio',
    equipment: ['None'],
    instructions: [
      'Start with a gentle warm-up walk',
      'Gradually increase pace to comfortable running speed',
      'Maintain steady breathing rhythm',
      'Cool down with walking',
    ],
    difficulty: 'beginner',
    category: 'cardio',
  },
];

// Mock Workouts
export const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Upper Body Push',
    description: 'Focus on pushing muscles: chest, shoulders, triceps',
    exercises: [
      {
        exercise: mockExercises[0], // Push-ups
        sets: [
          { id: '1', exerciseId: '1', reps: 12, restTime: 60, isCompleted: true },
          { id: '2', exerciseId: '1', reps: 10, restTime: 60, isCompleted: true },
          { id: '3', exerciseId: '1', reps: 8, restTime: 60, isCompleted: false },
        ],
      },
      {
        exercise: mockExercises[2], // Bench Press
        sets: [
          { id: '4', exerciseId: '3', weight: 60, reps: 8, restTime: 90, isCompleted: true },
          { id: '5', exerciseId: '3', weight: 60, reps: 6, restTime: 90, isCompleted: false },
          { id: '6', exerciseId: '3', weight: 55, reps: 8, restTime: 90, isCompleted: false },
        ],
      },
    ],
    duration: 45,
    totalVolume: 720,
    isCompleted: false,
    scheduledDate: new Date().toISOString(),
    userId: '1',
  },
];

// Mock Workout Programs
export const mockWorkoutPrograms: WorkoutProgram[] = [
  {
    id: '1',
    name: 'Beginner Strength Foundation',
    description: 'Perfect for those new to strength training. Builds fundamental movement patterns and strength.',
    duration: 8,
    difficulty: 'beginner',
    workouts: mockWorkouts,
    imageUrl: 'https://example.com/program1.jpg',
    createdBy: 'WellBe Team',
    isPopular: true,
  },
  {
    id: '2',
    name: 'Muscle Building Intensive',
    description: 'Intermediate program focused on muscle hypertrophy and strength gains.',
    duration: 12,
    difficulty: 'intermediate',
    workouts: [],
    imageUrl: 'https://example.com/program2.jpg',
    createdBy: 'WellBe Team',
    isPopular: true,
  },
  {
    id: '3',
    name: 'Athletic Performance',
    description: 'Advanced training for athletes looking to improve power, speed, and agility.',
    duration: 16,
    difficulty: 'advanced',
    workouts: [],
    imageUrl: 'https://example.com/program3.jpg',
    createdBy: 'Elite Coach',
    isPopular: false,
  },
];

// Mock Gyms
export const mockGyms: Gym[] = [
  {
    id: '1',
    name: 'FitZone Premium',
    address: '123 Fitness Street, Downtown',
    latitude: 40.7128,
    longitude: -74.0060,
    rating: 4.5,
    priceLevel: '$$$',
    openingHours: ['6:00 AM - 10:00 PM', 'Monday - Sunday'],
    phoneNumber: '+1-555-123-4567',
    website: 'https://fitzone.com',
    photos: ['https://example.com/gym1.jpg'],
    reviews: [
      {
        author: 'John D.',
        rating: 5,
        text: 'Great equipment and friendly staff!',
        time: '2024-01-15',
      },
    ],
  },
  {
    id: '2',
    name: 'Budget Fitness Center',
    address: '456 Health Avenue, Midtown',
    latitude: 40.7580,
    longitude: -73.9855,
    rating: 3.8,
    priceLevel: '$',
    openingHours: ['5:00 AM - 11:00 PM', 'Monday - Sunday'],
    phoneNumber: '+1-555-987-6543',
    website: 'https://budgetfitness.com',
    photos: ['https://example.com/gym2.jpg'],
    reviews: [
      {
        author: 'Sarah M.',
        rating: 4,
        text: 'Good value for money, can get crowded during peak hours.',
        time: '2024-01-10',
      },
    ],
  },
];

// Mock Weight Entries
export const mockWeightEntries: WeightEntry[] = [
  { id: '1', weight: 76.0, date: '2024-01-01', userId: '1' },
  { id: '2', weight: 75.8, date: '2024-01-08', userId: '1' },
  { id: '3', weight: 75.5, date: '2024-01-15', userId: '1' },
  { id: '4', weight: 75.2, date: '2024-01-22', userId: '1' },
  { id: '5', weight: 75.0, date: '2024-01-29', userId: '1' },
];

// Mock Body Measurements
export const mockBodyMeasurements: BodyMeasurement[] = [
  { id: '1', type: 'waist', value: 85, date: '2024-01-01', userId: '1' },
  { id: '2', type: 'chest', value: 100, date: '2024-01-01', userId: '1' },
  { id: '3', type: 'arms', value: 35, date: '2024-01-01', userId: '1' },
  { id: '4', type: 'waist', value: 84, date: '2024-01-15', userId: '1' },
  { id: '5', type: 'chest', value: 101, date: '2024-01-15', userId: '1' },
  { id: '6', type: 'arms', value: 35.5, date: '2024-01-15', userId: '1' },
];

// Default authenticated user for development
export const defaultUser = mockUsers[0];
export const defaultUserProfile = mockUserProfiles[0];