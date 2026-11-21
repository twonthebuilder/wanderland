/** Return a new FeatureCollection containing only features whose property matches a value. */
export function filterByAttribute(collection, property, value) {
  if (collection?.type !== 'FeatureCollection' || !Array.isArray(collection.features)) {
    throw new TypeError('Expected a GeoJSON FeatureCollection');
  }
  if (typeof property !== 'string' || property.length === 0) {
    throw new TypeError('Expected a non-empty property name');
  }
  return {
    ...collection,
    features: collection.features.filter(feature =>
      feature?.properties != null &&
      Object.prototype.hasOwnProperty.call(feature.properties, property) &&
      feature.properties[property] === value
    )
  };
}
