import { MultiPolygon, Polygon, Feature, FeatureCollection } from 'geojson';
import { CRS } from "./_SharedTypes";

export interface OwnershipDataFeatureCollection<
  G extends MultiPolygon = MultiPolygon,
  P = OwnershipFeatureProperties
> extends FeatureCollection<G, P> {
  type: 'FeatureCollection';
  features: OwnershipFeature<G, P>[];
  crs: CRS;
}
export interface OwnershipFeature<
  G extends MultiPolygon = MultiPolygon,
  P = OwnershipFeatureProperties
> extends Feature<G, P> {}

 


export interface OwnershipFeatureProperties {
  gml_parent_property: GMLParentProperty;
  gml_id: string;
  postcode: string;
  particuliere_eigenaar_bewoner: number;
  particuliere_verhuur: number;
  woningcorporatie: number;
  restcategorie: number;
}

export enum GMLParentProperty {
  Member = 'member',
}
