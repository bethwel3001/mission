# Eco-Mission

Eco-Mission is a mobile application that gamifies sustainable energy habits. It connects real‑world energy actions to a virtual planet that responds to your choices, encouraging users to build green habits through engaging missions, challenges, and social features.

## Features

- **Home Screen** – A dynamic 3D planet that spins and reacts to your actions. Displays real‑time stats: health, CO₂ level, half‑life, and streak.
- **Missions** – Categorized tasks (Daily Tasks, Quizzes, Refer a Friend, Mobilization, Social Media Campaigns) with proof submission (photo upload, text, referral link). Includes “coming soon” badges.
- **Challenges** – (Placeholder) Team and community challenges to drive collective action.
- **Profile** – User info (non‑editable username and planet name), stats cards, achievements grid, and friend leaderboard preview.
- **Custom Tab Bar** – A floating, glass‑styled bottom tab bar with animated icon scaling on switch.
- **Splash Screen** – Custom splash image displayed while the app loads.

## Tech Stack

- [React Native](https://reactnative.dev/) (Expo SDK 54)
- [Expo](https://expo.dev/) – Managed workflow
- [React Navigation](https://reactnavigation.org/) (Bottom Tabs, Stack)
- [expo-blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) – Glass effect
- [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) – Gradient backgrounds
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) – Photo proof uploads
- [expo-splash-screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/) – Splash screen management
- [react-native-safe-area-context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/) – Safe area insets

## Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your iOS/Android device

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eco-mission.git
   cd eco-mission
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start server**
   ```bash
   npx expo start
   ```

## Configuration
- Splash Screen
The splash image is located at assets/screens/image.png. To change it, replace the file and update the path in app.json under the splash key if necessary.
- Environment Variables
(If you later add backend services, create a .env file and use expo-constants to access them.)

## Customisation
- Change the planet image: Replace the image URL in HomeScreen.js with your own asset.
- Modify mission data: Edit data/missions.js to add, remove, or update missions.
- Adjust tab bar style: Tweak intensity and tint in CustomTabBar.js.

## Troubleshooting
- Splash screen not showing: Ensure the image path in app.json is correct and run expo start --clear to reset the cache.
- Dependency errors: Run npx expo install <package-name> to install compatible versions.
- Build issues: [Refer to Expo documentation](https://expo.dev/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Check the web app 

- Website: [EcoMission](https://eco-mission.vercel.app/)

## License
NOT YET