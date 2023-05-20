import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './Layout/dash/dash.component';
import { LeafdeckComponent } from './leafdeck/leafdeck.component';
import { MainmapComponent } from './mainmap/mainmap.component';

const routes: Routes = [{ path: 'dashboard', component: DashComponent },
{ path: 'MainMap', component: MainmapComponent },
{ path: '', component: LeafdeckComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
