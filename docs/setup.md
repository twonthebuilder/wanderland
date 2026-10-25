# Setup Guide

Wanderland runs as a static site served from the repository root. With Python 3:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/public/`. The page requires network access to the Leaflet CDN and OpenStreetMap tiles, while its GeoJSON files load from the local server.

The initial layer list in `public/main.js` explicitly names `NBClaims.geojson` and `NBMinerals.geojson`, both in `data/geojson/`. They cover New Brunswick, not all of Canada. The map zooms to successfully loaded layers. If a file cannot load, the layer controls show an error and the browser console contains details.

To add a dataset, put a valid GeoJSON FeatureCollection in `data/geojson/` **and add its filename to the array in `public/main.js`**. Refreshing alone does not discover new files. The layer checkboxes toggle visibility; interactive filtering has not been implemented.

The checked-in datasets are not verified current land tenure records. Consult `README.md` for provenance and scope limitations.
