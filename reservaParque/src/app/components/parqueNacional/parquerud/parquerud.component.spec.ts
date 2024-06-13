import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParquerudComponent } from './parquerud.component';

describe('ParquerudComponent', () => {
  let component: ParquerudComponent;
  let fixture: ComponentFixture<ParquerudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParquerudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParquerudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
