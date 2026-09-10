# Deploying to Vercel

First time? This takes ~5–10 minutes. Vercel auto-detects this project (Vite frontend +
`api/submit-result.js` serverless function + the SPA rewrites in `vercel.json`), so the only manual
part is pasting in your three environment variables.

> Prerequisite: the repo is pushed to GitHub (done ✅) and the Google Sheets setup is complete
> (`npm run check:sheets` is green).

---

## 1. Create a Vercel account

1. Go to <https://vercel.com/signup>.
2. **Continue with GitHub** → authorize Vercel. Using GitHub to sign in makes importing the repo
   one click.

## 2. Import the repository

1. On the dashboard, click **Add New… → Project**.
2. Under **Import Git Repository**, find `susc-emr-quiz`.
   - If it's not listed, click **Adjust GitHub App Permissions** (or "Configure GitHub App") and
     grant Vercel access to that repo, then come back.
3. Click **Import**.

## 3. Configure the project (before the first deploy)

On the **Configure Project** screen, leave the build settings alone — they're auto-detected:

| Setting | Value (leave as detected) |
| --- | --- |
| Framework Preset | **Vite** |
| Root Directory | `./` |
| Build Command | `vite build` (or `npm run build`) |
| Output Directory | `dist` |
| Install Command | `npm install` |

Then expand **Environment Variables** and add these three (click **Add** after each):

| Name | Value |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | the service-account email |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | the private key (see the note below) |
| `GOOGLE_SHEET_ID` | just the id, e.g. `1qJpn1Cc2akz…` |

> **Private key — read this:** paste the key value **without** the surrounding double quotes you
> have in `.env.local`, but **keep the `\n` sequences**. So paste exactly:
> `-----BEGIN PRIVATE KEY-----\nMIIE…\n-----END PRIVATE KEY-----\n`
> The function converts those `\n` into real line breaks. (If Vercel complains, it's almost always
> this field — wrong quotes or missing `\n`.)

Adding the vars here means the function works on the **first** deploy. (You can also add them later
under **Settings → Environment Variables**, but then you must redeploy — see step 6.)

## 4. Deploy

Click **Deploy**. Vercel installs, builds, and publishes. ~1–2 minutes. When it's done you'll get a
live URL like `https://susc-emr-quiz.vercel.app`.

## 5. Test the live site

1. Open the URL, take the quiz.
2. Open your Google Sheet — a new row should appear.
3. Also test a QR-style link: `https://your-app.vercel.app/?src=test-launch` and confirm the
   `qr_source` column records `test-launch`.

If the row doesn't appear, open **Vercel → your project → Deployments → (latest) → Functions** (or
the **Logs** tab) and look at `api/submit-result` — the error there tells you what's wrong (usually
the private key formatting from step 3).

## 6. If you added env vars *after* deploying

Env var changes don't apply to an existing build automatically:

1. **Settings → Environment Variables** → add/edit them (select **Production**, and **Preview** if
   you want preview branches to work too).
2. **Deployments** tab → latest deployment → **⋯ menu → Redeploy**.

## 7. From now on

- **Every `git push` to your main branch auto-deploys** to production. Push a fix, it goes live.
- Pull requests / other branches get their own **preview URLs** automatically.

## 8. (Optional) Custom domain

**Settings → Domains → Add** a domain you own and follow the DNS instructions. Not required — the
`.vercel.app` URL works fine for QR codes.

---

## Generating the QR codes

Once you have the live URL, make one QR code per placement, each with a different `?src=` tag so you
can see in the Sheet which poster/location drove each submission:

- Lobby poster → `https://your-app.vercel.app/?src=poster-lobby`
- Instagram bio → `https://your-app.vercel.app/?src=ig-bio`
- Booth flyer → `https://your-app.vercel.app/?src=booth-flyer`

Any free QR generator works. No `?src=` → recorded as `direct`.
