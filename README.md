# Benna — Order Tracking Landing Page

Standalone, responsive landing page ("Track all your orders in one spot") for the Benna | بناء app.
It is fully independent of the Benna frontend, backend, and mobile app.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · `qrcode.react`

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Features

- Two-column card on desktop; stacks (content → map) below `lg` (1024px).
- English / Arabic toggle with full RTL (`dir="rtl"`), Arabic font (IBM Plex Sans Arabic), localized digits. Deep-link via `?lang=ar`.
- Scannable QR code (error-correction level H, Benna icon in the center).
- `/get` — device-aware redirect: iOS → App Store, Android → Google Play, other → https://app.benna.com.sa.
- Official App Store / Google Play SVG badges with hover / active transitions and `aria-label`s.
- Vector Riyadh (Al Olaya) map with a live route, pulsing GPS pin and floating parcel card. No map API key needed.
- Smart App Banner for Safari (`apple-itunes-app` meta), OG metadata, `prefers-reduced-motion` support.

## Configuration (env vars, all optional)

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_QR_URL` | App Store link | URL encoded in the QR. Set to `https://<your-domain>/get` for the smart redirect. |
| `NEXT_PUBLIC_RATING_VALUE` | `4.8` | Star rating shown in the footer. |
| `NEXT_PUBLIC_RATING_COUNT` | `1200` | Rating count (compact-formatted per locale). |
| `NEXT_PUBLIC_SITE_URL` | `https://app.benna.com.sa` | Base URL for metadata / OG tags. |

Copy lives in `lib/i18n.ts`; store links in `lib/config.ts`.
