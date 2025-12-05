import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Platform, StatusBar } from 'react-native';
import { MATCHES_LIST, THEME } from '../data/mockData';

export default function MatchesListScreen({ onSelectMatch }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Co-Pilots</Text>
        <Text style={styles.sub}>People you've matched with. Select one to plan.</Text>
      </View>

      <FlatList
        data={MATCHES_LIST}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelectMatch(item)}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.active}>Active {item.lastActive}</Text>
            </View>
            <View style={styles.statusBox}>
                <Text style={styles.statusText}>
                    {item.status === 'new' ? '✨ NEW' : '✈️ PLANNING'}
                </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{textAlign:'center', marginTop: 50, color: '#888'}}>No matches yet. Keep swiping!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40 },
  header: { padding: 20, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 28, fontWeight: 'bold', color: THEME.primary },
  sub: { color: '#666', marginTop: 5 },
  item: { flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: '#f0f0f0', alignItems: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  active: { color: '#999', fontSize: 12 },
  statusBox: { paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#f0f4f8', borderRadius: 10 },
  statusText: { fontSize: 10, fontWeight: 'bold', color: THEME.primary }
});