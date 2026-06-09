import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    const body = req.body
    const row = [
      new Date().toISOString(),
      body.age || '',
      body.gender || '',
      body.gym_experience || '',
      body.gym_aim || '',
      body.gym_days_per_week || '',
      body.gym_hours_per_workout || '',
      body.gym_consistency || '',
      body.takes_supplements || '',
      body.selected_supplements || '',
      body.supplement_details || '',
      body.otc_medications_used || '',
      body.otc_details || '',
      body.read_labels || '',
      body.concurrent_medicines || '',
      body.combined_supplements || '',
      body.know_caffeine_limit || '',
      body.aware_of_interactions || '',
      body.recommended_by || '',
      body.side_effects || '',
      body.lifestyle_habits || ''
    ]

    // Check if header row exists; add it if sheet is empty
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1'
    })

    if (!existing.data.values || existing.data.values.length === 0) {
      const headers = [
        'Timestamp',
        'Age',
        'Gender',
        'Gym Experience',
        'Gym Aim',
        'Days per Week',
        'Workout Hours',
        'Consistency',
        'Takes Supplements?',
        'Selected Supplements',
        'Supplement Details',
        'OTC Medications Used',
        'OTC Full Details',
        'Reads Medication Labels?',
        'Concurrent Medicines',
        'Combined Supplements',
        'Knows Caffeine Limit?',
        'Aware of Interactions?',
        'Recommended By',
        'Side Effects',
        'Lifestyle Habits'
      ]
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [headers] }
      })
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] }
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Sheets API error:', err)
    return res.status(500).json({ error: 'Failed to submit feedback' })
  }
}
