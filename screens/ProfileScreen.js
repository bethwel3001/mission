import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Mock user data
const mockUser = {
  username: 'Betu',
  planetName: 'Ola',
  avatar: 'https://i.pravatar.cc/150?u=betu', // placeholder
  stats: {
    points: 1250,
    missionsCompleted: 18,
    carbonSaved: '45 kg',
    streak: 7,
  },
  achievements: [
    { id: '1', name: 'First Mission', icon: 'checkmark-circle', earned: true },
    { id: '2', name: '7-Day Streak', icon: 'flame', earned: true },
    { id: '3', name: 'Friend Referrer', icon: 'people', earned: false },
    { id: '4', name: 'Energy Saver', icon: 'leaf', earned: true },
    { id: '5', name: 'Community Hero', icon: 'heart', earned: false },
    { id: '6', name: 'Quiz Master', icon: 'school', earned: false },
  ],
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const user = mockUser;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with settings icon (optional) */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Avatar and basic info */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.planetNameContainer}>
            <Ionicons name="planet" size={20} color="#4CAF50" />
            <Text style={styles.planetName}>{user.planetName}</Text>
          </View>
        </View>

        {/* Stats cards */}
        <View style={styles.statsGrid}>
          <LinearGradient
            colors={['rgba(76,175,80,0.2)', 'rgba(76,175,80,0.05)']}
            style={styles.statCard}
          >
            <Ionicons name="star" size={28} color="#FFD700" />
            <Text style={styles.statValue}>{user.stats.points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(33,150,243,0.2)', 'rgba(33,150,243,0.05)']}
            style={styles.statCard}
          >
            <Ionicons name="checkbox" size={28} color="#2196F3" />
            <Text style={styles.statValue}>{user.stats.missionsCompleted}</Text>
            <Text style={styles.statLabel}>Missions</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(255,152,0,0.2)', 'rgba(255,152,0,0.05)']}
            style={styles.statCard}
          >
            <Ionicons name="leaf" size={28} color="#FF9800" />
            <Text style={styles.statValue}>{user.stats.carbonSaved}</Text>
            <Text style={styles.statLabel}>CO₂ Saved</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(244,67,54,0.2)', 'rgba(244,67,54,0.05)']}
            style={styles.statCard}
          >
            <Ionicons name="flame" size={28} color="#F44336" />
            <Text style={styles.statValue}>{user.stats.streak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </LinearGradient>
        </View>

        {/* Achievements section */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {user.achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <View
                  style={[
                    styles.achievementIcon,
                    achievement.earned
                      ? styles.achievementEarned
                      : styles.achievementLocked,
                  ]}
                >
                  <Ionicons
                    name={achievement.icon}
                    size={32}
                    color={achievement.earned ? '#4CAF50' : '#666'}
                  />
                </View>
                <Text style={styles.achievementName}>{achievement.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Friend leaderboard preview (from PDF) */}
        <View style={styles.leaderboardPreview}>
          <Text style={styles.sectionTitle}>Friend Leaderboard</Text>
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            style={styles.leaderboardCard}
          >
            <View style={styles.leaderboardItem}>
              <Text style={styles.rank}>1.</Text>
              <Text style={styles.friendName}>Alex</Text>
              <Text style={styles.friendPoints}>2,450 pts</Text>
            </View>
            <View style={styles.leaderboardItem}>
              <Text style={styles.rank}>2.</Text>
              <Text style={styles.friendName}>Jamie</Text>
              <Text style={styles.friendPoints}>2,100 pts</Text>
            </View>
            <View style={styles.leaderboardItem}>
              <Text style={styles.rank}>3.</Text>
              <Text style={styles.friendName}>Sam</Text>
              <Text style={styles.friendPoints}>1,890 pts</Text>
            </View>
            <View style={[styles.leaderboardItem, styles.currentUser]}>
              <Text style={styles.rank}>4.</Text>
              <Text style={styles.friendName}>You ({user.username})</Text>
              <Text style={styles.friendPoints}>{user.stats.points} pts</Text>
            </View>
          </LinearGradient>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View Full Leaderboard</Text>
            <Ionicons name="arrow-forward" size={16} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F44',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4CAF50',
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  planetNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  planetName: {
    color: '#4CAF50',
    fontSize: 18,
    marginLeft: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  achievementsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  achievementEarned: {
    backgroundColor: 'rgba(76,175,80,0.2)',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  achievementLocked: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: '#444',
  },
  achievementName: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  leaderboardPreview: {
    marginBottom: 20,
  },
  leaderboardCard: {
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  rank: {
    color: '#aaa',
    fontSize: 16,
    width: 30,
  },
  friendName: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  friendPoints: {
    color: '#4CAF50',
    fontSize: 16,
  },
  currentUser: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(76,175,80,0.1)',
    marginTop: 5,
    padding: 8,
    borderRadius: 10,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  viewAllText: {
    color: '#4CAF50',
    fontSize: 14,
    marginRight: 5,
  },
});