import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
  MatTableModule,
} from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map, takeWhile } from 'rxjs';
import { RoadLineFeatureProperties } from 'src/app/geojson.interfaces/road_line';
import { selectRoadLineWithConsumptions } from 'src/app/state/map.selectors';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-tbl-electricity',
  templateUrl: './tbl-electricity.component.html',
  styleUrls: ['./tbl-electricity.component.scss'],
})
export class TblElectricityComponent implements AfterViewInit, OnDestroy {
  componentActive = true;
  ngOnDestroy(): void {
    this.componentActive = false;
  }
  displayedColumns: string[] = ['name', 'sum_VERBRUIK_KWH', 'avg_VERBRUIK_KWH'];
  dataSource = new MatTableDataSource<
    RoadLineFeatureProperties,
    MatTableDataSourcePaginator
  >();

  constructor(private _liveAnnouncer: LiveAnnouncer, private store: Store) {}
  roadLineWithConsumptions$ = this.store
    .select(selectRoadLineWithConsumptions)
    .pipe(
      map((it) =>
        it?.features.filter(
          (f) =>
            f.properties.sum_VERBRUIK_KWH && f.properties.sum_VERBRUIK_KWH > 0
        )
      )
    );
  @ViewChild(MatSort) sort!: MatSort;
  noData = true;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.roadLineWithConsumptions$
      .pipe(takeWhile((_) => this.componentActive))
      .subscribe((ds) => {
        if (!ds) return;
        this.noData = false;
        let ds2 = ds.map((it) => ({
          ...it.properties,
          name: (it.properties.name ?? '') + ` (id:${it.id})`,
          id: it.id,
        }));
        this.dataSource = new MatTableDataSource(
          JSON.parse(JSON.stringify(ds2))
        );
        this.dataSource.sort = this.sort;
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
