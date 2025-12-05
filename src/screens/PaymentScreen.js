// src/screens/PaymentScreen.js - Enhanced Version

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Platform, 
  StatusBar,
  Image,
  ScrollView 
} from 'react-native';
import { THEME } from '../data/mockData';

export default function PaymentScreen({ trip, matchedUser, onCancel, onPaid }) {
  const [optInFilming, setOptInFilming] = useState(false);
  const [paymentState, setPaymentState] = useState('pending'); // pending, verifying, waiting, paid

  // Guard against missing trip data
  if (!trip) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: No trip selected.</Text>
        <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handlePay = () => {
    Alert.alert(
      "Safety Verification", 
      `Before paying, please confirm:\n\n• You have viewed ${matchedUser?.name || 'your match'}'s Vouch Score\n• You have seen their ID verification badge\n• You understand the trip details and meeting point`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirmed", 
          onPress: () => {
            setPaymentState('verifying');
            setTimeout(() => {
              setPaymentState('waiting');
            }, 2000);
          }
        }
      ]
    );
  };

  // Waiting for partner
  if (paymentState === 'waiting') {
    setTimeout(() => { onPaid(); }, 3000);
    return (
      <View style={styles.container}>
        <View style={styles.waitingContainer}>
          <Image 
            source={{ uri: matchedUser?.image || trip.partnerImage }} 
            style={styles.partnerAvatar}
          />
          <Text style={styles.waitingIcon}>⏳</Text>
          <Text style={styles.waitingTitle}>Waiting for {matchedUser?.name || 'your match'}...</Text>
          <Text style={styles.waitingText}>Funds are held securely in escrow.</Text>
          <View style={styles.escrowInfo}>
            <Text style={styles.escrowIcon}>🛡️</Text>
            <Text style={styles.escrowText}>
              Your payment is protected. Funds are only released after both parties confirm.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // Payment verification
  if (paymentState === 'verifying') {
    return (
      <View style={styles.container}>
        <View style={styles.verifyingContainer}>
          <Text style={styles.verifyIcon}>💳</Text>
          <Text style={styles.verifyTitle}>Processing Payment...</Text>
          <Text style={styles.verifyText}>This should only take a moment.</Text>
        </View>
      </View>
    );
  }

  const yourShare = (trip?.price || 0) / 2;

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{width: 50}} />
        </View>

        {/* Trip Summary Card */}
        <View style={styles.tripCard}>
          <Image source={{ uri: trip?.image }} style={styles.tripImage} />
          <View style={styles.tripInfo}>
            <Text style={styles.tripTitle}>{trip?.title}</Text>
            <Text style={styles.tripLocation}>📍 {trip?.location}</Text>
            {trip.tier && (
              <View style={styles.tierBadge}>
                <Text style={styles.tierText}>{trip.tier}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.content}>
          {/* Partner Info */}
          {matchedUser && (
            <View style={styles.partnerSection}>
              <Text style={styles.sectionTitle}>Travel Partner</Text>
              <View style={styles.partnerCard}>
                <Image source={{ uri: matchedUser.image }} style={styles.partnerImage} />
                <View style={{flex: 1}}>
                  <View style={styles.partnerNameRow}>
                    <Text style={styles.partnerName}>{matchedUser.name}</Text>
                    {matchedUser.verifiedID && (
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedText}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.partnerJob}>{matchedUser.job}</Text>
                  {matchedUser.vouchScore && (
                    <Text style={styles.vouchScore}>
                      🛡️ Vouch Score: {matchedUser.vouchScore}/5.0
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}

          {/* Price Breakdown */}
          <View style={styles.priceSection}>
            <Text style={styles.sectionTitle}>Price Breakdown</Text>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Total Trip Cost</Text>
              <Text style={styles.priceValue}>£{trip?.price}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Split (50/50)</Text>
              <Text style={styles.priceValue}>÷ 2</Text>
            </View>
            
            <View style={[styles.priceRow, styles.finalRow]}>
              <Text style={styles.finalLabel}>Your Share</Text>
              <Text style={styles.finalPrice}>£{yourShare}</Text>
            </View>

            <View style={styles.includesSection}>
              <Text style={styles.includesTitle}>What's Included:</Text>
              {trip.includes?.map((item, i) => (
                <Text key={i} style={styles.includesItem}>✓ {item}</Text>
              )) || (
                <>
                  <Text style={styles.includesItem}>✓ All activities</Text>
                  <Text style={styles.includesItem}>✓ Professional planning</Text>
                  <Text style={styles.includesItem}>✓ 24/7 support</Text>
                  <Text style={styles.includesItem}>✓ Meeting coordination</Text>
                </>
              )}
            </View>
          </View>

          {/* Content Opt-In */}
          <View style={styles.contentOptIn}>
            <View style={styles.optInHeader}>
              <Text style={styles.optInIcon}>🎥</Text>
              <View style={{flex: 1}}>
                <Text style={styles.optInTitle}>Star in "First Adventure"?</Text>
                <Text style={styles.optInSubtitle}>
                  Opt-in to be considered for our documentary series
                </Text>
              </View>
              <Switch 
                value={optInFilming} 
                onValueChange={setOptInFilming}
                trackColor={{true: THEME.sunsetCoral, false: '#ccc'}}
                thumbColor={THEME.white}
              />
            </View>
            
            {optInFilming && (
              <View style={styles.optInDetails}>
                <Text style={styles.optInBenefit}>✨ If selected, Copilots covers 100% of trip cost</Text>
                <Text style={styles.optInNote}>
                  Selection based on story potential and trip uniqueness. Both partners must opt-in.
                </Text>
              </View>
            )}
          </View>

          {/* Safety Info */}
          <View style={styles.safetySection}>
            <Text style={styles.safetyTitle}>🛡️ Your Safety Matters</Text>
            <View style={styles.safetyItem}>
              <Text style={styles.safetyCheck}>✓</Text>
              <Text style={styles.safetyText}>Funds held in secure escrow</Text>
            </View>
            <View style={styles.safetyItem}>
              <Text style={styles.safetyCheck}>✓</Text>
              <Text style={styles.safetyText}>Full refund up to 72 hours before</Text>
            </View>
            <View style={styles.safetyItem}>
              <Text style={styles.safetyCheck}>✓</Text>
              <Text style={styles.safetyText}>24/7 emergency support line</Text>
            </View>
            <View style={styles.safetyItem}>
              <Text style={styles.safetyCheck}>✓</Text>
              <Text style={styles.safetyText}>ID verified travel partners</Text>
            </View>
          </View>

          {/* Meeting Point Reminder */}
          {trip.meetingPoint && (
            <View style={styles.meetingReminder}>
              <Text style={styles.meetingTitle}>📍 First Meeting Point</Text>
              <Text style={styles.meetingText}>{trip.meetingPoint}</Text>
              <Text style={styles.meetingNote}>
                You'll receive detailed directions 48 hours before departure
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>
            SECURE PAYMENT - £{yourShare}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50 
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: THEME.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backText: {
    fontSize: 16,
    color: THEME.deepExpedition,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
  },

  // Trip Card
  tripCard: {
    backgroundColor: THEME.white,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripImage: {
    width: '100%',
    height: 160,
  },
  tripInfo: {
    padding: 16,
  },
  tripTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 4,
  },
  tripLocation: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  tierBadge: {
    backgroundColor: THEME.trailDust,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  tierText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
  },

  content: {
    padding: 16,
  },

  // Partner Section
  partnerSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 12,
  },
  partnerCard: {
    flexDirection: 'row',
    backgroundColor: THEME.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  partnerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  partnerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: THEME.success,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: THEME.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  partnerJob: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  vouchScore: {
    fontSize: 13,
    color: THEME.deepExpedition,
    fontWeight: '600',
  },

  // Price Section
  priceSection: {
    backgroundColor: THEME.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 15,
    color: '#666',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  finalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: THEME.horizonGold,
  },
  finalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
  },
  finalPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.sunsetCoral,
  },
  includesSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  includesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  includesItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },

  // Content Opt-In
  contentOptIn: {
    backgroundColor: '#fff5f5',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: THEME.sunsetCoral,
    marginBottom: 20,
  },
  optInHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  optInIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  optInTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 2,
  },
  optInSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  optInDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  optInBenefit: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME.sunsetCoral,
    marginBottom: 8,
  },
  optInNote: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },

  // Safety Section
  safetySection: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: THEME.deepExpedition,
    marginBottom: 20,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 12,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  safetyCheck: {
    color: THEME.success,
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  safetyText: {
    fontSize: 14,
    color: '#555',
  },

  // Meeting Reminder
  meetingReminder: {
    backgroundColor: THEME.trailDust,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  meetingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 8,
  },
  meetingText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  meetingNote: {
    fontSize: 12,
    color: '#888',
  },

  // Footer
  footer: {
    padding: 16,
    backgroundColor: THEME.white,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  payButton: {
    backgroundColor: THEME.deepExpedition,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: THEME.deepExpedition,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  payButtonText: {
    color: THEME.white,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: THEME.danger,
    fontWeight: '600',
  },

  // Waiting/Verifying States
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  partnerAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  waitingIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  waitingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 8,
    textAlign: 'center',
  },
  waitingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  escrowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    maxWidth: 300,
  },
  escrowIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  escrowText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  verifyingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  verifyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  verifyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 8,
  },
  verifyText: {
    fontSize: 16,
    color: '#666',
  },

  // Error State
  errorText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  cancelBtn: {
    alignSelf: 'center',
    backgroundColor: THEME.deepExpedition,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelBtnText: {
    color: THEME.white,
    fontWeight: '600',
  },
});