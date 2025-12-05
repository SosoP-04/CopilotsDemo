import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Import our modular screens
import ExperienceMatrix from './src/screens/ExperienceMatrix';
import TripMediation from './src/screens/TripMediation';
import PaymentScreen from './src/screens/PaymentScreen';

// We will keep the Profile/Match screens inline here for now to save you creating 5 files at once,
// but ideally, they go into src/screens/ too.
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { PROFILES } from './src/data/mockData';

const { width, height } = Dimensions.get('window');

export default function App() {
  // Screen State: 'matrix' -> 'discovery' -> 'match' -> 'mediation' -> 'payment'
  const [screen, setScreen] = useState('matrix'); 
  const [selectedTrip, setSelectedTrip] = useState(null);

  // --- 1. Experience Matrix (New Feature) ---
  if (screen === 'matrix') {
    return <ExperienceMatrix onComplete={() => setScreen('discovery')} />;
  }

  // --- 2. Discovery (Simple View) ---
  if (screen === 'discovery') {
    const profile = PROFILES[0];
    return (
      <View style={styles.container}>
        <Image source={{ uri: profile.image }} style={styles.fullScreenImage} />
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFillObject} />
        <View style={styles.overlay}>
           <Text style={styles.name}>{profile.name}, {profile.age}</Text>
           <Text style={styles.bio}>{profile.bio}</Text>
        </View>
        <View style={styles.actions}>
           <TouchableOpacity style={[styles.btn, {backgroundColor: '#fff'}]} onPress={() => alert("Pass")}>
              <Text style={{fontSize: 30}}>✕</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.btn, {backgroundColor: '#FF6B6B'}]} onPress={() => setScreen('match')}>
              <Text style={{fontSize: 30}}>⛑️</Text>
           </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- 3. Match (Simple View) ---
  if (screen === 'match') {
    return (
      <View style={[styles.container, {backgroundColor: '#1B3A57', alignItems: 'center', justifyContent: 'center'}]}>
        <Text style={{fontSize: 32, fontWeight: 'bold', color: '#fff'}}>IT'S A MATCH!</Text>
        <Text style={{color: '#ddd', marginTop: 10}}>Sarah likes your travel style.</Text>
        <TouchableOpacity 
          style={{marginTop: 40, backgroundColor: '#FF6B6B', padding: 15, borderRadius: 30, width: 200, alignItems: 'center'}}
          onPress={() => setScreen('mediation')}
        >
          <Text style={{color: '#fff', fontWeight: 'bold'}}>START PLANNING</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- 4. Mediation / Voting (New Feature) ---
  if (screen === 'mediation') {
    return (
      <TripMediation onTripSelected={(trip) => {
        setSelectedTrip(trip);
        setScreen('payment');
      }} />
    );
  }

  // --- 5. Payment with Opt-in (New Feature) ---
  if (screen === 'payment') {
    return (
      <PaymentScreen 
        trip={selectedTrip} 
        onCancel={() => setScreen('mediation')} 
      />
    );
  }

  return <View />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  fullScreenImage: { width: width, height: height, resizeMode: 'cover' },
  overlay: { position: 'absolute', bottom: 120, left: 20 },
  name: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  bio: { fontSize: 18, color: '#ddd' },
  actions: { position: 'absolute', bottom: 40, flexDirection: 'row', width: '100%', justifyContent: 'center' },
  btn: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }
});