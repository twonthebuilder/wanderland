// Main application logic for Wanderland
import { alwaysTrue } from '../src/filters/sampleFilters.js';

// Explicit manifest of committed datasets; files are not auto-discovered.
const geojsonFiles = ['NBClaims.geojson', 'NBMinerals.geojson'];

// Store layers by filename
const layers = {};

// Initialize map centered on Canada; focus on loaded datasets once ready.
const map = L.map('map').setView([56.1304, -106.3468], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

/** Load a committed FeatureCollection and report failures in the UI. */
async function loadLayer(file) {
  try {
    const response = await fetch(`../data/geojson/${file}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data?.type !== 'FeatureCollection' || !Array.isArray(data.features)) {
      throw new Error('Expected a GeoJSON FeatureCollection');
    }

    const filtered = {
      type: 'FeatureCollection',
      features: data.features.filter(alwaysTrue)
    };
    const layer = L.geoJSON(filtered).addTo(map);
    layers[file] = layer;
    addLayerControl(file);
  } catch (error) {
    console.error('Error loading', file, error);
    const notice = document.createElement('p');
    notice.setAttribute('role', 'alert');
    notice.textContent = `Could not load ${file}. Check the browser console.`;
    document.getElementById('layer-controls').appendChild(notice);
  }
}

// Wait for both independent loads before zooming to their combined bounds.
Promise.all(geojsonFiles.map(loadLayer)).then(() => {
  const bounds = L.latLngBounds([]);
  for (const layer of Object.values(layers)) {
    const layerBounds = layer.getBounds();
    if (layerBounds.isValid()) {
      bounds.extend(layerBounds);
    }
  }
  if (bounds.isValid()) {
    map.fitBounds(bounds.pad(0.05));
  }
});

// Create checkbox for layer visibility
function addLayerControl(filename) {
  const container = document.getElementById('layer-controls');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = true;
  checkbox.onchange = () => {
    if (checkbox.checked) {
      map.addLayer(layers[filename]);
    } else {
      map.removeLayer(layers[filename]);
    }
  };
  label.appendChild(checkbox);
  label.append(` ${filename}`);
  container.appendChild(label);
  container.appendChild(document.createElement('br'));
}

// Placeholder for future filter functions; no interactive filtering yet.
export function applyFilters() {
  // Implementation will go here
}
