<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep data and routing algorithms browser-safe; dynamically load Leaflet behind ClientOnly because its imports require browser globals.
- Use the shared CrowdSafe context with validated browser storage for demo incidents; the application intentionally has no backend.
- Each operations section has a TanStack file route and page metadata; the root shell supplies shared navigation and session state.
- Compute route distances from the displayed waypoint polyline and exclude blocked edges from the route graph.
