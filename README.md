# The Journey — V1.1

A continuous indoor exhibition hangar containing four walkable miniature worlds. Next.js App Router, TypeScript, React Three Fiber, Three.js, Drei and GSAP. No separate scene loads, teleportation, database or physics engine.

## Run

Node.js 20.9+ and npm:

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js (normally http://localhost:3000). If another Next development server already owns the checkout, reuse its printed URL.

```sh
npm run build
npm start
npm run typecheck
node --test tests/navigation.test.cjs
```

## Experience and controls

The existing approximately 11-second Aix-en-Provence → Montréal flight is unchanged. Automatic arrival and Skip Intro now enter the hangar at `[0, 0, 35]`, looking down the central circulation aisle.

- WASD / arrows: camera-relative movement.
- Drag: orbit. Escape: pause or close an interaction.
- E: interact near the gold prototype sculpture in Technology, on the right toward the back of the hall. The original placeholder exhibit and cinematic camera are preserved.
- Résumé remains a placeholder until a PDF is supplied.

The studio and personal interests installation flank the foreground. The education campus and technology installation sit farther back. Each is physically accessible from the same floor: lawn and stone paths, a hexagonal technical surface, a wood studio floor, and a circular personal interests area. All transitions are effectively flush; the controller remains on a continuous ground plane. There is no jumping, climbing mechanic or chess gameplay in this milestone.

Mobile/coarse-pointer devices and windows narrower than 700px retain the HTML fallback. Reduced motion retains skipped flight and disabled exhibit floating/camera easing. Capability decisions are made on page load. Reload after changing viewport/device preferences.

## Architecture

The original flight, character, input handling, modal UI, résumé and fallback systems are retained.

- `Journey.tsx`: lifecycle, intro/world state and editorial overlays.
- `Intro.tsx`: unchanged geographic flight and GSAP sequence.
- `Character.tsx`: unchanged procedural traveler.
- `Controller.tsx`: existing movement/input with the new spawn and shared collision check.
- `CameraController.tsx`: existing damped follow/orbit with hangar arrival framing, a 55° world field of view, height-aware architectural obstructions and exhibit coordinates read from interaction data.
- `interactions.ts`: original placeholder content, relocated to Technology.
- `World.tsx`: lightweight scene composition and lighting.
- `environment/Hangar.tsx`: 80 × 106-unit hall, 24-unit ceilings, trusses, skylights, clerestory windows, suspended lighting, floor joints and central circulation.
- `environment/EducationWorld.tsx`: rebuilt Arts Building interpretation informed by the supplied reference: taller centre, lower wings, stone cornices, entrance columns, octagonal cupola and small McGill-inspired flag.
- `environment/TechnologyWorld.tsx`: open steel gantry, workstations, server racks and prototype displays.
- `environment/CreativeWorld.tsx`: timber floor, blank canvases, easels, worktable, sculpture and gallery fixtures.
- `environment/InterestsWorld.tsx`: climbing wall and landing surface, chess table and recreational display details.
- `environment/primitives.tsx`: shared box geometry, material cache, instanced repetitions and architectural furnishing helpers.
- `environment/navigation.ts`: authoritative world bounds, solid-object footprints and spawn.

Repeated window details, floor joints, rack slots, timber seams and chess squares use instancing. DPR remains capped at 1.6. One 2048² directional shadow map covers the hall; two local fill lights do not cast additional shadow maps. No post-processing or reflection render passes are added.

## Validation

Production build and strict TypeScript validation pass. Ten navigation tests flood-fill the actual clearance grid, verifying access to all four installations, the rear of the campus and the project interaction point, along with spawn safety and boundary/solid collisions.

Browser checks cover automatic arrival, walking into all four installations, E interaction in Technology, Escape and restored movement into Education. The browser console was clean during these checks. The intro source remains unchanged. Additional manual checks: orbit near walls, visit the studio and climbing area, open Résumé, and reload in mobile/reduced-motion modes.

## Visual limitations / next improvements

- The architecture is intentionally stylized. The education facade and small heraldic flag are interpretations, not a measured reconstruction or official logo asset.
- Canvases, monitors and prototypes are neutral placeholders. No descriptions for TapIt, Bream, research or personal achievements have been invented.
- Skylight illumination combines a directional light, shadow-casting trusses, fog and subtle floor light patches; there is no true volumetric scattering, baked GI or real-time mirror reflection. A lighting bake and authored surface textures would add depth next.
- Major architectural solids, furniture and prototype plinths have collision footprints. Small decorative items (trees, easels, foliage and some furnishings) remain non-solid. Buildings are exhibit exteriors; they have no explorable interiors.
- Walkable surfaces stay at ground level. The climbing wall and chess set are visual exhibits, not minigames.
- Camera obstruction remains the existing lightweight ray-based system, expanded to hall walls and taller exhibit solids. Fast corner turns may still correct abruptly.
- No cross-device frame-rate guarantee: repeated details are instanced, but low-end GPU testing and further batching remain recommended before public release.

## Assets

The existing locally bundled `public/data/countries.json` comes from [world.geo.json](https://github.com/johan/world.geo.json), based on public-domain Natural Earth data. All exhibit geometry is procedural. The supplied building photographs were used as visual references, not bundled as website assets.

Google Fonts provides DM Sans and Libre Caslon Display with local system fallbacks. No added remote assets or API keys are required for the redesigned environment.
