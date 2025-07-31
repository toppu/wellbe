import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, MainTabParamList } from '../types';
import { theme } from '../constants/theme';

// Screen imports (we'll create these next)
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import HomeScreen from '../screens/HomeScreen';
import NutritionNavigator from './NutritionNavigator';
import WorkoutNavigator from './WorkoutNavigator';
import ProgressNavigator from './ProgressNavigator';
import ProfileNavigator from './ProfileNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Nutrition':
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              break;
            case 'Workouts':
              iconName = focused ? 'fitness' : 'fitness-outline';
              break;
            case 'Progress':
              iconName = focused ? 'analytics' : 'analytics-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        headerShown: false,
      })}
    >
      <MainTab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <MainTab.Screen 
        name="Nutrition" 
        component={NutritionNavigator}
        options={{ title: 'Nutrition' }}
      />
      <MainTab.Screen 
        name="Workouts" 
        component={WorkoutNavigator}
        options={{ title: 'Workouts' }}
      />
      <MainTab.Screen 
        name="Progress" 
        component={ProgressNavigator}
        options={{ title: 'Progress' }}
      />
      <MainTab.Screen 
        name="Profile" 
        component={ProfileNavigator}
        options={{ title: 'Profile' }}
      />
    </MainTab.Navigator>
  );
}

export default function AppNavigator() {
  // TODO: Add authentication state management
  const isAuthenticated = false;
  const isOnboardingComplete = false;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : !isOnboardingComplete ? (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={MainTabNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}