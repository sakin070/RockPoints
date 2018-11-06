import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPointsComponent } from './view-points.component';

describe('ViewPointsComponent', () => {
  let component: ViewPointsComponent;
  let fixture: ComponentFixture<ViewPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
