import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgressStackParamList } from '../types';
import { theme } from '../constants/theme';

// Screen imports (we'll create these)
import ProgressHomeScreen from '../screens/progress/ProgressHomeScreen';
import WeightTrackerScreen from '../screens/progress/WeightTrackerScreen';
import MeasurementsScreen from '../screens/progress/MeasurementsScreen';
import WorkoutHistoryScreen from '../screens/progress/WorkoutHistoryScreen';
import NutritionHistoryScreen from '../screens/progress/NutritionHistoryScreen';

const ProgressStack = createNativeStackNavigator<ProgressStackParamList>();

export default function ProgressNavigator() {
  return (
    <ProgressStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <ProgressStack.Screen
        name="ProgressHome"
        component={ProgressHomeScreen}
        options={{
          title: 'Progress',
          headerShown: true,
        }}
      />
      <ProgressStack.Screen
        name="WeightTracker"
        component={WeightTrackerScreen}
        options={{
          title: 'Weight Tracker',
          headerShown: true,
        }}
      />
      <ProgressStack.Screen
        name="Measurements"
        component={MeasurementsScreen}
        options={{
          title: 'Body Measurements',
          headerShown: true,
        }}
      />
      <ProgressStack.Screen
        name="WorkoutHistory"
        component={WorkoutHistoryScreen}
        options={{
          title: 'Workout History',
          headerShown: true,
        }}
      />
      <ProgressStack.Screen
        name="NutritionHistory"
        component={NutritionHistoryScreen}
        options={{
          title: 'Nutrition History',
          headerShown: true,
        }}
      />
    </ProgressStack.Navigator>
  );
}