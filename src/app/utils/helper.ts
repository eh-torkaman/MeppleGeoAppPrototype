//  lng is distance between east and west
// lat is distance between noth as south
// leaf let get coordianttion in the form of LATLNG byt DECKGL get it on the form of LNGLAT
/// Self-intersecting polygons, crossed polygons, or self-crossing polygons are polygons some of whose edges cross each other. They contrast with simple polygons, whose edges never cross

/**
 * 
 * In a GeoJSON file, the "crs" section refers to the coordinate reference system used to
 *  define the spatial coordinates of the features in the file.
 * .
The prefix "urn:ogc:def" in the value "urn:ogc:def:crs:EPSG::3857" refers to a naming convention
 used by the Open Geospatial Consortium (OGC) to define and standardize various aspects of geospatial information.

"URN" stands for "Uniform Resource Name," which is a unique identifier used to represent a resource. "OGC" is the organization 
responsible for developing and maintaining open standards for geospatial information.

In the context of a GeoJSON file, the "urn:ogc:def" prefix is used to indicate that the following value is
 a standardized definition for a specific aspect of the file, such as the coordinate reference system (CRS)
  used to represent the spatial data. By using a standardized definition,
 different software systems can interpret and use the GeoJSON file in a consistent way.
The value "urn:ogc:def:crs:EPSG::3857" in the "crs" section specifies 
the coordinate reference system as EPSG:3857, which is also known as Web Mercator. 
This is a commonly used coordinate system for web mapping applications,
 as it allows for the representation of the earth's surface as a 2D map.
 It is based on a spherical model of the earth and uses meters as its unit of measurement.
 * 
 */

import * as L from 'leaflet';
import { LatLngLiteral } from 'leaflet';
import * as DeckCore from '@deck.gl/core';
import * as GeoJson from 'geojson';
import { booleanPointInPolygon, flatten } from '@turf/turf';
import GeojsonFlatten from 'geojson-flatten';
import * as Immer from 'immer';
import * as turf from '@turf/turf';
/**
 * @description This function takes startLatLng location and a number
 * and return a random point like this:  [startLatLng[0] + (Math.random() - 0.5) * p,  startLatLng[1] + (Math.random() - 0.5) * p]
 * @param {[number, number]} startDate
 * @param {number} precision
 * @returns {L.LatLng}
 */
export function fnRndLatLng(
  startLatLng: [number, number],
  p: number
): L.LatLng {
  return L.latLng(
    startLatLng[0] + (Math.random() - 0.5) * p,
    startLatLng[1] + (Math.random() - 0.5) * p
  );
}
/**
 * @description This function takes startLatLng location and a number
 * and return a random point like this:  [startLatLng[0] + (Math.random() - 0.5) * p,  startLatLng[1] + (Math.random() - 0.5) * p]
 * @param {[number, number]} startDate
 * @param {number} precision
 * @returns {[number, number]}
 */

export function fnRndLatLngPs(
  startLatLng: LatLngLiteral,
  p: number,
  giveLngLat: boolean
): [number, number] {
  return giveLngLat
    ? [
        startLatLng.lng + (Math.random() - 0.5) * p,
        startLatLng.lat + (Math.random() - 0.5) * p,
      ]
    : [
        startLatLng.lat + (Math.random() - 0.5) * p,
        startLatLng.lng + (Math.random() - 0.5) * p,
      ];
}

export function rnd(min = 0, max = 255) {
  return Math.max(
    0,
    Math.min(255, Math.round(Math.random() * (max - min) + min))
  );
}
/**
 * @description return a  DeckCore.RGBAColor RadomColor
 */
export function RandomColor(min = 0, max = 255) {
  return [rnd(min, max), rnd(min, max), rnd(min, max)] as DeckCore.RGBAColor;
}
/**
 * ECMA2016 / ES6
 */
export const ConvertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};

export function ToColor(num: number) {
  try {
    num >>>= 0;
    var b = num & 0xff,
      g = (num & 0xff00) >>> 8,
      r = (num & 0xff0000) >>> 16,
      a = ((num & 0xff000000) >>> 24) / 255; // [r, g, b , a]
    return [r, g, b] as DeckCore.RGBAColor;
  } catch {
    console.warn('number is not in correct format to be converted to color');
    return RandomColor();
  }
}

export const EmptyFeatureCollection: GeoJson.FeatureCollection = {
  features: [],
  type: 'FeatureCollection',
};

export function FilterFeaturesWithinPolyGon(
  featureCollection: GeoJson.FeatureCollection,
  surroundingPolygon: GeoJson.Polygon | GeoJson.MultiPolygon
) {
  let filterdData = Immer.produce(featureCollection, (draft) => {
    draft.features = featureCollection.features.filter(
      (f) =>
        ['MultiPolygon', 'Polygon', 'Point'].indexOf(f.geometry.type) !== -1 &&
        //  turf.booleanWithin(f.geometry as turf.Geometry,surroundingPolygon) &&
        CoordinatesWithinPolyGon(f.geometry as any, surroundingPolygon)
    );
  });

  return filterdData;
}

// export function CoordinatesWithinPolyGon(
//   geometryObj: GeoJson.Point | GeoJson.Polygon | GeoJson.MultiPolygon,
//   circumstantingPolygon: GeoJson.Polygon | GeoJson.MultiPolygon
// ) {
//   switch (circumstantingPolygon.type) {
//     case 'Polygon':
//       return CoordinatesWithinSignlePolyGon(geometryObj, circumstantingPolygon);
//     case 'MultiPolygon':
//      // polygon.coordinates.some(pl=> CoordinatesWithinSignlePolyGon(geometryObj, pl))

//       return (GeojsonFlatten(circumstantingPolygon) as GeoJson.Polygon[]).some((poly) =>
//         CoordinatesWithinSignlePolyGon(geometryObj, poly)
//       );
//     default:
//       console.warn();
//       'Should Ever be seen!';
//       return false;
//   }
// }

// function CoordinatesWithinSignlePolyGon(
//   geometryObj: GeoJson.Point | GeoJson.Polygon | GeoJson.MultiPolygon,
//   polygon: GeoJson.Polygon
// ) {
//   switch (geometryObj.type) {
//     case 'Point':
//       return booleanPointInPolygon(geometryObj.coordinates, polygon,{ignoreBoundary:false});
//     case 'Polygon':
//       return geometryObj.coordinates.every((pol) =>
//         pol.every((pnt) => booleanPointInPolygon(pnt, polygon,{ignoreBoundary:false}))
//       );
//     case 'MultiPolygon':
//       return geometryObj.coordinates.every((pols) =>
//         pols.some((insidePol) =>
//           insidePol.every((pnt) => booleanPointInPolygon(pnt, polygon,{ignoreBoundary:false}))
//         )
//       );
//     default:
//       return false;
//   }
// }

export function CoordinatesWithinPolyGon(
  geometryObj: GeoJson.Point | GeoJson.Polygon | GeoJson.MultiPolygon,
  surroundingPolygon: GeoJson.Polygon | GeoJson.MultiPolygon
) {
  switch (geometryObj.type) {
    case 'Point':
    case 'Polygon':
      return CoordinatesWithinSignlePolyGon(geometryObj, surroundingPolygon);
    case 'MultiPolygon':
      // polygon.coordinates.some(pl=> CoordinatesWithinSignlePolyGon(geometryObj, pl))

      return (GeojsonFlatten(geometryObj) as GeoJson.Polygon[]).every(
        (geometryObjPoly) =>
          CoordinatesWithinSignlePolyGon(geometryObjPoly, surroundingPolygon)
      );
    default:
      console.warn();
      'Should Ever be seen!';
      return false;
  }
}

function CoordinatesWithinSignlePolyGon(
  geometryObj: GeoJson.Point | GeoJson.Polygon,
  surroundingPolygon: GeoJson.Polygon | GeoJson.MultiPolygon
) {
  switch (geometryObj.type) {
    case 'Point':
      return booleanPointInPolygon(
        geometryObj.coordinates,
        surroundingPolygon,
        { ignoreBoundary: false }
      );
    case 'Polygon':
      return geometryObj.coordinates.every((pol) =>
        pol.every((pnt) =>
          booleanPointInPolygon(pnt, surroundingPolygon, {
            ignoreBoundary: false,
          })
        )
      );

    //Historisch Centrum

    //Industrie Oevers C

    default:
      return false;
  }
}

// Distance between points in meters
export function convertLinestringToPoints(
  linestring: turf.Feature<turf.LineString>,
  distance: number = 100
): turf.Feature<turf.Point>[] {
  const lineLength = turf.length(linestring, { units: 'meters' });
  const numPoints = Math.floor(lineLength / distance);
  const fPoints: turf.Feature<turf.Point>[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const along = i * distance;
    const pointOnLine = turf.along(linestring, along, { units: 'meters' });
    pointOnLine.id = linestring.id;
    pointOnLine.properties={name:linestring.properties?.['name']}
    fPoints.push(pointOnLine);
  }
  return fPoints;
}

export function convertCollectionToMultipoints(
  collection: turf.FeatureCollection<turf.LineString>
): turf.FeatureCollection<turf.MultiPoint> {
  const multipoints: turf.Feature<turf.MultiPoint>[] = [];

  collection.features.forEach((feature) => {
    const points = convertLinestringToPoints(feature);
    const multiPoint = turf.multiPoint(
      points.map((t) => t.geometry.coordinates),
      { id: feature.id, ...feature.properties }
    );
    multiPoint.id = feature.id;
    multipoints.push(multiPoint);
  });

  return turf.featureCollection(multipoints);
}
