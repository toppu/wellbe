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

export default function NutritionHomeScreen() {
  const todayNutrition = {
    calories: 1650,
    protein: 85,
    carbs: 180,
    fat: 65,
    targetCalories: 2000,
    targetProtein: 150,
    targetCarbs: 250,
    targetFat: 67,
  };

  const meals = [
    { name: 'Breakfast', calories: 450, time: '8:30 AM' },
    { name: 'Lunch', calories: 650, time: '12:30 PM' },
    { name: 'Dinner', calories: 550, time: '7:00 PM' },
    { name: 'Snacks', calories: 0, time: 'Add snacks' },
  ];

  const quickActions = [
    { title: 'Take Photo', icon: 'camera', color: theme.colors.success },
    { title: 'Search Food', icon: 'search', color: theme.colors.primary },
    { title: 'Scan Barcode', icon: 'scan', color: theme.colors.secondary },
    { title: 'Quick Add', icon: 'add-circle', color: theme.colors.warning },
  ];

  const renderMacroCard = (name: string, current: number, target: number, unit: string, color: string) => (
    <View style={styles.macroCard}>
      <Text style={styles.macroName}>{name}</Text>
      <Text style={styles.macroValue}>{current}{unit}</Text>
      <Text style={styles.macroTarget}>of {target}{unit}</Text>
      <View style={styles.macroProgress}>
        <View style={[styles.macroProgressFill, { width: `${Math.min((current / target) * 100, 100)}%`, backgroundColor: color }]} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Calorie Overview */}
        <View style={styles.section}>
          <View style={styles.calorieCard}>
            <Text style={styles.calorieTitle}>Today's Calories</Text>
            <Text style={styles.calorieValue}>
              {todayNutrition.calories} / {todayNutrition.targetCalories}
            </Text>
            <Text style={styles.calorieRemaining}>
              {todayNutrition.targetCalories - todayNutrition.calories} remaining
            </Text>
            <View style={styles.calorieProgress}>
              <View 
                style={[
                  styles.calorieProgressFill, 
                  { width: `${(todayNutrition.calories / todayNutrition.targetCalories) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Macros */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Macronutrients</Text>
          <View style={styles.macrosGrid}>
            {renderMacroCard('Protein', todayNutrition.protein, todayNutrition.targetProtein, 'g', theme.colors.success)}
            {renderMacroCard('Carbs', todayNutrition.carbs, todayNutrition.targetCarbs, 'g', theme.colors.primary)}
            {renderMacroCard('Fat', todayNutrition.fat, todayNutrition.targetFat, 'g', theme.colors.warning)}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Log Food</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickAction}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Meals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          {meals.map((meal, index) => (
            <TouchableOpacity key={index} style={styles.mealCard}>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
              </View>
              <View style={styles.mealCalories}>
                <Text style={styles.mealCalorieText}>
                  {meal.calories > 0 ? `${meal.calories} kcal` : 'Add foods'}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
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
  calorieCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  calorieTitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  calorieValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  calorieRemaining: {
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  calorieProgress: {
    width: '100%',
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  calorieProgressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  macrosGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  macroCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  macroName: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  macroTarget: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  macroProgress: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  macroProgressFill: {
    height: '100%',
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
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  mealTime: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  mealCalories: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealCalorieText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
});