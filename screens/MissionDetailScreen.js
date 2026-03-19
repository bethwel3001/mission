import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function MissionDetailScreen({ route, navigation }) {
  const { mission } = route.params;
  const insets = useSafeAreaInsets();
  const [photo, setPhoto] = useState(null);
  const [textProof, setTextProof] = useState('');
  const [completed, setCompleted] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload a photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // In real app: upload proof, update user progress, etc.
    if (mission.proofType === 'photo' && !photo) {
      Alert.alert('Proof required', 'Please upload a photo as proof.');
      return;
    }
    if (mission.proofType === 'text' && !textProof.trim()) {
      Alert.alert('Proof required', 'Please enter the required information.');
      return;
    }
    // Mark as completed (for demo)
    setCompleted(true);
    Alert.alert('Success', 'Mission completed! +' + mission.points + ' points');
    // Navigate back after a moment
    setTimeout(() => navigation.goBack(), 1500);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 80 }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Back button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(76,175,80,0.2)' }]}>
              <Ionicons name={mission.icon} size={40} color="#4CAF50" />
            </View>
            <Text style={styles.title}>{mission.title}</Text>
            <Text style={styles.points}>+{mission.points} points</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.description}>{mission.description}</Text>

            {/* Proof section based on type */}
            {mission.proofType === 'photo' && (
              <View style={styles.proofSection}>
                <Text style={styles.proofLabel}>Upload proof photo:</Text>
                <View style={styles.photoButtons}>
                  <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                    <Ionicons name="images" size={24} color="#4CAF50" />
                    <Text style={styles.photoButtonText}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                    <Ionicons name="camera" size={24} color="#4CAF50" />
                    <Text style={styles.photoButtonText}>Camera</Text>
                  </TouchableOpacity>
                </View>
                {photo && (
                  <View style={styles.previewContainer}>
                    <Image source={{ uri: photo }} style={styles.preview} />
                    <TouchableOpacity onPress={() => setPhoto(null)} style={styles.removePhoto}>
                      <Ionicons name="close-circle" size={24} color="#ff6b6b" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {mission.proofType === 'text' && (
              <View style={styles.proofSection}>
                <Text style={styles.proofLabel}>Enter proof details:</Text>
                <TextInput
                  style={styles.textInput}
                  multiline
                  placeholder="Type here..."
                  placeholderTextColor="#888"
                  value={textProof}
                  onChangeText={setTextProof}
                />
              </View>
            )}

            {mission.proofType === 'referral' && (
              <View style={styles.proofSection}>
                <Text style={styles.proofLabel}>Share your referral link:</Text>
                <View style={styles.referralBox}>
                  <Text style={styles.referralLink}>https://ecomission.app/r/BETU123</Text>
                  <TouchableOpacity>
                    <Ionicons name="copy" size={20} color="#4CAF50" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.note}>
                  Once your friend signs up and completes a mission, you'll both earn points automatically.
                </Text>
              </View>
            )}

            {mission.proofType === 'quiz' && (
              <View style={styles.proofSection}>
                <Text style={styles.proofLabel}>Quiz coming soon! For now, mark as complete.</Text>
                {/* In future, integrate a real quiz */}
              </View>
            )}

            {mission.status === 'comingSoon' && (
              <View style={styles.comingSoonContainer}>
                <Text style={styles.comingSoonMessage}>This mission is not available yet. Check back later!</Text>
              </View>
            )}

            {mission.status !== 'comingSoon' && !completed && (
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit & Complete</Text>
              </TouchableOpacity>
            )}

            {completed && (
              <View style={styles.completedContainer}>
                <Ionicons name="checkmark-circle" size={50} color="#4CAF50" />
                <Text style={styles.completedText}>Mission Completed!</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F44',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  points: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    padding: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  description: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  proofSection: {
    marginVertical: 15,
  },
  proofLabel: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 10,
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  photoButton: {
    backgroundColor: 'rgba(76,175,80,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  photoButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  previewContainer: {
    marginTop: 15,
    alignItems: 'center',
    position: 'relative',
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  removePhoto: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  referralBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  referralLink: {
    color: '#4CAF50',
    fontSize: 16,
  },
  note: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  comingSoonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  comingSoonMessage: {
    color: '#FF8C00',
    fontSize: 16,
    textAlign: 'center',
  },
  completedContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  completedText: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});