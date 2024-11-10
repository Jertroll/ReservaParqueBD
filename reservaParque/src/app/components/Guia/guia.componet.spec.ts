import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiaComponent } from './guia.componet';
import { RouterOutlet, RouterLink } from '@angular/router';

describe('GuiaComponent', () => {
  let component: GuiaComponent;
  let fixture: ComponentFixture<GuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});