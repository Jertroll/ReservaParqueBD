import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursParqueComponent } from './tours-parque.component';

describe('ToursParqueComponent', () => {
  let component: ToursParqueComponent;
  let fixture: ComponentFixture<ToursParqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToursParqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToursParqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
