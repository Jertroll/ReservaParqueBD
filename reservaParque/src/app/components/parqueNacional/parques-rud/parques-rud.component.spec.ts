import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParquesRUDComponent } from './parques-rud.component';

describe('ParquesRUDComponent', () => {
  let component: ParquesRUDComponent;
  let fixture: ComponentFixture<ParquesRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParquesRUDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParquesRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
