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

