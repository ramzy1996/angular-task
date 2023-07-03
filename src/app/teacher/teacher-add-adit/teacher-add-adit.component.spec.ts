import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddAditComponent } from './teacher-add-adit.component';

describe('TeacherAddAditComponent', () => {
  let component: TeacherAddAditComponent;
  let fixture: ComponentFixture<TeacherAddAditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAddAditComponent]
    });
    fixture = TestBed.createComponent(TeacherAddAditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
