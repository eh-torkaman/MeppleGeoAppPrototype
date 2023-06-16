import { EChartsOption } from 'echarts';

import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as echarts from 'echarts';
import { debounceTime, filter, tap } from 'rxjs';

import * as mapSelectors from '../../state/map.selectors';
import { BuildingFunction } from 'src/app/geojson.interfaces/Buildings';
@Component({
  selector: 'app-building-build-year',
  templateUrl: './building-build-year.component.html',
  styleUrls: ['./building-build-year.component.scss'],
})
export class BuildingBuildYearComponent implements OnInit, AfterViewInit {
  @Input() showLegend=false;
  @ViewChild('chartElem') chart!: ElementRef<HTMLInputElement>;
  constructor(private store: Store) {}

  Adresses$ = this.store.select(mapSelectors.selectAdresses).pipe(
    filter((it) => !!it),
    debounceTime(100)
  );
  Buildings$ = this.store.select(mapSelectors.selectBuildings).pipe(
    filter((it) => !!it),
    debounceTime(150)
  );
  Neighborhoods$ = this.store.select(mapSelectors.selectNeighborhoods).pipe(
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

  seriesOption: echarts.PieSeriesOption = {
    name: 'buildig by construction year',
    type: 'pie',
    selectedMode: 'single',
    // radius: [0, '30%'],
      //  label: {
      //     formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
      //     backgroundColor: '#F6F8FC',
      //     borderColor: '#8C8D8E',
      //     borderWidth: 1,
      //     borderRadius: 4,
      //     rich: {
      //       a: {
      //         color: '#F00',
      //         lineHeight: 22,
      //         align: 'center',
      //       },
      //       hr: {
      //         borderColor: '#0F0',
      //         width: '100%',
      //         borderWidth: 1,
      //         height: 0,
      //       },
      //       b: {
      //         color: '#4C5058',
      //         fontSize: 14,
      //         fontWeight: 'bold',
      //         lineHeight: 33,
      //       },
      //       per: {
      //         color: '#fff',
      //         backgroundColor: '#4C5058',
      //         padding: [3, 4],
      //         borderRadius: 4,
      //       },
      //     },},
    labelLine: {
      show: false,
    },
    data: [
    ],
  };
  ngOnInit(): void {
     let years:[number,number][]=[[2010,2030],[1990,2010],[1970,1990],[1950,1970],[1800,1950],[1750,1800],[0,1750]]
    this.Buildings$.subscribe((rs) => {
      if (!rs) return;
      this.legends=[];
      this.seriesOption.data=[];
     // rs.features.map((it) => it.properties.__TygronSectionGeometryFeatureProperties?.bouwjaar);

      let recuded = rs.features.reduce((pv, cv, cix) => {
        if (cv.properties.__TygronSectionGeometryFeatureProperties){

 let bouwjaarToStr=(bouwjaar:number)=>{ 
  try{
  let range= years.filter(it=> bouwjaar >=it[0] && it[1]>bouwjaar)[0]; return `between ${range[0]} and  ${range[1]}`;
} catch ( ex){
console.warn(bouwjaar,ex)
  return "---";
}
}

        if (pv[bouwjaarToStr(cv.properties.__TygronSectionGeometryFeatureProperties.bouwjaar)]) pv[bouwjaarToStr(cv.properties.__TygronSectionGeometryFeatureProperties.bouwjaar)]++;
        else pv[bouwjaarToStr(cv.properties.__TygronSectionGeometryFeatureProperties.bouwjaar)] = 1;
        }
        return pv;
      }, {} as { [buildYear: string]: number });

      let tmpData: { value: number; name: string }[] = [];

      for (let k in recuded) tmpData.push({ value: recuded[k], name: k });

      let sumT = tmpData.reduce((acc, it) => (acc = acc + it.value), 1);

      let otherKey='_Other_:\n'.toLocaleLowerCase()
      let tmpData2: { value: number; name: string }[] = [];
      tmpData.forEach((it, ix) => {
        // if (it.value / sumT < 0.01) {
        //   let othersIt = tmpData2.find((it) =>
        //     it.name.toLocaleLowerCase().startsWith(otherKey)
        //   );
        //   if (othersIt) {
        //     othersIt.value += it.value;
        //     othersIt.name += '\n' + it.name;
        //   } else tmpData2.push({ value: it.value, name: otherKey + it.name });
        // } else
         {
          tmpData2.push(it);
        }
      });
      tmpData2.sort((a, b) => a.value - b.value);
      
      tmpData2.forEach((it, ix) => {
        if (!it.name.toLocaleLowerCase().startsWith(otherKey))
        this.legends.push(it.name);
      });

      this.seriesOption.data = tmpData2;
      if (this.showLegend) 
      this.option.legend= { data: this.legends,textStyle:{color:'white'}};
      this.prepareCharts();
    });
  }
  legends: string[] = [];
  option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
  legend: { data: this.legends },
    series: [
      this.seriesOption,
      // {
      //   name: 'Access From',
      //   type: 'pie',
      //   radius: ['45%', '60%'],
      //   labelLine: {
      //     length: 30,
      //   },
      //   label: {
      //     formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
      //     backgroundColor: '#F6F8FC',
      //     borderColor: '#8C8D8E',
      //     borderWidth: 1,
      //     borderRadius: 4,

      //     rich: {
      //       a: {
      //         color: '#F00',
      //         lineHeight: 22,
      //         align: 'center',
      //       },
      //       hr: {
      //         borderColor: '#0F0',
      //         width: '100%',
      //         borderWidth: 1,
      //         height: 0,
      //       },
      //       b: {
      //         color: '#4C5058',
      //         fontSize: 14,
      //         fontWeight: 'bold',
      //         lineHeight: 33,
      //       },
      //       per: {
      //         color: '#fff',
      //         backgroundColor: '#4C5058',
      //         padding: [3, 4],
      //         borderRadius: 4,
      //       },
      //     },
      //   },
      //   data: [
      //     { value: 1048, name: 'Baidu' },
      //     { value: 335, name: 'Direct' },
      //     { value: 310, name: 'Email' },
      //     { value: 251, name: 'Google' },
      //     { value: 234, name: 'Union Ads' },
      //     { value: 147, name: 'Bing' },
      //     { value: 135, name: 'Video Ads' },
      //     { value: 102, name: 'Others' },
      //   ],
      // },
    ],
  };
  ngAfterViewInit() {
    //  this.prepareCharts();
  }
  myChart?:echarts.EChartsType

  prepareCharts() {
    if (!this.myChart)
    this.myChart = echarts.init(this.chart.nativeElement);
    this.myChart.setOption(this.option as any);
  }
}
