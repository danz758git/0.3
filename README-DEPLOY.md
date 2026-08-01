# EdgeLantern — Deployment Guide

Static site, no build step.

**Note:** if you're using Porkbun's native **Static Hosting → GitHub Connect**
feature (Account → Web Hosting → your domain → GitHub Connect), you don't
need most of what's below — just push this repo to GitHub, connect it in
Porkbun's dashboard, and Porkbun auto-deploys on every push. The GitHub
Pages + manual DNS instructions in this file are the fallback path if you'd
rather host via GitHub Pages directly instead of Porkbun's own hosting.

Either way, the Formspree endpoint step (§1) still applies first.

---

## 1. The early-access form endpoint

Already wired to a live Formspree endpoint (`https://formspree.io/f/mwvgdkjb`)
in `index.html`. If you ever need to point it at a different form (e.g. a
fresh Formspree form, or a switch to Getform/Basin), just replace that URL
in the form's `action` attribute — no other code changes needed.

**One-time step per new Formspree form:** Formspree emails a confirmation
link after the *first* real submission to any given form ID — it won't
deliver anything until that link is clicked. Check inbox (and spam) after
your first test submission.

(Getform.io and Basin are equivalent alternatives if you'd rather not use
Formspree — same setup pattern, just a different `action` URL.)

## 2. Push to GitHub

```bash
cd edgelantern-site
git init
git add .
git commit -m "EdgeLantern v0 landing page"
git branch -M main
git remote add origin https://github.com/<your-org>/edgelantern-site.git
git push -u origin main
```

## 3. Enable GitHub Pages

1. On GitHub: repo → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`.
3. Branch: `main`, folder: `/ (root)`. Save.
4. Under "Custom domain", enter `edgelantern.com` and save — this writes
   the `CNAME` file check (the one already in this repo covers it, but
   GitHub re-confirms via this field).
5. Check **Enforce HTTPS** once the certificate provisions (may take a few
   minutes to appear as an option — GitHub issues it automatically once DNS
   is verified in step 4 below).

## 4. Point Porkbun DNS at GitHub Pages

In Porkbun: **Domain Management** → `edgelantern.com` → **DNS Records**.

Add these records (remove any conflicting default A/CNAME records first):

| Type | Host | Answer | Notes |
|---|---|---|---|
| A | (blank / @) | `185.199.108.153` | GitHub Pages IP 1 of 4 |
| A | (blank / @) | `185.199.109.153` | GitHub Pages IP 2 of 4 |
| A | (blank / @) | `185.199.110.153` | GitHub Pages IP 3 of 4 |
| A | (blank / @) | `185.199.111.153` | GitHub Pages IP 4 of 4 |
| CNAME | www | `<your-org>.github.io.` | Handles www.edgelantern.com |

(GitHub's four Pages IPs are stable and documented at
docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
— worth a quick check that they haven't changed before adding.)

## 5. Verify

- Wait for DNS propagation (usually under an hour, occasionally longer).
- Visit `edgelantern.com` — should load the site over HTTPS.
- Submit a test entry through the early-access form and confirm it arrives
  via Formspree.
- Check on mobile — the layout is responsive but worth a real-device check.

## 6. Updating the site later

Any push to `main` redeploys automatically — no separate build/deploy step.

```bash
git add .
git commit -m "update copy"
git push
```

## Notes

- No pricing or implementation-level technical detail belongs on this site
  yet — see `ip-strategy.md` §6 and `price-book.md` §4 for why. Everything
  in this v0 is written to stay benefit-level.
- The two visual signatures (the amber "lantern glow" and the slate "edge
  line") are CSS-only — no images to swap out if copy or sections change
  later, just edit `styles.css`.
- Favicon is a single SVG (`assets/favicon.svg`) — no separate PNG sizes
  needed for modern browsers, but add a `favicon.ico` fallback later if you
  want broader legacy-browser coverage.
