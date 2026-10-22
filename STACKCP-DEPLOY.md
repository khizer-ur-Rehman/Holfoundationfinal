# StackCP deployment: website forms

The production build is a static React site plus one PHP endpoint. It sends Contact, Jobs, Internships and Volunteering submissions through Resend to `info@holwelfare.org` and `sameer@iterativelab.pk`.

## 1. Configure the Resend key privately

1. In StackCP File Manager, create a `private` directory outside the domain's `public_html` directory (in the hosting account home directory).
2. Copy `deployment/stackcp/hol-form-config.example.php` there as `hol-form-config.php`.
3. Replace the example value with the real Resend API key. Do not put the key in React, `public_html`, Git, or a screenshot.
4. Restrict the config file permissions to the hosting account where StackCP permits it. If StackCP provides PHP environment variables, `RESEND_API_KEY` can be used instead. If the config is in a custom path, set `HOL_FORM_CONFIG` to its absolute path.

The endpoint checks `HOL_FORM_CONFIG`, the account `HOME/private` directory, and common private-directory locations above the document root. It refuses to load the configuration from inside `public_html`.

## 2. Build and upload

1. Run `npm ci`, then `npm run build` in the project.
2. Upload the **contents** of `dist/` to the domain's `public_html` directory, including hidden files such as `.htaccess`.
3. Confirm these paths exist on the host:
   - `public_html/index.html`
   - `public_html/api/send-email.php`
   - `public_html/.htaccess`
4. In StackCP, select a supported PHP 7.4+ version for the domain and ensure the PHP cURL extension is enabled. Resend requests need outbound HTTPS access.

## 3. Verify delivery

Submit one test from each of Contact, Jobs, Internships and Volunteering. A green tick appears only after Resend returns a successful email ID; a red cross appears for a failed request. Check both inboxes and spam. Resend's verified sending domain must allow `forms@holwelfare.org` as the sender. The first real submission may also require Resend's recipient/domain setup to be approved for production sending.

If a request fails, inspect the hosting PHP error log for the `[HOL form email]` entry. The API key and provider response are not returned to the browser. Never paste the key into a support ticket or public log.

## What gets deployed

Vite copies `public/` into `dist/`, so the PHP endpoint and Apache rewrite rules are part of the normal production build. The private config example is outside `public/` and is not copied into the site build.
