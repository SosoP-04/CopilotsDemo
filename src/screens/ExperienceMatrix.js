import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { MATRIX_CATEGORIES, THEME } from '../data/mockData';

const STATUS_COLORS = { 0: '#eee', 1: '#2ecc71', 2: '#f1c40f', 3: '#e74c3c' };
const STATUS_LABELS = { 0: 'Rate', 1: 'Loved', 2: 'Want To', 3: 'No Way' };

export default function ExperienceMatrix({ onComplete }) {
  const [ratings, setRatings] = useState({});

  const cycleRating = (item) => {
    const current = ratings[item] || 0;
    const next = current >= 3 ? 0 : current + 1;
    setRatings({ ...ratings, [item]: next });
  };

  // Safe check for data
  if (!MATRIX_CATEGORIES || MATRIX_CATEGORIES.length === 0) {
    return <View style={styles.container}><Text>Loading Matrix...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>The Experience Matrix</Text>
        <Text style={styles.subtitle}>Fill this to find your travel soulmate.</Text>
      </View>
        
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {MATRIX_CATEGORIES.map((category, index) => (
          <View key={index} style={styles.section}>
            {/* Added optional chaining ?. to prevent crashes */}
            <Text style={styles.sectionTitle}>{category?.title || 'Category'}</Text>
            <View style={styles.grid}>
              {(category?.items || []).map((item) => (
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
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onComplete}>
          <Text style={styles.buttonText}>SAVE PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40 },
  header: { padding: 20, backgroundColor: THEME.neutral },
  title: { fontSize: 24, fontWeight: 'bold', color: THEME.primary },
  subtitle: { color: '#666' },
  scrollContent: { padding: 20 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: THEME.primary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  itemBox: { width: '48%', padding: 15, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  itemText: { fontWeight: '600', fontSize: 14, marginBottom: 2, color: '#333' },
  statusText: { fontSize: 10, color: '#444', textTransform: 'uppercase' },
  footer: { padding: 20, borderTopWidth: 1, borderColor: '#eee' },
  button: { backgroundColor: THEME.primary, padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});