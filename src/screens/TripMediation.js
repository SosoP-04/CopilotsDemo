import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { TRIPS } from '../data/mockData';

export default function TripMediation({ onTripSelected }) {
  const [selectedTrips, setSelectedTrips] = useState([]);

  const toggleSelection = (id) => {
    if (selectedTrips.includes(id)) {
      setSelectedTrips(selectedTrips.filter(t => t !== id));
    } else {
      setSelectedTrips([...selectedTrips, id]);
    }
  };

  const submitVotes = () => {
    if (selectedTrips.length === 0) return Alert.alert("Select a trip", "Please select at least one trip you are open to.");
    // Simulate the other user matching on the first selected trip
    Alert.alert("It's a Match!", "Sarah also picked this trip. Proceeding to booking.");
    onTripSelected(TRIPS.find(t => t.id === selectedTrips[0]));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trip Proposals</Text>
        <View style={styles.lockBanner}>
          <Text style={styles.lockText}>🔒 Chat Locked. Vote on trips you're open to.</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{padding: 20}}>
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
                <Text style={styles.cardPrice}>£{trip.price} total (£{trip.price/2} each)</Text>
                <Text style={styles.cardDesc}>{trip.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={submitVotes}>
          <Text style={styles.buttonText}>CONFIRM SELECTION ({selectedTrips.length})</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B3A57', marginBottom: 10 },
  lockBanner: { backgroundColor: '#ffe5e5', padding: 10, borderRadius: 8 },
  lockText: { color: '#d63031', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, overflow: 'hidden', borderWidth: 2, borderColor: 'transparent' },
  selectedCard: { borderColor: '#1B3A57' },
  image: { width: '100%', height: 150 },
  cardContent: { padding: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  tierBadge: { color: '#1B3A57', fontWeight: 'bold', fontSize: 12 },
  checkMark: { color: 'green', fontWeight: 'bold' },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardPrice: { color: '#666', marginVertical: 5 },
  cardDesc: { color: '#444' },
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
  button: { backgroundColor: '#1B3A57', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});