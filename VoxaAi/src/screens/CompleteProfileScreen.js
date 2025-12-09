import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import AuthInput from '../components/AuthInput';

const { width, height } = Dimensions.get('window');

const CompleteProfileScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  const role = route?.params?.role;
  const contentType = route?.params?.contentType;

  const isFormValid = name.trim() && phone.trim() && email.trim();

  const handleComplete = () => {
    if (isFormValid) {
      console.log('Profile Complete:', { role, contentType, name, phone, email });
      // Navigate to Home screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  const handleEditPhoto = () => {
    // TODO: Implement photo picker
    console.log('Edit photo pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        {/* Noise overlay */}
        <Image
          source={require('../../assets/noise.png')}
          style={styles.noiseOverlay}
          resizeMode="repeat"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Top Navigation Row */}
            <View style={styles.topRow}>
              {/* Back Button */}
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Progress Indicator - Step 3 of 3 (all active) */}
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, styles.progressBarActive]} />
                <View style={[styles.progressBar, styles.progressBarActive]} />
                <View style={[styles.progressBar, styles.progressBarActive]} />
              </View>
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Complete Your Profile</Text>
              <Text style={styles.subtitle}>Add your details to personalize your experience</Text>
            </View>

            {/* Profile Picture */}
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePicture}>
                <Text style={styles.profileEmoji}>😊</Text>
              </View>
              {/* Camera Edit Button */}
              <TouchableOpacity 
                style={styles.cameraButton}
                onPress={handleEditPhoto}
              >
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <AuthInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                iconName="person-outline"
                autoCapitalize="words"
              />

              <AuthInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                iconName="call-outline"
                keyboardType="phone-pad"
              />

              <AuthInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                iconName="mail-outline"
                keyboardType="email-address"
              />
            </View>

            {/* Complete Button */}
            <TouchableOpacity
              style={[
                styles.completeButton,
                !isFormValid && styles.completeButtonDisabled,
              ]}
              onPress={handleComplete}
              activeOpacity={0.8}
              disabled={!isFormValid}
            >
              <Text style={[
                styles.completeButtonText,
                !isFormValid && styles.completeButtonTextDisabled,
              ]}>
                Complete
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  noiseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    opacity: 0.03,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  progressBarActive: {
    backgroundColor: colors.primary,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  profileEmoji: {
    fontSize: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: width / 2 - 60 - 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.gradientStart,
  },
  formSection: {
    marginBottom: 24,
  },
  completeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  completeButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  completeButtonTextDisabled: {
    color: '#A0A0A0',
  },
});

export default CompleteProfileScreen;
