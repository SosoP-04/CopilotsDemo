import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { THEME } from '../data/mockData';

export default function ItineraryScreen({ trip, onReset }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Image */}
        <Image source={{ uri: trip.image }} style={styles.headerImage} />
        
        <View style={styles.content}>
          <Text style={styles.status}>🎉 TRIP CONFIRMED</Text>
          <Text style={styles.title}>{trip.title}</Text>
          
          {/* The First Moment (Page 10) */}
          <View style={styles.momentBox}>
            <Text style={styles.momentTitle}>📍 The First Moment</Text>
            <Text style={styles.momentText}>
              "Under the departures board at St Pancras, 6:45am, Saturday. You'll both be holding a yellow Copilots envelope."
            </Text>
          </View>

          {/* Trip Journal (Page 10) */}
          <View style={styles.journalSection}>
            <View style={styles.journalHeader}>
              <Text style={styles.journalTitle}>📖 Shared Trip Journal</Text>
              <Text style={styles.journalSub}>Add notes & moodboards (No chat allowed)</Text>
            </View>
            <View style={styles.journalEntry}>
              <Text style={{fontStyle: 'italic', color: '#666'}}>Sarah added a photo to "Vibes"</Text>
            </View>
            <View style={styles.journalEntry}>
              <Text style={{fontStyle: 'italic', color: '#666'}}>You added "Packing List"</Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={{color: THEME.primary}}>+ Add Entry</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.safetyBtn}>
             <Text style={styles.safetyText}>🛡️ Safety & Support (24/7)</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <TouchableOpacity style={styles.homeBtn} onPress={onReset}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Return to Home (Demo)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImage: { width: '100%', height: 200 },
  content: { padding: 20 },
  status: { color: 'green', fontWeight: 'bold', marginBottom: 5, letterSpacing: 1 },
  title: { fontSize: 28, fontWeight: 'bold', color: THEME.primary, marginBottom: 20 },
  
  momentBox: { backgroundColor: THEME.primary, padding: 20, borderRadius: 12, marginBottom: 25 },
  momentTitle: { color: THEME.gold, fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  momentText: { color: '#fff', fontSize: 16, lineHeight: 24, fontStyle: 'italic' },

  journalSection: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 15, marginBottom: 20 },
  journalHeader: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  journalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  journalSub: { fontSize: 12, color: '#888' },
  journalEntry: { padding: 10, backgroundColor: '#f9f9f9', marginBottom: 5, borderRadius: 5 },
  addBtn: { alignSelf: 'center', marginTop: 10, padding: 10 },

  safetyBtn: { backgroundColor: '#eee', padding: 15, borderRadius: 8, alignItems: 'center' },
  safetyText: { fontWeight: 'bold', color: '#555' },

  homeBtn: { backgroundColor: '#000', padding: 15, alignItems: 'center', margin: 20, borderRadius: 10 }
});