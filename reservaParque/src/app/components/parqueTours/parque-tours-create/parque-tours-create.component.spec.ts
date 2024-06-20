import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ParqueToursComponent} from './parque-tours-create.component'

describe('ParqueToursCreateComponent', () => {
  let component: ParqueToursComponent;
  let fixture: ComponentFixture<ParqueToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParqueToursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParqueToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
