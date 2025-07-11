import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasComponent } from './rutas.component';

describe('RutasComponent', () => {
  let component: RutasComponent;
  let fixture: ComponentFixture<RutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
