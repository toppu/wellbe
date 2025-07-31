import { CONFIG } from '../constants/config';
import apiClient from './ApiClient';
import { Exercise, Workout, WorkoutProgram, WorkoutSet, ApiResponse } from '../types';
import { mockExercises, mockWorkouts, mockWorkoutPrograms } from './mocks/mockData';

// Request/Response types
export interface ExerciseSearchRequest {
  query?: string;
  muscle?: string;
  equipment?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: 'strength' | 'cardio' | 'flexibility' | 'balance';
  limit?: number;
}

export interface GenerateWorkoutRequest {
  goal: 'strength' | 'muscle_building' | 'endurance' | 'weight_loss';
  duration: number; // in minutes
  equipment: string[];
  muscleGroups?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  previousWorkouts?: string[]; // IDs of recent workouts for recovery tracking
}

export interface LogWorkoutRequest {
  workoutId: string;
  exercises: Array<{
    exerciseId: string;
    sets: Omit<WorkoutSet, 'id'>[];
  }>;
  duration?: number;
  notes?: string;
  completedAt?: string;
}

export interface WorkoutHistoryResponse {
  workouts: Workout[];
  totalWorkouts: number;
  totalDuration: number;
  totalVolume: number;
  averageWorkoutsPerWeek: number;
}

class WorkoutService {
  // Mock Methods
  private async mockSearchExercises(request: ExerciseSearchRequest): Promise<ApiResponse<Exercise[]>> {
    await new Promise(resolve => setTimeout(resolve, 400));

    let results = [...mockExercises];
    
    // Apply filters
    if (request.query) {
      const query = request.query.toLowerCase();
      results = results.filter(exercise =>
        exercise.name.toLowerCase().includes(query) ||
        exercise.targetMuscle.toLowerCase().includes(query)
      );
    }

    if (request.muscle) {
      results = results.filter(exercise =>
        exercise.targetMuscle.toLowerCase() === request.muscle!.toLowerCase()
      );
    }

    if (request.difficulty) {
      results = results.filter(exercise => exercise.difficulty === request.difficulty);
    }

    if (request.category) {
      results = results.filter(exercise => exercise.category === request.category);
    }

    if (request.equipment) {
      results = results.filter(exercise =>
        exercise.equipment.some(eq => eq.toLowerCase().includes(request.equipment!.toLowerCase()))
      );
    }

    const limit = request.limit || 20;
    results = results.slice(0, limit);

    console.log(`💪 Mock exercise search: ${results.length} results`);

    return {
      success: true,
      data: results,
    };
  }

  private async mockGenerateWorkout(request: GenerateWorkoutRequest): Promise<ApiResponse<Workout>> {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI processing

    // Simple AI workout generation based on request
    const selectedExercises = mockExercises
      .filter(ex => 
        request.equipment.length === 0 || 
        ex.equipment.some(eq => request.equipment.includes(eq) || eq === 'Bodyweight')
      )
      .filter(ex => ex.difficulty === request.difficulty || ex.difficulty === 'beginner')
      .slice(0, request.duration > 30 ? 6 : 4);

    const generatedWorkout: Workout = {
      id: `generated_${Date.now()}`,
      name: `AI Generated ${request.goal.replace('_', ' ')} Workout`,
      description: `Personalized ${request.duration}-minute workout for ${request.goal}`,
      exercises: selectedExercises.map(exercise => ({
        exercise,
        sets: Array.from({ length: 3 }, (_, i) => ({
          id: `set_${Date.now()}_${i}`,
          exerciseId: exercise.id,
          reps: exercise.category === 'strength' ? 8 + Math.floor(Math.random() * 5) : undefined,
          duration: exercise.category === 'cardio' ? 30 + Math.floor(Math.random() * 30) : undefined,
          weight: exercise.equipment.includes('Barbell') ? 40 + Math.floor(Math.random() * 20) : undefined,
          restTime: 60 + Math.floor(Math.random() * 30),
          isCompleted: false,
        })),
      })),
      duration: request.duration,
      isCompleted: false,
      scheduledDate: new Date().toISOString(),
      userId: '1',
    };

    console.log(`🤖 Mock AI workout generated: ${generatedWorkout.name}`);

    return {
      success: true,
      data: generatedWorkout,
    };
  }

  private async mockGetPrograms(): Promise<ApiResponse<WorkoutProgram[]>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    console.log(`📚 Mock workout programs: ${mockWorkoutPrograms.length} programs`);

    return {
      success: true,
      data: mockWorkoutPrograms,
    };
  }

  private async mockLogWorkout(request: LogWorkoutRequest): Promise<ApiResponse<Workout>> {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find the workout being logged
    let workout = mockWorkouts.find(w => w.id === request.workoutId);
    
    if (!workout) {
      return {
        success: false,
        error: 'Workout not found',
      };
    }

    // Update workout with logged sets
    const updatedWorkout: Workout = {
      ...workout,
      exercises: workout.exercises.map(workoutExercise => {
        const loggedExercise = request.exercises.find(e => e.exerciseId === workoutExercise.exercise.id);
        if (loggedExercise) {
          return {
            ...workoutExercise,
            sets: loggedExercise.sets.map((set, index) => ({
              ...set,
              id: `logged_${Date.now()}_${index}`,
              exerciseId: workoutExercise.exercise.id,
              isCompleted: true,
            })),
          };
        }
        return workoutExercise;
      }),
      duration: request.duration || workout.duration,
      isCompleted: true,
      completedAt: request.completedAt || new Date().toISOString(),
    };

    console.log(`📝 Mock workout logged: ${updatedWorkout.name}`);

    return {
      success: true,
      data: updatedWorkout,
    };
  }

  private async mockGetWorkoutHistory(): Promise<ApiResponse<WorkoutHistoryResponse>> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const completedWorkouts = mockWorkouts.filter(w => w.isCompleted);
    const totalDuration = completedWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
    const totalVolume = completedWorkouts.reduce((sum, w) => sum + (w.totalVolume || 0), 0);

    const history: WorkoutHistoryResponse = {
      workouts: completedWorkouts,
      totalWorkouts: completedWorkouts.length,
      totalDuration,
      totalVolume,
      averageWorkoutsPerWeek: 3.5, // Mock average
    };

    console.log(`📊 Mock workout history: ${history.totalWorkouts} workouts`);

    return {
      success: true,
      data: history,
    };
  }

  // Real API Methods
  private async apiSearchExercises(request: ExerciseSearchRequest): Promise<ApiResponse<Exercise[]>> {
    return await apiClient.get<Exercise[]>(CONFIG.ENDPOINTS.EXERCISE.SEARCH, {
      params: request,
    });
  }

  private async apiGenerateWorkout(request: GenerateWorkoutRequest): Promise<ApiResponse<Workout>> {
    return await apiClient.post<Workout>(CONFIG.ENDPOINTS.WORKOUT.GENERATE, request);
  }

  private async apiGetPrograms(): Promise<ApiResponse<WorkoutProgram[]>> {
    return await apiClient.get<WorkoutProgram[]>(CONFIG.ENDPOINTS.WORKOUT.PROGRAMS);
  }

  private async apiLogWorkout(request: LogWorkoutRequest): Promise<ApiResponse<Workout>> {
    return await apiClient.post<Workout>(CONFIG.ENDPOINTS.WORKOUT.LOG_SESSION, request);
  }

  private async apiGetWorkoutHistory(): Promise<ApiResponse<WorkoutHistoryResponse>> {
    return await apiClient.get<WorkoutHistoryResponse>(CONFIG.ENDPOINTS.WORKOUT.HISTORY);
  }

  // Public Methods (automatically switch between mock and real API)
  async searchExercises(request: ExerciseSearchRequest = {}): Promise<ApiResponse<Exercise[]>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockSearchExercises(request);
      } else {
        return await this.apiSearchExercises(request);
      }
    } catch (error: any) {
      console.error('Exercise search error:', error);
      return {
        success: false,
        error: error.message || 'Failed to search exercises',
      };
    }
  }

  async generateWorkout(request: GenerateWorkoutRequest): Promise<ApiResponse<Workout>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockGenerateWorkout(request);
      } else {
        return await this.apiGenerateWorkout(request);
      }
    } catch (error: any) {
      console.error('Workout generation error:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate workout',
      };
    }
  }

  async getPrograms(): Promise<ApiResponse<WorkoutProgram[]>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockGetPrograms();
      } else {
        return await this.apiGetPrograms();
      }
    } catch (error: any) {
      console.error('Get programs error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get workout programs',
      };
    }
  }

  async logWorkout(request: LogWorkoutRequest): Promise<ApiResponse<Workout>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockLogWorkout(request);
      } else {
        return await this.apiLogWorkout(request);
      }
    } catch (error: any) {
      console.error('Log workout error:', error);
      return {
        success: false,
        error: error.message || 'Failed to log workout',
      };
    }
  }

  async getWorkoutHistory(): Promise<ApiResponse<WorkoutHistoryResponse>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockGetWorkoutHistory();
      } else {
        return await this.apiGetWorkoutHistory();
      }
    } catch (error: any) {
      console.error('Get workout history error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get workout history',
      };
    }
  }

  async getExerciseDetails(exerciseId: string): Promise<ApiResponse<Exercise>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        await new Promise(resolve => setTimeout(resolve, 200));
        const exercise = mockExercises.find(e => e.id === exerciseId);
        
        if (!exercise) {
          return {
            success: false,
            error: 'Exercise not found',
          };
        }

        return {
          success: true,
          data: exercise,
        };
      } else {
        return await apiClient.get<Exercise>(`${CONFIG.ENDPOINTS.EXERCISE.DETAILS}/${exerciseId}`);
      }
    } catch (error: any) {
      console.error('Get exercise details error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get exercise details',
      };
    }
  }

  async getWorkoutDetails(workoutId: string): Promise<ApiResponse<Workout>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        await new Promise(resolve => setTimeout(resolve, 200));
        const workout = mockWorkouts.find(w => w.id === workoutId);
        
        if (!workout) {
          return {
            success: false,
            error: 'Workout not found',
          };
        }

        return {
          success: true,
          data: workout,
        };
      } else {
        return await apiClient.get<Workout>(`${CONFIG.ENDPOINTS.WORKOUT.SAVE}/${workoutId}`);
      }
    } catch (error: any) {
      console.error('Get workout details error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get workout details',
      };
    }
  }

  // Helper methods
  calculateWorkoutVolume(workout: Workout): number {
    return workout.exercises.reduce((total, exercise) => {
      const exerciseVolume = exercise.sets.reduce((setTotal, set) => {
        if (set.weight && set.reps) {
          return setTotal + (set.weight * set.reps);
        }
        return setTotal;
      }, 0);
      return total + exerciseVolume;
    }, 0);
  }

  getWorkoutIntensity(workout: Workout): 'low' | 'moderate' | 'high' {
    const totalSets = workout.exercises.reduce((total, ex) => total + ex.sets.length, 0);
    const avgRestTime = workout.exercises.reduce((total, ex) => {
      const restTime = ex.sets.reduce((setTotal, set) => setTotal + (set.restTime || 60), 0);
      return total + restTime / ex.sets.length;
    }, 0) / workout.exercises.length;

    if (totalSets >= 20 || avgRestTime < 45) return 'high';
    if (totalSets >= 12 || avgRestTime < 75) return 'moderate';
    return 'low';
  }

  getMuscleGroupDistribution(workout: Workout): Record<string, number> {
    const distribution: Record<string, number> = {};
    
    workout.exercises.forEach(exercise => {
      const muscle = exercise.exercise.targetMuscle;
      distribution[muscle] = (distribution[muscle] || 0) + exercise.sets.length;
    });

    return distribution;
  }
}

// Export singleton instance
export const workoutService = new WorkoutService();
export default workoutService;