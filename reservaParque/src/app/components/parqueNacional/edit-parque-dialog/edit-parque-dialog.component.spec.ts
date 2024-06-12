import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParqueDialogComponent } from './edit-parque-dialog.component';

describe('EditParqueDialogComponent', () => {
  let component: EditParqueDialogComponent;
  let fixture: ComponentFixture<EditParqueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditParqueDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditParqueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
