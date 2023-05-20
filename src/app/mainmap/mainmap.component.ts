import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { FeatureCollection, Point, Feature } from 'geojson';
import { GeoJsonFileNameEnum, GeoJsonsService } from '../services/geo-jsons.service';
import glify, { Glify } from 'leaflet.glify';
import { LeafletMouseEvent } from 'leaflet';
import * as Markercluster from 'leaflet.markercluster';
// import earcut from "earcut";
// import PolygonLookup from "polygon-lookup";
import geojsonFlatten from 'geojson-flatten';
import {
  AdressesCollection,
  
  AdressesFeature,
  
  AdressesFeatureProperties,
  AdressesFeaturePropertiesKeysType,
} from '../geojson.interfaces/Adresses';
import {
  BuildingsCollection,
  BuildingsFeature,
} from '../geojson.interfaces/Buildings';
import { geoJSON } from 'leaflet';
import { NeighborhoodsCollection } from '../geojson.interfaces/Neighborhoods';
//const glify = require('leaflet.glify');

declare var glob: any[];

@Component({
  selector: 'app-mainmap',
  templateUrl: './mainmap.component.html',
  styleUrls: ['./mainmap.component.scss']
})
 
export class MainmapComponent implements OnInit,AfterViewInit {
  /**
   *
   */
@ViewChild('map',{read:ElementRef}) mapElem!:ElementRef<HTMLDivElement>;
  constructor(public geoJsonService: GeoJsonsService) {}
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.InitMap()
  }

  mc: L.LatLngExpression = [52.7, 6.2];
  mc1: GeoJSON.Position = [52.7, 6.2];

  map!: L.Map;
  private getRandomLatLng = (map: L.Map) => {
    var bounds = map.getBounds(),
      southWest = bounds.getSouthWest(),
      northEast = bounds.getNorthEast(),
      lngSpan = northEast.lng - southWest.lng,
      latSpan = northEast.lat - southWest.lat;

    return new L.LatLng(
      southWest.lat + latSpan * Math.random(),
      southWest.lng + lngSpan * Math.random()
    );
  };
 

  markersList: any = [];

 


    
    DrawCluster_FLOOR_SPACE_M2() {
      let getMarkerClusterGroup_FLOOR_SPACE_M2 = () =>
      L.markerClusterGroup({
        maxClusterRadius: 100,
        iconCreateFunction: function (cluster) {
          var markers =
            cluster.getAllChildMarkers() as L.Marker<AdressesFeatureProperties>[];
  
          var n = 0;
          var unKnown = 0;
          for (var i = 0; i < markers.length; i++) {
            if (!!markers[i].feature?.properties.FLOOR_SPACE_M2)
              n += (markers[i].feature?.properties.FLOOR_SPACE_M2 as number) ?? 0;
            else unKnown++;
          }
          let estimate = markers.length;
          let countKnown = markers.length - unKnown;
          if (countKnown > 0) {
            let density = n / countKnown;
            estimate = Math.round(markers.length * density);
            console.log(
              n,
              estimate,
              markers.length,
              countKnown,
              unKnown,
              density
            );
          } else
            console.log(
              'number of FLOOR_SPACE_M2 of all point were undefined , ',
              estimate
            );
          let populationClassname = (pop: number) =>
           ' FLOOR_SPACE_M2 '+ 'marker-cluster-' +
            (estimate > 100 ? 'large' : estimate < 10 ? 'small' : 'medium');
          return L.divIcon({
            html: `
            <div class="leaflet-marker-icon marker-cluster ${populationClassname(
              estimate
            )} leaflet-zoom-animated leaflet-interactive" 
            tabindex="0"  z-index: 247; opacity: 1;">
            <div><span title='sum of estimated FLOOR_SPACE_M2:${estimate}'>${estimate}</span></div></div>`,
  
            className: 'mycluster_FLOOR_SPACE_M2',
            iconSize: L.point(40, 40),
          });
        },
        //Disable all of the defaults:
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true,
      });
    let markerClusterGroup1 =  new L.MarkerClusterGroup();
    markerClusterGroup1 = getMarkerClusterGroup_FLOOR_SPACE_M2();

    let markersList: any = this.markersList;

    let populate = async () => {
      (
        await    this.geoJsonService.Get(
          GeoJsonFileNameEnum.Adresses
        ) as AdressesCollection
      ).features.forEach((t) => {
        let ll = new L.LatLng(
          t.geometry.coordinates[1],
          t.geometry.coordinates[0]
        );

        let markerOption:L.MarkerOptions={icon:new L.DivIcon({html:`<div class='FLOOR_SPACE_M2_Marker'>${(t.properties.FLOOR_SPACE_M2??0).toFixed(0)}<div/>`})}
        let m = new L.Marker<AdressesFeatureProperties>(ll,markerOption);
         
        m.feature = t;

        markersList.push(m);
        markerClusterGroup1.addLayer(m);
      });
    };

    // markers1.on('clusterclick', function (a) {
    //   console.log(
    //     a,
    //     'markers1 cluster ' +
    //       (a.layer as L.MarkerCluster).getAllChildMarkers().length
    //   );
    // });

    // markers1.on('click', function (a) {
    //   console.log('marker ' + a);
    // });

    populate();
    this.map.addLayer(markerClusterGroup1);
  }

  DrawCluster_INHABITANTS() {
    let getMarkerClusterGroup_INHABITANTS = () =>
    L.markerClusterGroup({
      maxClusterRadius: 100,
      iconCreateFunction: function (cluster) {
        var markers =
          cluster.getAllChildMarkers() as L.Marker<AdressesFeatureProperties>[];

        var n = 0;
        var unKnown = 0;
        for (var i = 0; i < markers.length; i++) {
          if (!!markers[i].feature?.properties.INHABITANTS)
            n += (markers[i].feature?.properties.INHABITANTS as number) ?? 0;
          else unKnown++;
        }
        let estimate = markers.length;
        let countKnown = markers.length - unKnown;
        if (countKnown > 0) {
          let density = n / countKnown;
          estimate = Math.round(markers.length * density);
          console.log(
            n,
            estimate,
            markers.length,
            countKnown,
            unKnown,
            density
          );
        } else
          console.log(
            'number of inhabitants of all point were undefined , ',
            estimate
          );
        let populationClassname = (pop: number) =>
          ' INHABITANTS marker-cluster-' +
          (estimate > 100 ? 'large' : estimate < 10 ? 'small' : 'medium');
        return L.divIcon({
          html: `
          <div class="leaflet-marker-icon marker-cluster ${populationClassname(
            estimate
          )} leaflet-zoom-animated leaflet-interactive" 
          tabindex="0"  z-index: 247; opacity: 1;">
          <div><span title='Estimated population:${estimate}'>${estimate}</span></div></div>`,

          className: 'mycluster_INHABITANTS',
          iconSize: L.point(40, 40),
        });
      },
      //Disable all of the defaults:
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
    });
    let markerClusterGroup1 =  new L.MarkerClusterGroup();
    markerClusterGroup1 = getMarkerClusterGroup_INHABITANTS();

    let markersList: any = this.markersList;

    let populate = async () => {
      (
        await   this.geoJsonService.Get(
          GeoJsonFileNameEnum.Adresses
        ) as AdressesCollection
      ).features.forEach((t) => {
        let ll = new L.LatLng(
          t.geometry.coordinates[1],
          t.geometry.coordinates[0]
        );

        let markerOption:L.MarkerOptions={icon:new L.DivIcon({html:`<div class="INHABITANTS_Marker">${( t.properties.INHABITANTS??0).toFixed(2)}<div/>`})}
        let m = new L.Marker<AdressesFeatureProperties>(ll,markerOption);
        
        m.feature = t;

        markersList.push(m);
        markerClusterGroup1.addLayer(m);
      });
    };

    // markers1.on('clusterclick', function (a) {
    //   console.log(
    //     a,
    //     'markers1 cluster ' +
    //       (a.layer as L.MarkerCluster).getAllChildMarkers().length
    //   );
    // });

    // markers1.on('click', function (a) {
    //   console.log('marker ' + a);
    // });

    populate();
    this.map.addLayer(markerClusterGroup1);
  } 
  btnGeojsonFlatten() {
    let flattened = geojsonFlatten(
      this.geoJsonService.Get(GeoJsonFileNameEnum.Neighborhoods)
    );

     
    console.log(flattened);
  }

  private _glify: Glify = glify.longitudeFirst();
  async btnGliflyPolyClicked() {
    console.log(this.geoJsonService.Get(GeoJsonFileNameEnum.Buildings, true));
    let ll = this._glify.shapes({
      map: this.map,
      click: (
        e: LeafletMouseEvent,
        feature: BuildingsFeature<GeoJSON.Polygon>
      ): void => {
        console.log(
          'click on Shape, FUNCTION:',
          feature.properties.FUNCTION,
          feature,
          e
        );
        console.warn('----', feature.properties.NAME);
        //
        L.geoJSON(feature).addTo(this.map);
        L.popup()
          .setLatLng(e.latlng)
          .setContent(
            ` <b> NAME:</b> ${feature.properties.NAME}
            , OWNER: ${feature.properties.OWNER} 
           , FUNCTION: ${feature.properties.FUNCTION}
           , ID: ${feature.properties.ID}
           , BAG_ID: ${feature.properties.BAG_ID}`
          )
          .openOn(this.map);

        console.log('clicked on Shape', feature, e);
      },
      hover: (e: LeafletMouseEvent, feature: any) => {
        console.log(feature!.properties!.PERMITTER);
        console.log('hovered on Shape', feature, e);
      },
      data: await this.geoJsonService.Get(
        GeoJsonFileNameEnum.Buildings,
        true
      ) as BuildingsCollection<GeoJSON.Polygon>,
      border: true,

      color: (featureIndex: number, feature: any) => {
        let c = featureIndex / 10000;
        if (c > 1) console.log(c);
        return {
          r: c,
          g: 1 - c,
          b: c,
          a: 0.5,
        };
      },
    });

    //  const layerControl = L.control.layers(
    //     {},
    //   //  { 'building': ll },
    //     { collapsed: false }
    //   );
    //   layerControl.addTo(this.map);
    //   ll.addTo(this.map);
  }

  async btnPointsClicked() {
    let tt =await this.geoJsonService.Get(
      GeoJsonFileNameEnum.Adresses
    ) as AdressesCollection;
    //if (!tt) return;

    this._glify.points({
      map: this.map,
      size: (i: any) => {
        console.log(i);
        return 20;
      },
      color: (featureIndex: number, feature: AdressesFeature) => {
        return {
          r: (feature.properties.ENERGY_LABEL ?? 0) / 15,
          g: 1 - (feature.properties.ENERGY_LABEL ?? 0) / 25,
          b: 1 - (feature.properties.ENERGY_LABEL ?? 0) / 25,
        };
      },
      data: tt,
      hover: (e: LeafletMouseEvent, feature: AdressesFeature) => {
        console.log('hovered on Point', feature.geometry.coordinates, e);
      },

      click: (e: LeafletMouseEvent, feature: AdressesFeature) => {
        //set up a standalone popup (use a popup as a layer)
        L.popup()
          .setLatLng([e.latlng.lat, e.latlng.lng])
          .setContent(
            'You clicked on111:' +
              feature.properties.NAME +
              ' ENERGY_LABEL:' +
              feature.properties.ENERGY_LABEL ?? 'وجود ندارد'
          )
          .openOn(this.map);
        console.log(
          `You clicked the point at longitude:${e.latlng.lng}, latitude:${e.latlng.lat}`
        );

        console.log('clicked on Point', feature, e);
      },
    });
  }
  async InitMap() {
    // this._glify= (L as any).glify.longitudeFirst() as Glify
    glob.push(L);
    glob.push(this._glify);
    L.Icon.Default
    this.map = L.map(this.mapElem.nativeElement, {
      renderer: L.canvas(),
    }).setView([52.683745, 6.184144], 17);

    glob.push(this.map);
    glob.push(Markercluster);

    // layer = L.tileLayer('https://{s}.basemaps.cartocdn.com/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png'), {
    //   attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //   subdomains: 'abcd',
    //   maxZoom: 20,
    //   minZoom: 0
    // });

    let urls = [
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      'http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png',
      'http://{s}.sm.mapstack.stamen.com/(toner-background,$fff[difference],$fff[@23],$fff[hsl-saturation@20],toner-lines[destination-in])/{z}/{x}/{y}.png',
      'http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[hsl-saturation@20],mapbox-water[destination-out])[overlay]/{z}/{x}/{y}.png',
      'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
      'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
      'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
    ];
    
    const tiles = L.tileLayer(urls[0], {
      maxZoom: 25,
      attribution: 'link?',
    }).addTo(this.map);
  }
  title = 'GeoAppTest';

  rndP = (d = 30) =>
    [
      52.7 + (Math.random() - 0.5) / d,
      6.2 + (Math.random() - 0.5) / d,
    ] as L.LatLngExpression;

  async btnTestClicked() {
    console.log(
     ( await this.geoJsonService.Get(GeoJsonFileNameEnum.TygronSectionGeometry))
        ?.features
    );
    let map = this.map;
    var circle = L.circle(this.rndP(), {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 50,
    }).addTo(map);

    var polygon = L.polygon([this.rndP(), this.rndP(), this.rndP()]).addTo(map);

    var marker = L.marker(this.rndP()).addTo(map);
    marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
    circle.bindPopup('I am a circle.');
    polygon.bindPopup('I am a polygon.');

    var popup0 = L.popup()
      .setLatLng(this.rndP())
      .setContent('I am a standalone popup.')
      .openOn(map);

    var popup = L.popup();

    function onMapClick(e: any) {
      popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(map);
    }

    map.on('click', onMapClick);

    map.on('zoomend', (e) => {
      console.log('zoom ',e.sourceTarget?._zoom, e);
    });
    console.log('btnTestClicked');
  }

  // let data = this.geoJsonService.Get(GeoJsonFileNameEnum.Buildings);
  // console.log(data?.features.length);
  // L.geoJSON(data).addTo(this.map);

  // data = this.geoJsonService.Get(GeoJsonFileNameEnum.Neighborhoods);
  // console.log(data?.features.length);

  async btnTestBuildingClicked() {
    // let data = this.geoJsonService.Get(
    //   GeoJsonFileNameEnum.Buildings
    // ) as BuildingsCollection<GeoJSON.MultiPolygon>;

    // console.log(data?.features.length);
    // //  L.geoJSON(data).addTo(this.map);

    let data2 =await this.geoJsonService.Get(GeoJsonFileNameEnum.Neighborhoods) as NeighborhoodsCollection<GeoJSON.MultiPolygon>;
    
    let fid=2;
  //  data2.features= data2.features.filter(it=>it.properties.PARENT_ZONE==fid || it.properties.ID==fid);
   // (data2.features[0].geometry as any)['']
    console.log(data2?.features.length);
    L.geoJSON(data2).addTo(this.map);
  }
}

