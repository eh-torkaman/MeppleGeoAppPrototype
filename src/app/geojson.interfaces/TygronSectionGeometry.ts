import { CRS } from './_SharedTypes';

import { MultiPolygon, Polygon, Feature, FeatureCollection } from 'geojson';

export interface TygronSectionGeometryDataFeatureCollection<
  G extends MultiPolygon = MultiPolygon,
  P = TygronSectionGeometryFeatureProperties
> extends FeatureCollection<G, P> {
  type: 'FeatureCollection';
  features: OwnershipFeature<G, P>[];
  crs: CRS;
}
export interface OwnershipFeature<
  G extends MultiPolygon = MultiPolygon,
  P = TygronSectionGeometryFeatureProperties
> extends Feature<G, P> {}

export interface TygronSectionGeometryFeatureProperties {
  buildingID: number;
  sectionID: number;
  bagID: string;
  daktype: Daktype;
  dakhoogte: number;
  floorCount: number;
  sectionHoogte: number;
  bouwjaar: number;
  aantal_adressen: number;
  surfaceSize_Totaal: number;
}

export enum Daktype {
  Plat = 'Plat',
  Schuin = 'Schuin',
}

export enum FeatureType {
  Feature = 'Feature',
}
