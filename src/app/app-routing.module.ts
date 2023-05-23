import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeafdeckComponent } from './leafdeck/leafdeck.component';
import { MainmapComponent } from './mainmap/mainmap.component';
import { DashComponent } from './Layout/dash/dash.component';

const routes: Routes = [{ path: 'dashboard', component: DashComponent },
{ path: 'MainMap', component: MainmapComponent },
{ path: '', component: LeafdeckComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
