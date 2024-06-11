import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTourComponent } from './crud-tour.component';

describe('CrudTourComponent', () => {
  let component: CrudTourComponent;
  let fixture: ComponentFixture<CrudTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
