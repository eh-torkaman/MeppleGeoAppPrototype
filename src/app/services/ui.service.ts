import { Component, Injectable, InjectionToken, Injector, Input } from '@angular/core';

//cdk
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import {MatProgressSpinner, ProgressSpinnerMode} from '@angular/material/progress-spinner';

//rxjs
import { Observable, Subject } from 'rxjs'
import { mapTo, scan, map, mergeMap } from 'rxjs/operators'
import { ThemePalette } from '@angular/material/core';

@Injectable({
    providedIn: 'root',
})
export class UiService {

    private spinnerTopRef = this.cdkSpinnerCreate();

    spin$ :Subject<boolean> = new Subject()

    constructor(
        private overlay: Overlay,
       
    ) {

      this.spin$
        .asObservable()
        .pipe(
          map(val => val ? 1 : -1 ),
          scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
        )
        .subscribe(
          (res) => {
            if(res === 1){ this.showSpinner() }
            else if( res == 0 ){ 
              this.spinnerTopRef.hasAttached() ? this.stopSpinner(): null;
            }
          }
        )
    }

    private cdkSpinnerCreate() {
        return this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'dark-backdrop',
            positionStrategy: this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically()
        })
    }

    private showSpinner(){
      console.log("attach")
     let cref= this.spinnerTopRef.attach(new ComponentPortal(MatProgressSpinner));
     cref.setInput('mode','indeterminate')
     cref.setInput('color','warn')
    }

    private stopSpinner(){
      console.log("dispose")
      this.spinnerTopRef.detach() ;
    }
   
}
