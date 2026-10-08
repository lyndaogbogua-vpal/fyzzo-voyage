/**
 * FYZZO VOYAGE 2.0 — MASTER SCRIPT & CONFIGURATION ENGINE
 * Brand: Study. Travel. Relocate. With Confidence.
 * Corporate: Fyzzo Global
 */

// ==========================================================================
// 1. CONFIGURATION OBJECT (Content Governance §32)
// Easily update statutory rates, fees, deadlines & contact details
// ==========================================================================
const CONFIG = {
    brand: "Fyzzo Voyage",
    corporateUnit: "Fyzzo Global",
    phone: "08062499796",
    phoneInternational: "+2348062499796",
    whatsappClean: "2348062499796",
    emailOfficial: "voyage@fyzzo.com",
    emailAlternative: "fyzzovoyage@gmail.com",
    instagram: "@voyagebyfyzzo",
    adminPin: "fyzzo2026",
    currentIntake: "January 2027 Intake",
    
    // Statutory UK Student Visa Maintenance Requirements (2026/2027 Guidelines §12)
    ukVisa: {
        londonMonthly: 1529,
        londonMax9Months: 13761,
        outsideLondonMonthly: 1171,
        outsideLondonMax9Months: 10539,
        dependantLondonMonthly: 845,
        dependantOutsideLondonMonthly: 680,
        exchangeRateGBPtoNGN: 2200, // Indicative baseline
        fxBufferPercent: 0.10 // 10% statutory volatility buffer
    },

    // Google Form Sync Endpoint for Lead Capture
    googleForm: {
        actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeQ07u1z_T1f5uT2dM3m1v8r1p_sample/formResponse",
        nameEntry: "entry.1000001",
        phoneEntry: "entry.1000002",
        emailEntry: "entry.1000003",
        serviceEntry: "entry.1000004"
    }
};

// ==========================================================================
// 2. UK STUDENT VISA FINANCIAL CALCULATOR (§12, §13)
// ==========================================================================
function recalculateUKFinancials() {
    const locationEl = document.getElementById('studyLocation');
    const tuitionTotalEl = document.getElementById('tuitionTotal');
    const tuitionPaidEl = document.getElementById('tuitionPaid');
    const dependantCountEl = document.getElementById('dependantCount');

    if (!locationEl || !tuitionTotalEl || !tuitionPaidEl) return;

    const location = locationEl.value; // 'london' or 'outside_london'
    const tuitionTotal = parseFloat(tuitionTotalEl.value) || 0;
    const tuitionPaid = parseFloat(tuitionPaidEl.value) || 0;
    const dependants = parseInt(dependantCountEl ? dependantCountEl.value : 0, 10) || 0;

    // 1. Outstanding Tuition
    const outstandingTuition = Math.max(0, tuitionTotal - tuitionPaid);

    // 2. Student Maintenance (9 Months Statutory Maximum)
    const isLondon = (location === 'london');
    const studentMaintenance = isLondon ? CONFIG.ukVisa.londonMax9Months : CONFIG.ukVisa.outsideLondonMax9Months;

    // 3. Dependant Maintenance (9 Months)
    const depRateMonthly = isLondon ? CONFIG.ukVisa.dependantLondonMonthly : CONFIG.ukVisa.dependantOutsideLondonMonthly;
    const dependantMaintenance = dependants * (depRateMonthly * 9);

    // 4. Total Evidence in GBP
    const totalGBP = outstandingTuition + studentMaintenance + dependantMaintenance;

    // 5. Total in NGN with 10% Buffer
    const effectiveRate = CONFIG.ukVisa.exchangeRateGBPtoNGN * (1 + CONFIG.ukVisa.fxBufferPercent);
    const totalNGN = Math.round(totalGBP * effectiveRate);

    // Update DOM
    const outTuitionEl = document.getElementById('outTuition');
    const outMaintenanceEl = document.getElementById('outMaintenance');
    const outDependantEl = document.getElementById('outDependant');
    const dependantRowEl = document.getElementById('dependantRow');
    const outTotalGBPEl = document.getElementById('outTotalGBP');
    const outNairaEl = document.getElementById('outNaira');
    const calcWaBtnEl = document.getElementById('calcWaBtn');

    if (outTuitionEl) outTuitionEl.textContent = `£${outstandingTuition.toLocaleString()}`;
    if (outMaintenanceEl) outMaintenanceEl.textContent = `£${studentMaintenance.toLocaleString()}`;
    
    if (dependantRowEl && outDependantEl) {
        if (dependants > 0) {
            dependantRowEl.style.display = 'flex';
            outDependantEl.textContent = `£${dependantMaintenance.toLocaleString()} (${dependants} dep.)`;
        } else {
            dependantRowEl.style.display = 'none';
        }
    }

    if (outTotalGBPEl) outTotalGBPEl.textContent = `£${totalGBP.toLocaleString()}`;
    if (outNairaEl) outNairaEl.textContent = `₦${totalNGN.toLocaleString()}`;

    // Update WhatsApp CTA Message
    if (calcWaBtnEl) {
        const locLabel = isLondon ? 'Inside London' : 'Outside London';
        const msg = `Hello Fyzzo Voyage, I used your UK Student Visa Calculator. Location: ${locLabel}, Outstanding Tuition: £${outstandingTuition.toLocaleString()}, Total Estimated Evidence: £${totalGBP.toLocaleString()} (approx ₦${totalNGN.toLocaleString()}). I would like to review my financial documentation.`;
        calcWaBtnEl.href = `https://wa.me/${CONFIG.whatsappClean}?text=${encodeURIComponent(msg)}`;
    }
}

// ==========================================================================
// 3. NAVIGATION & MOBILE DRAWER
// ==========================================================================
function toggleMobileMenu() {
    const drawer = document.getElementById('mobileDrawer');
    if (drawer) {
        drawer.classList.toggle('open');
    }
}

function closeDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    if (drawer) {
        drawer.classList.remove('open');
    }
}

// ==========================================================================
// 4. CLIENT STORIES & REVIEW SYSTEM (§18)
// ==========================================================================
let adminModeActive = false;

function initReviews() {
    const defaultReviews = [
        {
            id: "rev-1",
            name: "Augustine U.",
            service: "Student Visa Support — United Kingdom",
            rating: 5,
            date: "Verified Client",
            text: "We had already started the process with another agent, but we became uncomfortable with how things were being handled. Fyzzo Voyage stepped in, reviewed my sister's documents and prepared her properly for the school interview. They conducted several mock sessions with her before the interview, and she eventually got through successfully. The support gave us confidence."
        },
        {
            id: "rev-2",
            name: "Mrs. Adebayo",
            service: "Visit Visa Support — United Kingdom",
            rating: 5,
            date: "Verified Client",
            text: "I needed to attend a professional conference in London on short notice. Fyzzo Voyage helped structure my employer documentation, conference invitation, and travel explanation letter with total clarity. The document checklist made everything straightforward, and the visa was granted smoothly."
        },
        {
            id: "rev-3",
            name: "Chinedu O.",
            service: "Study Abroad Support — Canada",
            rating: 5,
            date: "Verified Client",
            text: "I had a four-year study gap after my first degree and was worried about explaining it. The team helped me align my genuine work experience with my intended postgraduate course in Canada. Their guidance on drafting my study plan and organizing my sponsor documents was invaluable."
        }
    ];

    const stored = localStorage.getItem('fyzzo_voyage_reviews_v2');
    if (!stored) {
        localStorage.setItem('fyzzo_voyage_reviews_v2', JSON.stringify(defaultReviews));
    }
    renderReviews();
}

function renderReviews() {
    const grid = document.getElementById('dynamicReviewsGrid');
    if (!grid) return;

    const stored = localStorage.getItem('fyzzo_voyage_reviews_v2');
    const reviews = stored ? JSON.parse(stored) : [];

    if (reviews.length === 0) {
        grid.innerHTML = `<p class="text-center" style="grid-column: 1/-1; color: #64748B;">No client reviews submitted yet.</p>`;
        return;
    }

    grid.innerHTML = reviews.map(rev => `
        <div class="story-card" id="card-${rev.id}">
            <div class="story-card-top">
                <div class="story-stars">${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}</div>
                <span class="story-date">${escapeHTML(rev.date || 'Verified Client')}</span>
            </div>
            <p class="story-quote">"${escapeHTML(rev.text)}"</p>
            <div class="story-author-box">
                <div class="author-avatar">${getInitials(rev.name)}</div>
                <div class="author-meta">
                    <strong>${escapeHTML(rev.name)}</strong>
                    <span>${escapeHTML(rev.service)}</span>
                </div>
            </div>
            ${adminModeActive ? `<button class="btn btn-outline-dark" style="margin-top: 12px; color: #DC2626; border-color: #FCA5A5;" onclick="deleteReview('${rev.id}')">🗑️ Delete Review</button>` : ''}
        </div>
    `).join('');
}

function handleReviewSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('revName').value.trim();
    const service = document.getElementById('revService').value;
    const rating = parseInt(document.getElementById('revRating').value, 10);
    const text = document.getElementById('revText').value.trim();

    if (!name || !text) return;

    const newRev = {
        id: "rev-" + Date.now(),
        name: name,
        service: service,
        rating: rating,
        date: "Recently Submitted",
        text: text
    };

    const stored = localStorage.getItem('fyzzo_voyage_reviews_v2');
    const reviews = stored ? JSON.parse(stored) : [];
    reviews.unshift(newRev);
    localStorage.setItem('fyzzo_voyage_reviews_v2', JSON.stringify(reviews));

    closeReviewModal();
    renderReviews();
    showToast("🎉 Thank you! Your client story has been received.");
}

function deleteReview(revId) {
    if (!confirm("Are you sure you want to remove this client story?")) return;
    const stored = localStorage.getItem('fyzzo_voyage_reviews_v2');
    if (!stored) return;
    let reviews = JSON.parse(stored);
    reviews = reviews.filter(r => r.id !== revId);
    localStorage.setItem('fyzzo_voyage_reviews_v2', JSON.stringify(reviews));
    renderReviews();
    showToast("Review deleted successfully.");
}

function toggleReviewAdmin() {
    if (adminModeActive) {
        adminModeActive = false;
        document.getElementById('adminReviewBanner').style.display = 'none';
        document.getElementById('adminToggleBtn').textContent = '🔒 Staff Moderation';
        renderReviews();
        showToast("Admin mode exited.");
        return;
    }

    const pin = prompt("Enter Staff Moderation PIN:");
    if (pin === CONFIG.adminPin) {
        adminModeActive = true;
        document.getElementById('adminReviewBanner').style.display = 'block';
        document.getElementById('adminToggleBtn').textContent = '🔓 Exit Admin Mode';
        renderReviews();
        showToast("Admin mode enabled. You can now delete any review card.");
    } else if (pin !== null) {
        alert("Incorrect PIN.");
    }
}

function openReviewModal() {
    const modal = document.getElementById('reviewSubmissionModal');
    if (modal) modal.style.display = 'flex';
}

function closeReviewModal() {
    const modal = document.getElementById('reviewSubmissionModal');
    if (modal) modal.style.display = 'none';
}

// ==========================================================================
// 5. START YOUR JOURNEY / INTAKE FORM HANDLER (§25)
// ==========================================================================
function handleJourneySubmit(e) {
    e.preventDefault();
    const form = document.getElementById('journeyIntakeForm');
    if (!form) return;

    const fullName = document.getElementById('fullName').value.trim();
    const whatsapp = document.getElementById('whatsappNumber').value.trim();
    const email = document.getElementById('emailAddress').value.trim();
    const destination = document.getElementById('targetDestination').value;
    const service = document.getElementById('serviceRequired').value;
    const intakeDate = document.getElementById('preferredDate').value;
    const currentSituation = document.getElementById('currentSituation').value.trim();

    // Construct formatted message
    const summaryMsg = `Hello Fyzzo Voyage, I submitted an intake form on your website:\n\n👤 Name: ${fullName}\n📞 WhatsApp: ${whatsapp}\n✉️ Email: ${email}\n🌍 Destination: ${destination}\n📋 Service: ${service}\n⏳ Target Date: ${intakeDate}\n📝 Notes: ${currentSituation || 'None'}\n\nI would like to discuss my next steps.`;

    showToast("✅ Application details received! Redirecting to WhatsApp...");
    
    setTimeout(() => {
        window.open(`https://wa.me/${CONFIG.whatsappClean}?text=${encodeURIComponent(summaryMsg)}`, '_blank');
        form.reset();
    }, 1200);
}

// ==========================================================================
// 6. LEGAL MODALS (Visa Disclaimer, Terms, Privacy, Refund §31)
// ==========================================================================
const LEGAL_CONTENT = {
    disclaimer: {
        title: "Statutory Visa & Immigration Disclaimer",
        body: `<p><strong>1. Final Statutory Decision Authority:</strong><br>
        All visa, immigration, admission, and border control decisions are made solely by the respective national embassies, consulates, immigration authorities (such as UK Visas and Immigration, Immigration, Refugees and Citizenship Canada, US Department of State), and educational institutions.</p>
        <p><strong>2. No Guarantee of Outcomes:</strong><br>
        Fyzzo Voyage does not guarantee visa approvals, university admissions, or specific immigration outcomes. Our role is strictly advisory, providing structured documentation review, application preparation, and credibility coaching.</p>
        <p><strong>3. Document Integrity:</strong><br>
        Fyzzo Voyage strictly adheres to lawful immigration practices and does NOT create, alter, manufacture, or provide artificial or false financial evidence. Clients are solely responsible for providing genuine, verifiable documentation.</p>`
    },
    terms: {
        title: "Terms of Service",
        body: `<p><strong>1. Service Scope:</strong><br>
        Fyzzo Voyage provides professional advisory, application preparation, educational guidance, and travel planning services. Fees paid to Fyzzo Voyage cover professional time, guidance, and document audit.</p>
        <p><strong>2. Third-Party Costs:</strong><br>
        Statutory third-party fees (embassy visa application fees, biometric fees, medical examination costs, IHS healthcare surcharges, university deposits, flight tickets, and hotel tariffs) are separate from Fyzzo Voyage service fees and are payable directly to the respective authorities or providers.</p>
        <p><strong>3. Client Cooperation:</strong><br>
        Clients agree to provide accurate, complete, and timely documentation. Fyzzo Voyage is not liable for application delays or refusals arising from non-disclosure, inaccurate client information, or delayed submissions.</p>`
    },
    privacy: {
        title: "Privacy & Data Protection Policy",
        body: `<p><strong>1. Data Collection:</strong><br>
        We collect personal contact information (name, email, phone number, academic records, and travel preferences) solely for the purpose of assessing eligibility, providing advisory services, and preparing applications.</p>
        <p><strong>2. Data Protection:</strong><br>
        Your data is treated with strict confidentiality. We do not sell, rent, or distribute client personal information to third-party marketing companies.</p>
        <p><strong>3. Consent:</strong><br>
        By submitting an inquiry or application form, you consent to our advisors contacting you via WhatsApp, email, or telephone regarding your travel and study inquiries.</p>`
    },
    refund: {
        title: "Refund & Cancellation Policy",
        body: `<p><strong>1. Professional Service Fees:</strong><br>
        Fyzzo Voyage service fees cover professional advisory work, application preparation, and document audits commenced immediately upon engagement. Once document review or advisory work has commenced, service fees are non-refundable.</p>
        <p><strong>2. Third-Party Payments:</strong><br>
        Statutory fees paid to embassies, universities, airlines, or hotels are subject to the respective third-party cancellation policies.</p>
        <p><strong>3. Service Cancellation:</strong><br>
        If a client chooses to cancel a service prior to document review or submission, any unutilized portion of the advisory fee may be held as credit toward future services at Fyzzo Voyage's discretion.</p>`
    }
};

function openLegalModal(type) {
    const modal = document.getElementById('legalModal');
    const titleEl = document.getElementById('legalModalTitle');
    const bodyEl = document.getElementById('legalModalBody');

    if (!modal || !titleEl || !bodyEl) return;

    const content = LEGAL_CONTENT[type] || LEGAL_CONTENT.disclaimer;
    titleEl.textContent = content.title;
    bodyEl.innerHTML = content.body;
    modal.style.display = 'flex';
}

function closeLegalModal() {
    const modal = document.getElementById('legalModal');
    if (modal) modal.style.display = 'none';
}

// ==========================================================================
// 7. FYVOY AI ASSISTANT 2.0 (Conversational Advisory Engine §35)
// ==========================================================================
const fyvoyState = {
    step: 'ask_name', // 'ask_name' -> 'interactive'
    userName: '',
    history: []
};

function toggleFyvoyChat() {
    const windowEl = document.getElementById('fyvoyChatWindow');
    if (windowEl) {
        const isHidden = (windowEl.style.display === 'none' || windowEl.style.display === '');
        windowEl.style.display = isHidden ? 'flex' : 'none';
    }
}

function clearFyvoyChat() {
    fyvoyState.step = 'ask_name';
    fyvoyState.userName = '';
    const bodyEl = document.getElementById('fyvoyChatBody');
    if (bodyEl) {
        bodyEl.innerHTML = `
            <div class="fyvoy-system-notice">
                <span>⚡ Fyzzo Voyage 2.0 • Study. Travel. Relocate. With Confidence.</span>
            </div>
            <div class="fyvoy-message fyvoy-msg-bot">
                <div class="fyvoy-msg-avatar">🤖</div>
                <div class="fyvoy-msg-bubble">
                    <p>👋 Hello! I am <strong>Fyvoy</strong>, your 24/7 AI Travel & Admissions Assistant at Fyzzo Voyage.</p>
                    <p>Before we begin, <strong>may I have your name please?</strong> 😊</p>
                </div>
            </div>
        `;
    }
}

function handleFyvoySubmit(e) {
    e.preventDefault();
    const inputEl = document.getElementById('fyvoyUserInput');
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';

    appendFyvoyMessage('user', text);
    processFyvoyMessage(text);
}

function handleFyvoyChip(chipText) {
    appendFyvoyMessage('user', chipText);
    processFyvoyMessage(chipText);
}

function appendFyvoyMessage(sender, text) {
    const bodyEl = document.getElementById('fyvoyChatBody');
    if (!bodyEl) return;

    const isBot = (sender === 'bot');
    const msgDiv = document.createElement('div');
    msgDiv.className = `fyvoy-message ${isBot ? 'fyvoy-msg-bot' : 'fyvoy-msg-user'}`;
    msgDiv.innerHTML = `
        <div class="fyvoy-msg-avatar">${isBot ? '🤖' : '👤'}</div>
        <div class="fyvoy-msg-bubble">
            <p>${text.replace(/\n/g, '<br>')}</p>
        </div>
    `;
    bodyEl.appendChild(msgDiv);
    bodyEl.scrollTop = bodyEl.scrollHeight;
}

function processFyvoyMessage(userInput) {
    const bodyEl = document.getElementById('fyvoyChatBody');
    
    // Step 1: Capture Name
    if (fyvoyState.step === 'ask_name') {
        fyvoyState.userName = userInput.replace(/^(my name is|i am|i'm|this is)\s*/i, '').trim();
        fyvoyState.step = 'interactive';
        
        setTimeout(() => {
            appendFyvoyMessage('bot', `Pleased to meet you, **${fyvoyState.userName}**! ✨\n\nHow can Fyzzo Voyage assist you today?\n• 🎓 **January 2027 Study Abroad Admissions**\n• 🧮 **UK Visa Financial Requirement Guidance**\n• 📄 **Visit / Tourist Visa Document Checklists**\n• ✈️ **Flight & Accommodation Booking**\n• 💬 **Connect with a Senior Human Advisor**`);
        }, 600);
        return;
    }

    // Step 2: Intelligent Knowledge Matching
    const lower = userInput.toLowerCase();

    setTimeout(() => {
        if (lower.includes('january') || lower.includes('study') || lower.includes('admission') || lower.includes('university') || lower.includes('school')) {
            appendFyvoyMessage('bot', `Great question, ${fyvoyState.userName}! For the **January 2027 Intake**, we provide:\n\n1. **University Selection Guidance:** Identifying suitable courses across UK, Canada, Ireland and Europe.\n2. **Statement of Purpose (SOP) Guidance:** Structuring a compelling academic intent letter.\n3. **CAS / I-20 Support & Tracking:** Working alongside your institution.\n4. **Student Visa Preparation:** Comprehensive document audits.\n\nOur full Study Abroad Advisory Suite is **₦500,000**. Would you like to start your application plan?`);
        } 
        else if (lower.includes('pof') || lower.includes('fund') || lower.includes('bank') || lower.includes('maintenance') || lower.includes('financial') || lower.includes('calculator')) {
            appendFyvoyMessage('bot', `Under official UK Student Visa guidelines, you are required to hold:\n\n• **London:** £1,529/month (max £13,761 for 9 months)\n• **Outside London:** £1,171/month (max £10,539 for 9 months)\n+ any outstanding Year 1 tuition fee in your bank account for 28 consecutive days.\n\n💡 *Fyzzo Voyage provides Proof of Funds Readiness Reviews (₦100,000) to ensure your genuine bank statements satisfy every criteria.*`);
        }
        else if (lower.includes('visit') || lower.includes('tourist') || lower.includes('conference') || lower.includes('family')) {
            appendFyvoyMessage('bot', `For **Visit & Family Visas (₦380,000 service fee)**, our support includes:\n\n• Custom document checklist for your profile\n• Professionally prepared Cover Letter / Travel Explanation\n• Online application review & civil ties audit\n• Biometric scheduling assistance\n\nWe cover UK, Canada, USA, Schengen, and other destinations.`);
        }
        else if (lower.includes('flight') || lower.includes('ticket') || lower.includes('hotel') || lower.includes('fare') || lower.includes('accommodation')) {
            appendFyvoyMessage('bot', `Our Travel Desk assists with:\n\n• **Flight Booking:** Comparing available flight options, routes, and student baggage allowances.\n• **Accommodation Options:** Identifying verified hotels or student halls near your campus/centre.\n• **Airport Transfers:** Coordinating verified terminal pickups.\n\nService fee for flight & accommodation sourcing is **₦15,000**.`);
        }
        else if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('rate')) {
            appendFyvoyMessage('bot', `Here is our transparent service fee summary:\n\n• **Study Abroad Guidance Suite:** ₦500,000\n• **Visit & Family Visa Support:** ₦380,000\n• **Visa Refusal Review & Roadmap:** ₦380,000\n• **Proof of Funds Readiness Review:** ₦100,000\n• **SOP / Personal Statement Guidance:** ₦100,000\n• **1-on-1 Mock Visa Interview Prep:** ₦100,000\n• **Flight & Accommodation Sourcing:** ₦15,000\n\n*Note: Statutory embassy/university fees are paid directly to the authorities.*`);
        }
        else if (lower.includes('human') || lower.includes('advisor') || lower.includes('whatsapp') || lower.includes('speak') || lower.includes('call')) {
            appendFyvoyMessage('bot', `You can chat directly with our Senior Advisory Desk on WhatsApp right now:\n\n👉 **<a href="https://wa.me/${CONFIG.whatsappClean}?text=${encodeURIComponent('Hello Fyzzo Voyage, I was chatting with Fyvoy AI and would like to speak with a Senior Advisor.')}" target="_blank" style="color: #10B981; font-weight: 800;">Click Here to Open WhatsApp (08062499796)</a>**`);
        }
        else {
            appendFyvoyMessage('bot', `Thank you for sharing, ${fyvoyState.userName}. To ensure you receive structured, personalized guidance tailored to your specific situation, let's connect you with our Advisory Desk.\n\nYou can fill out our **<a href="#contact" style="color: var(--gold); font-weight: 700;">Start Your Journey Form</a>** or message us directly on WhatsApp at **08062499796**.`);
        }
    }, 600);
}

// ==========================================================================
// 8. HELPERS & TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 4000);
}

function escapeHTML(str) {
    return str ? str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag)) : '';
}

function getInitials(name) {
    if (!name) return 'FV';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

// ==========================================================================
// 9. INITIALIZATION ON DOM LOAD
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile toggle listener
    const toggleBtn = document.getElementById('mobileToggle');
    const closeBtn = document.getElementById('drawerClose');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // 2. Initialize UK Financial Calculator
    recalculateUKFinancials();

    // 3. Initialize Reviews
    initReviews();

    // 4. Smooth Anchor Scrolling & Active Nav Link Highlight
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length <= 1) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    console.log("Fyzzo Voyage 2.0 digital platform initialized successfully.");
});
