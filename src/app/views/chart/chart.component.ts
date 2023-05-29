import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as echarts from 'echarts';
import { debounceTime, filter, takeWhile, tap } from 'rxjs';

import * as mapSelectors from '../../state/map.selectors';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  componentActive=true;
  ngOnDestroy(): void {
    this.componentActive = false;
  }
  @ViewChild('chartElem') chart!: ElementRef<HTMLInputElement>;
  constructor( private store: Store) {}
  
  Adresses$ = this.store.select(mapSelectors.selectAdresses).pipe(
    filter((it) => !!it),
    debounceTime(100)
  );
  Buildings$ = this.store.select(mapSelectors.selectBuildings).pipe(
    filter((it) => !!it),
    debounceTime(150)
  );
  Neighborhoods$ = this.store.select(mapSelectors.selectNeighborhoods).pipe(
    tap((rs) => console.log('Neighborhoods length', rs?.features.length)),
    debounceTime(180),
    filter((it) => !!it)
  );
  NetloadImport$ = this.store.select(mapSelectors.selectNetloadImport).pipe(
    filter((it) => !!it),
    debounceTime(95)
  );
  TygronSectionGeometry$ = this.store
    .select(mapSelectors.selectTygronSectionGeometry)
    .pipe(
      filter((it) => !!it),
      debounceTime(235)
    );

  ngOnInit(): void {

    this.Adresses$.pipe(takeWhile(_=>this.componentActive)).subscribe(rs=>{

    }


    );
  }

  ngAfterViewInit() {
    this.prepareCharts();
  }
  
  prepareCharts() {
    var myChart = echarts.init(this.chart.nativeElement);
    console.log('myChart', myChart);
    myChart.setOption({
      title: {
        text: 'ECharts Getting Started Example',
      },
      tooltip: {},
      xAxis: {
        data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks'],
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  }
}
