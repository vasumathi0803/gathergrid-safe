# CrowdSafe — GIS-Based Crowd & Emergency Management

An interactive operations demonstration for a fictional Indian temple festival. Opens directly into the dashboard. **Every crowd level, incident, facility availability, and route is simulated.** No cameras, sensors, emergency services, or government systems are connected.

## Setup
Requires Bun 1.3+ (or Node.js 22+ with npm).

```sh
bun install
bun run dev
```

Open the local URL printed by Vite. Production: `bun run build`, then `bun run preview`. Tests: `bun run test`.

## Features
- 12 crowd zones, 2 high-risk attention zones, 4 medical stations, and 3 initial open incidents.
- Leaflet/React Leaflet with OpenStreetMap tiles, risk overlays, popups, layers, filters, zoom, reset, and expand.
- Incident validation, search, review and resolution; localStorage persistence in the same browser.
- Facilities filtered by type and locatable on the map.
- Shortest routes through a predefined demo corridor graph. Block corridors to see alternatives. Distances use haversine calculations along the exact displayed polyline; connectors to the graph are fictional, not verified walking paths.
- Fictional crowd timeline and live-updating local incident analytics.
- Export local reports and restore original sample data in Settings.

## Safety and connectivity
**Actual route safety must be confirmed by authorized personnel against current site conditions. This is not a real emergency response or navigation system.**

No backend, paid API, or API keys are required. Internet is needed for map tiles, fonts, and photographs. If tiles fail, simulated overlays remain interactive. If photographs fail, neutral backgrounds remain. If browser storage is unavailable, reports last only for the session and a warning appears.

## Stack
React 19, TypeScript, TanStack Start/Router, Tailwind v4, Leaflet, Lucide, Recharts, Sonner. Feature modules: `src/features/crowdsafe`. Navigation pages: `src/routes`. Leaflet loads dynamically on the client to preserve SSR safety.

## Photography
Reference imagery is not evidence of any simulated incident. Images are resized for web display and served from Lovable asset storage.
- [Arattupuzha Pooram Festival](https://commons.wikimedia.org/wiki/File:Arattupuzha_Pooram_Festival,_Sree_Sastha_Temple,_Thrissur,_Kerala,_India_(2017).jpg): KGsivan, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0).
- [Anant Chaturdashi crowd control](https://commons.wikimedia.org/wiki/File:Anant_Chaturdashi_2018_Crowd_Control_AADM.jpg): Sailee5, CC BY-SA 4.0.
- [Ambulance at Kolkata Book Fair](https://commons.wikimedia.org/wiki/File:Ambulance_-_Force_Motors_-_Traveller_-_Kolkata_2015-02-06_5789.JPG): Biswarup Ganguly, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0).
Share-alike images retain their original license.
