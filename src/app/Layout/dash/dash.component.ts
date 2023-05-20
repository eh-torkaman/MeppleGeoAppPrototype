import { Component } from '@angular/core';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {
  trackElement(index: number, element: any) {
    return element ? element.title : null
  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe([Breakpoints.XSmall,Breakpoints.Small,Breakpoints.Medium]).pipe(
    tap(rs=>{if (rs.matches) console.log(Breakpoints,'breakpointObserver',rs.breakpoints,rs)}),
    map(({ matches }) =>matches),
    distinctUntilChanged(),
    map((matches ) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 2 },
          { title: 'Card 2', cols: 2, rows: 2 },
        //  { title: 'Card 3', cols: 1, rows: 1 },
        //  { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 2 },
        { title: 'Card 2', cols: 1, rows: 2 },
       { title: 'Card 3', cols: 1, rows: 2 },
      //  { title: 'Card 4', cols: 1, rows: 2 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
