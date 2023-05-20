import {  Feature, FeatureCollection, LineString } from 'geojson';
import { CRS } from "./_SharedTypes";

export interface RoadLineFeatureCollection<
  G extends LineString = LineString,
  P = RoadLineFeatureProperties
> extends FeatureCollection<G, P> {
  type: 'FeatureCollection';
  features: RoadLineFeature<G, P>[];
  crs: CRS;
}
export interface RoadLineFeature<
  G extends LineString = LineString,
  P = RoadLineFeatureProperties
> extends Feature<G, P> {}



export interface RoadLineFeatureProperties {
  ////////
  sum_VERBRUIK_KWH:number|undefined;
  avg_VERBRUIK_KWH:number|undefined;
  sum_VERBRUIK_M3:number|undefined;
  avg_VERBRUIK_M3:number|undefined;
  sum_VERBRUIK_GJ:number|undefined;
  avg_VERBRUIK_GJ:number|undefined;

  

  _color_KWH:any;
  _color_M3:any;
  _color_GJ:any;

  ///////
    highway?: string
    name?: string
    maxspeed?: string
    oneway?: string
    surface?: string
    service?: string
    foot?: string
    lanes?: string
    bicycle?: string
    traffic_sign?: string
    moped?: string
    cycleway?: string
    layer?: string
    bridge?: string
    smoothness?: string
    lit?: string
    mofa?: string
    ref?: string
    access?: string
    noexit?: string
    destination?: string
    segregated?: string
    "oneway:bicycle"?: string
    sidewalk?: string
}
 