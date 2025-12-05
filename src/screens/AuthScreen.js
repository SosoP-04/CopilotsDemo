import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import { THEME } from '../data/mockData';

export default function AuthScreen({ onLogin }) {
  const [step, setStep] = useState(0); // 0: Login/Start, 1: Personal Info, 2: Verification, 3: Success
  const [isSignUp, setIsSignUp] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');

  const handleStart = () => {
    if (isSignUp) setStep(1); // Go to info form
    else onLogin(); // Just log in
  };

  const handleInfoSubmit = () => {
    setStep(2); // Go to verification
    // Simulate verification delay
    setTimeout(() => {
      setStep(3); // Success
    }, 2500);
  };

  const handleFinalize = () => {
    onLogin();
  };

  // --- RENDER STEPS ---

  // Step 2: ID Verification Mock
  if (step === 2) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={THEME.accent} />
        <Text style={styles.verifyTitle}>Verifying Identity...</Text>
        <Text style={styles.verifySub}>Checking global databases and ID validity.</Text>
        <Text style={{marginTop: 20, color: '#888'}}>🛡️ Bank-grade security</Text>
      </View>
    );
  }

  // Step 3: Success
  if (step === 3) {
    return (
      <View style={styles.centerContainer}>
        <Text style={{fontSize: 60}}>✅</Text>
        <Text style={styles.verifyTitle}>Verification Passed</Text>
        <Text style={styles.verifySub}>Welcome to the cockpit, {fullName}.</Text>
        <TouchableOpacity style={styles.authButton} onPress={handleFinalize}>
          <Text style={styles.authButtonText}>START ADVENTURE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Step 1: Personal Info Form
  if (step === 1) {
    return (
      <View style={[styles.container, {backgroundColor: THEME.primary}]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.headerTitle}>Pilot Profile</Text>
          <Text style={styles.headerSub}>We need this to ensure safety for everyone.</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Legal Name</Text>
            <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="As on passport" placeholderTextColor="#aaa" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput style={styles.input} value={dob} onChangeText={setDob} placeholder="DD/MM/YYYY" placeholderTextColor="#aaa" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Current City</Text>
            <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="London, UK" placeholderTextColor="#aaa" />
          </View>

          <TouchableOpacity style={styles.authButton} onPress={handleInfoSubmit}>
            <Text style={styles.authButtonText}>VERIFY ID 🛡️</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setStep(0)} style={{marginTop: 20}}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Step 0: Login / Sign Up Landing
  return (
    <ImageBackground 
      source={{uri: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000'}} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
            <Text style={styles.logo}>⛑️</Text>
            <Text style={styles.title}>COPILOTS</Text>
            <Text style={styles.tagline}>Where your next adventure is your first date.</Text>
        </View>

        <View style={styles.form}>
          <TextInput 
            style={styles.landingInput} 
            placeholder="Email" 
            placeholderTextColor="#ddd"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput 
            style={styles.landingInput} 
            placeholder="Password" 
            placeholderTextColor="#ddd"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.authButton} onPress={handleStart}>
            <Text style={styles.authButtonText}>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.switchText}>
              {isSignUp ? "Already have an account? Log In" : "New here? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(27, 58, 87, 0.85)', padding: 30, justifyContent: 'space-between' },
  container: { flex: 1, paddingTop: 50 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 30 },
  scrollContent: { padding: 30 },
  
  header: { marginTop: 60, alignItems: 'center' },
  logo: { fontSize: 60, marginBottom: 10 },
  title: { fontSize: 40, fontWeight: 'bold', color: THEME.white, letterSpacing: 2 },
  tagline: { color: THEME.gold, fontSize: 16, marginTop: 10, textAlign: 'center' },
  
  form: { marginBottom: 50 },
  landingInput: { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  headerSub: { color: '#ccc', marginBottom: 30 },
  formGroup: { marginBottom: 20 },
  label: { color: THEME.gold, fontWeight: 'bold', marginBottom: 5 },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  
  authButton: { backgroundColor: THEME.accent, padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  authButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  switchText: { color: '#ccc', textAlign: 'center', marginTop: 20 },
  
  verifyTitle: { fontSize: 24, fontWeight: 'bold', color: THEME.primary, marginTop: 20 },
  verifySub: { textAlign: 'center', color: '#666', marginTop: 10 }
});