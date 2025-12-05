// src/screens/AuthScreen.js - Enhanced Version

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { THEME } from '../data/mockData';

export default function AuthScreen({ onLogin }) {
  const [step, setStep] = useState(0); // 0: Landing, 1: Personal Info, 2: Verification, 3: Success
  const [isSignUp, setIsSignUp] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');

  const handleStart = () => {
    if (isSignUp) {
      setStep(1); // Go to personal info
    } else {
      onLogin(); // Direct login
    }
  };

  const handleInfoSubmit = () => {
    setStep(2); // Go to verification
    // Simulate verification delay
    setTimeout(() => {
      setStep(3); // Success
    }, 3000);
  };

  const handleFinalize = () => {
    onLogin();
  };

  // --- Step 2: ID Verification ---
  if (step === 2) {
    return (
      <View style={styles.verificationContainer}>
        <View style={styles.verificationContent}>
          <View style={styles.shieldIcon}>
            <Text style={styles.shieldEmoji}>🛡️</Text>
          </View>
          <ActivityIndicator size="large" color={THEME.sunsetCoral} style={{marginVertical: 20}} />
          <Text style={styles.verifyTitle}>Verifying Identity...</Text>
          <Text style={styles.verifySub}>Checking global databases and ID validity.</Text>
          <View style={styles.securityBadges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✓ Bank-grade encryption</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✓ Privacy protected</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✓ Secure verification</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // --- Step 3: Success ---
  if (step === 3) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successContent}>
          <View style={styles.successIcon}>
            <Text style={styles.successEmoji}>✅</Text>
          </View>
          <Text style={styles.successTitle}>Verification Passed</Text>
          <Text style={styles.successSub}>Welcome to the cockpit, {fullName}.</Text>
          <Text style={styles.successMessage}>
            Your profile is secured and verified. You're ready to find your copilot.
          </Text>
          <TouchableOpacity style={styles.startButton} onPress={handleFinalize}>
            <Text style={styles.startButtonText}>START YOUR ADVENTURE ✈️</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- Step 1: Personal Info Form ---
  if (step === 1) {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <ScrollView contentContainerStyle={styles.formScroll}>
          <View style={styles.formHeader}>
            <TouchableOpacity onPress={() => setStep(0)} style={styles.backButton}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.formTitle}>Create Your Pilot Profile</Text>
            <Text style={styles.formSubtitle}>We verify all users to ensure safety for everyone in our community.</Text>
          </View>

          <View style={styles.formContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Legal Name</Text>
              <TextInput 
                style={styles.input} 
                value={fullName} 
                onChangeText={setFullName} 
                placeholder="As it appears on your passport" 
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput 
                style={styles.input} 
                value={dob} 
                onChangeText={setDob} 
                placeholder="DD/MM/YYYY" 
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current City</Text>
              <TextInput 
                style={styles.input} 
                value={location} 
                onChangeText={setLocation} 
                placeholder="e.g. London, UK" 
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.safetyNote}>
              <Text style={styles.safetyIcon}>🔒</Text>
              <View style={{flex: 1}}>
                <Text style={styles.safetyTitle}>Your Safety Matters</Text>
                <Text style={styles.safetyText}>
                  All information is encrypted and used solely for verification purposes.
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.verifyButton} onPress={handleInfoSubmit}>
              <Text style={styles.verifyButtonText}>VERIFY MY IDENTITY 🛡️</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // --- Step 0: Landing Screen ---
  return (
    <ImageBackground 
      source={{uri: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000'}} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.headerSection}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>✈️</Text>
          </View>
          
          <Text style={styles.brandName}>COPILOTS</Text>
          <View style={styles.taglineContainer}>
            <Text style={styles.tagline}>Where your next adventure</Text>
            <Text style={styles.tagline}>is your first date</Text>
          </View>

          {/* Value Props */}
          <View style={styles.valueProps}>
            <View style={styles.valueProp}>
              <Text style={styles.valuePropIcon}>🚫</Text>
              <Text style={styles.valuePropText}>No endless chatting</Text>
            </View>
            <View style={styles.valueProp}>
              <Text style={styles.valuePropIcon}>✈️</Text>
              <Text style={styles.valuePropText}>Real adventures</Text>
            </View>
            <View style={styles.valueProp}>
              <Text style={styles.valuePropIcon}>❤️</Text>
              <Text style={styles.valuePropText}>Authentic connections</Text>
            </View>
          </View>
        </View>

        <View style={styles.authSection}>
          <TextInput 
            style={styles.authInput} 
            placeholder="Email address" 
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput 
            style={styles.authInput} 
            placeholder="Password" 
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.mainButton} onPress={handleStart}>
            <Text style={styles.mainButtonText}>
              {isSignUp ? "CREATE ACCOUNT" : "LOG IN"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchButton}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.switchText}>
              {isSignUp 
                ? "Already have an account? Log In" 
                : "New here? Sign Up"}
            </Text>
          </TouchableOpacity>

          {/* Trust Indicators */}
          <View style={styles.trustIndicators}>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>✓</Text>
              <Text style={styles.trustText}>ID Verified</Text>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>✓</Text>
              <Text style={styles.trustText}>24/7 Support</Text>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>✓</Text>
              <Text style={styles.trustText}>Safe Travels</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Landing Screen
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 58, 87, 0.88)',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 72,
  },
  brandName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: THEME.white,
    letterSpacing: 4,
    marginBottom: 12,
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  tagline: {
    color: THEME.horizonGold,
    fontSize: 18,
    letterSpacing: 0.5,
  },
  valueProps: {
    width: '100%',
    marginTop: 20,
  },
  valueProp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  valuePropIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  valuePropText: {
    color: THEME.white,
    fontSize: 16,
    fontWeight: '500',
  },
  authSection: {
    width: '100%',
  },
  authInput: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    color: THEME.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  mainButton: {
    backgroundColor: THEME.sunsetCoral,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: THEME.sunsetCoral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  mainButtonText: {
    color: THEME.white,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  switchButton: {
    padding: 12,
    alignItems: 'center',
  },
  switchText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  trustIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  trustItem: {
    alignItems: 'center',
  },
  trustIcon: {
    color: THEME.horizonGold,
    fontSize: 16,
    marginBottom: 4,
  },
  trustText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
  },

  // Form Screen
  formContainer: {
    flex: 1,
    backgroundColor: THEME.white,
  },
  formScroll: {
    flexGrow: 1,
  },
  formHeader: {
    backgroundColor: THEME.deepExpedition,
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: THEME.white,
    fontSize: 16,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.white,
    marginBottom: 8,
  },
  formSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  formContent: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.deepExpedition,
    marginBottom: 8,
  },
  input: {
    backgroundColor: THEME.trailDust,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
  },
  safetyNote: {
    flexDirection: 'row',
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: THEME.deepExpedition,
  },
  safetyIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  safetyTitle: {
    fontWeight: '600',
    color: THEME.deepExpedition,
    marginBottom: 4,
  },
  safetyText: {
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
  },
  verifyButton: {
    backgroundColor: THEME.deepExpedition,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: THEME.white,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },

  // Verification Screen
  verificationContainer: {
    flex: 1,
    backgroundColor: THEME.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  verificationContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  shieldIcon: {
    marginBottom: 20,
  },
  shieldEmoji: {
    fontSize: 80,
  },
  verifyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 8,
  },
  verifySub: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  securityBadges: {
    width: '100%',
  },
  badge: {
    backgroundColor: THEME.trailDust,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  badgeText: {
    color: THEME.deepExpedition,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Success Screen
  successContainer: {
    flex: 1,
    backgroundColor: THEME.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  successIcon: {
    marginBottom: 20,
  },
  successEmoji: {
    fontSize: 80,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: THEME.success,
    marginBottom: 8,
  },
  successSub: {
    fontSize: 20,
    color: THEME.deepExpedition,
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: THEME.sunsetCoral,
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: THEME.sunsetCoral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    color: THEME.white,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});