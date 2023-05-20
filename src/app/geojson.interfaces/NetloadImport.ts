import {  Point, FeatureCollection } from 'geojson';
import { CRS } from "./_SharedTypes";

export interface NetloadImportCollection<
G extends Point =Point ,
  P = NetloadImportFeatureProperties
> extends FeatureCollection {
  type: 'FeatureCollection';
  features: NetloadImportFeature[];
  crs: CRS;
}

 

export interface NetloadImportFeature {
  type: NetloadImportFeatureType;
  id: number;
  geometry: Point;
  properties: NetloadImportFeatureProperties;
}

export interface NetloadImportFeatureProperties {
   /////
   _streetNode: any;
   _streetNodeID:string|number|undefined;
   _streetNodeName:string|undefined;
   _streetNodeDistance:number|undefined;
   /////
  IDENTIFICATION_ID: number;
  BAG_ID: number;
  BAG_ADRESS_ID: number;
  FUNCTIE: string;
  NAME: string;
  BEWONERS: number;//RESIDENTS
  BOUWJAAR: number;//CONSTRUCTION YEAR
  WONINGTYPE: number; //HOUSING TYPE
  WOONOPPERVLAK: number;//RESIDENTIAL AREA
  GEVELOPPERVLAK: number;//FACADE SURFACE
  DAKOPPERVLAKSCHUIN: number;//ROOF SURFACE INCLINED
  DAKOPPERVLAKPLAT: number;//ROOF SURFACE PLATE
  PANDOPPERVLAK: number;
  CURRENT_ISOLATIE_MUUR: number;
  CURRENT_ISOLATIE_DAK: number;
  CURRENT_ISOLATIE_VLOER: number;
  CURRENT_ISOLATIE_RAAM: number;
  CURRENT_INSTALLATIE: number;
  VERBRUIK_M3: number;
  VERBRUIK_GJ: number; //CONSUMPTION_GJ
  VERBRUIK_KWH: number; //CONSUMPTION_KWH
  COLLECTIVE_MEASURE_CONFIGURATION: number;
  MEASURE_COLLECTIEF: number;
  IS_HOUSEHOLD: number;
  CLUSTER_ID: ClusterID;
  CLUSTER_GROUP_ID: ClusterID;
  ENERGIE_LABEL: string;
  ENERGIE_LABEL_NR: number;
}

export enum ClusterID {
  Null = 'Null',
}

export enum NetloadImportFeatureType {
  Feature = 'Feature',
}
