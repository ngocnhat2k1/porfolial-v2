# ngocnhat.info

Portfolio of **Trần Ngọc Nhật**, Frontend Technical Leader in Ho Chi Minh City.
You land on a balcony over Saigon, walk into an illustrated room, and every object in it opens part of the portfolio: projects on the laptop, the résumé on the pinboard, a piano and a guitar that actually play.

## Stack

- Next.js 16 (App Router, Server Components by default), React 19.2, TypeScript (strict)
- Tailwind CSS v4 for content pages, CSS Modules for the illustrated scenes
- React `<ViewTransition>` for page transitions: pages open like a door, and Nhật walks from the balcony into the room as one shared element
- Web Audio API for the instruments (Karplus–Strong guitar, synthesized piano), no audio files
- `sharp` for the art pipeline

## Architecture

Feature-first. Routes in `src/app` are one-line re-exports; each feature owns its pages, components, data and docs, and exposes a small public API through `index.ts`.

```
src/
├── app/                      routing only: layout, metadata routes, one-line page re-exports
├── features/
│   ├── intro/                balcony scene (/)
│   ├── room/                 interactive room (/room): hotspots, mascot, instruments
│   ├── projects/             project data + /work
│   ├── about/                career data + /about
│   ├── contact/              /contact
│   └── resume/               ATS-friendly, printable /resume (reads projects + about via their public APIs)
└── shared/
    ├── components/           SiteChrome, Scene (16:9 stage), ArtImage, transitions
    ├── constants/            identity, contact links, navigation
    ├── art/manifest.json     sizes of processed illustrations (generated)
    ├── ui/                   button styles
    └── utils/
```

Each feature has a `docs/README.md` (Vietnamese) with its business rules, file map and data flow.

Only the leaves that react to input are Client Components (`Mascot`, `PianoKeys`, `ActionHotspot`, `CopyEmailButton`, `PrintButton`, `NavLink`). The room scene itself is server-rendered and passes the illustrations into the mascot as props.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run art:gen -- <name…> [--n=2]` | Generate candidate illustrations with bytedance/seedream-4.5 on Replicate (token in `.env.local`, hard cap of 60 generations) |
| `npm run art` | Process the chosen images in `art-raw/` into content-hashed `public/art/*.webp` (keys out green screens, trims, compresses) and update the manifest |
| `npm test` | Unit tests (Node's built-in runner) |
| `npm run lint` | ESLint |

## Illustrations

The art is generated with bytedance/seedream-4.5 from the prompts in [`scripts/art/prompts.mjs`](scripts/art/prompts.mjs); see [`docs/ART_PROMPTS.md`](docs/ART_PROMPTS.md) for the workflow. Until a file exists, `<ArtImage>` renders a labelled placeholder with the right aspect ratio. Positions in the room live in `src/features/room/constants/placements.ts`.
