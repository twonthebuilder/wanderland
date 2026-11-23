import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Load the browser ES module without requiring a package.json module setting.
const source = await readFile(new URL('../src/filters/attributeFilter.js', import.meta.url), 'utf8');
const { filterByAttribute } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
const features = [
  { type: 'Feature', properties: { status: 'active' }, geometry: null },
  { type: 'Feature', properties: { status: 'closed' }, geometry: null },
  { type: 'Feature', properties: { status: null }, geometry: null },
  { type: 'Feature', properties: {}, geometry: null }
];
const input = { type: 'FeatureCollection', name: 'sample', features };
const active = filterByAttribute(input, 'status', 'active');
assert.equal(active.features.length, 1);
assert.equal(active.features[0], features[0]);
assert.equal(active.name, 'sample');
assert.equal(input.features.length, 4);
assert.equal(filterByAttribute(input, 'status', null).features.length, 1);
assert.equal(filterByAttribute(input, 'missing', undefined).features.length, 0);
assert.throws(() => filterByAttribute({}, 'status', 'active'), TypeError);
assert.throws(() => filterByAttribute(input, '', 'active'), TypeError);
const falsyInput = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { value: 0 }, geometry: null },
    { type: 'Feature', properties: { value: false }, geometry: null },
    { type: 'Feature', properties: { value: '' }, geometry: null }
  ]
};
assert.equal(filterByAttribute(falsyInput, 'value', 0).features.length, 1);
assert.equal(filterByAttribute(falsyInput, 'value', false).features.length, 1);
assert.equal(filterByAttribute(falsyInput, 'value', '').features.length, 1);
console.log('attributeFilter: 11 assertions passed');
