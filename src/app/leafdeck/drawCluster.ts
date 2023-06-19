import {
  AdressesCollection,
  AdressesFeatureProperties,
} from '../geojson.interfaces/Adresses';
import * as L from 'leaflet';
import { NetloadImportCollection, NetloadImportFeatureProperties } from '../geojson.interfaces/NetloadImport';

export class drawClusterRoofArea implements IRemovableLayers {
  constructor(private addreses: AdressesCollection, private map: L.Map) {
    this.Draw();
  }
  
  ///TODO  i have to convert FLOOR_SPACE_M2 in respect with  SLANTING_ROOF_HEIGHT ... sin ... 
public DestroyClusters(){
    if (this.LayersFloor.length > 0)
    this.LayersFloor.forEach((it: any) => {
      this.map.removeLayer(it as any);
    });
  this.LayersFloor = [];
}
  LayersFloor: any[] = [];
  private Draw() {
    this.DestroyClusters();

    let getMarkerClusterGroup_FLOOR_SPACE_M2 = () =>
      L.markerClusterGroup({
        maxClusterRadius: 100,
        iconCreateFunction: function (cluster) {
          var markers =
            cluster.getAllChildMarkers() as L.Marker<AdressesFeatureProperties>[];

          var sum = 0;
          var unKnown = 0;
          for (var i = 0; i < markers.length; i++) {
            if (!!markers[i].feature?.properties.FLOOR_SPACE_M2)
              sum +=                (markers[i].feature?.properties.FLOOR_SPACE_M2 as number) ?? 0;
            else unKnown++;
          }
          let countKnown = markers.length - unKnown;
          sum=Math.round(sum);
          let populationClassname = (pop: number) =>
            ' FLOOR_SPACE_M2 ' +
            'marker-cluster-' +
            (sum > 4000 ? 'large' : sum < 500 ? 'small' : 'medium');
          return L.divIcon({
            html: `
            <div class="leaflet-marker-icon marker-cluster ${populationClassname(
              sum
            )} leaflet-zoom-animated leaflet-interactive" 
            tabindex="0"  z-index: 247; opacity: 1;">
            <div><span title='sum of FLOOR_SPACE_M2:${sum}'>${sum}</span></div></div>`,

            className: 'mycluster_FLOOR_SPACE_M2',
            iconSize: L.point(40, 40),
          });
        },
        //Disable all of the defaults:
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true,
      });
    let markerClusterGroup1 = new L.MarkerClusterGroup();
    markerClusterGroup1 = getMarkerClusterGroup_FLOOR_SPACE_M2();

    let populate = async (addreses: AdressesCollection) => {
      addreses.features.forEach((t) => {
        let ll = new L.LatLng(
          t.geometry.coordinates[1],
          t.geometry.coordinates[0]
        );

        let markerOption: L.MarkerOptions = {
          icon: new L.DivIcon({
            html: `<div class='FLOOR_SPACE_M2_Marker'>${(
              t.properties.FLOOR_SPACE_M2 ?? 0
            ).toFixed(0)}<div/>`,
          }),
        };
        let m = new L.Marker<AdressesFeatureProperties>(ll, markerOption);

        m.feature = t;

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

    populate(this.addreses);
    this.map.addLayer(markerClusterGroup1);
    this.LayersFloor.push(markerClusterGroup1);
  }
}


export class DrawCluster_INHABITANTS implements IRemovableLayers{
    constructor(private addreses: AdressesCollection, private map: L.Map) {
        this.Draw()
    }

LayersCluster: any[] = [];

public DestroyClusters(){
    if (this.LayersCluster.length > 0)
    this.LayersCluster.forEach((it: any) => {
      this.map.removeLayer(it as any);
    });
  this.LayersCluster = [];
}
 private Draw() {
  this.DestroyClusters();
  let getMarkerClusterGroup_INHABITANTS = () =>
    L.markerClusterGroup({
      maxClusterRadius: 100,
      iconCreateFunction: function (cluster) {
        var markers =
          cluster.getAllChildMarkers() as L.Marker<AdressesFeatureProperties>[];

        var sum = 0;
        var unKnown = 0;
        for (var i = 0; i < markers.length; i++) {
          if (!!markers[i].feature?.properties.INHABITANTS)
            sum += (markers[i].feature?.properties.INHABITANTS as number) ?? 0;
          else unKnown++;
        }
        let countKnown = markers.length - unKnown;
        sum=Math.round(sum);
        let populationClassname = (pop: number) =>
          ' INHABITANTS marker-cluster-' +
          (sum > 1000 ? 'large' : sum < 100 ? 'small' : 'medium');
        return L.divIcon({
          html: `
        <div class="leaflet-marker-icon marker-cluster ${populationClassname(
          sum
        )} leaflet-zoom-animated leaflet-interactive" 
        tabindex="0"  z-index: 247; opacity: 1;">
        <div><span title='sum of population:${sum}'>${sum}</span></div></div>`,

          className: 'mycluster_INHABITANTS',
          iconSize: L.point(40, 40),
        });
      },
      //Disable all of the defaults:
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
    });
  let markerClusterGroup1 = new L.MarkerClusterGroup();
  markerClusterGroup1 = getMarkerClusterGroup_INHABITANTS();


  let populate = async (addreses: AdressesCollection) => {
    addreses.features.forEach((t) => {
      let ll = new L.LatLng(
        t.geometry.coordinates[1],
        t.geometry.coordinates[0]
      );

      let markerOption: L.MarkerOptions = {
        icon: new L.DivIcon({
          html: `<div class="INHABITANTS_Marker">${(
            t.properties.INHABITANTS ?? 0
          ).toFixed(2)}<div/>`,
        }),
      };
      let m = new L.Marker<AdressesFeatureProperties>(ll, markerOption);

      m.feature = t;

      // markersList.push(m);
      markerClusterGroup1.addLayer(m);
    });
  };

  

  populate(this.addreses);
  this.map.addLayer(markerClusterGroup1);
  this.LayersCluster.push(markerClusterGroup1);
}}


export class DrawCluster_Netload_KWH implements IRemovableLayers{
  constructor(private netload: NetloadImportCollection, private map: L.Map) {
      this.Draw()
  }

LayersCluster: any[] = [];

public DestroyClusters(){
  if (this.LayersCluster.length > 0)
  this.LayersCluster.forEach((it: any) => {
    this.map.removeLayer(it as any);
  });
this.LayersCluster = [];
}
private Draw() {
this.DestroyClusters();
let getMarkerClusterGroup_INHABITANTS = () =>
  L.markerClusterGroup({
    maxClusterRadius: 100,
    iconCreateFunction: function (cluster) {
      var markers =
        cluster.getAllChildMarkers() as L.Marker<NetloadImportFeatureProperties>[];

      var sum = 0;
      var unKnown = 0;
      for (var i = 0; i < markers.length; i++) {
        if (!!markers[i].feature?.properties.VERBRUIK_KWH)
          sum += (markers[i].feature?.properties.VERBRUIK_KWH as number) ?? 0;
        else unKnown++;
      }
      let countKnown = markers.length - unKnown;
      sum=Math.round(sum);
      let populationClassname = (pop: number) =>
        ' Netload_KWH marker-cluster-' +
        (sum > 50005 ? 'large' : sum < 10000 ? 'small' : 'medium');
      return L.divIcon({
        html: `
      <div class="leaflet-marker-icon marker-cluster ${populationClassname(
        sum
      )} leaflet-zoom-animated leaflet-interactive" 
      tabindex="0"  z-index: 247; opacity: 1;">
      <div><span title='sum of consumption (VERBRUIK_KWH):${sum}'>${sum}</span></div></div>`,

        className: 'mycluster_Netload_KWH',
        iconSize: L.point(40, 40),
      });
    },
    //Disable all of the defaults:
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
  });
let markerClusterGroup1 = new L.MarkerClusterGroup();
markerClusterGroup1 = getMarkerClusterGroup_INHABITANTS();


let populate = async (netload: NetloadImportCollection) => {
  netload.features.forEach((t) => {
    let ll = new L.LatLng(
      t.geometry.coordinates[1],
      t.geometry.coordinates[0]
    );

    let markerOption: L.MarkerOptions = {
      icon: new L.DivIcon({
        html: `<div class="Netload_KWH_Marker">${(
          t.properties.VERBRUIK_KWH ?? 0
        ).toFixed(0)}<div/>`,
      }),
    };
    let m = new L.Marker<NetloadImportFeatureProperties>(ll, markerOption);

    m.feature = t;

    // markersList.push(m);
    markerClusterGroup1.addLayer(m);
  });
};



populate(this.netload);
this.map.addLayer(markerClusterGroup1);
this.LayersCluster.push(markerClusterGroup1);
}}

export class DrawCluster_Netload_M3 implements IRemovableLayers{
  constructor(private netload: NetloadImportCollection, private map: L.Map) {
      this.Draw()
  }

LayersCluster: any[] = [];

public DestroyClusters(){
  if (this.LayersCluster.length > 0)
  this.LayersCluster.forEach((it: any) => {
    this.map.removeLayer(it as any);
  });
this.LayersCluster = [];
}
private Draw() {
this.DestroyClusters();
let getMarkerClusterGroup_INHABITANTS = () =>
  L.markerClusterGroup({
    maxClusterRadius: 100,
    iconCreateFunction: function (cluster) {
      var markers =
        cluster.getAllChildMarkers() as L.Marker<NetloadImportFeatureProperties>[];

      var sum = 0;
      var unKnown = 0;
      for (var i = 0; i < markers.length; i++) {
        if (!!markers[i].feature?.properties.VERBRUIK_M3)
          sum += (markers[i].feature?.properties.VERBRUIK_M3 as number) ?? 0;
        else unKnown++;
      }
      let countKnown = markers.length - unKnown;
      sum=Math.round(sum);
      let populationClassname = (pop: number) =>
        ' Netload_M3 marker-cluster-' +
        (sum > 50005 ? 'large' : sum < 10000 ? 'small' : 'medium');
      return L.divIcon({
        html: `
      <div class="leaflet-marker-icon marker-cluster ${populationClassname(
        sum
      )} leaflet-zoom-animated leaflet-interactive" 
      tabindex="0"  z-index: 247; opacity: 1;">
      <div><span title='sum of consumption (VERBRUIK_M3):${sum}'>${sum}</span></div></div>`,

        className: 'mycluster_Netload_M3',
        iconSize: L.point(40, 40),
      });
    },
    //Disable all of the defaults:
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
  });
let markerClusterGroup1 = new L.MarkerClusterGroup();
markerClusterGroup1 = getMarkerClusterGroup_INHABITANTS();


let populate = async (netload: NetloadImportCollection) => {
  netload.features.forEach((t) => {
    let ll = new L.LatLng(
      t.geometry.coordinates[1],
      t.geometry.coordinates[0]
    );

    let markerOption: L.MarkerOptions = {
      icon: new L.DivIcon({
        html: `<div class="Netload_M3_Marker">${(
          t.properties.VERBRUIK_M3 ?? 0
        ).toFixed(0)}<div/>`,
      }),
    };
    let m = new L.Marker<NetloadImportFeatureProperties>(ll, markerOption);

    m.feature = t;

    // markersList.push(m);
    markerClusterGroup1.addLayer(m);
  });
};



populate(this.netload);
this.map.addLayer(markerClusterGroup1);
this.LayersCluster.push(markerClusterGroup1);
}}

export interface IRemovableLayers{
    /**
     *  
     */
       DestroyClusters() :void
}