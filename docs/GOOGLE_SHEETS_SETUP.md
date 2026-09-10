# Google Sheets backend — one-time setup

This wires the quiz's `/api/submit-result` function to a Google Sheet. You do this once. It takes
~10 minutes and needs no billing (the Sheets API is free at this volume).

At the end you'll have three values for your environment:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
GOOGLE_SHEET_ID
```

---

## 1. Create a Google Cloud project

1. Go to <https://console.cloud.google.com>.
2. Top bar → project dropdown → **New Project**.
3. Name it (e.g. `susc-emr-quiz`) → **Create**. Wait a few seconds, then make sure it's selected in
   the top bar.

## 2. Enable the Google Sheets API

1. Left menu → **APIs & Services → Library** (or go to
   <https://console.cloud.google.com/apis/library/sheets.googleapis.com>).
2. Search **Google Sheets API** → open it → **Enable**.

## 3. Create a service account

A service account is a "robot" Google account the app logs in as.

1. Left menu → **APIs & Services → Credentials**.
2. **+ Create Credentials → Service account**.
3. Name it (e.g. `emr-quiz-writer`) → **Create and Continue**.
4. **Grant roles**: skip this — leave it blank and click **Continue**. (The app doesn't need any
   project-level role; it gets access by you sharing the Sheet with it in step 5.)
5. **Done**.

## 4. Download its JSON key

1. On **Credentials**, click the service account you just made.
2. **Keys** tab → **Add Key → Create new key → JSON → Create**.
3. A `.json` file downloads. **Keep it private — never commit it.** Open it in a text editor; you'll
   copy two fields out of it in step 6.

The JSON looks like:

```json
{
  "type": "service_account",
  "client_email": "emr-quiz-writer@susc-emr-quiz.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n",
  ...
}
```

## 5. Create the Sheet and share it with the service account

1. Create a new sheet at <https://sheets.new>. Name it (e.g. "EMR Quiz Submissions").
2. In **row 1**, paste this header row (one value per column, A–I):

   | A | B | C | D | E | F | G | H | I |
   |---|---|---|---|---|---|---|---|---|
   | timestamp | qr_source | quiz_length | dept_1 | dept_2 | score_breakdown | name | email | email_opt_in |

   > Tip: paste `timestamp	qr_source	quiz_length	dept_1	dept_2	score_breakdown	name	email	email_opt_in`
   > (tab-separated) into cell A1 and it fills across.
3. Click **Share** (top-right).
4. In the people field, paste the service account's `client_email` from the JSON, set it to
   **Editor**, untick "Notify people", and **Share / Send**. This is the step people forget — without
   it you'll get a `403`.

## 6. Grab the Sheet ID

From the Sheet's URL:

```
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890/edit#gid=0
                                        └──────────── this is GOOGLE_SHEET_ID ────────────┘
```

## 7. Put the three values in `.env.local`

Copy `.env.local.example` to `.env.local` and fill it in:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=emr-quiz-writer@susc-emr-quiz.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**Private key — the one real gotcha:** copy the `private_key` value from the JSON *exactly as it
appears there*, including the `\n` sequences, and wrap it in double quotes. The code turns those
`\n` back into real newlines. Don't paste a key with actual line breaks into `.env.local`.

`.env.local` is git-ignored — it will not be committed.

## 8. Verify

```bash
npm run check:sheets
```

Green ✅ means auth works, the Sheet is reachable, and the tab name matches. If it complains, the
message says exactly what to fix (403 = not shared, 404 = wrong ID, etc.).

Then run the app and take the quiz — a row should appear in the Sheet:

```bash
npm run dev
```

## 9. Set the same values in Vercel (for production)

1. Vercel → your project → **Settings → Environment Variables**.
2. Add all three (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`,
   `GOOGLE_SHEET_ID`) for the **Production** (and Preview, if you want) environments. Paste the
   private key with its `\n` sequences, same as `.env.local`.
3. **Redeploy** so the new variables take effect.
4. Do one real submission on the live site and confirm the row lands.

---

### Notes

- **Multiple tabs?** If your data isn't on a tab called `Sheet1`, set `GOOGLE_SHEET_TAB` to the tab
  name (locally and in Vercel). `npm run check:sheets` prints the available tab names.
- **Rotating the key:** delete the old key under the service account's **Keys** tab and create a new
  one; update the env vars everywhere.
- **Security:** the downloaded JSON grants write access to any Sheet the service account can reach.
  Store it like a password; if it leaks, delete that key in the console.
