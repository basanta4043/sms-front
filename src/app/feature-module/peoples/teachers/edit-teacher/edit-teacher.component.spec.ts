import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeacherComponent } from './edit-teacher.component';

describe('EditTeacherComponent', () => {
  let component: EditTeacherComponent;
  let fixture: ComponentFixture<EditTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
