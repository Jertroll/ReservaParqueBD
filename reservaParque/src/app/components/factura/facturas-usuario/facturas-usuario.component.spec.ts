import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasUsuarioComponent } from './facturas-usuario.component';

describe('FacturasUsuarioComponent', () => {
  let component: FacturasUsuarioComponent;
  let fixture: ComponentFixture<FacturasUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturasUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
