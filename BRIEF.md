# Ageing in Place Quiz Brief (Condensed)

## Goal
Create a standalone, accessible, mobile-friendly reflection quiz for Australians aged 50+ to consider how well a home supports ageing in place.

## Experience
- Plain, warm, non-judgemental tone
- One question per screen
- Clear progress indicator
- Large text and large tap targets
- No clutter or distracting animation

## Required Questions
1. Step-free entry
2. Level-entry shower
3. Doors and corridors

Each question has three answer options:
- A = 2 points
- B = 1 point
- C = 0 points

Total score range: 0-6.

## Results Bands
- 5-6: Strong foundation
- 3-4: Good start, with room to grow
- 0-2: A few barriers today - and a chance to plan ahead

Results page also includes:
- Numeric score
- Per-feature reflections (all three)
- Victoria context note
- CTA: "Join the mailing list" using `SIGNUP_URL`

## Accessibility
Target WCAG 2.1 AA-oriented implementation:
- Keyboard navigable
- Visible focus states
- Semantic HTML (`fieldset` + `legend`)
- High contrast
- No color-only meaning

## Technical Constraints
- Vanilla HTML/CSS/JS
- Static hosting compatible (GitHub + Vercel)
- No analytics, cookies, or personal data collection

## Branding
- Font: Figtree (fallback Arial, sans-serif)
- Logo path: `/assets/summer-foundation-logo.svg`
- Primary palette:
  - `#FFF3E7` (Bone)
  - `#24072B` (Dark Purple)
  - `#FDB515` (Yellow accent)
  - `#C95027` (Orange accent)
  - `#382F2D` (Warm Charcoal)
