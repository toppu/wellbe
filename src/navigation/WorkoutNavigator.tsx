import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkoutStackParamList } from '../types';
import { theme } from '../constants/theme';

// Screen imports (we'll create these)
import WorkoutHomeScreen from '../screens/workout/WorkoutHomeScreen';
import WorkoutPlannerScreen from '../screens/workout/WorkoutPlannerScreen';
import ProgramLibraryScreen from '../screens/workout/ProgramLibraryScreen';
import WorkoutDetailsScreen from '../screens/workout/WorkoutDetailsScreen';
import ActiveWorkoutScreen from '../screens/workout/ActiveWorkoutScreen';
import ExerciseDetailsScreen from '../screens/workout/ExerciseDetailsScreen';

const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();

export default function WorkoutNavigator() {
  return (
    <WorkoutStack.Navigator
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
      <WorkoutStack.Screen
        name="WorkoutHome"
        component={WorkoutHomeScreen}
        options={{
          title: 'Workouts',
          headerShown: true,
        }}
      />
      <WorkoutStack.Screen
        name="WorkoutPlanner"
        component={WorkoutPlannerScreen}
        options={{
          title: 'AI Workout Planner',
          headerShown: true,
        }}
      />
      <WorkoutStack.Screen
        name="ProgramLibrary"
        component={ProgramLibraryScreen}
        options={{
          title: 'Program Library',
          headerShown: true,
        }}
      />
      <WorkoutStack.Screen
        name="WorkoutDetails"
        component={WorkoutDetailsScreen}
        options={{
          title: 'Workout Details',
          headerShown: true,
        }}
      />
      <WorkoutStack.Screen
        name="ActiveWorkout"
        component={ActiveWorkoutScreen}
        options={{
          title: 'Active Workout',
          headerShown: true,
        }}
      />
      <WorkoutStack.Screen
        name="ExerciseDetails"
        component={ExerciseDetailsScreen}
        options={{
          title: 'Exercise Details',
          headerShown: true,
        }}
      />
    </WorkoutStack.Navigator>
  );
}