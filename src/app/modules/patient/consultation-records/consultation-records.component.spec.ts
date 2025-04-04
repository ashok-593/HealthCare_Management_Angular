import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationRecordsComponent } from './consultation-records.component';

describe('ConsultationRecordsComponent', () => {
  let component: ConsultationRecordsComponent;
  let fixture: ComponentFixture<ConsultationRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
