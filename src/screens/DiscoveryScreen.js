// src/screens/DiscoveryScreen.js - Enhanced Version

import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  Animated, 
  PanResponder, 
  Platform, 
  StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../data/mockData';

const { width, height } = Dimensions.get('window');

export default function DiscoveryScreen({ profiles, onMatch, onNavProfile, onNavSettings }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Animation Values
  const position = useRef(new Animated.ValueXY()).current;
  const currentProfile = profiles[currentIndex];

  // PanResponder for Swipe Logic
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          forceSwipe('right');
        } else if (gesture.dx < -120) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      }
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? width + 100 : -width - 100;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const item = profiles[currentIndex];
    
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(prev => prev + 1);

    if (direction === 'right') {
      onMatch(item);
    }
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: false
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-width * 1.5, 0, width * 1.5],
      outputRange: ['-10deg', '0deg', '10deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  };

  // Render "No more profiles"
  if (currentIndex >= profiles.length) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onNavProfile} style={styles.headerIcon}>
            <Text style={styles.iconText}>👤</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>COPILOTS</Text>
          <TouchableOpacity onPress={onNavSettings} style={styles.headerIcon}>
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🌍</Text>
          <Text style={styles.emptyTitle}>No More Pilots in Your Area</Text>
          <Text style={styles.emptyText}>
            You've seen everyone nearby. Check back soon for new adventurers!
          </Text>
          <TouchableOpacity style={styles.refreshBtn} onPress={() => setCurrentIndex(0)}>
            <Text style={styles.refreshBtnText}>↻ Refresh List</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Render travel style tags (updated to handle object structure)
  const renderTravelStyleTags = () => {
    if (!currentProfile.travelStyle) return null;
    
    const styles_tags = [];
    const style = currentProfile.travelStyle;
    
    if (style.planning) styles_tags.push(`${style.planning} 🗓️`);
    if (style.accommodation) styles_tags.push(`${style.accommodation} 🏨`);
    if (style.pace) styles_tags.push(`${style.pace} ⏰`);
    if (style.budget) styles_tags.push(`${style.budget} 💰`);
    
    return styles_tags;
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavProfile} style={styles.headerIcon}>
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>COPILOTS</Text>
        
        <TouchableOpacity onPress={onNavSettings} style={styles.headerIcon}>
          <Text style={styles.iconText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* CARDS CONTAINER */}
      <View style={styles.cardContainer}>
        <Animated.View 
          style={[styles.card, getCardStyle()]} 
          {...panResponder.panHandlers}
        >
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {/* Main Image with Gradient Overlay */}
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: currentProfile.image }} 
                style={styles.fullImage} 
              />
              <LinearGradient 
                colors={['transparent', 'rgba(0,0,0,0.9)']} 
                style={styles.gradient} 
              />
              
              {/* Profile Info Overlay */}
              <View style={styles.overlayInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{currentProfile.name}, {currentProfile.age}</Text>
                  {currentProfile.verifiedID && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.job}>{currentProfile.job}</Text>
                <Text style={styles.location}>📍 {currentProfile.location}</Text>
                {currentProfile.compatibilityScore && (
                  <View style={styles.compatibilityBadge}>
                    <Text style={styles.compatibilityText}>
                      {currentProfile.compatibilityScore}% Match
                    </Text>
                  </View>
                )}
              </View>

              {/* Swipe Overlays */}
              <Animated.View style={[
                styles.likeBadge, 
                { opacity: position.x.interpolate({ inputRange: [0, 100], outputRange: [0, 1] }) }
              ]}>
                <Text style={styles.likeText}>TAKEOFF</Text>
              </Animated.View>
              
              <Animated.View style={[
                styles.nopeBadge, 
                { opacity: position.x.interpolate({ inputRange: [-100, 0], outputRange: [1, 0] }) }
              ]}>
                <Text style={styles.nopeText}>PASS</Text>
              </Animated.View>
            </View>

            {/* Profile Details */}
            <View style={styles.detailsContent}>
              {/* Bio */}
              <View style={styles.section}>
                <Text style={styles.bio}>{currentProfile.bio}</Text>
              </View>

              {/* Vouch Score */}
              {currentProfile.vouchScore && (
                <View style={styles.vouchSection}>
                  <Text style={styles.vouchTitle}>🛡️ Vouch Score</Text>
                  <View style={styles.vouchScore}>
                    <Text style={styles.vouchNumber}>{currentProfile.vouchScore}</Text>
                    <Text style={styles.vouchOutOf}>/5.0</Text>
                  </View>
                  <Text style={styles.vouchSub}>Verified by the community</Text>
                </View>
              )}

              {/* Travel Style */}
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>✈️ Travel Style</Text>
                <View style={styles.tagContainer}>
                  {renderTravelStyleTags().map((tag, i) => (
                    <View key={i} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Video Intros */}
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>📹 Video Intro</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  style={styles.videoScroll}
                >
                  {currentProfile.videos.map((vid) => (
                    <TouchableOpacity 
                      key={vid.id} 
                      style={[styles.videoBox, {backgroundColor: vid.thumbnail}]}
                    >
                      <Text style={styles.playIcon}>▶️</Text>
                      <Text style={styles.videoTitle}>{vid.title}</Text>
                      <Text style={styles.videoDuration}>{vid.duration}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Experience Matrix Preview */}
              {currentProfile.experienceMatrix && (
                <View style={styles.section}>
                  <Text style={styles.sectionHeader}>🗺️ Experience Matrix</Text>
                  
                  <View style={styles.experienceSection}>
                    <Text style={styles.experienceLabel}>❤️ Loved</Text>
                    <View style={styles.experienceTagsRow}>
                      {currentProfile.experienceMatrix.loved.slice(0, 3).map((item, i) => (
                        <View key={i} style={styles.experienceTag}>
                          <Text style={styles.experienceTagText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.experienceSection}>
                    <Text style={styles.experienceLabel}>✨ Want To Try</Text>
                    <View style={styles.experienceTagsRow}>
                      {currentProfile.experienceMatrix.wantToTry.slice(0, 3).map((item, i) => (
                        <View key={i} style={styles.experienceTag}>
                          <Text style={styles.experienceTagText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}

              {/* Availability */}
              {currentProfile.availability && (
                <View style={styles.section}>
                  <Text style={styles.sectionHeader}>📅 Availability</Text>
                  <Text style={styles.availabilityText}>{currentProfile.availability}</Text>
                </View>
              )}

              {/* The Anti-List */}
              {currentProfile.antiList && currentProfile.antiList.length > 0 && (
                <View style={styles.antiListBox}>
                  <Text style={styles.antiListTitle}>⚠️ The Anti-List</Text>
                  <Text style={styles.antiListSub}>Important to know before traveling together</Text>
                  {currentProfile.antiList.map((item, i) => (
                    <Text key={i} style={styles.antiListItem}>• {item}</Text>
                  ))}
                </View>
              )}

              {/* Favourite Places */}
              {currentProfile.favouritePlaces && (
                <View style={styles.section}>
                  <Text style={styles.sectionHeader}>❤️ Favourite Places</Text>
                  {currentProfile.favouritePlaces.map((place, i) => (
                    <View key={i} style={styles.placeCard}>
                      <Text style={styles.placeName}>{place.name}</Text>
                      <Text style={styles.placeCountry}>{place.country}</Text>
                      <Text style={styles.placeNote}>"{place.note}"</Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={{height: 100}} />
            </View>
          </ScrollView>
        </Animated.View>
      </View>

      {/* FOOTER ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionBtn, styles.passBtn]} 
          onPress={() => forceSwipe('left')}
        >
          <Text style={styles.btnIcon}>✕</Text>
          <Text style={styles.btnLabel}>Pass</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionBtn, styles.matchBtn]} 
          onPress={() => forceSwipe('right')}
        >
          <Text style={styles.btnIconMatch}>✈️</Text>
          <Text style={styles.btnLabelMatch}>Match</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50 
  },
  
  // Header
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 12,
    backgroundColor: THEME.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: THEME.deepExpedition, 
    letterSpacing: 2 
  },
  headerIcon: { 
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: { 
    fontSize: 24 
  },
  
  // Card Container
  cardContainer: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  card: { 
    height: height * 0.72, 
    width: width * 0.92, 
    backgroundColor: THEME.white, 
    borderRadius: 20, 
    shadowColor: "#000", 
    shadowOffset: {width: 0, height: 3}, 
    shadowOpacity: 0.15, 
    shadowRadius: 8, 
    elevation: 5,
    overflow: 'hidden',
  },
  
  // Image Section
  imageContainer: { 
    height: 420, 
    width: '100%',
    position: 'relative',
  },
  fullImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  gradient: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: 180 
  },
  overlayInfo: { 
    position: 'absolute', 
    bottom: 20, 
    left: 20,
    right: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#fff',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: THEME.success,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  job: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  location: { 
    fontSize: 16, 
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 8,
  },
  compatibilityBadge: {
    backgroundColor: THEME.horizonGold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  compatibilityText: {
    color: THEME.deepExpedition,
    fontWeight: 'bold',
    fontSize: 13,
  },

  // Details Content
  detailsContent: { 
    padding: 20 
  },
  section: {
    marginBottom: 24,
  },
  bio: { 
    fontSize: 16, 
    color: '#444', 
    lineHeight: 24,
  },
  sectionHeader: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: THEME.deepExpedition, 
    marginBottom: 12 
  },
  
  // Vouch Score
  vouchSection: {
    backgroundColor: THEME.trailDust,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  vouchTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.deepExpedition,
    marginBottom: 8,
  },
  vouchScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  vouchNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
  },
  vouchOutOf: {
    fontSize: 18,
    color: '#666',
    marginLeft: 4,
  },
  vouchSub: {
    fontSize: 12,
    color: '#888',
  },

  // Tags
  tagContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },
  tag: { 
    backgroundColor: THEME.trailDust, 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginRight: 8, 
    marginBottom: 8,
    borderWidth: 1,
    borderColor: THEME.horizonGold,
  },
  tagText: { 
    color: THEME.deepExpedition, 
    fontWeight: '600',
    fontSize: 13,
  },
  
  // Videos
  videoScroll: { 
    marginBottom: 10 
  },
  videoBox: { 
    width: 130, 
    height: 160, 
    borderRadius: 12, 
    marginRight: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 12,
  },
  playIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  videoTitle: { 
    fontWeight: 'bold', 
    marginTop: 8, 
    textAlign: 'center', 
    fontSize: 12,
    color: '#333',
  },
  videoDuration: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  
  // Experience Matrix
  experienceSection: {
    marginBottom: 16,
  },
  experienceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  experienceTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  experienceTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  experienceTagText: {
    fontSize: 12,
    color: '#555',
  },

  // Availability
  availabilityText: {
    fontSize: 15,
    color: '#555',
    backgroundColor: THEME.trailDust,
    padding: 12,
    borderRadius: 8,
  },

  // Anti-List
  antiListBox: { 
    backgroundColor: '#fff5f5', 
    padding: 16, 
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: THEME.danger,
    marginBottom: 24,
  },
  antiListTitle: { 
    color: THEME.danger, 
    fontWeight: 'bold', 
    fontSize: 16,
    marginBottom: 4,
  },
  antiListSub: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  antiListItem: { 
    color: THEME.danger,
    fontSize: 14,
    marginBottom: 4,
  },

  // Favourite Places
  placeCard: {
    backgroundColor: THEME.trailDust,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
  },
  placeCountry: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  placeNote: {
    fontSize: 13,
    color: '#555',
    fontStyle: 'italic',
  },

  // Swipe Badges
  likeBadge: { 
    position: 'absolute', 
    top: 50, 
    left: 40, 
    transform: [{rotate: '-25deg'}], 
    borderWidth: 5, 
    borderColor: THEME.success, 
    padding: 12, 
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  likeText: { 
    color: THEME.success, 
    fontSize: 28, 
    fontWeight: 'bold' 
  },
  nopeBadge: { 
    position: 'absolute', 
    top: 50, 
    right: 40, 
    transform: [{rotate: '25deg'}], 
    borderWidth: 5, 
    borderColor: THEME.danger, 
    padding: 12, 
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  nopeText: { 
    color: THEME.danger, 
    fontSize: 28, 
    fontWeight: 'bold' 
  },

  // Actions
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 16,
    backgroundColor: THEME.white,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionBtn: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: 16, 
    shadowOpacity: 0.2, 
    elevation: 3,
  },
  passBtn: { 
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  matchBtn: { 
    backgroundColor: THEME.sunsetCoral,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  btnIcon: { 
    fontSize: 32, 
    fontWeight: 'bold',
    color: '#999',
  },
  btnIconMatch: {
    fontSize: 36,
  },
  btnLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  btnLabelMatch: {
    fontSize: 11,
    color: '#fff',
    marginTop: 2,
    fontWeight: '600',
  },

  // Empty State
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.deepExpedition,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: { 
    fontSize: 16, 
    color: '#888', 
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  refreshBtn: { 
    backgroundColor: THEME.deepExpedition, 
    paddingHorizontal: 24,
    paddingVertical: 14, 
    borderRadius: 25,
  },
  refreshBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});