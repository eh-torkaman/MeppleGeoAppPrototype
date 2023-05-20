import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideViewsComponent } from './side-views.component';

describe('SideViewsComponent', () => {
  let component: SideViewsComponent;
  let fixture: ComponentFixture<SideViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideViewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
