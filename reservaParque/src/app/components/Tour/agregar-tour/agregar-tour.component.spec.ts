import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTourComponent } from './agregar-tour.component';

describe('AgregarTourComponent', () => {
  let component: AgregarTourComponent;
  let fixture: ComponentFixture<AgregarTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
