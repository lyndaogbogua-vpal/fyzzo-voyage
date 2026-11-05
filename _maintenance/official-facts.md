# Fyzzo Voyage — Official Facts Register

Every official figure or rule shown on the website, where it appears, and the official source
used to check it. The daily update routine re-checks each row against its source.

This folder starts with `_`, so GitHub Pages does not publish it.

**Status key:** ✅ verified on the date shown · ⚠️ needs verification

## UK (GOV.UK)

| Fact | Current value on site | Where it appears | Official source | Status |
|---|---|---|---|---|
| Student visa fee (outside UK) | £558 | fyvoy-kb.js `student-visa` | https://www.gov.uk/student-visa | ✅ 2026-11-04 |
| Standard Visitor visa fee (6 months) | £135 | fyvoy-kb.js `visit-visa`, `family-visit`, FYVOY_DESTINATIONS.uk | https://www.gov.uk/standard-visitor/apply-standard-visitor-visa | ✅ 2026-11-04 |
| Long-term visitor visa fees (2/5/10 yr) | £506 / £903 / £1,128 | fyvoy-kb.js `visit-visa` | https://www.gov.uk/standard-visitor/apply-standard-visitor-visa | ✅ 2026-11-04 |
| ETA fee | £20 | fyvoy-kb.js `need-visa` | https://www.gov.uk/eta | ✅ 2026-11-04 |
| Immigration Health Surcharge | £776/yr students; £1,035/yr others | fyvoy-kb.js `ihs`, `student-visa` | https://www.gov.uk/healthcare-immigration-application/how-much-pay | ✅ 2026-11-04 |
| Student maintenance (per month, up to 9 months) | London £1,529; outside London £1,171 | fyvoy-kb.js `proof-of-funds`, `cost-of-living`; app.js CONFIG.ukVisa (current rules); blog `uk-student-visa-proof-of-funds-28-day-rule.html`; index.html calculator labels | https://www.gov.uk/student-visa/money | ✅ 2026-11-04 |
| "From 30 November 2026" maintenance option in calculator | London £1,570; outside £1,203; dependants £874 / £702 | app.js CONFIG.ukVisa (second rule set); index.html calculator `<select>` | https://www.gov.uk/student-visa/money and Statements of changes to the Immigration Rules | ⚠️ NOT found on GOV.UK on 2026-11-04; confirm or remove |
| Dependant maintenance (current) | London £845; outside £680 per month | app.js CONFIG.ukVisa | https://www.gov.uk/guidance/financial-evidence-for-student-and-child-student-route-applicants | ⚠️ not yet checked |
| 28-day rule / 31-day window | 28 consecutive days, ending within 31 days of applying | fyvoy-kb.js `proof-of-funds`; blog proof-of-funds article | https://www.gov.uk/student-visa/money | ✅ 2026-11-04 |
| Nigeria not on differential evidence list | Nigeria must submit financial evidence | fyvoy-kb.js `proof-of-funds`; blog proof-of-funds article | https://www.gov.uk/student-visa/money | ✅ 2026-11-04 |
| Decision times (outside UK) | ~3 weeks visit, student | fyvoy-kb.js `processing-time`, `student-visa`, `visit-visa` | https://www.gov.uk/student-visa ; https://www.gov.uk/standard-visitor/apply-standard-visitor-visa | ✅ 2026-11-04 |
| Graduate visa length | 2 yrs if applying on/before 31 Dec 2026; 18 months from 1 Jan 2027; 3 yrs PhD | fyvoy-kb.js `graduate-visa`, FYVOY_DESTINATIONS.uk | https://www.gov.uk/student-visa (and https://www.gov.uk/graduate-visa) | ✅ 2026-11-04 |
| Student dependants rule | Only government-sponsored or PhD/research postgraduates | fyvoy-kb.js `dependants` | https://www.gov.uk/student-visa/family-members | ✅ 2026-11-04 |
| Student work hours | Up to 20 hrs/week term-time (degree level) | fyvoy-kb.js `student-work` | https://www.gov.uk/student-visa | ⚠️ general rule, confirm wording |
| Skilled Worker minimum salary | £41,700 or going rate (higher) | fyvoy-kb.js `work-visa` | https://www.gov.uk/skilled-worker-visa/your-job | ✅ 2026-11-04 |
| Care workers (6135/6136) | Not eligible for new out-of-country Health & Care applications; extend/switch only | fyvoy-kb.js `care-worker` | https://www.gov.uk/health-care-worker-visa/your-job | ✅ 2026-11-04 |
| TB test for Nigeria | Required for stays of 6+ months | fyvoy-kb.js `tb-test` | https://www.gov.uk/tb-test-visa/countries-where-you-need-a-tb-test-to-enter-the-uk | ✅ 2026-11-04 |
| eVisa replaces BRP; UKVI account free | — | fyvoy-kb.js `evisa`; blog eVisa article | https://www.gov.uk/evisa | ✅ 2026-11-04 |
| Cash declaration threshold | £10,000+ | fyvoy-kb.js `cash-limit` | https://www.gov.uk/bringing-cash-into-uk | ⚠️ not yet checked |
| Driving on foreign licence | Up to 12 months after becoming resident | fyvoy-kb.js `driving` | https://www.gov.uk/driving-nongb-licence | ⚠️ not yet checked |

## Exchange rate (calculator)

| Fact | Current value on site | Where it appears | Source | Rule |
|---|---|---|---|---|
| GBP → NGN indicative rate | ₦2,200 / £1 (Oct 2026) | app.js `exchangeRateGBPtoNGN` + its "Updated" comment; index.html calculator note | Central Bank of Nigeria official rate or OANDA | Only update if the market rate differs by **more than 5%**, so the site isn't changed every day |

## Other countries

| Fact | Current value on site | Where it appears | Official source | Status |
|---|---|---|---|---|
| Canada study permit living costs (single, outside Quebec) | CAD $23,448 per year + tuition | fyvoy-kb.js `canada`, FYVOY_DESTINATIONS.canada | https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html | ✅ 2026-11-04 |
| Canada PAL/TAL required for most students | — | fyvoy-kb.js `canada` | https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter.html | ✅ 2026-11-04 |
| Ireland student living-cost funds | about €10,000 first year + fees | fyvoy-kb.js `ireland` | https://www.irishimmigration.ie/coming-to-study-in-ireland/ | ⚠️ approximate, confirm |
| Netherlands: university applies for MVV/residence permit; orientation year | — | fyvoy-kb.js `netherlands`, FYVOY_DESTINATIONS.netherlands | https://ind.nl/en/residence-permits/study | ⚠️ confirm |
| Germany blocked account | about €12,000 / year | fyvoy-kb.js `germany` | https://www.auswaertiges-amt.de (German missions in Nigeria) | ⚠️ approximate, confirm |
| Schengen area size; 90/180 rule | 29 countries; 90 days in 180 | fyvoy-kb.js `schengen`, FYVOY_DESTINATIONS.schengen | https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa_en | ⚠️ confirm |
| ECOWAS visa-free stay for Nigerians | up to 90 days | fyvoy-kb.js `ecowas-ghana`, FYVOY_DESTINATIONS.ghana | https://www.ecowas.int | ⚠️ confirm |
| USA student/visitor process | I-20 + F-1 interview; B1/B2 interview | fyvoy-kb.js `usa` | https://travel.state.gov | ⚠️ confirm |

## Announcement feeds to watch (new rules, new routes, fee changes)

- UK: https://www.gov.uk/search/news-and-communications?organisations%5B%5D=uk-visas-and-immigration&order=updated-newest
- UK Immigration Rules statements of changes: https://www.gov.uk/government/collections/immigration-rules-statement-of-changes
- UK visa fees table: https://www.gov.uk/government/publications/visa-regulations-revised-table
- Canada (IRCC news): https://www.canada.ca/en/immigration-refugees-citizenship/news.html
- Ireland (ISD news): https://www.irishimmigration.ie/news/
- Netherlands (IND news): https://ind.nl/en/news
- USA (State Dept visa news): https://travel.state.gov/content/travel/en/News/visas-news.html
- Schengen / EU: https://home-affairs.ec.europa.eu/news_en

## Change log

| Date | Change | Source |
|---|---|---|
| 2026-11-04 | Register created; UK and Canada figures verified | See sources above |
