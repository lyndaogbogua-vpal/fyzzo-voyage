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
let adminModeActive = false;

function initReviews() {
    const defaultReviews = [
        {
            id: "rev-1",
            name: "Augustine U.",
            service: "Student Visa Support — United Kingdom",
            rating: 5,
            date: "Client Story",
            text: "We had already started the process with another agent, but we became uncomfortable with how things were being handled. Fyzzo Voyage stepped in, reviewed my sister's documents and prepared her properly for the school interview. They conducted several mock sessions with her before the interview, and she eventually got through successfully. The support gave us confidence."
        },
        {
            id: "rev-2",
            name: "Mrs. Adebayo",
            service: "Visit Visa Support — United Kingdom",
            rating: 5,
            date: "Client Story",
            text: "I needed to attend a professional conference in London on short notice. Fyzzo Voyage helped structure my employer documentation, conference invitation, and travel explanation letter with total clarity. The document checklist made everything straightforward, and the visa was granted smoothly."
        },
        {
            id: "rev-3",
            name: "Chinedu O.",
            service: "Study Abroad Support — Canada",
            rating: 5,
            date: "Client Story",
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
                <span class="story-date">${escapeHTML(rev.date || 'Client Story')}</span>
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

    const lead = {
        id: 'lm-' + Date.now(),
        type: 'Lead Magnet Blueprint Download',
        name: name,
        phone: phone,
        email: email,
        destination: destination,
        timestamp: new Date().toISOString()
    };

    try {
        const stored = JSON.parse(localStorage.getItem('fyzzo_voyage_leads') || '[]');
        stored.unshift(lead);
        localStorage.setItem('fyzzo_voyage_leads', JSON.stringify(stored));
    } catch(err) {
        console.warn('Storage error:', err);
    }

    fetch('https://formsubmit.co/ajax/fyzzovoyage@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: 'New Lead Magnet Download: ' + name + ' (' + phone + ')',
            Name: name,
            WhatsApp: phone,
            Email: email,
            Destination: destination,
            DownloadedResource: 'Fyzzo Voyage 2027 Study & Visa Master Guide'
        })
    }).catch(function(e) { console.log('Formsubmit dispatch status:', e); });

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
        recCountry = 'United Kingdom — January 2027 Fast-Track & Graduate Route';
        matchScore = 95;
        summary = 'Most streamlined admissions and visa turnaround with WAEC English waiver and 2-year Graduate Route.';
        whyPoints = [
            'Admissions currently open for January 2027 intake with rapid offer issuances',
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

    const quizLeadRecord = {
        id: 'quiz-' + Date.now(),
        submittedAt: new Date().toISOString(),
        fullName: fullName,
        whatsapp: whatsapp,
        email: email,
        answers: quizState.answers,
        evaluation: evaluation
    };

    try {
        const storedQuiz = JSON.parse(localStorage.getItem('fyzzo_quiz_leads') || '[]');
        storedQuiz.unshift(quizLeadRecord);
        localStorage.setItem('fyzzo_quiz_leads', JSON.stringify(storedQuiz));
    } catch(err) {
        console.warn('Storage warning:', err);
    }

    fetch('https://formsubmit.co/ajax/fyzzovoyage@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: '🎯 New Relocation Quiz Assessment: ' + fullName + ' (' + whatsapp + ')',
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
        })
    }).catch(function(err) { console.log('Email dispatch status:', err); });

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

    // 1. Save lead locally to ensure 0% lead loss
    const lead = {
        id: "lead-" + Date.now(),
        submittedAt: new Date().toISOString(),
        fullName,
        whatsapp,
        email,
        countryResidence,
        destination,
        service,
        intakeDate,
        referralSource,
        currentSituation
    };
    try {
        const existingLeads = JSON.parse(localStorage.getItem('fyzzo_voyage_leads') || '[]');
        existingLeads.unshift(lead);
        localStorage.setItem('fyzzo_voyage_leads', JSON.stringify(existingLeads));
    } catch (err) {
        console.warn("Local lead storage warning:", err);
    }

    // 2. Construct formatted message for WhatsApp direct connection
    const summaryMsg = `Hello Fyzzo Voyage, I submitted an intake form on your website:\n\n👤 Name: ${fullName}\n📞 WhatsApp: ${whatsapp}\n✉️ Email: ${email}\n📍 Residence: ${countryResidence}\n🌍 Destination: ${destination}\n📋 Service: ${service}\n⏳ Target Date: ${intakeDate}\n📢 Source: ${referralSource}\n📝 Notes: ${currentSituation || 'None'}\n\nI would like to discuss my next steps.`;

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
            appendFyvoyMessage('bot', `Under official UK Student Visa guidelines:\n\n• **Inside London:** £1,529/mo (Standard) or £1,570/mo (Updated rules) for max 9 months\n• **Outside London:** £1,171/mo (Standard) or £1,203/mo (Updated rules) for max 9 months\n+ any outstanding Year 1 tuition fee, held for the statutory 28-day financial evidence requirement.\n\n💡 *Fyzzo Voyage provides Proof of Funds Readiness Reviews (₦100,000) to ensure your genuine bank statements meet every compliance rule.*`);
        }
        else if (lower.includes('visit') || lower.includes('tourist') || lower.includes('conference') || lower.includes('family')) {
            appendFyvoyMessage('bot', `For **Visit & Family Visas (₦380,000 service fee)**, our support includes:\n\n• Custom document checklist for your profile\n• Professionally prepared Cover Letter / Travel Explanation\n• Online application review & civil ties audit\n• Biometric scheduling assistance\n\nWe cover UK, Canada, USA, Schengen, and other destinations.`);
        }
        else if (lower.includes('flight') || lower.includes('ticket') || lower.includes('hotel') || lower.includes('fare') || lower.includes('accommodation')) {
            appendFyvoyMessage('bot', `Our Travel Desk assists with:\n\n• **Flight Booking:** Comparing available flight options, routes, and student baggage allowances.\n• **Accommodation Options:** Identifying suitable hotels or student halls near your campus/centre.\n• **Airport Transfers:** Coordinating trusted terminal pickups.\n\nService fee for flight & accommodation sourcing is **₦15,000**.`);
        }
        else if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('rate')) {
            appendFyvoyMessage('bot', `Here is our transparent service fee summary:\n\n• **Study Abroad Guidance Suite:** ₦500,000\n• **Visit & Family Visa Support:** ₦380,000\n• **Visa Refusal Review & Roadmap:** ₦380,000\n• **Proof of Work / Employment & Study Gap Documentation:** ₦200,000\n• **Proof of Funds Readiness Review:** ₦100,000\n• **SOP / Personal Statement Guidance:** ₦100,000\n• **1-on-1 Mock Visa Interview Prep:** ₦100,000\n• **Flight & Accommodation Sourcing:** ₦15,000\n\n*Note: Statutory embassy/university fees are paid directly to the authorities.*`);
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
