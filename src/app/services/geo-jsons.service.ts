import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as GeoJSON from 'geojson';
import geojsonFlatten from 'geojson-flatten';
import {
  Observable,
  debounceTime,
  delay,
  flatMap,
  forkJoin,
  map,
  map as mapRx,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import * as turf from '@turf/turf';
import { debounce } from 'leaflet.glify';
import { convertCollectionToMultipoints } from '../utils/helper';
import { error } from 'console';
// import { type } from 'os';
// const proj4 = require('proj4');
declare var glob: any[];

@Injectable({ providedIn: 'root' })
export class GeoJsonsService {
  // private _To4326 = (array: GeoJSON.Position) =>
  //   proj4.default('EPSG:3857', 'EPSG:4326', array) as GeoJSON.Position;
  // private _To3857 = (array: GeoJSON.Position) =>
  //   proj4.default('EPSG:4326', 'EPSG:3857', array) as GeoJSON.Position;

  constructor(private httpClient: HttpClient) {

    glob.push({ turf: turf });
  }

  private _db: geoJsonDatasourceDicType = new Map<
    GeoJsonFileNameEnum | string,
    GeoJSON.FeatureCollection
  >();

  private fetchData = (fn: GeoJsonFileNameEnum) =>
    this.httpClient.get<GeoJSON.FeatureCollection>(
      `${environment.assetsUrl}/geojson/${fn}.geojson?version=324`
    );

  private _DeepCopyAndFlattened = <T>(value: T): T =>
    geojsonFlatten(JSON.parse(JSON.stringify(value)));

  private isDataLoaded = false;
  private setDataInDic(
    key: GeoJsonFileNameEnum | string,
    value: GeoJSON.FeatureCollection<
      GeoJSON.Geometry,
      GeoJSON.GeoJsonProperties
    >
  ) {
    this._db.set(key, value);
    this._db.set(key + '_F', this._DeepCopyAndFlattened(value));
  }

  private loadData(): Observable<geoJsonDatasourceDicType> {
    let _maxItems = 1000 * 1000;
    if (this.isDataLoaded) return of(this._db);
    else {
      let Adresses = this.fetchData(GeoJsonFileNameEnum.Adresses);
      let Buildings = this.fetchData(GeoJsonFileNameEnum.Buildings);
      let Neighborhoods = this.fetchData(GeoJsonFileNameEnum.Neighborhoods);
      let Ownership_data = this.fetchData(GeoJsonFileNameEnum.OwnershipData);
      let netload_import = this.fetchData(GeoJsonFileNameEnum.NetloadImport);
      let tygron_section_geometry = this.fetchData(
        GeoJsonFileNameEnum.TygronSectionGeometry
      );
      let roadLine = this.fetchData(GeoJsonFileNameEnum.RoadLine);
      return forkJoin([
        Adresses,
        Buildings,
        Neighborhoods,
        Ownership_data,
        netload_import,
        tygron_section_geometry,
        roadLine,
      ]).pipe(
        take(1),

        map((rs) => rs.map((it) => turf.toWgs84(it, { mutate: false }))),
        // this line is mutating the DATA!!
        //  tap(rs=>rs.map(it=> turf.truncate(it as turf.FeatureCollection ,{precision: 5 , mutate:true} ) )),
        tap(
          ([
            Adresses,
            Buildings,
            Neighborhoods,
            Ownership_data,
            netload_import,
            tygron_section_geometry,
            roadLine,
          ]) => {
            this.setDataInDic(GeoJsonFileNameEnum.Adresses, Adresses);

            this.setDataInDic(GeoJsonFileNameEnum.Buildings, Buildings);

            try {
              //@ts-ignore
              Neighborhoods.features.forEach(
                //@ts-ignore
                (f) => (f.properties.area = Math.round( turf.area(f.geometry) / 1000 ?? 0 ))
              );
              //@ts-ignore
              Neighborhoods.features = Neighborhoods.features.sort( (a, b) => b.properties.area - a.properties.area );
            } catch (ee) {
              console.log(ee);
            }
            this.setDataInDic(GeoJsonFileNameEnum.Neighborhoods, Neighborhoods);

            this.setDataInDic(
              GeoJsonFileNameEnum.OwnershipData,
              Ownership_data
            );

            this.setDataInDic(
              GeoJsonFileNameEnum.NetloadImport,
              netload_import
            );

            this.setDataInDic(
              GeoJsonFileNameEnum.TygronSectionGeometry,
              tygron_section_geometry
            );

            roadLine.features.forEach((f,ix)=>{ roadLine.features[ix].id=ix } )
            this.setDataInDic(GeoJsonFileNameEnum.RoadLine, roadLine);
            this.setDataInDic(GeoJsonFileNameEnum.RoadLineInShapeOfMultiPoint, convertCollectionToMultipoints(roadLine as turf.FeatureCollection<turf.LineString, turf.Properties>));


            this.isDataLoaded = true;
            
          }
        ),
        map((_) => this._db)
      );
    }
  }

  public GetDataSource = () => this.loadData().pipe(map((db) => new Map(db)));

  // remove this method later when you get ride of main app
  public Get = (
    key: GeoJsonFileNameEnum,
    flattened = false
  ): Promise<
    GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>
  > =>
    new Promise<
      GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>
    >((resolve, reject) => {
      of('').pipe(
        delay(3000))
        .subscribe
        ((_) =>
          this.loadData()
            .pipe(take(1))
            .subscribe(
               (_) => {
                resolve(this._db.get(key + (flattened ? '_F' : '')) as any);
            })
        )
    });
}

export enum GeoJsonFileNameEnum {
  Adresses = 'Adresses',
  Buildings = 'Buildings',
  Neighborhoods = 'Neighborhoods',
  NetloadImport = 'netload_import',
  OwnershipData = 'Ownership_data',
  TygronSectionGeometry = 'tygron_section_geometry',
  RoadLine = 'road_line',
  RoadLineInShapeOfMultiPoint="______RoadLineInShapeOfMultiPoint"
}

export type geoJsonDatasourceDicType = Map<
  GeoJsonFileNameEnum | string,
  GeoJSON.FeatureCollection
>;
