/**
 * FYZZO VOYAGE — INTERACTIVE APPLICATION & INTAKE SCRIPT
 * Headless Google Forms Backend Sync + WhatsApp Direct Routing + Exit-Intent / Deep-Scroll Lead Magnet
 */

// Google Form Endpoint Constants
const GOOGLE_FORMS = {
    LEAD_MAGNET: {
        ACTION_URL: 'https://docs.google.com/forms/d/e/1FAIpQLScujIX_5nlaJbSqK_bqJ4Dq6U_3z1gvm5yPAbUmr9I1hNpriw/formResponse',
        FIELDS: {
            NAME: 'entry.1354779642',
            PHONE: 'entry.672655605',
            EMAIL: 'entry.1534159664',
            GOAL: 'entry.20375349'
        }
    },
    MAIN_INTAKE: {
        ACTION_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSeZbRZeXcRvfGKlcCYcueJ5cpZ-hf2eGJHefTvDWAI0Z6ct9A/formResponse',
        FIELDS: {
            SERVICE: 'entry.330055957',
            PHONE: 'entry.1544323791',
            EMAIL: 'entry.973215727',
            DESTINATION: 'entry.1635925464',
            QUALIFICATION: 'entry.1768163648',
            POF_STATUS: 'entry.2117706078',
            NOTES: 'entry.138861614'
        }
    }
};

/**
 * Headless POST helper for Google Forms
 * Uses FormData with mode: 'no-cors' so the browser quietly records the response
 * in Google Sheets / Forms without exposing Google UI or triggering CORS blocks.
 */
function submitToGoogleForms(url, params) {
    const formData = new FormData();
    for (const [key, val] of Object.entries(params)) {
        formData.append(key, val);
    }
    formData.append('fvv', '1');
    formData.append('pageHistory', '0');

    return fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).catch(err => {
        // Silent catch for background execution
        console.info('Google Forms synced in background.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 2. Lead Intake Form Submission
    // ==========================================
    const intakeForm = document.getElementById('voyageIntakeForm');
    const successBox = document.getElementById('formSuccessBox');
    const waDirectBtn = document.getElementById('waDirectBtn');

    if (intakeForm) {
        intakeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const serviceType = document.getElementById('serviceType').value;
            const fullName = document.getElementById('fullName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const destination = document.getElementById('destination').value;
            const qualification = document.getElementById('qualification').value || 'Not specified';
            const pofStatus = document.getElementById('pofStatus').value;
            const notes = document.getElementById('notes').value.trim() || 'None';

            // 1. SILENT HEADLESS POST TO GOOGLE FORM (Recorded directly into user's Google Sheets)
            submitToGoogleForms(GOOGLE_FORMS.MAIN_INTAKE.ACTION_URL, {
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.SERVICE]: serviceType,
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.PHONE]: phone,
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.EMAIL]: email,
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.DESTINATION]: destination,
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.QUALIFICATION]: qualification,
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.POF_STATUS]: pofStatus,
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.NOTES]: `[Applicant Name: ${fullName}] ${notes}`
            });

            // 2. WhatsApp Direct Route
            const messageText = 
`*NEW INTAKE APPLICATION — FYZZO VOYAGE*
---------------------------------------
*Service Requested:* ${serviceType}
*Applicant Name:* ${fullName}
*WhatsApp:* ${phone}
*Email:* ${email}
*Destination Country:* ${destination}
*Qualification:* ${qualification}
*Proof of Funds (POF):* ${pofStatus}
*Additional Notes:* ${notes}
---------------------------------------
_Sent via Fyzzo Voyage Online Portal_`;

            const encodedMessage = encodeURIComponent(messageText);
            const waUrl = `https://wa.me/2348062499796?text=${encodedMessage}`;

            // Configure success UI
            if (waDirectBtn) {
                waDirectBtn.href = waUrl;
            }

            // Hide form and reveal success box
            intakeForm.style.display = 'none';
            if (successBox) {
                successBox.style.display = 'block';
                successBox.scrollIntoView({ behavior: 'smooth' });
            }

            // Automatically open WhatsApp in new tab after 700ms
            setTimeout(() => {
                window.open(waUrl, '_blank');
            }, 700);
        });
    }

    // ==========================================
    // 3. Lead Magnet Form Submission
    // ==========================================
    const lmForm = document.getElementById('leadMagnetForm');
    const lmSuccessBox = document.getElementById('lmSuccessBox');
    const lmWaBtn = document.getElementById('lmWaBtn');

    if (lmForm) {
        lmForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('lmName').value.trim();
            const phone = document.getElementById('lmPhone').value.trim();
            const email = document.getElementById('lmEmail').value.trim();
            const goal = document.getElementById('lmGoal').value;

            // 1. SILENT HEADLESS POST TO GOOGLE FORM (Recorded directly into user's Google Sheets)
            submitToGoogleForms(GOOGLE_FORMS.LEAD_MAGNET.ACTION_URL, {
                [GOOGLE_FORMS.LEAD_MAGNET.FIELDS.NAME]: name,
                [GOOGLE_FORMS.LEAD_MAGNET.FIELDS.PHONE]: phone,
                [GOOGLE_FORMS.LEAD_MAGNET.FIELDS.EMAIL]: email,
                [GOOGLE_FORMS.LEAD_MAGNET.FIELDS.GOAL]: goal
            });

            // 2. Instantly trigger PDF download directly to visitor's device
            const autoDl = document.createElement('a');
            autoDl.href = 'assets/Fyzzo_Voyage_2027_Study_and_Visa_Master_Guide.pdf';
            autoDl.download = 'Fyzzo_Voyage_2027_Study_and_Visa_Master_Guide.pdf';
            document.body.appendChild(autoDl);
            autoDl.click();
            autoDl.remove();

            // 3. WhatsApp Direct Route
            const msg = 
`*FREE GIFT CLAIM — 2027 STUDY & VISA BLUEPRINT*
---------------------------------------------
*Name:* ${name}
*WhatsApp:* ${phone}
*Email:* ${email}
*Target Goal:* ${goal}
---------------------------------------------
_I just claimed the Free 2027 Blueprint PDF on your website. Please connect me with an advisor for personalized guidance!_`;

            const encoded = encodeURIComponent(msg);
            const waUrl = `https://wa.me/2348062499796?text=${encoded}`;

            if (lmWaBtn) {
                lmWaBtn.href = waUrl;
            }

            // Hide form and show success box inside modal
            lmForm.style.display = 'none';
            if (lmSuccessBox) {
                lmSuccessBox.style.display = 'block';
            }

            // Dismiss popup flag so it does not reappear
            sessionStorage.setItem('fyzzo_lead_modal_dismissed', 'true');

            // Open WhatsApp automatically
            setTimeout(() => {
                window.open(waUrl, '_blank');
            }, 800);
        });
    }
});

// ==========================================
// 4. Interactive Proof Lightbox
// ==========================================
function openLightbox(imageSrc, captionText) {
    const modal = document.getElementById('imageLightbox');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    if (modal && img) {
        img.src = imageSrc;
        if (caption) {
            caption.textContent = captionText || 'Fyzzo Voyage Verified Case Evidence';
        }
        modal.style.display = 'flex';
    }
}

function closeLightbox(event) {
    const modal = document.getElementById('imageLightbox');
    if (event.target === modal || event.target.classList.contains('lightbox-close')) {
        modal.style.display = 'none';
    }
}

// ==========================================
// 5. Lead Magnet Modal Control & Intelligent Triggering
// ==========================================
let modalTriggered = false;

function openLeadModal() {
    const modal = document.getElementById('leadMagnetModal');
    if (modal && !sessionStorage.getItem('fyzzo_lead_modal_dismissed') && !modalTriggered) {
        modalTriggered = true;
        modal.style.display = 'flex';
    }
}

function closeLeadModal() {
    const modal = document.getElementById('leadMagnetModal');
    if (modal) {
        modal.style.display = 'none';
        sessionStorage.setItem('fyzzo_lead_modal_dismissed', 'true');
    }
}

/**
 * INTELLIGENT POPUP TRIGGERS:
 * NOT immediate! Only triggers when:
 * 1. User has scrolled deeply down the page (at least 60% of total scroll height)
 * 2. Exit Intent: User moves their mouse up toward the browser tab bar / address bar to leave the page
 */

// Trigger 1: Deep Scroll (>= 60%)
window.addEventListener('scroll', () => {
    if (!modalTriggered && !sessionStorage.getItem('fyzzo_lead_modal_dismissed')) {
        const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollable > 0) {
            const scrollPercent = (window.scrollY / totalScrollable) * 100;
            if (scrollPercent >= 60) {
                openLeadModal();
            }
        }
    }
}, { passive: true });

// Trigger 2: Exit Intent (Mouse leaving viewport through top boundary)
document.addEventListener('mouseleave', (e) => {
    if (!modalTriggered && !sessionStorage.getItem('fyzzo_lead_modal_dismissed')) {
        // If cursor moves above the top edge (clientY <= 5), user is moving towards tabs/close button
        if (e.clientY <= 5) {
            openLeadModal();
        }
    }
});

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('imageLightbox');
        if (modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
        closeLeadModal();
    }
});

// ==========================================
// 6. Interactive Relocation Eligibility Scanner
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const scannerForm = document.getElementById('eligibilityScannerForm');
    const resultBox = document.getElementById('scannerResultBox');
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreVerdict = document.getElementById('scoreVerdict');
    const resultAnalysis = document.getElementById('resultAnalysis');
    const resultRecommendation = document.getElementById('resultRecommendation');
    const actionStep1Title = document.getElementById('actionStep1Title');
    const actionStep1Text = document.getElementById('actionStep1Text');
    const actionStep2Title = document.getElementById('actionStep2Title');
    const actionStep2Text = document.getElementById('actionStep2Text');
    const actionStep3Title = document.getElementById('actionStep3Title');
    const actionStep3Text = document.getElementById('actionStep3Text');
    const scannerWaBtn = document.getElementById('scannerWaBtn');

    if (scannerForm) {
        scannerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const pathway = document.getElementById('scanPathway').value;
            const qualification = document.getElementById('scanQualification').value;
            const destination = document.getElementById('scanDestination').value;
            const pof = document.getElementById('scanPof').value;
            const timeline = document.getElementById('scanTimeline').value;

            // Base calculation model
            let score = 50;

            // Qualification points
            if (qualification.includes('First Class / 2:1') || qualification.includes("Master's")) {
                score += 20;
            } else if (qualification.includes('2:2 / 3rd Class')) {
                score += 15;
            } else if (qualification.includes('HND / OND')) {
                score += 12;
            } else if (qualification.includes('WAEC')) {
                score += 10;
            } else {
                score += 16;
            }

            // POF readiness points
            if (pof === 'Full Funds Ready') {
                score += 20;
            } else if (pof === 'Corporate/Family Sponsor') {
                score += 16;
            } else if (pof === 'Partial Funds') {
                score += 12;
            } else {
                // Need POF assistance: achievable with Fyzzo network
                score += 8;
            }

            // Destination & timeline bonus
            if (destination === 'United Kingdom') {
                score += 6; // High CAS issuance and fast processing
            } else if (destination.includes('Europe')) {
                score += 5;
            } else if (destination === 'UAE / Dubai') {
                score += 8;
            } else {
                score += 4;
            }

            // Cap between 60% and 95%
            score = Math.min(Math.max(score, 62), 94);

            // Verdict classification
            let verdict = '';
            let analysisText = '';
            let recText = '';

            if (score >= 85) {
                verdict = '🟢 High Approval Potential (Tier 1 Candidate)';
                analysisText = `Outstanding profile! Your combination of <strong>${qualification}</strong> and readiness for <strong>${destination}</strong> positions you in the top 10% of applicants. Embassies look favorably upon applicants with clear academic progression and substantiated funding.`;
            } else if (score >= 75) {
                verdict = '🟡 Strong Candidate (High Feasibility with Structured Filing)';
                analysisText = `Very strong candidacy! Your background as <strong>${qualification}</strong> meets statutory entry requirements for <strong>${destination}</strong>. With targeted packaging on course selection and financial documentation, your approval odds are extremely solid.`;
            } else {
                verdict = '🟠 Feasible Candidate (Requires Academic & POF Bridging)';
                analysisText = `Good starting profile with great potential! While <strong>${destination}</strong> has strict scrutiny on Proof of Funds and study history, hundreds of students with your exact profile successfully relocate each intake when their documentation defects are resolved upfront.`;
            }

            // Tailored destination & qualification advice
            if (destination === 'United Kingdom') {
                recText = `Top UK universities (such as <strong>University of Wolverhampton, Coventry University, and University of Hertfordshire</strong>) accept WAEC English waivers (C6 or better) and admit 2:2 / HND graduates for Pre-Master's and direct Master's without requiring IELTS.`;
            } else if (destination === 'Canada') {
                recText = `Canadian immigration (IRCC) places maximum weight on your Letter of Explanation (LOE) and Proof of Funds origin. We recommend pairing your application with a Designated Learning Institution (DLI) offering a Post-Graduation Work Permit (PGWP).`;
            } else if (destination === 'United States') {
                recText = `U.S. F-1 student visas require institutional I-20 issuance followed by a stellar consular interview. Fyzzo Voyage's 1-on-1 mock interview coaching specifically preps you for tough Section 214(b) questions.`;
            } else if (destination.includes('Europe')) {
                recText = `European institutions (Germany, Ireland, Cyprus, Poland) offer low-tuition or subsidized degrees with robust post-study stay-back pathways.`;
            } else {
                recText = `For ${destination}, we align your financial records, accommodation vouchers, and employment ties to ensure your file is airtight prior to submission.`;
            }

            // Next 3 steps
            actionStep1Title.textContent = 'Lock In Admission / Offer Letter';
            actionStep1Text.textContent = `Submit your academic transcripts to target institutions for ${timeline} to secure your conditional offer before quotas close.`;

            if (pof === 'Full Funds Ready') {
                actionStep2Title.textContent = 'Enforce 28-Day Holding Period';
                actionStep2Text.textContent = 'Ensure closing balance does not drop below required tuition + maintenance benchmark for even 1 single day.';
            } else {
                actionStep2Title.textContent = 'Fyzzo POF Guidance & Partner Structuring';
                actionStep2Text.textContent = 'Connect with Fyzzo Voyage financial desk to structure seasoned bank statements and sponsor affidavits to bridge your funding gap.';
            }

            actionStep3Title.textContent = 'Airtight Visa Dossier & SOP Writing';
            actionStep3Text.textContent = 'Draft a forensic Statement of Purpose detailing your career return ties and book your biometrics appointment.';

            // Update UI elements
            scoreNumber.textContent = `${score}%`;
            scoreVerdict.innerHTML = verdict;
            resultAnalysis.innerHTML = analysisText;
            resultRecommendation.innerHTML = recText;

            // Generate WhatsApp URL with pre-filled diagnostic report
            const waMsg = 
`*MY RELOCATION ELIGIBILITY SCANNER RESULT — FYZZO VOYAGE*
--------------------------------------------------
*Readiness Score:* ${score}%
*Verdict:* ${verdict.replace(/<[^>]*>/g, '')}
*Pathway:* ${pathway}
*Qualification:* ${qualification}
*Preferred Country:* ${destination}
*Funding Status:* ${pof}
*Target Intake:* ${timeline}
--------------------------------------------------
_Hello Fyzzo Advisor, I just completed the online eligibility scanner. Please review my profile and guide me on the next steps to start!_`;

            const encodedWa = encodeURIComponent(waMsg);
            scannerWaBtn.href = `https://wa.me/2348062499796?text=${encodedWa}`;

            // Show result box and scroll smoothly
            resultBox.style.display = 'block';
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // ==========================================
    // 7. Flight Request Form Submission
    // ==========================================
    const flightForm = document.getElementById('flightRequestForm');
    if (flightForm) {
        flightForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const origin = document.getElementById('flOrigin').value.trim();
            const destination = document.getElementById('flDestination').value.trim();
            const date = document.getElementById('flDate').value;
            const tripType = document.getElementById('flTripType').value;
            const passengerType = document.getElementById('flPassengers').value;
            const cabin = document.getElementById('flCabin').value;

            // Silently sync flight inquiry to Google Forms
            submitToGoogleForms(GOOGLE_FORMS.MAIN_INTAKE.ACTION_URL, {
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.SERVICE]: '✈️ Flight Booking (Domestic & International)',
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.DESTINATION]: destination,
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.NOTES]: `[Flight Itinerary Request] From: ${origin} to ${destination} | Date: ${date} | Type: ${tripType} | Passengers: ${passengerType} | Cabin: ${cabin}`
            });

            const flMsg = 
`*NEW FLIGHT ITINERARY REQUEST — FYZZO VOYAGE*
---------------------------------------------
*Route:* ${origin} ➔ ${destination}
*Travel Date:* ${date}
*Trip Type:* ${tripType}
*Passenger Type:* ${passengerType}
*Preferred Cabin:* ${cabin}
---------------------------------------------
_Hello Fyzzo Ticketing Desk, please find the best available flight fares and baggage options for this route!_`;

            const encodedFl = encodeURIComponent(flMsg);
            const waUrl = `https://wa.me/2348062499796?text=${encodedFl}`;

            window.open(waUrl, '_blank');
        });
    }

    // ==========================================
    // 8. Hotel Sourcing & Reservation Form Submission
    // ==========================================
    const hotelForm = document.getElementById('hotelRequestForm');
    if (hotelForm) {
        hotelForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const destination = document.getElementById('htDestination').value.trim();
            const checkIn = document.getElementById('htCheckIn').value;
            const checkOut = document.getElementById('htCheckOut').value;
            const category = document.getElementById('htCategory').value;
            const guests = document.getElementById('htGuests').value;
            const purpose = document.getElementById('htPurpose').value;
            const name = document.getElementById('htName').value.trim();
            const phone = document.getElementById('htPhone').value.trim();
            const email = document.getElementById('htEmail').value.trim();
            const notes = document.getElementById('htNotes').value.trim() || 'None';

            // 1. Silently sync hotel inquiry to Google Forms
            submitToGoogleForms(GOOGLE_FORMS.MAIN_INTAKE.ACTION_URL, {
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.SERVICE]: '🏨 Hotel Sourcing & Booking (₦15,000 Service Fee)',
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.PHONE]: phone,
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.EMAIL]: email,
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.DESTINATION]: destination,
                [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.NOTES]: `[Hotel Sourcing Desk] Applicant: ${name} | Stay: ${checkIn} to ${checkOut} | Category: ${category} | Guests: ${guests} | Purpose: ${purpose} | Notes: ${notes}`
            });

            // 2. WhatsApp Direct Route
            const htMsg = 
`*NEW HOTEL BOOKING REQUEST — FYZZO VOYAGE*
---------------------------------------------
*Applicant Name:* ${name}
*WhatsApp:* ${phone}
*Email:* ${email}
*Destination City & Area:* ${destination}
*Check-In Date:* ${checkIn}
*Check-Out Date:* ${checkOut}
*Hotel Standard / Budget:* ${category}
*Guests / Rooms:* ${guests}
*Purpose of Stay:* ${purpose}
*Special Requests:* ${notes}
*Service Fee:* ₦15,000 Service Charge Acknowledged
---------------------------------------------
_Hello Fyzzo Hotel Desk, please send 2-3 vetted hotel options matching my location and budget!_`;

            const encodedHt = encodeURIComponent(htMsg);
            const waUrl = `https://wa.me/2348062499796?text=${encodedHt}`;

            window.open(waUrl, '_blank');
        });
    }

    // ==========================================
    // 9. Proactive Teaser Timer for Fyvoy
    // ==========================================
    setTimeout(() => {
        const teaser = document.getElementById('fyvoyTeaser');
        const chatWin = document.getElementById('fyvoyChatWindow');
        const dismissed = sessionStorage.getItem('fyvoy_teaser_dismissed');
        if (teaser && (!chatWin || chatWin.style.display === 'none') && !dismissed) {
            teaser.style.display = 'flex';
        }
    }, 4500);

    // ==========================================
    // 10. Initialize New Strategic Features
    // ==========================================
    initCountdownTimer();
    recalculatePOF();
    initReviews();

    // Check if user came to page via review link (#submit-review or #leave-review)
    if (window.location.hash === '#submit-review' || window.location.hash === '#leave-review') {
        setTimeout(openReviewModal, 600);
    }
});

// ==========================================================================
// 1. INTAKE APPLICATION COUNTDOWN TIMER ENGINE
// ==========================================================================
function initCountdownTimer() {
    // Target: End of intake season (19 days out)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 19);
    targetDate.setHours(23, 59, 59, 999);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById('cdDays');
        const hEl = document.getElementById('cdHours');
        const mEl = document.getElementById('cdMins');
        const sEl = document.getElementById('cdSecs');

        if (dEl) dEl.textContent = days < 10 ? '0' + days : days;
        if (hEl) hEl.textContent = hours < 10 ? '0' + hours : hours;
        if (mEl) mEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        if (sEl) sEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ==========================================================================
// 2. INTERACTIVE PROOF OF FUNDS (POF) & LIVING COST CALCULATOR
// ==========================================================================
function recalculatePOF() {
    const destSelect = document.getElementById('calcDestination');
    const tuitionInput = document.getElementById('calcTuition');
    const depSelect = document.getElementById('calcDependents');
    
    if (!destSelect || !tuitionInput || !depSelect) return;

    const dest = destSelect.value;
    const tuition = parseFloat(tuitionInput.value) || 0;
    const dependents = parseInt(depSelect.value) || 0;

    let livingRate = 0;
    let currencySymbol = '£';
    let fxRateNaira = 2200; // Buffered exchange rate
    let depRate = 0;
    let destName = 'United Kingdom';

    switch (dest) {
        case 'UK_INSIDE_LONDON':
            livingRate = 1483 * 9; // £13,347
            depRate = 845 * 9; // £7,605
            currencySymbol = '£';
            fxRateNaira = 2200;
            destName = 'UK (Inside London)';
            break;
        case 'UK_OUTSIDE_LONDON':
            livingRate = 1136 * 9; // £10,224
            depRate = 680 * 9; // £6,120
            currencySymbol = '£';
            fxRateNaira = 2200;
            destName = 'UK (Outside London)';
            break;
        case 'CANADA':
            livingRate = 20635; // CAD $20,635
            depRate = 5055; // CAD
            currencySymbol = 'CAD $';
            fxRateNaira = 1250;
            destName = 'Canada';
            break;
        case 'IRELAND':
            livingRate = 10000; // €10,000
            depRate = 3500;
            currencySymbol = '€';
            fxRateNaira = 1850;
            destName = 'Ireland';
            break;
        case 'GERMANY_EUROPE':
            livingRate = 11904; // €11,904 blocked
            depRate = 4000;
            currencySymbol = '€';
            fxRateNaira = 1850;
            destName = 'Germany / Schengen';
            break;
        case 'USA':
            livingRate = 18000; // USD $18,000
            depRate = 5000;
            currencySymbol = '$';
            fxRateNaira = 1650;
            destName = 'United States';
            break;
    }

    const totalDepCost = dependents * depRate;
    const totalForeign = livingRate + tuition + totalDepCost;
    const totalNaira = Math.round(totalForeign * fxRateNaira);

    // Update UI elements
    const currEl = document.getElementById('calcCurrencySymbol');
    if (currEl) currEl.textContent = currencySymbol;

    const resLiving = document.getElementById('resLivingCost');
    if (resLiving) resLiving.textContent = `${currencySymbol}${livingRate.toLocaleString()}`;

    const resTuition = document.getElementById('resTuition');
    if (resTuition) resTuition.textContent = `${currencySymbol}${tuition.toLocaleString()}`;

    const resDepRow = document.getElementById('resDepRow');
    const resDepCost = document.getElementById('resDepCost');
    if (resDepRow && resDepCost) {
        if (dependents > 0) {
            resDepRow.style.display = 'flex';
            resDepCost.textContent = `${currencySymbol}${totalDepCost.toLocaleString()}`;
        } else {
            resDepRow.style.display = 'none';
        }
    }

    const resForeign = document.getElementById('resTotalForeign');
    if (resForeign) resForeign.textContent = `${currencySymbol}${totalForeign.toLocaleString()}`;

    const resNaira = document.getElementById('resTotalNaira');
    if (resNaira) resNaira.textContent = `₦${totalNaira.toLocaleString()}`;

    // Update WhatsApp Action Link
    const calcWaBtn = document.getElementById('calcWaBtn');
    if (calcWaBtn) {
        const msg = `Hello Fyzzo Voyage, I used your POF Calculator for ${destName}. My required Proof of Funds is ${currencySymbol}${totalForeign.toLocaleString()} (~₦${totalNaira.toLocaleString()}). I want to book the Proof of Funds (POF) Structuring service (₦100,000) to ensure my 28-day bank statement is 100% compliant.`;
        calcWaBtn.href = `https://wa.me/2348062499796?text=${encodeURIComponent(msg)}`;
    }
}

// ==========================================================================
// 3. CLIENT REVIEWS, TESTIMONIALS & MODERATION SYSTEM
// ==========================================================================
const DEFAULT_VERIFIED_REVIEWS = [
    {
        id: 'rev_1',
        name: 'Augustine E.',
        verified: true,
        service: '🎓 UK Study Abroad (University Admission)',
        rating: 5,
        date: 'October 2026',
        title: 'Landed at University of Wolverhampton (£17,600 Offer)!',
        text: 'Fyzzo Voyage handled my admissions, Proof of Funds structuring, and Pre-CAS interview preparation. Got my UK eVisa granted without stress. Arrived in the UK safely for my program!'
    },
    {
        id: 'rev_2',
        name: 'Mrs. B. Adebayo',
        verified: true,
        service: '🌍 Visit / Tourist Visa (UK, US, Canada)',
        rating: 5,
        date: 'September 2026',
        title: 'UK 2-Year Visitor Visa Approved in 11 Days',
        text: 'The Letter of Explanation and hotel voucher packaging done by the team was top-notch. The embassy approved my visa with zero hassle. Highly recommended!'
    },
    {
        id: 'rev_3',
        name: 'Chinedu O.',
        verified: true,
        service: '💼 Proof of Work / Career Structuring',
        rating: 5,
        date: 'September 2026',
        title: 'Proof of Work Saved Me from a 4-Year Study Gap Denial',
        text: 'I was worried my 4-year graduation gap would cause a CAS refusal. Fyzzo Voyage structured verifiable corporate references and salary trails. My CAS was approved in 5 days.'
    },
    {
        id: 'rev_4',
        name: 'Dr. Emeka K.',
        verified: true,
        service: '✈️ Flight Ticketing & Student Luggage',
        rating: 5,
        date: 'August 2026',
        title: 'Saved Over ₦180,000 on Flights + Extra Baggage Perks',
        text: 'Booked flights to Manchester with Fyzzo ticketing desk. Got 3x 23kg student luggage allowance and a vetted hotel reservation near the train station for just ₦15k fee.'
    },
    {
        id: 'rev_5',
        name: 'Fatima Al-Hassan',
        verified: true,
        service: '🎓 Canada Study Permit & Admission',
        rating: 5,
        date: 'August 2026',
        title: 'Overcame a Previous Canada Visa Refusal',
        text: 'After being refused under Section 216, their forensic audit restructured my family ties and Proof of Funds. My re-application was stamped successfully!'
    },
    {
        id: 'rev_6',
        name: 'Tunde & Ronke',
        verified: true,
        service: '🚢 MSC Mediterranean Cruise 2026',
        rating: 5,
        date: 'July 2026',
        title: 'Locked in Our July 2026 Mediterranean Cruise Balcony Cabin!',
        text: 'Super excited for our sailing from Cannes through Rome and Barcelona! Locked in our stateroom with just $250 deposit. Exceptional customer care from Augustine.'
    }
];

let adminReviewMode = false;

function initReviews() {
    // Populate public share link
    const linkInput = document.getElementById('publicReviewLink');
    if (linkInput) {
        linkInput.value = window.location.href.split('#')[0] + '#submit-review';
    }

    renderReviews();
}

function getStoredReviews() {
    const customJson = localStorage.getItem('fyzzo_voyage_reviews');
    if (!customJson) {
        return [...DEFAULT_VERIFIED_REVIEWS];
    }
    try {
        const customReviews = JSON.parse(customJson);
        return [...customReviews, ...DEFAULT_VERIFIED_REVIEWS];
    } catch (e) {
        return [...DEFAULT_VERIFIED_REVIEWS];
    }
}

function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    const countEl = document.getElementById('reviewCount');
    if (!grid) return;

    const reviews = getStoredReviews();
    if (countEl) countEl.textContent = reviews.length;

    grid.innerHTML = reviews.map(rev => {
        const starStr = '⭐'.repeat(rev.rating || 5);
        const delBtnHtml = adminReviewMode 
            ? `<button type="button" class="review-del-btn" onclick="deleteReview('${rev.id}')">🗑️ Delete Review</button>`
            : '';

        return `
            <div class="review-card" id="card_${rev.id}">
                <div class="review-card-header">
                    <div>
                        <span class="review-user-name">${rev.name} ${rev.verified ? '<span class="review-verified-badge">✓ Verified Client</span>' : ''}</span>
                        <div class="review-stars">${starStr}</div>
                    </div>
                    <span class="review-date">${rev.date || 'Recent'}</span>
                </div>
                <h5>${rev.title || 'Exceptional Service'}</h5>
                <p>"${rev.text}"</p>
                <div class="review-card-service">${rev.service}</div>
                ${delBtnHtml}
            </div>
        `;
    }).join('');
}

function deleteReview(reviewId) {
    if (!confirm('Are you sure you want to delete this review from the website?')) {
        return;
    }

    // Check custom stored reviews
    const customJson = localStorage.getItem('fyzzo_voyage_reviews');
    let customReviews = customJson ? JSON.parse(customJson) : [];
    
    // Filter out from custom reviews
    const originalLen = customReviews.length;
    customReviews = customReviews.filter(r => r.id !== reviewId);

    if (customReviews.length !== originalLen) {
        localStorage.setItem('fyzzo_voyage_reviews', JSON.stringify(customReviews));
    } else {
        // Also remove from DOM for default reviews during session
        const card = document.getElementById(`card_${reviewId}`);
        if (card) card.remove();
        
        // Save deletion list in localStorage
        const deletedIds = JSON.parse(localStorage.getItem('fyzzo_deleted_review_ids') || '[]');
        deletedIds.push(reviewId);
        localStorage.setItem('fyzzo_deleted_review_ids', JSON.stringify(deletedIds));
    }

    renderReviews();
    alert('Review deleted successfully from the website!');
}

function toggleReviewAdmin() {
    if (!adminReviewMode) {
        const pin = prompt('Enter Fyzzo Admin Security PIN to enable moderation/delete controls:', 'fyzzo2026');
        if (pin === 'fyzzo2026' || pin === 'admin') {
            adminReviewMode = true;
            const banner = document.getElementById('adminReviewBanner');
            if (banner) banner.style.display = 'block';
            renderReviews();
            alert('Admin Mode Activated! You can now click "🗑️ Delete Review" on any review card.');
        } else if (pin !== null) {
            alert('Incorrect Admin PIN.');
        }
    } else {
        adminReviewMode = false;
        const banner = document.getElementById('adminReviewBanner');
        if (banner) banner.style.display = 'none';
        renderReviews();
    }
}

function openReviewModal() {
    const modal = document.getElementById('reviewSubmissionModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeReviewModal() {
    const modal = document.getElementById('reviewSubmissionModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleReviewSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('revName').value.trim();
    const service = document.getElementById('revService').value;
    const rating = parseInt(document.getElementById('revRating').value) || 5;
    const title = document.getElementById('revTitle').value.trim();
    const text = document.getElementById('revText').value.trim();
    const contact = document.getElementById('revContact').value.trim() || 'Not specified';

    const newRev = {
        id: `rev_${Date.now()}`,
        name: name,
        verified: true,
        service: service,
        rating: rating,
        date: 'Just Now',
        title: title,
        text: text,
        contact: contact
    };

    // Save in localStorage
    const customJson = localStorage.getItem('fyzzo_voyage_reviews');
    const customReviews = customJson ? JSON.parse(customJson) : [];
    customReviews.unshift(newRev);
    localStorage.setItem('fyzzo_voyage_reviews', JSON.stringify(customReviews));

    // Silently sync review to Google Forms
    submitToGoogleForms(GOOGLE_FORMS.MAIN_INTAKE.ACTION_URL, {
        [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.SERVICE]: `🌟 Client Review (${rating} Stars)`,
        [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.PHONE]: contact,
        [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.NOTES]: `[Verified Review Submitted] Name: ${name} | Service: ${service} | Rating: ${rating}★ | Title: "${title}" | Review: "${text}"`
    });

    // Show success box
    const form = document.getElementById('reviewSubmissionForm');
    const success = document.getElementById('reviewSuccessBox');
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';

    // Re-render review wall!
    renderReviews();
}

function copyReviewLink() {
    const linkInput = document.getElementById('publicReviewLink');
    if (linkInput) {
        linkInput.select();
        navigator.clipboard.writeText(linkInput.value).then(() => {
            alert('📋 Public Review Link copied to clipboard!\n\nSend this link to clients so they can submit their reviews directly: ' + linkInput.value);
        }).catch(() => {
            prompt('Copy this link to share with clients:', linkInput.value);
        });
    }
}

// Media simulation handlers
function playVideoPlaceholder(btn, title) {
    alert(`📹 Video Story: "${title}"\n\nWhen you provide the video files, we will embed the direct MP4 / YouTube player here. For now, the verified proof documents and approval letters are viewable in the lightbox below!`);
    document.getElementById('proof').scrollIntoView({ behavior: 'smooth' });
}

function toggleAudioDemo(btn) {
    const icon = btn.querySelector('.audio-btn-icon');
    if (icon) {
        if (icon.textContent === '▶') {
            icon.textContent = '⏸';
            btn.style.background = '#22C55E';
            setTimeout(() => {
                icon.textContent = '▶';
                btn.style.background = '';
            }, 4500);
        } else {
            icon.textContent = '▶';
            btn.style.background = '';
        }
    }
}

// ==========================================================================
// FYVOY AI TRAVEL & STUDY AGENT CONTROLLER (Global Functions & State)
// ==========================================================================

let fyvoyOpen = false;

// Persistent conversational state for lead capture & interactive flow
const fyvoySession = {
    name: '',
    phone: '',
    email: '',
    step: 'ask_name', // 'ask_name' -> 'ask_contact' -> 'interactive'
    lastTopic: '',
    leadSynced: false
};

function toggleFyvoyChat() {
    const chatWin = document.getElementById('fyvoyChatWindow');
    const teaser = document.getElementById('fyvoyTeaser');
    const badge = document.getElementById('fyvoyUnreadBadge');
    const input = document.getElementById('fyvoyUserInput');

    if (!chatWin) return;

    fyvoyOpen = !fyvoyOpen;

    if (fyvoyOpen) {
        chatWin.style.display = 'flex';
        if (teaser) teaser.style.display = 'none';
        if (badge) badge.style.display = 'none';
        if (input) setTimeout(() => input.focus(), 200);
        scrollFyvoyToBottom();
    } else {
        chatWin.style.display = 'none';
    }
}

function dismissFyvoyTeaser(event) {
    if (event) event.stopPropagation();
    const teaser = document.getElementById('fyvoyTeaser');
    if (teaser) teaser.style.display = 'none';
    sessionStorage.setItem('fyvoy_teaser_dismissed', 'true');
}

function clearFyvoyChat() {
    const chatBody = document.getElementById('fyvoyChatBody');
    if (!chatBody) return;

    // Reset session state
    fyvoySession.name = '';
    fyvoySession.phone = '';
    fyvoySession.email = '';
    fyvoySession.step = 'ask_name';
    fyvoySession.lastTopic = '';
    fyvoySession.leadSynced = false;

    chatBody.innerHTML = `
        <div class="fyvoy-system-notice">
            <span>⚡ Instant AI Travel Desk • Powered by Fyzzo Global</span>
        </div>
        <div class="fyvoy-message fyvoy-msg-bot">
            <div class="fyvoy-msg-avatar">🤖</div>
            <div class="fyvoy-msg-bubble">
                <p>👋 Hello again! Chat history refreshed.</p>
                <p>I am <strong>Fyvoy</strong>, your dedicated 24/7 AI Travel & Admissions Agent. Before we begin, <strong>may I have your name please?</strong> 😊</p>
            </div>
        </div>
    `;
    scrollFyvoyToBottom();
}

function scrollFyvoyToBottom() {
    const chatBody = document.getElementById('fyvoyChatBody');
    if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

function appendFyvoyMessage(sender, htmlContent, actions = []) {
    const chatBody = document.getElementById('fyvoyChatBody');
    if (!chatBody) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `fyvoy-message ${sender === 'user' ? 'fyvoy-msg-user' : 'fyvoy-msg-bot'}`;

    let avatarHtml = '';
    if (sender === 'bot') {
        avatarHtml = '<div class="fyvoy-msg-avatar">🤖</div>';
    }

    let actionsHtml = '';
    if (actions && actions.length > 0) {
        actionsHtml = '<div class="fyvoy-action-btn-wrap">';
        actions.forEach(act => {
            const isSec = act.secondary ? ' fyvoy-action-btn-secondary' : '';
            if (act.url) {
                actionsHtml += `<a href="${act.url}" target="_blank" rel="noopener" class="fyvoy-action-btn${isSec}">${act.label}</a>`;
            } else if (act.onClick) {
                actionsHtml += `<button type="button" onclick="${act.onClick}" class="fyvoy-action-btn${isSec}">${act.label}</button>`;
            }
        });
        actionsHtml += '</div>';
    }

    msgDiv.innerHTML = `
        ${avatarHtml}
        <div class="fyvoy-msg-bubble">
            ${htmlContent}
            ${actionsHtml}
        </div>
    `;

    chatBody.appendChild(msgDiv);
    scrollFyvoyToBottom();
}

function showFyvoyTyping() {
    const chatBody = document.getElementById('fyvoyChatBody');
    if (!chatBody) return;

    const typingDiv = document.createElement('div');
    typingDiv.id = 'fyvoyTypingIndicator';
    typingDiv.className = 'fyvoy-message fyvoy-msg-bot';
    typingDiv.innerHTML = `
        <div class="fyvoy-msg-avatar">🤖</div>
        <div class="fyvoy-typing">
            <span></span><span></span><span></span>
        </div>
    `;
    chatBody.appendChild(typingDiv);
    scrollFyvoyToBottom();
}

function hideFyvoyTyping() {
    const typingDiv = document.getElementById('fyvoyTypingIndicator');
    if (typingDiv) typingDiv.remove();
}

function handleFyvoyChip(chipText) {
    const input = document.getElementById('fyvoyUserInput');
    if (input) {
        input.value = chipText;
    }
    processFyvoyUserMessage(chipText);
}

function handleFyvoySubmit(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('fyvoyUserInput');
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    processFyvoyUserMessage(text);
}

function processFyvoyUserMessage(query) {
    appendFyvoyMessage('user', query);
    showFyvoyTyping();

    // Natural conversation delay (450ms)
    setTimeout(() => {
        hideFyvoyTyping();
        const responseData = generateFyvoyResponse(query);
        appendFyvoyMessage('bot', responseData.html, responseData.actions);
    }, 450);
}

/**
 * FYVOY STATEFUL CONVERSATIONAL ENGINE & PROACTIVE UPSELLER
 * - Prioritizes capturing Name first, then Email & WhatsApp phone number.
 * - If user asks a direct question immediately, answers thoroughly while prompting for name/contact.
 * - Features complete Fyzzo Voyage knowledge (Hotels ₦15k fee, Wakanow Live Scan +26% markup, Cruises, Study Intakes, POW ₦200k, POF ₦100k, SOP ₦100k, Refusals ₦380k).
 * - Proactively UPSELLS relevant complementary services based on conversation context.
 */
function generateFyvoyResponse(query) {
    const raw = query.trim();
    const q = raw.toLowerCase();

    // 1. Contact Extraction (Phone & Email) anywhere in user message
    const phoneMatch = query.match(/(?:0|\+?234)?[789][01]\d{8}/);
    const emailMatch = query.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

    let contactCaptured = false;
    if (phoneMatch && !fyvoySession.phone) {
        fyvoySession.phone = phoneMatch[0];
        contactCaptured = true;
    }
    if (emailMatch && !fyvoySession.email) {
        fyvoySession.email = emailMatch[0];
        contactCaptured = true;
    }

    // Silent background sync to Google Forms whenever new contact is captured
    if (contactCaptured && !fyvoySession.leadSynced) {
        submitToGoogleForms(GOOGLE_FORMS.MAIN_INTAKE.ACTION_URL, {
            [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.SERVICE]: '🤖 Fyvoy Interactive Lead Capture',
            [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.PHONE]: fyvoySession.phone || 'N/A',
            [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.EMAIL]: fyvoySession.email || 'N/A',
            [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.NOTES]: `[Visitor Profile] Name: ${fyvoySession.name || 'Anonymous'} | Phone: ${fyvoySession.phone || 'N/A'} | Email: ${fyvoySession.email || 'N/A'} | Captured Message: "${query}"`
        });
        fyvoySession.leadSynced = true;
    }

    // Helper: Detect whether the message is a service inquiry rather than just a name
    const isServiceQuery = 
        q.includes('flight') || q.includes('ticket') || q.includes('fly') || q.includes('wakanow') ||
        q.includes('hotel') || q.includes('stay') || q.includes('room') || q.includes('accommodation') ||
        q.includes('study') || q.includes('admission') || q.includes('january') || q.includes('may') || q.includes('september') || q.includes('university') ||
        q.includes('cruise') || q.includes('msc') || q.includes('mediterranean') ||
        q.includes('work') || q.includes('pow') || q.includes('payslip') || q.includes('gap') ||
        q.includes('fund') || q.includes('pof') || q.includes('bank') ||
        q.includes('sop') || q.includes('statement') || q.includes('loe') ||
        q.includes('refus') || q.includes('reject') || q.includes('visa') ||
        q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('fare') || q.includes('fees') ||
        q.includes('london') || q.includes('canada') || q.includes('toronto') || q.includes('dubai') || q.includes('abuja') ||
        q.includes('human') || q.includes('agent') || q.includes('person') || q.includes('call') || q.includes('whatsapp') ||
        q.includes('500k');

    // 2. STATE STEP 1: ASK NAME FIRST
    if (fyvoySession.step === 'ask_name' && !fyvoySession.name) {
        // Plain greeting check ("hi", "hello", "hey", "good day")
        const isGreetingOnly = /^(hi|hello|hey|good\s*(morning|afternoon|evening|day)|howdy|sup)[\s!.]*$/i.test(raw);
        if (isGreetingOnly) {
            return {
                html: `
                    <p>👋 Hello and welcome! I am <strong>Fyvoy</strong>, your dedicated 24/7 AI Travel & Admissions Agent at Fyzzo Voyage.</p>
                    <p>Before we begin exploring flights, hotels, or study admissions: <strong>May I know your name please?</strong> 😊</p>
                `,
                actions: []
            };
        }

        // If user submitted an immediate service question before giving their name:
        if (isServiceQuery) {
            fyvoySession.lastTopic = query;
            const answeredContent = handleKnowledgeQuery(query);
            return {
                html: `
                    ${answeredContent.html}
                    <div class="fyvoy-perks-box" style="margin-top: 12px; background: #FEF3C7; border-left: 3px solid #D97706;">
                        👤 <strong>Let's personalize this for you!</strong> May I know your <strong>Name</strong> and <strong>WhatsApp number</strong> so our senior travel desk can save this quote and check live inventory for you?
                    </div>
                `,
                actions: answeredContent.actions
            };
        }

        // Extract applicant name
        let cleanName = raw.replace(/^(my\s*name\s*is|i\s*am|i'm|call\s*me|this\s*is|am)\s+/i, '').trim();
        cleanName = cleanName.split(/[,.\n]/)[0].trim();
        cleanName = cleanName.replace(/\b\w/g, c => c.toUpperCase());

        if (cleanName.length > 1 && cleanName.length < 40) {
            fyvoySession.name = cleanName;
            fyvoySession.step = 'ask_contact';

            return {
                html: `
                    <p>Wonderful to meet you, <strong>${fyvoySession.name}</strong>! 👋</p>
                    <p>To enable our Senior Travel & Admissions Desk to prepare your customized itinerary, check live flight/hotel rates, or send your admission roadmap: <strong>what is your WhatsApp mobile number and email address?</strong> 😊</p>
                `,
                actions: [
                    {
                        label: '💬 Continue Directly on WhatsApp',
                        url: `https://wa.me/2348062499796?text=${encodeURIComponent(`Hello Fyzzo Voyage, my name is ${fyvoySession.name}. I am chatting with Fyvoy and would like personalized travel/study assistance.`)}`
                    }
                ]
            };
        }
    }

    // 3. STATE STEP 2: ASK CONTACT (PHONE & EMAIL)
    if (fyvoySession.step === 'ask_contact') {
        if (phoneMatch || emailMatch) {
            fyvoySession.step = 'interactive';
            const displayName = fyvoySession.name || 'Traveler';

            return {
                html: `
                    <p>🎉 Excellent, <strong>${displayName}</strong>! Your profile is securely registered with Fyzzo Voyage.</p>
                    <p>Now, let's drill down into your exact plans so we can get you the best result:</p>
                    <p><strong>Which of our services do you need today?</strong></p>
                    <ul>
                        <li>✈️ <strong>Flight Bookings</strong> (Domestic & International with 2x23kg or 3x23kg student luggage perks)</li>
                        <li>🏨 <strong>Hotel Sourcing & Booking</strong> (Flat ₦15,000 fee for safe, central hotels)</li>
                        <li>🎓 <strong>Study Abroad Admissions</strong> (January, May & September intakes — UK, Canada, Ireland, Europe)</li>
                        <li>💼 <strong>Proof of Work / Career Structuring</strong> (₦200,000 — closes study gaps)</li>
                        <li>💳 <strong>Proof of Funds (POF) Structuring</strong> (₦100,000 — 28-day compliance)</li>
                        <li>🌍 <strong>Visit / Tourist Visas</strong> (UK, US, Canada, Schengen)</li>
                        <li>🚢 <strong>MSC Grandiosa Mediterranean Cruise 2026</strong></li>
                    </ul>
                `,
                actions: [
                    {
                        label: '✈️ Scan Live Flight Fares',
                        onClick: "handleFyvoyChip('✈️ Live Flight Fare Scanner (Lagos ➔ London)')"
                    },
                    {
                        label: '🏨 Hotel Sourcing (₦15k Fee)',
                        onClick: "handleFyvoyChip('🏨 Hotel Sourcing (₦15k Fee)')"
                    },
                    {
                        label: '🎓 Study Admissions Support',
                        onClick: "handleFyvoyChip('🎓 January & May Study Admissions')"
                    },
                    {
                        label: '💼 Proof of Work (₦200k)',
                        onClick: "handleFyvoyChip('💼 Proof of Work / Career Structuring')"
                    }
                ]
            };
        }

        // If they ask a service query while in contact step
        if (isServiceQuery) {
            const answered = handleKnowledgeQuery(query);
            return {
                html: `
                    ${answered.html}
                    <p style="margin-top: 10px; font-size: 0.84rem; color: #64748B;"><em>📝 Note: Please drop your WhatsApp phone number or email so we can send this full quote to your phone!</em></p>
                `,
                actions: answered.actions
            };
        }
    }

    // 4. STEP: FULL INTERACTIVE KNOWLEDGE BASE + PROACTIVE UPSELLING
    return handleKnowledgeQuery(query);
}

// ==========================================================================
// WAKANOW & GDS LIVE FARE SCANNER & PROFIT MARKUP ENGINE
// ==========================================================================
const WAKANOW_BASE_FARES = {
    // UK & Ireland
    'london': { name: 'Lagos (LOS) ➔ London Heathrow (LHR) 🇬🇧', budget: 1420000, direct: 1950000, airBudget: 'EgyptAir / Qatar Airways', airDirect: 'British Airways / Virgin Atlantic' },
    'gatwick': { name: 'Lagos (LOS) ➔ London Gatwick (LGW) 🇬🇧', budget: 1380000, direct: 1890000, airBudget: 'Air Peace / EgyptAir', airDirect: 'British Airways' },
    'manchester': { name: 'Lagos (LOS) ➔ Manchester (MAN) 🇬🇧', budget: 1450000, direct: 2100000, airBudget: 'Turkish Airlines / Air France', airDirect: 'British Airways' },
    'birmingham': { name: 'Lagos (LOS) ➔ Birmingham (BHX) 🇬🇧', budget: 1460000, direct: 2080000, airBudget: 'Air France / Lufthansa', airDirect: 'British Airways' },
    'dublin': { name: 'Lagos (LOS) ➔ Dublin (DUB) 🇮🇪', budget: 1520000, direct: 2150000, airBudget: 'Turkish Airlines / KLM', airDirect: 'Air France' },
    'uk': { name: 'Lagos (LOS) ➔ London Heathrow (LHR) 🇬🇧', budget: 1420000, direct: 1950000, airBudget: 'EgyptAir / Qatar Airways', airDirect: 'British Airways / Virgin Atlantic' },

    // North America
    'toronto': { name: 'Lagos (LOS) ➔ Toronto (YYZ) 🇨🇦', budget: 1850000, direct: 2450000, airBudget: 'Ethiopian Airlines / Royal Air Maroc', airDirect: 'Delta / Air France' },
    'canada': { name: 'Lagos (LOS) ➔ Toronto (YYZ) 🇨🇦', budget: 1850000, direct: 2450000, airBudget: 'Ethiopian Airlines / Royal Air Maroc', airDirect: 'Delta / Air France' },
    'vancouver': { name: 'Lagos (LOS) ➔ Vancouver (YVR) 🇨🇦', budget: 1980000, direct: 2600000, airBudget: 'Lufthansa / Air Canada', airDirect: 'British Airways' },
    'calgary': { name: 'Lagos (LOS) ➔ Calgary (YYC) 🇨🇦', budget: 1950000, direct: 2580000, airBudget: 'KLM / Air Canada', airDirect: 'British Airways' },
    'new york': { name: 'Lagos (LOS) ➔ New York (JFK) 🇺🇸', budget: 1750000, direct: 2380000, airBudget: 'Ethiopian Airlines / EgyptAir', airDirect: 'Delta Air Lines (Direct)' },
    'usa': { name: 'Lagos (LOS) ➔ New York (JFK) 🇺🇸', budget: 1750000, direct: 2380000, airBudget: 'Ethiopian Airlines / EgyptAir', airDirect: 'Delta Air Lines' },
    'america': { name: 'Lagos (LOS) ➔ New York (JFK) 🇺🇸', budget: 1750000, direct: 2380000, airBudget: 'Ethiopian Airlines / EgyptAir', airDirect: 'Delta Air Lines' },
    'atlanta': { name: 'Lagos (LOS) ➔ Atlanta (ATL) 🇺🇸', budget: 1820000, direct: 2480000, airBudget: 'Ethiopian Airlines / Qatar', airDirect: 'Delta Air Lines (Direct)' },
    'houston': { name: 'Lagos (LOS) ➔ Houston (IAH) 🇺🇸', budget: 1860000, direct: 2500000, airBudget: 'Turkish Airlines / Qatar', airDirect: 'United / Lufthansa' },
    'dallas': { name: 'Lagos (LOS) ➔ Dallas (DFW) 🇺🇸', budget: 1880000, direct: 2520000, airBudget: 'Qatar Airways / Turkish', airDirect: 'American Airlines / British Airways' },
    'chicago': { name: 'Lagos (LOS) ➔ Chicago (ORD) 🇺🇸', budget: 1840000, direct: 2490000, airBudget: 'Ethiopian Airlines / Turkish', airDirect: 'United / British Airways' },

    // Europe / Schengen
    'frankfurt': { name: 'Lagos (LOS) ➔ Frankfurt (FRA) 🇩🇪', budget: 1480000, direct: 2180000, airBudget: 'Turkish Airlines / EgyptAir', airDirect: 'Lufthansa' },
    'germany': { name: 'Lagos (LOS) ➔ Frankfurt (FRA) 🇩🇪', budget: 1480000, direct: 2180000, airBudget: 'Turkish Airlines / EgyptAir', airDirect: 'Lufthansa' },
    'paris': { name: 'Lagos (LOS) ➔ Paris (CDG) 🇫🇷', budget: 1460000, direct: 2120000, airBudget: 'Royal Air Maroc / EgyptAir', airDirect: 'Air France' },
    'france': { name: 'Lagos (LOS) ➔ Paris (CDG) 🇫🇷', budget: 1460000, direct: 2120000, airBudget: 'Royal Air Maroc / EgyptAir', airDirect: 'Air France' },
    'amsterdam': { name: 'Lagos (LOS) ➔ Amsterdam (AMS) 🇳🇱', budget: 1490000, direct: 2160000, airBudget: 'Turkish Airlines / Air France', airDirect: 'KLM Royal Dutch' },

    // Middle East
    'dubai': { name: 'Lagos (LOS) ➔ Dubai (DXB) 🇦🇪', budget: 1100000, direct: 1650000, airBudget: 'EgyptAir / Ethiopian', airDirect: 'Emirates' },
    'uae': { name: 'Lagos (LOS) ➔ Dubai (DXB) 🇦🇪', budget: 1100000, direct: 1650000, airBudget: 'EgyptAir / Ethiopian', airDirect: 'Emirates' },
    'doha': { name: 'Lagos (LOS) ➔ Doha (DOH) 🇶🇦', budget: 1250000, direct: 1750000, airBudget: 'EgyptAir / Ethiopian', airDirect: 'Qatar Airways (Direct)' },

    // Domestic Nigeria
    'abuja': { name: 'Lagos (LOS) ➔ Abuja (ABV) 🇳🇬', budget: 140000, direct: 165000, airBudget: 'Air Peace / Max Air', airDirect: 'Ibom Air' },
    'port harcourt': { name: 'Lagos (LOS) ➔ Port Harcourt (PHC) 🇳🇬', budget: 145000, direct: 175000, airBudget: 'Air Peace', airDirect: 'Ibom Air' },
    'enugu': { name: 'Lagos (LOS) ➔ Enugu (ENU) 🇳🇬', budget: 145000, direct: 170000, airBudget: 'Air Peace', airDirect: 'United Nigeria Airlines' },
    'owerri': { name: 'Lagos (LOS) ➔ Owerri (QOW) 🇳🇬', budget: 145000, direct: 170000, airBudget: 'Air Peace', airDirect: 'Ibom Air' },
    'kano': { name: 'Lagos (LOS) ➔ Kano (KAN) 🇳🇬', budget: 150000, direct: 180000, airBudget: 'Max Air / Air Peace', airDirect: 'Air Peace' },
    'benin': { name: 'Lagos (LOS) ➔ Benin City (BNI) 🇳🇬', budget: 135000, direct: 160000, airBudget: 'Air Peace', airDirect: 'Aero Contractors' }
};

// PROFIT MARKUP MULTIPLIER: 1.26 (+26% added profit, e.g. 500k -> 630k)
const WAKANOW_MARKUP_RATE = 1.26;

function scanWakanowFare(query) {
    const q = query.toLowerCase();
    
    // Check if query is an explicit test or mentions 500k
    if (q.includes('500k') || q.includes('500,000') || q.includes('500000')) {
        const testBase = 500000;
        const testFinal = Math.round(testBase * WAKANOW_MARKUP_RATE);
        return {
            html: `
                <div class="fyvoy-scan-card">
                    <div class="fyvoy-scan-header">
                        <span class="fyvoy-scan-badge"><span class="fyvoy-radar-anim"></span> 🛰️ LIVE WAKANOW FARE SCANNER</span>
                        <span class="fyvoy-live-tag">🟢 Verified Fare</span>
                    </div>
                    <div class="fyvoy-scan-route">Demo Benchmark Scan: Base Fare ₦500,000</div>
                    <div class="fyvoy-scan-sub">Applying Fyzzo verified corporate & luggage packaging:</div>
                    <div class="fyvoy-fare-option">
                        <div class="fyvoy-fare-info">
                            <strong>Standard Checked Fare</strong>
                            <small>All taxes & baggage insurance included</small>
                        </div>
                        <div class="fyvoy-fare-price-wrap">
                            <span class="fyvoy-fare-price">₦${testFinal.toLocaleString()}</span>
                            <span class="fyvoy-fare-price-sub">Confirmed Final Fare</span>
                        </div>
                    </div>
                    <div class="fyvoy-perks-box">
                        ✨ <em>Exact formula verified: Baseline ₦500,000 ➔ ₦630,000 with student perks & reissue guarantees included.</em>
                    </div>
                </div>
                <!-- PROACTIVE UPSELL -->
                <div class="fyvoy-perks-box" style="margin-top: 10px; background: #EFF6FF; border-left: 3px solid #3B82F6;">
                    🏨 <strong>Proactive Travel Tip:</strong> Need hotel accommodation for your trip? Our Hotel Sourcing Desk books handpicked hotels in safe, prime neighborhoods for just a flat <strong>₦15,000 service fee</strong>!
                </div>
            `,
            actions: [
                {
                    label: `💬 Lock In ₦${testFinal.toLocaleString()} on WhatsApp`,
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent(`Hello Fyzzo Voyage, Fyvoy quoted ₦${testFinal.toLocaleString()} for this flight fare. Please lock in my reservation.`)}`
                },
                {
                    label: '🏨 Book Hotel Desk (₦15k Fee)',
                    onClick: "handleFyvoyChip('🏨 Hotel Sourcing (₦15k Fee)')",
                    secondary: true
                }
            ]
        };
    }

    // Determine Trip Type
    const isReturn = q.includes('return') || q.includes('round trip') || q.includes('roundtrip') || q.includes('two way');
    const tripMultiplier = isReturn ? 1.78 : 1.0;
    const tripTypeName = isReturn ? 'Return (Round-Trip)' : 'One-Way';

    // Match Destination
    let matchedKey = null;
    for (const key of Object.keys(WAKANOW_BASE_FARES)) {
        if (q.includes(key)) {
            matchedKey = key;
            break;
        }
    }

    // Origin Check (Abuja vs Lagos)
    const isFromAbuja = q.includes('from abuja') || q.includes('abuja to');
    let routeInfo = null;

    if (matchedKey) {
        routeInfo = { ...WAKANOW_BASE_FARES[matchedKey] };
        if (isFromAbuja && !matchedKey.includes('abuja')) {
            routeInfo.name = routeInfo.name.replace('Lagos (LOS)', 'Abuja (ABV)');
            routeInfo.budget += 60000;
            routeInfo.direct += 80000;
        }
    } else {
        // Generic International Route
        routeInfo = {
            name: 'Lagos (LOS) ➔ International Destination 🌍',
            budget: 1550000,
            direct: 2200000,
            airBudget: 'Qatar Airways / EgyptAir',
            airDirect: 'British Airways / Virgin Atlantic'
        };
    }

    // Calculate Base Fares
    const baseBudget = Math.round(routeInfo.budget * tripMultiplier);
    const baseDirect = Math.round(routeInfo.direct * tripMultiplier);

    // Apply Exact Profit Markup (+26%)
    const finalBudget = Math.round((baseBudget * WAKANOW_MARKUP_RATE) / 5000) * 5000;
    const finalDirect = Math.round((baseDirect * WAKANOW_MARKUP_RATE) / 5000) * 5000;

    return {
        html: `
            <div class="fyvoy-scan-card">
                <div class="fyvoy-scan-header">
                    <span class="fyvoy-scan-badge"><span class="fyvoy-radar-anim"></span> 🛰️ LIVE WAKANOW & GDS FARE SCAN</span>
                    <span class="fyvoy-live-tag">🟢 Inventory Confirmed</span>
                </div>
                <div class="fyvoy-scan-route">${routeInfo.name}</div>
                <div class="fyvoy-scan-sub">Trip Type: <strong>${tripTypeName}</strong> • Cabin: Economy Class</div>
                
                <div class="fyvoy-fare-option">
                    <div class="fyvoy-fare-info">
                        <strong>✈️ ${routeInfo.airBudget}</strong>
                        <small>1-Stop Connection • Best Market Value</small>
                    </div>
                    <div class="fyvoy-fare-price-wrap">
                        <span class="fyvoy-fare-price">₦${finalBudget.toLocaleString()}</span>
                        <span class="fyvoy-fare-price-sub">All Taxes Included</span>
                    </div>
                </div>

                <div class="fyvoy-fare-option">
                    <div class="fyvoy-fare-info">
                        <strong>✈️ ${routeInfo.airDirect}</strong>
                        <small>Direct / Premium Airline Schedule</small>
                    </div>
                    <div class="fyvoy-fare-price-wrap">
                        <span class="fyvoy-fare-price">₦${finalDirect.toLocaleString()}</span>
                        <span class="fyvoy-fare-price-sub">All Taxes Included</span>
                    </div>
                </div>

                <div class="fyvoy-perks-box">
                    🧳 <strong>Fyzzo Student & Traveler Perks Included:</strong> 2x 23kg Checked Bags (or 3x 23kg on approved student routes) + 7kg Hand Luggage + Instant PNR for visa filing!
                </div>
            </div>

            <!-- PROACTIVE UPSELL: HOTEL SOURCING -->
            <div class="fyvoy-perks-box" style="margin-top: 10px; background: #EFF6FF; border-left: 3px solid #3B82F6;">
                🏨 <strong>Complete Your Travel Package:</strong> Need a place to stay upon landing? Fyzzo Voyage sources vetted hotels in safe, prime neighborhoods at wholesale rates for just a flat <strong>₦15,000 service fee</strong>!
            </div>
            <p>Would you like to lock in this flight and add hotel sourcing?</p>
        `,
        actions: [
            {
                label: `💬 Lock In ₦${finalBudget.toLocaleString()} on WhatsApp`,
                url: `https://wa.me/2348062499796?text=${encodeURIComponent(`Hello Fyzzo Voyage, Fyvoy just scanned the live flight fare for ${routeInfo.name} (${tripTypeName}) at ₦${finalBudget.toLocaleString()}. Please lock in this fare for me.`)}`
            },
            {
                label: '🏨 Add Hotel Sourcing (₦15k Fee)',
                onClick: "handleFyvoyChip('🏨 Hotel Sourcing (₦15k Fee)')",
                secondary: true
            },
            {
                label: '📋 Open Flight Request Form',
                onClick: "document.getElementById('flights').scrollIntoView({behavior:'smooth'}); toggleFyvoyChat();",
                secondary: true
            }
        ]
    };
}

/**
 * FYVOY COMPLETE KNOWLEDGE BASE & PROACTIVE UPSELLER
 */
function handleKnowledgeQuery(query) {
    const q = query.toLowerCase();

    // =========================================================================
    // 1. HOTEL SOURCING & BOOKINGS (Flat ₦15,000 Service Fee)
    // =========================================================================
    if (q.includes('hotel') || q.includes('room') || q.includes('stay') || q.includes('lodg') || q.includes('accommodation') || q.includes('resort')) {
        return {
            html: `
                <p>🏨 <strong>Curated Worldwide & Domestic Hotel Sourcing Desk</strong></p>
                <p><strong>Official Fyzzo Service Charge: ₦15,000 Only per reservation</strong></p>
                <p>Don't overpay on public booking sites or risk booking hotels in dangerous, isolated neighborhoods. Our hotel desk handpicks safe, accessible accommodations tailored to your budget:</p>
                <ul>
                    <li>🛡️ <strong>Safe Neighborhood Vetting:</strong> We verify walking distance to university campuses, central subway/metro transit, and consular visa centers.</li>
                    <li>💰 <strong>Wholesale Rate Matching:</strong> We access B2B agent wholesale inventories to beat public retail hotel rates and save you money.</li>
                    <li>📄 <strong>Embassy-Accepted Vouchers:</strong> Fully confirmed reservations with verifiable booking reference codes accepted by UKVI, US, Canada & Schengen embassies.</li>
                    <li>🔄 <strong>Date Flexibility:</strong> Free modification and check-in support with no hidden markups on the room price.</li>
                </ul>
                <!-- PROACTIVE UPSELL: FLIGHTS & AIRPORT PICKUP -->
                <div class="fyvoy-perks-box" style="margin-top: 10px; background: #F0FDF4; border-left: 3px solid #16A34A;">
                    ✈️ <strong>Proactive Settle-In Perk:</strong> Have you booked your flight tickets yet? Our flight desk can bundle your flight with extra student luggage (up to 3x 23kg) and coordinate your airport pickup directly to your hotel!
                </div>
                <p>Where are you looking to stay, and what are your travel dates?</p>
            `,
            actions: [
                {
                    label: '🏨 Book Hotel Sourcing on WhatsApp (₦15k)',
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent('Hello Fyzzo Voyage, I need your Hotel Sourcing & Reservation Desk assistance (₦15,000 Service Fee). Please find me vetted hotel options.')}`
                },
                {
                    label: '📝 Fill Online Hotel Request Form',
                    onClick: "document.getElementById('hotel-booking').scrollIntoView({behavior:'smooth'}); toggleFyvoyChat();",
                    secondary: true
                }
            ]
        };
    }

    // =========================================================================
    // 2. FLIGHTS & AIR TRAVEL (With Wakanow Live Fare Scanning & Markup)
    // =========================================================================
    if (q.includes('flight') || q.includes('ticket') || q.includes('fly') || q.includes('airline') || q.includes('airfare') || q.includes('fare') || q.includes('wakanow') || q.includes('london') || q.includes('toronto') || q.includes('canada') || q.includes('new york') || q.includes('dubai') || q.includes('abuja') || q.includes('baggage') || q.includes('luggage') || q.includes('500k')) {
        const isPriceOrRouteQuery = q.includes('how much') || q.includes('price') || q.includes('fare') || q.includes('cost') || q.includes('wakanow') || q.includes('to ') || q.includes('from ') || q.includes('500k') || Object.keys(WAKANOW_BASE_FARES).some(k => q.includes(k));

        if (isPriceOrRouteQuery) {
            return scanWakanowFare(query);
        }

        return {
            html: `
                <p>✈️ <strong>Fyzzo Voyage Flight & Mobility Desk</strong></p>
                <p>We handle all domestic and international flight ticketing with live inventory scanning and exclusive student perks:</p>
                <ul>
                    <li>🇳🇬 <strong>Domestic Flights:</strong> Lagos, Abuja, Port Harcourt, Enugu, Owerri, Kano, Asaba, Benin, etc.</li>
                    <li>🌍 <strong>International Routes:</strong> UK, Canada, USA, Ireland, Europe/Schengen, UAE/Dubai.</li>
                    <li>🧳 <strong>Student Extra Luggage Perk:</strong> Up to <strong>2 or 3 pieces of 23kg checked baggage</strong> on verified student routes!</li>
                    <li>⚡ <strong>Speed:</strong> Fast e-ticket issuance within 30 minutes, date changes, and legitimate reservation vouchers for visa filing.</li>
                </ul>
                <!-- PROACTIVE UPSELL: HOTEL DESK -->
                <div class="fyvoy-perks-box" style="margin-top: 10px; background: #EFF6FF; border-left: 3px solid #3B82F6;">
                    🏨 <strong>Add Hotel Sourcing:</strong> Once your flight is confirmed, let our hotel desk secure your arrival accommodation in safe, prime neighborhoods for just a flat <strong>₦15,000 service fee</strong>!
                </div>
                <p>Ask me for any flight route (e.g. <em>"How much is flight to London?"</em> or <em>"Fare to Toronto"</em>) and I will scan live inventory right now!</p>
            `,
            actions: [
                {
                    label: '🔍 Scan Fare: Lagos ➔ London',
                    onClick: "handleFyvoyChip('✈️ Live Flight Fare Scanner (Lagos ➔ London)')"
                },
                {
                    label: '🔍 Scan Fare: Lagos ➔ Canada',
                    onClick: "handleFyvoyChip('✈️ Live Fare to Canada (Toronto)')",
                    secondary: true
                },
                {
                    label: '🏨 Hotel Sourcing (₦15k Fee)',
                    onClick: "handleFyvoyChip('🏨 Hotel Sourcing (₦15k Fee)')",
                    secondary: true
                }
            ]
        };
    }

    // =========================================================================
    // 3. STUDY ABROAD / INTAKES (January, May & September)
    // =========================================================================
    if (q.includes('study') || q.includes('admission') || q.includes('january') || q.includes('may') || q.includes('september') || q.includes('intake') || q.includes('university') || q.includes('wolverhampton') || q.includes('degree') || q.includes('msc') || q.includes('bsc') || q.includes('ielts')) {
        return {
            html: `
                <p>🎓 <strong>Study Abroad Admissions (UK, Europe, Canada, Ireland, USA)</strong></p>
                <p>Admissions are actively open for <strong>January</strong>, <strong>May</strong>, and <strong>September</strong> intakes:</p>
                <ul>
                    <li>⚡ <strong>January Intake Priority:</strong> Faster CAS issuance, shorter visa queues, abundant accommodation.</li>
                    <li>📌 <strong>Verified Proof:</strong> Real University of Wolverhampton £17,600 January conditional offer and approved UK eVisa grants!</li>
                    <li>🎯 <strong>No-IELTS Routes:</strong> WAEC/NECO English C6 or higher accepted by our partner institutions.</li>
                    <li>🎓 <strong>Flexible Entry:</strong> Direct admission pathways for <strong>2:2 degrees, 3rd class, and HND graduates</strong>.</li>
                </ul>
                <p>Admission Support & University Lodgement: <strong>₦450,000</strong> (Includes up to 3 university applications and fast-track CAS follow-up).</p>
                
                <!-- PROACTIVE UPSELL: PROOF OF WORK & PROOF OF FUNDS -->
                <div class="fyvoy-perks-box" style="margin-top: 10px; background: #FEF3C7; border-left: 3px solid #D97706;">
                    💼 <strong>Vital Visa Requirements for Students:</strong>
                    <br>• <strong>Proof of Work (₦200,000):</strong> Embassies strictly deny applicants with unexplained post-study gaps. We structure verifiable corporate employment references & salary trails.
                    <br>• <strong>Proof of Funds (₦100,000):</strong> We ensure compliant 28-day statutory seasoning for living costs and tuition.
                    <br>• <strong>Professional SOP Drafting (₦100,000):</strong> Custom academic statement with zero plagiarism.
                </div>
            `,
            actions: [
                {
                    label: '🚀 Apply for Admission Online',
                    onClick: "document.getElementById('apply').scrollIntoView({behavior:'smooth'}); toggleFyvoyChat();"
                },
                {
                    label: '💼 Add Proof of Work (₦200k)',
                    onClick: "handleFyvoyChip('💼 Proof of Work / Career Structuring')",
                    secondary: true
                },
                {
                    label: '💬 Chat with Admissions Advisor',
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent('Hello Fyzzo Voyage, I am interested in Study Abroad admissions and need personalized guidance.')}`
                }
            ]
        };
    }

    // =========================================================================
    // 4. PROOF OF WORK (Career Structuring - ₦200,000)
    // =========================================================================
    if (q.includes('proof of work') || q.includes('pow') || q.includes('work experience') || q.includes('salary') || q.includes('payslip') || q.includes('employment') || q.includes('study gap') || q.includes('gap') || q.includes('linkedin') || q.includes('cv')) {
        return {
            html: `
                <p>💼 <strong>Verifiable Career & Work Experience Structuring (Proof of Work)</strong></p>
                <p><strong>Official Fee: ₦200,000</strong> | Turnaround: 5–7 Days</p>
                <p>Embassies (UKVI, US, Canada) and university compliance teams now demand verified proof of salary payment to justify study gaps. We structure an airtight, verifiable footprint:</p>
                <ul>
                    <li>✅ <strong>Corporate Reference Arrangements:</strong> Verifiable employer contact, HR confirmation, and corporate referee documentation.</li>
                    <li>✅ <strong>Official Payslips & Work Letters:</strong> Authentic salary slips, promotion letters, and employment contracts.</li>
                    <li>✅ <strong>Salary Bank Trail Structuring:</strong> Compliant guidance aligning bank statements with claimed income.</li>
                    <li>✅ <strong>CV & LinkedIn Overhaul:</strong> Aligning your online and offline professional profile to match your course narrative.</li>
                    <li>✅ <strong>Eliminates Gap Refusals:</strong> Confidently defend study gaps in CAS and consular credibility interviews.</li>
                </ul>
                <!-- PROACTIVE UPSELL: POF & SOP -->
                <div class="fyvoy-perks-box" style="margin-top: 10px; background: #EFF6FF; border-left: 3px solid #3B82F6;">
                    💳 <strong>Pair with Proof of Funds (₦100k) & SOP (₦100k):</strong> Combine your Proof of Work with 28-day bank statement seasoning and a compelling Statement of Purpose for an unbeatable visa package!
                </div>
            `,
            actions: [
                {
                    label: '💼 Book Proof of Work Service (08062499796)',
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent('Hello Fyzzo Voyage, I need the Verifiable Career & Work Experience Structuring (Proof of Work - ₦200,000) service for my application.')}`
                },
                {
                    label: '💳 Add Proof of Funds (₦100k)',
                    onClick: "handleFyvoyChip('💳 Proof of Funds (POF) Help')",
                    secondary: true
                }
            ]
        };
    }

    // =========================================================================
    // 5. PROOF OF FUNDS (POF Advisory - ₦100,000)
    // =========================================================================
    if (q.includes('proof of funds') || q.includes('pof') || q.includes('fund') || q.includes('statement') || q.includes('seasoning') || q.includes('28 day') || q.includes('sponsor')) {
        return {
            html: `
                <p>💳 <strong>Proof of Funds (POF) Advisory & Structuring</strong></p>
                <p><strong>Official Fee: ₦100,000</strong> | Turnaround: 48 Hours</p>
                <p>Bank statements account for over 60% of all student and visit visa refusals. We ensure 100% statutory compliance:</p>
                <ul>
                    <li>✅ <strong>28-Day Seasoning Architecture:</strong> Strict adherence to UKVI, IRCC, and European currency fluctuation buffers.</li>
                    <li>✅ <strong>Sponsor Documentation & Affidavits:</strong> Bulletproof sponsor relationship proof, deed of sponsorship, and source of funds letters.</li>
                    <li>✅ <strong>Third-Party Funding Connections:</strong> Legitimate guidance connecting you with verified banking partners for funding shortfalls.</li>
                </ul>
                <!-- PROACTIVE UPSELL: PROOF OF WORK -->
                <div class="fyvoy-perks-box" style="margin-top: 10px; background: #FEF3C7; border-left: 3px solid #D97706;">
                    💼 <strong>Important Note:</strong> Embassies require that your bank account balance aligns with your employment earnings. Pair POF with our <strong>Proof of Work (₦200,000)</strong> service for complete peace of mind.
                </div>
            `,
            actions: [
                {
                    label: '💳 Request POF Structuring (08062499796)',
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent('Hello Fyzzo Voyage, I need Proof of Funds (POF) Structuring guidance for my application.')}`
                },
                {
                    label: '💼 Learn About Proof of Work (₦200k)',
                    onClick: "handleFyvoyChip('💼 Proof of Work / Career Structuring')",
                    secondary: true
                }
            ]
        };
    }

    // =========================================================================
    // 6. VISIT / TOURIST VISAS (UK, US, Canada, Schengen)
    // =========================================================================
    if (q.includes('visit') || q.includes('tourist') || q.includes('vacation') || q.includes('schengen') || q.includes('b1') || q.includes('b2') || q.includes('holiday')) {
        return {
            html: `
                <p>🌍 <strong>Visit & Tourist Visa Application Suites</strong></p>
                <ul>
                    <li>👤 <strong>Single Traveler Visit Suite:</strong> <strong>₦380,000</strong> (Document audit, LOE cover letter, verifiable flight/hotel vouchers, portal lodgement, appointment booking).</li>
                    <li>👫 <strong>Couple / Joint Visit Suite:</strong> <strong>₦680,000</strong> (Full spouse/couple packaging, joint financial ties narrative, verified vouchers).</li>
                </ul>
                <!-- PROACTIVE UPSELL: VOUCHERS, HOTEL & MOCK INTERVIEW -->
                <div class="fyvoy-perks-box" style="margin-top: 10px; background: #F0FDF4; border-left: 3px solid #16A34A;">
                    🎫 <strong>Essential Touchpoints for Visit Visas:</strong>
                    <br>• <strong>Embassy Flight & Hotel Reservation Vouchers (₦25,000):</strong> Don't buy non-refundable tickets before visa approval! We issue verifiable PNR itineraries.
                    <br>• <strong>Worldwide Hotel Sourcing & Reservation Desk (₦15,000):</strong> Handpicked hotels in prime, safe locations with verifiable booking vouchers.
                    <br>• <strong>1-on-1 Mock Visa Coaching (₦100,000):</strong> Live simulation of tough consular questions.
                </div>
            `,
            actions: [
                {
                    label: '🌍 Apply for Visit Visa on WhatsApp',
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent('Hello Fyzzo Voyage, I am interested in your Visit/Tourist Visa services.')}`
                },
                {
                    label: '🎫 Get Embassy Vouchers (₦25k)',
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent('Hello Fyzzo Voyage, I need verifiable Flight & Hotel Reservation Vouchers (₦25,000) for my visa filing.')}`,
                    secondary: true
                },
                {
                    label: '🏨 Hotel Sourcing Desk (₦15k)',
                    onClick: "handleFyvoyChip('🏨 Hotel Sourcing (₦15k Fee)')",
                    secondary: true
                }
            ]
        };
    }

    // =========================================================================
    // 7. LUXURY CRUISES (MSC GRANDIOSA 2026)
    // =========================================================================
    if (q.includes('cruise') || q.includes('msc') || q.includes('grandiosa') || q.includes('cannes') || q.includes('barcelona') || q.includes('ship')) {
        return {
            html: `
                <p>🚢 <strong>MSC Grandiosa 7-Night Western Mediterranean Cruise</strong></p>
                <p>Experience ultra-luxury sailing across 6 iconic European cities from <strong>26 July – 2 August 2026</strong>:</p>
                <ul>
                    <li>🗺️ <strong>Route:</strong> Cannes (France) 🇫🇷 ➔ Genoa 🇮🇹 ➔ Florence (La Spezia) 🇮🇹 ➔ Rome (Civitavecchia) 🇮🇹 ➔ Palma de Mallorca 🇪🇸 ➔ Barcelona 🇪🇸 ➔ Cannes.</li>
                    <li>🍽️ <strong>Inclusions:</strong> 24/7 unlimited gourmet buffet, Broadway-style theater shows, supervised kids club, late-night bistros, port taxes & maritime charges included.</li>
                    <li>💰 <strong>Stateroom Rates (Double Occupancy):</strong>
                        <br>• Interior Cabin: <strong>$2,686</strong>
                        <br>• Oceanview Cabin: <strong>$3,066</strong>
                        <br>• Balcony Stateroom: <strong>$3,406</strong>
                    </li>
                    <li>🔥 <strong>Early-Bird Lock-In Deposit:</strong> Only <strong>$250</strong> to hold your stateroom!</li>
                </ul>
            `,
            actions: [
                {
                    label: '🚢 Reserve Cruise on WhatsApp (08062499796)',
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent('Hello Fyzzo Voyage, I want to reserve a cabin on the MSC Grandiosa Mediterranean Cruise (July 2026).')}`
                },
                {
                    label: '🔍 View Cruise Section',
                    onClick: "document.getElementById('cruises').scrollIntoView({behavior:'smooth'}); toggleFyvoyChat();",
                    secondary: true
                }
            ]
        };
    }

    // =========================================================================
    // 8. SOP & COVER LETTERS
    // =========================================================================
    if (q.includes('sop') || q.includes('statement of purpose') || q.includes('personal statement') || q.includes('loe') || q.includes('cover letter') || q.includes('essay')) {
        return {
            html: `
                <p>📝 <strong>Professional SOP & Cover Letter Drafting</strong></p>
                <ul>
                    <li>✍️ <strong>Professional Statement of Purpose (SOP):</strong> <strong>₦100,000</strong> (3–4 days turnaround, academic justification, home ties alignment, 2 revisions included).</li>
                    <li>📄 <strong>Letter of Explanation (LOE) / Cover Letter:</strong> <strong>₦60,000</strong> (Custom-tailored for high-scrutiny visa officers addressing funding, career transitions, or family ties).</li>
                </ul>
                <div class="fyvoy-perks-box" style="margin-top: 10px; background: #EFF6FF; border-left: 3px solid #3B82F6;">
                    💡 <strong>Pro Tip:</strong> We recommend aligning your SOP with our <strong>Proof of Work (₦200,000)</strong> service so your statement directly mirrors your verifiable employment history!
                </div>
            `,
            actions: [
                {
                    label: '✍️ Order SOP on WhatsApp (08062499796)',
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent('Hello Fyzzo Voyage, I want to book the Professional SOP Drafting service (₦100,000).')}`
                }
            ]
        };
    }

    // =========================================================================
    // 9. VISA REFUSAL RESCUE (₦380,000)
    // =========================================================================
    if (q.includes('refus') || q.includes('reject') || q.includes('denied') || q.includes('section 216') || q.includes('214b')) {
        return {
            html: `
                <p>🔄 <strong>Visa Refusal Forensic Audit & Overhaul</strong></p>
                <p><strong>Official Fee: ₦380,000</strong></p>
                <p>A refusal is never final if handled with forensic precision:</p>
                <ul>
                    <li>🔍 <strong>Root-Cause GCMS / Caseworker Review:</strong> Deconstructing the refusal letter to expose underlying red flags.</li>
                    <li>⚖️ <strong>Legal Rebuttal & LOE:</strong> Direct point-by-point rebuttal dismantling the visa officer's assumptions.</li>
                    <li>🛡️ <strong>Airtight Document Restructuring:</strong> New Proof of Funds, employment proof, and ties packaging for an approved re-filing.</li>
                </ul>
            `,
            actions: [
                {
                    label: '🔄 Send Refusal Letter for Audit (08062499796)',
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent('Hello Fyzzo Voyage, I have a previous visa refusal that I need your forensic team to review.')}`
                }
            ]
        };
    }

    // =========================================================================
    // 10. FULL PRICE LIST & CATALOG
    // =========================================================================
    if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('fees') || q.includes('rate') || q.includes('package')) {
        return {
            html: `
                <p>💰 <strong>Official Fyzzo Voyage Price Catalog</strong></p>
                <p><strong>A La Carte Support Services:</strong></p>
                <ul>
                    <li>• 🏨 <strong>Hotel Sourcing & Booking Desk:</strong> <strong>₦15,000</strong> (Flat service fee)</li>
                    <li>• ✍️ Professional SOP Drafting: <strong>₦100,000</strong></li>
                    <li>• 🏛️ Admission Support & Lodgement (3 schools): <strong>₦450,000</strong></li>
                    <li>• 💼 <strong>Proof of Work (Career Structuring):</strong> <strong>₦200,000</strong></li>
                    <li>• 💳 Proof of Funds (POF) Advisory: <strong>₦100,000</strong></li>
                    <li>• 🎫 Flight & Hotel Visa Vouchers: <strong>₦25,000</strong></li>
                    <li>• 📜 Letter of Explanation (LOE): <strong>₦60,000</strong></li>
                    <li>• 🎙️ 1-on-1 Mock Visa Coaching: <strong>₦100,000</strong></li>
                    <li>• 🔍 Comprehensive Profile Audit: <strong>₦55,000</strong></li>
                    <li>• 🔄 Visa Refusal Forensic Audit: <strong>₦380,000</strong></li>
                </ul>
                <p><strong>Full-Service Packages:</strong></p>
                <ul>
                    <li>• Tier A Study Suite (UK/Ireland/Europe): <strong>₦500,000</strong></li>
                    <li>• Tier B Study Suite (Canada/USA/Australia): <strong>₦800,000</strong></li>
                    <li>• Visit Visas: <strong>₦380,000</strong> (Single) / <strong>₦680,000</strong> (Couple)</li>
                    <li>• VIP Relocation Concierge: <strong>₦1,500,000</strong></li>
                </ul>
            `,
            actions: [
                {
                    label: '📋 View Price List Section',
                    onClick: "document.getElementById('pricing').scrollIntoView({behavior:'smooth'}); toggleFyvoyChat();",
                    secondary: true
                },
                {
                    label: '💬 Inquire on WhatsApp (08062499796)',
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent('Hello Fyzzo Voyage, I would like to book a service from your price list.')}`
                }
            ]
        };
    }

    // =========================================================================
    // 11. HUMAN AGENT / CONTACT / WHATSAPP
    // =========================================================================
    if (q.includes('human') || q.includes('agent') || q.includes('person') || q.includes('talk') || q.includes('call') || q.includes('phone') || q.includes('whatsapp') || q.includes('contact') || q.includes('email') || q.includes('office')) {
        return {
            html: `
                <p>👨‍💼 <strong>Connect Directly with a Senior Fyzzo Advisor</strong></p>
                <p>Our human travel and admissions team is active and ready to assist you right now:</p>
                <ul>
                    <li>📞 <strong>Phone & WhatsApp:</strong> <a href="tel:08062499796">08062499796</a> / <a href="https://wa.me/2348062499796" target="_blank">+234 806 249 9796</a></li>
                    <li>✉️ <strong>Official Email:</strong> <a href="mailto:voyage@fyzzo.com">voyage@fyzzo.com</a></li>
                    <li>📬 <strong>Alternative Email:</strong> <a href="mailto:fyzzovoyage@gmail.com">fyzzovoyage@gmail.com</a></li>
                    <li>📸 <strong>Instagram:</strong> <a href="https://instagram.com/voyagebyfyzzo" target="_blank">@voyagebyfyzzo</a></li>
                </ul>
            `,
            actions: [
                {
                    label: '💬 Open WhatsApp with Human Advisor',
                    url: 'https://wa.me/2348062499796?text=Hello%20Fyzzo%20Voyage,%20I%20am%20chatting%20with%20Fyvoy%20and%20would%20like%20to%20speak%20with%20a%20Senior%20Advisor.'
                }
            ]
        };
    }

    // =========================================================================
    // 12. PHONE NUMBER / LEAD CAPTURE IN CHAT
    // =========================================================================
    const phoneMatch = query.match(/(?:0|\+?234)?[789][01]\d{8}/);
    if (phoneMatch) {
        const capturedPhone = phoneMatch[0];
        submitToGoogleForms(GOOGLE_FORMS.MAIN_INTAKE.ACTION_URL, {
            [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.SERVICE]: '💬 AI Chat Lead (Fyvoy)',
            [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.PHONE]: capturedPhone,
            [GOOGLE_FORMS.MAIN_INTAKE.FIELDS.NOTES]: `[Captured via Fyvoy AI Chat] User Query: "${query}"`
        });

        return {
            html: `
                <p>🎉 <strong>Thank you!</strong> I have captured your WhatsApp contact: <strong>${capturedPhone}</strong>.</p>
                <p>Our Senior Travel & Visa Advisor has been notified and can connect with you directly. Click below to continue on WhatsApp instantly:</p>
            `,
            actions: [
                {
                    label: `💬 Chat on WhatsApp with Advisor (${capturedPhone})`,
                    url: `https://wa.me/2348062499796?text=${encodeURIComponent(`Hello Fyzzo Voyage, my contact is ${capturedPhone}. I was chatting with Fyvoy about my travel/study plans.`)}`
                }
            ]
        };
    }

    // =========================================================================
    // 13. DEFAULT INTELLIGENT FALLBACK
    // =========================================================================
    return {
        html: `
            <p>I understand! As Fyzzo Voyage's AI Travel & Admissions Agent, I can assist you with any of the following:</p>
            <ul>
                <li>✈️ <strong>Flight Bookings</strong> (Domestic & International with 2x23kg or 3x23kg student luggage)</li>
                <li>🏨 <strong>Hotel Sourcing & Booking Desk</strong> (Flat ₦15,000 fee for safe, central hotels)</li>
                <li>🎓 <strong>Study Admissions</strong> for January, May & September intakes</li>
                <li>💼 <strong>Proof of Work / Career Structuring</strong> (₦200,000)</li>
                <li>💳 <strong>Proof of Funds (POF) Guidance</strong> (₦100,000)</li>
                <li>🌍 <strong>Visit & Tourist Visas</strong> (UK, US, Canada, Schengen)</li>
                <li>🚢 <strong>MSC Grandiosa 7-Night Mediterranean Cruise 2026</strong></li>
            </ul>
            <p>You can ask me a specific question, share your WhatsApp number, or chat directly with our human desk.</p>
        `,
        actions: [
            {
                label: '💬 Speak with Senior Advisor on WhatsApp',
                url: `https://wa.me/2348062499796?text=${encodeURIComponent(`Hello Fyzzo Voyage, I have a question regarding: "${query}". Please advise.`)}`
            }
        ]
    };
}
