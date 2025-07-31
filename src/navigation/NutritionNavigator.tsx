import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NutritionStackParamList } from '../types';
import { theme } from '../constants/theme';

// Screen imports (we'll create these)
import NutritionHomeScreen from '../screens/nutrition/NutritionHomeScreen';
import FoodCameraScreen from '../screens/nutrition/FoodCameraScreen';
import FoodSearchScreen from '../screens/nutrition/FoodSearchScreen';
import BarcodeScannerScreen from '../screens/nutrition/BarcodeScannerScreen';
import FoodDetailsScreen from '../screens/nutrition/FoodDetailsScreen';
import MealLogScreen from '../screens/nutrition/MealLogScreen';

const NutritionStack = createNativeStackNavigator<NutritionStackParamList>();

export default function NutritionNavigator() {
  return (
    <NutritionStack.Navigator
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
      <NutritionStack.Screen
        name="NutritionHome"
        component={NutritionHomeScreen}
        options={{
          title: 'Nutrition',
          headerShown: true,
        }}
      />
      <NutritionStack.Screen
        name="FoodCamera"
        component={FoodCameraScreen}
        options={{
          title: 'Capture Food',
          headerShown: true,
        }}
      />
      <NutritionStack.Screen
        name="FoodSearch"
        component={FoodSearchScreen}
        options={{
          title: 'Search Food',
          headerShown: true,
        }}
      />
      <NutritionStack.Screen
        name="BarcodeScanner"
        component={BarcodeScannerScreen}
        options={{
          title: 'Scan Barcode',
          headerShown: true,
        }}
      />
      <NutritionStack.Screen
        name="FoodDetails"
        component={FoodDetailsScreen}
        options={{
          title: 'Food Details',
          headerShown: true,
        }}
      />
      <NutritionStack.Screen
        name="MealLog"
        component={MealLogScreen}
        options={{
          title: 'Meal Log',
          headerShown: true,
        }}
      />
    </NutritionStack.Navigator>
  );
}