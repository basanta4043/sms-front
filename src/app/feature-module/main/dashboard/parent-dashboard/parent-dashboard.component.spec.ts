import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentDashboardComponent } from './parent-dashboard.component';

describe('ParentDashboardComponent', () => {
  let component: ParentDashboardComponent;
  let fixture: ComponentFixture<ParentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
