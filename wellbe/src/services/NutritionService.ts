import { CONFIG } from '../constants/config';
import apiClient from './ApiClient';
import { FoodItem, LoggedFood, FoodAnalysisResult, ApiResponse } from '../types';
import { mockFoodItems } from './mocks/mockData';

// Request/Response types
export interface FoodSearchRequest {
  query: string;
  limit?: number;
  offset?: number;
}

export interface FoodAnalysisRequest {
  imageUri: string;
}

export interface LogFoodRequest {
  foodId: string;
  quantity: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date?: string;
}

export interface BarcodeRequest {
  barcode: string;
}

export interface DailyNutritionResponse {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: {
    breakfast: LoggedFood[];
    lunch: LoggedFood[];
    dinner: LoggedFood[];
    snack: LoggedFood[];
  };
}

class NutritionService {
  // Mock Methods
  private async mockSearchFood(request: FoodSearchRequest): Promise<ApiResponse<FoodItem[]>> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const { query, limit = 20 } = request;
    const searchQuery = query.toLowerCase();

    const results = mockFoodItems.filter(food =>
      food.name.toLowerCase().includes(searchQuery) ||
      food.brand?.toLowerCase().includes(searchQuery)
    ).slice(0, limit);

    console.log(`🔍 Mock food search for "${query}": ${results.length} results`);

    return {
      success: true,
      data: results,
    };
  }

  private async mockAnalyzeImage(request: FoodAnalysisRequest): Promise<ApiResponse<FoodAnalysisResult>> {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate longer processing

    // Mock AI analysis result
    const mockResult: FoodAnalysisResult = {
      foods: [
        {
          name: 'Grilled Chicken Breast',
          quantity: '150g',
          confidence: 0.92,
          nutrition: {
            brand: 'Generic',
            servingSize: '150',
            servingUnit: 'g',
            calories: 248,
            protein: 46.5,
            carbs: 0,
            fat: 5.4,
            fiber: 0,
            sugar: 0,
            sodium: 111,
          },
        },
        {
          name: 'Brown Rice',
          quantity: '100g',
          confidence: 0.87,
          nutrition: {
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
        },
      ],
      totalNutrition: {
        calories: 371,
        protein: 49.1,
        carbs: 25,
        fat: 6.3,
      },
    };

    console.log('📸 Mock image analysis completed');

    return {
      success: true,
      data: mockResult,
    };
  }

  private async mockScanBarcode(request: BarcodeRequest): Promise<ApiResponse<FoodItem>> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock barcode lookup
    const mockProduct: FoodItem = {
      id: 'barcode_' + request.barcode,
      name: 'Organic Greek Yogurt',
      brand: 'Chobani',
      barcode: request.barcode,
      servingSize: '170',
      servingUnit: 'g',
      calories: 100,
      protein: 18,
      carbs: 6,
      fat: 0,
      fiber: 0,
      sugar: 6,
      sodium: 65,
    };

    console.log(`📱 Mock barcode scan: ${request.barcode}`);

    return {
      success: true,
      data: mockProduct,
    };
  }

  private async mockLogFood(request: LogFoodRequest): Promise<ApiResponse<LoggedFood>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const food = mockFoodItems.find(f => f.id === request.foodId);
    if (!food) {
      return {
        success: false,
        error: 'Food item not found',
      };
    }

    const loggedFood: LoggedFood = {
      id: `log_${Date.now()}`,
      foodItem: food,
      quantity: request.quantity,
      mealType: request.mealType,
      loggedAt: request.date || new Date().toISOString(),
      userId: '1', // Mock user ID
    };

    console.log(`🍽️ Mock food logged: ${food.name} (${request.quantity}x) for ${request.mealType}`);

    return {
      success: true,
      data: loggedFood,
    };
  }

  private async mockGetDailyNutrition(date: string): Promise<ApiResponse<DailyNutritionResponse>> {
    await new Promise(resolve => setTimeout(resolve, 400));

    // Mock daily nutrition data
    const mockDaily: DailyNutritionResponse = {
      date,
      totalCalories: 1650,
      totalProtein: 85,
      totalCarbs: 180,
      totalFat: 65,
      meals: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      },
    };

    console.log(`📊 Mock daily nutrition for ${date}`);

    return {
      success: true,
      data: mockDaily,
    };
  }

  // Real API Methods
  private async apiSearchFood(request: FoodSearchRequest): Promise<ApiResponse<FoodItem[]>> {
    return await apiClient.get<FoodItem[]>(CONFIG.ENDPOINTS.NUTRITION.FOOD_SEARCH, {
      params: request,
    });
  }

  private async apiAnalyzeImage(request: FoodAnalysisRequest): Promise<ApiResponse<FoodAnalysisResult>> {
    const formData = new FormData();
    formData.append('image', {
      uri: request.imageUri,
      type: 'image/jpeg',
      name: 'food_image.jpg',
    } as any);

    return await apiClient.uploadFile<FoodAnalysisResult>(
      CONFIG.ENDPOINTS.NUTRITION.ANALYZE_IMAGE,
      formData
    );
  }

  private async apiScanBarcode(request: BarcodeRequest): Promise<ApiResponse<FoodItem>> {
    return await apiClient.get<FoodItem>(
      `${CONFIG.ENDPOINTS.NUTRITION.BARCODE_SCAN}/${request.barcode}`
    );
  }

  private async apiLogFood(request: LogFoodRequest): Promise<ApiResponse<LoggedFood>> {
    return await apiClient.post<LoggedFood>(CONFIG.ENDPOINTS.NUTRITION.LOG_FOOD, request);
  }

  private async apiGetDailyNutrition(date: string): Promise<ApiResponse<DailyNutritionResponse>> {
    return await apiClient.get<DailyNutritionResponse>(
      `${CONFIG.ENDPOINTS.NUTRITION.DAILY_LOG}?date=${date}`
    );
  }

  // Public Methods (automatically switch between mock and real API)
  async searchFood(request: FoodSearchRequest): Promise<ApiResponse<FoodItem[]>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockSearchFood(request);
      } else {
        return await this.apiSearchFood(request);
      }
    } catch (error: any) {
      console.error('Food search error:', error);
      return {
        success: false,
        error: error.message || 'Failed to search food',
      };
    }
  }

  async analyzeImage(request: FoodAnalysisRequest): Promise<ApiResponse<FoodAnalysisResult>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockAnalyzeImage(request);
      } else {
        return await this.apiAnalyzeImage(request);
      }
    } catch (error: any) {
      console.error('Image analysis error:', error);
      return {
        success: false,
        error: error.message || 'Failed to analyze image',
      };
    }
  }

  async scanBarcode(request: BarcodeRequest): Promise<ApiResponse<FoodItem>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockScanBarcode(request);
      } else {
        return await this.apiScanBarcode(request);
      }
    } catch (error: any) {
      console.error('Barcode scan error:', error);
      return {
        success: false,
        error: error.message || 'Failed to scan barcode',
      };
    }
  }

  async logFood(request: LogFoodRequest): Promise<ApiResponse<LoggedFood>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockLogFood(request);
      } else {
        return await this.apiLogFood(request);
      }
    } catch (error: any) {
      console.error('Food logging error:', error);
      return {
        success: false,
        error: error.message || 'Failed to log food',
      };
    }
  }

  async getDailyNutrition(date: string = new Date().toISOString().split('T')[0]): Promise<ApiResponse<DailyNutritionResponse>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockGetDailyNutrition(date);
      } else {
        return await this.apiGetDailyNutrition(date);
      }
    } catch (error: any) {
      console.error('Get daily nutrition error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get daily nutrition',
      };
    }
  }

  async getFoodDetails(foodId: string): Promise<ApiResponse<FoodItem>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        await new Promise(resolve => setTimeout(resolve, 200));
        const food = mockFoodItems.find(f => f.id === foodId);
        
        if (!food) {
          return {
            success: false,
            error: 'Food not found',
          };
        }

        return {
          success: true,
          data: food,
        };
      } else {
        return await apiClient.get<FoodItem>(`${CONFIG.ENDPOINTS.NUTRITION.FOOD_DETAILS}/${foodId}`);
      }
    } catch (error: any) {
      console.error('Get food details error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get food details',
      };
    }
  }

  // Helper methods
  calculateNutritionRatios(totalCalories: number, protein: number, carbs: number, fat: number) {
    const proteinCalories = protein * 4;
    const carbsCalories = carbs * 4;
    const fatCalories = fat * 9;

    return {
      proteinPercentage: totalCalories > 0 ? (proteinCalories / totalCalories) * 100 : 0,
      carbsPercentage: totalCalories > 0 ? (carbsCalories / totalCalories) * 100 : 0,
      fatPercentage: totalCalories > 0 ? (fatCalories / totalCalories) * 100 : 0,
    };
  }

  calculateCaloriesFromMacros(protein: number, carbs: number, fat: number): number {
    return (protein * 4) + (carbs * 4) + (fat * 9);
  }
}

// Export singleton instance
export const nutritionService = new NutritionService();
export default nutritionService;