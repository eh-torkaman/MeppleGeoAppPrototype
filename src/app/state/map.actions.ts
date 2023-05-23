import { createActionGroup, props } from '@ngrx/store';
import { GeoJsonFileNameEnum, geoJsonDatasourceDicType } from '../services/geo-jsons.service';
import { MultiPolygon, Polygon } from '@turf/turf';
import { LayersSetting } from './map.reducer';
import { RoadLineFeatureCollection, RoadLineFeatureProperties } from '../geojson.interfaces/road_line';
 import * as turf from '@turf/turf'
// export const MapActions = createActionGroup({
//   source: 'MAp',
//   events: {
//     'Add Book': props<{ bookId: string }>(),
//     'Remove Book': props<{ bookId: string }>(),
//   },
// });


export const MapApiActions = createActionGroup({
  source: 'Map API',
  events: {
    'Retrieved Geojson Data': props<{ datasource: Readonly<geoJsonDatasourceDicType> }>(),
    'updated Roalines Data':props<{roadLineWithConsumptions:RoadLineFeatureCollection<turf.LineString, RoadLineFeatureProperties>}>()

  },
});



export const MapSettingActions = createActionGroup({
  source: 'Map Setting Actions',
  events: {
    'set Filter MultiPolygon': props<{ multipolygon: MultiPolygon|Polygon }>(),
    'toggle Clustesrs ':props<{layersSetting:LayersSetting}>(),
  },
});
