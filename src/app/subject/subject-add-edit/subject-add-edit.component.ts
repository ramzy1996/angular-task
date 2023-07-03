import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassroomAddAditComponent } from 'src/app/classroom/classroom-add-adit/classroom-add-adit.component';
import { CoreService } from 'src/app/core/core.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
    selector: 'app-subject-add-edit',
    templateUrl: './subject-add-edit.component.html',
    styleUrls: ['./subject-add-edit.component.scss']
})
export class SubjectAddEditComponent implements OnInit {
    subjectForm: FormGroup;
    constructor(
        private _subjectForm: FormBuilder,
        private _subService: SubjectService,
        private _dialogRef: MatDialogRef<SubjectAddEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _coreService: CoreService
    ) {
        this.subjectForm = _subjectForm.group({
            subjectName: new FormControl(null, [Validators.required]),
        })
    }
    ngOnInit(): void {
        this.subjectForm.patchValue(this.data)
    }
    onFormSubmit() {
        if (this.subjectForm.valid) {
            if (this.data) {
                this._subService.updateSubject(this.data.subjectId, this.subjectForm.value).subscribe({
                    next: (res) => {
                        this._coreService.openSnackBar('Successfully updated subject')
                        this._dialogRef.close(true);
                    },
                    error: (err) => {
                        console.log(err)
                    }
                })
            } else {
                this._subService.addSubject(this.subjectForm.value).subscribe({
                    next: (res) => {
                        this._coreService.openSnackBar('Successfully added subject')
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
