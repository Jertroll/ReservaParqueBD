import { ComponentFixture, TestBed } from '@angular/core/testing';

import { visReservasComponent } from './visReservas.component';

describe('visReservasComponent', () => {
  let component: visReservasComponent;
  let fixture: ComponentFixture<visReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [visReservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(visReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});