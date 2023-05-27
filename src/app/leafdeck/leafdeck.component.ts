import * as L from 'leaflet';

import * as Markercluster from 'leaflet.markercluster';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as DeckCore from '@deck.gl/core';
import * as DeckLayers from '@deck.gl/layers';
import { LeafletLayer } from 'deck.gl-leaflet';
import { Deck } from 'lib';
import {
  GeoJsonFileNameEnum,
  GeoJsonsService,
} from '../services/geo-jsons.service';
import {
  AdressesCollection,
  AdressesFeature,
  AdressesFeatureProperties,
} from '../geojson.interfaces/Adresses';
import { BuildingsCollection } from '../geojson.interfaces/Buildings';
import {
  NeighborhoodsCollection,
  NeighborhoodsFeature,
  NeighborhoodsFeatureProperties,
} from '../geojson.interfaces/Neighborhoods';
import { TitleUrls } from '../utils/const';
import { RandomColor, ToColor, fnRndLatLngPs, rnd } from '../utils/helper';

import { Store } from '@ngrx/store';

import * as mapSelectors from '../state/map.selectors';
import {
  Observable,
  debounceTime,
  filter,
  map,
  shareReplay,
  takeWhile,
  tap,
  combineLatest,
  distinct,
  distinctUntilChanged,
} from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BreakpointState } from '@angular/cdk/layout';
import { mapViewStateInterface } from '../geojson.interfaces/_SharedTypes';
import { CRS } from 'leaflet';
import {
  DrawCluster_INHABITANTS,
  DrawCluster_Netload_KWH,
  DrawCluster_Netload_M3,
  IRemovableLayers,
  drawClusterRoofArea,
} from './drawCluster';
import { LayersSetting } from '../state/map.reducer';
import { DrawBuildings } from './drawbuildings';
import {
  RoadLineFeature,
  RoadLineFeatureCollection,
  RoadLineFeatureProperties,
} from '../geojson.interfaces/road_line';
import * as turf from '@turf/turf';
import {
  NetloadImportCollection,
  NetloadImportFeature,
} from '../geojson.interfaces/NetloadImport';
import { MapApiActions } from '../state/map.actions';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-leafdeck2',
  templateUrl: './leafdeck.component.html',
  styleUrls: ['./leafdeck.component.scss'],
})
export class LeafdeckComponent implements OnInit, AfterViewInit, OnDestroy {
  isHandset$: Observable<BreakpointState> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(shareReplay());
  /************ */

  /************ */

  state!: mapViewStateInterface;
  SetMapState(s: mapViewStateInterface = this.state) {
    // this.map.flyTo(s.Center, s.Zoom);
    this.map.setView(s.Center, s.Zoom);
    // this.map.panTo(s.Center)
  }
  GetMapState() {
    this.state = {
      Center: this.map.getCenter(),
      Zoom: this.map.getZoom(),
    };
  }

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private ui: UiService
  ) {
    console.log(Markercluster);
  }
  ngOnDestroy(): void {
    this.componentActive = false;
    console.log('*********ngOnDestroy******');
  }
  ngAfterViewInit(): void {
    this.isHandset$.subscribe((rs) => console.log('this.isHandset$.subsc', rs));
    this.initMap();
    //
    this.Neighborhoods$.subscribe((rs) => {
      this.initLayerNeighborhood(rs);
      console.log(rs);
    });

    let buildingDrawer = new DrawBuildings(this.map);
    combineLatest([
      this.Setting$.pipe(
        map((set) => set.buildings),
        distinctUntilChanged()
      ),
      this.Buildings$,
    ]).subscribe(([visbuild, buildings]) => {
      if (visbuild) buildingDrawer.Draw(buildings);
      else buildingDrawer.Clear();
    });

    combineLatest([this.Setting$, this.Adresses$]).subscribe(
      ([setting, addreses]) => {
        this.initLayerAddreses(addreses, setting);
      }
    );

    combineLatest([
      this.Setting$.pipe(
        map((set) => set.roads),
        distinctUntilChanged()
      ),
      this.RoadLine$,
    ]).subscribe(([vis, roadsLines]) => {
      this.drawRoadLines(roadsLines, vis);
    });

    combineLatest([
      this.Setting$.pipe(
        map((set) => set.cluster_VERBRUIK_KWH),
        distinctUntilChanged()
      ),
      this.Setting$.pipe(
        map((set) => set.cluster_VERBRUIK_M3),
        distinctUntilChanged()
      ),
      this.NetloadImport$,
    ]).subscribe(([visibile_KWH, visibile_M3, netload]) => {
      this.initLayerClusterNetload(netload, visibile_KWH, visibile_M3);
    });

    combineLatest([
      this.Setting$.pipe(
        map((set) => set.energyConsumptionByStreets_KWH),
        distinctUntilChanged()
      ),
      this.Setting$.pipe(
        map((set) => set.energyConsumptionByStreets_M3),
        distinctUntilChanged()
      ),

      this.RoadLine$,
      this.NetloadImport$,
      this.RoadLineInShapeOfPoints$,
    ]).subscribe(
      ([
        visibile_KWH,
        visibile_M3,
        roadsLines,
        netload,
        roadLineInShapeOfPoints,
      ]) => {
        if (visibile_KWH || visibile_M3) this.ui.spin$.next(true);

        setTimeout(() => {
          this.calcPointToRaods(
            netload,
            roadLineInShapeOfPoints,
            roadsLines,
            visibile_KWH,
            visibile_M3
          );
          if (visibile_KWH || visibile_M3) this.ui.spin$.next(false);
        }, 200);
      }
    );
  }
  @ViewChild('map', { read: ElementRef })
  mapElemRef!: ElementRef<HTMLDivElement>;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  private map!: L.Map;
  Setting$ = this.store.select(mapSelectors.selectLayersSetting).pipe(
    filter((it) => !!it),
    debounceTime(85)
  );
  Adresses$ = this.store.select(mapSelectors.selectAdresses).pipe(
    filter((it) => !!it),
    debounceTime(100)
  );
  Buildings$ = this.store.select(mapSelectors.selectBuildings).pipe(
    filter((it) => !!it),
    debounceTime(150)
  );
  Neighborhoods$ = this.store.select(mapSelectors.selectNeighborhoods).pipe(
    // tap((rs) => console.log('Neighborhoods length', rs?.features.length)),
    debounceTime(180),
    filter((it) => !!it)
  );
  NetloadImport$ = this.store.select(mapSelectors.selectNetloadImport).pipe(
    filter((it) => !!it),
    debounceTime(95)
  );
  TygronSectionGeometry$ = this.store
    .select(mapSelectors.selectTygronSectionGeometry)
    .pipe(
      filter((it) => !!it),
      debounceTime(235)
    );

  RoadLine$ = this.store.select(mapSelectors.selectRoadLine).pipe(
    filter((it) => !!it),
    debounceTime(310)
  );

  RoadLineInShapeOfPoints$ = this.store
    .select(mapSelectors.selectRoadLineInShapeOfPoints)
    .pipe(
      filter((it) => !!it),
      debounceTime(310)
    );

  componentActive = true;
  ngOnInit(): void {
    console.log('ngOninit');
  }
  startLatLng: L.LatLngLiteral = {
    lat: 52.68340048498056,
    lng: 6.190634965896607,
  }; // [51.5, -0.11];
  initMap = () => {
    console.log('CRS.EPSG3857, ', CRS.EPSG3857);
    let _startLatLng = L.latLng(this.startLatLng);

    this.map = L.map(this.mapElemRef.nativeElement, {
      //  crs:CRS.EPSG3857,
      renderer: L.canvas(),
      maxZoom: 25,
      minZoom: 5,
    }).setView(_startLatLng, 18);

    function onMapClick(e: any) {
      console.log('click ', e.latlng, e);
    }

    //  this.map.on('click', onMapClick);

    this.map.on('zoomend', (e: any) => {
      //console.log('zoom ', e.sourceTarget?._zoom, e);
    });

    const tiles = L.tileLayer(TitleUrls[0], {
      maxZoom: 25,
      attribution: 'link?',
    }).addTo(this.map);
  };

  removableLayersInitNetload: IRemovableLayers[] = [];

  initLayerClusterNetload = (
    ds: undefined | NetloadImportCollection,
    visibile_KWH: boolean,
    visibile_M3: boolean
  ) => {
    if (!ds) return;

    this.removableLayersInitNetload.forEach((el) => el.DestroyClusters());
    if (visibile_KWH)
      this.removableLayersInitNetload.push(
        new DrawCluster_Netload_KWH(ds, this.map)
      );

    if (visibile_M3)
      this.removableLayersInitNetload.push(
        new DrawCluster_Netload_M3(ds, this.map)
      );
  };

  removableLayersInitAddress: IRemovableLayers[] = [];

  initLayerAddreses = (
    ds: undefined | AdressesCollection,
    setting: LayersSetting
  ) => {
    if (!ds) return;

    this.removableLayersInitAddress.forEach((el) => el.DestroyClusters());
    if (setting.populationClusterd)
      this.removableLayersInitAddress.push(
        new DrawCluster_INHABITANTS(ds, this.map)
      );
    if (setting.roofArea)
      this.removableLayersInitAddress.push(
        new drawClusterRoofArea(ds, this.map)
      );

    this.DrawEnergyLabels(ds, setting.energyLables);
  };
  toggleClicked(tt: any) {
    setTimeout(() => {
      this.map.invalidateSize();
    }, 250);
  }

  LayersNeighborhood: any = [];

  initLayerNeighborhood = (
    ds: NeighborhoodsCollection<GeoJSON.MultiPolygon> | undefined
  ) => {
    if (!ds) return;
    if (this.LayersNeighborhood.length > 0)
      this.LayersNeighborhood.forEach((it: any) => {
        this.map.removeLayer(it as any);
      });
    this.LayersNeighborhood = [];
    console.log('NeighborhoodsCollection', ds.features.length);
    //  ds.features = ds.features.filter((t) => t.properties.PARENT_ZONE == -1);
    let layer = new DeckLayers.GeoJsonLayer({
      id: 'layer_' + GeoJsonFileNameEnum.Neighborhoods,
      data: ds, //.features.filter(it=>it.properties.area>500),
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      opacity: 0.15,
      getLineColor: (f: unknown) => {
        let r = f as NeighborhoodsFeature<GeoJSON.MultiPolygon>;
        let c = (1 - r.properties.area / 2220.0) * 255;
        return RandomColor(0, 50);
      },
      getFillColor: (f: unknown) => {
        let r = f as NeighborhoodsFeature<GeoJSON.MultiPolygon>;

        let c = (r.properties.area / 2220.0) * 255;
        let cr = 255 - c;
        //  return ToColor( r.properties.COLOR)
        return r.properties.COLOR ? ToColor(r.properties.COLOR) : RandomColor(); //[cr,c,cr] as DeckCore.RGBAColor
      },
    });

    const COLOR_SCALE: DeckCore.RGBAColor[] = [
      // negative
      [65, 182, 196],
      [127, 205, 187],
      [199, 233, 180],
      [237, 248, 177],

      // positive
      [255, 255, 204],
      [255, 237, 160],
      [254, 217, 118],
      [254, 178, 76],
      [253, 141, 60],
      [252, 78, 42],
      [227, 26, 28],
      [189, 0, 38],
      [128, 0, 38],
    ];

    let colorScale = (x: any) => {
      const i = Math.round(x * 7) + 4;
      if (x < 0) {
        return COLOR_SCALE[i] || COLOR_SCALE[0];
      }
      return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
    };

    const deckLayer = new LeafletLayer({
      views: [
        new DeckCore.MapView({
          repeat: true,
        }),
      ],
      layers: [layer],
    });
    this.map.addLayer(deckLayer as any);
    this.LayersNeighborhood.push(deckLayer as any);
  };

  LayerEnergy: any[] = [];
  DrawEnergyLabels(addreses: AdressesCollection, visible: boolean) {
    if (this.LayerEnergy.length > 0)
      this.LayerEnergy.forEach((it: any) => {
        this.map.removeLayer(it as any);
      });
    this.LayerEnergy = [];
let data=addreses.features;
    if (!visible) return;
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx');
 
    let enerygyLayer = new DeckLayers.ScatterplotLayer({
      id: 'scatterplot-energylables-layer',
      data: data,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 1,
      radiusMinPixels: 1,
      radiusMaxPixels: 10,
      lineWidthMinPixels: 1,
      getPosition: (d) => {
        let a = d as AdressesFeature;
       // let x = [a.geometry.coordinates[0], a.geometry.coordinates[1]] as DeckCore.Position2D;
        return a.geometry.coordinates  as DeckCore.Position2D;
      },
      // getRadius: (d) => 100, //Math.sqrt(d.exits),
       getFillColor: (d) => [255, 140, 0],
       getLineColor: (d) => [0, 0, 0],
    });
    let LayerRaodLines = new LeafletLayer({
      views: [
        new DeckCore.MapView({
          repeat: true,
        }),
      ],
      layers: [enerygyLayer],
      onHover: ({ object }:any) => { 
        let a = object as AdressesFeature;
        if (!a) return;
        console.log(a,a.properties.ENERGY_LABEL)
      },
      getTooltip:  ({ object }:any) => { 
        let a = object as AdressesFeature;
        if (!a) return;
        return { html: '<div class="ENERGY_LABEL_tooltip">'+ a.properties.ENERGY_LABEL + '</div>'};
      },
    });
    this.map.addLayer(LayerRaodLines as L.Layer);
  }

  ////// Road lines
  LayerRaodLines: any;
  drawRoadLines(data: RoadLineFeatureCollection | undefined, visible: boolean) {
    if (!visible && !!this.LayerRaodLines)
      this.map.removeLayer(this.LayerRaodLines as L.Layer);
    if (!data) return;
    if (!visible) return;
    this.LayerRaodLines = new LeafletLayer({
      views: [
        new DeckCore.MapView({
          repeat: true,
        }),
      ],
      layers: [
        new DeckLayers.GeoJsonLayer({
          id: 'RoadLineLayer',
          data: data,
          filled: true,
          lineWidthMinPixels: 2,
          getLineColor: (f: unknown) => [80, 150, 250],
        }),
      ],
    });
    this.map.addLayer(this.LayerRaodLines as L.Layer);
  }

  calcPointToRaods(
    netLoad: undefined | NetloadImportCollection,
    roadLineInShapeOfPoints: turf.FeatureCollection<turf.Point> | undefined,
    roalines: RoadLineFeatureCollection | undefined,
    visibile_KWH: boolean,
    visibile_M3: boolean
  ) {
    let visible = visibile_KWH || visibile_M3;
    if (!!this.LayerRaodLinesByEnergyConsumption) {
      this.map.removeLayer(this.LayerRaodLinesByEnergyConsumption);
      this.LayerRaodLinesByEnergyConsumption = undefined;
    }
    if (!netLoad || !roalines || !roadLineInShapeOfPoints) return;

    if (!visible) return;

    let netloadCopy = JSON.parse(
      JSON.stringify(netLoad)
    ) as NetloadImportCollection;

    let max_sum_VERBRUIK_KWH = 0;
    let max_sum_VERBRUIK_GJ = 0;
    let max_sum_VERBRUIK_M3 = 0;
    let min = 0;
    let streetsMapNetload = new Map<
      string | number,
      {
        nloads: NetloadImportFeature[];
        nearestPoint: any;
        sum_VERBRUIK_KWH: number;
        avg_VERBRUIK_KWH: number;
        sum_VERBRUIK_GJ: number;
        avg_VERBRUIK_GJ: number;
        sum_VERBRUIK_M3: number;
        avg_VERBRUIK_M3: number;
      }
    >();
    let ls = netloadCopy.features.map((nload) => {
      let nearestPoint = turf.nearestPoint(
        nload.geometry.coordinates,
        roadLineInShapeOfPoints
      );
      nload.properties._streetNodeID = nearestPoint.id;
      nload.properties._streetNodeDistance =
        nearestPoint.properties.distanceToPoint;
      nload.properties._streetNodeName = nearestPoint.properties?.['name'];
      if (!nearestPoint.id) {
        console.warn('you should never see this !!!');
        return;
      }
      let cachedObj = streetsMapNetload.get(nearestPoint.id);
      if (!cachedObj)
        streetsMapNetload.set(nearestPoint.id, {
          nloads: [nload],
          nearestPoint,
          sum_VERBRUIK_KWH: nload.properties.VERBRUIK_KWH,
          avg_VERBRUIK_KWH: nload.properties.VERBRUIK_KWH,
          sum_VERBRUIK_GJ: nload.properties.VERBRUIK_GJ,
          avg_VERBRUIK_GJ: nload.properties.VERBRUIK_GJ,
          sum_VERBRUIK_M3: nload.properties.VERBRUIK_M3,
          avg_VERBRUIK_M3: nload.properties.VERBRUIK_M3,
        });
      else {
        cachedObj.nloads.push(nload);
        cachedObj.sum_VERBRUIK_KWH += nload.properties.VERBRUIK_KWH;
        cachedObj.avg_VERBRUIK_KWH =
          cachedObj.sum_VERBRUIK_KWH / cachedObj.nloads.length;

        cachedObj.sum_VERBRUIK_M3 += nload.properties.VERBRUIK_M3;
        cachedObj.avg_VERBRUIK_M3 =
          cachedObj.sum_VERBRUIK_M3 / cachedObj.nloads.length;

        cachedObj.sum_VERBRUIK_GJ += nload.properties.VERBRUIK_GJ;
        cachedObj.avg_VERBRUIK_GJ =
          cachedObj.sum_VERBRUIK_GJ / cachedObj.nloads.length;

        if (max_sum_VERBRUIK_KWH < cachedObj.sum_VERBRUIK_KWH)
          max_sum_VERBRUIK_KWH = cachedObj.sum_VERBRUIK_KWH;

        if (max_sum_VERBRUIK_GJ < cachedObj.sum_VERBRUIK_GJ)
          max_sum_VERBRUIK_GJ = cachedObj.sum_VERBRUIK_GJ;
        if (max_sum_VERBRUIK_M3 < cachedObj.sum_VERBRUIK_M3)
          max_sum_VERBRUIK_M3 = cachedObj.sum_VERBRUIK_M3;
      }

      return nload;
    });
    max_sum_VERBRUIK_KWH = (max_sum_VERBRUIK_KWH ?? 0) + 1;
    max_sum_VERBRUIK_M3 = (max_sum_VERBRUIK_M3 ?? 0) + 1;
    max_sum_VERBRUIK_GJ = (max_sum_VERBRUIK_GJ ?? 0) + 1;
    //// extend roadlines data
    let roadlinesCopy = JSON.parse(
      JSON.stringify(roalines)
    ) as RoadLineFeatureCollection<turf.LineString, RoadLineFeatureProperties>;
    roadlinesCopy.features.forEach((el, idx) => {
      if (!el.id) return;
      let obj = streetsMapNetload.get(el.id);
      if (!obj) return;
      let thisStreetProps = roadlinesCopy.features[idx].properties;
      thisStreetProps.sum_VERBRUIK_KWH = Math.round(obj.sum_VERBRUIK_KWH);
      thisStreetProps.avg_VERBRUIK_KWH = Math.round(obj.avg_VERBRUIK_KWH);

      thisStreetProps.sum_VERBRUIK_GJ = Math.round(obj.sum_VERBRUIK_GJ);
      thisStreetProps.avg_VERBRUIK_GJ = Math.round(obj.avg_VERBRUIK_GJ);

      thisStreetProps.sum_VERBRUIK_M3 = Math.round(obj.sum_VERBRUIK_M3);
      thisStreetProps.avg_VERBRUIK_M3 = Math.round(obj.avg_VERBRUIK_M3);

      thisStreetProps._color_KWH = Math.round(
        (255 * obj.sum_VERBRUIK_KWH) / max_sum_VERBRUIK_KWH
      );

      thisStreetProps._color_GJ = Math.round(
        (255 * obj.sum_VERBRUIK_GJ) / max_sum_VERBRUIK_GJ
      );

      thisStreetProps._color_M3 = Math.round(
        (255 * obj.sum_VERBRUIK_M3) / max_sum_VERBRUIK_M3
      );
    });

    this.store.dispatch(
      MapApiActions.updatedRoalinesData({
        roadLineWithConsumptions: roadlinesCopy,
      })
    );

    this.drawRaodLinesByEnergyConsumption(
      roadlinesCopy,
      visibile_KWH,
      visibile_M3
    );
  }

  ////// Road lines  ByEnergyConsumption
  LayerRaodLinesByEnergyConsumption: any;
  drawRaodLinesByEnergyConsumption(
    data: RoadLineFeatureCollection | undefined,
    visibile_KWH: boolean,
    visibile_M3: boolean
  ) {
    if (!data) return;

    let _KWH_Layer = new DeckLayers.GeoJsonLayer({
      id: '_KWH_RaodLinesByEnergyConsumption',
      data: data,
      filled: true,
      lineWidthMinPixels: 4,
      getLineColor: (f: unknown) => {
        let p = f as RoadLineFeature;

        let color = p.properties._color_KWH;
        if (!color) return [200, 200, 200, 0];
        return [color, 0, 0];
      },
    });

    let _M3_Layer = new DeckLayers.GeoJsonLayer({
      id: '_M3_RaodLinesByEnergyConsumption2',
      data: data,
      filled: true,
      lineWidthMinPixels: 4,
      getLineColor: (f: unknown) => {
        let p = f as RoadLineFeature;

        let color = p.properties._color_M3;
        if (!color) return [200, 200, 200, 0];
        return [0, color, 0];
      },
    });
    let layers = [];
    if (visibile_KWH) layers.push(_KWH_Layer);
    if (visibile_M3) layers.push(_M3_Layer);
    this.LayerRaodLinesByEnergyConsumption = new LeafletLayer({
      views: [
        new DeckCore.MapView({
          repeat: true,
        }),
      ],
      layers: layers,
    });
    this.map.addLayer(this.LayerRaodLinesByEnergyConsumption as L.Layer);
  }
}
