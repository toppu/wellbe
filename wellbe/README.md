# wellbe - AI-Powered Health & Fitness Mobile App

wellbe is a comprehensive health and fitness mobile application built with React Native and Expo. It serves as your personal AI-powered health co-pilot, offering advanced tools to achieve your wellness goals.

## Features

### 🏠 Dashboard
- Personalized daily overview
- Quick access to key metrics
- Motivational insights and progress tracking
- Recent activity timeline

### 🍎 Smart Nutrition Tracking
- **AI-Powered Food Photography**: Take photos of your meals for instant nutritional analysis
- **Comprehensive Food Database**: Search from thousands of verified food items
- **Barcode Scanner**: Quick logging with product barcode scanning
- **Macro Tracking**: Detailed protein, carbohydrates, and fat monitoring
- **Meal Planning**: Organized breakfast, lunch, dinner, and snack tracking

### 💪 Intelligent Workout Planning
- **AI Workout Generator**: Personalized daily workouts based on your goals and recovery
- **Structured Programs**: Professional-designed multi-week training programs
- **Exercise Library**: Comprehensive database with video demonstrations
- **Progress Tracking**: Monitor volume, personal records, and consistency
- **Rest Timer**: Built-in timing for optimal workout flow

### 📊 Advanced Progress Analytics
- **Weight Tracking**: Monitor body weight trends over time
- **Body Measurements**: Track key measurements (waist, chest, arms, etc.)
- **Performance Analytics**: Workout volume and strength progression
- **Nutrition History**: Long-term dietary pattern analysis
- **Visual Charts**: Beautiful data visualization for insights

### 🎯 3D Body Visualization (Planned)
- **Current Avatar**: AI-generated 3D model from your photos
- **Goal Avatar**: Visualization of your target physique
- **Motivation Tool**: Side-by-side comparison for inspiration

### 🏃‍♂️ Additional Features
- **Gym Finder**: Locate nearby fitness facilities with ratings and reviews
- **Health Platform Integration**: Sync with Apple Health and Google Fit
- **Social Authentication**: Login with Apple, Google, or Facebook
- **Comprehensive Onboarding**: Personalized setup based on your goals

## Technology Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library for seamless user experience

### UI/UX
- **Modern Design System**: Consistent, beautiful interface
- **Custom Components**: Reusable UI components
- **Responsive Layout**: Optimized for all screen sizes
- **Accessibility**: Following platform accessibility guidelines

### Planned Integrations
- **Food Recognition API**: LogMeal for image analysis
- **Nutrition Database**: FatSecret for comprehensive food data
- **Exercise Database**: ExerciseDB for workout content
- **3D Avatar Generation**: Meshcapade for body visualization
- **Maps & Location**: Google Places API for gym discovery

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wellbe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

### Development Scripts

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web

# Check TypeScript types
npx tsc --noEmit

# Build for production
npx expo build
```

## Project Structure

```
wellbe/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── constants/           # App constants and themes
│   │   └── theme.ts
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── NutritionNavigator.tsx
│   │   ├── WorkoutNavigator.tsx
│   │   ├── ProgressNavigator.tsx
│   │   └── ProfileNavigator.tsx
│   ├── screens/            # Screen components
│   │   ├── auth/
│   │   ├── onboarding/
│   │   ├── nutrition/
│   │   ├── workout/
│   │   ├── progress/
│   │   └── profile/
│   ├── services/           # API services and integrations
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── HomeScreen.tsx      # Main dashboard screen
├── assets/                 # Static assets
├── App.tsx                 # Root component
├── app.json               # Expo configuration
└── package.json           # Dependencies and scripts
```

## Architecture

### Design Patterns
- **Component-based Architecture**: Modular, reusable components
- **TypeScript First**: Complete type safety throughout the app
- **Navigation-centric**: Organized around user flow and navigation
- **Theme System**: Consistent styling and design tokens

### State Management (Planned)
- **Context API**: For global state management
- **Local State**: React hooks for component-level state
- **Async Storage**: Persistent local data storage

### API Integration (Planned)
- **REST APIs**: Communication with backend services
- **Real-time Updates**: WebSocket connections for live data
- **Offline Support**: Caching and sync capabilities

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Roadmap

### Phase 1: Core Features ✅
- [x] Project setup and navigation
- [x] Basic UI components and themes
- [x] Authentication screens
- [x] Dashboard and home screen
- [x] Nutrition tracking interface
- [x] Workout planning interface

### Phase 2: API Integration
- [ ] User authentication and registration
- [ ] Food database integration
- [ ] Camera-based food logging
- [ ] Exercise database integration
- [ ] Basic workout tracking

### Phase 3: Advanced Features
- [ ] AI workout generation
- [ ] Progress analytics and charts
- [ ] 3D body avatar integration
- [ ] Health platform sync
- [ ] Gym finder with maps

### Phase 4: Premium Features
- [ ] Advanced AI recommendations
- [ ] Social features and challenges
- [ ] Nutritionist consultations
- [ ] Premium workout programs

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@wellbe.app or join our Discord community.

---

**wellbe** - Your AI-powered health and fitness companion 💪✨