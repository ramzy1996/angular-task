import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
    selector: 'app-student-add-edit',
    templateUrl: './student-add-edit.component.html',
    styleUrls: ['./student-add-edit.component.scss']
})
export class StudentAddEditComponent implements OnInit {
    selectedDate: any;
    studentForm: FormGroup;
    age = 0
    classroom: any[] = []
    constructor(
        private _studentForm: FormBuilder,
        private _stdService: StudentsService,
        private _dialogRef: MatDialogRef<StudentAddEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _coreService: CoreService
    ) {
        // console.log(this.dateOfBirthControl.value)
        this.selectedDate = data === null ? null : data.dateOfBirth
        this.studentForm = _studentForm.group({
            fname: new FormControl(null, [Validators.required]),
            lname: new FormControl(null, [Validators.required]),
            contactPerson: new FormControl(null, [Validators.required]),
            contactNo: new FormControl(null, [Validators.required]),
            emailId: new FormControl(null, [Validators.required, Validators.email]),
            dateOfBirth: new FormControl(null, [Validators.required]),
            age: new FormControl(null, [Validators.required, Validators.min(1)]),
            classroomId: new FormControl(null, [Validators.required]),
        })

    }
    ngOnInit(): void {
        this.studentForm.patchValue(this.data)
        this.getClassroomList()
    }

    calculateAge(selectedDate: Date): number {
        const today = new Date();
        const birthDate = new Date(selectedDate);
        this.age = selectedDate === null ? 0 : today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            this.age--;
        }

        return this.age;
    }
    onFormSubmit() {
        if (this.studentForm.valid) {
            console.log(this.studentForm.value)
            if (this.data) {
                this._stdService.updateStudent(this.data.studentId, this.studentForm.value).subscribe({
                    next: (res) => {
                        this._coreService.openSnackBar('Successfully updated student')
                        this._dialogRef.close(true);
                    },
                    error: (err) => {
                        console.log(err)
                    }
                })
            } else {
                this._stdService.addStudent(this.studentForm.value).subscribe({
                    next: (res) => {
                        this._coreService.openSnackBar('Successfully added student')
                        this._dialogRef.close(true);
                    },
                    error: (err) => {
                        console.log(err)
                    }
                })
            }
        }
    }
    getClassroomList() {
        this._stdService.getClassroomList().subscribe({
            next: (res) => {
                this.classroom = res
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

}
