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
      body.name,
      body.email,
      body.phone || '',
      body.rating_product,
      body.rating_support,
      body.rating_delivery,
      body.rating_value,
      body.satisfaction,
      body.comments || '',
      body.suggestions || '',
      body.has_issue,
      body.issue_types || '',
      body.issue_description || '',
      body.nps_score,
      body.files_attached || '',
      body.allow_followup ? 'Yes' : 'No',
      body.marketing_emails ? 'Yes' : 'No',
      body.sms_updates ? 'Yes' : 'No'
    ]

    // Check if header row exists; add it if sheet is empty
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1'
    })

    if (!existing.data.values || existing.data.values.length === 0) {
      const headers = [
        'Timestamp', 'Name', 'Email', 'Phone',
        'Rating: Product', 'Rating: Support', 'Rating: Delivery', 'Rating: Value',
        'Satisfaction', 'Comments', 'Suggestions',
        'Had Issue?', 'Issue Types', 'Issue Description',
        'NPS Score', 'Files Attached',
        'Allow Follow-Up', 'Marketing Emails', 'SMS Updates'
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
