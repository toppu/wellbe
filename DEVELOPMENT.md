# wellbe Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run ios     # iOS simulator
npm run android # Android emulator
npm run web     # Web browser
```

## Project Status

### ✅ Completed Features
- **Project Setup**: React Native with Expo and TypeScript
- **Navigation Structure**: Complete navigation with tab and stack navigators
- **UI Components**: Reusable Button and Input components with theming
- **Authentication Screens**: Login, register, and forgot password interfaces
- **Dashboard**: Beautiful home screen with statistics and quick actions
- **Nutrition Interface**: Comprehensive nutrition tracking UI with macros
- **Workout Interface**: Workout planning and program selection UI
- **Theme System**: Consistent design tokens and styling
- **TypeScript Integration**: Complete type safety throughout the app

### 🚧 In Progress
- App testing and refinement

### 📋 Next Steps
1. **API Integration**: Connect with backend services
2. **Camera Implementation**: Food photo capture and analysis
3. **State Management**: Add Redux or Context API
4. **Data Persistence**: Implement local storage
5. **Charts & Analytics**: Add progress visualization
6. **Real Features**: Replace placeholder screens with functionality

## Architecture Overview

### Navigation Flow
```
App.tsx
└── AppNavigator
    ├── AuthNavigator (Login, Register, ForgotPassword)
    ├── OnboardingNavigator (User setup flow)
    └── MainTabNavigator
        ├── Home (Dashboard)
        ├── Nutrition (Food logging and tracking)
        ├── Workouts (Exercise planning and tracking)
        ├── Progress (Analytics and charts)
        └── Profile (Settings and user management)
```

### Component Structure
```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx       # Custom button with variants
│   └── Input.tsx        # Form input with validation
├── constants/
│   └── theme.ts         # Design system and colors
├── navigation/          # All navigation configurations
├── screens/            # Screen components organized by feature
├── types/              # TypeScript definitions
└── utils/              # Helper functions
```

## Key Design Decisions

### Why Expo?
- **Rapid Development**: Quick setup and testing
- **Cross-platform**: Single codebase for iOS and Android
- **Rich Ecosystem**: Built-in access to device APIs
- **Easy Deployment**: Simplified build and distribution

### Why TypeScript?
- **Type Safety**: Catch errors at compile time
- **Better DX**: Excellent autocomplete and refactoring
- **Maintainability**: Self-documenting code
- **Team Productivity**: Reduced bugs and faster development

### Navigation Strategy
- **React Navigation v6**: Industry standard, well-maintained
- **Type-safe Navigation**: Full TypeScript support for routes
- **Nested Navigators**: Clean separation of app sections
- **Tab + Stack Pattern**: Familiar mobile app navigation

### Styling Approach
- **StyleSheet API**: React Native's built-in styling
- **Theme System**: Centralized design tokens
- **Component-based**: Reusable styled components
- **Responsive Design**: Flexible layouts for all screens

## Development Workflow

### 1. Setting Up New Features
```bash
# Create new screen
touch src/screens/[category]/NewScreen.tsx

# Update navigator
# Edit src/navigation/[Category]Navigator.tsx

# Add types
# Edit src/types/index.ts
```

### 2. Component Development
```tsx
// Template for new components
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface ComponentProps {
  // Define props
}

export default function Component({ }: ComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Use theme values
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
  },
});
```

### 3. Adding API Integration
```typescript
// 1. Define types in src/types/index.ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// 2. Create service in src/services/
export class ApiService {
  static async fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
    // Implementation
  }
}

// 3. Use in components with hooks
const [data, setData] = useState<DataType[]>([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  loadData();
}, []);
```

## Testing Strategy

### Unit Testing (Planned)
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react-native

# Run tests
npm test
```

### E2E Testing (Planned)
```bash
# Install Detox for E2E testing
npm install --save-dev detox

# Run E2E tests
npm run e2e
```

### Manual Testing
- **iOS Simulator**: Test iOS-specific behavior
- **Android Emulator**: Test Android-specific behavior
- **Physical Devices**: Test real-world performance
- **Expo Go**: Quick testing on multiple devices

## Performance Considerations

### Optimization Techniques
- **Image Optimization**: Compress and lazy-load images
- **List Optimization**: Use FlatList for large datasets
- **State Management**: Minimize re-renders with proper state design
- **Bundle Splitting**: Code splitting for reduced initial load
- **Caching**: Cache API responses and images

### Memory Management
- **Cleanup Effects**: Properly cleanup useEffect hooks
- **Image Handling**: Dispose of camera/image picker resources
- **Navigation**: Clear unnecessary stack states

## API Integration Plan

### Priority 1: Core APIs
1. **Authentication API**: User login/register
2. **Food Database**: Nutrition information
3. **Exercise Database**: Workout content

### Priority 2: AI Features
1. **Food Recognition**: Image analysis
2. **Workout Generation**: AI recommendations

### Priority 3: Platform Integration
1. **Health APIs**: HealthKit/Google Fit
2. **Location APIs**: Gym finder
3. **Social APIs**: Authentication providers

## Deployment

### Development Builds
```bash
# Create development build
npx expo build:ios --type simulator
npx expo build:android --type apk

# Install on device
npx expo install:ios
npx expo install:android
```

### Production Builds
```bash
# Build for app stores
npx expo build:ios --type archive
npx expo build:android --type app-bundle

# Submit to stores
npx expo upload:ios
npx expo upload:android
```

## Troubleshooting

### Common Issues

**Metro bundler issues:**
```bash
npm start -- --clear-cache
```

**iOS simulator not starting:**
```bash
xcrun simctl list devices
npx expo run:ios --device "iPhone 15"
```

**Android build errors:**
```bash
cd android && ./gradlew clean
cd .. && npm run android
```

**TypeScript errors:**
```bash
npx tsc --noEmit
```

### Performance Issues
- Check bundle size with `npx expo bundle-analyzer`
- Profile with React DevTools
- Use Flipper for debugging

## Contributing Guidelines

### Code Style
- **TypeScript**: Always use TypeScript
- **ESLint**: Follow linting rules
- **Prettier**: Consistent code formatting
- **Naming**: Use descriptive, clear names

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Pull Request Process
1. Ensure TypeScript compilation passes
2. Test on both iOS and Android
3. Update documentation if needed
4. Get code review approval
5. Merge to main branch

---

**Happy coding! 🚀**