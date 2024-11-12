import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerParquesComponent } from './ver-parques.component';

describe('VerParquesComponent', () => {
  let component: VerParquesComponent;
  let fixture: ComponentFixture<VerParquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerParquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerParquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
