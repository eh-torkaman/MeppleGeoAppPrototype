import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as mapSelectors from '../../../state/map.selectors';
import { debounceTime, filter, take } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { LayersSetting } from 'src/app/state/map.reducer';
import { MapSettingActions } from 'src/app/state/map.actions';
@Component({
  selector: 'app-show-what-setting',
  templateUrl: './show-what-setting.component.html',
  styleUrls: ['./show-what-setting.component.scss'],
})
export class ShowWhatSettingComponent implements OnInit {
  setting$ = this.store.select(mapSelectors.selectLayersSetting);
  constructor(private store: Store) {
    this.setting$.subscribe((rs) => {
      this.layersSetting = {...rs};
    });
  }
  layersSetting!: LayersSetting;
  ngOnInit(): void {}

  
  onChangCheckBox(key:string, visible: boolean) {
    let  layersSetting= { ...this.layersSetting  };
    layersSetting[key]=visible
    this.store.dispatch(  MapSettingActions.toggleClustesrs({
        layersSetting,
      })
    );
  }
  
}
