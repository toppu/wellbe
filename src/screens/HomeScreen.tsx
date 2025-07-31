import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import Button from '../components/Button';

export default function HomeScreen() {
  // Mock data - in real app this would come from state management
  const userStats = {
    todayCalories: 1650,
    targetCalories: 2000,
    todayWorkouts: 1,
    weeklyWorkouts: 4,
    currentWeight: 75.2,
    targetWeight: 70.0,
  };

  const quickActions = [
    {
      id: 'log-food',
      title: 'Log Food',
      icon: 'camera' as keyof typeof Ionicons.glyphMap,
      color: theme.colors.success,
    },
    {
      id: 'start-workout',
      title: 'Start Workout',
      icon: 'fitness' as keyof typeof Ionicons.glyphMap,
      color: theme.colors.primary,
    },
    {
      id: 'log-weight',
      title: 'Log Weight',
      icon: 'scale' as keyof typeof Ionicons.glyphMap,
      color: theme.colors.secondary,
    },
    {
      id: 'view-progress',
      title: 'View Progress',
      icon: 'analytics' as keyof typeof Ionicons.glyphMap,
      color: theme.colors.warning,
    },
  ];

  const renderQuickAction = (action: typeof quickActions[0]) => (
    <TouchableOpacity key={action.id} style={styles.quickAction}>
      <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
        <Ionicons name={action.icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.actionTitle}>{action.title}</Text>
    </TouchableOpacity>
  );

  const renderStatCard = (title: string, value: string, subtitle?: string, progress?: number) => (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      {progress !== undefined && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      )}
    </View>
  );

  const calorieProgress = (userStats.todayCalories / userStats.targetCalories) * 100;
  const workoutProgress = (userStats.weeklyWorkouts / 7) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.subtitle}>Ready to crush your goals?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={32} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Today's Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsGrid}>
            {renderStatCard(
              'Calories',
              `${userStats.todayCalories}/${userStats.targetCalories}`,
              'kcal consumed',
              calorieProgress
            )}
            {renderStatCard(
              'Workouts',
              `${userStats.weeklyWorkouts}/7`,
              'this week',
              workoutProgress
            )}
          </View>
        </View>

        {/* Weight Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weight Progress</Text>
          <View style={styles.weightCard}>
            <View style={styles.weightInfo}>
              <Text style={styles.weightCurrent}>{userStats.currentWeight} kg</Text>
              <Text style={styles.weightTarget}>Target: {userStats.targetWeight} kg</Text>
              <Text style={styles.weightRemaining}>
                {(userStats.currentWeight - userStats.targetWeight).toFixed(1)} kg to go
              </Text>
            </View>
            <TouchableOpacity style={styles.viewAvatarButton}>
              <Ionicons name="body" size={24} color={theme.colors.primary} />
              <Text style={styles.viewAvatarText}>View 3D Avatar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
              <Text style={styles.activityText}>Completed Upper Body Workout</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Ionicons name="restaurant" size={20} color={theme.colors.primary} />
              <Text style={styles.activityText}>Logged lunch - Grilled chicken salad</Text>
              <Text style={styles.activityTime}>4 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Ionicons name="scale" size={20} color={theme.colors.secondary} />
              <Text style={styles.activityText}>Recorded weight - 75.2 kg</Text>
              <Text style={styles.activityTime}>Yesterday</Text>
            </View>
          </View>
        </View>

        {/* Motivational Quote */}
        <View style={styles.section}>
          <View style={styles.quoteCard}>
            <Text style={styles.quote}>
              "The groundwork for all happiness is good health."
            </Text>
            <Text style={styles.quoteAuthor}>— Leigh Hunt</Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  profileButton: {
    padding: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statTitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  weightCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  weightInfo: {
    marginBottom: theme.spacing.md,
  },
  weightCurrent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  weightTarget: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  weightRemaining: {
    fontSize: 14,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
  viewAvatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  viewAvatarText: {
    fontSize: 14,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  quickAction: {
    width: '48%',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  activityTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  quoteCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  quoteAuthor: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
});