# Apex Integration — website (v1.6)

Static site. No build step, no dependencies. The files at the root are
what gets served.

## What changed in v1.6

A sixth discipline: **Video Surveillance & Monitoring**, tagged *Watch*
on the home page and *06 · Watch* on the services page, matching the
existing numbering.

Both pages were updated. `services/index.html` carries its own copy of
the discipline list, so changing only the home page would have left the
two contradicting each other — worth remembering for any future
service change.

Also on the home page: "Five disciplines" → "Six", and the section lede
gained "security" alongside the other five.

**No vendor or product brand is named anywhere.** The surveillance copy
describes the service Apex delivers, not the technology underneath it.
That is deliberate; keep it that way unless someone decides otherwise.

## Updating this on GitHub through the browser

No git client needed.

1. Go to the repository → **Add file** → **Upload files**.
2. Drag in the files you changed. For this release that is `index.html`
   and `services/index.html`; drag the whole folder if you would rather
   not think about which.
   - GitHub's uploader preserves folder structure, so dropping
     `services/` keeps it at `services/index.html`.
3. Write a commit message — "v1.6: add Video Surveillance & Monitoring"
   is enough.
4. **Commit directly to `main`.**

Porkbun's GitHub Connect republishes on every push to the default
branch, so the live site updates by itself within a minute or two. No
deploy step.

## Checking it worked

- apexintegration.ca → the home page should say "Six disciplines" and
  show the camera card between Cabling and "Not sure where to start?".
- apexintegration.ca/services/ → the sixth entry, numbered 06.
- Hard-refresh (Ctrl+F5) if you see the old copy; Porkbun and Cloudflare
  both cache.

## Folders

```
/                 the live site
  index.html      home
  services/       services detail
  about/
  contact/
  downloads/      brochure PDF
  assets/         style.css, site.js
/source           React project, NOT served - see the warning below
```

## READ THIS BEFORE EDITING CONTENT

**The served HTML and `/source` are two separate copies of the same
site, and nothing keeps them in step.** The HTML in `/`, `/services`,
`/about` and `/contact` is what visitors get. `/source` is a React
project that builds to the same site but is not what gets deployed.

This has already bitten once. When Video Surveillance & Monitoring was
added as the sixth service, it went into the served HTML but not into
`/source`. For a while the state was:

| | served HTML | /source |
|---|---|---|
| six service cards | yes | no - five |
| "Six disciplines" on /services | no - said Five | no - said Five |
| camera option in the contact form | no | no |
| About page stack sentence | no | no |

So the live contact form listed five services while the live services
page described six: a prospect could read about surveillance and then
find no way to ask for it. Both copies are now correct and agree.

**If you change content, change it in both, and grep for the old
wording afterwards.** Within `/source` the service list, the contact
dropdown, the footer column and the "Six disciplines" counts are all
derived from `src/data/services.jsx`, so adding a service there is
enough - but the served HTML still has to be edited by hand.

### The brochure is a third copy

`downloads/apex-integration-brochure.pdf` lists the services too, and
it drifted the same way - page 2 still said "Five disciplines" after
the sixth shipped.

The PDF was produced by ReportLab, but **the script that produced it
was never kept**, so the binary is the only artifact. Rather than
rebuild it and lose the original design,
`source/tools/add_surveillance_to_brochure.py` edits page 2 of the
existing PDF: it splits the content stream into groups, translates each
with `q ... cm ... Q` instead of rewriting coordinates, and clones the
Cabling block for the new entry. Page 1 comes through byte-identical.

That script is in the repo so the next brochure change has a starting
point. It is not a general-purpose generator - it asserts the layout it
expects and stops rather than producing a quietly broken page. Check
any output by eye; the arithmetic is in its docstring.

Fixing this properly means building from `/source` and deploying
`dist/`, so there is one copy instead of two. Worth doing the next time
this site needs real work. Note `/source` uses HashRouter (URLs like
`/#/services`) while the served site uses real directories, so that
switch needs BrowserRouter and host rewrite rules too.

## One thing worth fixing eventually

This folder is `v1.6` because the previous ones were `v1.4`, `v1.5
update`, and a loose `apex-site-repo/`. Hand-numbered folders are how
another site in this group ended up with three copies and no way to
tell which was live — the deployed one turned out to be identifiable
only by a cache-busting query string.

Once this is in git, git holds the versions. Future edits are better
made in the repo and pushed, rather than by copying the folder to v1.7.
