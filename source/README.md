# Apex Integration — Company Website

A React (Vite) single-page site: Home, Services, About, Contact. Brand motto: *See the bigger picture*.

## Run it locally

Requires Node.js 18+ (https://nodejs.org).

```bash
npm install
npm run dev        # local preview at http://localhost:5173
```

## Build for production

```bash
npm run build
```

This creates a `dist/` folder containing plain static files (HTML, CSS, JS). That folder **is** the website — upload its contents to any static host.

## Contact form

The form posts to Web3Forms; the access key is already set in
`src/pages/Contact.jsx` and submissions are delivered to the address the key
was registered with. The public email (cs@…) is assembled by JavaScript at
runtime, so the full address never appears in the page source — basic but
effective protection against harvesting bots.

Prefer Formspree or EmailJS instead? Only the `handleSubmit` function needs to change.

## Deploy to Porkbun Static Hosting

1. In your Porkbun account, open your domain and add a **Static Hosting** plan (this requires the domain to use Porkbun's default nameservers).
2. Porkbun gives you FTP credentials. Using any FTP client (e.g. FileZilla), upload the **contents of `dist/`** (not the folder itself) to the hosting root.
3. Alternatively, connect the hosting to a **GitHub repository**: push this project to GitHub, run the build in a GitHub Action (or commit the `dist/` output), and Porkbun will pull updates automatically. See Porkbun's guide: "How to connect Static Hosting to GitHub."
4. SSL is included automatically — your site will be served over HTTPS.

### Why URLs contain `#`

The site uses hash-based routing (`/#/services`) so that every page works on static hosting with zero server configuration — refreshing or bookmarking any page just works. If you later move to a host that supports SPA rewrites (or Porkbun adds them), switch `HashRouter` to `BrowserRouter` in `src/App.jsx` for clean URLs.

## Where things live

```
public/logo.svg        Full brand lockup (mark + wordmark + motto)
public/favicon.svg     Browser tab icon
src/index.css          All design tokens and styles
src/data/services.jsx  Service catalog — edit text here
src/components/        Navbar, Footer, Logo, contour backdrop
src/pages/             Home, Services, About, Contact
```

## Editing content

- **Services text:** `src/data/services.jsx`
- **Home page copy:** `src/pages/Home.jsx`
- **Contact details:** `src/pages/Contact.jsx`
- **Colors/fonts:** the `:root` block at the top of `src/index.css`
