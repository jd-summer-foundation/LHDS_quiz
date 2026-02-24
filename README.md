# LHDS_quiz

Interactive "Ageing in Place" reflection quiz based on universal design principles and the Livable Housing Design Standard context.

## Project structure
- `index.html` - page shell and app mount
- `styles.css` - layout, typography, and component styles
- `script.js` - quiz state, navigation, and scoring logic
- `assets/summer-foundation-logo.svg` - Summer Foundation logo asset
- `BRIEF.md` - condensed project brief

## Run locally
Use a local web server so asset paths resolve correctly.

### Option 1: Python
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

### Option 2: VS Code Live Server
Open the repository and run "Open with Live Server".

## Deploy to Vercel from GitHub
1. Push this repository to GitHub.
2. In Vercel, click **Add New Project**.
3. Import the GitHub repository.
4. Keep defaults (Framework Preset: **Other** / static site).
5. Click **Deploy**.

No environment variables are required.

## Update question copy
Edit `QUESTIONS` in `script.js`:
- `prompt` for question text
- `options[].label` for answer copy

## Change signup URL
Edit `SIGNUP_URL` in `script.js`.

## Replace logo file
Replace `assets/summer-foundation-logo.svg` with the new SVG file using the same filename/path.

## Notes
- No analytics or tracking scripts
- No cookies
- No personal data collection or storage
