// some issue with the behaivour...

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  tap,
  throttleTime,
} from 'rxjs/operators';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden',
}

enum Direction {
  Up = 'Up',
  Down = 'Down',
  Still='Still'
}

@Component({
  selector: 'app-sticky-header',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        top: 0;
        width: 100%;
        position:relative;
        top: -200px;
        padding-top: 200px;
      
      }
    `,
  ],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 1, transform: 'translateY(-100%)'   })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)'   })
      ),
      transition('* => *', animate('200ms ease-in')),
    ]),
  ],
})
export class StickyHeaderComponent implements AfterViewInit {
  private isVisible = true;
  //migh be null
  @Input() source!: CdkScrollable | ElementRef;
  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  ngAfterViewInit() {
    if (!this.source) {
      console.error('StickyHeaderComponent => no source yet  ');
      return;
    }

    let elem: ElementRef<HTMLElement>;
    if ('nativeElement' in this.source) elem = this.source.nativeElement;
    else if ('getElementRef' in this.source) elem = this.source.getElementRef();
    else {
      console.error(
        'StickyHeaderComponent => no  ElementRef<HTMLElement> for source  ',
        this.source
      );
      return;
    }

    
    const scroll$ = fromEvent(elem.nativeElement, 'scroll').pipe(
   //   tap((e:Event) => console.log('tap scrol', e)),
      throttleTime(50),
      map(() => elem.nativeElement.scrollTop),
      pairwise(),
      tap(rs=>console.log(rs)),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : (y2 > y1? Direction.Down:Direction.Still))),
      distinctUntilChanged(),
      share()
    );

    const goingUp$ = scroll$.pipe(
      filter((direction) => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter((direction) => direction === Direction.Down)
    );

    goingUp$.subscribe((x) => {
     // this.isVisible = true;
      console.log('goingUp',x);
    });
    goingDown$.subscribe((x) => {
    //  this.isVisible = false;
      console.log('goingDown',x);
    });

    console.log('vew inited', goingUp$), scroll$;
  }
}
