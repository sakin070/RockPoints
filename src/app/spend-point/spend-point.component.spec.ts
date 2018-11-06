import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendPointComponent } from './spend-point.component';

describe('SpendPointComponent', () => {
  let component: SpendPointComponent;
  let fixture: ComponentFixture<SpendPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
