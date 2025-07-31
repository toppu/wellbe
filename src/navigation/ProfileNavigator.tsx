import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types';
import { theme } from '../constants/theme';

// Screen imports (we'll create these)
import ProfileHomeScreen from '../screens/profile/ProfileHomeScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import GymFinderScreen from '../screens/profile/GymFinderScreen';
import AvatarViewerScreen from '../screens/profile/AvatarViewerScreen';
import HealthSyncScreen from '../screens/profile/HealthSyncScreen';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <ProfileStack.Navigator
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
      <ProfileStack.Screen
        name="ProfileHome"
        component={ProfileHomeScreen}
        options={{
          title: 'Profile',
          headerShown: true,
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
          headerShown: true,
        }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: true,
        }}
      />
      <ProfileStack.Screen
        name="GymFinder"
        component={GymFinderScreen}
        options={{
          title: 'Find Gyms',
          headerShown: true,
        }}
      />
      <ProfileStack.Screen
        name="AvatarViewer"
        component={AvatarViewerScreen}
        options={{
          title: '3D Avatar',
          headerShown: true,
        }}
      />
      <ProfileStack.Screen
        name="HealthSync"
        component={HealthSyncScreen}
        options={{
          title: 'Health Sync',
          headerShown: true,
        }}
      />
    </ProfileStack.Navigator>
  );
}