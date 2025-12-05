// src/data/mockData.js - Enhanced Version

export const THEME = {
  deepExpedition: '#1B3A57',
  sunsetCoral: '#E07A5F',
  trailDust: '#F4F1DE',
  horizonGold: '#F2CC8F',
  white: '#FFFFFF',
  black: '#000000',
  success: '#2ecc71',
  danger: '#e74c3c',
  warning: '#f39c12',
  gray: {
    100: '#f7fafc',
    200: '#edf2f7',
    300: '#e2e8f0',
    400: '#cbd5e0',
    500: '#a0aec0',
    600: '#718096',
    700: '#4a5568',
    800: '#2d3748',
    900: '#1a202c'
  }
};

export const MY_PROFILE = {
  name: "Alex",
  age: 29,
  job: "Product Manager",
  location: "London, UK",
  bio: "I organize my life in spreadsheets, looking for someone to add some chaos.",
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800',
  videos: [
    { id: 'v1', title: 'My Happy Place', thumbnail: '#74b9ff', duration: '0:52' },
    { id: 'v2', title: 'Next Adventure', thumbnail: '#a29bfe', duration: '0:45' },
    { id: 'v3', title: 'Travel Style', thumbnail: '#fd79a8', duration: '0:38' }
  ],
  travelStyle: {
    planning: "Planner",
    accommodation: "Luxury",
    pace: "Early Riser",
    budget: "Flexible"
  },
  experienceMatrix: {
    loved: ["Hiking", "Italian Cuisine", "City Exploration", "Photography"],
    wantToTry: ["Paragliding", "Cooking Classes", "Road Trips"],
    notForMe: ["Cruise Ships", "All-Inclusive Resorts", "Group Tours"]
  },
  antiList: ["Smoking", "No seafood"],
  availability: "Most weekends",
  stats: { 
    trips: 4, 
    countries: 12, 
    style: "Luxury Planner",
    vouchScore: 4.7,
    verifiedID: true
  },
  favouritePlaces: [
    { name: "Santorini", country: "Greece", note: "Best sunset ever" },
    { name: "Kyoto", country: "Japan", note: "Temple heaven" },
    { name: "Iceland", country: "Iceland", note: "Northern lights magic" }
  ]
};

export const PROFILES = [
  {
    id: 1,
    name: "Sarah",
    age: 26,
    job: "Graphic Designer",
    location: "London, UK",
    bio: "Looking for someone to share spontaneous adventures and hidden gems with. Love exploring new cuisines and getting lost in new cities.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800',
    videos: [
      { id: 'v1', title: 'My Happy Place', thumbnail: '#81ecec', duration: '0:45' },
      { id: 'v2', title: 'Next Adventure', thumbnail: '#fab1a0', duration: '0:52' },
      { id: 'v3', title: 'Travel Style', thumbnail: '#a29bfe', duration: '0:38' }
    ],
    travelStyle: {
      planning: "Spontaneous",
      accommodation: "Boutique",
      pace: "Night Owl",
      budget: "Mid-range"
    },
    experienceMatrix: {
      loved: ["Scuba Diving", "Thai Cuisine", "City Exploration", "Wine Tasting"],
      wantToTry: ["Skydiving", "Glamping", "Road Trips", "Cooking Classes"],
      notForMe: ["Cruise Ships", "Group Tours", "Extreme Cold"]
    },
    antiList: ["Cat allergies", "Smoking"],
    availability: "Weekends & August",
    vouchScore: 4.8,
    verifiedID: true,
    favouritePlaces: [
      { name: "Barcelona", country: "Spain", note: "Architecture dreams" },
      { name: "Bali", country: "Indonesia", note: "Soul food" }
    ],
    compatibilityScore: 87
  },
  {
    id: 2,
    name: "Elena",
    age: 28,
    job: "Architect",
    location: "London, UK",
    bio: "Obsessed with hidden cafes and brutalist buildings. Always planning the next escape.",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800',
    videos: [
      { id: 'v1', title: 'My Happy Place', thumbnail: '#fab1a0', duration: '0:50' },
      { id: 'v2', title: 'Next Adventure', thumbnail: '#55efc4', duration: '0:43' }
    ],
    travelStyle: {
      planning: "Planner",
      accommodation: "Design Hotels",
      pace: "Early Riser",
      budget: "Premium"
    },
    experienceMatrix: {
      loved: ["Architecture Tours", "Fine Dining", "Beach Resorts", "Photography"],
      wantToTry: ["Hot Air Balloon", "Glamping", "Wine Tours"],
      notForMe: ["Hostels", "Party Destinations"]
    },
    antiList: ["Fear of heights"],
    availability: "Most weekends",
    vouchScore: 4.9,
    verifiedID: true,
    favouritePlaces: [
      { name: "Copenhagen", country: "Denmark", note: "Design paradise" },
      { name: "Tokyo", country: "Japan", note: "Endless inspiration" }
    ],
    compatibilityScore: 92
  },
  {
    id: 3,
    name: "Marcus",
    age: 29,
    job: "Software Engineer",
    location: "London, UK",
    bio: "Adventure seeker with a love for spontaneous weekend escapes. Let's get lost together.",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800',
    videos: [
      { id: 'v1', title: 'My Happy Place', thumbnail: '#55efc4', duration: '0:55' },
      { id: 'v2', title: 'Next Adventure', thumbnail: '#fd79a8', duration: '0:48' },
      { id: 'v3', title: 'Travel Style', thumbnail: '#74b9ff', duration: '0:41' }
    ],
    travelStyle: {
      planning: "Flexible",
      accommodation: "Varied",
      pace: "Balanced",
      budget: "Flexible"
    },
    experienceMatrix: {
      loved: ["Hiking", "Mexican Food", "Road Trips", "Camping"],
      wantToTry: ["Bungee Jumping", "Ethiopian Cuisine", "Sailing"],
      notForMe: ["Extreme Cold", "Super Luxury"]
    },
    antiList: ["Seafood allergy"],
    availability: "Flexible",
    vouchScore: 4.7,
    verifiedID: true,
    favouritePlaces: [
      { name: "Patagonia", country: "Chile", note: "Epic landscapes" },
      { name: "Iceland", country: "Iceland", note: "Raw nature" }
    ],
    compatibilityScore: 85
  }
];

export const TRIP_TIERS = [
  {
    id: 'tier1',
    tier: 'TIER 1: LOCAL',
    subtitle: 'First Date, Elevated',
    priceRange: '£50-150',
    duration: '4-8 hours',
    commitment: 'Same day or next-day',
    icon: '☕',
    color: THEME.success,
    trips: [
      {
        id: 't1a',
        title: 'Secret Supper & Kayak',
        description: 'Underground dining in Shoreditch followed by a dawn paddle on the Thames. Experience London\'s hidden food scene before the city wakes.',
        price: 120,
        location: 'Shoreditch & Thames',
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600',
        highlights: ['Underground supper club', 'Sunrise kayaking', 'Local food guide', 'Equipment included'],
        meetingPoint: 'Under the clock at Liverpool Street Station, 10pm',
        includes: ['Dinner', 'Kayak rental', 'Guide', 'Photos'],
        itinerary: [
          { time: '10:00 PM', activity: 'Meet at Liverpool Street' },
          { time: '10:30 PM', activity: 'Secret supper club experience' },
          { time: '12:30 AM', activity: 'Walk to Thames' },
          { time: '1:00 AM', activity: 'Sunrise kayaking session' },
          { time: '3:00 AM', activity: 'Breakfast at 24hr café' }
        ]
      },
      {
        id: 't1b',
        title: 'Hidden Bar Crawl',
        description: 'Discover London\'s secret speakeasies with a cocktail historian. Learn passwords, find hidden doors, taste prohibition-era drinks.',
        price: 85,
        location: 'Soho & Mayfair',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600',
        highlights: ['4 hidden bars', 'Cocktail history', 'Secret passwords', 'Complimentary drinks'],
        meetingPoint: 'Outside Liberty London, 7pm',
        includes: ['4 cocktails', 'Historian guide', 'Bar snacks'],
        itinerary: [
          { time: '7:00 PM', activity: 'Meet at Liberty' },
          { time: '7:15 PM', activity: 'First speakeasy' },
          { time: '8:00 PM', activity: 'Hidden cocktail lab' },
          { time: '9:00 PM', activity: 'Secret basement bar' },
          { time: '10:00 PM', activity: 'Final rooftop speakeasy' }
        ]
      },
      {
        id: 't1c',
        title: 'Private Museum After Dark',
        description: 'Exclusive after-hours access to a major London museum with a curator-led tour and champagne reception.',
        price: 145,
        location: 'Central London',
        image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=600',
        highlights: ['After-hours access', 'Curator tour', 'Champagne', 'Empty galleries'],
        meetingPoint: 'Museum main entrance, 8pm',
        includes: ['Private tour', 'Drinks', 'Light bites'],
        itinerary: [
          { time: '8:00 PM', activity: 'Private entrance' },
          { time: '8:15 PM', activity: 'Champagne reception' },
          { time: '8:45 PM', activity: 'Curator-led tour' },
          { time: '10:00 PM', activity: 'Private gallery time' }
        ]
      }
    ]
  },
  {
    id: 'tier2',
    tier: 'TIER 2: NATIONAL',
    subtitle: 'Weekend Wanderers',
    priceRange: '£200-800',
    duration: '2-3 days',
    commitment: 'Weekend commitment',
    icon: '🏕️',
    color: THEME.warning,
    trips: [
      {
        id: 't2a',
        title: 'Lake District Glamping',
        description: 'Boutique yurt stay with wild swimming, private chef dinner, and stargazing. Luxury meets wilderness in England\'s most beautiful national park.',
        price: 450,
        location: 'Lake District, Cumbria',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600',
        highlights: ['Luxury yurt accommodation', 'Wild swimming', 'Private chef dinner', 'Stargazing session'],
        meetingPoint: 'Oxenholme Lake District Station, Platform 1, 2pm Saturday',
        includes: ['2 nights accommodation', 'All meals', 'Activities', 'Transport from station'],
        itinerary: [
          { time: 'Sat 2:00 PM', activity: 'Meet at station, transfer to site' },
          { time: 'Sat 4:00 PM', activity: 'Settle into yurt, afternoon tea' },
          { time: 'Sat 6:00 PM', activity: 'Wild swimming in secret tarn' },
          { time: 'Sat 8:00 PM', activity: 'Private chef dinner' },
          { time: 'Sat 10:00 PM', activity: 'Guided stargazing' },
          { time: 'Sun 9:00 AM', activity: 'Sunrise hike & breakfast' },
          { time: 'Sun 12:00 PM', activity: 'Free time: kayaking or relaxing' },
          { time: 'Sun 6:00 PM', activity: 'Evening campfire' },
          { time: 'Mon 11:00 AM', activity: 'Check out, return to station' }
        ]
      },
      {
        id: 't2b',
        title: 'Edinburgh Ghost Weekend',
        description: 'Historic Edinburgh with exclusive after-hours castle tour, underground vaults, and whisky tasting. Stay in a boutique Georgian townhouse.',
        price: 380,
        location: 'Edinburgh, Scotland',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=600',
        highlights: ['Private castle tour', 'Underground vaults', 'Whisky masterclass', 'Ghost stories'],
        meetingPoint: 'Waverley Station Clock, 6pm Friday',
        includes: ['2 nights boutique hotel', 'Tours', 'Whisky tasting', 'Breakfast'],
        itinerary: [
          { time: 'Fri 6:00 PM', activity: 'Meet at Waverley, check into hotel' },
          { time: 'Fri 8:00 PM', activity: 'Underground vaults ghost tour' },
          { time: 'Fri 10:00 PM', activity: 'Late-night whisky bar' },
          { time: 'Sat 10:00 AM', activity: 'Private castle tour' },
          { time: 'Sat 2:00 PM', activity: 'Lunch in Old Town' },
          { time: 'Sat 4:00 PM', activity: 'Whisky masterclass' },
          { time: 'Sat 7:00 PM', activity: 'Traditional Scottish dinner' },
          { time: 'Sun 10:00 AM', activity: 'Arthur\'s Seat sunrise hike' },
          { time: 'Sun 2:00 PM', activity: 'Free time & departure' }
        ]
      },
      {
        id: 't2c',
        title: 'Cornwall Coastal Adventure',
        description: 'Surfing lessons, coastal foraging, clifftop yoga, and fresh seafood. Stay in a converted lighthouse with ocean views.',
        price: 520,
        location: 'Cornwall',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=600',
        highlights: ['Surf lessons', 'Foraging experience', 'Lighthouse stay', 'Fresh seafood'],
        meetingPoint: 'Newquay Station, 3pm Saturday',
        includes: ['2 nights accommodation', 'Surf equipment', 'All activities', 'Meals'],
        itinerary: [
          { time: 'Sat 3:00 PM', activity: 'Station pickup, lighthouse check-in' },
          { time: 'Sat 5:00 PM', activity: 'Sunset surf lesson' },
          { time: 'Sat 8:00 PM', activity: 'Fresh seafood dinner' },
          { time: 'Sun 8:00 AM', activity: 'Clifftop yoga' },
          { time: 'Sun 10:00 AM', activity: 'Coastal foraging walk' },
          { time: 'Sun 1:00 PM', activity: 'Cook your foraged lunch' },
          { time: 'Sun 4:00 PM', activity: 'Beach bonfire' },
          { time: 'Mon 10:00 AM', activity: 'Final surf & departure' }
        ]
      }
    ]
  },
  {
    id: 'tier3',
    tier: 'TIER 3: INTERNATIONAL',
    subtitle: 'Passport Required',
    priceRange: '£800-2,000',
    duration: '4-7 days',
    commitment: 'Requires annual leave',
    icon: '✈️',
    color: THEME.sunsetCoral,
    trips: [
      {
        id: 't3a',
        title: 'Barcelona Design Hunt',
        description: 'Architecture deep-dive with exclusive Gaudí access, tapas trails with a local chef, and rooftop flamenco. Stay in a modernist apartment.',
        price: 1400,
        location: 'Barcelona, Spain',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=600',
        highlights: ['Private Sagrada tour', 'Architecture guide', 'Tapas masterclass', 'Flamenco show'],
        meetingPoint: 'Barcelona-El Prat Airport, Terminal 1 Arrivals, 2pm Thursday',
        includes: ['Flights', '4 nights apartment', 'All tours', 'Most meals', 'Local transport'],
        itinerary: [
          { time: 'Thu 2:00 PM', activity: 'Airport meet, transfer to apartment' },
          { time: 'Thu 6:00 PM', activity: 'Welcome tapas tour' },
          { time: 'Fri 9:00 AM', activity: 'Private Sagrada Familia tour' },
          { time: 'Fri 2:00 PM', activity: 'Park Güell exploration' },
          { time: 'Fri 7:00 PM', activity: 'Rooftop flamenco dinner' },
          { time: 'Sat 10:00 AM', activity: 'Gothic Quarter architecture walk' },
          { time: 'Sat 3:00 PM', activity: 'Tapas cooking class' },
          { time: 'Sat 8:00 PM', activity: 'Beach club experience' },
          { time: 'Sun 9:00 AM', activity: 'Montjuïc & MNAC' },
          { time: 'Sun 2:00 PM', activity: 'Free afternoon' },
          { time: 'Sun 7:00 PM', activity: 'Farewell dinner' },
          { time: 'Mon 11:00 AM', activity: 'Airport transfer & departure' }
        ]
      },
      {
        id: 't3b',
        title: 'Iceland Northern Lights',
        description: 'Chase the Aurora Borealis, bathe in secret hot springs, explore ice caves, and stay in a glass-roofed cabin under the stars.',
        price: 1650,
        location: 'Iceland',
        image: 'https://images.unsplash.com/photo-1583211891894-42a6f0cfd4f8?q=80&w=600',
        highlights: ['Northern lights hunt', 'Ice cave tour', 'Secret hot springs', 'Glass cabin'],
        meetingPoint: 'Keflavík Airport, International Arrivals, 4pm Wednesday',
        includes: ['Flights', '5 nights accommodation', 'All tours', '4WD rental', 'Breakfasts'],
        itinerary: [
          { time: 'Wed 4:00 PM', activity: 'Airport meet, collect 4WD' },
          { time: 'Wed 7:00 PM', activity: 'Glass cabin check-in' },
          { time: 'Wed 10:00 PM', activity: 'First northern lights watch' },
          { time: 'Thu 10:00 AM', activity: 'Golden Circle tour' },
          { time: 'Thu 4:00 PM', activity: 'Secret hot spring' },
          { time: 'Fri 9:00 AM', activity: 'Ice cave exploration' },
          { time: 'Fri 8:00 PM', activity: 'Aurora photography session' },
          { time: 'Sat 11:00 AM', activity: 'Glacier hike' },
          { time: 'Sat 6:00 PM', activity: 'Viking feast' },
          { time: 'Sun Free day', activity: 'Choose your own adventure' },
          { time: 'Mon 2:00 PM', activity: 'Blue Lagoon & airport' }
        ]
      }
    ]
  },
  {
    id: 'tier4',
    tier: 'TIER 4: EXOTIC',
    subtitle: 'Once in a Lifetime',
    priceRange: '£2,000-4,000',
    duration: '7-14 days',
    commitment: 'Serious commitment',
    icon: '🌍',
    color: THEME.deepExpedition,
    trips: [
      {
        id: 't4a',
        title: 'Japanese Cherry Blossom',
        description: 'Tokyo to Kyoto during sakura season. Private tea ceremony, exclusive temple access, kaiseki dinners, ryokan stays, and Mount Fuji views.',
        price: 3200,
        location: 'Japan',
        image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=600',
        highlights: ['Sakura season', 'Private tea ceremony', 'Ryokan stays', 'Temple access'],
        meetingPoint: 'Tokyo Narita Airport, ANA Lounge, 10am Saturday',
        includes: ['Business class flights', '10 nights luxury accommodation', 'JR Pass', 'All experiences', 'Most meals', 'Personal guide'],
        itinerary: [
          { time: 'Sat 10:00 AM', activity: 'Airport meet in lounge' },
          { time: 'Sat 2:00 PM', activity: 'Tokyo hotel check-in' },
          { time: 'Sat 6:00 PM', activity: 'Welcome kaiseki dinner' },
          { time: 'Sun', activity: 'Tokyo: Senso-ji, Shibuya, teamLab' },
          { time: 'Mon', activity: 'Private tea ceremony, Imperial Palace gardens' },
          { time: 'Tue', activity: 'Day trip to Mount Fuji & Hakone' },
          { time: 'Wed', activity: 'Bullet train to Kyoto' },
          { time: 'Thu', activity: 'Fushimi Inari, Arashiyama bamboo' },
          { time: 'Fri', activity: 'Private temple tours, geisha district' },
          { time: 'Sat', activity: 'Traditional ryokan in countryside' },
          { time: 'Sun', activity: 'Nara deer park, Todai-ji temple' },
          { time: 'Mon', activity: 'Free day in Kyoto' },
          { time: 'Tue', activity: 'Return to Tokyo, farewell dinner' },
          { time: 'Wed', activity: 'Morning at leisure, airport transfer' }
        ]
      },
      {
        id: 't4b',
        title: 'Patagonia Expedition',
        description: 'Trek through Torres del Paine, kayak with glaciers, stay in eco-lodges, spot pumas, and witness the raw power of nature at the end of the world.',
        price: 3800,
        location: 'Patagonia, Chile & Argentina',
        image: 'https://images.unsplash.com/photo-1452827073306-6e6e661baf57?q=80&w=600',
        highlights: ['Torres del Paine trek', 'Glacier kayaking', 'Wildlife tracking', 'Eco-lodges'],
        meetingPoint: 'Santiago Airport, International Terminal, 8am Sunday',
        includes: ['All flights', '12 nights accommodation', 'Expert guides', 'All activities', 'All meals'],
        itinerary: [
          { time: 'Sun', activity: 'Meet in Santiago, flight to Punta Arenas' },
          { time: 'Mon-Wed', activity: 'Torres del Paine multi-day trek' },
          { time: 'Thu', activity: 'Glacier kayaking experience' },
          { time: 'Fri', activity: 'Wildlife tracking (pumas, guanacos)' },
          { time: 'Sat', activity: 'Cross to Argentina, El Calafate' },
          { time: 'Sun', activity: 'Perito Moreno glacier' },
          { time: 'Mon', activity: 'El Chaltén hiking' },
          { time: 'Tue-Wed', activity: 'Fitz Roy trek' },
          { time: 'Thu', activity: 'Return journey begins' },
          { time: 'Fri', activity: 'Final night in Santiago' },
          { time: 'Sat', activity: 'Departure' }
        ]
      }
    ]
  }
];

export const MATCHES_LIST = [
  {
    id: 1,
    name: "Sarah",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    lastActive: "2h ago",
    status: "new",
    matchedAt: "Today",
    compatibilityScore: 87,
    sharedInterests: ["City Exploration", "Thai Cuisine", "Spontaneous Travel"]
  },
  {
    id: 3,
    name: "Marcus",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
    lastActive: "1d ago",
    status: "planning",
    matchedAt: "3 days ago",
    compatibilityScore: 85,
    sharedInterests: ["Hiking", "Adventure", "Flexible Budget"]
  }
];

export const MY_TRIPS = [
  {
    id: 'trip_101',
    title: "Lake District Glamping",
    partnerName: "Marcus",
    partnerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
    status: "pending_payment",
    date: "Pending",
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600',
    price: 450,
    location: "Lake District, Cumbria",
    tier: "TIER 2: NATIONAL",
    meetingPoint: "Oxenholme Lake District Station, Platform 1"
  },
  {
    id: 'trip_102',
    title: "Secret Supper & Kayak",
    partnerName: "Elena",
    partnerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    status: "confirmed",
    date: "Sat, 12 Aug",
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600',
    price: 120,
    location: "Shoreditch & Thames",
    tier: "TIER 1: LOCAL",
    meetingPoint: "Liverpool Street Station Clock"
  }
];

export const SIGNALS = [
  "I'd stretch my budget 💸",
  "Let's start small 🌱",
  "I'm flexible on dates 📅",
  "This looks perfect ✨",
  "Open to alternatives 🔄",
  "Budget is firm 💰",
  "Need more time to decide ⏳",
  "Super excited about this! 🎉"
];

export const MATRIX_CATEGORIES = [
  { 
    title: "Adventure Activities", 
    items: ["Hiking", "Scuba Diving", "Skydiving", "Bungee Jumping", "Rock Climbing", "Surfing", "Skiing", "Paragliding"]
  },
  { 
    title: "Cuisines", 
    items: ["Italian", "Thai", "Mexican", "Japanese", "Indian", "Ethiopian", "Fine Dining", "Street Food"]
  },
  { 
    title: "Accommodation", 
    items: ["Boutique Hotels", "Hostels", "Glamping", "Luxury Resorts", "Airbnb", "Camping", "Ryokans", "Cruise Ships"]
  },
  { 
    title: "Trip Vibes", 
    items: ["City Exploration", "Beach Resorts", "Road Trips", "Group Tours", "Cultural Immersion", "Party Scene", "Wellness Retreats", "Wildlife Safari"]
  },
  {
    title: "Pace & Style",
    items: ["Early Riser", "Night Owl", "Spontaneous", "Planner", "Fast-paced", "Relaxed", "Solo Time Needed", "Always Together"]
  }
];