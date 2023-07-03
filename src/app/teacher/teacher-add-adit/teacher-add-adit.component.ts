import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
    selector: 'app-teacher-add-adit',
    templateUrl: './teacher-add-adit.component.html',
    styleUrls: ['./teacher-add-adit.component.scss']
})
export class TeacherAddAditComponent {
    teacherForm: FormGroup;
    constructor(
        private _teacherForm: FormBuilder,
        private _teacherService: TeacherService,
        private _dialogRef: MatDialogRef<TeacherAddAditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _coreService: CoreService
    ) {
        this.teacherForm = _teacherForm.group({
            fname: new FormControl(null, [Validators.required]),
            lname: new FormControl(null, [Validators.required]),
            contactNo: new FormControl(null, [Validators.required]),
            emailId: new FormControl(null, [Validators.required, Validators.email]),
        })

    }
    ngOnInit(): void {
        this.teacherForm.patchValue(this.data)
    }

    onFormSubmit() {
        if (this.teacherForm.valid) {
            console.log(this.teacherForm.value)
            if (this.data) {
                this._teacherService.updateTeacher(this.data.teacherId, this.teacherForm.value).subscribe({
                    next: (res) => {
                        this._coreService.openSnackBar('Successfully updated teacher')
                        this._dialogRef.close(true);
                    },
                    error: (err) => {
                        console.log(err)
                    }
                })
            } else {
                this._teacherService.addTeacher(this.teacherForm.value).subscribe({
                    next: (res) => {
                        this._coreService.openSnackBar('Successfully added teacher')
                        this._dialogRef.close(true);
                    },
                    error: (err) => {
                        console.log(err)
                    }
                })
            }
        }
    }
}
