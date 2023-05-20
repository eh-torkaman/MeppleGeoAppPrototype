import { Point, Feature, FeatureCollection, GeoJsonProperties } from 'geojson';
import { CRS } from './_SharedTypes';

export interface AdressesCollection<
  G extends Point = Point,
  P = AdressesFeatureProperties
> extends FeatureCollection<G, P> {
  features: Array<AdressesFeature<G, P>>;
  crs: CRS;
}

export interface AdressesFeature<
  G extends Point = Point,
  P = AdressesFeatureProperties
> extends Feature<G, P> {}

export interface AdressesFeatureProperties {
  /////
  _streetNode: any;
  _streetNodeID:string|number|undefined;
  _streetNodeName:string|undefined;
  _streetNodeDistance:number|undefined;
  /////
  BAG_ADDRESS_ID: number;
  ENERGY_LABEL?: number;
  INHABITANTS?: number;
  FLOOR_SPACE_M2: number;
  ID: number;
  CADASTRAL_PURPOSE: number[] | number;
  NAME: string;
  RESIDENCE_TYPE?: number;
}
export type AdressesFeaturePropertiesKeysType = keyof AdressesFeatureProperties;
