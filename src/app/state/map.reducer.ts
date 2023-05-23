import { createReducer, on } from '@ngrx/store';
import * as L from 'leaflet';
import * as Geojson from 'geojson';
import * as turf from '@turf/turf'
import { MapApiActions, MapSettingActions } from './map.actions';
import {
  GeoJsonFileNameEnum,
  geoJsonDatasourceDicType,
} from '../services/geo-jsons.service';
import { mapViewStateInterface } from '../geojson.interfaces/_SharedTypes';
import { InitialFilteredViewPolygonCoordinates } from '../utils/const';
import * as Immer from 'immer';
import { RoadLineFeatureCollection, RoadLineFeatureProperties } from '../geojson.interfaces/road_line';
export interface LayersSetting {
  populationClusterd: boolean;
  roofArea: boolean;
  floorArea: boolean;
  buildings: boolean;
  energyLables: boolean;
  cluster_VERBRUIK_KWH:boolean;
  cluster_VERBRUIK_M3:boolean;
  energyConsumptionByStreets_KWH: boolean;
  energyConsumptionByStreets_M3:boolean;
  roads: boolean;
  [key: string]: boolean;
}
export interface stateSettingsInterface {
  map: mapViewStateInterface;
  boundaries: Geojson.Polygon | Geojson.MultiPolygon;
  layers: LayersSetting;
}
export interface globalStateInterface {
  datasource: geoJsonDatasourceDicType;
  settings: stateSettingsInterface;
  otherData:{
    roadLineWithConsumptions?:RoadLineFeatureCollection<turf.LineString, RoadLineFeatureProperties> ;
  }
}

export const initialState: Readonly<globalStateInterface> = {
  datasource: new Map<
    GeoJsonFileNameEnum | string,
    GeoJSON.FeatureCollection
  >(),
  otherData: {},
  settings: {
    map: {
      Center: {
        lat: 52.68340048498056,
        lng: 6.190634965896607,
      },
      Zoom: 15,
    },
    boundaries: {
      type: 'Polygon',
      coordinates: InitialFilteredViewPolygonCoordinates,
    },
    layers: {
      populationClusterd: false,
      floorArea: false,
      roofArea: false,
      buildings: false,
      energyLables: false,
      cluster_VERBRUIK_KWH: false,
      cluster_VERBRUIK_M3: false,
      roads: false,
      energyConsumptionByStreets_KWH: false,
      energyConsumptionByStreets_M3: false,
    },
  },
};

export const mapApiReducer = createReducer(
  initialState,
  on(MapApiActions.retrievedGeojsonData, (_state, { datasource }) =>
    Immer.produce(_state, (draft) => {
      draft.datasource = datasource;
    })
  ),


  on(MapSettingActions.setFilterMultipolygon, (_state, { multipolygon }) =>
    Immer.produce(_state, (draft) => {
      draft.settings.boundaries = multipolygon;
    })
  ),
  on(MapSettingActions.toggleClustesrs, (_state, { layersSetting }) =>
    Immer.produce(_state, (draft) => {
      draft.settings.layers = layersSetting;
    })
  ),

  on(MapApiActions.updatedRoalinesData, (_state, { roadLineWithConsumptions }) =>
  Immer.produce(_state, (draft) => {
    draft.otherData.roadLineWithConsumptions = roadLineWithConsumptions;
  })
)
);
