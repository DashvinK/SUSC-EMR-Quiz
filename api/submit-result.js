import { google } from "googleapis";

// Vercel serverless function (build plan §8).
// Appends one row per submission to a Google Sheet via the Sheets API.
//
// Sheet header row (set manually, see §2):
//   timestamp | qr_source | quiz_length | dept_1 | dept_2 | score_breakdown | name | email | email_opt_in
//
// Required env vars (Vercel project settings — never commit):
//   GOOGLE_SERVICE_ACCOUNT_EMAIL
//   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY   (newlines escaped as \n)
//   GOOGLE_SHEET_ID
// Optional:
//   GOOGLE_SHEET_TAB  (defaults to "Sheet1")

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// Accept either a bare Sheet ID or a full spreadsheet URL pasted by mistake.
export function normalizeSheetId(value) {
  if (!value) return value;
  const fromUrl = value.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (fromUrl) return fromUrl[1];
  // Strip anything after the id (e.g. "<id>/edit?gid=0").
  return value.split("/")[0].trim();
}

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!email || !rawKey || !process.env.GOOGLE_SHEET_ID) {
    throw new Error("Missing Google Sheets environment configuration");
  }

  // Env vars store the PEM with literal "\n" — turn them back into real newlines.
  const privateKey = rawKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: SCOPES,
  });

  return google.sheets({ version: "v4", auth });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Vercel parses JSON bodies automatically, but tolerate a raw string too.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Missing request body" });
  }

  const {
    qrSource = "direct",
    quizLength = "",
    dept1 = "",
    dept2 = "",
    scoreBreakdown = {},
    name = "",
    email = "",
    emailOptIn = false,
  } = body;

  const row = [
    new Date().toISOString(), // server-generated timestamp
    qrSource,
    quizLength,
    dept1,
    dept2,
    JSON.stringify(scoreBreakdown),
    name,
    email,
    emailOptIn ? "TRUE" : "FALSE",
  ];

  const tab = process.env.GOOGLE_SHEET_TAB || "Sheet1";

  try {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: normalizeSheetId(process.env.GOOGLE_SHEET_ID),
      range: `${tab}!A:I`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    // Log server-side; let the client decide whether to retry (§8.5, §9).
    console.error("submit-result: Sheets append failed:", err?.message || err);
    return res.status(502).json({ error: "Failed to record submission" });
  }
}
