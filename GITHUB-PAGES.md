# PLAYMAX website demo — GitHub Pages

Publish the **contents of this folder as the repository root**. All page assets and code are local to this package; the 3D viewer and fonts load public libraries from the internet.

## Publish

1. Create a separate GitHub repository for the website.
2. Upload every item in this folder, including `assets/`, `core.js`, `viewer3d.js`, and `.nojekyll`.
3. Open **Settings → Pages**. Choose **Deploy from a branch**, select `main` (or `master`) and `/(root)`, then save.
4. Wait for deployment and open the HTTPS link GitHub provides.

The site uses relative asset paths and works at a GitHub Pages project address such as `https://ACCOUNT.github.io/REPOSITORY/`.

## Demo limits

Catalog browsing, product details, colors, the bag and the calculator work in the browser. Customers send their order themselves through WhatsApp or Telegram to +93 77 990 1111; there is no online payment. Account details and marketplace posts stay in that visitor's browser until a server/database is connected.


## Live content
`content.json` is written by the separate **PLAYMAX Admin** app. The site reads it on every visit, so admin changes appear in about a minute without a new upload. Keep the file in the repository root.
