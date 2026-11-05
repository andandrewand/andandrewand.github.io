# andandrew: how this site is hosted

Live at **https://andandrew.com/** (GitHub Pages, free hosting; the domain is the only cost).
The repo is `andandrewand.github.io`. Its old address, andandrewand.github.io, redirects to the custom domain.

## Updating the site
Open a file in the repo on github.com, click the pencil icon, edit, and commit.
The site updates in about a minute. To add or replace an image, use
**Add file → Upload files** inside the `images` folder.

## Re-uploading everything from the zip
Unzip, then in the repo use **Add file → Upload files** and drag in the *contents*
of the folder (not the folder itself): all the files at the top level plus the `images` folder. Commit.
Keep the `CNAME` file. It is what tells GitHub the site lives at andandrew.com.

## DNS (at the registrar)
- Four **A** records for `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- One **CNAME** record for `www` pointing to `andandrewand.github.io`
- If the registrar is Cloudflare, set these records to **DNS only** (grey cloud), at least until HTTPS is issued.
- Leave any MX/TXT records alone, since those handle email.

## GitHub settings (Settings → Pages)
- Source: **Deploy from a branch**, branch `main`, folder `/ (root)`
- **Custom domain:** `andandrew.com`, then save. Wait for the DNS check to pass.
- Tick **Enforce HTTPS** once it becomes available (can take up to an hour).

## Where the domain is written in the files
`index.html` and `resume.html` (canonical, og:url, og:image, structured data), `llms.txt`,
`agent.md`, `robots.txt`, `sitemap.xml`. Search for `andandrew.com` if the domain ever changes.
Update the dates in `resume.html` and `sitemap.xml` whenever the content changes.
