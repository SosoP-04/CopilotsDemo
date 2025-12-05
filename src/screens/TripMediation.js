// src/screens/TripMediation.js - Enhanced Version

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Platform, 
  StatusBar, 
  Alert 
} from 'react-native';
import { TRIP_TIERS, SIGNALS, THEME } from '../data/mockData';

export default function TripMediation({ matchedUser, onTripSelected, onBack }) {
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [viewMode, setViewMode] = useState('tiers'); // 'tiers' or 'trips'

  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
    setViewMode('trips');
  };

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };

  const handleConfirm = () => {
    if (!selectedTrip) {
      return Alert.alert("Select a trip", "Please select at least one trip option.");
    }
    
    // Simulate match
    Alert.alert(
      "It's a Match!", 
      `${matchedUser?.name || 'Your match'} also picked this trip!`,
      [
        { 
          text: "Book Now", 
          onPress: () => onTripSelected(selectedTrip) 
        }
      ]
    );
  };

  const sendSignal = (signal) => {
    Alert.alert("Signal Sent", `"${signal}" has been sent to your match.`);
  };

  // Render Tier Selection View
  const renderTierSelection = () => (
    <ScrollView style={styles.content}>
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>Choose Your Adventure Level</Text>
        <Text style={styles.introText}>
          Select the tier that matches your comfort level and availability. You can explore multiple options.
        </Text>
      </View>

      {TRIP_TIERS.map((tier) => (
        <TouchableOpacity 
          key={tier.id}
          style={styles.tierCard}
          onPress={() => handleTierSelect(tier)}
        >
          <View style={styles.tierHeader}>
            <Text style={styles.tierIcon}>{tier.icon}</Text>
            <View style={{flex: 1}}>
              <Text style={styles.tierTitle}>{tier.tier}</Text>
              <Text style={styles.tierSubtitle}>{tier.subtitle}</Text>
            </View>
            <Text style={styles.arrowIcon}>→</Text>
          </View>
          
          <View style={styles.tierDetails}>
            <View style={styles.tierDetail}>
              <Text style={styles.detailLabel}>💰 Price</Text>
              <Text style={styles.detailValue}>{tier.priceRange}</Text>
            </View>
            <View style={styles.tierDetail}>
              <Text style={styles.detailLabel}>⏱️ Duration</Text>
              <Text style={styles.detailValue}>{tier.duration}</Text>
            </View>
            <View style={styles.tierDetail}>
              <Text style={styles.detailLabel}>📅 Commitment</Text>
              <Text style={styles.detailValue}>{tier.commitment}</Text>
            </View>
          </View>

          <View style={styles.tripPreview}>
            <Text style={styles.previewLabel}>Available trips:</Text>
            {tier.trips.slice(0, 2).map((trip, i) => (
              <Text key={i} style={styles.previewItem}>• {trip.title}</Text>
            ))}
            {tier.trips.length > 2 && (
              <Text style={styles.previewMore}>+{tier.trips.length - 2} more</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Render Trip Selection View
  const renderTripSelection = () => {
    const currentTier = TRIP_TIERS.find(t => t.id === selectedTier.id);
    
    return (
      <View style={{flex: 1}}>
        <View style={styles.tripHeader}>
          <TouchableOpacity onPress={() => setViewMode('tiers')} style={styles.backBtn}>
            <Text style={styles.backText}>← Back to Tiers</Text>
          </TouchableOpacity>
          <View style={styles.tierBadge}>
            <Text style={styles.tierBadgeText}>{currentTier.tier}</Text>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {currentTier.trips.map((trip) => {
            const isSelected = selectedTrip?.id === trip.id;
            
            return (
              <TouchableOpacity 
                key={trip.id}
                style={[styles.tripCard, isSelected && styles.selectedCard]}
                onPress={() => handleTripSelect(trip)}
              >
                <Image source={{ uri: trip.image }} style={styles.tripImage} />
                
                {isSelected && (
                  <View style={styles.selectedOverlay}>
                    <View style={styles.checkCircle}>
                      <Text style={styles.checkMark}>✓</Text>
                    </View>
                  </View>
                )}

                <View style={styles.tripContent}>
                  <View style={styles.tripHeader}>
                    <Text style={styles.tripTitle}>{trip.title}</Text>
                    <Text style={styles.tripPrice}>£{trip.price}</Text>
                  </View>
                  
                  <Text style={styles.tripLocation}>📍 {trip.location}</Text>
                  <Text style={styles.tripDescription}>{trip.description}</Text>
                  
                  <View style={styles.highlightsSection}>
                    <Text style={styles.highlightsTitle}>Highlights:</Text>
                    <View style={styles.highlightsList}>
                      {trip.highlights.map((highlight, i) => (
                        <View key={i} style={styles.highlightItem}>
                          <Text style={styles.highlightDot}>•</Text>
                          <Text style={styles.highlightText}>{highlight}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.meetingSection}>
                    <Text style={styles.meetingLabel}>🎯 Meeting Point:</Text>
                    <Text style={styles.meetingPoint}>{trip.meetingPoint}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Floating Confirm Button */}
        {selectedTrip && (
          <View style={styles.floatingFooter}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.confirmBtnText}>CONFIRM SELECTION →</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Planning</Text>
        <View style={{width: 40}} />
      </View>

      {/* Lock Banner */}
      <View style={styles.lockBanner}>
        <Text style={styles.lockIcon}>🔒</Text>
        <View style={{flex: 1}}>
          <Text style={styles.lockTitle}>No Chat Mode Active</Text>
          <Text style={styles.lockText}>
            Vote on trips you're open to. Chat unlocks after booking.
          </Text>
        </View>
      </View>

      {/* Signals Section */}
      <View style={styles.signalsSection}>
        <Text style={styles.signalsTitle}>Send a Signal</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.signalsScroll}
        >
          {SIGNALS.map((signal, i) => (
            <TouchableOpacity 
              key={i} 
              style={styles.signalChip}
              onPress={() => sendSignal(signal)}
            >
              <Text style={styles.signalText}>{signal}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      {viewMode === 'tiers' ? renderTierSelection() : renderTripSelection()}
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
    alignItems: 'center', 
    justifyContent: 'space-between',
    padding: 16, 
    backgroundColor: THEME.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 24,
    color: '#666',
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: THEME.deepExpedition 
  },
  
  // Lock Banner
  lockBanner: { 
    backgroundColor: '#fff5f5', 
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffe0e0',
  },
  lockIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  lockTitle: {
    fontWeight: 'bold',
    color: THEME.danger,
    marginBottom: 2,
  },
  lockText: { 
    color: THEME.danger, 
    fontSize: 12,
    lineHeight: 16,
  },
  
  // Signals Section
  signalsSection: {
    backgroundColor: THEME.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  signalsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  signalsScroll: {
    paddingHorizontal: 16,
  },
  signalChip: { 
    backgroundColor: THEME.trailDust, 
    borderWidth: 1.5, 
    borderColor: THEME.deepExpedition, 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginRight: 8,
  },
  signalText: { 
    color: THEME.deepExpedition, 
    fontSize: 13,
    fontWeight: '500',
  },

  content: {
    flex: 1,
  },

  // Intro Section
  introSection: {
    padding: 20,
    backgroundColor: THEME.white,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 8,
  },
  introText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },

  // Tier Cards
  tierCard: {
    backgroundColor: THEME.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tierIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  tierTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 2,
  },
  tierSubtitle: {
    fontSize: 13,
    color: '#888',
  },
  arrowIcon: {
    fontSize: 24,
    color: THEME.sunsetCoral,
  },
  tierDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: THEME.trailDust,
  },
  tierDetail: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.deepExpedition,
  },
  tripPreview: {
    padding: 16,
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    marginBottom: 8,
  },
  previewItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  previewMore: {
    fontSize: 12,
    color: THEME.sunsetCoral,
    marginTop: 4,
    fontWeight: '600',
  },

  // Trip Header
  tripHeader: {
    padding: 16,
    backgroundColor: THEME.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backBtn: {
    marginBottom: 8,
  },
  backText: {
    fontSize: 15,
    color: THEME.deepExpedition,
  },
  tierBadge: {
    backgroundColor: THEME.trailDust,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  tierBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
  },

  // Trip Cards
  tripCard: { 
    backgroundColor: THEME.white, 
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16, 
    overflow: 'hidden',
    borderWidth: 2, 
    borderColor: 'transparent',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: { 
    borderColor: THEME.sunsetCoral,
    shadowColor: THEME.sunsetCoral,
    shadowOpacity: 0.3,
  },
  tripImage: { 
    width: '100%', 
    height: 200,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  checkCircle: {
    backgroundColor: THEME.sunsetCoral,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: THEME.white,
  },
  checkMark: {
    color: THEME.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  tripContent: { 
    padding: 16 
  },
  tripTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    flex: 1,
  },
  tripPrice: { 
    fontSize: 24,
    fontWeight: 'bold', 
    color: THEME.sunsetCoral,
  },
  tripLocation: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    marginBottom: 12,
  },
  tripDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 16,
  },
  highlightsSection: {
    marginBottom: 16,
  },
  highlightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.deepExpedition,
    marginBottom: 8,
  },
  highlightsList: {
    backgroundColor: THEME.trailDust,
    padding: 12,
    borderRadius: 8,
  },
  highlightItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  highlightDot: {
    color: THEME.sunsetCoral,
    marginRight: 8,
    fontWeight: 'bold',
  },
  highlightText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
  },
  meetingSection: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: THEME.deepExpedition,
  },
  meetingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.deepExpedition,
    marginBottom: 4,
  },
  meetingPoint: {
    fontSize: 13,
    color: '#555',
    fontStyle: 'italic',
  },

  // Floating Footer
  floatingFooter: {
    padding: 16,
    backgroundColor: THEME.white,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  confirmBtn: { 
    backgroundColor: THEME.deepExpedition, 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    shadowColor: THEME.deepExpedition,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  confirmBtnText: { 
    color: THEME.white, 
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});