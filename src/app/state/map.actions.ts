import { createActionGroup, props } from '@ngrx/store';
import { GeoJsonFileNameEnum, geoJsonDatasourceDicType } from '../services/geo-jsons.service';
import { MultiPolygon, Polygon } from '@turf/turf';
import { LayersSetting } from './map.reducer';
 
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

  },
});



export const MapSettingActions = createActionGroup({
  source: 'Map Setting Actions',
  events: {
    'set Filter MultiPolygon': props<{ multipolygon: MultiPolygon|Polygon }>(),
     'toggle Clustesrs ':props<{layersSetting:LayersSetting}>()
  },
});
