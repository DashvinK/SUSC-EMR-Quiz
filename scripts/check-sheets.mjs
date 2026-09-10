// Preflight check for the Google Sheets backend.
//
// Verifies that your service-account credentials can authenticate AND reach the
// target Sheet, then prints the spreadsheet title and tab names. Run it after the
// one-time Google Cloud setup and before deploying, to catch the common mistakes
// (wrong Sheet ID, forgot to share the Sheet with the service account, malformed
// private key) with a clear message.
//
// Usage (Node 20.6+ / this project is on 24):
//   node --env-file=.env.local scripts/check-sheets.mjs
//
// It only READS metadata — it does not write to or modify your Sheet.

import { google } from "googleapis";
import { normalizeSheetId } from "../api/submit-result.js";

function fail(msg, hint) {
  console.error(`\n❌ ${msg}`);
  if (hint) console.error(`   → ${hint}`);
  process.exit(1);
}

const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
const sheetId = normalizeSheetId(process.env.GOOGLE_SHEET_ID);
const tab = process.env.GOOGLE_SHEET_TAB || "Sheet1";

if (!email) fail("GOOGLE_SERVICE_ACCOUNT_EMAIL is not set.", "Add it to .env.local (see .env.local.example).");
if (!rawKey) fail("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is not set.", "Copy it from the service account JSON; keep the \\n escapes.");
if (!sheetId) fail("GOOGLE_SHEET_ID is not set.", "It's the long id in the Sheet's URL: /spreadsheets/d/<THIS>/edit");

const privateKey = rawKey.replace(/\\n/g, "\n");
if (!privateKey.includes("BEGIN PRIVATE KEY")) {
  fail(
    "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY doesn't look like a PEM key.",
    'It should start with "-----BEGIN PRIVATE KEY-----".'
  );
}

console.log("• Service account:", email);
console.log("• Sheet ID:       ", sheetId);
console.log("• Expected tab:   ", tab);

const auth = new google.auth.JWT({
  email,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

try {
  await auth.authorize();
  console.log("\n✓ Authenticated with Google.");
} catch (err) {
  fail(`Authentication failed: ${err?.message || err}`, "Check the service-account email and private key.");
}

const sheets = google.sheets({ version: "v4", auth });

let meta;
try {
  const res = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  meta = res.data;
} catch (err) {
  const code = err?.code || err?.response?.status;
  if (code === 403) {
    fail(
      "The service account can't access this Sheet (403).",
      `Share the Sheet with ${email} as an Editor, then re-run.`
    );
  }
  if (code === 404) {
    fail("Sheet not found (404).", "Double-check GOOGLE_SHEET_ID.");
  }
  fail(`Could not read the Sheet: ${err?.message || err}`);
}

const tabs = (meta.sheets || []).map((s) => s.properties.title);
console.log(`✓ Reached spreadsheet: "${meta.properties.title}"`);
console.log("✓ Tabs:", tabs.join(", ") || "(none)");

if (!tabs.includes(tab)) {
  console.warn(
    `\n⚠ The tab "${tab}" doesn't exist in this Sheet.\n` +
      `   Set GOOGLE_SHEET_TAB to one of: ${tabs.join(", ")}`
  );
  process.exit(2);
}

console.log(
  `\n✅ All good — submissions will append to the "${tab}" tab.\n` +
    "   Make sure its header row is:\n" +
    "   timestamp | qr_source | quiz_length | dept_1 | dept_2 | score_breakdown | name | email | email_opt_in"
);
