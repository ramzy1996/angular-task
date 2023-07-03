import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SubjectComponent } from './subject/subject.component';
import { AllocateSubjectComponent } from './allocate-subject/allocate-subject.component';
import { AllocateClassroomComponent } from './allocate-classroom/allocate-classroom.component';
import { StudentReportComponent } from './student-report/student-report.component';

const routes: Routes = [
    { path: '', redirectTo: 'student', pathMatch: 'full' },
    { path: 'student', component: StudentComponent },
    { path: 'classroom', component: ClassroomComponent },
    { path: 'teacher', component: TeacherComponent },
    { path: 'subject', component: SubjectComponent },
    { path: 'allocate-subject', component: AllocateSubjectComponent },
    { path: 'allocate-classroom', component: AllocateClassroomComponent },
    { path: 'student-report', component: StudentReportComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
