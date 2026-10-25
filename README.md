# Wanderland: GeoJSON Land Explorer

**Find land not for comfort, but for sovereignty.** Wanderland is an early, GeoJSON-first mapping prototype intended to help explore public geographic datasets. It is **not yet** a Canada-wide land suitability tool.

## What works today

- A static Leaflet map with OpenStreetMap background tiles.
- Two committed New Brunswick datasets: `data/geojson/NBClaims.geojson` (mineral claim polygons) and `data/geojson/NBMinerals.geojson` (mineral occurrence points).
- The map loads those two files by name, shows a checkbox for each successfully loaded layer, and fits the view to the combined data extent.
- Missing or malformed datasets display an error in the layer controls instead of leaving a silently empty map.

**Not implemented:** automatic GeoJSON discovery, interactive attribute/spatial filtering, cross-layer queries, nationwide coverage, tax/water/zoning overlays, property suitability scoring, or export of filtered results. `src/filters/sampleFilters.js` contains only an always-true example; `applyFilters()` is a placeholder.

## Run locally

From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/public/` in a browser. Do not open `public/index.html` directly as a `file://` URL: the app fetches local GeoJSON over HTTP.

The page loads Leaflet from a public CDN and background tiles from OpenStreetMap, so those resources need network access. The two GeoJSON files themselves are served locally.

## Add another dataset

1. Place a valid GeoJSON **FeatureCollection** in `data/geojson/`.
2. Add its filename to the `geojsonFiles` array in `public/main.js`.
3. Refresh the page and confirm the new layer checkbox appears. Inspect the browser console if an error appears.

Files are explicitly listed, **not** discovered automatically. Layers currently show every feature without filtering. Keep data conversion and cleaning outside the browser; document source, license, geographic coverage, acquisition date, and update cadence before treating new layers as reliable evidence.

## Data reliability and scope

The checked-in `NBClaims.geojson` and `NBMinerals.geojson` files are **historical snapshots**, not a verified live feed. The repository does not currently establish their original publisher, retrieval date, reuse terms, completeness, or update frequency. Some claim records contain 2019 timestamps, but those fields do not prove the overall dataset's publication date.

A mapped mineral occurrence does not establish mineral rights, surface ownership, property availability, or legal access. Claim geometry may have changed since the snapshot. Verify anything relevant to land purchase or tenure with current authoritative provincial records and professional advice. This prototype is not legal, investment, or property advice.

## Intended direction

The longer-term concept is a simple, transparent, Canada-wide interface for stacking public geographic layers and applying composable, auditable filters, without unnecessary ETL pipelines or an opaque AI ranking system. Future filters may include distance to freshwater, mining-claim exclusion, zoning, and other attributes **once appropriate datasets and verified semantics exist**.

The immediate next milestone is a small, tested filter UI that actually applies a user-selected predicate to a loaded FeatureCollection.

## Structure

```text
data/geojson/          # Committed example datasets
src/filters/           # Example predicate; real filter UI is future work
public/index.html      # Leaflet map page
public/main.js         # Explicit dataset manifest and layer toggles
public/style.css       # Map and layer-control layout
docs/setup.md          # Quick start
```

## Contributing

Prefer small, modular changes and preserve GeoJSON inputs. See `AGENTS.md` for project conventions. If adding datasets, record provenance and license details before committing them.

## License

See the repository's `LICENSE` file.
