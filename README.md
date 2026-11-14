# Platon project website

A standalone Polish/English landing page. All page assets are local: HTML, CSS, JavaScript, the project's Platon icon, and Pixel Corgi animations. No build step, package manager, external fonts, or frontend framework is required.

Open `index.html` in a browser, or serve this folder locally from the repository root:

```sh
python -m http.server 8080 --directory website
```

Then open `http://localhost:8080`. You can upload the entire contents of `website/` to any static host. Keep the `assets/` directory beside `index.html`. No deployment or publication is performed by these files.

## Languages and examples

The page initially follows the browser language (Polish or English), then remembers the visitor's selection when browser storage is available. The three conversation examples are illustrative, not live AI responses. They make no calls to the Python backend or Ollama.

Animations respect `prefers-reduced-motion`: visitors requesting less motion see a static Corgi frame instead. The original assets were copied from `platon_frontend/build` and `platon_frontend/pixel-corgi/qa`.

The decorative background combines a dotted grid with a slow canvas constellation. Nearby points brighten as the cursor moves; clicking empty space adds a soft ripple. It does not intercept links, buttons, or touch scrolling. Rendering is capped at 30 fps and 76 points, pauses in hidden tabs, and becomes static when reduced motion is requested. No third-party libraries or services are used for this effect.

## Release downloads

`app.js` requests the latest public, published stable release through the [GitHub Releases API](https://docs.github.com/en/rest/releases/releases#get-the-latest-release) for `Matela7/platon`. It selects Windows `.exe`, Apple Silicon `.dmg`, and Linux x64 `.AppImage` (or `.deb`) assets, using their actual `browser_download_url` values. The site does not require fixed filenames or a GitHub token.

If no matching installer exists, the API is unavailable, the repository is private, or GitHub rate-limits the request, the corresponding button links to the repository's Releases page. The page never presents a made-up installer link as available. JavaScript-disabled visitors also have a direct link to Releases.

The installers must be attached to a published release; a draft release or an Actions artifact alone is not a public download. This page does not publish releases, increment application versions, install software, or change the desktop app's update channel.

To use a different repository, update `REPOSITORY` in `app.js` and the fallback repository links in `index.html`. Never embed GitHub tokens or other credentials in these static files.
