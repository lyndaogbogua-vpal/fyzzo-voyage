/**
 * FYVOY KNOWLEDGE BASE — what Fyvoy (the website assistant) knows.
 *
 * Facts checked against GOV.UK on 4 November 2026. UK rules and fees change:
 * review this file every few months, and whenever GOV.UK announces changes.
 *
 * HOW TO ADD OR EDIT AN ANSWER
 *   id        unique name, no spaces
 *   title     the question as a visitor would ask it (shown on suggestion buttons)
 *   keywords  words/phrases that trigger this answer (lower case). Longer phrases count more.
 *   answer    the reply. **bold**, [link text](https://...) and lines starting with "• " are supported.
 *   services  which Fyzzo services to recommend (ids from FYVOY_SERVICES below)
 *   next      ids of related questions to offer as buttons afterwards
 */

const FYVOY_SERVICES = {
    study:     { name: 'Study Abroad Guidance Suite', price: '₦500,000', page: 'services/study-abroad.html', pitch: 'University & course selection, SOP review, CAS tracking, full student visa preparation and mock interview coaching.' },
    visit:     { name: 'Visit & Family Visa Support', price: '₦380,000 for a single traveller; families on request', page: 'services/visit-family-visa.html', pitch: 'Tailored document checklist, cover letter, form preparation and a full review of your ties and finances.' },
    refusal:   { name: 'Visa Refusal Review & Roadmap', price: '₦380,000', page: 'services/visa-refusal-review.html', pitch: 'We go through your refusal reason by reason and give you a written plan before you reapply.' },
    pof:       { name: 'Proof of Funds Readiness Review', price: '₦100,000', page: 'services/proof-of-funds.html', pitch: 'We check your balances, the 28-day period, sponsor letters and exchange-rate risk before you apply.' },
    gap:       { name: 'Employment & Study Gap Documentation', price: '₦200,000', page: 'services/document-review-coaching.html', pitch: 'We help you evidence and explain gaps in your education or work history properly.' },
    sop:       { name: 'Personal Statement / SOP Guidance', price: '₦100,000', page: 'services/document-review-coaching.html', pitch: 'A clear, credible statement of purpose that matches your background and plans.' },
    cover:     { name: 'Cover Letter / Travel Explanation', price: '₦60,000', page: 'services/document-review-coaching.html', pitch: 'A professionally written letter explaining your trip, funding and ties.' },
    interview: { name: '1-on-1 Visa Interview Coaching', price: '₦100,000', page: 'services/document-review-coaching.html', pitch: 'Realistic mock credibility interviews with feedback.' },
    audit:     { name: 'Comprehensive Document Audit', price: '₦55,000', page: 'services/document-review-coaching.html', pitch: 'A pre-submission check of your forms and documents for gaps and inconsistencies.' },
    travel:    { name: 'Flight & Accommodation Search', price: 'from ₦15,000', page: 'services/flights-holidays.html', pitch: 'We suggest destinations that fit your budget and visa, compare flights and find safe accommodation.' },
    arrival:   { name: 'Arrival & Relocation Support', price: 'quoted for your trip', pitch: 'Airport pickup, temporary accommodation guidance, eVisa/UKVI setup, bank, SIM and GP registration help.' }
};

const FYVOY_KB = [
    // ---------------- VISITING THE UK ----------------
    {
        id: 'need-visa',
        title: 'Do Nigerians need a visa for the UK?',
        keywords: ['need a visa', 'need visa', 'do i need visa', 'nigerians need', 'nigerian need', 'visa to uk', 'visa for uk', 'visa free', 'eta', 'electronic travel authorisation', 'nigerian passport', 'without visa', 'travel authorisation', 'which visa', 'what visa', 'type of visa'],
        answer: 'Yes. **Nigerian passport holders need a UK visa** for visits, study and work. The ETA (Electronic Travel Authorisation, £20) is only for nationalities who can visit without a visa, such as Europeans, Americans and Canadians.\n\nWhich visa you need depends on why you are going: visiting, studying, working or joining family. Tell me your plan and I will point you to the right one.',
        services: ['visit', 'study'],
        next: ['visit-visa', 'student-visa', 'work-visa']
    },
    {
        id: 'visit-visa',
        title: 'UK visit visa: cost and how long I can stay',
        keywords: ['visit visa', 'visitor visa', 'tourist visa', 'standard visitor', 'holiday', 'vacation', 'tourism', 'visit uk', 'visit the uk', 'short stay', 'long term visa', '2 year visa', '5 year visa', '10 year visa'],
        answer: 'The **UK Standard Visitor visa** is for tourism, visiting family or friends, business meetings and conferences, and short courses (up to 6 months).\n\n**Fees (GOV.UK, Nov 2026):**\n• 6-month visa: **£135**\n• 2-year long-term visa: **£506**\n• 5-year: **£903**\n• 10-year: **£1,128**\n(Each visit can last up to 6 months.)\n\nYou **cannot** work, claim benefits or live in the UK through frequent visits. Decisions usually take about **3 weeks** after your biometrics appointment.',
        services: ['visit', 'cover'],
        next: ['visit-documents', 'family-visit', 'processing-time']
    },
    {
        id: 'visit-documents',
        title: 'What documents do I need for a UK visit visa?',
        keywords: ['visit visa documents', 'documents for visit', 'what documents', 'document checklist', 'checklist', 'supporting documents', 'requirements for visit', 'visit requirements', 'what do i need to apply'],
        answer: 'There is no single fixed list. The officer wants to see that you are a **genuine visitor who will leave**, and that you can **afford the trip**. Applicants from Nigeria usually provide:\n• Valid passport (and old passports with travel history)\n• **6 months of bank statements**, with payslips or business income that match the credits\n• Employment letter with your role, salary and approved leave, **or** business registration (CAC) and recent tax records\n• Evidence of ties to home: family, property, ongoing studies or work\n• Invitation letter from your host (if visiting someone), with their UK status and address\n• Travel plan: itinerary, accommodation and a realistic cost breakdown\n\nThe biggest problems we see are **unexplained lump sums in the account** and **details that don\'t match** between the form and the documents.',
        services: ['visit', 'audit', 'cover'],
        next: ['visit-visa', 'refusal', 'family-visit']
    },
    {
        id: 'family-visit',
        title: 'Visiting family or my child studying in the UK',
        keywords: ['visit my child', 'visit my son', 'visit my daughter', 'visit family', 'family visit', 'invitation letter', 'graduation', 'attend graduation', 'visit relatives', 'naming ceremony', 'wedding in uk', 'visit my husband', 'visit my wife', 'parents visit'],
        answer: 'Visiting family uses the **Standard Visitor visa** (£135 for 6 months). As well as your own finances and ties, include:\n• An **invitation letter** from your family member: who they are, your relationship, the dates, where you will stay and who pays for what\n• A copy of their passport/eVisa share code or proof of UK status\n• Proof of relationship (for example, birth certificates)\n• For a graduation: the graduation invitation from the university\n\nIf your host is paying, show their finances too, but **your own ties to Nigeria still matter most**.',
        services: ['visit', 'cover'],
        next: ['visit-documents', 'processing-time']
    },
    {
        id: 'processing-time',
        title: 'How long does a UK visa take?',
        keywords: ['how long', 'processing time', 'how many weeks', 'waiting time', 'decision time', 'when will i get', 'priority', 'super priority', 'fast track', 'faster decision', 'urgent visa'],
        answer: 'Usual decision times from outside the UK, counted **after your biometrics appointment**:\n• Visit visa: about **3 weeks**\n• Student visa: about **3 weeks**\n• Work visas: usually about **3 weeks**\n\nFaster (priority) services are sometimes available for an extra fee; you will be told when you apply. Leave plenty of time before your intake or travel date. Busy periods, especially July to September for students, can be slower.',
        services: ['audit'],
        next: ['biometrics', 'student-visa', 'visit-visa']
    },
    {
        id: 'biometrics',
        title: 'Biometrics appointment and the visa application centre',
        keywords: ['biometric', 'biometrics', 'fingerprint', 'vac', 'visa application centre', 'appointment', 'book appointment', 'tls', 'vfs', 'submission'],
        answer: 'After you complete the online form and pay, you book an appointment at a **UK Visa Application Centre in Nigeria** to give your fingerprints and photo and submit your documents. Bring your passport, appointment confirmation and the documents listed on your checklist, and arrive early.\n\nFyzzo Voyage can help you schedule the appointment and check your document pack before you go.',
        services: ['audit', 'visit'],
        next: ['processing-time', 'visit-documents']
    },

    // ---------------- STUDYING IN THE UK ----------------
    {
        id: 'student-visa',
        title: 'How do I get a UK Student visa?',
        keywords: ['student visa', 'study visa', 'study in uk', 'study in the uk', 'study abroad', 'tier 4', 'masters in uk', 'study in london', 'go to school', 'school abroad', 'university in uk', 'undergraduate', 'postgraduate', 'admission', 'admissions'],
        answer: 'To get a **UK Student visa** you need:\n• An offer and a **CAS** from a licensed university or college\n• Enough money for your fees and living costs (held for 28 days)\n• English at the level your course needs\n• A TB test certificate (required for Nigerian applicants)\n\n**Costs (GOV.UK, Nov 2026):** visa fee **£558** + Immigration Health Surcharge **£776 per year**.\nYou can apply up to **6 months before** your course starts, and decisions usually take about **3 weeks**. Degree-level students can usually stay up to 5 years, depending on the course.',
        services: ['study', 'sop', 'pof'],
        next: ['proof-of-funds', 'cas', 'intake-timeline', 'english-test']
    },
    {
        id: 'intake-timeline',
        title: 'Is it too late for the January 2027 intake?',
        keywords: ['january', 'jan intake', 'january 2027', 'september 2027', 'may intake', 'intake', 'too late', 'deadline', 'when should i apply', 'when to apply', 'timeline'],
        answer: 'Many UK universities still accept applications for **January 2027**, but time is tight. Work backwards:\n• **Offer + deposit + CAS:** universities need time for pre-CAS checks and interviews\n• **Funds:** the full amount must sit in the account for **28 days in a row** before you apply\n• **Visa:** about **3 weeks** after biometrics\n• **Travel:** you can arrive up to 1 month before the course (for courses over 6 months)\n\nIf you are starting from zero today, speak to an advisor **this week**. If January is too tight, **May and September 2027** intakes are good options.',
        services: ['study', 'pof'],
        next: ['student-visa', 'proof-of-funds', 'graduate-visa']
    },
    {
        id: 'proof-of-funds',
        title: 'How much money do I need for a UK Student visa?',
        keywords: ['proof of funds', 'pof', 'how much money', 'bank statement', 'statement', 'show money', 'maintenance', 'living cost', 'funds', '28 days', '28 day', 'financial requirement', 'sponsor', 'money do i need'],
        answer: 'You must show your **remaining first-year tuition** (from your CAS) **plus living costs for up to 9 months**:\n• **London:** £1,529–£1,570/month (£13,761–£14,130 for 9 months)\n• **Outside London:** £1,171–£1,203/month (£10,539–£10,827 for 9 months)\nThe higher figures are the new rates from 30 November 2026. **Always plan with the higher figure, plus about 10% extra** for naira exchange-rate changes.\n\nThe money must be held for **28 days in a row**, and that period must end **within 31 days** of your application. Nigeria is not exempt, so you must submit the evidence. A parent\'s account is allowed with your birth certificate and a consent letter.\n\nAsk me **"how much should I show?"** and I\'ll work out a range for you (single or family, study or visit), or use our [UK Student Visa Calculator](#calculator) or read [our full guide](blog/uk-student-visa-proof-of-funds-28-day-rule.html).',
        services: ['pof', 'study'],
        next: ['pof-mistakes', 'ihs', 'student-visa']
    },
    {
        id: 'pof-mistakes',
        title: 'Common proof of funds mistakes',
        keywords: ['balance dropped', 'dip', 'lump sum', 'large deposit', 'borrowed money', 'fake statement', 'oanda', 'exchange rate', 'naira', 'currency', 'parents account', 'uncle account', 'business account'],
        answer: 'The mistakes we see most often:\n• The balance **drops below the required amount** on even one day of the 28\n• The statement is **too old** (the 28 days must end within 31 days of applying)\n• Money in an uncle\'s, friend\'s or **business account** (not accepted on its own)\n• **Exchange-rate shortfall:** UKVI converts Naira at the OANDA rate on the day you apply, so keep a buffer\n• **Large unexplained deposits** just before the 28 days start\n\n⚠️ Never use borrowed "show money" or altered statements. UKVI checks with banks, and deception can lead to a **ban of up to 10 years**.',
        services: ['pof'],
        next: ['proof-of-funds', 'refusal']
    },
    {
        id: 'ihs',
        title: 'What is the Immigration Health Surcharge (IHS)?',
        keywords: ['ihs', 'health surcharge', 'immigration health', 'nhs fee', 'healthcare surcharge', 'medical cover', 'health insurance'],
        answer: 'The **Immigration Health Surcharge** is paid with your visa application and gives you access to the NHS (UK public healthcare), much like a UK resident.\n• Students and their dependants: **£776 per year**\n• Most other visas (e.g. work): **£1,035 per year**\n• Visits of 6 months or less from outside the UK: **no IHS**\n\nIt is charged for the full length of your visa, for example £1,552 for a 2-year student visa.',
        services: ['study'],
        next: ['nhs-gp', 'student-visa']
    },
    {
        id: 'cas',
        title: 'What is a CAS?',
        keywords: ['cas', 'confirmation of acceptance', 'pre-cas', 'pre cas', 'cas interview', 'unconditional offer', 'conditional offer', 'deposit', 'tuition deposit'],
        answer: 'A **CAS (Confirmation of Acceptance for Studies)** is a reference number your university issues once you have an **unconditional offer** and have met their conditions. These often include paying a tuition deposit and passing a **pre-CAS credibility interview**. You need the CAS number to apply for your Student visa, and it shows your course fees and anything already paid.\n\nWe help you prepare for pre-CAS interviews and track your CAS with the university.',
        services: ['study', 'interview'],
        next: ['student-visa', 'proof-of-funds']
    },
    {
        id: 'english-test',
        title: 'Do I need IELTS? Can I use WAEC English?',
        keywords: ['ielts', 'english test', 'waec', 'neco', 'english requirement', 'toefl', 'pte', 'english proficiency', 'without ielts', 'moi', 'medium of instruction'],
        answer: 'For degree-level study, **the university decides** how you prove your English. Many UK universities accept a **credit in WAEC/NECO English** (or a degree taught in English) for some courses, while others require **IELTS** or another approved test. Requirements vary by university and course, so always check the specific course page.\n\nWe shortlist universities that match your English evidence, so you don\'t pay for a test you may not need.',
        services: ['study'],
        next: ['student-visa', 'study-gap']
    },
    {
        id: 'study-gap',
        title: 'Can I study in the UK with a study gap?',
        keywords: ['study gap', 'gap', 'years gap', 'gap year', 'old result', 'graduated long ago', 'career change', 'work experience', 'age limit', 'too old'],
        answer: 'Yes. A study gap is not a refusal reason on its own. What matters is that your **chosen course makes sense** for your background and career plans, and that you can **evidence what you did during the gap** (employment letters, payslips, business records, training certificates). There is no upper age limit for a UK Student visa.\n\nGaps that are not explained clearly are a common reason for failed pre-CAS interviews and refusals.',
        services: ['gap', 'sop', 'study'],
        next: ['english-test', 'student-visa']
    },
    {
        id: 'dependants',
        title: 'Can I bring my spouse and children on a Student visa?',
        keywords: ['dependant', 'dependent', 'dependants', 'spouse', 'husband', 'wife', 'children', 'kids', 'bring my family', 'family with me', 'bring family', 'bring my wife', 'bring my husband', 'bring my spouse', 'bring my children', 'bring my kids', 'bring my partner', 'come with my wife', 'come with my husband', 'wife on student visa', 'husband on student visa', 'family on student visa', 'can my wife come', 'can my husband come'],
        answer: 'Usually **no**. Since January 2024, most international students cannot bring dependants. You can only bring your partner or children if you are:\n• A **government-sponsored** student on a course longer than 6 months, **or**\n• Studying a **PhD/doctorate or research-based higher degree** (RQF level 8 / research master\'s)\n\nTaught master\'s students (e.g. MSc, MBA) cannot bring dependants. Families planning to move together often look at **work routes** instead; an advisor can map your options.',
        services: ['study', 'arrival'],
        next: ['work-visa', 'student-work']
    },
    {
        id: 'student-work',
        title: 'Can I work while studying in the UK?',
        keywords: ['work while studying', 'part time', 'part-time', 'working hours', '20 hours', 'student job', 'work as a student', 'side hustle', 'self employed student'],
        answer: 'Most degree-level students can work **up to 20 hours a week during term time** and full-time during official vacations. Below degree level the limit is usually lower. Your exact limit is shown on your eVisa/CAS.\n\nYou **cannot** be self-employed, work as a professional sportsperson, or fill a permanent full-time role. Breaking work conditions can cancel your visa, so stick to your limit.\n\nPart-time pay helps with living costs, but it **cannot be used as proof of funds** for your visa.',
        services: ['study', 'arrival'],
        next: ['ni-number', 'graduate-visa']
    },
    {
        id: 'graduate-visa',
        title: 'Can I stay and work after my studies (Graduate visa)?',
        keywords: ['graduate visa', 'graduate route', 'post study', 'post-study', 'psw', 'stay after study', 'after graduation', 'stay back', 'after my masters'],
        answer: 'Yes. The **Graduate visa** lets you stay and work (or look for work) after completing a UK degree. **Important change:**\n• Apply **on or before 31 December 2026:** **2 years**\n• Apply **on or after 1 January 2027:** **18 months**\n• PhD graduates: **3 years**\n\nYou apply from inside the UK after your university confirms you have completed the course. Many graduates then move to a **Skilled Worker visa** with a sponsoring employer.',
        services: ['study'],
        next: ['work-visa', 'student-visa']
    },

    // ---------------- WORKING / RELOCATING ----------------
    {
        id: 'work-visa',
        title: 'How can I relocate to the UK for work?',
        keywords: ['work visa', 'skilled worker', 'job in uk', 'work in uk', 'work in the uk', 'relocate for work', 'japa', 'job offer', 'certificate of sponsorship', 'cos', 'sponsorship', 'sponsor licence', 'employer sponsor', 'relocate', 'relocation'],
        answer: 'The main route is the **Skilled Worker visa**. You need:\n• A **job offer** from a Home Office-approved UK employer\n• A **Certificate of Sponsorship (CoS)** from that employer\n• A job on the eligible occupations list\n• A salary of at least **£41,700 a year** or the job\'s "going rate", whichever is higher (some exceptions apply)\n• English at the required level\n\nThe visa lasts up to 5 years and can lead to settlement. Doctors, nurses and other health professionals may qualify for the **Health and Care Worker visa** instead.\n\n⚠️ **Never pay anyone for a job offer or CoS.** Selling sponsorship is illegal and a very common scam.',
        services: ['audit', 'interview', 'arrival'],
        next: ['care-worker', 'scams', 'settling-in']
    },
    {
        id: 'care-worker',
        title: 'Can I still get a UK care worker visa?',
        keywords: ['care worker', 'carer', 'care assistant', 'caregiver', 'health and care', 'senior care', 'nursing', 'nurse', 'health care visa', 'hca', 'support worker', 'care home'],
        answer: '**Care worker and senior care worker jobs can no longer be used for new Health and Care Worker visa applications from outside the UK.** They are now only for people already in the UK who are extending, updating or switching.\n\nThe Health and Care Worker visa is still open to **qualified professionals** such as doctors, nurses, pharmacists, radiographers and other registered health professionals.\n\n⚠️ If someone is offering you a "care job sponsorship" from Nigeria for a fee, treat it as a **scam**.',
        services: ['audit'],
        next: ['work-visa', 'scams']
    },
    {
        id: 'scams',
        title: 'How do I avoid visa and job scams?',
        keywords: ['scam', 'fraud', 'fake', 'guarantee', 'guaranteed visa', 'agent', 'is this legit', 'trust', 'real or fake', 'fake job', 'fake agent', 'buy cos'],
        answer: 'Warning signs:\n• Anyone who **guarantees** a visa. Only UKVI decides.\n• Selling a **job offer or Certificate of Sponsorship**\n• Offering to provide **bank statements, documents or "show money"**\n• Payments to personal accounts with no receipt or contract\n• Websites that look like GOV.UK but charge extra for the eVisa, ETA or UKVI account (these are free or have fixed fees on GOV.UK)\n\nFyzzo Voyage gives transparent fees, written scopes and honest advice. We **never** create or alter documents.',
        services: ['refusal', 'audit'],
        next: ['work-visa', 'about-fyzzo']
    },

    // ---------------- REFUSALS ----------------
    {
        id: 'refusal',
        title: 'My visa was refused. What should I do?',
        keywords: ['refused', 'refusal', 'rejected', 'denied', 'reapply', 'refusal letter', 'administrative review', 'appeal', 'gcms', 'denial'],
        answer: 'A refusal is not the end, but **don\'t rush to reapply with the same documents**. Do this first:\n• Read the refusal letter and list **every** reason\n• Check whether you can request an **administrative review** or appeal (the letter says so, and the deadlines are short)\n• Fix each reason with **evidence**, not just explanations\n• Make every date and amount consistent across the form and documents\n• **Always declare** the previous refusal in future applications\n\nRead our [refusal guide](blog/visa-refused-what-to-do-before-reapplying.html).',
        services: ['refusal', 'cover'],
        next: ['visit-documents', 'pof-mistakes']
    },

    // ---------------- TRAVEL & ARRIVAL ----------------
    {
        id: 'tb-test',
        title: 'Do I need a TB test?',
        keywords: ['tb', 'tuberculosis', 'tb test', 'chest x-ray', 'medical test', 'medical', 'iom'],
        answer: 'Yes, if you are coming to the UK for **6 months or more** (for example, on a Student or work visa) and have lived in Nigeria in the last 6 months. Nigeria is on the UK TB-test list. The test must be done at a **UK-approved clinic**; GOV.UK lists the approved clinics in Nigeria. Short visits under 6 months don\'t need one.',
        services: ['study'],
        next: ['student-visa', 'travel-checklist']
    },
    {
        id: 'evisa',
        title: 'What is an eVisa? Do I still get a BRP?',
        keywords: ['evisa', 'e-visa', 'brp', 'biometric residence permit', 'ukvi account', 'share code', 'immigration status', 'prove my status', 'right to rent', 'right to work'],
        answer: '**BRP cards have been replaced by eVisas**, a digital record of your status. When your visa is approved:\n• Create a free **UKVI account** to access your eVisa\n• Make sure your **passport is linked** before you travel (update it if you renew your passport)\n• Use a **share code** to prove your status to your university, landlord or employer\n\nSetting up the account is **free**. Never pay anyone to "activate" it. [Read our eVisa guide](blog/uk-evisa-guide-ukvi-account.html).',
        services: ['arrival'],
        next: ['travel-checklist', 'bank-account']
    },
    {
        id: 'travel-checklist',
        title: 'What should I carry when I travel to the UK?',
        keywords: ['what to carry', 'what to bring', 'packing', 'pack', 'border', 'immigration officer', 'airport', 'arrival', 'arrive', 'landing', 'heathrow', 'gatwick', 'manchester airport', 'hand luggage', 'documents at airport', 'first day'],
        answer: 'In your hand luggage, carry:\n• Passport (linked to your UKVI/eVisa account)\n• CAS/offer letter or invitation letter, as relevant\n• Evidence of funds and accommodation address\n• TB certificate (if required)\n• Contact details for your university or host\n• Some cash in pounds or a card that works in the UK\n\nStudents can arrive up to **1 month before** a course that lasts over 6 months, but **never before the start date on the visa**.',
        services: ['arrival', 'travel'],
        next: ['cash-limit', 'airport-pickup', 'weather']
    },
    {
        id: 'cash-limit',
        title: 'How much cash can I bring into the UK?',
        keywords: ['cash', 'how much cash', 'carry money', 'declare', 'pounds cash', 'foreign currency', 'dollars cash', '10,000', '10000'],
        answer: 'There is no limit, but if you carry **£10,000 or more** in cash (or the equivalent in other currencies) when entering the UK from outside the UK, you **must declare it** to UK customs. Carrying large amounts of cash is risky anyway. A UK bank account or a travel card is safer for living costs.',
        services: ['arrival'],
        next: ['bank-account', 'travel-checklist']
    },
    {
        id: 'flights',
        title: 'Can you help with flights and baggage?',
        keywords: ['flight', 'flights', 'ticket', 'air ticket', 'airline', 'fare', 'cheap flight', 'baggage', 'luggage', 'student baggage', 'book flight', 'one way'],
        answer: 'Yes. Our Travel Desk compares routes and fares from Lagos and Abuja, including **student fares with extra baggage**, direct vs connecting flights, and change/refund rules.\n\nTip: don\'t buy a non-refundable ticket **before your visa is approved**. If an itinerary is needed for an application, we advise on the safest option.',
        services: ['travel'],
        next: ['travel-checklist', 'airport-pickup']
    },
    {
        id: 'airport-pickup',
        title: 'Can someone pick me up at the airport?',
        keywords: ['pickup', 'pick up', 'pick me up', 'airport transfer', 'taxi from airport', 'meet me at airport', 'transport from airport'],
        answer: 'Yes. We coordinate **trusted airport pickups** from major UK airports (Heathrow, Gatwick, Manchester, Birmingham and others) to your campus, hall or temporary accommodation. Many universities also run free airport pickups during welcome weeks, so check yours first. We will tell you which is better for your arrival date.',
        services: ['arrival', 'travel'],
        next: ['accommodation', 'sim-card']
    },

    // ---------------- SETTLING IN ----------------
    {
        id: 'accommodation',
        title: 'How do I find accommodation in the UK?',
        keywords: ['accommodation', 'housing', 'house', 'apartment', 'flat', 'room', 'rent', 'renting', 'student hall', 'halls', 'landlord', 'where to stay', 'airbnb', 'hostel', 'deposit'],
        answer: 'Options:\n• **University halls:** the simplest for first-year and international students; apply early\n• **Private student accommodation:** purpose-built, bills often included\n• **Shared houses/flats:** cheaper, but you need a UK guarantor or must pay several months upfront\n\nIn England, your tenancy deposit is usually capped at **5 weeks\' rent** and must be protected in a government-approved scheme. Landlords will check your **right to rent** using your eVisa share code.\n\n⚠️ Scam alert: **never pay a deposit for a room you haven\'t verified**. Fake listings target new arrivals.',
        services: ['arrival', 'travel'],
        next: ['council-tax', 'bank-account', 'cost-of-living']
    },
    {
        id: 'bank-account',
        title: 'How do I open a UK bank account?',
        keywords: ['bank account', 'open account', 'uk bank', 'monzo', 'revolut', 'barclays', 'hsbc', 'lloyds', 'debit card', 'sort code'],
        answer: 'Most banks need your **passport**, proof of your immigration status (an **eVisa share code**) and **proof of UK address**. Students can usually get a letter from the university. App-based banks are often the quickest to open on arrival, and you can switch to a high-street bank later.\n\nUntil then, use an international card or travel card for your first few days.',
        services: ['arrival'],
        next: ['ni-number', 'sim-card']
    },
    {
        id: 'ni-number',
        title: 'What is a National Insurance number?',
        keywords: ['national insurance', 'ni number', 'nin', 'tax number', 'hmrc', 'tax', 'payslip'],
        answer: 'A **National Insurance (NI) number** makes sure your tax and contributions are recorded correctly. You need one to work in the UK, and you **apply for it online on GOV.UK** after you arrive. You can usually start work while you wait, as long as you can prove your right to work with your eVisa share code.',
        services: ['arrival'],
        next: ['student-work', 'bank-account']
    },
    {
        id: 'nhs-gp',
        title: 'How do I see a doctor (NHS and GP)?',
        keywords: ['nhs', 'gp', 'doctor', 'hospital', 'sick', 'clinic', 'register gp', 'healthcare', 'emergency', '999', '111', 'pharmacy', 'dentist'],
        answer: 'Paying the IHS gives you access to the **NHS**. Soon after arriving, **register with a GP** (local doctor) near where you live. Most universities also have one on campus.\n• Emergency: call **999**\n• Urgent but not an emergency: call **111** or use NHS 111 online\n• Pharmacies can help with minor illnesses\n\nPrescriptions and dental care in England may carry a charge.',
        services: ['arrival'],
        next: ['ihs', 'settling-in']
    },
    {
        id: 'sim-card',
        title: 'How do I get a UK phone number?',
        keywords: ['sim', 'sim card', 'phone number', 'mobile', 'data', 'esim', 'network', 'airtime', 'ee', 'vodafone', 'o2', 'three', 'giffgaff', 'lebara'],
        answer: 'Get a **pay-as-you-go or SIM-only** plan when you arrive. You can buy one at the airport or in shops, or order an **eSIM** online before you travel. Long contracts with a new phone usually need a UK credit history, so start with SIM-only. Keep your Nigerian line active for bank OTPs.',
        services: ['arrival'],
        next: ['bank-account', 'transport']
    },
    {
        id: 'transport',
        title: 'Getting around in the UK',
        keywords: ['transport', 'bus', 'train', 'tube', 'underground', 'oyster', 'railcard', 'travel card', 'commute', 'uber'],
        answer: '• In **London**, tap a contactless bank card or an **Oyster card** on buses and the Tube. Students can get discounted travelcards.\n• Across the UK, a **16-25 Railcard** (or 26-30 Railcard) gives about a third off most train fares.\n• Most cities have good bus networks; check the local operator\'s app for passes.',
        services: ['arrival'],
        next: ['driving', 'cost-of-living']
    },
    {
        id: 'driving',
        title: 'Can I drive in the UK with my Nigerian licence?',
        keywords: ['drive', 'driving', 'licence', 'license', 'driving licence', 'car', 'nigerian licence'],
        answer: 'You can usually drive in Great Britain on a valid Nigerian licence **for up to 12 months** from when you become resident. After that, you need to pass the UK tests and get a UK licence. Make sure your insurance covers you. Driving without valid insurance is a serious offence.',
        services: ['arrival'],
        next: ['transport']
    },
    {
        id: 'council-tax',
        title: 'Do students pay council tax?',
        keywords: ['council tax', 'bills', 'utilities', 'electricity', 'gas', 'water bill', 'tv licence', 'wifi'],
        answer: '**Full-time students are exempt from council tax.** Ask your university for a council tax exemption certificate and send it to the local council. If you share with non-students, the household may still pay a reduced amount. Other bills: gas/electricity, water, internet and a **TV licence** if you watch live TV or BBC iPlayer.',
        services: ['arrival'],
        next: ['accommodation', 'cost-of-living']
    },
    {
        id: 'cost-of-living',
        title: 'How much does it cost to live in the UK?',
        keywords: ['cost of living', 'how expensive', 'expenses', 'budget', 'monthly cost', 'feeding', 'food cost', 'groceries', 'how much to live', 'living expenses'],
        answer: 'A useful guide is the UKVI living-cost figure: **£1,529/month in London** and **£1,171/month elsewhere**. Real costs depend on your rent, which is the biggest expense. Budget for rent, food, transport, phone, and winter clothing in your first month.\n\nTip: cheaper supermarkets, student discounts and cooking at home make a big difference. Our [calculator](#calculator) gives a Naira estimate.',
        services: ['pof', 'arrival'],
        next: ['accommodation', 'student-work']
    },
    {
        id: 'weather',
        title: 'What is the weather like? What clothes should I pack?',
        keywords: ['weather', 'cold', 'winter', 'clothes', 'jacket', 'coat', 'snow', 'rain', 'plug', 'adapter', 'socket'],
        answer: 'UK winters (November to March) are **cold, dark and wet**, often 0–8°C. Pack layers, a warm waterproof coat, gloves and comfortable shoes, or buy them on arrival where they are often cheaper. UK plugs are **Type G (three square pins, 230V)**, so bring an adapter. Vitamin D supplements are commonly recommended in winter.',
        services: ['arrival'],
        next: ['travel-checklist', 'settling-in']
    },
    {
        id: 'settling-in',
        title: 'What should I do in my first week in the UK?',
        keywords: ['settle', 'settling', 'settling in', 'first week', 'after arrival', 'new country', 'orientation', 'what next after arriving', 'relocation support', 'arrival support'],
        answer: 'Your first-week checklist:\n• Check your **eVisa** and generate share codes as needed\n• Complete **university registration** / start work onboarding\n• Get a **UK SIM**\n• Open a **bank account**\n• **Register with a GP**\n• Apply for your **NI number** if you will work\n• Learn your **local transport** and get any railcards or discounts\n\nOur Arrival & Relocation Support walks you through all of this.',
        services: ['arrival'],
        next: ['bank-account', 'nhs-gp', 'sim-card']
    },

    // ---------------- CHOOSING A COUNTRY ----------------
    {
        id: 'holiday-ideas',
        title: 'Suggest a country for my holiday',
        keywords: ['holiday', 'vacation', 'vacay', 'honeymoon', 'getaway', 'tourist destination', 'places to visit', 'place to visit', 'where can i travel', 'where can i visit', 'countries to visit', 'country to visit', 'visa free', 'visa-free', 'visa on arrival', 'no visa', 'without visa', 'sightseeing', 'safari', 'beach holiday', 'anniversary trip', 'birthday trip', 'summer trip', 'christmas trip', 'easter trip', 'family trip', 'girls trip', 'travel ideas', 'tour'],
        answer: 'I would love to help you find the right place! 🌍 Let me ask you a few quick questions so my suggestions actually fit you.',
        services: [],
        next: [],
        action: 'trip'
    },    {
        id: 'choose-country',
        title: 'Which country is best for me to relocate to?',
        keywords: ['which country', 'best country', 'where should i go', 'where to relocate', 'easiest country', 'easy visa', 'cheapest country', 'country to relocate', 'recommend a country', 'suggest a country', 'relocate abroad', 'move abroad', 'japa where', 'choose a country', 'country match'],
        answer: 'That depends on your goal, budget and what matters most to you: staying to work afterwards, low cost, or a quick and simple visa. Let me match you in 3 quick questions.',
        services: [],
        next: [],
        action: 'match'
    },

    // ---------------- OTHER COUNTRIES ----------------
    {
        id: 'canada',
        title: 'Studying or relocating to Canada',
        keywords: ['canada', 'canadian', 'study permit', 'pal', 'provincial attestation', 'express entry', 'pgwp', 'toronto', 'ontario', 'alberta', 'gic', 'ircc', 'canada pr'],
        answer: '**Canada** is popular, but it has become more competitive:\n• Most students need a **Provincial Attestation Letter (PAL)** from the province, as well as an offer from a designated school (DLI)\n• Proof of funds: tuition **plus about CAD $23,448 a year** in living costs for a single student outside Quebec (IRCC\'s current figure; more for family members)\n• Study permit numbers are capped, and processing can take several weeks to months\n\n**Compare with the UK:** shorter master\'s degrees (often 1 year), a 3-week visa decision and the Graduate visa make the UK faster and often cheaper overall. Our UK team handles your case end to end.',
        services: ['study', 'pof'],
        next: ['choose-country', 'student-visa', 'graduate-visa']
    },
    {
        id: 'ireland',
        title: 'Studying in Ireland',
        keywords: ['ireland', 'irish', 'dublin', 'stamp 2', 'stamp 1g', 'irp', 'eu degree english'],
        answer: '**Ireland** is English-speaking and its process feels similar to the UK\'s:\n• You need a letter of enrolment from an approved college and must usually **pay your fees** before applying\n• Nigerians need a study visa (long stay "D" visa) and must **register with immigration** after arrival for stays over 90 days\n• Expect to show living-cost funds of at least **about €10,000** for the first year, on top of fees (confirm the current amount)\n• Graduates can stay to look for work through the **Third Level Graduate Programme** (Stamp 1G)\n\nThe UK usually gives faster visa decisions and a wider choice of universities. Ask us to compare both for your course.',
        services: ['study', 'pof', 'sop'],
        next: ['choose-country', 'student-visa']
    },
    {
        id: 'netherlands',
        title: 'Studying in the Netherlands',
        keywords: ['netherlands', 'holland', 'dutch', 'amsterdam', 'rotterdam', 'the hague', 'ind', 'mvv', 'orientation year', 'zoekjaar', 'europe study'],
        answer: 'The **Netherlands** is one of the smoothest European study routes:\n• Hundreds of **English-taught** bachelor\'s and master\'s programmes\n• Your university is a recognised sponsor and **applies for your entry visa (MVV) and residence permit for you** with the IND, so there is less paperwork on your side\n• You show proof of funds at the IND\'s monthly student rate (your university tells you the exact amount), usually by paying it to the university\n• After graduating you can apply for the **orientation year** (zoekjaar), one year to find work\n\nTuition for non-EU students is higher than in Germany, but the process is far simpler. Compare it with the **UK**, which offers 1-year master\'s degrees and a 3-week visa decision.',
        services: ['study', 'sop', 'pof'],
        next: ['choose-country', 'student-visa', 'schengen']
    },
    {
        id: 'germany',
        title: 'What about Germany?',
        keywords: ['germany', 'german', 'blocked account', 'sperrkonto', 'tuition free', 'free tuition', 'free education', 'aps', 'berlin'],
        answer: 'Germany has low tuition at public universities, but for Nigerian applicants the process is **slow**: you need a blocked account (about a year of living costs), many programmes are taught in German, and **visa appointment waiting times are long**.\n\nIf you want a **shorter process**, we recommend the **UK** (decision in about 3 weeks) or the **Netherlands** (your university applies for the permit for you).',
        services: ['study'],
        next: ['netherlands', 'student-visa', 'choose-country']
    },
    {
        id: 'usa',
        title: 'Studying or visiting the USA',
        keywords: ['usa', 'america', 'united states', 'us visa', 'f1', 'f-1', 'i-20', 'i20', 'b1', 'b2', 'b1/b2', 'sevis', 'ds-160', 'us embassy', 'opt'],
        answer: '**USA:** students need an **I-20** from a SEVP-approved school, then the **F-1 visa interview** at the US Embassy or Consulate. Visitors apply for a **B1/B2 visa**, also with an interview. Interview wait times in Nigeria can be long, and the interview itself decides most cases.\n\nWe offer **I-20 support and mock visa interviews**. For many students the **UK** is quicker: no interview for most applicants and a decision in about 3 weeks.',
        services: ['interview', 'study'],
        next: ['choose-country', 'student-visa']
    },
    {
        id: 'schengen',
        title: 'Schengen / Europe visit visa',
        keywords: ['schengen', 'europe visit', 'france visa', 'italy visa', 'spain visa', 'netherlands visa', 'europe tour', 'paris', 'eu visa'],
        answer: 'A **Schengen visa** lets you visit **29 European countries** for up to 90 days in any 180-day period. Apply to the embassy of the country where you will spend the most time, or the one you enter first if your time is split equally. Typical requirements are similar to the UK: bank statements, employment or business evidence, travel insurance, flight and hotel bookings, and a cover letter.\n\nAppointment availability in Nigeria varies a lot, so start early. We prepare full visit-visa packs, and many clients do **UK first**, which also builds travel history.',
        services: ['visit', 'cover'],
        next: ['visit-documents', 'choose-country']
    },
    {
        id: 'ecowas-ghana',
        title: 'Ghana and other ECOWAS countries',
        keywords: ['ghana', 'accra', 'ecowas', 'west africa', 'senegal', 'ivory coast', "cote d'ivoire", 'togo', 'benin', 'gambia', 'sierra leone', 'liberia', 'africa'],
        answer: 'As a Nigerian, you **don\'t need a visa** to visit other **ECOWAS** countries such as Ghana, Senegal, Côte d\'Ivoire, Togo, Benin and The Gambia. Under ECOWAS free movement you can stay **up to 90 days** with a valid passport. Staying longer to study, work or live needs a residence permit from that country.\n\n**Ghana** is popular for affordable English-taught degrees and business. Fyzzo can help with flights, accommodation and settling in. For international degrees with global recognition and post-study work, we recommend comparing with the **UK**.',
        services: ['travel', 'arrival'],
        next: ['choose-country', 'rwanda']
    },
    {
        id: 'rwanda',
        title: 'Rwanda and East Africa',
        keywords: ['rwanda', 'kigali', 'east africa', 'kenya', 'nairobi', 'tanzania', 'uganda'],
        answer: '**Rwanda** is one of the most visa-friendly countries in Africa for African travellers, and **Kigali** is a fast-growing hub for business, conferences and tech. Entry rules for other East African countries (Kenya, Tanzania, Uganda) have changed often in recent years.\n\nAn advisor will confirm the current entry rules for your passport before you book. We can arrange flights, accommodation and your travel plan.',
        services: ['travel'],
        next: ['choose-country', 'ecowas-ghana']
    },
    {
        id: 'uae',
        title: 'Dubai / UAE',
        keywords: ['dubai', 'uae', 'emirates', 'abu dhabi', 'dubai visa', 'dubai job'],
        answer: 'Nigerians need a visa for the **UAE**. Visit visas are usually arranged through a UAE-based sponsor, airline or licensed agency, and the rules and approval rates for Nigerian applicants have changed several times in recent years. Work in the UAE requires an **employer-sponsored work permit and residence visa**.\n\n⚠️ Be careful with "Dubai job + visa" packages sold for a fee. We can advise on the current position and arrange travel.',
        services: ['travel', 'visit'],
        next: ['choose-country', 'scams']
    },
    {
        id: 'malaysia',
        title: 'Studying in Malaysia (affordable)',
        keywords: ['malaysia', 'kuala lumpur', 'emgs', 'asia study', 'cheap degree', 'affordable degree'],
        answer: '**Malaysia** offers affordable **English-taught degrees**, including branch campuses of UK and Australian universities. International students apply for a **Student Pass** through the university via EMGS (Education Malaysia Global Services).\n\nTip: a **UK university\'s Malaysian campus** can give you a UK degree at a lower cost. We can compare this with studying in the UK itself.',
        services: ['study'],
        next: ['choose-country', 'student-visa']
    },
    {
        id: 'other-countries',
        title: 'Do you help with other countries?',
        keywords: ['australia', 'new zealand', 'other country', 'other countries', 'any country', 'south africa', 'turkey', 'cyprus', 'malta', 'poland', 'france'],
        answer: '**The UK is our core speciality**: study, visit and family visas, proof of funds, refusals, flights and arrival support. We also guide clients on **Canada, Ireland, the USA, Schengen/Europe, Africa, the UAE and Asia**. Rules change often outside the UK, so an advisor confirms the current requirements for your passport and situation before you spend money.',
        services: ['study', 'visit'],
        next: ['choose-country', 'student-visa', 'visit-visa']
    },

    // ---------------- ABOUT FYZZO ----------------
    {
        id: 'prices',
        title: 'How much are Fyzzo Voyage\'s services?',
        keywords: ['price', 'prices', 'cost of your service', 'cost of your services', 'your services cost', 'how much are your services', 'how much are your', 'how much is your service', 'how much do you collect', 'your fee', 'your fees', 'service fee', 'service charge', 'consultation fee', 'fees', 'how much do you charge', 'charges', 'package', 'packages', 'rate', 'your rates', 'payment plan', 'family price', 'price for my family', 'family package'],
        answer: 'Our professional fees (government visa fees, IHS, tuition and flights are paid separately to the providers):\n• **Study Abroad Guidance Suite:** ₦500,000, the full journey from university choice to student visa\n• **Visit & Family Visa Support:** ₦380,000 for a single traveller. Families are quoted on request, because family size and documents vary\n• **Visa Refusal Review & Roadmap:** ₦380,000\n• **Employment & Study Gap Documentation:** ₦200,000\n• **Proof of Funds Readiness Review:** ₦100,000\n• **SOP / Personal Statement Guidance:** ₦100,000\n• **1-on-1 Visa Interview Coaching:** ₦100,000\n• **Cover Letter / Travel Explanation:** ₦60,000\n• **Comprehensive Document Audit:** ₦55,000\n• **Flight & Accommodation Search:** ₦15,000\n• **Relocation & arrival support:** tailored to your move\n\nYour first chat with us is free. [See every service in detail](services/).',
        services: [],
        next: ['about-fyzzo', 'student-visa', 'visit-visa']
    },
    {
        id: 'about-fyzzo',
        title: 'Who is Fyzzo Voyage? Do you guarantee visas?',
        keywords: ['who are you', 'about you', 'fyzzo', 'are you real', 'office', 'location', 'address', 'guarantee', 'success rate', 'legit', 'registered'],
        answer: 'Fyzzo Voyage is the travel and global mobility unit of **Fyzzo Global**. We help Nigerians study, visit, work and settle abroad with structured guidance, document review and real human support.\n\n**We do not guarantee visas.** No honest agent can, because decisions belong to the embassy or immigration authority. What we guarantee is a careful, honest and well-prepared application.',
        services: [],
        next: ['prices', 'scams']
    }
];

/**
 * DESTINATION MATCHER — "Which country is best for me?"
 * Fyvoy asks 3 questions (goal, budget, priority) and recommends the UK first
 * (our core service), then up to 2 alternatives that fit the answers.
 *   goals:    study | work | visit | family
 *   budget:   low (under ₦15m) | mid (₦15m–₦45m) | high (over ₦45m)
 *   priority: stay   (stay and work afterwards)
 *             cost   (lowest cost)
 *             fast   (quick, simple visa)
 *             english (English-speaking)
 */
const FYVOY_DESTINATIONS = {
    uk: {
        name: '🇬🇧 United Kingdom',
        kb: 'student-visa',
        why: {
            study: '1-year master\'s degrees, world-ranked universities, a visa decision in about 3 weeks and a Graduate visa to work after (2 years if you apply by 31 Dec 2026, 18 months after).',
            work: 'Skilled Worker and Health & Care routes with a path to settlement. You need a sponsoring employer (never pay for a job offer).',
            visit: 'Standard Visitor visa (£135 for 6 months, long-term options up to 10 years), a decision in about 3 weeks, and strong travel history for future trips.',
            family: 'A clear route for family visits, and for families moving through a work visa.'
        },
        note: { low: 'The UK usually needs at least ₦40m+ for a first year of study (fees + living costs). Visits cost far less.' }
    },
    ireland: { name: '🇮🇪 Ireland', kb: 'ireland', goals: ['study', 'work'], priorities: ['english', 'stay'], budgets: ['mid', 'high'], why: 'English-speaking EU country, a process similar to the UK\'s, and graduate stay-back to look for work.' },
    canada: { name: '🇨🇦 Canada', kb: 'canada', goals: ['study', 'work', 'family'], priorities: ['stay', 'english'], budgets: ['high'], why: 'Strong long-term settlement pathways, but there are study permit caps and a higher proof of funds (about CAD $23,448 a year + tuition).' },
    netherlands: { name: '🇳🇱 Netherlands', kb: 'netherlands', goals: ['study'], priorities: ['fast', 'english', 'stay'], budgets: ['mid', 'high'], why: 'English-taught degrees, and your university applies for your visa and residence permit for you. Graduates get a 1-year orientation year to find work.' },
    malaysia: { name: '🇲🇾 Malaysia', kb: 'malaysia', goals: ['study'], priorities: ['cost', 'english', 'fast'], budgets: ['low', 'mid'], why: 'Affordable English-taught degrees, including UK university branch campuses.' },
    ghana: { name: '🇬🇭 Ghana / ECOWAS', kb: 'ecowas-ghana', goals: ['study', 'visit', 'work', 'family'], priorities: ['fast', 'cost', 'english'], budgets: ['low', 'mid'], why: 'No visa needed for Nigerians (up to 90 days), close to home and affordable.' },
    rwanda: { name: '🇷🇼 Rwanda', kb: 'rwanda', goals: ['visit', 'work'], priorities: ['fast'], budgets: ['low', 'mid'], why: 'Very visa-friendly for Africans; Kigali is a growing business and conference hub.' },
    usa: { name: '🇺🇸 USA', kb: 'usa', goals: ['study', 'visit'], priorities: ['stay', 'english'], budgets: ['high'], why: 'Top universities and post-study work (OPT). Expect an embassy interview and long appointment waits.' },
    schengen: { name: '🇪🇺 Schengen / Europe', kb: 'schengen', goals: ['visit'], priorities: ['fast', 'cost'], budgets: ['mid', 'high'], why: 'One visa for 29 countries (up to 90 days in any 180).' }
};