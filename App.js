import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';

// Screens
import AuthScreen from './src/screens/AuthScreen';
import ExperienceMatrix from './src/screens/ExperienceMatrix';
import DiscoveryScreen from './src/screens/DiscoveryScreen';
import MatchesListScreen from './src/screens/MatchesListScreen';
import MyTripsScreen from './src/screens/MyTripsScreen';
import TripMediation from './src/screens/TripMediation';
import PaymentScreen from './src/screens/PaymentScreen';
import ItineraryScreen from './src/screens/ItineraryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { PROFILES, THEME } from './src/data/mockData';

export default function App() {
  const [appState, setAppState] = useState('AUTH'); // AUTH, ONBOARDING, MAIN
  const [activeTab, setActiveTab] = useState('DISCOVERY'); // DISCOVERY, MATCHES, TRIPS, PROFILE
  
  // Sub-navigation states
  const [selectedMatch, setSelectedMatch] = useState(null); // For Mediation
  const [selectedTrip, setSelectedTrip] = useState(null);   // For Payment/Itinerary

  // --- LOGIC: RENDER CONTENT BASED ON TAB ---
  const renderMainContent = () => {
    // 1. DISCOVERY TAB
    if (activeTab === 'DISCOVERY') {
      return (
        <DiscoveryScreen 
          profiles={PROFILES} 
          onMatch={(profile) => {
            // In a real app, this adds to match list. 
            // For demo, we show a popup then go to matches
            alert(`You matched with ${profile.name}! Check your Matches tab.`);
          }} 
          onNavProfile={() => setActiveTab('PROFILE')}
          onNavSettings={() => setActiveTab('PROFILE')} // Shortcut
        />
      );
    }

    // 2. MATCHES TAB
    if (activeTab === 'MATCHES') {
      if (selectedMatch) {
        return (
          <TripMediation 
            onBack={() => setSelectedMatch(null)}
            onTripSelected={(trip) => {
                setSelectedTrip({...trip, partner: selectedMatch}); // Attach partner info
                setActiveTab('TRIPS'); // Move to trips tab logic
                // In real app, create a 'pending' trip record here
            }}
          />
        );
      }
      return <MatchesListScreen onSelectMatch={(m) => setSelectedMatch(m)} />;
    }

    // 3. TRIPS TAB
    if (activeTab === 'TRIPS') {
      // If we are in the flow of paying for a trip (from mediation)
      if (selectedTrip && !selectedTrip.status) {
         return (
            <PaymentScreen 
                trip={selectedTrip}
                onCancel={() => { setSelectedTrip(null); setActiveTab('MATCHES'); }}
                onPaid={() => {
                    // Update trip status to confirmed locally for demo
                    const newTrip = { ...selectedTrip, status: 'confirmed' };
                    setSelectedTrip(newTrip);
                }}
            />
         );
      }
      // If payment done, show itinerary
      if (selectedTrip && selectedTrip.status === 'confirmed') {
          return <ItineraryScreen trip={selectedTrip} onReset={() => setSelectedTrip(null)} />;
      }
      // Otherwise, show list
      return <MyTripsScreen onSelectTrip={(t) => setSelectedTrip(t)} />;
    }

    // 4. PROFILE TAB
    if (activeTab === 'PROFILE') {
        // Simple toggle for Settings vs Profile view for this demo
        // Ideally ProfileScreen has a settings button
        return <ProfileScreen onBack={() => setActiveTab('DISCOVERY')} />;
    }
  };

  // --- RENDER APP SHELL ---

  if (appState === 'AUTH') {
    return <AuthScreen onLogin={() => setAppState('ONBOARDING')} />;
  }

  if (appState === 'ONBOARDING') {
    return <ExperienceMatrix onComplete={() => setAppState('MAIN')} />;
  }

  // MAIN APP with TAB BAR
  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>
        {renderMainContent()}
      </View>

      {/* CUSTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => { setActiveTab('DISCOVERY'); setSelectedMatch(null); setSelectedTrip(null); }}>
            <Text style={[styles.tabIcon, activeTab === 'DISCOVERY' && styles.activeTab]}>🧭</Text>
            <Text style={styles.tabLabel}>Explore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => { setActiveTab('MATCHES'); setSelectedMatch(null); }}>
            <Text style={[styles.tabIcon, activeTab === 'MATCHES' && styles.activeTab]}>💬</Text>
            <Text style={styles.tabLabel}>Matches</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => { setActiveTab('TRIPS'); setSelectedTrip(null); }}>
            <Text style={[styles.tabIcon, activeTab === 'TRIPS' && styles.activeTab]}>✈️</Text>
            <Text style={styles.tabLabel}>Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('PROFILE')}>
            <Text style={[styles.tabIcon, activeTab === 'PROFILE' && styles.activeTab]}>👤</Text>
            <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  contentArea: { flex: 1, backgroundColor: '#fff' },
  tabBar: { flexDirection: 'row', height: 80, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee', paddingBottom: 20, justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabIcon: { fontSize: 24, marginBottom: 4, opacity: 0.5 },
  activeTab: { opacity: 1, transform: [{scale: 1.2}] },
  tabLabel: { fontSize: 10, color: '#333' }
});