import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomAddAditComponent } from './classroom-add-adit.component';

describe('ClassroomAddAditComponent', () => {
  let component: ClassroomAddAditComponent;
  let fixture: ComponentFixture<ClassroomAddAditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomAddAditComponent]
    });
    fixture = TestBed.createComponent(ClassroomAddAditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
