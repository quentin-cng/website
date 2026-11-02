# The Journey

A cinematic, playable portfolio vertical slice. Next.js App Router, TypeScript, React Three Fiber, Three.js, Drei and GSAP. No database, account system or physics engine.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production server:

```sh
npm run build
npm start
```

`npm run typecheck` runs the TypeScript check. The dependency lockfile is committed.

## Experience

An approximately 11-second flight from Aix-en-Provence to Montréal follows a spherical great-circle arc above locally stored geographic outlines. A warm screen wash transitions into a descending campus camera. Skip Intro enters the world immediately.

WASD / arrows move relative to the camera. Drag the scene to orbit. Walk toward the gold sculpture on the right of the fountain, then press E (or use the visible exhibit button). Escape closes the exhibit or pauses exploration. Click Continue exploring to resume. Résumé deliberately explains that no file has been supplied.

Reduced motion skips the flight, disables exhibit floating and camera easing, and removes CSS transitions. Touch devices and windows narrower than 700px receive a readable HTML exhibit instead of keyboard-only gameplay. Missing WebGL2 or a lost context also exposes the HTML fallback. Fallback mode is selected on page load; reload after changing device mode or viewport width.

## Architecture

- `app/`: App Router layout, metadata, client entry and responsive CSS.
- `components/journey/Journey.tsx`: lifecycle, loading, capability checks, intro/world state and UI composition.
- `Intro.tsx`: geographic texture generation, location markers, flight interpolation and cleaned-up GSAP timeline.
- `World.tsx`: authored campus geometry, lighting, environment, exhibit and collision bounds.
- `Controller.tsx`: keyboard and pointer input, camera-relative movement, lightweight axis-separated collisions, proximity detection. Mutable refs handle frame updates; React state changes only at interaction boundaries.
- `Character.tsx`: procedural backpack-wearing traveler with walking and idle animation.
- `CameraController.tsx`: damped follow/orbit, exhibit framing and building obstruction checks.
- `interactions.ts`: typed exhibit content and spatial metadata, ready for additional entries.
- `UI.tsx`: HTML project/résumé dialog, focus management and Escape handling.

Canvas DPR is capped at 1.6; one shadow-casting light uses a 2048² map. Geography is a ~250 KB local JSON asset, converted once into a 2048×1024 canvas texture. Scene geometry is procedural. Event listeners, textures and animation timelines are cleaned up.

## Assets

`public/data/countries.json` is from Johan Sundström's [world.geo.json](https://github.com/johan/world.geo.json), based on Natural Earth geographic data. Natural Earth data is public domain. Borders are illustrative, not a political statement. The globe uses locally bundled data; no map service or API key is required.

DM Sans and Libre Caslon Display are requested through Google Fonts, with system sans-serif/Georgia fallbacks when offline. All 3D models are generated in this project.

## Limitations and next improvements

- This is an artistic campus impression, not an accurate McGill reconstruction. Buildings have no interiors; the distant skyline is intentionally abstract.
- The character is procedural. Replace it with a carefully art-directed, lightweight rigged GLB and richer walk/turn transitions next.
- Building/fountain/exhibit collisions are simple bounds. Decorative benches, trees and planters are not solid. A navigation mesh or capsule collision sweep would improve corners and dense props before expanding the map.
- Lighting uses standard real-time shadows and fog, with no baked global illumination, ambient occlusion or audio. Baked lighting, refined stone materials, ground detailing and optional ambient sound are the highest-value visual upgrades.
- Camera obstruction checks cover buildings; rapid orbit around corners can still produce an abrupt correction. More complex spaces warrant a swept camera collider.
- Desktop performance has not been benchmarked across hardware. Instancing repeated foliage and reducing shadow resolution on weaker GPUs are recommended before release.
- Project and résumé content are explicitly placeholders. Add real content and a supplied résumé PDF before publishing as a finished portfolio.
- Mobile provides accessible exhibit content, not touch-based 3D gameplay.

## Manual validation

Check automatic arrival and Skip Intro; walk with both WASD and arrows; drag orbit near buildings; approach the sculpture, press E, close with Escape and resume walking; open and close Résumé; pause/resume; test narrow/mobile and reduced-motion browser preferences. Production build and TypeScript checks should pass before deployment.
