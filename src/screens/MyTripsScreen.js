import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Platform, StatusBar } from 'react-native';
import { MY_TRIPS, THEME } from '../data/mockData';

export default function MyTripsScreen({ onSelectTrip }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
      </View>

      <FlatList
        data={MY_TRIPS}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 20}}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onSelectTrip(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.overlay}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {item.status === 'confirmed' ? '✅ CONFIRMED' : '⏳ PENDING PAYMENT'}
                    </Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.tripTitle}>{item.title}</Text>
                <View style={styles.row}>
                    <Text style={styles.partner}>With {item.partnerName}</Text>
                    <Text style={styles.price}>£{item.price}</Text>
                </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{textAlign:'center', marginTop: 50, color: '#888'}}>No trips booked yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40 },
  header: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: THEME.primary },
  card: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, overflow: 'hidden', elevation: 3 },
  image: { width: '100%', height: 150 },
  overlay: { position: 'absolute', top: 10, left: 10 },
  badge: { backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 10 },
  content: { padding: 15 },
  tripTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  partner: { color: '#666' },
  price: { fontWeight: 'bold', color: THEME.primary }
});