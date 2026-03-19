import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Mock data – replace with real data from context later
const mockPlanetStats = {
  health: 78,           // percentage
  co2: 420,             // ppm (parts per million)
  halfLife: '3.2 days', // time until health halves if no action
  streak: 7,
};

const mockUser = {
  name: 'Betu',
  planetName: 'Ola',
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const spinValue = useRef(new Animated.Value(0)).current;
  const [stats] = useState(mockPlanetStats);
  const [user] = useState(mockUser);

  // Start infinite rotation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Pulsing glow
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: 80 }, // 80 = space for tab bar + extra
        ]}
      >
        {/* Top Row: Greeting + Streak */}
        <View style={styles.topRow}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello {user.name}!</Text>
            <Text style={styles.planetGreeting}>{user.planetName} missed you!</Text>
          </View>
          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={24} color="#FF8C00" />
            <Text style={styles.streakText}>{stats.streak}</Text>
          </View>
        </View>

        {/* Planet with rotation */}
        <View style={styles.planetWrapper}>
          <Animated.Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2011/12/13/14/31/earth-11015_960_720.jpg' }} // 3D earth
            style={[styles.planet, { transform: [{ rotate: spin }] }]}
          />
          <Animated.View
            style={[
              styles.glow,
              {
                transform: [{ scale: pulseAnim }],
                opacity: pulseAnim.interpolate({
                  inputRange: [1, 1.2],
                  outputRange: [0.3, 0.6],
                }),
              },
            ]}
          />
        </View>

        {/* Stats Panel */}
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statsPanel}
        >
          {/* Health */}
          <View style={styles.statItem}>
            <Ionicons name="heart" size={24} color="#FF6B6B" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Health</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${stats.health}%` }]} />
              </View>
              <Text style={styles.statValue}>{stats.health}%</Text>
            </View>
          </View>

          {/* CO₂ Level */}
          <View style={styles.statItem}>
            <Ionicons name="leaf" size={24} color="#4CAF50" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>CO₂</Text>
              <Text style={styles.statValue}>{stats.co2} ppm</Text>
            </View>
          </View>

          {/* Half-Life */}
          <View style={styles.statItem}>
            <Ionicons name="time" size={24} color="#FFD93D" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Half-Life</Text>
              <Text style={styles.statValue}>{stats.halfLife}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.careButton}>
          <Text style={styles.careButtonText}>💚 Care for Planet</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F44',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  planetGreeting: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 2,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  streakText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  planetWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
planet: {
  width: width * 0.6,
  height: width * 0.6,
  borderRadius: width * 0.3,
},
  glow: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  statsPanel: {
    width: '100%',
    padding: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginVertical: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  statTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  statLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    width: '100%',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  careButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 10,
  },
  careButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});