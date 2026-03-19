import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SectionList,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { missionsData } from '../data/missions';

export default function MissionsScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // Group missions by category
  const sections = missionsData.reduce((acc, mission) => {
    const category = mission.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(mission);
    return acc;
  }, {});

  const sectionListData = Object.keys(sections).map(category => ({
    title: category,
    data: sections[category],
  }));

  const renderMissionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MissionDetail', { mission: item })}
      disabled={item.status === 'comingSoon'}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.missionCard, item.status === 'comingSoon' && styles.comingSoonCard]}
      >
        <View style={styles.cardLeft}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={28} color="#4CAF50" />
          </View>
          <View style={styles.missionInfo}>
            <Text style={styles.missionTitle}>{item.title}</Text>
            <Text style={styles.missionPoints}>+{item.points} pts</Text>
            {item.status === 'comingSoon' && (
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              </View>
            )}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom + 80,
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Missions</Text>
          <Text style={styles.headerSubtitle}>Complete tasks to heal your planet</Text>
        </View>

        <SectionList
          sections={sectionListData}
          keyExtractor={(item) => item.id}
          renderItem={renderMissionItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F44',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  missionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  comingSoonCard: {
    opacity: 0.6,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  missionPoints: {
    color: '#4CAF50',
    fontSize: 14,
  },
  comingSoonBadge: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  comingSoonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});