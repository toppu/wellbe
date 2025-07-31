import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';
import apiClient from './ApiClient';
import { User, ApiResponse } from '../types';
import { defaultUser, mockUsers } from './mocks/mockData';

// Authentication request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

class AuthService {
  private currentUser: User | null = null;

  // Mock Authentication Methods
  private async mockLogin(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple mock validation
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user || credentials.password.length < 6) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    const authResponse: AuthResponse = {
      user,
      accessToken: `mock_access_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
    };

    // Store tokens in AsyncStorage
    await AsyncStorage.setItem('auth_token', authResponse.accessToken);
    await AsyncStorage.setItem('refresh_token', authResponse.refreshToken);
    await AsyncStorage.setItem('user_data', JSON.stringify(user));

    // Set auth token in API client
    await apiClient.setAuthToken(authResponse.accessToken);
    this.currentUser = user;

    console.log('🔑 Mock login successful:', user.email);

    return {
      success: true,
      data: authResponse,
    };
  }

  private async mockRegister(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return {
        success: false,
        error: 'User with this email already exists',
      };
    }

    // Create new user
    const newUser: User = {
      id: `${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      isOnboardingComplete: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to mock users array
    mockUsers.push(newUser);

    const authResponse: AuthResponse = {
      user: newUser,
      accessToken: `mock_access_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
    };

    // Store tokens
    await AsyncStorage.setItem('auth_token', authResponse.accessToken);
    await AsyncStorage.setItem('refresh_token', authResponse.refreshToken);
    await AsyncStorage.setItem('user_data', JSON.stringify(newUser));

    await apiClient.setAuthToken(authResponse.accessToken);
    this.currentUser = newUser;

    console.log('🆕 Mock registration successful:', newUser.email);

    return {
      success: true,
      data: authResponse,
    };
  }

  private async mockForgotPassword(request: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check if user exists
    const user = mockUsers.find(u => u.email === request.email);
    if (!user) {
      return {
        success: false,
        error: 'No account found with this email address',
      };
    }

    console.log('📧 Mock password reset email sent to:', request.email);

    return {
      success: true,
      data: { message: 'Password reset email sent successfully' },
    };
  }

  // Real API Authentication Methods
  private async apiLogin(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(
      CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.success && response.data) {
      await AsyncStorage.setItem('auth_token', response.data.accessToken);
      await AsyncStorage.setItem('refresh_token', response.data.refreshToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(response.data.user));
      
      await apiClient.setAuthToken(response.data.accessToken);
      this.currentUser = response.data.user;
    }

    return response;
  }

  private async apiRegister(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(
      CONFIG.ENDPOINTS.AUTH.REGISTER,
      userData
    );

    if (response.success && response.data) {
      await AsyncStorage.setItem('auth_token', response.data.accessToken);
      await AsyncStorage.setItem('refresh_token', response.data.refreshToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(response.data.user));
      
      await apiClient.setAuthToken(response.data.accessToken);
      this.currentUser = response.data.user;
    }

    return response;
  }

  private async apiForgotPassword(request: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return await apiClient.post<{ message: string }>(
      CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD,
      request
    );
  }

  // Public Methods (automatically switch between mock and real API)
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockLogin(credentials);
      } else {
        return await this.apiLogin(credentials);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockRegister(userData);
      } else {
        return await this.apiRegister(userData);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message || 'Registration failed',
      };
    }
  }

  async forgotPassword(request: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      if (CONFIG.USE_MOCK_SERVICES) {
        return await this.mockForgotPassword(request);
      } else {
        return await this.apiForgotPassword(request);
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send reset email',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint if using real API
      if (!CONFIG.USE_MOCK_SERVICES) {
        await apiClient.post(CONFIG.ENDPOINTS.AUTH.LOGOUT);
      }

      // Clear local storage
      await AsyncStorage.multiRemove(['auth_token', 'refresh_token', 'user_data']);
      await apiClient.clearAuthToken();
      this.currentUser = null;

      console.log('👋 Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local data
      await AsyncStorage.multiRemove(['auth_token', 'refresh_token', 'user_data']);
      await apiClient.clearAuthToken();
      this.currentUser = null;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData) {
        this.currentUser = JSON.parse(userData);
        return this.currentUser;
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }

    return null;
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userData = await AsyncStorage.getItem('user_data');
      
      if (token && userData) {
        this.currentUser = JSON.parse(userData);
        await apiClient.setAuthToken(token);
        return true;
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }

    return false;
  }

  async checkOnboardingStatus(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user?.isOnboardingComplete ?? false;
  }

  // Development helper method
  async loginAsDefaultUser(): Promise<ApiResponse<AuthResponse>> {
    if (CONFIG.USE_MOCK_SERVICES) {
      return await this.login({
        email: defaultUser.email,
        password: 'password123',
      });
    }

    throw new Error('Default user login only available in mock mode');
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;