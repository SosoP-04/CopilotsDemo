import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert, StyleSheet, Platform, StatusBar } from 'react-native';
import { THEME } from '../data/mockData';

export default function PaymentScreen({ trip, onCancel, onPaid }) {
  const [optInFilming, setOptInFilming] = useState(false);
  const [paymentState, setPaymentState] = useState('pending'); // pending, paid

  // Guard against missing trip data
  if (!trip) {
    return (
        <View style={styles.container}>
            <Text style={{textAlign:'center', marginTop: 100}}>Error: No trip selected.</Text>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
  }

  const handlePay = () => {
    Alert.alert(
      "Safety Verification", 
      "Before paying, please confirm you have viewed your match's Vouch Score and ID Badge.",
      [{ text: "Confirmed", onPress: () => setPaymentState('paid') }]
    );
  };

  if (paymentState === 'paid') {
     setTimeout(() => { onPaid(); }, 2000);
     return (
        <View style={styles.container}>
            <View style={[styles.content, {alignItems: 'center', justifyContent: 'center', flex: 1}]}>
                <Text style={{fontSize: 60}}>⏳</Text>
                <Text style={styles.title}>Waiting for Sarah...</Text>
                <Text style={{textAlign: 'center', marginTop: 10, color: '#666'}}>Funds held in escrow.</Text>
            </View>
        </View>
     )
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
            <Text style={styles.title}>Checkout</Text>
            <View style={styles.tripSummary}>
                <Text style={styles.tripTitle}>{trip?.title}</Text>
                <Text style={styles.tripLoc}>📍 {trip?.location}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Total Trip Cost</Text>
                <Text style={styles.value}>£{trip?.price}</Text>
            </View>
            <View style={[styles.row, {marginBottom: 20}]}>
                <Text style={[styles.label, {fontWeight: 'bold'}]}>Your Share (50%)</Text>
                <Text style={[styles.value, {color: THEME.primary, fontSize: 24}]}>
                    £{(trip?.price || 0) / 2}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.optInBox}>
              <View style={{flex: 1, paddingRight: 10}}>
                <Text style={styles.optInTitle}>🎥 Star in "First Adventure"?</Text>
                <Text style={styles.optInDesc}>If selected, Copilots covers 100% of cost.</Text>
              </View>
              <Switch value={optInFilming} onValueChange={setOptInFilming} trackColor={{true: THEME.accent}} />
            </View>

            <View style={{flex: 1}} />

            <TouchableOpacity style={styles.payButton} onPress={handlePay}>
              <Text style={styles.buttonText}>SECURE PAYMENT (ESCROW)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>CANCEL MATCH</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40 },
  content: { padding: 30, flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', color: THEME.primary, marginBottom: 20 },
  tripSummary: { marginBottom: 30, backgroundColor: THEME.neutral, padding: 15, borderRadius: 10 },
  tripTitle: { fontSize: 20, fontWeight: 'bold', color: THEME.primary },
  tripLoc: { fontSize: 16, color: '#666', marginTop: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label: { fontSize: 16, color: '#555' },
  value: { fontSize: 18, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
  optInBox: { flexDirection: 'row', backgroundColor: '#fff0f0', padding: 15, borderRadius: 10, alignItems: 'center', borderLeftWidth: 4, borderLeftColor: THEME.accent },
  optInTitle: { fontWeight: 'bold', color: '#d63031', marginBottom: 5 },
  optInDesc: { fontSize: 12, color: '#d63031' },
  payButton: { backgroundColor: THEME.primary, padding: 18, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelButton: { padding: 15, alignItems: 'center' },
  cancelText: { color: 'red', fontWeight: 'bold' }
});