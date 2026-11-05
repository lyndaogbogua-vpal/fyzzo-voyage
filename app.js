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
    emailOfficial: "fyzzovoyage@gmail.com",
    emailAlternative: "fyzzovoyage@gmail.com",
    instagram: "@voyagebyfyzzo",

    // Social accounts & blog shown in the "Follow Our Journey" section, footer and side bar.
    social: {
        instagramUrl: "https://www.instagram.com/voyagebyfyzzo/",
        tiktokUrl: "https://www.tiktok.com/@voyagebyfyzzo",
        tiktokHandle: "voyagebyfyzzo",
        facebookUrl: "https://www.facebook.com/voyagebyfyzzo",
        xUrl: "https://x.com/voyagebyfyzzo",
        // Google Business Profile: this search link finds "Fyzzo Voyage" on Google Maps.
        // Once the profile is verified, you can replace it with the profile's share link.
        googleBusinessUrl: "https://www.google.com/maps/search/?api=1&query=Fyzzo%20Voyage",

        // Instagram live feed: create a free feed at behold.so (connect @voyagebyfyzzo),
        // then paste its Feed ID here. Until then the section shows your flyers.
        instagramBeholdFeedId: "",

        // TikTok: shows your latest videos automatically (official TikTok embed).
        showTikTokFeed: true,

        // Facebook: only works for a PUBLIC Facebook Page (not a personal profile).
        // Set to true once https://www.facebook.com/Voyagebyfyzzo opens when logged out.
        showFacebookFeed: false,

        // Blog: "blog/" is the Fyzzo Voyage blog inside this website (articles listed in blog/posts.json).
        // An external WordPress or Blogger address (https://...) also works.
        blogUrl: "blog/"
    },

    // Where every website form is delivered (FormSubmit.co -> Fyzzo inbox).
    // After activating FormSubmit, replace the email address in this URL with the
    // random code FormSubmit gives you, so the inbox address is not visible in the code.
    leadEndpoint: "https://formsubmit.co/ajax/fyzzovoyage@gmail.com",

    // Fyvoy assistant. Answers come from fyvoy-kb.js. To let a real AI model answer
    // questions the knowledge base can't, set aiEndpoint to a small server/worker URL
    // that accepts {question, history} and returns {reply}. Leave "" to switch off.
    fyvoy: {
        aiEndpoint: ""
    },

    // Automatic Dynamic Intake Cycle (§32)
    // Automatically recalculates primary intake, secondary intake, and years in real-time:
    // • Oct 1 to Jan 31: Targets January Intake (Priority) of the upcoming/current academic year
    // • Feb 1 to May 31: Targets May/Spring Intake & upcoming September Intake
    // • Jun 1 to Sep 30: Targets September/Fall Main Intake & upcoming January Intake
    getIntakeSchedule: function(customDate) {
        const now = customDate || new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // 0 = Jan, 11 = Dec

        let primaryTerm = "January";
        let primaryYear = currentYear;
        let secondaryTerm = "May / September";
        let secondaryYear = currentYear;
        let priorityBadge = "JANUARY " + currentYear + " INTAKE";
        let planningCallout = "";
        let announcementHtml = "";
        let matchmakerText = "";

        if (currentMonth >= 9) { // October (9), November (10), December (11)
            primaryTerm = "January";
            primaryYear = currentYear + 1;
            secondaryTerm = "May / September";
            secondaryYear = currentYear + 1;
            priorityBadge = "JANUARY " + primaryYear + " INTAKE";
            planningCallout = "Planning for the January " + primaryYear + " or September " + primaryYear + " Intake?";
            announcementHtml = "<strong>" + priorityBadge + ":</strong> UK, Canada & Europe admissions guidance open. Prepare your application and financial documentation with clarity. <a href=\"#contact\">Start Your Journey &rarr;</a>";
            matchmakerText = "United Kingdom — January " + primaryYear + " Fast-Track & Graduate Route";
        } else if (currentMonth === 0) { // January (0)
            primaryTerm = "January";
            primaryYear = currentYear;
            secondaryTerm = "May / September";
            secondaryYear = currentYear;
            priorityBadge = "JANUARY " + primaryYear + " INTAKE (FINAL CALLS)";
            planningCallout = "Planning for the January " + primaryYear + " or May/September " + primaryYear + " Intake?";
            announcementHtml = "<strong>" + priorityBadge + ":</strong> Final admissions & visa slots closing. Fast-track your visa readiness now. <a href=\"#contact\">Start Your Journey &rarr;</a>";
            matchmakerText = "United Kingdom — January " + primaryYear + " Fast-Track & Graduate Route";
        } else if (currentMonth >= 1 && currentMonth <= 4) { // February (1) to May (4)
            primaryTerm = "May";
            primaryYear = currentYear;
            secondaryTerm = "September";
            secondaryYear = currentYear;
            priorityBadge = "MAY / SPRING " + primaryYear + " INTAKE";
            planningCallout = "Planning for the May " + primaryYear + " or September " + primaryYear + " Intake?";
            announcementHtml = "<strong>" + priorityBadge + ":</strong> UK, Canada & Europe Spring admissions open. Fast-track your CAS, admissions, and visa files. <a href=\"#contact\">Start Your Journey &rarr;</a>";
            matchmakerText = "United Kingdom — May / September " + primaryYear + " Fast-Track & Graduate Route";
        } else { // June (5) to September (8)
            primaryTerm = "September";
            primaryYear = currentYear;
            secondaryTerm = "January";
            secondaryYear = currentYear + 1;
            priorityBadge = "SEPTEMBER " + primaryYear + " MAIN INTAKE";
            planningCallout = "Planning for the September " + primaryYear + " or January " + secondaryYear + " Intake?";
            announcementHtml = "<strong>" + priorityBadge + ":</strong> Main Autumn admissions open. Secure your university offer and 28-day Proof of Funds. <a href=\"#contact\">Start Your Journey &rarr;</a>";
            matchmakerText = "United Kingdom — September " + primaryYear + " Fast-Track & Graduate Route";
        }

        const primaryTitle = primaryTerm + " " + primaryYear + " Intake";
        const secondaryTitle = secondaryTerm + " " + secondaryYear + " Intake";

        return {
            primaryTerm: primaryTerm,
            primaryYear: primaryYear,
            secondaryTerm: secondaryTerm,
            secondaryYear: secondaryYear,
            primaryTitle: primaryTitle,
            secondaryTitle: secondaryTitle,
            priorityBadge: priorityBadge,
            planningCallout: planningCallout,
            announcementHtml: announcementHtml,
            matchmakerText: matchmakerText
        };
    },
    
    // Dynamically evaluated current intake string
    get currentIntake() {
        return this.getIntakeSchedule().primaryTitle;
    },
    
    // Statutory UK Student Visa Maintenance Requirements (§12, §13)
    ukVisa: {
        current: {
            name: "Before 30 Nov 2026",
            londonMonthly: 1529,
            londonMax9Months: 13761,
            outsideLondonMonthly: 1171,
            outsideLondonMax9Months: 10539,
            dependantLondonMonthly: 845,
            dependantOutsideLondonMonthly: 680
        },
        updated: {
            name: "From 30 Nov 2026",
            londonMonthly: 1570,
            londonMax9Months: 14130,
            outsideLondonMonthly: 1203,
            outsideLondonMax9Months: 10827,
            dependantLondonMonthly: 874,
            dependantOutsideLondonMonthly: 702
        },
        exchangeRateGBPtoNGN: 2200, // Indicative baseline (Updated: October 2026)
        planningBufferPercent: 0.10 // 10% optional personal budgeting buffer
    }
};

// Sends one form submission to the Fyzzo inbox. Resolves to true when delivered.
function sendLead(subject, fields) {
    const payload = Object.assign({ _subject: subject, _template: 'table', _captcha: 'false' }, fields);
    return fetch(CONFIG.leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
    }).then(function(res) {
        return res.json().then(function(data) {
            return res.ok && String(data.success) === 'true';
        }).catch(function() { return res.ok; });
    }).catch(function(err) {
        console.warn('Form delivery failed:', err);
        return false;
    });
}

// ==========================================================================
// 2. UK STUDENT VISA FINANCIAL CALCULATOR (§12, §13)
// ==========================================================================
function recalculateUKFinancials() {
    const ruleVersionEl = document.getElementById('ruleVersion');
    const locationEl = document.getElementById('studyLocation');
    const tuitionTotalEl = document.getElementById('tuitionTotal');
    const tuitionPaidEl = document.getElementById('tuitionPaid');
    const dependantCountEl = document.getElementById('dependantCount');

    if (!locationEl || !tuitionTotalEl || !tuitionPaidEl) return;

    const ruleVersion = (ruleVersionEl && ruleVersionEl.value === 'updated') ? 'updated' : 'current';
    const rules = CONFIG.ukVisa[ruleVersion];
    const location = locationEl.value; // 'london' or 'outside_london'
    const tuitionTotal = parseFloat(tuitionTotalEl.value) || 0;
    const tuitionPaid = parseFloat(tuitionPaidEl.value) || 0;
    const dependants = parseInt(dependantCountEl ? dependantCountEl.value : 0, 10) || 0;

    // 1. Outstanding Tuition
    const outstandingTuition = Math.max(0, tuitionTotal - tuitionPaid);

    // 2. Student Maintenance (9 Months Statutory Maximum)
    const isLondon = (location === 'london');
    const monthlyRate = isLondon ? rules.londonMonthly : rules.outsideLondonMonthly;
    const studentMaintenance = isLondon ? rules.londonMax9Months : rules.outsideLondonMax9Months;

    // 3. Dependant Maintenance (9 Months)
    const depRateMonthly = isLondon ? rules.dependantLondonMonthly : rules.dependantOutsideLondonMonthly;
    const dependantMaintenance = dependants * (depRateMonthly * 9);

    // 4. Total Evidence in GBP
    const totalGBP = outstandingTuition + studentMaintenance + dependantMaintenance;

    // 5. Total in NGN with 10% Optional Planning Buffer
    const effectiveRate = CONFIG.ukVisa.exchangeRateGBPtoNGN * (1 + CONFIG.ukVisa.planningBufferPercent);
    const totalNGN = Math.round(totalGBP * effectiveRate);

    // Update DOM
    const outLocationRuleEl = document.getElementById('outLocationRule');
    const outMonthlyRateEl = document.getElementById('outMonthlyRate');
    const outTuitionEl = document.getElementById('outTuition');
    const outMaintenanceEl = document.getElementById('outMaintenance');
    const outDependantEl = document.getElementById('outDependant');
    const dependantRowEl = document.getElementById('dependantRow');
    const outTotalGBPEl = document.getElementById('outTotalGBP');
    const outNairaEl = document.getElementById('outNaira');
    const calcWaBtnEl = document.getElementById('calcWaBtn');

    const locLabel = isLondon ? 'Inside London' : 'Outside London';
    const ruleLabel = rules.name;

    if (outLocationRuleEl) outLocationRuleEl.textContent = `${locLabel} (${ruleLabel})`;
    if (outMonthlyRateEl) outMonthlyRateEl.textContent = `£${monthlyRate.toLocaleString()} / month`;
    if (outTuitionEl) outTuitionEl.textContent = `£${outstandingTuition.toLocaleString()}`;
    if (outMaintenanceEl) outMaintenanceEl.textContent = `£${studentMaintenance.toLocaleString()}`;
    
    if (dependantRowEl && outDependantEl) {
        if (dependants > 0) {
            dependantRowEl.style.display = 'flex';
            outDependantEl.textContent = `£${dependantMaintenance.toLocaleString()} (${dependants} dep. @ £${depRateMonthly}/mo)`;
        } else {
            dependantRowEl.style.display = 'none';
        }
    }

    if (outTotalGBPEl) outTotalGBPEl.textContent = `£${totalGBP.toLocaleString()}`;
    if (outNairaEl) outNairaEl.textContent = `₦${totalNGN.toLocaleString()}`;

    // Update WhatsApp CTA Message
    if (calcWaBtnEl) {
        const msg = `Hello Fyzzo Voyage, I used your UK Student Visa Calculator. Location: ${locLabel} (${ruleLabel}), Maintenance: £${studentMaintenance.toLocaleString()}, Outstanding Tuition: £${outstandingTuition.toLocaleString()}, Total Estimated Evidence: £${totalGBP.toLocaleString()} (approx ₦${totalNGN.toLocaleString()}). I would like to review my financial documentation.`;
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
// Client stories shown on the page are the fixed cards in index.html.
// New submissions are emailed to the Fyzzo inbox for staff to check; approved
// stories are then added to index.html by hand. Nothing is stored in the
// visitor's browser and there is no in-page "admin mode".
function handleReviewSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('revName').value.trim();
    const service = document.getElementById('revService').value;
    const rating = document.getElementById('revRating').value;
    const text = document.getElementById('revText').value.trim();

    if (!name || !text) return;

    const form = document.getElementById('reviewSubmissionForm');
    const btn = form ? form.querySelector('button[type="submit"]') : null;
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

    sendLead('⭐ New Client Story for approval: ' + name, {
        Name: name,
        Service: service,
        Rating: rating + ' / 5',
        Testimonial: text,
        Note: 'Submitted on the website. Check it with the client before adding it to the Client Stories section.'
    }).then(function(ok) {
        if (btn) { btn.disabled = false; btn.textContent = 'Submit Client Story'; }
        if (ok) {
            if (form) form.reset();
            closeReviewModal();
            showToast('🎉 Thank you! Your story has been sent to our team and will appear once approved.');
        } else {
            showToast('⚠️ We could not send your story. Please try again or message us on WhatsApp.');
        }
    });
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
// 4b. VERIFIED PROOF LIGHTBOX MODAL
// ==========================================================================
function openLightbox(src, caption) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (!modal || !img) return;
    img.src = src;
    img.alt = caption || 'Verified Evidence Document';
    if (cap) cap.textContent = caption || '';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// ==========================================================================
// 4c. COMPLIMENTARY 2027 STUDY & VISA MASTER GUIDE MODAL
// ==========================================================================
function openLeadMagnetModal() {
    if (sessionStorage.getItem('fyzzo_lead_magnet_shown')) return;
    const modal = document.getElementById('leadMagnetModal');
    if (!modal) return;
    modal.style.display = 'flex';
    sessionStorage.setItem('fyzzo_lead_magnet_shown', 'true');
}

function closeLeadMagnetModal() {
    const modal = document.getElementById('leadMagnetModal');
    if (!modal) return;
    modal.style.display = 'none';
    sessionStorage.setItem('fyzzo_lead_magnet_shown', 'true');
}

function handleLeadMagnetSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('lmName').value.trim();
    const phone = document.getElementById('lmPhone').value.trim();
    const email = document.getElementById('lmEmail').value.trim();
    const destination = document.getElementById('lmDestination').value;

    sendLead('📥 New Guide Download: ' + name + ' (' + phone + ')', {
        Name: name,
        WhatsApp: phone,
        Email: email,
        Destination: destination,
        DownloadedResource: 'Fyzzo Voyage 2027 Study & Visa Master Guide'
    });

    const form = document.getElementById('leadMagnetForm');
    const successBox = document.getElementById('lmSuccessBox');
    if (form) form.style.display = 'none';
    if (successBox) successBox.style.display = 'block';

    const dlLink = document.createElement('a');
    dlLink.href = 'assets/Fyzzo_Voyage_2027_Study_and_Visa_Master_Guide.pdf';
    dlLink.download = 'Fyzzo_Voyage_2027_Study_and_Visa_Master_Guide.pdf';
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);

    const waBtn = document.getElementById('lmWaBtn');
    if (waBtn) {
        const waMsg = 'Hello Fyzzo Voyage, my name is ' + name + '. I just downloaded the 2027 Master Guide for ' + destination + '. I would like to chat with a Senior Advisor about my journey.';
        waBtn.href = 'https://wa.me/' + CONFIG.whatsappClean + '?text=' + encodeURIComponent(waMsg);
    }

    showToast('🎉 2027 Master Guide downloading! Redirecting details...');
}

// ==========================================================================
// 4d. GLOBAL RELOCATION & ELIGIBILITY ASSESSMENT QUIZ ENGINE
// ==========================================================================
const quizState = {
    currentStep: 1,
    answers: {
        goal: '',
        education: '',
        profession: '',
        country: '',
        budget: ''
    },
    lead: {
        fullName: '',
        whatsapp: '',
        email: ''
    }
};

function selectQuizOption(stepNum, val, btnEl) {
    if (stepNum === 1) quizState.answers.goal = val;
    if (stepNum === 2) quizState.answers.education = val;
    if (stepNum === 3) quizState.answers.profession = val;
    if (stepNum === 4) quizState.answers.country = val;
    if (stepNum === 5) quizState.answers.budget = val;

    const parent = btnEl.closest('.quiz-options-list');
    if (parent) {
        parent.querySelectorAll('.quiz-opt-btn').forEach(function(b) { b.classList.remove('selected'); });
    }
    btnEl.classList.add('selected');

    setTimeout(function() {
        goToQuizStep(stepNum + 1);
    }, 280);
}

function prevQuizStep(targetStep) {
    goToQuizStep(targetStep);
}

function goToQuizStep(step) {
    quizState.currentStep = step;
    
    document.querySelectorAll('.quiz-step-pane').forEach(function(pane) {
        pane.classList.remove('active');
    });

    const targetPane = document.getElementById('quizStep' + step);
    if (targetPane) targetPane.classList.add('active');

    const progressFill = document.getElementById('quizProgressFill');
    const percentIndicator = document.getElementById('quizPercentIndicator');
    const stepIndicator = document.getElementById('quizStepIndicator');

    const stepTitles = [
        'Your Core Objective',
        'Highest Qualification',
        'Professional Experience',
        'Country Preference',
        'Relocation Budget & POF',
        'Your Contact Information'
    ];

    const pct = Math.round((step / 6) * 100);
    if (progressFill) progressFill.style.width = pct + '%';
    if (percentIndicator) percentIndicator.textContent = pct + '% Complete';
    if (stepIndicator && stepTitles[step - 1]) {
        stepIndicator.textContent = 'Step ' + step + ' of 6: ' + stepTitles[step - 1];
    }
}

function calculateQuizEligibility(answers) {
    let matchScore = 92;
    let recCountry = 'United Kingdom (Postgraduate Jan 2027 Route)';
    let summary = 'Strong alignment for academic progression, fast visa turnaround and 2-year post-study work authorization.';
    let whyPoints = [];
    let reqPoints = [];

    const goal = answers.goal || '';
    const edu = answers.education || '';
    const prof = answers.profession || '';
    const country = answers.country || '';
    const budget = answers.budget || '';

    if (country.indexOf('Canada') !== -1 || (country.indexOf('Open') !== -1 && (edu.indexOf('Master') !== -1 || edu.indexOf('First Class') !== -1))) {
        recCountry = 'Canada — Study-to-Permanent Residency (PGWP & Express Entry)';
        matchScore = 94;
        summary = 'Your educational standing provides maximum Comprehensive Ranking System (CRS) points under Canadian express entry streams.';
        whyPoints = [
            'Up to 3-year Post-Graduation Work Permit (PGWP) upon completion',
            'High points bonus for Canadian credentials towards permanent residency',
            'Spouse open work permit eligibility for master\'s/doctoral programmes',
            'High-demand career opportunities across Ontario, Alberta and British Columbia'
        ];
        reqPoints = [
            'WES or equivalent educational credential assessment (ECA)',
            'Proof of unencumbered living funds + Year 1 tuition deposit',
            'Statement of Purpose detailing ties to Nigeria and career roadmap'
        ];
    } else if (country.indexOf('Europe') !== -1 || budget.indexOf('Under ₦12 Million') !== -1) {
        recCountry = 'Europe / Ireland — Low-Tuition & EU Blue Card Pathway';
        matchScore = 90;
        summary = 'Outstanding cost efficiency with minimal tuition exposure and direct Schengen mobility benefits.';
        whyPoints = [
            'Tuition fees significantly lower than UK/US counterparts, with partial scholarships',
            'Ireland offers 2-year Third Level Graduate Scheme work visa',
            'Germany offers 18-month job search visa and EU Blue Card fast-track',
            'Schengen mobility allowing travel across 29 European countries'
        ];
        reqPoints = [
            'Blocked bank account or verified sponsor proof of maintenance funds',
            'Apostilled degree certificates and transcripts',
            'Clear academic progression explanation addressing any study gaps'
        ];
    } else if (country.indexOf('United States') !== -1) {
        recCountry = 'United States — Degree & 3-Year STEM OPT Pathway';
        matchScore = 88;
        summary = 'World-class university recognition paired with extensive Optional Practical Training (OPT) for STEM career development.';
        whyPoints = [
            '36-month STEM Optional Practical Training (OPT) work authorization',
            'Access to world-ranked research institutions and graduate assistantships',
            'Direct corporate recruitment by Fortune 500 tech and healthcare leaders'
        ];
        reqPoints = [
            'Form I-20 issuance requiring evidence of full Year 1 liquid funding',
            'DS-160 application and rigorous embassy credibility interview coaching',
            'Demonstration of compelling non-immigrant intent and home country ties'
        ];
    } else if (country.indexOf('Australia') !== -1) {
        recCountry = 'Australia & New Zealand — Regional Skilled Migration';
        matchScore = 91;
        summary = 'Lucrative wage rates with targeted regional migration points concessions.';
        whyPoints = [
            'Temporary Graduate visa (subclass 485) offering 2 to 4 years post-study stay',
            'Additional 5 migration points for studying in designated regional centres',
            'Highest minimum wage rates among OECD developed nations'
        ];
        reqPoints = [
            'Genuine Student (GS) compliance test demonstration',
            'Mandatory Overseas Student Health Cover (OSHC) for duration of stay',
            'Statutory 3-month funds seasoning in approved financial institutions'
        ];
    } else {
        const schedule = CONFIG.getIntakeSchedule();
        recCountry = schedule.matchmakerText;
        matchScore = 95;
        summary = 'Most streamlined admissions and visa turnaround with WAEC English waiver and 2-year Graduate Route.';
        whyPoints = [
            'Admissions currently open for ' + schedule.primaryTitle + ' with rapid offer issuances',
            'WAEC English C6+ accepted by numerous partner universities without IELTS',
            '2-year post-study Graduate Route visa to work or start a business',
            'Digital UKVI eVisa approval with no physical passport vignette wait'
        ];
        reqPoints = [
            'Proof of Funds held strictly for 28 consecutive days before visa submission',
            'Valid CAS (Confirmation of Acceptance for Studies) from licensed sponsor',
            'Pre-CAS interview vetting and academic credibility verification'
        ];
    }

    if (prof.indexOf('Tech') !== -1 || prof.indexOf('Healthcare') !== -1) {
        matchScore = Math.min(98, matchScore + 3);
        whyPoints.unshift('Priority consideration: ' + prof.split('(')[0].trim() + ' is currently on national shortage occupation lists.');
    }

    return {
        matchScore: matchScore,
        primaryCountry: recCountry,
        summary: summary,
        whyPoints: whyPoints,
        reqPoints: reqPoints
    };
}

function handleQuizLeadSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('quizSubmitBtn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Analyzing Profile & Calculating Pathway...';
    }

    const fullName = document.getElementById('quizFullName').value.trim();
    const whatsapp = document.getElementById('quizWhatsapp').value.trim();
    const email = document.getElementById('quizEmail').value.trim();

    quizState.lead = { fullName: fullName, whatsapp: whatsapp, email: email };

    const evaluation = calculateQuizEligibility(quizState.answers);

    sendLead('🎯 New Relocation Quiz Assessment: ' + fullName + ' (' + whatsapp + ')', {
            ProspectName: fullName,
            WhatsApp: whatsapp,
            Email: email,
            PrimaryGoal: quizState.answers.goal,
            EducationLevel: quizState.answers.education,
            Profession: quizState.answers.profession,
            PreferredCountry: quizState.answers.country,
            BudgetRange: quizState.answers.budget,
            EligibilityMatchScore: evaluation.matchScore + '% Match',
            RecommendedPathway: evaluation.primaryCountry,
            ExecutiveSummary: evaluation.summary
    });

    setTimeout(function() {
        document.getElementById('quizProgressWrap').style.display = 'none';
        document.querySelectorAll('.quiz-step-pane').forEach(function(p) { p.style.display = 'none'; });

        const resBox = document.getElementById('quizResultBox');
        if (resBox) resBox.style.display = 'block';

        const scoreEl = document.getElementById('resMatchScore');
        const countryEl = document.getElementById('resPrimaryCountry');
        const sumEl = document.getElementById('resSummaryText');
        const whyList = document.getElementById('resWhyPoints');
        const reqList = document.getElementById('resReqPoints');
        const waBtn = document.getElementById('resWhatsappBtn');

        if (scoreEl) scoreEl.textContent = evaluation.matchScore + '% QUALIFICATION MATCH';
        if (countryEl) countryEl.textContent = 'Recommended Pathway: ' + evaluation.primaryCountry;
        if (sumEl) sumEl.textContent = evaluation.summary;

        if (whyList) {
            whyList.innerHTML = evaluation.whyPoints.map(function(pt) { return '<li>• ' + escapeHTML(pt) + '</li>'; }).join('');
        }
        if (reqList) {
            reqList.innerHTML = evaluation.reqPoints.map(function(pt) { return '<li>• ' + escapeHTML(pt) + '</li>'; }).join('');
        }

        const waText = 'Hello Fyzzo Voyage, my name is ' + fullName + '.\n\nI completed your Global Relocation Assessment Quiz on your website:\n• Goal: ' + quizState.answers.goal + '\n• Education: ' + quizState.answers.education + '\n• Field: ' + quizState.answers.profession + '\n• Preference: ' + quizState.answers.country + '\n• Budget: ' + quizState.answers.budget + '\n\nMy Match Result: ' + evaluation.primaryCountry + ' (' + evaluation.matchScore + '% Match).\n\nI would like to discuss my personalized move abroad plan with a Senior Advisor.';

        if (waBtn) {
            waBtn.href = 'https://wa.me/' + CONFIG.whatsappClean + '?text=' + encodeURIComponent(waText);
        }

        showToast('🎯 Assessment successfully generated! Official copy sent to our desk.');
        resBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
}

function resetQuiz() {
    quizState.currentStep = 1;
    quizState.answers = { goal: '', education: '', profession: '', country: '', budget: '' };
    
    document.getElementById('quizProgressWrap').style.display = 'block';
    document.querySelectorAll('.quiz-step-pane').forEach(function(p) {
        p.style.display = '';
        p.classList.remove('active');
    });
    document.querySelectorAll('.quiz-opt-btn').forEach(function(b) { b.classList.remove('selected'); });
    
    const resBox = document.getElementById('quizResultBox');
    if (resBox) resBox.style.display = 'none';

    const submitBtn = document.getElementById('quizSubmitBtn');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '🎯 Generate My Relocation Eligibility Result →';
    }

    goToQuizStep(1);
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
    const countryResidence = document.getElementById('countryResidence') ? document.getElementById('countryResidence').value.trim() : 'Nigeria';
    const destination = document.getElementById('targetDestination').value;
    const service = document.getElementById('serviceRequired').value;
    const intakeDate = document.getElementById('preferredDate').value;
    const referralSource = document.getElementById('referralSource') ? document.getElementById('referralSource').value : '';
    const currentSituation = document.getElementById('currentSituation').value.trim();

    // 1. Email the enquiry to the Fyzzo inbox, so it is not lost if the visitor
    //    never presses "send" in WhatsApp.
    sendLead('🧭 New Journey Enquiry: ' + fullName + ' (' + whatsapp + ')', {
        FullName: fullName,
        WhatsApp: whatsapp,
        Email: email,
        CountryOfResidence: countryResidence,
        Destination: destination,
        Service: service,
        TargetDate: intakeDate,
        HeardAboutUsVia: referralSource,
        CurrentSituation: currentSituation || 'None'
    });

    // 2. Construct formatted message for WhatsApp direct connection
    const summaryMsg = `Hello Fyzzo Voyage, I submitted an intake form on your website:\n\n👤 Name: ${fullName}\n📞 WhatsApp: ${whatsapp}\n✉️ Email: ${email}\n📍 Residence: ${countryResidence}\n🌍 Destination: ${destination}\n📋 Service: ${service}\n⏳ Target Date: ${intakeDate}\n📢 Source: ${referralSource}\n📝 Notes: ${currentSituation || 'None'}\n\nI would like to discuss my next steps.`;

    // Open WhatsApp straight away: browsers block new tabs opened after a delay.
    const waUrl = `https://wa.me/${CONFIG.whatsappClean}?text=${encodeURIComponent(summaryMsg)}`;
    const waWindow = window.open(waUrl, '_blank');
    if (!waWindow) {
        window.location.href = waUrl;
    }
    showToast("✅ Details received! Our team will contact you shortly.");
    form.reset();
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
        body: `<p>This policy explains how Fyzzo Voyage, a unit of Fyzzo Global, handles personal data in line with the Nigeria Data Protection Act 2023 (NDPA) and, for visitors outside Nigeria, other applicable data protection laws.</p>
        <p><strong>1. What we collect:</strong><br>
        When you fill in a form on this website we collect the details you enter: your name, WhatsApp number, email address, country of residence, destination, the service you need, your timeline, and anything you write about your situation. The eligibility quiz also records your answers. During a paid engagement we may receive academic, financial and identity documents from you directly.</p>
        <p><strong>2. Why we use it:</strong><br>
        Only to reply to your enquiry, assess your eligibility, provide the services you ask for, and keep records of our work for you. Our lawful basis is your consent and, once you engage us, the performance of our service agreement.</p>
        <p><strong>3. Who processes it:</strong><br>
        Website form submissions are delivered to our team's email inbox through FormSubmit (formsubmit.co), an email-forwarding service. If you choose to contact us on WhatsApp, your messages are handled by WhatsApp (Meta). We do not sell, rent or share your data with marketing companies. We only share documents with universities, embassies or other authorities when you ask us to as part of your application.</p>
        <p><strong>4. How long we keep it:</strong><br>
        Enquiries that do not become clients are deleted within 12 months. Client records are kept for up to 6 years after our service ends, for legal and accounting purposes, then deleted.</p>
        <p><strong>5. Your rights:</strong><br>
        You can ask to see, correct or delete your data, withdraw consent, or object to how we use it, at any time, by emailing <a href="mailto:fyzzovoyage@gmail.com">fyzzovoyage@gmail.com</a>. You can also complain to the Nigeria Data Protection Commission (NDPC).</p>
        <p><strong>6. Website storage:</strong><br>
        This website does not use advertising or tracking cookies. It only remembers, for the current browser session, whether you have already seen the free-guide pop-up.</p>`
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
// 7. FYVOY — 24/7 VIRTUAL RELOCATION ADVISOR
//    Knowledge: fyvoy-kb.js (FYVOY_KB, FYVOY_SERVICES, FYVOY_DESTINATIONS)
//    Leads are emailed to the Fyzzo inbox (CONFIG.leadEndpoint) and can be
//    sent on WhatsApp with one tap.
// ==========================================================================
const fyvoy = {
    mode: 'chat',          // 'chat' | 'lead' | 'match' | 'trip' | 'pof'
    trip: {},
    tripStep: 0,
    pof: {},
    lead: {},
    leadStep: 0,
    match: {},
    matchStep: 0,
    matchResult: '',
    asked: [],             // questions the visitor typed
    topics: [],            // knowledge-base answers shown
    answered: 0,
    offeredLead: false,
    leadSent: false,
    history: []            // for the optional AI endpoint
};

const FYVOY_LEAD_STEPS = [
    { key: 'name', ask: function() { return 'Great, let\'s get you sorted. What is your **full name**?'; },
      check: function(v) { return v.length >= 2 ? '' : 'Please type your name.'; } },
    { key: 'phone', ask: function(l) { return 'Thanks, **' + l.name.split(' ')[0] + '**! What is your **WhatsApp number**? Please include the country code, e.g. +234 803 123 4567.'; },
      check: function(v) { return v.replace(/\D/g, '').length >= 7 ? '' : 'That doesn\'t look like a phone number. Please include the digits, e.g. +234 803 123 4567.'; } },
    { key: 'email', optional: true, ask: function() { return 'And your **email address**? (Type "skip" if you prefer WhatsApp only.)'; },
      check: function(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address, or type "skip".'; } },
    { key: 'goal', ask: function() { return 'What would you like help with?'; },
      chips: ['Study abroad', 'Visit / tourist visa', 'Holiday / trip planning', 'Work & relocation', 'Family visit', 'Visa refusal', 'Proof of funds', 'Flights & accommodation', 'Not sure yet'] },
    { key: 'destination', ask: function(l) { return l.destination ? 'Which country are you considering? (Earlier you looked at **' + l.destination + '**. Tap it, or choose another.)' : 'Which country are you considering?'; },
      chips: ['United Kingdom', 'Canada', 'Ireland', 'Netherlands', 'USA', 'Schengen / Europe', 'Africa', 'Dubai / Asia', 'Not sure, advise me'] },
    { key: 'timeline', ask: function() { return 'When are you hoping to travel or start?'; },
      chips: ['January 2027', 'Within 3 months', 'In 3–6 months', 'September 2027', 'Just exploring'] },
    { key: 'notes', optional: true, ask: function() { return 'Anything else our advisor should know? For example your education, any previous refusals or your budget. (Type "skip" if not.)'; } },
    { key: 'consent', ask: function() { return 'Last step: may Fyzzo Voyage contact you on WhatsApp or email about this enquiry, as described in our [Privacy Policy](#privacy)?'; },
      chips: ['Yes, contact me', 'No, thanks'] }
];

const FYVOY_MATCH_STEPS = [
    { key: 'goal', ask: 'What is your main goal?', chips: [['🎓 Study', 'study'], ['💼 Work', 'work'], ['✈️ Visit / tourism', 'visit'], ['👨‍👩‍👧 Move with my family', 'family']] },
    { key: 'budget', ask: 'Roughly what budget do you have for the first year, including fees and living costs?', chips: [['Under ₦15m', 'low'], ['₦15m – ₦45m', 'mid'], ['Over ₦45m', 'high']] },
    { key: 'priority', ask: 'What matters most to you?', chips: [['Stay & work afterwards', 'stay'], ['Lowest cost', 'cost'], ['Fast, simple visa', 'fast'], ['English-speaking', 'english']] }
];

function fyvoyEsc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

// Safe mini-markdown: **bold**, [text](link), line breaks
function fyvoyFormat(text) {
    let html = fyvoyEsc(text);
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function(m, label, url) {
        const u = url.replace(/&amp;/g, '&');
        if (u === '#privacy') return '<a href="#" onclick="openLegalModal(\'privacy\'); return false;">' + label + '</a>';
        if (/^https?:\/\//i.test(u)) return '<a href="' + fyvoyEsc(u) + '" target="_blank" rel="noopener">' + label + '</a>';
        if (/^(#|blog\/|services\/)[\w\-./#]*$/.test(u)) return '<a href="' + fyvoyEsc(u) + '">' + label + '</a>';
        return label;
    });
    return html.replace(/\n/g, '<br>');
}

function fyvoyBody() { return document.getElementById('fyvoyChatBody'); }

function fyvoyScroll() {
    const b = fyvoyBody();
    if (b) b.scrollTop = b.scrollHeight;
}

// chips: array of { label, code }   code = 'kb:<id>' | 'lead' | 'match' | 'wa' | 'val:<value>'
function fyvoyAddMessage(sender, text, chips, extraHTML) {
    const bodyEl = fyvoyBody();
    if (!bodyEl) return;
    bodyEl.querySelectorAll('.fyvoy-inline-chips').forEach(function(c) { c.remove(); });
    const isBot = sender === 'bot';
    const msg = document.createElement('div');
    msg.className = 'fyvoy-message ' + (isBot ? 'fyvoy-msg-bot' : 'fyvoy-msg-user');
    msg.innerHTML = '<div class="fyvoy-msg-avatar">' + (isBot ? '🧭' : '👤') + '</div>' +
        '<div class="fyvoy-msg-bubble"><p>' + (isBot ? fyvoyFormat(text) : fyvoyEsc(text)) + '</p>' + (extraHTML || '') + '</div>';
    bodyEl.appendChild(msg);
    if (chips && chips.length) {
        const row = document.createElement('div');
        row.className = 'fyvoy-inline-chips';
        chips.forEach(function(c) {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'fyvoy-chip' + (c.code === 'wa' ? ' fyvoy-chip-wa' : '') + (c.code === 'lead' ? ' fyvoy-chip-lead' : '');
            b.textContent = c.label;
            b.addEventListener('click', function() { fyvoyQuick(c.code, c.label); });
            row.appendChild(b);
        });
        bodyEl.appendChild(row);
    }
    fyvoy.history.push({ role: isBot ? 'assistant' : 'user', text: text });
    fyvoyScroll();
}

function fyvoyBot(text, chips, extraHTML) {
    const bodyEl = fyvoyBody();
    if (!bodyEl) return;
    const typing = document.createElement('div');
    typing.className = 'fyvoy-message fyvoy-msg-bot fyvoy-typing';
    typing.innerHTML = '<div class="fyvoy-msg-avatar">🧭</div><div class="fyvoy-msg-bubble"><span class="fyvoy-dots"><i></i><i></i><i></i></span></div>';
    bodyEl.appendChild(typing);
    fyvoyScroll();
    const delay = Math.min(1200, 350 + text.length * 2);
    setTimeout(function() {
        typing.remove();
        fyvoyAddMessage('bot', text, chips, extraHTML);
    }, delay);
}

function fyvoyWaLink(message) {
    return 'https://wa.me/' + CONFIG.whatsappClean + '?text=' + encodeURIComponent(message);
}

// Legacy name kept for any old buttons
function appendFyvoyMessage(sender, text) { fyvoyAddMessage(sender, text); }

function toggleFyvoyChat() {
    const windowEl = document.getElementById('fyvoyChatWindow');
    if (!windowEl) return;
    const isHidden = (windowEl.style.display === 'none' || windowEl.style.display === '');
    windowEl.style.display = isHidden ? 'flex' : 'none';
    if (isHidden) {
        const b = fyvoyBody();
        if (b && !b.querySelector('.fyvoy-message')) fyvoyGreet();
        const input = document.getElementById('fyvoyUserInput');
        if (input && window.innerWidth > 700) input.focus();
    }
}

function fyvoyStarterChips() {
    return [
        { label: '🎓 UK Student visa', code: 'kb:student-visa' },
        { label: '💰 How much should I show? (POF)', code: 'pof' },
        { label: '✈️ UK visit visa', code: 'kb:visit-visa' },
        { label: '💼 Work & relocate', code: 'kb:work-visa' },
        { label: '🏝️ Holiday ideas', code: 'trip' },
        { label: '🌍 Where should I relocate?', code: 'match' },
        { label: '🏠 Settling in the UK', code: 'kb:settling-in' }
    ];
}

function fyvoyGreet() {
    const b = fyvoyBody();
    if (!b) return;
    b.innerHTML = '<div class="fyvoy-system-notice"><span>🧭 Fyvoy · Fyzzo Voyage virtual relocation advisor · available 24/7</span></div>';
    fyvoyAddMessage('bot', '👋 Hi! I\'m **Fyvoy**, Fyzzo Voyage\'s virtual relocation advisor.\n\nAsk me anything about **studying, visiting, working or settling in the UK**, or about moving to **Canada, Ireland, the Netherlands, the USA, Europe or Africa**.\n\nPlanning a holiday? Tell me what you enjoy and I\'ll suggest **countries, cities and places to visit** that fit your budget and visa.\n\nWhat would you like to know?', fyvoyStarterChips());
}

function clearFyvoyChat() {
    fyvoy.mode = 'chat';
    fyvoy.lead = {};
    fyvoy.leadStep = 0;
    fyvoy.match = {};
    fyvoy.matchStep = 0;
    fyvoy.matchResult = '';
    fyvoy.trip = {};
    fyvoy.tripStep = 0;
    fyvoy.pof = {};
    fyvoy.asked = [];
    fyvoy.topics = [];
    fyvoy.answered = 0;
    fyvoy.offeredLead = false;
    fyvoy.leadSent = false;
    fyvoy.history = [];
    fyvoyGreet();
}

function handleFyvoySubmit(e) {
    e.preventDefault();
    const inputEl = document.getElementById('fyvoyUserInput');
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    fyvoyAddMessage('user', text);
    fyvoyHandle(text);
}

// Legacy: old suggestion buttons pass plain text
function handleFyvoyChip(text) {
    fyvoyAddMessage('user', text);
    fyvoyHandle(text);
}

function fyvoyQuick(code, label) {
    fyvoyAddMessage('user', label);
    if (code.indexOf('val:') === 0) { fyvoyHandle(code.slice(4)); return; }
    if (code.indexOf('kb:') === 0) {
        const entry = FYVOY_KB.find(function(k) { return k.id === code.slice(3); });
        if (entry) { fyvoy.mode = 'chat'; fyvoyAnswer(entry); }
        return;
    }
    if (code === 'lead') { fyvoyStartLead(); return; }
    if (code === 'match') { fyvoyStartMatch(); return; }
    if (code === 'trip') { fyvoyStartTrip(); return; }
    if (code === 'pof') { fyvoyStartPof(''); return; }
    if (code.indexOf('dest:') === 0) { fyvoy.mode = 'chat'; fyvoyShowDestination(code.slice(5)); return; }
    if (code === 'wa') {
        fyvoyBot('Tap below to chat with a Fyzzo advisor on WhatsApp:', null,
            '<a class="fyvoy-wa-cta" href="' + fyvoyEsc(fyvoyWaLink('Hello Fyzzo Voyage, I was chatting with Fyvoy on your website and would like to speak with an advisor.')) + '" target="_blank" rel="noopener">💬 Open WhatsApp</a>');
    }
}

// ---------- understanding questions ----------
function fyvoyNorm(s) {
    const words = String(s).toLowerCase()
        .replace(/[’']/g, '')
        .replace(/[^a-z0-9£₦€$\-\s]/g, ' ')
        .split(/\s+/)
        .filter(Boolean)
        .map(function(w) { return (w.length > 3 && /[^s]s$/.test(w)) ? w.slice(0, -1) : w; });
    return ' ' + words.join(' ') + ' ';
}

function fyvoyFind(text) {
    const t = fyvoyNorm(text);
    return FYVOY_KB.map(function(e) {
        let score = 0;
        e.keywords.forEach(function(k) {
            const kk = fyvoyNorm(k);
            if (kk.trim() && t.indexOf(kk) !== -1) score += kk.trim().split(' ').length * 2;
        });
        return { e: e, score: score };
    }).filter(function(x) { return x.score > 0; })
      .sort(function(a, b) { return b.score - a.score; });
}

function fyvoyHandle(text) {
    if (fyvoy.mode === 'lead') { fyvoyLeadInput(text); return; }
    if (fyvoy.mode === 'match') { fyvoyMatchInput(text); return; }
    if (fyvoy.mode === 'trip') { fyvoyTripInput(text); return; }
    if (fyvoy.mode === 'pof') { fyvoyPofInput(text); return; }

    const t = text.toLowerCase().trim();
    if (t === 'not now') {
        fyvoyBot('Sure! Keep asking me anything. 😊', fyvoyStarterChips());
        return;
    }
    fyvoy.asked.push(text);

    if (/^(hi|hello|hey|hy|good (morning|afternoon|evening)|howdy|hiya|bonjour)\b[\s!.]*$/.test(t)) {
        fyvoyBot('Hello! 😊 How can I help you today? You can ask me anything about studying, visiting, working or relocating abroad.', fyvoyStarterChips());
        return;
    }
    if (/^(thanks|thank you|thank u|ok thanks|okay thanks|thx|great|nice|ok|okay)\b/.test(t) && t.length < 25) {
        fyvoyBot('You\'re welcome! Anything else I can help with? If you\'d like an advisor to look at your case, I can take your details.', [
            { label: '📝 Get personalised help', code: 'lead' },
            { label: '🌍 Which country suits me?', code: 'match' },
            { label: '💬 WhatsApp an advisor', code: 'wa' }
        ]);
        return;
    }
    if (/(speak|talk|chat) (to|with) (a |an )?(human|person|advisor|adviser|agent|someone|staff)|real person|call me|contact me|get started|book (a )?(consultation|appointment|session)|sign me up|i want to (apply|start|begin)|help me apply|i am interested|i'm interested|how do i start|next step/.test(t)) {
        fyvoyStartLead();
        return;
    }

    // Proof of funds amounts: "how much should I show for a UK visit with my family?"
    const pofWords = /(\bpof\b|proof of funds?|bank balance|closing balance|show money|account balance|how much (money )?(do|should|will|must|would) (i|we|my \w+) (need|have|show|keep|put|get)|how much (do|should) (i|we) (have|keep) in|funds? (needed|required|requirement)|maintenance funds?|financial requirement|how much money)/;
    if (pofWords.test(t) && !/(mistake|28[\s-]?day|what is|what are|sponsor letter|whose account|parent.?s account|lump sum|loan)/.test(t)) { fyvoyStartPof(text); return; }

    // Holiday / visit ideas: "suggest a country to visit", "where can I go for my honeymoon?"
    const tripWords = /(holiday|vacation|vacay|honeymoon|getaway|tourism|tourist|sightseeing|safari|beach|anniversary|birthday trip|tour|visa[\s-]?free|no visa|without (a )?visa|visa on arrival|relax|for fun|enjoy(ment)?|explore)/;
    const askWords = /(suggest|recommend|where|which|idea|best|cheap|affordable|plan|country|countries|place|destination|go to|can i (go|travel|visit))/;
    const studyWorkWords = /(study|school|university|masters|degree|work|job|relocat|settle|japa|migrat|permanent)/;
    if (tripWords.test(t) && askWords.test(t) && !studyWorkWords.test(t)) { fyvoyStartTrip(); return; }
    if (/(visit|travel)/.test(t) && /(suggest|recommend|idea|which countr|what countr|where (can|should) i)/.test(t) && !studyWorkWords.test(t)) { fyvoyStartTrip(); return; }

    // A named holiday destination (Mauritius, Zanzibar, Dubai...) that the main knowledge base doesn't cover
    const hits = fyvoyFind(text);
    const destKey = fyvoyFindDestination(text);
    const kbCovered = ['uk', 'usa', 'canada', 'schengen'].indexOf(destKey) !== -1;
    if (destKey && !studyWorkWords.test(t) && (!kbCovered || tripWords.test(t)) &&
        (!hits.length || hits[0].score < 4 || hits[0].e.id === 'other-countries')) {
        fyvoyShowDestination(destKey);
        return;
    }
    if (hits.length) {
        fyvoyAnswer(hits[0].e, hits.slice(1, 3).map(function(h) { return h.e; }));
        return;
    }

    if (CONFIG.fyvoy && CONFIG.fyvoy.aiEndpoint) {
        fyvoyAskAI(text);
        return;
    }
    fyvoyUnknown(text);
}

function fyvoyUnknown(text) {
    fyvoyBot('I don\'t have a confident answer to that one yet, and I\'d rather not guess on visa matters. 🙏\n\nOur advisors can answer it personally. Shall I pass your question to them?', [
        { label: '📝 Yes, pass it to an advisor', code: 'lead' },
        { label: '💬 Ask on WhatsApp', code: 'wa' },
        { label: '🌍 Which country suits me?', code: 'match' },
        { label: '🎓 UK Student visa', code: 'kb:student-visa' }
    ]);
}

// Optional: plug in a real AI model later (see CONFIG.fyvoy.aiEndpoint)
function fyvoyAskAI(text) {
    const bodyEl = fyvoyBody();
    const typing = document.createElement('div');
    typing.className = 'fyvoy-message fyvoy-msg-bot fyvoy-typing';
    typing.innerHTML = '<div class="fyvoy-msg-avatar">🧭</div><div class="fyvoy-msg-bubble"><span class="fyvoy-dots"><i></i><i></i><i></i></span></div>';
    if (bodyEl) { bodyEl.appendChild(typing); fyvoyScroll(); }
    fetch(CONFIG.fyvoy.aiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, history: fyvoy.history.slice(-10) })
    }).then(function(r) { return r.json(); })
      .then(function(data) {
          typing.remove();
          if (data && data.reply) {
              fyvoyAddMessage('bot', String(data.reply), [
                  { label: '📝 Get personalised help', code: 'lead' },
                  { label: '💬 WhatsApp an advisor', code: 'wa' }
              ]);
              fyvoy.answered++;
          } else {
              fyvoyUnknown(text);
          }
      }).catch(function() { typing.remove(); fyvoyUnknown(text); });
}

function fyvoyAnswer(entry, alsoRelated) {
    if (entry.action === 'match') {
        fyvoyBot(entry.answer);
        setTimeout(fyvoyStartMatch, 900);
        return;
    }
    if (entry.action === 'trip') {
        fyvoyStartTrip();
        return;
    }
    fyvoy.topics.push(entry.title);
    fyvoy.answered++;

    let text = entry.answer;
    const svcIds = (entry.services || []).filter(function(id) { return FYVOY_SERVICES[id]; });
    if (svcIds.length) {
        const main = FYVOY_SERVICES[svcIds[0]];
        text += '\n\n💼 **How Fyzzo can help:** ' + main.name + '. ' + main.pitch;
        if (main.page) text += ' [See what\'s included](' + main.page + ')';
        if (svcIds.length > 1) {
            text += '\nAlso useful: ' + svcIds.slice(1).map(function(id) { return FYVOY_SERVICES[id].name; }).join(', ') + '.';
        }
    }

    const chips = [];
    if (svcIds.length) chips.push({ label: '✅ Get help with this', code: 'lead' });
    const nextIds = (entry.next || []).slice();
    (alsoRelated || []).forEach(function(r) { if (nextIds.indexOf(r.id) === -1 && r.id !== entry.id) nextIds.push(r.id); });
    nextIds.slice(0, 3).forEach(function(id) {
        const n = FYVOY_KB.find(function(k) { return k.id === id; });
        if (n) chips.push({ label: n.title, code: n.action === 'match' ? 'match' : 'kb:' + n.id });
    });
    chips.push({ label: '💬 WhatsApp an advisor', code: 'wa' });

    if (svcIds.length) fyvoy.lead.service = FYVOY_SERVICES[svcIds[0]].name;
    fyvoyBot(text, chips);

    if (fyvoy.answered === 2 && !fyvoy.offeredLead && !fyvoy.leadSent) {
        fyvoy.offeredLead = true;
        setTimeout(function() {
            fyvoyBot('By the way, would you like a Fyzzo advisor to look at your situation and send you a personal plan? It takes about a minute. ⏱️', [
                { label: '📝 Yes, help me', code: 'lead' },
                { label: 'Not now', code: 'val:not now' }
            ]);
        }, 2200);
    }
}

// ---------- lead capture ----------
function fyvoyStartLead() {
    if (fyvoy.leadSent) {
        fyvoyBot('We already have your details, and an advisor will be in touch soon. For a faster reply, message us on WhatsApp.', [{ label: '💬 WhatsApp an advisor', code: 'wa' }]);
        return;
    }
    fyvoy.mode = 'lead';
    fyvoy.leadStep = 0;
    fyvoyAskLeadStep();
}

function fyvoyAskLeadStep() {
    const step = FYVOY_LEAD_STEPS[fyvoy.leadStep];
    const chips = (step.chips || []).map(function(c) { return { label: c, code: 'val:' + c }; });
    if (step.key === 'destination' && fyvoy.lead.destination && step.chips.indexOf(fyvoy.lead.destination) === -1) {
        chips.unshift({ label: fyvoy.lead.destination, code: 'val:' + fyvoy.lead.destination });
    }
    if (step.optional) chips.push({ label: 'Skip', code: 'val:skip' });
    fyvoyBot(step.ask(fyvoy.lead), chips);
}

function fyvoyLeadInput(text) {
    const value = text.trim();
    if (/^(cancel|stop|exit|quit)$/i.test(value)) {
        fyvoy.mode = 'chat';
        fyvoyBot('No problem, I\'ve stopped. Ask me anything else whenever you like.', fyvoyStarterChips());
        return;
    }
    if (value.toLowerCase() === 'not now') {
        fyvoy.mode = 'chat';
        fyvoyBot('Sure! Keep asking me anything. 😊', fyvoyStarterChips());
        return;
    }
    const step = FYVOY_LEAD_STEPS[fyvoy.leadStep];
    if (step.optional && /^skip$/i.test(value)) {
        fyvoy.lead[step.key] = '';
    } else {
        const problem = step.check ? step.check(value) : '';
        if (problem) { fyvoyBot(problem); return; }
        fyvoy.lead[step.key] = value;
    }

    if (step.key === 'consent') {
        if (/^no/i.test(value)) {
            fyvoy.mode = 'chat';
            fyvoyBot('Understood. I won\'t send your details. You can still message us directly on WhatsApp any time.', [{ label: '💬 WhatsApp an advisor', code: 'wa' }]);
            return;
        }
        fyvoySendLead();
        return;
    }
    fyvoy.leadStep++;
    fyvoyAskLeadStep();
}

function fyvoyLeadSummary() {
    const l = fyvoy.lead;
    return 'Hello Fyzzo Voyage, I chatted with Fyvoy on your website.\n\n' +
        '👤 Name: ' + l.name + '\n' +
        '📞 WhatsApp: ' + l.phone + '\n' +
        (l.email ? '✉️ Email: ' + l.email + '\n' : '') +
        '🎯 Need: ' + (l.goal || '') + '\n' +
        '🌍 Destination: ' + (l.destination || '') + '\n' +
        '⏳ Timeline: ' + (l.timeline || '') + '\n' +
        (fyvoy.matchResult ? '🧭 Country match: ' + fyvoy.matchResult + '\n' : '') +
        (l.notes ? '📝 Notes: ' + l.notes + '\n' : '') +
        '\nI would like an advisor to help me with the next steps.';
}

function fyvoySendLead() {
    fyvoy.mode = 'chat';
    const l = fyvoy.lead;
    const waUrl = fyvoyWaLink(fyvoyLeadSummary());
    fyvoyBot('Sending your details to our advisory team... ⏳');

    sendLead('🧭 Fyvoy Lead: ' + l.name + ' (' + l.phone + ') - ' + (l.goal || 'Enquiry'), {
        Source: 'Fyvoy website assistant',
        Name: l.name,
        WhatsApp: l.phone,
        Email: l.email || 'Not given',
        Need: l.goal || '',
        Destination: l.destination || '',
        Timeline: l.timeline || '',
        Notes: l.notes || 'None',
        SuggestedService: l.service || '',
        CountryMatch: fyvoy.matchResult || 'Not used',
        QuestionsAsked: fyvoy.asked.length ? fyvoy.asked.join(' | ') : 'None',
        TopicsViewed: fyvoy.topics.length ? fyvoy.topics.join(' | ') : 'None',
        ConsentToContact: 'Yes (given in chat)',
        Page: location.href
    }).then(function(ok) {
        const waBtn = '<a class="fyvoy-wa-cta" href="' + fyvoyEsc(waUrl) + '" target="_blank" rel="noopener">💬 Send on WhatsApp for a faster reply</a>';
        if (ok) {
            fyvoy.leadSent = true;
            fyvoyBot('✅ Done, **' + l.name.split(' ')[0] + '**! Your details have reached our advisory team, and an advisor will contact you shortly.\n\nWant a faster reply? Tap below to send the same summary on WhatsApp.', [
                { label: '🌍 Which country suits me?', code: 'match' },
                { label: '💰 Service fees', code: 'kb:prices' }
            ], waBtn);
        } else {
            fyvoyBot('⚠️ I couldn\'t send your details automatically just now. Please tap below to send them to us on WhatsApp instead; everything is already filled in.', null, waBtn);
        }
    });
}

// ---------- country matcher ----------
function fyvoyStartMatch() {
    fyvoy.mode = 'match';
    fyvoy.matchStep = 0;
    fyvoy.match = {};
    fyvoyAskMatchStep();
}

function fyvoyAskMatchStep() {
    const step = FYVOY_MATCH_STEPS[fyvoy.matchStep];
    fyvoyBot('**Question ' + (fyvoy.matchStep + 1) + ' of ' + FYVOY_MATCH_STEPS.length + ':** ' + step.ask,
        step.chips.map(function(c) { return { label: c[0], code: 'val:' + c[1] }; }));
}

function fyvoyMatchInput(text) {
    const step = FYVOY_MATCH_STEPS[fyvoy.matchStep];
    const t = text.toLowerCase();
    let value = '';
    step.chips.forEach(function(c) {
        if (t === c[1] || t === c[0].toLowerCase() || t.indexOf(c[1]) !== -1) value = c[1];
    });
    if (!value) {
        if (/^(cancel|stop|exit)$/.test(t)) { fyvoy.mode = 'chat'; fyvoyBot('Okay! Ask me anything else.', fyvoyStarterChips()); return; }
        fyvoyBot('Please pick one of the options below. 👇', step.chips.map(function(c) { return { label: c[0], code: 'val:' + c[1] }; }));
        return;
    }
    if (step.key === 'goal' && value === 'visit') {
        fyvoyBot('A trip, how exciting! ✈️ Let me ask you a few different questions for that.');
        setTimeout(fyvoyStartTrip, 900);
        return;
    }
    fyvoy.match[step.key] = value;
    fyvoy.matchStep++;
    if (fyvoy.matchStep < FYVOY_MATCH_STEPS.length) { fyvoyAskMatchStep(); return; }
    fyvoy.mode = 'chat';
    fyvoyShowMatch();
}

function fyvoyShowMatch() {
    const m = fyvoy.match;
    const D = FYVOY_DESTINATIONS;
    const goalWord = { study: 'studying', work: 'working', visit: 'visiting', family: 'moving with your family' }[m.goal];

    const alts = Object.keys(D).filter(function(k) { return k !== 'uk'; }).map(function(k) {
        const d = D[k];
        if (d.goals.indexOf(m.goal) === -1) return null;
        let score = 2;
        if (d.priorities.indexOf(m.priority) !== -1) score += 2;
        if (d.budgets.indexOf(m.budget) !== -1) score += 1;
        return { key: k, d: d, score: score };
    }).filter(function(x) { return x && x.score >= 3; })
      .sort(function(a, b) { return b.score - a.score; })
      .slice(0, 2);

    let text = 'Here is my match for **' + goalWord + '** abroad:\n\n';
    text += '⭐ **1. ' + D.uk.name + ' (our speciality)**\n' + D.uk.why[m.goal];
    if (m.budget === 'low' && m.goal === 'study' && D.uk.note && D.uk.note.low) text += '\n_' + D.uk.note.low + '_';
    alts.forEach(function(a, i) {
        text += '\n\n**' + (i + 2) + '. ' + a.d.name + '**\n' + a.d.why;
    });
    text += '\n\nThe UK is where our team handles everything end to end: admissions, proof of funds, visa, flights and arrival. Want an advisor to build your personal plan?';
    text = text.replace(/_([^_]+)_/g, '$1');

    fyvoy.matchResult = 'UK' + alts.map(function(a) { return ', ' + a.d.name.replace(/^\S+\s/, ''); }).join('') +
        ' (goal: ' + m.goal + ', budget: ' + m.budget + ', priority: ' + m.priority + ')';
    fyvoy.lead.goal = fyvoy.lead.goal || { study: 'Study abroad', work: 'Work & relocation', visit: 'Visit / tourist visa', family: 'Family relocation' }[m.goal];

    const chips = [{ label: '📝 Build my personal plan', code: 'lead' }, { label: 'More about the UK', code: 'kb:' + (m.goal === 'work' || m.goal === 'family' ? 'work-visa' : m.goal === 'visit' ? 'visit-visa' : 'student-visa') }];
    alts.forEach(function(a) { chips.push({ label: 'About ' + a.d.name.replace(/^\S+\s/, ''), code: 'kb:' + a.d.kb }); });
    fyvoyBot(text, chips);
}

// ---------- trip planner (holiday & visit ideas, see fyvoy-trips.js) ----------
const FYVOY_TRIP_ACKS = {
    who: { solo: 'A solo adventure, love it! 🙌', couple: 'Ooh, a trip for two 💕', family: 'Family trips make the best memories 👨‍👩‍👧', group: 'A trip with friends is always a vibe 🎉', business: 'Work and a little play, smart move 💼' },
    region: { any: 'I love an open mind ✨', africa: 'Great choice. Africa has amazing places close to home, and many need no visa at all.', europe: 'Lovely, and the UK is our speciality 🇬🇧', asia: 'Nice, there are some beautiful options there 🌏', americas: 'Big trip energy! 🌎' },
    budget: { low: 'Noted. I\'ll keep it budget-friendly 👍', mid: 'Got it, that opens up some lovely options.', high: 'Perfect, the world is your oyster 🌟' }
};

function fyvoyStartTrip() {
    if (typeof FYVOY_TRIPS === 'undefined') { fyvoyUnknown(''); return; }
    fyvoy.mode = 'trip';
    fyvoy.tripStep = 0;
    fyvoy.trip = {};
    fyvoyAskTripStep('');
}

function fyvoyTripChips(step) {
    return step.chips.map(function(c) { return { label: c[0], code: 'val:' + c[1] }; });
}

function fyvoyAskTripStep(prefix) {
    const step = FYVOY_TRIP_STEPS[fyvoy.tripStep];
    fyvoyBot((prefix ? prefix + '\n\n' : '') + step.ask, fyvoyTripChips(step));
}

// Understand chip values and free-text answers ("me and my wife", "somewhere with beaches and shopping")
function fyvoyTripParse(step, text) {
    const t = ' ' + text.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9₦.\-\s]/g, ' ').replace(/\s+/g, ' ') + ' ';
    const found = [];
    step.chips.forEach(function(c) {
        if (t.trim() === c[1] || t.trim() === c[0].toLowerCase().replace(/[^a-z0-9₦.\-\s]/g, '').trim()) found.push(c[1]);
    });
    if (found.length) return found;
    Object.keys(step.words || {}).forEach(function(val) {
        if (step.words[val].some(function(w) { return t.indexOf(' ' + w + ' ') !== -1 || (w.length > 4 && t.indexOf(w) !== -1); })) found.push(val);
    });
    if (step.key === 'budget' && !found.length) {
        const n = parseFloat((t.match(/(\d+(\.\d+)?)/) || [])[1]);
        if (!isNaN(n)) {
            const millions = /k\b|thousand|000/.test(t) && n >= 1000 ? n / 1000 : (n > 1000 ? n / 1000000 : n);
            found.push(millions < 2 ? 'low' : millions <= 5 ? 'mid' : 'high');
        }
    }
    return found;
}

function fyvoyTripInput(text) {
    const t = text.toLowerCase().trim();
    if (/^(cancel|stop|exit|quit|not now)$/.test(t)) {
        fyvoy.mode = 'chat';
        fyvoyBot('No problem! Ask me anything else whenever you like. 😊', fyvoyStarterChips());
        return;
    }
    const step = FYVOY_TRIP_STEPS[fyvoy.tripStep];
    const vals = fyvoyTripParse(step, text);
    if (!vals.length) {
        fyvoyBot('Sorry, I didn\'t quite catch that. 🙈 Could you pick the closest option below, or say it another way?', fyvoyTripChips(step));
        return;
    }
    fyvoy.trip[step.key] = step.multi ? vals : vals[0];
    const ack = (FYVOY_TRIP_ACKS[step.key] || {})[vals[0]] || '';
    fyvoy.tripStep++;
    if (fyvoy.tripStep < FYVOY_TRIP_STEPS.length) { fyvoyAskTripStep(ack); return; }
    fyvoy.mode = 'chat';
    fyvoyShowTrip();
}

function fyvoyVisaLabel(d, trip) {
    if (trip && trip.visa === 'have' && d.boost) return '✅ **Easier for you:** ' + d.visaText;
    const tag = { free: '✅ **No visa:** ', easy: '✅ **Easy entry:** ', evisa: '🟢 **Online e-visa:** ', embassy: '🟡 **Visa needed (we can help):** ', check: '🔎 **Visa check:** ' }[d.visa] || '';
    return tag + d.visaText;
}

function fyvoyDestinationCard(d, trip, num) {
    return '**' + (num ? num + '. ' : '') + d.name + '**' + (d.service ? ' ⭐ our speciality' : '') + '\n' +
        fyvoyVisaLabel(d, trip) + '\n' +
        '📍 **Where to go:** ' + d.cities + '\n' +
        '✨ **Don\'t miss:** ' + d.highlights + '\n' +
        '🗓️ **Best time:** ' + d.best;
}

function fyvoyScoreTrips(trip, regionFilter) {
    const vibes = trip.vibe || [];
    return Object.keys(FYVOY_TRIPS).map(function(k) {
        const d = FYVOY_TRIPS[k];
        if (regionFilter && d.region !== regionFilter) return null;
        let score = 0;
        vibes.forEach(function(v) { if (d.vibes.indexOf(v) !== -1) score += 3 + (d.vibes.indexOf(v) === 0 ? 1 : 0); });
        if (d.who.indexOf(trip.who) !== -1) score += 1;
        if (d.budget.indexOf(trip.budget) !== -1) score += 2;
        else if (trip.budget === 'low') score -= 4;
        else if (trip.budget === 'mid' && d.budget.indexOf('high') !== -1 && d.budget.length === 1) score -= 3;
        if (trip.visa === 'easy') score += ({ free: 3, easy: 3, evisa: 2, check: 0, embassy: -6 })[d.visa];
        if (trip.visa === 'have') score += d.boost ? 3 : (d.visa === 'free' || d.visa === 'easy' ? 1 : 0);
        if (trip.visa === 'apply' && d.service) score += 2;
        if (trip.visa === 'have' && d.service) score += 3;   // already holds a UK visa: the UK is an easy, great fit
        return { key: k, d: d, score: score };
    }).filter(Boolean).sort(function(a, b) { return b.score - a.score; });
}

function fyvoyShowTrip() {
    const trip = fyvoy.trip;
    const region = trip.region === 'any' ? '' : trip.region;
    let ranked = fyvoyScoreTrips(trip, region).filter(function(x) { return x.score > 0; });
    let widened = false;
    if (ranked.length < 2) {
        ranked = fyvoyScoreTrips(trip, '').filter(function(x) { return x.score > 0; });
        widened = !!region;
    }
    const picks = ranked.slice(0, 3);
    if (!picks.length) {
        fyvoyBot('Hmm, that\'s a tricky mix, and I don\'t want to suggest the wrong place. Let me pass your wishes to one of our travel advisors so they can plan something properly for you. 😊',
            [{ label: '📝 Yes, plan it for me', code: 'lead' }, { label: '🔄 Start again', code: 'trip' }]);
        return;
    }
    const intro = {
        couple: 'Here are my top picks for the two of you 💕',
        family: 'Here are my top family-friendly picks 👨‍👩‍👧',
        group: 'Here are my top picks for your crew 🎉',
        business: 'Here are my top picks for work and play 💼',
        solo: 'Here are my top picks for you 🙌'
    }[trip.who] || 'Here are my top picks for you';
    let text = intro + (widened ? ' (I looked a little wider than your region to find the best fit)' : '') + ':\n\n';
    text += picks.map(function(p, i) { return fyvoyDestinationCard(p.d, trip, i + 1); }).join('\n\n');

    const hasUK = picks.some(function(p) { return p.key === 'uk'; });
    if (!hasUK && trip.visa !== 'easy' && (trip.region === 'europe' || trip.region === 'any')) {
        text += '\n\n💡 **Also consider the UK 🇬🇧:** London, Edinburgh and Manchester are amazing for city breaks and family visits. The UK visitor visa is our speciality, and we handle it end to end.';
    }
    text += '\n\nEntry rules for Nigerian passports change often, so an advisor always confirms the current rule before you book. 🙏\n\n' +
        '✈️ **We can plan the whole trip:** compare flights, find safe hotels, arrange airport pickup, and sort the visa if you need one. [See our travel service](services/flights-holidays.html)';

    fyvoy.matchResult = 'Trip ideas: ' + picks.map(function(p) { return p.d.name.replace(/^\S+\s/, ''); }).join(', ') +
        ' (who: ' + trip.who + ', vibe: ' + (trip.vibe || []).join('/') + ', region: ' + trip.region + ', budget: ' + trip.budget + ', visa: ' + trip.visa + ')';
    fyvoy.lead.goal = fyvoy.lead.goal || 'Holiday / trip planning';
    fyvoy.lead.service = 'Flights, Holidays & Accommodation';
    fyvoy.topics.push('Trip planner');
    fyvoy.answered++;

    fyvoyBot(text, [
        { label: '📝 Plan this trip for me', code: 'lead' },
        { label: '🔄 Show me other ideas', code: 'trip' },
        { label: '💬 WhatsApp a travel advisor', code: 'wa' }
    ]);
}

function fyvoyFindDestination(text) {
    if (typeof FYVOY_TRIPS === 'undefined') return '';
    const t = ' ' + String(text).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ') + ' ';
    let best = '', bestLen = 0;
    Object.keys(FYVOY_TRIPS).forEach(function(k) {
        FYVOY_TRIPS[k].keywords.forEach(function(w) {
            if (t.indexOf(' ' + w + ' ') !== -1 && w.length > bestLen) { best = k; bestLen = w.length; }
        });
    });
    return best;
}

function fyvoyShowDestination(key) {
    const d = FYVOY_TRIPS[key];
    if (!d) return;
    fyvoy.topics.push('Destination: ' + d.name);
    fyvoy.answered++;
    fyvoy.lead.goal = fyvoy.lead.goal || 'Holiday / trip planning';
    fyvoy.lead.destination = fyvoy.lead.destination || d.name.replace(/^\S+\s/, '');
    fyvoy.lead.service = d.service ? 'Visit & Family Visa Support' : 'Flights, Holidays & Accommodation';
    const text = 'Great choice! Here\'s a quick guide 👇\n\n' + fyvoyDestinationCard(d, null, 0) +
        '\n\nEntry rules for Nigerian passports change, so an advisor confirms the current rule before you book.\n\n' +
        '✈️ We can compare flights, find safe hotels and arrange your visa if you need one. [See our travel service](services/flights-holidays.html)';
    fyvoyBot(text, [
        { label: '📝 Plan this trip for me', code: 'lead' },
        { label: '🏝️ Suggest other places', code: 'trip' },
        { label: '💬 WhatsApp a travel advisor', code: 'wa' }
    ]);
}

// ---------- proof of funds helper (see fyvoy-pof.js) ----------
// Works out what we still need to know from the question itself, e.g.
// "how much pof for uk visit visa for me and my wife" -> purpose, country and party already known.
function fyvoyPofGuess(text) {
    const t = ' ' + String(text).toLowerCase().replace(/[’']/g, '') + ' ';
    const g = {};
    if (/(study|student|school|universit|masters|degree|cas\b|tuition|course)/.test(t)) g.purpose = 'study';
    else if (/(skilled worker|work visa|job|care worker|health and care|employ|work permit|working)/.test(t)) g.purpose = 'work';
    else if (/(visit|tour|holiday|vacation|graduation|wedding|conference|business trip|standard visitor)/.test(t)) g.purpose = 'visit';
    if (/( uk |united kingdom|britain|england|london|scotland|manchester)/.test(t)) g.dest = 'uk';
    else if (/canada|toronto/.test(t)) g.dest = 'canada';
    else if (/ireland|dublin/.test(t)) g.dest = 'ireland';
    else if (/netherlands|holland|dutch|amsterdam/.test(t)) g.dest = 'netherlands';
    else if (/( usa | us |america|united states)/.test(t)) g.dest = 'usa';
    else if (/(schengen|europe|france|germany|italy|spain|portugal|greece|belgium|switzerland)/.test(t)) g.dest = 'schengen';
    const party = fyvoyPofParty(t);
    if (party) g.party = party;
    if (/london/.test(t)) g.city = 'london';
    return g;
}

// '1-0' = just me, '2-2' = me + partner + 2 children, etc.
function fyvoyPofParty(t) {
    t = ' ' + String(t).toLowerCase() + ' ';
    const words = { one: 1, two: 2, three: 3, four: 4, five: 5, a: 1 };
    const num = (t.match(/(\d+)\s*(kid|child|children|son|daughter|boy|girl)/) || [])[1];
    const word = (t.match(/\b(one|two|three|four|five|a)\s+(kid|child|children|son|daughter|boy|girl)/) || [])[1];
    const kids = num ? parseInt(num, 10) : (word ? words[word] : (/(kid|child|children|son|daughter)/.test(t) ? 1 : 0));
    const partner = /(wife|husband|partner|spouse|couple|both of us|we are two|fianc)/.test(t);
    if (partner || kids) return (partner ? 2 : 1) + '-' + Math.min(kids, 5);
    if (/(just me|only me|myself|alone|single|solo|by myself)/.test(t)) return '1-0';
    return '';
}

function fyvoyStartPof(text) {
    if (typeof FYVOY_POF === 'undefined') { fyvoyUnknown(''); return; }
    fyvoy.mode = 'pof';
    fyvoy.pof = fyvoyPofGuess(text || '');
    if (fyvoy.pof.purpose === 'study' && fyvoy.pof.dest === 'schengen') delete fyvoy.pof.dest;
    if (fyvoy.pof.purpose === 'work' && fyvoy.pof.dest && fyvoy.pof.dest !== 'uk') fyvoy.pof.dest = 'other';
    fyvoyPofNext();
}

function fyvoyPofStep() {
    const p = fyvoy.pof, S = FYVOY_POF_STEPS;
    if (!p.purpose) return { key: 'purpose', ask: S.purpose.ask, chips: S.purpose.chips };
    if (!p.dest) return { key: 'dest', ask: S.dest[p.purpose].ask, chips: S.dest[p.purpose].chips };
    if (p.purpose === 'work' && p.dest === 'other') return null;
    if (!p.party) return { key: 'party', ask: S.party.ask, chips: S.party.chips };
    if (p.purpose === 'study' && p.dest === 'uk' && !p.city) return { key: 'city', ask: S.city.ask, chips: S.city.chips };
    return null;
}

function fyvoyPofNext() {
    const step = fyvoyPofStep();
    if (!step) { fyvoy.mode = 'chat'; fyvoyShowPof(); return; }
    fyvoyBot(step.ask, step.chips.map(function(c) { return { label: c[0], code: 'val:' + c[1] }; }));
}

function fyvoyPofInput(text) {
    const t = text.toLowerCase().trim();
    if (/^(cancel|stop|exit|quit|not now)$/.test(t)) {
        fyvoy.mode = 'chat';
        fyvoyBot('No problem! Ask me anything else whenever you like. 😊', fyvoyStarterChips());
        return;
    }
    const step = fyvoyPofStep();
    if (!step) { fyvoy.mode = 'chat'; fyvoyShowPof(); return; }
    let value = '';
    step.chips.forEach(function(c) { if (t === c[1] || t === c[0].toLowerCase()) value = c[1]; });
    if (!value) {
        const g = fyvoyPofGuess(text);
        if (step.key === 'purpose') value = g.purpose || '';
        if (step.key === 'dest') value = g.dest || (fyvoy.pof.purpose === 'work' && /other|another|canada|europe|usa|ireland/.test(t) ? 'other' : '');
        if (step.key === 'city') value = /london/.test(t) && !/outside|not london/.test(t) ? 'london' : (/outside|not london|elsewhere|manchester|birmingham|leeds|scotland|wales|liverpool|coventry/.test(t) ? 'outside' : '');
        if (step.key === 'party') value = fyvoyPofParty(t) || (/family/.test(t) ? '2-2' : '');
    }
    if (!value) {
        fyvoyBot('Sorry, I didn\'t quite get that. 🙈 Please pick the closest option below.', step.chips.map(function(c) { return { label: c[0], code: 'val:' + c[1] }; }));
        return;
    }
    fyvoy.pof[step.key] = value;
    fyvoyPofNext();
}

function fyvoyMoney(amount, currency) {
    return FYVOY_POF.symbols[currency] + Math.round(amount).toLocaleString('en-GB');
}

function fyvoyNaira(amount) {
    if (amount >= 1000000) return '₦' + (Math.ceil(amount / 100000) / 10).toLocaleString('en-GB', { maximumFractionDigits: 1 }) + 'm';
    return '₦' + (Math.ceil(amount / 1000) * 1000).toLocaleString('en-GB');
}

// range [low, high] in a foreign currency -> text with the naira range and the recommended (higher) figure
function fyvoyPofRange(range, currency) {
    const P = FYVOY_POF, rate = P.rates[currency];
    const lowN = range[0] * rate, highN = range[1] * rate * (1 + P.buffer);
    const foreign = range[0] === range[1] ? fyvoyMoney(range[0], currency) : fyvoyMoney(range[0], currency) + ' – ' + fyvoyMoney(range[1], currency);
    return { foreign: foreign, naira: fyvoyNaira(lowN) + ' – ' + fyvoyNaira(highN), recommend: fyvoyNaira(highN) };
}

function fyvoyShowPof() {
    const P = FYVOY_POF, p = fyvoy.pof;
    const parts = (p.party || '1-0').split('-');
    const adults = parseInt(parts[0], 10) || 1, kids = parseInt(parts[1], 10) || 0;
    const extra = adults - 1 + kids;                       // people other than the main applicant
    const who = adults === 1 && !kids ? 'just you' : (adults === 2 ? 'you and your partner' : 'you') + (kids ? ' with ' + kids + (kids === 1 ? ' child' : ' children') : '');
    let text = '', currency = 'GBP', total = null, lines = [], tuition = null, usaI20 = false;
    const add = function(label, range, cur) { lines.push('• **' + label + ':** ' + fyvoyPofRange(range, cur).foreign); };

    if (p.purpose === 'work' && p.dest === 'other') {
        fyvoyBot('For work visas outside the UK, the money you need depends on the exact route and your employer, so I\'d rather not guess. 🙏 An advisor can check the official figure for your route.', [
            { label: '📝 Ask an advisor', code: 'lead' }, { label: '🔄 Check another case', code: 'pof' }, { label: '💬 WhatsApp us', code: 'wa' }]);
        return;
    }

    if (p.purpose === 'study' && p.dest === 'uk') {
        const S = P.ukStudy, city = p.city || 'outside', m = S.months;
        const live = [S.living[city][0] * m, S.living[city][1] * m];
        const dep = [S.dependant[city][0] * m * extra, S.dependant[city][1] * m * extra];
        add('Living costs (9 months, ' + (city === 'london' ? 'London' : 'outside London') + ')', live, 'GBP');
        if (extra) add('Dependants (' + extra + ' × 9 months)', dep, 'GBP');
        tuition = { range: S.tuition, cur: 'GBP', label: 'your unpaid first-year tuition (shown on your CAS)' };
        total = [live[0] + dep[0], live[1] + dep[1]];
        text = '🇬🇧 **UK Student visa** for ' + who + ':\n' + lines.join('\n');
        if (extra) text += '\n\n⚠️ Most master\'s students **can no longer bring dependants**. Only PhD/research students and government-sponsored students can. Check this before you plan for your family.';
        text += '\n\nThe money must sit in the account for **28 days in a row**, ending within 31 days of your application. The higher figures include the **new rates from 30 November 2026**.';
    } else if (p.purpose === 'study' && p.dest === 'canada') {
        const C = P.canadaStudy;
        currency = 'CAD';
        add('Living costs, first year (single student)', [C.single, C.single], 'CAD');
        if (extra) add('Family members (' + extra + ')', [C.extraMember[0] * extra, C.extraMember[1] * extra], 'CAD');
        tuition = { range: C.tuition, cur: 'CAD', label: 'your first-year tuition (on your letter of acceptance)' };
        total = [C.single + C.extraMember[0] * extra, C.single + C.extraMember[1] * extra];
        text = '🇨🇦 **Canada study permit** for ' + who + ' (outside Quebec):\n' + lines.join('\n') + '\n\nIRCC updates these figures regularly, so we confirm the current table for your family size.';
    } else if (p.purpose === 'study' && p.dest === 'ireland') {
        const I = P.irelandStudy;
        currency = 'EUR';
        add('Living costs, first year', I.living, 'EUR');
        tuition = { range: I.tuition, cur: 'EUR', label: 'your first-year tuition (on your offer letter)' };
        total = [I.living[0], I.living[1]];
        text = '🇮🇪 **Ireland student visa** for ' + who + ':\n' + lines.join('\n');
        if (extra) text += '\n\n⚠️ Most students in Ireland **cannot bring family** with them. Family members usually need their own visa, with separate funds.';
    } else if (p.purpose === 'study' && p.dest === 'netherlands') {
        const D = P.netherlandsStudy;
        currency = 'EUR';
        add('Living costs, first year', D.living, 'EUR');
        tuition = { range: D.tuition, cur: 'EUR', label: 'your first-year tuition (on your offer letter)' };
        total = [D.living[0], D.living[1]];
        text = '🇳🇱 **Netherlands student residence permit** for ' + who + ':\n' + lines.join('\n') + '\n\nYour university checks your funds and applies for the permit for you. Many ask you to pay the money into the university\'s account.';
        if (extra) text += '\n\n⚠️ Bringing family needs extra income or funds on top of this, so an advisor should check your case.';
    } else if (p.purpose === 'study' && p.dest === 'usa') {
        const U = P.usaStudy;
        currency = 'USD';
        add('Typical first-year cost on an I-20 (tuition + living)', U.total, 'USD');
        if (extra) add('Dependants (' + extra + ', added to your I-20)', [U.dependant[0] * extra, U.dependant[1] * extra], 'USD');
        total = [U.total[0] + U.dependant[0] * extra, U.total[1] + U.dependant[1] * extra];
        usaI20 = true;
        text = '🇺🇸 **USA F-1 student visa** for ' + who + ':\n' + lines.join('\n') + '\n\nThe exact figure is printed on your **I-20**, and you show that amount at your embassy interview.';
    } else if (p.purpose === 'work' && p.dest === 'uk') {
        const W = P.ukWork;
        let amt = W.main + (adults === 2 ? W.partner : 0) + (kids ? W.firstChild + W.otherChild * (kids - 1) : 0);
        add('Required funds (held for 28 days)', [amt, amt], 'GBP');
        total = [amt, Math.ceil(amt * 1.2)];
        text = '🇬🇧 **UK Skilled Worker / Health & Care visa** for ' + who + ':\n' + lines.join('\n') +
            '\n(£1,270 for you' + (adults === 2 ? ' + £285 for your partner' : '') + (kids ? ' + £315 for the first child' + (kids > 1 ? ' + £200 for each other child' : '') : '') + ')' +
            '\n\nYou don\'t need to show this if your sponsor is **A-rated and certifies maintenance** on your Certificate of Sponsorship. Arrival costs (deposit, rent, transport) are extra, so plan for more.';
    } else {
        const V = P.visit[p.dest] || P.visit.uk;
        currency = V.currency;
        const trip = [0, 1].map(function(i) { return V.first[i] + V.extraAdult[i] * (adults - 1) + V.child[i] * kids; });
        const f = P.visitBalanceFactor;
        add('Estimated trip cost (2 weeks, incl. flights)', trip, currency);
        total = [trip[0] * f[0], trip[1] * f[1]];
        text = '✈️ **Visit visa to ' + V.name + '** for ' + who + ':\n' + lines.join('\n') +
            '\n\nThere is **no official minimum** for a visit visa. The officer checks that you can **comfortably afford the trip**, that the money is **genuinely yours**, and that it **fits your income**. So we recommend a closing balance of about 1.2–1.5× the trip cost:';
    }

    const r = fyvoyPofRange(total, currency);
    if (usaI20) {
        text += '\n\n💰 **Typical range:** ' + r.foreign + ' (≈ ' + r.naira + ')' +
            '\n✅ **We recommend showing your exact I-20 total plus about 10%**, to stay on the safe side of exchange-rate changes.';
    } else {
        text += '\n\n💰 **' + (p.purpose === 'visit' ? 'Recommended closing balance' : 'Total to show') + ':** ' + r.foreign + '\n≈ **' + r.naira + '**' +
            '\n✅ **We recommend aiming for ' + r.recommend + ' or more**, the top of the range. That covers exchange-rate changes and keeps you on the safe side.';
    }
    if (tuition) {
        const tr = fyvoyPofRange(tuition.range, tuition.cur);
        text += '\n\n➕ **Plus ' + tuition.label + '.** Typical: ' + tr.foreign + ' (≈ ' + tr.naira + '). Add your exact figure on top, plus about 10%.';
    }
    text += '\n\n_These are planning ranges (indicative rate ₦' + P.rates[currency].toLocaleString('en-GB') + ' per ' + FYVOY_POF.symbols[currency].trim() + '1, ' + P.updated + '). Exact amounts depend on your case and the official rules on the day you apply._' +
        '\n\n🧾 Also important: **6 months of statements**, salary or business income that matches the credits, and **no unexplained lump sums**. Our **Proof of Funds Readiness Review** checks your real statements before you apply. [See what\'s included](services/proof-of-funds.html)';
    text = text.replace(/_([^_]+)_/g, '$1');

    fyvoy.matchResult = (fyvoy.matchResult ? fyvoy.matchResult + ' | ' : '') + 'POF check: ' + p.purpose + ' ' + p.dest + ', ' + who + ', aim ' + r.recommend;
    fyvoy.lead.service = 'Proof of Funds Readiness Review';
    fyvoy.topics.push('POF helper: ' + p.purpose + ' / ' + p.dest + ' / ' + who);
    fyvoy.answered++;
    fyvoy.pof = {};
    fyvoyBot(text, [
        { label: '📝 Review my statements', code: 'lead' },
        { label: '🔄 Check another case', code: 'pof' },
        { label: 'Common POF mistakes', code: 'kb:pof-mistakes' },
        { label: '💬 WhatsApp an advisor', code: 'wa' }
    ]);
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
// 8.5. AUTOMATIC INTAKE CYCLER ENGINE (§32)
// Automatically updates announcement bar, headings, dropdowns, and calculator options
// based on current calendar date without requiring manual code changes
// ==========================================================================
function initDynamicIntakes() {
    const sched = CONFIG.getIntakeSchedule();

    // 1. Update Top Announcement Bar
    const announcementEl = document.getElementById('topAnnouncementText');
    if (announcementEl) {
        announcementEl.innerHTML = sched.announcementHtml;
    }

    // 2. Update Study Abroad Division Planning Callout Heading
    const actionHeading = document.getElementById('studyAbroadActionHeading');
    if (actionHeading) {
        actionHeading.textContent = sched.planningCallout;
    }

    // 3. Update Contact/Intake Form Preferred Timeline Dropdown
    const preferredDateSelect = document.getElementById('preferredDate');
    if (preferredDateSelect) {
        const currentValue = preferredDateSelect.value;
        preferredDateSelect.innerHTML = `
            <option value="" disabled ${!currentValue ? 'selected' : ''}>Select Intake / Travel Timeline</option>
            <option value="${sched.primaryTitle} (Priority)">${sched.primaryTitle} (Priority)</option>
            <option value="${sched.secondaryTitle}">${sched.secondaryTitle}</option>
            <option value="Within 1 - 3 Months">Within 1 – 3 Months</option>
            <option value="Within 3 - 6 Months">Within 3 – 6 Months</option>
            <option value="Just Exploring Options">Just Exploring Options</option>
        `;
    }

    // 4. Update Lead Magnet Modal Destination Dropdown
    const lmDestinationSelect = document.getElementById('lmDestination');
    if (lmDestinationSelect) {
        const ukOption = lmDestinationSelect.querySelector('option[value^="UK Student Visa"]');
        if (ukOption) {
            ukOption.value = `UK Student Visa (${sched.primaryTerm} ${sched.primaryYear})`;
            ukOption.textContent = `🇬🇧 United Kingdom (${sched.primaryTitle})`;
        }
    }

    // 5. Update any elements marked with data-dynamic-intake attribute
    document.querySelectorAll('[data-dynamic-intake="primary"]').forEach(el => {
        el.textContent = sched.primaryTitle;
    });
    document.querySelectorAll('[data-dynamic-intake="priority-badge"]').forEach(el => {
        el.textContent = sched.priorityBadge;
    });
    document.querySelectorAll('[data-dynamic-intake="secondary"]').forEach(el => {
        el.textContent = sched.secondaryTitle;
    });

    console.log(`[Fyzzo Dynamic Intake Engine] Active Intake: ${sched.primaryTitle} | Upcoming: ${sched.secondaryTitle}`);
}

// ==========================================================================
// 9. INITIALIZATION ON DOM LOAD
// ==========================================================================
// ==========================================================================
// 9. SOCIAL FEEDS & BLOG (settings in CONFIG.social)
// ==========================================================================
function initSocialFeeds() {
    const S = CONFIG.social;
    const urls = { instagram: S.instagramUrl, tiktok: S.tiktokUrl, facebook: S.facebookUrl, x: S.xUrl, google: S.googleBusinessUrl };

    // Keep every social link on the page in sync with CONFIG
    document.querySelectorAll('[data-social]').forEach(function(a) {
        const kind = a.getAttribute('data-social');
        if (urls[kind]) a.href = urls[kind];
        if (kind === 'blog' && S.blogUrl) {
            a.hidden = false;
            a.href = S.blogUrl;
            a.removeAttribute('onclick');
            if (/^https?:/i.test(S.blogUrl)) {
                a.target = '_blank';
                a.rel = 'noopener';
            } else {
                a.removeAttribute('target');
            }
        }
    });

    if (S.blogUrl) {
        const strip = document.getElementById('blog');
        const all = document.getElementById('blogAllLink');
        if (strip) strip.hidden = false;
        if (all) {
            all.href = S.blogUrl;
            if (!/^https?:/i.test(S.blogUrl)) all.removeAttribute('target');
        }
        loadBlogPosts(S.blogUrl);
    }

    if (S.instagramBeholdFeedId) {
        const slot = document.getElementById('instagramFeed');
        if (slot) {
            slot.className = 'insta-live';
            slot.innerHTML = '';
            const w = document.createElement('behold-widget');
            w.setAttribute('feed-id', S.instagramBeholdFeedId);
            slot.appendChild(w);
            const s = document.createElement('script');
            s.type = 'module';
            s.src = 'https://w.behold.so/widget.js';
            document.head.appendChild(s);
        }
    }

    // TikTok & Facebook load only when the visitor scrolls near the section
    const section = document.getElementById('social');
    if (!section) return;
    const loadEmbeds = function() {
        if (S.showTikTokFeed && S.tiktokHandle) {
            const slot = document.getElementById('tiktokFeed');
            if (slot) {
                const h = S.tiktokHandle;
                slot.innerHTML = '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@' + h + '" data-unique-id="' + h + '" data-embed-type="creator" style="max-width:780px;min-width:288px;margin:0;"><section><a target="_blank" rel="noopener" href="https://www.tiktok.com/@' + h + '?refer=creator_embed">@' + h + '</a></section></blockquote>';
                const s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.tiktok.com/embed.js';
                document.body.appendChild(s);
            }
        }
        if (S.showFacebookFeed && S.facebookUrl) {
            const slot = document.getElementById('facebookFeed');
            if (slot) {
                const src = 'https://www.facebook.com/plugins/page.php?href=' + encodeURIComponent(S.facebookUrl) +
                    '&tabs=timeline&width=500&height=520&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false';
                slot.innerHTML = '<iframe title="Fyzzo Voyage on Facebook" src="' + src + '" width="100%" height="520" style="border:none;overflow:hidden;display:block" scrolling="no" frameborder="0" allowfullscreen="true" loading="lazy"></iframe>';
            }
        }
    };
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(function(entries) {
            if (entries.some(function(e) { return e.isIntersecting; })) {
                io.disconnect();
                loadEmbeds();
            }
        }, { rootMargin: '600px 0px' });
        io.observe(section);
    } else {
        loadEmbeds();
    }
}

function stripHTML(html) {
    const doc = new DOMParser().parseFromString(html || '', 'text/html');
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
}

function renderBlogPosts(posts, blogUrl) {
    const grid = document.getElementById('blogPosts');
    if (!grid) return;
    if (!posts.length) {
        grid.innerHTML = '<a class="blog-post-card blog-post-empty" href="' + escapeHTML(blogUrl) + '" target="_blank" rel="noopener"><div class="blog-post-body"><h4>Read our latest articles</h4><p>Study abroad, visa and travel guides from the Fyzzo Voyage team.</p><span class="blog-read">Visit the blog &rarr;</span></div></a>';
        return;
    }
    grid.innerHTML = posts.slice(0, 3).map(function(p) {
        const date = p.date ? new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
        const excerpt = p.excerpt.length > 140 ? p.excerpt.slice(0, 137) + '...' : p.excerpt;
        return '<a class="blog-post-card" href="' + escapeHTML(p.link) + '"' + (p.internal ? '' : ' target="_blank" rel="noopener"') + '>' +
            (p.image ? '<img src="' + escapeHTML(p.image) + '" alt="" loading="lazy">' : '<div class="blog-post-noimg"><i class="si si-blog"></i></div>') +
            '<div class="blog-post-body"><span class="blog-date">' + escapeHTML(date) + '</span><h4>' + escapeHTML(p.title) + '</h4><p>' + escapeHTML(excerpt) + '</p><span class="blog-read">Read article &rarr;</span></div></a>';
    }).join('');
}

function loadBlogPosts(blogUrl) {
    const base = blogUrl.replace(/\/+$/, '');

    // 0. The blog built into this website (blog/posts.json)
    if (!/^https?:/i.test(blogUrl)) {
        fetch(base + '/posts.json', { cache: 'no-cache' })
            .then(function(r) { return r.json(); })
            .then(function(posts) {
                posts.sort(function(a, b) { return (b.date || '').localeCompare(a.date || ''); });
                renderBlogPosts(posts.map(function(p) {
                    return {
                        title: p.title,
                        link: base + '/' + p.slug + '.html',
                        date: p.date ? p.date + 'T12:00:00' : '',
                        excerpt: p.excerpt || '',
                        image: p.image || '',
                        internal: true
                    };
                }), blogUrl);
            })
            .catch(function() { renderBlogPosts([], blogUrl); });
        return;
    }

    // 1. WordPress (self-hosted or wordpress.com)
    fetch(base + '/wp-json/wp/v2/posts?per_page=3&_embed')
        .then(function(r) { if (!r.ok) throw new Error('not wordpress'); return r.json(); })
        .then(function(items) {
            if (!Array.isArray(items)) throw new Error('not wordpress');
            renderBlogPosts(items.map(function(it) {
                const media = it._embedded && it._embedded['wp:featuredmedia'] && it._embedded['wp:featuredmedia'][0];
                return {
                    title: stripHTML(it.title && it.title.rendered),
                    link: it.link,
                    date: it.date,
                    excerpt: stripHTML(it.excerpt && it.excerpt.rendered),
                    image: media && media.source_url ? media.source_url : ''
                };
            }), blogUrl);
        })
        .catch(function() {
            // 2. Blogger / Blogspot (JSONP feed)
            const cb = 'fyzzoBlogCb' + Date.now();
            const timer = setTimeout(function() { delete window[cb]; renderBlogPosts([], blogUrl); }, 8000);
            window[cb] = function(data) {
                clearTimeout(timer);
                delete window[cb];
                const entries = (data && data.feed && data.feed.entry) || [];
                renderBlogPosts(entries.map(function(e) {
                    const alt = (e.link || []).find(function(l) { return l.rel === 'alternate'; });
                    const thumb = e.media$thumbnail && e.media$thumbnail.url ? e.media$thumbnail.url.replace(/\/s\d+(-c)?\//, '/s600/').replace(/=s\d+(-c)?$/, '=s600') : '';
                    return {
                        title: e.title ? e.title.$t : '',
                        link: alt ? alt.href : blogUrl,
                        date: e.published ? e.published.$t : '',
                        excerpt: stripHTML((e.summary && e.summary.$t) || (e.content && e.content.$t) || ''),
                        image: thumb
                    };
                }), blogUrl);
            };
            const s = document.createElement('script');
            s.src = base + '/feeds/posts/default?alt=json-in-script&max-results=3&callback=' + cb;
            s.onerror = function() { clearTimeout(timer); delete window[cb]; renderBlogPosts([], blogUrl); };
            document.body.appendChild(s);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize Automatic Dynamic Intake Cycle
    initDynamicIntakes();

    // 0b. Social feeds, side bar & blog
    initSocialFeeds();

    // 0c. Coming from a service page (?service=...#contact): pre-select that service in the form
    try {
        const wanted = new URLSearchParams(location.search).get('service');
        const sel = document.getElementById('serviceRequired');
        if (wanted && sel) {
            const opt = Array.prototype.find.call(sel.options, function(o) { return o.value === wanted; });
            if (opt) sel.value = opt.value;
        }
    } catch (e) { /* older browsers: the form still works, just without pre-selection */ }

    // 1. Mobile toggle listener
    const toggleBtn = document.getElementById('mobileToggle');
    const closeBtn = document.getElementById('drawerClose');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // 2. Initialize UK Financial Calculator
    recalculateUKFinancials();

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

    // 5. Scroll & Exit-Intent Triggers for Complimentary Master Guide Popup
    let scrollTriggered = false;
    window.addEventListener('scroll', () => {
        if (scrollTriggered || sessionStorage.getItem('fyzzo_lead_magnet_shown')) return;
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
        if (scrollPercent > 0.48) {
            scrollTriggered = true;
            openLeadMagnetModal();
        }
    }, { passive: true });

    let exitTriggered = false;
    document.addEventListener('mouseleave', (e) => {
        if (exitTriggered || sessionStorage.getItem('fyzzo_lead_magnet_shown')) return;
        if (e.clientY <= 15) {
            exitTriggered = true;
            openLeadMagnetModal();
        }
    });

    // Close Lightbox and Lead Magnet on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeLeadMagnetModal();
        }
    });

    console.log("Fyzzo Voyage 2.0 digital platform initialized successfully.");
});
