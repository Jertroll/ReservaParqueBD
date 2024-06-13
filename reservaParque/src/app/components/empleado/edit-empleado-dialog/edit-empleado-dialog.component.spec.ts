import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmpleadoDialogComponent } from './edit-empleado-dialog.component';

describe('EditEmpleadoDialogComponent', () => {
  let component: EditEmpleadoDialogComponent;
  let fixture: ComponentFixture<EditEmpleadoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmpleadoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmpleadoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
