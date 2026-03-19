import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const icons = {
  Home: ({ focused, color, size }) => (
    <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
  ),
  Missions: ({ focused, color, size }) => (
    <Ionicons name={focused ? 'rocket' : 'rocket-outline'} size={size} color={color} />
  ),
  Challenges: ({ focused, color, size }) => (
    <Ionicons name={focused ? 'trophy' : 'trophy-outline'} size={size} color={color} />
  ),
  Profile: ({ focused, color, size }) => (
    <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
  ),
};

export default function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.spring(animatedValues[state.index], {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 5,
    }).start();

    state.routes.forEach((_, i) => {
      if (i !== state.index) {
        Animated.spring(animatedValues[i], {
          toValue: 0,
          useNativeDriver: true,
          tension: 200,
          friction: 5,
        }).start();
      }
    });
  }, [state.index]);

  const getAnimatedStyle = (index) => {
    const scale = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2],
    });
    return { transform: [{ scale }] };
  };

  return (
    <View style={[styles.tabBarContainer, { bottom: insets.bottom + 10 }]}>
      <BlurView intensity={90} tint="dark" style={styles.blurView}>
        <View style={styles.tabRow}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            const color = isFocused ? '#4CAF50' : '#E0E0E0';
            const size = 26;

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabButton}
              >
                <Animated.View style={getAnimatedStyle(index)}>
                  {icons[route.name]({ focused: isFocused, color, size })}
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  blurView: {
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'rgba(20,20,20,0.5)', // fallback for devices without blur
  },
  tabRow: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});