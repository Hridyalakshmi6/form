# Customer Feedback Form

A multi-step customer feedback form built with React + Vite, with responses saved directly to Google Sheets via a Vercel serverless function.

## Tech stack

- **Frontend**: React 18, Vite, CSS Modules
- **Backend**: Vercel serverless function (`/api/submit.js`)
- **Data**: Google Sheets API v4 via a service account

---

## Local setup

```bash
npm install
cp .env.example .env.local
# Fill in .env.local (see below)
npm run dev
```

---

## Google Sheets setup

### 1. Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or use an existing one)
3. Enable the **Google Sheets API** → APIs & Services → Library → search "Sheets"

### 2. Create a service account

1. Go to APIs & Services → Credentials → Create Credentials → Service Account
2. Give it a name (e.g. `feedback-form`) and click Done
3. Click the service account → Keys tab → Add Key → JSON
4. Download the JSON key file — keep it safe, never commit it

### 3. Share your spreadsheet

1. Create a new Google Sheet
2. Copy the spreadsheet ID from its URL:
   `https://docs.google.com/spreadsheets/d/**THIS_PART**/edit`
3. Click Share → paste the service account email (from the JSON key, looks like `name@project.iam.gserviceaccount.com`) → Editor

### 4. Set environment variables

Open `.env.local` and fill in:

```
GOOGLE_SHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

For `GOOGLE_SERVICE_ACCOUNT_KEY`, paste the entire contents of the downloaded JSON key file — minified to one line. You can minify it at [jsonformatter.org](https://jsonformatter.org/json-minify).

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B — GitHub import

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. In Project Settings → Environment Variables, add:
   - `GOOGLE_SHEET_ID` → your sheet ID
   - `GOOGLE_SERVICE_ACCOUNT_KEY` → the minified JSON key
5. Deploy

The `vercel.json` file handles routing automatically — the Vite frontend serves from `/` and the API function lives at `/api/submit`.

---

## Project structure

```
/
├── api/
│   └── submit.js          # Vercel serverless function → Google Sheets
├── src/
│   ├── components/        # Reusable UI (Field, StarRating, ProgressBar, etc.)
│   ├── sections/          # One file per form section
│   ├── App.jsx            # Step machine & state
│   ├── App.module.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── vercel.json
└── .env.example
```

## Customising the form

- **Add a field**: edit the relevant section in `src/sections/`, update the `defaultData` object in `App.jsx`, and add the field to the payload in `handleNext`.
- **Add a section**: add an entry to the `SECTIONS` array, create a new section component, and import it in `App.jsx`.
- **Change styling**: all colours are CSS variables in `src/index.css`. Dark mode is handled automatically via `prefers-color-scheme`.
