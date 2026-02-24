# Ageing in Place Quiz - Implementation Plan

## 1) Objective
Build a standalone, accessible, mobile-friendly quiz webpage (vanilla HTML/CSS/JS) based on the project brief in `Ageing in Place Quiz.pdf`.

## 2) Scope (In)
- Single-page quiz with:
  - Welcome screen
  - 3 question screens (one question per screen)
  - Results screen with score band messaging and contextual guidance
- Scoring:
  - A = 2, B = 1, C = 0
  - Total score range = 0 to 6
- Accessibility target:
  - WCAG 2.1 AA-oriented implementation
- Branding:
  - Summer Foundation logo and palette
  - Figtree font with Arial/sans-serif fallback
- CTA button on results page linking to signup URL in a new tab
- No tracking, no cookies, no data collection/storage

## 3) Scope (Out / Non-Goals)
- Compliance auditing functionality
- Retrofitting recommendations engine
- User accounts, persistence, backend services, analytics

## 4) Proposed Repository Structure
- `/index.html`
- `/styles.css`
- `/script.js`
- `/assets/summer-foundation-logo.svg`
- `/README.md`
- `/BRIEF.md` (copied/condensed requirements)

## 5) Implementation Approach
1. Build semantic screen containers in `index.html`:
   - Header (logo + title)
   - Card container for dynamic screen content
   - Progress indicator region
2. Define design tokens in `styles.css`:
   - Brand colors:
     - `#FFF3E7` (Bone)
     - `#24072B` (Dark Purple)
     - `#FDB515` (Yellow accent)
     - `#C95027` (Orange accent)
     - `#382F2D` (Warm Charcoal)
   - Typography scale ensuring:
     - Heading >= 28px
     - Body >= 18px
   - High-contrast states and visible keyboard focus
3. Implement state-driven quiz flow in `script.js`:
   - Constants:
     - `SIGNUP_URL`
     - `LOGO_PATH`
   - Question configuration array
   - State object:
     - current screen
     - selected answers
     - computed score
   - Render methods:
     - welcome
     - question
     - results
   - Navigation methods:
     - start
     - next (disabled until selected)
     - back (Q2/Q3)
     - start again (reset state)
4. Implement results logic:
   - Score band mapping:
     - 5-6: "Strong foundation"
     - 3-4: "Good start, with room to grow"
     - 0-2: "A few barriers today - and a chance to plan ahead"
   - Include:
     - score band message
     - per-question reflection guidance
     - Victoria context note
     - mailing-list CTA button (new tab)
5. Documentation:
   - Update `README.md` with local run, Vercel deploy, copy updates, URL change, logo replacement
   - Add concise `BRIEF.md` for maintainable handoff

## 6) Accessibility Checklist (Build + Review)
- Keyboard-only usable across all controls
- Correct use of `fieldset` + `legend` for each radio group
- Labels associated with inputs
- Focus ring clearly visible on all interactive elements
- Progress text announced and readable (no color-only signaling)
- Button states visually distinct (default/hover/focus/active/disabled)
- Sufficient contrast for text and UI components
- Logical heading hierarchy and landmark structure

## 7) QA / Validation Plan
1. Functional tests:
   - All 3 answer options selectable per question
   - Next disabled until answer selected
   - Back preserves previous selection
   - Score computed correctly for all combinations
2. Content tests:
   - Exact prompt/options match approved copy
   - Results band text maps correctly
   - Victoria note present and non-compliance framing avoided
3. UX tests:
   - Mobile layout (tablet + phone widths)
   - Tap targets comfortably large
   - Progress indicator shown on each question screen
4. Accessibility smoke tests:
   - Keyboard traversal
   - Screen reader labels
   - Contrast checks (quick pass with browser tools)
5. Deployment test:
   - Vercel static deployment renders assets, font, and logo correctly

## 8) Milestones
1. Scaffold and base styles
2. Quiz flow and scoring
3. Results content and CTA
4. Accessibility hardening
5. Documentation and deployment notes

## 9) Definition of Done
- All required screens implemented and navigable
- Score band logic and messaging accurate
- Accessibility requirements addressed at implementation level
- Brand style constraints applied
- README includes all requested maintenance/deployment instructions
- No data collection/tracking/cookies

## 10) Confirmed Decisions
1. Show numeric score on the results page (for example: `4/6`).
2. Always show all three feature explanations on results.
3. Use current brief wording as baseline copy (editable later).
4. Use the provided Summer Foundation logo asset.
