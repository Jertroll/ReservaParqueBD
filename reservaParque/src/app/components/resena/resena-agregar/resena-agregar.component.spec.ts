import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaAgregarComponent } from './resena-agregar.component';

describe('ResenaAgregarComponent', () => {
  let component: ResenaAgregarComponent;
  let fixture: ComponentFixture<ResenaAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenaAgregarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResenaAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
