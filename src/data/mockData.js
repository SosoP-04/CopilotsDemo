// src/data/mockData.js

export const THEME = {
  primary: '#1B3A57',
  accent: '#E07A5F',
  neutral: '#F4F1DE',
  gold: '#F2CC8F',
  white: '#FFFFFF',
  text: '#2d3436',
  gray: '#b2bec3',
  success: '#2ecc71',
  danger: '#e74c3c'
};

export const MY_PROFILE = {
  name: "Alex",
  age: 29,
  job: "Product Manager",
  location: "London, UK",
  bio: "I organize my life in spreadsheets, looking for someone to add some chaos.",
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800',
  stats: { trips: 4, countries: 12, style: "Luxury Planner" }
};

// People you have matched with but haven't booked a trip yet
export const MATCHES_LIST = [
  {
    id: 1,
    name: "Sarah",
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f107f5b8?q=80&w=200',
    lastActive: "2h ago",
    status: "new" // new match
  },
  {
    id: 3,
    name: "Marcus",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
    lastActive: "1d ago",
    status: "planning" // currently voting on trips
  }
];

// Your booked or pending trips
export const MY_TRIPS = [
  {
    id: 'trip_101',
    title: "Lake District Glamping",
    partnerName: "Marcus",
    partnerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
    status: "pending_payment", // Waiting for payment
    date: "Pending",
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600',
    price: 450
  },
  {
    id: 'trip_102',
    title: "Secret Supper & Kayak",
    partnerName: "Elena",
    partnerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    status: "confirmed", // Booked
    date: "Sat, 12 Aug",
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600',
    price: 120
  }
];

// ... (Keep PROFILES, TRIPS, MATRIX_CATEGORIES, SIGNALS as they were)
export const PROFILES = [
  {
    id: 1,
    name: "Sarah",
    age: 26,
    job: "Graphic Designer",
    location: "London, UK",
    bio: "Looking for my co-pilot.",
    videoThumbnails: [{ id: 'v1', title: 'My Happy Place', color: '#81ecec' }],
    travelStyle: ["Planner 🗓️", "Luxury ✨"],
    antiList: ["Cat allergies"],
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f107f5b8?q=80&w=800',
  },
  {
    id: 2,
    name: "Elena",
    age: 28,
    job: "Architect",
    location: "London, UK",
    bio: "Obsessed with hidden cafes.",
    videoThumbnails: [{ id: 'v1', title: 'My Happy Place', color: '#fab1a0' }],
    travelStyle: ["Spontaneous 🎲", "Night Owl 🦉"],
    antiList: ["Fear of heights"],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800',
  }
];

export const TRIPS = [
  {
    id: 't1',
    tierCode: 1,
    tier: 'TIER 1: LOCAL (£50-150)',
    price: 120,
    title: 'Secret Supper & Kayak',
    desc: 'Underground dining followed by a dawn paddle.',
    location: 'Shoreditch',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600'
  },
  {
    id: 't2',
    tierCode: 2,
    tier: 'TIER 2: NATIONAL (£200-800)',
    price: 450,
    title: 'Lake District Glamping',
    desc: 'Boutique yurt stay with wild swimming.',
    location: 'Cumbria',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600'
  },
  {
    id: 't3',
    tierCode: 3,
    tier: 'TIER 3: INTERNATIONAL',
    price: 1400,
    title: 'Barcelona Design Hunt',
    desc: 'Architecture deep-dive.',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600'
  }
];

export const MATRIX_CATEGORIES = [
  { title: "Activities", items: ["Hiking", "Skydiving"] },
  { title: "Vibes", items: ["City", "Beach"] }
];

export const SIGNALS = ["I'd stretch my budget 💸", "Let's start small 🌱"];