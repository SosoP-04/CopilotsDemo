import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Platform, StatusBar, Alert } from 'react-native';
import { TRIPS, SIGNALS, THEME } from '../data/mockData';

export default function TripMediation({ onTripSelected, onBack }) {
  const [selectedTrips, setSelectedTrips] = useState([]);

  const toggleSelection = (id) => {
    if (selectedTrips.includes(id)) {
      setSelectedTrips(selectedTrips.filter(t => t !== id));
    } else {
      setSelectedTrips([...selectedTrips, id]);
    }
  };

  const submitVotes = () => {
    if (selectedTrips.length === 0) return Alert.alert("Select a trip", "Please select at least one.");
    const chosenTrip = TRIPS.find(t => t.id === selectedTrips[0]);
    if (chosenTrip) {
        Alert.alert("It's a Match!", "Partner also picked this trip.", [{ text: "Book Now", onPress: () => onTripSelected(chosenTrip) }]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={{marginRight: 10}}>
            <Text style={{fontSize: 24, color: THEME.primary}}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Trip Proposals</Text>
      </View>
      <View style={styles.lockBanner}>
          <Text style={styles.lockText}>🔒 No Chat. Vote on trips you're open to.</Text>
      </View>

      <ScrollView contentContainerStyle={{padding: 16}}>
        <Text style={styles.sectionLabel}>Send a Signal</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 20}}>
          {SIGNALS.map((sig, i) => (
            <TouchableOpacity key={i} style={styles.signalChip} onPress={() => Alert.alert("Sent", sig)}>
              <Text style={styles.signalText}>{sig}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>Curated Options</Text>
        {TRIPS.map((trip) => {
          const isSelected = selectedTrips.includes(trip.id);
          return (
            <TouchableOpacity 
              key={trip.id} 
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => toggleSelection(trip.id)}
            >
              <Image source={{ uri: trip.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <View style={styles.row}>
                    <Text style={styles.tierBadge}>{trip.tier}</Text>
                    {isSelected && <Text style={styles.checkMark}>✅ Selected</Text>}
                </View>
                <Text style={styles.cardTitle}>{trip.title}</Text>
                <Text style={styles.cardPrice}>£{trip.price} total</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={submitVotes}>
          <Text style={styles.buttonText}>CONFIRM SELECTION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: THEME.primary },
  lockBanner: { backgroundColor: '#ffe5e5', padding: 10, alignItems: 'center' },
  lockText: { color: '#d63031', fontWeight: 'bold', fontSize: 12 },
  sectionLabel: { fontSize: 16, fontWeight: 'bold', color: '#666', marginBottom: 10 },
  signalChip: { backgroundColor: '#fff', borderWidth: 1, borderColor: THEME.primary, padding: 10, borderRadius: 20, marginRight: 8 },
  signalText: { color: THEME.primary, fontSize: 12 },
  card: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 15, borderWidth: 2, borderColor: 'transparent' },
  selectedCard: { borderColor: THEME.primary, backgroundColor: '#f0f4f8' },
  image: { width: '100%', height: 120, borderTopLeftRadius: 13, borderTopRightRadius: 13 },
  cardContent: { padding: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  tierBadge: { color: THEME.accent, fontWeight: 'bold', fontSize: 10 },
  checkMark: { color: 'green', fontSize: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  cardPrice: { color: '#666', fontSize: 12 },
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
  button: { backgroundColor: THEME.primary, padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});