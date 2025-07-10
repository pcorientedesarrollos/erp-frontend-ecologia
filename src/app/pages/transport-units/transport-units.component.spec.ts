import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportUnitsComponent } from './transport-units.component';

describe('TransportUnitsComponent', () => {
  let component: TransportUnitsComponent;
  let fixture: ComponentFixture<TransportUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportUnitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
