import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoUpComponent } from './empleadoup.component';

describe('EmpleadoupComponent', () => {
  let component: EmpleadoUpComponent;
  let fixture: ComponentFixture<EmpleadoUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
