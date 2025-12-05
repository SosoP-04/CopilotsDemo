import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { MATRIX_ITEMS } from '../data/mockData';

// States: 0 = Null, 1 = Done & Loved, 2 = Want To Try, 3 = Not For Me
const STATUS_COLORS = { 0: '#eee', 1: '#2ecc71', 2: '#f1c40f', 3: '#e74c3c' };
const STATUS_LABELS = { 0: 'Tap to rate', 1: '😍 Loved', 2: '🤔 Want to Try', 3: '🚫 Not for me' };

export default function ExperienceMatrix({ onComplete }) {
  const [ratings, setRatings] = useState({});

  const cycleRating = (item) => {
    const current = ratings[item] || 0;
    const next = current >= 3 ? 0 : current + 1;
    setRatings({ ...ratings, [item]: next });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>The Experience Matrix</Text>
        <Text style={styles.subtitle}>Define your travel soul. Tap to categorize.</Text>
        
        <View style={styles.grid}>
          {MATRIX_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[styles.itemBox, { backgroundColor: STATUS_COLORS[ratings[item] || 0] }]}
              onPress={() => cycleRating(item)}
            >
              <Text style={styles.itemText}>{item}</Text>
              <Text style={styles.statusText}>{STATUS_LABELS[ratings[item] || 0]}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={onComplete}>
          <Text style={styles.buttonText}>SAVE & FIND MATCHES</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B3A57', marginBottom: 10 },
  subtitle: { color: '#666', marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  itemBox: { width: '48%', padding: 20, borderRadius: 12, marginBottom: 15, alignItems: 'center' },
  itemText: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  statusText: { fontSize: 12, color: '#333' },
  button: { backgroundColor: '#1B3A57', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});