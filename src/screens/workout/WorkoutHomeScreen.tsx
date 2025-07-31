import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import Button from '../../components/Button';

export default function WorkoutHomeScreen() {
  const todayWorkout = {
    name: 'Upper Body Push',
    duration: 45,
    exercises: 6,
    isCompleted: false,
  };

  const weeklyStats = {
    workoutsCompleted: 4,
    totalDuration: 180,
    totalVolume: 8500,
  };

  const recentWorkouts = [
    { name: 'Upper Body Pull', date: '2 days ago', duration: 42 },
    { name: 'Lower Body', date: '3 days ago', duration: 55 },
    { name: 'Core & Cardio', date: '5 days ago', duration: 30 },
  ];

  const popularPrograms = [
    { name: 'Beginner Strength', duration: '8 weeks', difficulty: 'Beginner' },
    { name: 'Muscle Building', duration: '12 weeks', difficulty: 'Intermediate' },
    { name: 'Athletic Performance', duration: '16 weeks', difficulty: 'Advanced' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Today's Workout */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          <View style={styles.todayWorkoutCard}>
            <View style={styles.workoutHeader}>
              <View>
                <Text style={styles.workoutName}>{todayWorkout.name}</Text>
                <Text style={styles.workoutDetails}>
                  {todayWorkout.exercises} exercises • {todayWorkout.duration} min
                </Text>
              </View>
              <View style={styles.workoutIcon}>
                <Ionicons name="fitness" size={24} color={theme.colors.primary} />
              </View>
            </View>
            <Button
              title={todayWorkout.isCompleted ? 'Completed' : 'Start Workout'}
              onPress={() => {}}
              variant={todayWorkout.isCompleted ? 'outline' : 'primary'}
              style={styles.startButton}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.primary }]}>
                <Ionicons name="flash" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionTitle}>AI Workout</Text>
              <Text style={styles.actionSubtitle}>Personalized for you</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.secondary }]}>
                <Ionicons name="library" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionTitle}>Programs</Text>
              <Text style={styles.actionSubtitle}>Structured plans</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.success }]}>
                <Ionicons name="search" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionTitle}>Exercise Library</Text>
              <Text style={styles.actionSubtitle}>Browse exercises</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.actionIcon, { backgroundColor: theme.colors.warning }]}>
                <Ionicons name="timer" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionTitle}>Quick Workout</Text>
              <Text style={styles.actionSubtitle}>15 min sessions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{weeklyStats.workoutsCompleted}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{weeklyStats.totalDuration}m</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{weeklyStats.totalVolume}kg</Text>
              <Text style={styles.statLabel}>Volume</Text>
            </View>
          </View>
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          {recentWorkouts.map((workout, index) => (
            <TouchableOpacity key={index} style={styles.workoutCard}>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutCardName}>{workout.name}</Text>
                <Text style={styles.workoutCardDate}>{workout.date} • {workout.duration} min</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Programs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Programs</Text>
          {popularPrograms.map((program, index) => (
            <TouchableOpacity key={index} style={styles.programCard}>
              <View style={styles.programInfo}>
                <Text style={styles.programName}>{program.name}</Text>
                <Text style={styles.programDetails}>
                  {program.duration} • {program.difficulty}
                </Text>
              </View>
              <View style={styles.programBadge}>
                <Text style={styles.programBadgeText}>View</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  todayWorkoutCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  workoutDetails: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  workoutIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    marginTop: theme.spacing.sm,
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
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  workoutCardDate: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  programCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  programInfo: {
    flex: 1,
  },
  programName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  programDetails: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  programBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
  },
  programBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});