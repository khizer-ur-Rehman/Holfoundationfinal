# StackCP deployment: Web3Forms

The four React forms send submissions directly from the visitor's browser to `https://api.web3forms.com/submit`. StackCP serves the static React build; no Node.js or PHP email backend is used.

## Recipient and plan setup (required)

1. In Web3Forms, use an Access Key whose primary notification email is `info@holwelfare.org`.
2. This project omits `ccemail` so submissions work on the Free plan and go to the Access Key's primary notification email (`info@holwelfare.org`).
3. To also deliver each submission to `sameer@iterativelab.pk`, upgrade to a plan with CC/multiple recipients enabled, then configure and verify that recipient in Web3Forms. The Free plan allows 250 submissions/month and one recipient per form; Web3Forms lists Starter with up to 3 recipients and Pro with up to 5. Confirm current account entitlements in the dashboard before enabling a second recipient.

On the Free plan, only the primary inbox receives form submissions. A successful API response does not deliver a copy to `sameer@iterativelab.pk`; upgrade and configure CC/multiple recipients to enable that.

## 1. Add the Access Key before building

### Local build

1. In the project root, create or edit the ignored `.env` file (same folder as `package.json`).
2. Add this line and replace the placeholder locally:

   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your-access-key
   ```

3. Run `npm ci`, then `npm run build`.

The checked-in `.env.example` contains a blank variable name only. Never put the real key in `.env.example`, source code, chat, or a Git commit. Vite embeds `VITE_*` values into the browser build at build time; Web3Forms describes this Access Key as a public form key, not a secret server API key.

### CI or hosted build

If a CI service performs the build, add `VITE_WEB3FORMS_ACCESS_KEY` to that project's build environment variables before running `npm run build`. Changing a variable in StackCP after the build does not update an already-generated `dist/` directory. Rebuild and re-upload after changing the key.

If Vercel is used only for previews, add the same variable in **Vercel > Project > Settings > Environment Variables**, select **Preview** (and **Development** if needed), then redeploy the preview. The StackCP production site still uses the key baked into the locally built `dist/` files; StackCP runtime environment variables cannot change an existing Vite build.

## 2. Upload the production build to StackCP

1. Sign in to StackCP and open **Manage Hosting > [website package] > Options > Manage > File Manager** (or connect by FTP/SFTP).
2. Open the domain's document root, normally `public_html`.
3. Upload the **contents** of the freshly built `dist/` folder into `public_html`, including hidden `.htaccess` if present. Do not upload the source `.env` file.
4. Confirm `public_html/index.html`, `public_html/assets/`, and `public_html/.htaccess` (if produced) are present. There is no PHP endpoint to upload.

## 3. Test all four forms

After deployment, submit a real test through Contact, Jobs, Internships, and Volunteering. The page shows the existing green success tick only when the API response is HTTP-successful and contains `success: true`; otherwise it shows the service's useful error (with the Access Key redacted). Check `info@holwelfare.org`, including spam/junk. Check `sameer@iterativelab.pk` only after upgrading and configuring the second recipient. If using Vercel only for previews, remember to rebuild there with the same Vite variable; production mail delivery remains a direct browser-to-Web3Forms request from the StackCP site.

## Current verification limits

Project tests/build validate the request construction and response handling, but they do not use the real Access Key or send email. The Web3Forms paid CC entitlement, primary inbox, secondary recipient verification, and actual delivery must be confirmed in the account and tested after upload.
