import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Animated, PanResponder, Platform, StatusBar } from 'react-native';
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
      onMatch(item); // Trigger match logic
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
            <TouchableOpacity onPress={onNavProfile}><Text style={{fontSize: 24}}>👤</Text></TouchableOpacity>
            <Text style={styles.headerTitle}>COPILOTS</Text>
            <TouchableOpacity onPress={onNavSettings}><Text style={{fontSize: 24}}>⚙️</Text></TouchableOpacity>
         </View>
         <View style={styles.emptyContainer}>
            <Text style={{fontSize: 50}}>🌍</Text>
            <Text style={styles.emptyText}>No more pilots in your area.</Text>
            <TouchableOpacity style={styles.refreshBtn} onPress={() => setCurrentIndex(0)}>
                <Text style={{color: '#fff'}}>Refresh List</Text>
            </TouchableOpacity>
         </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavProfile} style={styles.iconBtn}>
            <Text style={{fontSize: 24}}>👤</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>COPILOTS</Text>
        
        <TouchableOpacity onPress={onNavSettings} style={styles.iconBtn}>
            <Text style={{fontSize: 24}}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <Animated.View 
          style={[styles.card, getCardStyle()]} 
          {...panResponder.panHandlers}
        >
           <ScrollView bounces={false} style={{flex: 1, borderRadius: 20}}>
            {/* Main Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: currentProfile.image }} style={styles.fullImage} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.gradient} />
                <View style={styles.overlayInfo}>
                    <Text style={styles.name}>{currentProfile.name}, {currentProfile.age}</Text>
                    <Text style={styles.location}>📍 {currentProfile.location}</Text>
                </View>

                {/* Overlay Text for Swipe */}
                <Animated.View style={[styles.likeBadge, { opacity: position.x.interpolate({ inputRange: [0, 100], outputRange: [0, 1] }) }]}>
                    <Text style={styles.likeText}>TAKEOFF</Text>
                </Animated.View>
                <Animated.View style={[styles.nopeBadge, { opacity: position.x.interpolate({ inputRange: [-100, 0], outputRange: [1, 0] }) }]}>
                    <Text style={styles.nopeText}>GROUND</Text>
                </Animated.View>
            </View>

            <View style={styles.detailsContent}>
                <Text style={styles.bio}>{currentProfile.bio}</Text>

                <View style={styles.tagContainer}>
                    {currentProfile.travelStyle.map((tag, i) => (
                    <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                    ))}
                </View>

                <Text style={styles.sectionHeader}>📹 Video Intro</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videoScroll}>
                    {currentProfile.videoThumbnails.map((vid) => (
                    <View key={vid.id} style={[styles.videoBox, {backgroundColor: vid.color}]}>
                        <Text style={{fontSize: 30}}>▶️</Text>
                        <Text style={styles.videoTitle}>{vid.title}</Text>
                    </View>
                    ))}
                </ScrollView>

                <View style={styles.antiListBox}>
                    <Text style={styles.antiListTitle}>⚠️ The Anti-List</Text>
                    {currentProfile.antiList.map((item, i) => (
                    <Text key={i} style={styles.antiListItem}>• {item}</Text>
                    ))}
                </View>
                <View style={{height: 100}} /> 
            </View>
           </ScrollView>
        </Animated.View>
      </View>

      {/* FOOTER ACTIONS */}
      <View style={styles.actions}>
         <TouchableOpacity style={[styles.btn, styles.passBtn]} onPress={() => forceSwipe('left')}>
            <Text style={[styles.btnIcon, {color: THEME.text}]}>✕</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[styles.btn, styles.matchBtn]} onPress={() => forceSwipe('right')}>
            <Text style={[styles.btnIcon, {color: '#fff'}]}>⛑️</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: THEME.primary, letterSpacing: 1 },
  iconBtn: { padding: 10 },
  
  cardContainer: { flex: 1, alignItems: 'center' },
  card: { height: height * 0.78, width: width * 0.95, backgroundColor: THEME.white, borderRadius: 20, shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 },
  
  imageContainer: { height: 400, width: '100%' },
  fullImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  gradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 150 },
  overlayInfo: { position: 'absolute', bottom: 20, left: 20 },
  name: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  location: { fontSize: 16, color: '#ddd' },

  detailsContent: { padding: 20 },
  bio: { fontSize: 18, color: '#444', lineHeight: 26, marginBottom: 15 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  tag: { backgroundColor: THEME.neutral, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  tagText: { color: THEME.primary, fontWeight: '600' },
  
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: THEME.primary, marginBottom: 10 },
  videoScroll: { marginBottom: 20 },
  videoBox: { width: 100, height: 130, borderRadius: 12, marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  videoTitle: { fontWeight: 'bold', marginTop: 10, textAlign: 'center', fontSize: 10 },
  
  antiListBox: { backgroundColor: '#ffe5e5', padding: 15, borderRadius: 12 },
  antiListTitle: { color: '#d63031', fontWeight: 'bold', marginBottom: 5 },
  antiListItem: { color: '#d63031' },

  actions: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 },
  btn: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, shadowOpacity: 0.1, elevation: 2 },
  passBtn: { backgroundColor: '#fff' },
  matchBtn: { backgroundColor: THEME.accent },
  btnIcon: { fontSize: 24, fontWeight: 'bold' },

  likeBadge: { position: 'absolute', top: 40, left: 40, transform: [{rotate: '-30deg'}], borderWidth: 4, borderColor: '#2ecc71', padding: 10, borderRadius: 10 },
  likeText: { color: '#2ecc71', fontSize: 32, fontWeight: 'bold' },
  nopeBadge: { position: 'absolute', top: 40, right: 40, transform: [{rotate: '30deg'}], borderWidth: 4, borderColor: '#e74c3c', padding: 10, borderRadius: 10 },
  nopeText: { color: '#e74c3c', fontSize: 32, fontWeight: 'bold' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#888', marginTop: 10 },
  refreshBtn: { marginTop: 20, backgroundColor: THEME.primary, padding: 15, borderRadius: 25 }
});