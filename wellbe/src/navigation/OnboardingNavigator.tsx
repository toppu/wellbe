import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../constants/theme';

// Screen imports (we'll create these)
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

const OnboardingStack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <OnboardingStack.Screen
        name="OnboardingFlow"
        component={OnboardingScreen}
      />
    </OnboardingStack.Navigator>
  );
}