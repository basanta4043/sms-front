import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceReportComponent } from './attendance-report.component';

describe('AttendanceReportComponent', () => {
  let component: AttendanceReportComponent;
  let fixture: ComponentFixture<AttendanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
