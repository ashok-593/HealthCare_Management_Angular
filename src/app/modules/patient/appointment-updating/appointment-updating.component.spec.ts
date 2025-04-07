import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentUpdatingComponent } from './appointment-updating.component';

describe('AppointmentUpdatingComponent', () => {
  let component: AppointmentUpdatingComponent;
  let fixture: ComponentFixture<AppointmentUpdatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentUpdatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentUpdatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
