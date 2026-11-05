/**
 * FYVOY TRIP PLANNER: holiday and visit ideas for Nigerian travellers.
 *
 * Fyvoy asks 5 friendly questions (who, vibe, region, budget, visa) and suggests
 * the 3 destinations that fit best, with cities, things to do and the best time to go.
 * It includes places outside our main visa list (Mauritius, Seychelles, Zanzibar...)
 * because the goal is to give genuinely useful ideas. We can still sell flights, hotels
 * and planning for them.
 *
 * Entry rules for Nigerian passports change often, so every reply tells the visitor
 * that an advisor confirms the current rule before they book. Review this list every
 * few months.
 *
 *   region:  africa | europe | asia | americas
 *   vibes:   beach | city | nature | culture | fun   (fun = nightlife, shopping, theme parks)
 *   who:     solo | couple | family | group | business
 *   budget:  low (under ₦2m per person incl. flights) | mid (₦2m–₦5m) | high (over ₦5m)
 *   visa:    free | easy | evisa | embassy | check
 *   boost:   true if a valid UK / US / Schengen visa makes entry easier
 *   service: true if Fyzzo handles this country's visa end to end (UK)
 */
const FYVOY_TRIPS = {
    ghana: {
        name: '🇬🇭 Ghana', region: 'africa', vibes: ['culture', 'beach', 'fun', 'city'], who: ['solo', 'couple', 'family', 'group', 'business'], budget: ['low', 'mid', 'high'],
        visa: 'free', visaText: 'No visa needed: ECOWAS citizens can stay up to 90 days.',
        cities: 'Accra, Cape Coast, Kumasi',
        highlights: 'Cape Coast and Elmina castles, the Kakum canopy walk, Labadi beach, and Accra\'s food and nightlife',
        best: 'November to March (dry season), and December for "Detty December"',
        keywords: ['ghana', 'accra', 'cape coast', 'kumasi']
    },
    caboverde: {
        name: '🇨🇻 Cabo Verde', region: 'africa', vibes: ['beach', 'culture'], who: ['couple', 'family', 'group', 'solo'], budget: ['mid', 'high'],
        visa: 'free', visaText: 'No visa for ECOWAS citizens. Check the online pre-registration rule before you fly.',
        cities: 'Sal (Santa Maria), Boa Vista, Praia, Mindelo',
        highlights: 'white-sand beaches, turtle watching, live morna music, and kitesurfing on Sal',
        best: 'October to June',
        keywords: ['cabo verde', 'cape verde', 'sal island', 'boa vista', 'praia']
    },
    senegal: {
        name: '🇸🇳 Senegal', region: 'africa', vibes: ['culture', 'beach', 'city'], who: ['solo', 'couple', 'group', 'family'], budget: ['low', 'mid'],
        visa: 'free', visaText: 'No visa needed for ECOWAS citizens.',
        cities: 'Dakar, Saly, Saint-Louis',
        highlights: 'Gorée Island, the Pink Lake (Lac Rose), Saly\'s beach resorts, and Dakar\'s music and art scene',
        best: 'November to May',
        keywords: ['senegal', 'dakar', 'saly', 'goree']
    },
    gambia: {
        name: '🇬🇲 The Gambia', region: 'africa', vibes: ['beach', 'nature', 'culture'], who: ['couple', 'family', 'solo'], budget: ['low', 'mid'],
        visa: 'free', visaText: 'No visa needed for ECOWAS citizens.',
        cities: 'Banjul, Kololi (the Senegambia Strip), along the River Gambia',
        highlights: 'quiet Atlantic beaches, river cruises, birdwatching, and Kunta Kinteh Island',
        best: 'November to May',
        keywords: ['gambia', 'banjul', 'kololi']
    },
    ivorycoast: {
        name: '🇨🇮 Côte d\'Ivoire', region: 'africa', vibes: ['city', 'beach', 'fun'], who: ['solo', 'couple', 'group', 'business'], budget: ['low', 'mid'],
        visa: 'free', visaText: 'No visa needed for ECOWAS citizens.',
        cities: 'Abidjan, Grand-Bassam, Assinie',
        highlights: 'Abidjan\'s lagoon city and nightlife, the colonial town of Grand-Bassam, Assinie\'s beach resorts, and the Yamoussoukro basilica',
        best: 'December to March',
        keywords: ['ivory coast', 'cote divoire', 'abidjan', 'assinie']
    },
    rwanda: {
        name: '🇷🇼 Rwanda', region: 'africa', vibes: ['nature', 'culture', 'city'], who: ['couple', 'solo', 'family', 'business'], budget: ['mid', 'high'],
        visa: 'easy', visaText: 'Very easy: Rwanda welcomes African travellers without a visa application in advance.',
        cities: 'Kigali, Musanze (Volcanoes National Park), Lake Kivu',
        highlights: 'gorilla trekking, clean and safe Kigali, Lake Kivu beaches, and the Nyungwe forest canopy walk',
        best: 'June to September, and December to February',
        keywords: ['rwanda', 'kigali', 'gorilla']
    },
    kenya: {
        name: '🇰🇪 Kenya', region: 'africa', vibes: ['nature', 'beach', 'city'], who: ['couple', 'family', 'group', 'solo'], budget: ['mid', 'high'],
        visa: 'easy', visaText: 'Easy entry for most Africans. Kenya\'s online travel authorisation rules change, so we confirm before you fly.',
        cities: 'Nairobi, Maasai Mara, Diani Beach, Mombasa',
        highlights: 'Big Five safaris and the Great Migration in the Maasai Mara, Diani\'s beaches, and the Giraffe Centre in Nairobi',
        best: 'July to October (migration season), and January to February',
        keywords: ['kenya', 'nairobi', 'maasai mara', 'masai mara', 'mombasa', 'diani']
    },
    zanzibar: {
        name: '🇹🇿 Zanzibar & Tanzania', region: 'africa', vibes: ['beach', 'nature', 'culture'], who: ['couple', 'family', 'group'], budget: ['mid', 'high'],
        visa: 'evisa', visaText: 'Visa needed, but you can apply online with Tanzania\'s e-visa.',
        cities: 'Stone Town, Nungwi, Paje, the Serengeti',
        highlights: 'turquoise beaches, spice tours, Stone Town\'s old streets, and safaris in the Serengeti and Ngorongoro',
        best: 'June to October, and December to February',
        keywords: ['zanzibar', 'tanzania', 'serengeti', 'kilimanjaro', 'dar es salaam']
    },
    mauritius: {
        name: '🇲🇺 Mauritius', region: 'africa', vibes: ['beach', 'nature'], who: ['couple', 'family'], budget: ['mid', 'high'],
        visa: 'check', visaText: 'Entry rules for Nigerian passports change, so we confirm the current requirement before you book.',
        cities: 'Grand Baie, Le Morne, Flic en Flac, Port Louis',
        highlights: 'one of the best honeymoon islands in the world, with lagoon beaches, Île aux Cerfs, the Chamarel seven-coloured earth, and catamaran trips',
        best: 'May to December',
        keywords: ['mauritius', 'mauritus', 'muritious', 'grand baie', 'port louis']
    },
    seychelles: {
        name: '🇸🇨 Seychelles', region: 'africa', vibes: ['beach', 'nature'], who: ['couple', 'family'], budget: ['high'],
        visa: 'free', visaText: 'No visa for any nationality. Apply for the online Travel Authorisation before you fly.',
        cities: 'Mahé, Praslin, La Digue',
        highlights: 'some of the world\'s most beautiful beaches (Anse Source d\'Argent), island hopping, snorkelling, and giant tortoises',
        best: 'April to May, and October to November',
        keywords: ['seychelles', 'mahe', 'praslin', 'la digue']
    },
    southafrica: {
        name: '🇿🇦 South Africa', region: 'africa', vibes: ['city', 'nature', 'fun', 'culture', 'beach'], who: ['couple', 'family', 'group', 'business', 'solo'], budget: ['mid', 'high'],
        visa: 'embassy', visaText: 'Visa needed through the embassy or visa centre. Start early, and we can prepare the application.',
        cities: 'Cape Town, Johannesburg, Durban, Kruger National Park',
        highlights: 'Table Mountain, the Cape Winelands, penguins at Boulders Beach, Kruger safaris, and shopping in Sandton',
        best: 'October to April for Cape Town; May to September for safaris',
        keywords: ['south africa', 'cape town', 'johannesburg', 'joburg', 'durban', 'kruger']
    },
    morocco: {
        name: '🇲🇦 Morocco', region: 'africa', vibes: ['culture', 'city', 'fun'], who: ['couple', 'group', 'solo'], budget: ['mid'],
        visa: 'check', visaText: 'Visa needed in advance. We check the quickest option for your passport (an online route may be available).',
        cities: 'Marrakech, Fes, Chefchaouen, Casablanca',
        highlights: 'Marrakech\'s souks and riads, a night in the Sahara desert, the blue city of Chefchaouen, and the Hassan II Mosque',
        best: 'March to May, and September to November',
        keywords: ['morocco', 'marrakech', 'marrakesh', 'casablanca', 'fes', 'chefchaouen']
    },
    egypt: {
        name: '🇪🇬 Egypt', region: 'africa', vibes: ['culture', 'beach'], who: ['family', 'couple', 'group', 'solo'], budget: ['mid'],
        visa: 'embassy', visaText: 'Visa needed in advance through the embassy.',
        cities: 'Cairo, Luxor, Aswan, Sharm El Sheikh',
        highlights: 'the Pyramids of Giza, Nile cruises, Luxor\'s temples, and Red Sea diving',
        best: 'October to April',
        keywords: ['egypt', 'cairo', 'pyramids', 'luxor', 'sharm']
    },
    dubai: {
        name: '🇦🇪 Dubai, UAE', region: 'asia', vibes: ['city', 'fun', 'beach'], who: ['family', 'couple', 'group', 'business', 'solo'], budget: ['mid', 'high'],
        visa: 'evisa', visaText: 'Visa needed, arranged online through an airline, hotel or agent. Rules for Nigerians are strict and change often, so we check the latest conditions.',
        cities: 'Dubai, Abu Dhabi',
        highlights: 'the Burj Khalifa, desert safaris, Dubai Mall and the gold souk, Ferrari World and theme parks, and beach clubs',
        best: 'November to March (summer is very hot)',
        keywords: ['dubai', 'uae', 'abu dhabi', 'emirates']
    },
    turkey: {
        name: '🇹🇷 Türkiye (Turkey)', region: 'europe', vibes: ['culture', 'city', 'beach', 'fun'], who: ['couple', 'family', 'group', 'solo'], budget: ['mid'], boost: true,
        visa: 'embassy', visaText: 'Visa needed. If you hold a valid UK, US, Schengen or Irish visa, you may qualify for a quick e-visa instead.',
        cities: 'Istanbul, Cappadocia, Antalya',
        highlights: 'hot-air balloons over Cappadocia, Istanbul\'s Grand Bazaar and Bosphorus cruise, and the Antalya coast',
        best: 'April to June, and September to October',
        keywords: ['turkey', 'turkiye', 'istanbul', 'cappadocia', 'antalya']
    },
    maldives: {
        name: '🇲🇻 Maldives', region: 'asia', vibes: ['beach'], who: ['couple'], budget: ['high'],
        visa: 'free', visaText: 'Free visa on arrival for all nationalities (you need a confirmed resort booking).',
        cities: 'Malé, the resort atolls',
        highlights: 'overwater villas, snorkelling with manta rays, and the ultimate honeymoon',
        best: 'November to April',
        keywords: ['maldives', 'male atoll']
    },
    thailand: {
        name: '🇹🇭 Thailand', region: 'asia', vibes: ['beach', 'city', 'culture', 'fun'], who: ['couple', 'group', 'solo'], budget: ['mid'],
        visa: 'evisa', visaText: 'Visa needed. Apply online with Thailand\'s e-visa.',
        cities: 'Bangkok, Phuket, Krabi, Chiang Mai',
        highlights: 'island hopping around Phuket and Krabi, Bangkok\'s street food and markets, and the temples and elephant sanctuaries of Chiang Mai',
        best: 'November to March',
        keywords: ['thailand', 'bangkok', 'phuket', 'krabi', 'chiang mai']
    },
    malaysia: {
        name: '🇲🇾 Malaysia', region: 'asia', vibes: ['city', 'beach', 'culture'], who: ['family', 'couple', 'solo', 'business'], budget: ['mid'],
        visa: 'evisa', visaText: 'Visa needed. Apply online with Malaysia\'s eVISA.',
        cities: 'Kuala Lumpur, Langkawi, Penang',
        highlights: 'the Petronas Twin Towers, Langkawi\'s beaches and cable car, Penang\'s street food, and great-value shopping',
        best: 'All year round (December to February is driest on the west coast)',
        keywords: ['malaysia', 'kuala lumpur', 'langkawi', 'penang']
    },
    srilanka: {
        name: '🇱🇰 Sri Lanka', region: 'asia', vibes: ['nature', 'beach', 'culture'], who: ['couple', 'solo', 'group'], budget: ['mid'],
        visa: 'evisa', visaText: 'Apply online for an ETA before you travel.',
        cities: 'Colombo, Kandy, Ella, Galle',
        highlights: 'the scenic train ride to Ella, tea plantations, Sigiriya rock fortress, and the beaches around Galle',
        best: 'December to April (west and south coast)',
        keywords: ['sri lanka', 'colombo', 'kandy']
    },
    uk: {
        name: '🇬🇧 United Kingdom', region: 'europe', vibes: ['city', 'culture', 'fun', 'nature'], who: ['family', 'couple', 'solo', 'group', 'business'], budget: ['high', 'mid'], service: true,
        visa: 'embassy', visaText: 'UK Standard Visitor visa (£135 for 6 months, decision in about 3 weeks). This is our speciality, and we handle it end to end.',
        cities: 'London, Edinburgh, Manchester, Liverpool',
        highlights: 'Buckingham Palace and West End shows, the Scottish Highlands, football stadium tours, Christmas markets, and visiting family and friends',
        best: 'May to September, or December for Christmas lights',
        keywords: ['london', 'england', 'scotland', 'edinburgh', 'manchester']
    },
    schengen: {
        name: '🇪🇺 Europe (Schengen)', region: 'europe', vibes: ['city', 'culture', 'beach'], who: ['couple', 'family', 'group', 'solo'], budget: ['high'],
        visa: 'embassy', visaText: 'Schengen visa: one visa for 29 countries (up to 90 days). Apply 1 to 3 months ahead, and we can prepare it.',
        cities: 'Paris, Rome, Barcelona, Amsterdam, Santorini',
        highlights: 'the Eiffel Tower, the Colosseum, Barcelona\'s beaches and Gaudí buildings, Amsterdam\'s canals, and the Greek islands',
        best: 'April to June, and September (Christmas markets in December)',
        keywords: ['paris', 'france', 'italy', 'rome', 'spain', 'barcelona', 'amsterdam', 'greece', 'santorini', 'portugal', 'lisbon', 'switzerland']
    },
    georgia: {
        name: '🇬🇪 Georgia', region: 'europe', vibes: ['culture', 'nature', 'fun'], who: ['couple', 'group', 'solo'], budget: ['low', 'mid'], boost: true,
        visa: 'embassy', visaText: 'Visa needed, but holders of a valid UK, US or Schengen visa can usually visit without one.',
        cities: 'Tbilisi, Batumi, Kazbegi',
        highlights: 'Old Tbilisi\'s sulphur baths, mountain views in Kazbegi, wine country, and the Batumi seaside, all at a budget-friendly price',
        best: 'May to October',
        keywords: ['georgia country', 'tbilisi', 'batumi']
    },
    usa: {
        name: '🇺🇸 USA', region: 'americas', vibes: ['city', 'fun', 'nature'], who: ['family', 'group', 'business', 'couple', 'solo'], budget: ['high'],
        visa: 'embassy', visaText: 'Visa needed, with an embassy interview. Waiting times for appointments can be long, so plan well ahead.',
        cities: 'New York, Orlando, Atlanta, Houston, Miami',
        highlights: 'Times Square and Broadway, Disney World and Universal in Orlando, big-city shopping, and Miami\'s beaches',
        best: 'April to June, and September to November',
        keywords: ['usa', 'america', 'new york', 'orlando', 'disney', 'atlanta', 'houston', 'miami']
    },
    canada: {
        name: '🇨🇦 Canada', region: 'americas', vibes: ['nature', 'city'], who: ['family', 'couple', 'solo'], budget: ['high'],
        visa: 'embassy', visaText: 'Visitor visa needed, with biometrics. Allow plenty of processing time.',
        cities: 'Toronto, Niagara Falls, Vancouver, Banff',
        highlights: 'Niagara Falls, the Rocky Mountains and Lake Louise, the CN Tower, and visiting family',
        best: 'June to September',
        keywords: ['toronto', 'vancouver', 'niagara', 'banff']
    },
    mexico: {
        name: '🇲🇽 Mexico', region: 'americas', vibes: ['beach', 'culture', 'fun'], who: ['couple', 'group', 'solo'], budget: ['mid', 'high'], boost: true,
        visa: 'embassy', visaText: 'Visa needed, but holders of a valid US, UK, Canadian or Schengen visa can usually enter without one.',
        cities: 'Cancún, Tulum, Mexico City',
        highlights: 'Caribbean beaches, Mayan pyramids at Chichén Itzá, swimming in cenotes, and the food and culture of Mexico City',
        best: 'December to April',
        keywords: ['mexico', 'cancun', 'tulum']
    },
    dominican: {
        name: '🇩🇴 Dominican Republic', region: 'americas', vibes: ['beach', 'fun'], who: ['couple', 'group', 'family'], budget: ['high'], boost: true,
        visa: 'embassy', visaText: 'Visa needed, but holders of a valid US, UK, Canadian or Schengen visa can usually enter without one.',
        cities: 'Punta Cana, Santo Domingo',
        highlights: 'all-inclusive beach resorts, Saona Island boat trips, and the colonial old town of Santo Domingo',
        best: 'December to April',
        keywords: ['dominican republic', 'punta cana']
    }
};

// The questions. Each chip is [label, value]. "words" lets visitors answer in their own words.
const FYVOY_TRIP_STEPS = [
    { key: 'who', ask: 'Lovely, let\'s find you somewhere special! 🌍 First, who\'s coming on this trip?',
      chips: [['🙋 Just me', 'solo'], ['💑 My partner / honeymoon', 'couple'], ['👨‍👩‍👧 Family with kids', 'family'], ['👯 Friends / group', 'group'], ['💼 Business + leisure', 'business']],
      words: { solo: ['myself', 'alone', 'solo', 'just me', 'only me', 'single'], couple: ['partner', 'wife', 'husband', 'honeymoon', 'couple', 'fiance', 'girlfriend', 'boyfriend', 'anniversary', 'two of us', 'spouse'], family: ['family', 'kids', 'children', 'child', 'son', 'daughter', 'parents'], group: ['friends', 'group', 'girls', 'guys', 'squad', 'colleagues'], business: ['business', 'work', 'conference', 'meeting'] } },
    { key: 'vibe', ask: 'And what kind of trip would make you happiest? Pick the closest, or just tell me in your own words 😊',
      chips: [['🏖️ Beach & relaxing', 'beach'], ['🏙️ City life & shopping', 'city'], ['🦁 Nature & safari', 'nature'], ['🏛️ Culture & history', 'culture'], ['🎉 Fun & nightlife', 'fun']],
      multi: true,
      words: { beach: ['beach', 'island', 'sea', 'ocean', 'relax', 'chill', 'resort', 'pool', 'sun'], city: ['city', 'shopping', 'shop', 'mall', 'skyscraper', 'modern'], nature: ['nature', 'safari', 'animal', 'wildlife', 'mountain', 'hiking', 'forest', 'gorilla', 'lion'], culture: ['culture', 'history', 'museum', 'heritage', 'food', 'art', 'religious', 'pilgrimage'], fun: ['fun', 'party', 'nightlife', 'club', 'theme park', 'disney', 'adventure', 'concert', 'detty'] } },
    { key: 'region', ask: 'Do you have a part of the world in mind, or shall I surprise you?',
      chips: [['🌍 Africa (close & affordable)', 'africa'], ['🇪🇺 UK & Europe', 'europe'], ['🌏 Middle East & Asia', 'asia'], ['🌎 The Americas', 'americas'], ['✨ Surprise me', 'any']],
      words: { africa: ['africa', 'african', 'west africa', 'east africa'], europe: ['europe', 'uk', 'london', 'schengen', 'european'], asia: ['asia', 'dubai', 'middle east', 'arab', 'asian'], americas: ['america', 'usa', 'us', 'canada', 'caribbean', 'states'], any: ['anywhere', 'surprise', 'any', 'not sure', 'dont know', 'open', 'no idea', 'whatever'] } },
    { key: 'budget', ask: 'Roughly what\'s your budget per person for the whole trip, including flights? A rough idea is fine.',
      chips: [['Under ₦2 million', 'low'], ['₦2m – ₦5m', 'mid'], ['Over ₦5 million', 'high']],
      words: { low: ['cheap', 'low', 'small', 'tight', 'affordable', 'budget', 'under 2', 'below 2', '1m', '1 million', '1.5'], mid: ['mid', 'moderate', 'medium', 'average', '3m', '4m', '3 million', '4 million', '2m', '2 million'], high: ['high', 'luxury', 'big', 'premium', 'no limit', 'unlimited', 'above 5', 'over 5', '10m', '10 million'] } },
    { key: 'visa', ask: 'Last one: how do you feel about visas?',
      chips: [['✅ Visa-free or quick e-visa only', 'easy'], ['📝 Happy to apply, you can help me', 'apply'], ['🛂 I already have a UK/US/Schengen visa', 'have']],
      words: { easy: ['visa free', 'visa-free', 'no visa', 'dont have', 'do not have', 'easy', 'quick', 'e-visa', 'evisa', 'on arrival', 'stress free', 'without visa', 'no stress'], have: ['already', 'i have a', 'i have uk', 'i have us', 'i have schengen', 'valid', 'i get uk', 'i have an'], apply: ['apply', 'help', 'ok', 'fine', 'happy', 'dont mind', 'no problem', 'sure', 'yes'] } }
];
