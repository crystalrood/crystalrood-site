# Crystal Rood — personal site starter

A zero-build static recipe site for `crystalrood.com`. It is intentionally simple to host and maintain: HTML, CSS, and one shared JavaScript content file, with no package installation required.

## Start here

1. Open `content.js`.
2. Replace the placeholder profile fields near the top, especially `email` and social links.
3. Edit the three recipes or duplicate one to add another.
4. Preview the site from this folder:

   ```sh
   python3 -m http.server 4173
   ```

   Then visit `http://localhost:4173`.

## Add a recipe

Copy an object in the `recipes` array and update its metadata, ingredient groups, directions, notes, and source. The current filters use `Bread`, `Cookies`, and `Pizza` as categories. Recipe detail pages automatically include matching Recipe structured data for search engines.

## Add images

Place images in `assets/` and set an item's `image` value, for example:

```js
image: "assets/my-recipe.jpg",
imageAlt: "A concise description of the recipe image",
```

When `image` is blank, the layout simply omits it.

## Publish

This folder is ready for GitHub Pages. Publish the `main` branch from the repository root; `CNAME` assigns `crystalrood.com` as the custom domain and `.nojekyll` keeps the static files unchanged.

At the DNS provider, point the apex domain to GitHub Pages and set `www` as a CNAME to the GitHub Pages host. After DNS propagates, verify both `https://crystalrood.com` and `https://www.crystalrood.com`.

## Files

- `index.html` — home
- `recipes.html` / `recipe.html` — archive and data-driven detail view
- `about.html` — short about page
- `content.js` — the content you will edit most often
- `site.js` — rendering, filtering, navigation, and structured data
- `styles.css` — the full visual system and responsive layout
- `404.html`, `robots.txt`, `sitemap.xml` — launch basics

`projects.html` is currently a public “Coming soon” page. The project detail scaffold remains marked `noindex` until project content is added.
