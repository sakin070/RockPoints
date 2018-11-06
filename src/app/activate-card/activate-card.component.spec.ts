import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateCardComponent } from './activate-card.component';

describe('ActivateCardComponent', () => {
  let component: ActivateCardComponent;
  let fixture: ComponentFixture<ActivateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
