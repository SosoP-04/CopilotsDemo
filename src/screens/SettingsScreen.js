import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Platform, StatusBar, ScrollView } from 'react-native';
import { THEME } from '../data/mockData';

export default function SettingsScreen({ onBack, onLogout }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
            <Text style={{fontSize: 20, color: THEME.primary}}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{width: 50}} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionHeader}>Preferences</Text>
        
        <View style={styles.row}>
            <Text style={styles.rowLabel}>Push Notifications</Text>
            <Switch value={true} trackColor={{true: THEME.accent}} />
        </View>
        <View style={styles.row}>
            <Text style={styles.rowLabel}>Show Me</Text>
            <Text style={{color: '#666'}}>Everyone</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.rowLabel}>Distance Range</Text>
            <Text style={{color: '#666'}}>50 km</Text>
        </View>

        <Text style={styles.sectionHeader}>Account</Text>
        <TouchableOpacity style={styles.row}><Text style={styles.rowLabel}>Edit Profile</Text></TouchableOpacity>
        <TouchableOpacity style={styles.row}><Text style={styles.rowLabel}>Safety Centre</Text></TouchableOpacity>
        <TouchableOpacity style={styles.row}><Text style={styles.rowLabel}>Restore Purchases</Text></TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.version}>Copilots Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: THEME.primary },
  content: { padding: 20 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#888', marginTop: 20, marginBottom: 10, textTransform: 'uppercase' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  rowLabel: { fontSize: 16, color: '#333' },
  logoutBtn: { marginTop: 40, backgroundColor: '#fff', padding: 15, borderRadius: 10, alignItems: 'center' },
  logoutText: { color: 'red', fontWeight: 'bold' },
  version: { textAlign: 'center', marginTop: 20, color: '#aaa', fontSize: 12 }
});