import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { THEME, MY_PROFILE } from '../data/mockData';

export default function ProfileScreen({ onBack }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={{fontSize: 20, color: THEME.primary}}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{width: 50}} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
            <Image source={{ uri: MY_PROFILE.image }} style={styles.avatar} />
            <Text style={styles.name}>{MY_PROFILE.name}, {MY_PROFILE.age}</Text>
            <Text style={styles.job}>{MY_PROFILE.job}</Text>
        </View>

        <View style={styles.statsRow}>
            <View style={styles.statItem}>
                <Text style={styles.statNum}>{MY_PROFILE.stats.trips}</Text>
                <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statNum}>{MY_PROFILE.stats.countries}</Text>
                <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statNum}>✈️</Text>
                <Text style={styles.statLabel}>{MY_PROFILE.stats.style}</Text>
            </View>
        </View>

        <View style={styles.section}>
            <Text style={styles.label}>About Me</Text>
            <Text style={styles.text}>{MY_PROFILE.bio}</Text>
        </View>

        <View style={styles.section}>
            <Text style={styles.label}>My Experience Matrix</Text>
            <TouchableOpacity style={styles.matrixBtn}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Edit Matrix</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.section}>
            <Text style={styles.label}>Video Intro</Text>
            <View style={styles.placeholderVid}>
                <Text style={{color: '#aaa'}}>+ Upload Video</Text>
            </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: THEME.primary },
  content: { padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', color: THEME.primary },
  job: { fontSize: 16, color: '#666' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30, backgroundColor: '#f9f9f9', padding: 15, borderRadius: 15 },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: 'bold', color: THEME.primary },
  statLabel: { fontSize: 12, color: '#888' },
  section: { marginBottom: 25 },
  label: { fontSize: 16, fontWeight: 'bold', color: THEME.primary, marginBottom: 10 },
  text: { fontSize: 16, color: '#444', lineHeight: 24 },
  matrixBtn: { backgroundColor: THEME.primary, padding: 15, borderRadius: 10, alignItems: 'center' },
  placeholderVid: { height: 150, backgroundColor: '#eee', borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: '#ccc' }
});