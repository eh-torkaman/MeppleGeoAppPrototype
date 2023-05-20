import { Component, OnInit } from '@angular/core';
import { GeoJsonsService } from './services/geo-jsons.service';
import { MapApiActions } from './state/map.actions';
import { Store } from '@ngrx/store';
import {
  MultiPolygon,
  Polygon,
  booleanPointInPolygon,
  featureCollection,
  point,
  polygon,
} from '@turf/turf';
import { UiService } from './services/ui.service';

declare const glob: any[];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private geoJsonService: GeoJsonsService, private store: Store,private ui : UiService) {

    //
  }

  async ngOnInit() {
    glob.push(booleanPointInPolygon);
    this.ui.spin$.next(true);
    this.geoJsonService.GetDataSource().subscribe((datasource) => {
      this.ui.spin$.next(false);
      this.store.dispatch(MapApiActions.retrievedGeojsonData({ datasource }));
    });
 
 
  
    
 
 
  }
}
