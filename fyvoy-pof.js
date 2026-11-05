/**
 * FYVOY PROOF OF FUNDS (POF) HELPER: "How much should I show?"
 *
 * Fyvoy asks: purpose (study / visit / work) -> country -> who is travelling
 * (-> London or outside London, for UK study) and gives a RANGE, always
 * recommending the TOP of the range so applicants are on the safe side.
 *
 * Every amount is a [low, high] pair in the destination's currency. In naira:
 *   low  = low  x exchange rate
 *   high = high x exchange rate x (1 + buffer)   <- what Fyvoy recommends
 *
 * Official figures (UK Student, UK Skilled Worker, Canada, Ireland) are from the
 * government sites. Where there is NO official minimum (visit visas), the numbers
 * are Fyzzo planning guidance for a 2-week trip and Fyvoy says so.
 * Review every few months, and whenever a government announces new figures.
 */
const FYVOY_POF = {
    updated: 'November 2026',
    // Indicative naira rates. Keep GBP in line with CONFIG.ukVisa.exchangeRateGBPtoNGN in app.js.
    rates: { GBP: 2200, EUR: 1900, USD: 1650, CAD: 1200 },
    symbols: { GBP: '£', EUR: '€', USD: '$', CAD: 'CAD $' },
    buffer: 0.10,   // 10% exchange-rate safety buffer on the recommended (high) figure

    // UK Student visa (GOV.UK). Living costs for up to 9 months; higher figure = rates from 30 Nov 2026.
    ukStudy: {
        months: 9,
        living:    { london: [1529, 1570], outside: [1171, 1203] },   // per month, student
        dependant: { london: [845, 874],   outside: [680, 702] },     // per month, each dependant
        tuition: [12000, 25000]   // typical unpaid first-year tuition for a master's (your CAS shows the real figure)
    },
    // UK Skilled Worker / Health & Care (GOV.UK): held for 28 days, unless an A-rated sponsor certifies maintenance.
    ukWork: { main: 1270, partner: 285, firstChild: 315, otherChild: 200 },
    // Canada study permit (IRCC), outside Quebec, per year, plus first-year tuition.
    canadaStudy: { single: 23448, extraMember: [5800, 7500], tuition: [20000, 40000] },
    // Ireland (Irish Immigration Service): €10,000 a year living costs, plus tuition.
    irelandStudy: { living: [10000, 10000], tuition: [10000, 25000] },
    // Netherlands: the university checks this for you; living costs per year (IND study norm), plus tuition.
    netherlandsStudy: { living: [13000, 15000], tuition: [9000, 20000] },
    // USA: the amount on your I-20 (tuition + living for one year); typical range, plus each dependant.
    usaStudy: { total: [25000, 75000], dependant: [5000, 8000] },

    // Visit visas: NO official minimum. Fyzzo guidance for a 2-week trip
    // (return flight from Lagos, mid-range accommodation, food, transport, insurance).
    //   first = the main traveller (pays for the room); extraAdult / child share the accommodation.
    visit: {
        uk:       { currency: 'GBP', name: 'the UK',            first: [2300, 4300], extraAdult: [1300, 2200], child: [1000, 1600] },
        schengen: { currency: 'EUR', name: 'Schengen / Europe', first: [2600, 4800], extraAdult: [1500, 2500], child: [1100, 1800] },
        canada:   { currency: 'CAD', name: 'Canada',            first: [4500, 7500], extraAdult: [2600, 4200], child: [2000, 3000] },
        usa:      { currency: 'USD', name: 'the USA',           first: [3500, 6000], extraAdult: [2000, 3300], child: [1500, 2500] },
        ireland:  { currency: 'EUR', name: 'Ireland',           first: [2600, 4600], extraAdult: [1500, 2400], child: [1100, 1700] }
    },
    // Recommended closing balance for visits = trip cost x these factors (low end of range, high end of range)
    visitBalanceFactor: [1.2, 1.5]
};

const FYVOY_POF_STEPS = {
    purpose: { ask: 'Happy to help you work out your proof of funds! 💰 First, what is the trip for?',
        chips: [['🎓 Study', 'study'], ['✈️ Visit / holiday / family visit', 'visit'], ['💼 Work', 'work']] },
    dest: {
        study: { ask: 'Which country will you study in?', chips: [['🇬🇧 UK', 'uk'], ['🇨🇦 Canada', 'canada'], ['🇮🇪 Ireland', 'ireland'], ['🇳🇱 Netherlands', 'netherlands'], ['🇺🇸 USA', 'usa']] },
        visit: { ask: 'Which country are you visiting?', chips: [['🇬🇧 UK', 'uk'], ['🇪🇺 Schengen / Europe', 'schengen'], ['🇨🇦 Canada', 'canada'], ['🇺🇸 USA', 'usa'], ['🇮🇪 Ireland', 'ireland']] },
        work:  { ask: 'Which country are you moving to for work?', chips: [['🇬🇧 UK', 'uk'], ['🌍 Another country', 'other']] }
    },
    party: { ask: 'And who is going? This changes the amount a lot.',
        chips: [['🙋 Just me', '1-0'], ['💑 Me + partner', '2-0'], ['👨‍👩‍👧 Partner + 1 child', '2-1'], ['👨‍👩‍👧‍👦 Partner + 2 children', '2-2'], ['👨‍👩‍👧‍👦 Partner + 3 children', '2-3'], ['👩‍👧 Me + my child(ren)', '1-1']] },
    city: { ask: 'Will you study in London or elsewhere in the UK? (London has a higher amount.)',
        chips: [['🏙️ London', 'london'], ['🏡 Outside London', 'outside']] }
};
