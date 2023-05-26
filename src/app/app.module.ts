import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './views/chart/chart.component';
import { LeafdeckComponent } from './leafdeck/leafdeck.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './Layout/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashComponent } from './Layout/dash/dash.component';
import { StickyHeaderComponent } from './Layout/sticky-header.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

import { mapApiReducer } from './state/map.reducer';
import { ChartComponent2 } from './views/chart2/chart.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule } from '@angular/forms';
import { RegionTreeComponent } from './region-tree/region-tree.component';
import { SideViewsComponent } from './leafdeck/side-views/side-views.component';
import { ShowWhatSettingComponent } from './leafdeck/side-views/show-what-setting/show-what-setting.component';
import { TblElectricityComponent } from './views/tbl-electricity/tbl-electricity.component';
import { TblgasComponent } from './views/tbl-gas/tbl-gas.component';
import { TruncatePipe } from './truncate.pipe';
import { PiechartComponent } from './views/building-functions/building-functions.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartComponent2,
    LeafdeckComponent,
    NavComponent,
    DashComponent,
    StickyHeaderComponent,
    RegionTreeComponent,
    SideViewsComponent,
    ShowWhatSettingComponent,
    TblElectricityComponent,
    TblgasComponent,
    TruncatePipe,
    PiechartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularMaterialModule,
    FormsModule,
    //   StoreModule.forRoot(reducers, {  metaReducers })
    StoreModule.forRoot({ appMapSate: mapApiReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
 
})
export class AppModule {}
