// src/data/mockData.js

export const PROFILES = [
  {
    id: 1,
    name: "Sarah",
    age: 26,
    job: "Graphic Designer",
    location: "London, UK",
    bio: "My Happy Place: Sunrise in Kyoto 🇯🇵",
    tags: ["Backpacker", "Early Riser", "Foodie"],
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f107f5b8?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: "Elena",
    age: 28,
    job: "Architect",
    location: "London, UK",
    bio: "Obsessed with hidden cafes.",
    tags: ["City Breaker", "Night Owl", "Art"],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  }
];

export const TRIPS = [
  {
    id: 't1',
    tier: 'TIER 1: LOCAL',
    price: 150,
    title: 'Underground Supper Club',
    desc: 'A curated 4-hour experience in Shoreditch with sunrise kayaking.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600'
  },
  {
    id: 't2',
    tier: 'TIER 2: NATIONAL',
    price: 450,
    title: 'Lake District Glamping',
    desc: 'Weekend wanderers. Boutique stay with wild swimming itinerary.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600'
  },
  {
    id: 't3',
    tier: 'TIER 3: INTERNATIONAL',
    price: 1200,
    title: 'Barcelona Architecture Hunt',
    desc: 'Deep dive into Gaudí with a private guide and rooftop tapas.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600'
  }
];

export const MATRIX_ITEMS = [
  "Skydiving", "Fine Dining", "Hostels", "Hiking", "Museums", "Clubbing"
];