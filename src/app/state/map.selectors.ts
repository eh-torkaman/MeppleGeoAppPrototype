import {
  createSelector,
  createFeatureSelector,
  MemoizedSelector,
} from '@ngrx/store';
import {
  GeoJsonFileNameEnum,
  geoJsonDatasourceDicType,
} from '../services/geo-jsons.service';
import {
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  MultiPolygon,
  Polygon,
} from 'geojson';
import { AdressesCollection } from '../geojson.interfaces/Adresses';
import { BuildingsCollection } from '../geojson.interfaces/Buildings';
import { NeighborhoodsCollection } from '../geojson.interfaces/Neighborhoods';
import { NetloadImportCollection } from '../geojson.interfaces/NetloadImport';
import { TygronSectionGeometryDataFeatureCollection } from '../geojson.interfaces/TygronSectionGeometry';
import { OwnershipDataFeatureCollection } from '../geojson.interfaces/OwnershipData';
import { globalStateInterface, stateSettingsInterface } from './map.reducer';
import {
  CoordinatesWithinPolyGon,
  EmptyFeatureCollection,
  FilterFeaturesWithinPolyGon,
} from '../utils/helper';
import { RoadLineFeatureCollection } from '../geojson.interfaces/road_line';
import { MultiPoint, Point } from '@turf/turf';

// ''

const selectAppMapSate =
  createFeatureSelector<globalStateInterface>('appMapSate');

export const selectDatasourceDic = createSelector(
  selectAppMapSate,
  (stateSettings) => stateSettings.datasource
);


export const selectMapSettings = createSelector(
  selectAppMapSate,
  (stateSettings) => stateSettings.settings
);


export const selectLayersSetting = createSelector(
  selectMapSettings,
  (stateSettings) => stateSettings.layers
);

export const selectAdressses = createSelector(
  selectMapSettings,
  (stateSettings) => stateSettings.map
);

export const selectBoundaries = createSelector(
  selectMapSettings,
  (stateSettings) => stateSettings.boundaries
);

const selectData = (name: GeoJsonFileNameEnum, filterBaseOnBoundary = true, getFllatenedObj=false) =>
  createSelector(
    selectDatasourceDic,
    selectBoundaries,
    (datasourceDic, boundaries) => {
      if (filterBaseOnBoundary == false)
        return datasourceDic.get(getFllatenedObj ?name+"_F" :name) ?? EmptyFeatureCollection;

      let a: FeatureCollection<Geometry, GeoJsonProperties> | undefined =
        FilterFeaturesWithinPolyGon(
          datasourceDic.get(name) ?? EmptyFeatureCollection,
          boundaries
        );
      // console.log(
      //   'selectBoundaries : ',
      //   boundaries,
      //   name,
      //   'filterd: ',
      //   a.features.length
      // );
      return a as FeatureCollection<Geometry, GeoJsonProperties> | undefined;
    }
  );

type memFGeneric<T> = MemoizedSelector<
  object,
  T | undefined,
  (s1: geoJsonDatasourceDicType, s2: Polygon | MultiPolygon) => T
>;

export const selectAdresses = selectData(
  GeoJsonFileNameEnum.Adresses
) as memFGeneric<AdressesCollection>;

export const selectBuildings = selectData(
  GeoJsonFileNameEnum.Buildings
) as memFGeneric<BuildingsCollection<MultiPolygon>>;

export const selectNeighborhoods = selectData(
  GeoJsonFileNameEnum.Neighborhoods
) as memFGeneric<NeighborhoodsCollection<MultiPolygon>>;


export const selectNeighborhoods_NoFilter = selectData(
  GeoJsonFileNameEnum.Neighborhoods,false
) as memFGeneric<NeighborhoodsCollection<MultiPolygon>>;


export const selectNetloadImport = selectData(
  GeoJsonFileNameEnum.NetloadImport
) as memFGeneric<NetloadImportCollection>;

export const selectTygronSectionGeometry = selectData(
  GeoJsonFileNameEnum.TygronSectionGeometry
) as memFGeneric<TygronSectionGeometryDataFeatureCollection>;

export const selectOwnershipData = selectData(
  GeoJsonFileNameEnum.OwnershipData
) as memFGeneric<OwnershipDataFeatureCollection>;


export const selectRoadLine = selectData(
  GeoJsonFileNameEnum.RoadLine,  false
) as memFGeneric<RoadLineFeatureCollection>;



export const selectRoadLineInShapeOfPoints= selectData(
  GeoJsonFileNameEnum.RoadLineInShapeOfMultiPoint,  false,true
) as memFGeneric<FeatureCollection<Point> >;


 
export const selectRoadLineInShapeOfMultiPoint= selectData(
  GeoJsonFileNameEnum.RoadLineInShapeOfMultiPoint,  false
) as memFGeneric<FeatureCollection<MultiPoint>  >;