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
import * as L from 'leaflet';
import { Deck } from 'lib';
import {
  GeoJsonFileNameEnum,
  GeoJsonsService,
} from '../services/geo-jsons.service';
import {
  AdressesCollection,
  AdressesFeatureProperties,
} from '../geojson.interfaces/Adresses';
import { BuildingsCollection, BuildingsFeature } from '../geojson.interfaces/Buildings';
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
} from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BreakpointState } from '@angular/cdk/layout';
import { mapViewStateInterface } from '../geojson.interfaces/_SharedTypes';
import { CRS } from 'leaflet';
import {
  DrawCluster_INHABITANTS,
  IRemovableLayers,
  drawClusterRoofArea,
} from './drawCluster';
import { LayersSetting } from '../state/map.reducer';

export class DrawBuildings {
  Layers: any = [];
  constructor(
    private map: L.Map,
  ) {}
  Clear(){
    if (this.Layers.length > 0)
    this.Layers.forEach((it: any) => {
      this.map.removeLayer(it as any);
    });
  this.Layers = [];
  }
  Draw(ds: BuildingsCollection<GeoJSON.MultiPolygon> | undefined) {
    if (!ds) return;
   this.Clear();

    let layer = new DeckLayers.GeoJsonLayer({
      id: 'layer_' + GeoJsonFileNameEnum.Buildings,
      data: ds, 
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      opacity: 0.15,
      getLineColor: (f: unknown) => RandomColor(0, 50),
      getFillColor: (f: unknown) => RandomColor()  
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

    let getTooltip = ({ object }: { object: any }) => {
      return (
        object &&
        `Average Property Value
      ${object.properties.valuePerSqm}
      Growth
      ${Math.round(object.properties.growth * 100)}`
      );
    };

    const deckLayer = new LeafletLayer({
      views: [
        new DeckCore.MapView({
          repeat: true,
        }),
      ],
      layers: [layer],
      //  layers: [ polygonLayer],
    });
    this.map.addLayer(deckLayer as any);
    this.Layers.push(deckLayer as any);
  }
}
