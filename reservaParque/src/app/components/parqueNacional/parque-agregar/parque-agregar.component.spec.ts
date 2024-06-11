import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueAgregarComponent } from './parque-agregar.component';

describe('ParqueAgregarComponent', () => {
  let component: ParqueAgregarComponent;
  let fixture: ComponentFixture<ParqueAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParqueAgregarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParqueAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
