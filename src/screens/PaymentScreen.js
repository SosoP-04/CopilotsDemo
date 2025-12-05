import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';

export default function PaymentScreen({ trip, onCancel }) {
  const [optInFilming, setOptInFilming] = useState(false);
  const [paymentState, setPaymentState] = useState('pending'); // pending, paid

  const handlePay = () => {
    // Safety check simulation
    Alert.alert(
      "Safety Verification", 
      "Before paying, please confirm you have viewed your match's Vouch Score.",
      [{ text: "Confirmed", onPress: () => setPaymentState('paid') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {paymentState === 'pending' ? (
          <>
            <Text style={styles.title}>Checkout</Text>
            <Text style={styles.tripTitle}>{trip.title}</Text>
            <Text style={styles.price}>Your Share: £{trip.price / 2}</Text>

            <View style={styles.divider} />

            {/* FILMING OPT-IN (Page 11) */}
            <View style={styles.optInBox}>
              <View style={{flex: 1}}>
                <Text style={styles.optInTitle}>🎥 Star in "First Adventure"?</Text>
                <Text style={styles.optInDesc}>Opt-in to be filmed. If selected, Copilots covers the entire cost of the trip.</Text>
              </View>
              <Switch value={optInFilming} onValueChange={setOptInFilming} trackColor={{true: '#FF6B6B'}} />
            </View>

            <View style={styles.spacer} />

            <TouchableOpacity style={styles.payButton} onPress={handlePay}>
              <Text style={styles.buttonText}>PAY £{trip.price / 2} (HELD IN ESCROW)</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{alignItems: 'center', marginTop: 50}}>
            <Text style={{fontSize: 60}}>⏳</Text>
            <Text style={styles.title}>Waiting for Partner</Text>
            <Text style={{textAlign: 'center', marginTop: 10, color: '#666'}}>
              Funds held securely. Waiting for them to pay.
            </Text>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>CANCEL & REFUND</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1B3A57', marginBottom: 10 },
  tripTitle: { fontSize: 20, marginBottom: 5 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#666' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
  optInBox: { flexDirection: 'row', backgroundColor: '#fff0f0', padding: 15, borderRadius: 10, alignItems: 'center' },
  optInTitle: { fontWeight: 'bold', color: '#d63031', marginBottom: 5 },
  optInDesc: { fontSize: 12, color: '#d63031' },
  spacer: { height: 30 },
  payButton: { backgroundColor: '#1B3A57', padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { marginTop: 30, padding: 15, borderWidth: 1, borderColor: 'red', borderRadius: 10, width: '100%', alignItems: 'center' },
  cancelText: { color: 'red', fontWeight: 'bold' }
});