import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NutritionStackParamList, FoodAnalysisResult } from '../../types';
import { theme } from '../../constants/theme';
import nutritionService from '../../services/NutritionService';
import Button from '../../components/Button';

type FoodCameraScreenProps = {
  navigation: NativeStackNavigationProp<NutritionStackParamList, 'FoodCamera'>;
};

export default function FoodCameraScreen({ navigation }: FoodCameraScreenProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null);

  const selectFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please allow access to your photo library to select images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
        console.log('🖼️ Image selected from gallery:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const takePictureFromCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please allow access to your camera to take photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
        console.log('📸 Photo captured from camera:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };

  const analyzeImage = async () => {
    if (!capturedImage) return;

    setAnalyzing(true);
    try {
      const response = await nutritionService.analyzeImage({ imageUri: capturedImage });
      
      if (response.success && response.data) {
        setAnalysisResult(response.data);
        console.log('🤖 AI analysis completed:', response.data);
      } else {
        Alert.alert('Analysis Failed', response.error || 'Failed to analyze the image. Please try again.');
      }
    } catch (error: any) {
      console.error('Analysis error:', error);
      Alert.alert('Error', 'An error occurred during analysis. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
  };

  const proceedWithResults = () => {
    if (analysisResult) {
      Alert.alert(
        'Analysis Complete',
        `Found ${analysisResult.foods.length} food items with ${analysisResult.totalNutrition.calories} total calories.`,
        [
          { text: 'Edit Results', onPress: () => console.log('Navigate to edit screen') },
          { text: 'Log Food', onPress: () => console.log('Log the analyzed food') },
        ]
      );
    }
  };

  if (capturedImage) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Captured Image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
          </View>

          {/* Analysis Results */}
          {analyzing && (
            <View style={styles.analysisContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.analysisText}>Analyzing your food...</Text>
              <Text style={styles.analysisSubtext}>This may take a few seconds</Text>
            </View>
          )}

          {analysisResult && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Analysis Results</Text>
              
              {/* Total Nutrition */}
              <View style={styles.totalNutritionCard}>
                <Text style={styles.totalCalories}>
                  {analysisResult.totalNutrition.calories} calories
                </Text>
                <View style={styles.macrosRow}>
                  <Text style={styles.macroText}>
                    Protein: {analysisResult.totalNutrition.protein.toFixed(1)}g
                  </Text>
                  <Text style={styles.macroText}>
                    Carbs: {analysisResult.totalNutrition.carbs.toFixed(1)}g
                  </Text>
                  <Text style={styles.macroText}>
                    Fat: {analysisResult.totalNutrition.fat.toFixed(1)}g
                  </Text>
                </View>
              </View>

              {/* Detected Foods */}
              <Text style={styles.foodsTitle}>Detected Foods:</Text>
              {analysisResult.foods.map((food, index) => (
                <View key={index} style={styles.foodItem}>
                  <View style={styles.foodHeader}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.foodConfidence}>
                      {Math.round(food.confidence * 100)}% confident
                    </Text>
                  </View>
                  <Text style={styles.foodQuantity}>{food.quantity}</Text>
                  <Text style={styles.foodCalories}>{food.nutrition.calories} kcal</Text>
                </View>
              ))}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {!analysisResult && !analyzing && (
              <>
                <Button
                  title="Analyze Food"
                  onPress={analyzeImage}
                  style={styles.actionButton}
                />
                <Button
                  title="Retake Photo"
                  onPress={retakePhoto}
                  variant="outline"
                  style={styles.actionButton}
                />
              </>
            )}

            {analysisResult && (
              <>
                <Button
                  title="Proceed with Results"
                  onPress={proceedWithResults}
                  style={styles.actionButton}
                />
                <Button
                  title="Retake Photo"
                  onPress={retakePhoto}
                  variant="outline"
                  style={styles.actionButton}
                />
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="camera" size={80} color={theme.colors.primary} />
          <Text style={styles.title}>Food Camera</Text>
          <Text style={styles.subtitle}>
            Capture or select a photo of your meal for AI-powered nutrition analysis
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <Button
            title="Take Photo"
            onPress={takePictureFromCamera}
            style={styles.optionButton}
          />
          
          <Button
            title="Select from Gallery"
            onPress={selectFromGallery}
            variant="outline"
            style={styles.optionButton}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How it works:</Text>
          <Text style={styles.infoText}>
            1. Take a photo or select from gallery{'\n'}
            2. AI analyzes your food{'\n'}
            3. Review and edit results{'\n'}
            4. Log to your nutrition diary
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  optionButton: {
    marginBottom: theme.spacing.md,
  },
  infoContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    width: '100%',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    padding: theme.spacing.md,
  },
  capturedImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  analysisContainer: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  analysisText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  analysisSubtext: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
  resultsContainer: {
    padding: theme.spacing.md,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  totalNutritionCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: 12,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  totalCalories: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  macroText: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
  },
  foodsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  foodItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 8,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  foodConfidence: {
    fontSize: 12,
    color: theme.colors.success,
    fontWeight: '500',
  },
  foodQuantity: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  foodCalories: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  actionButtons: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  actionButton: {
    marginBottom: theme.spacing.sm,
  },
});