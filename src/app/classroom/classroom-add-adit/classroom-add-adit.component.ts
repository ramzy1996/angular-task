import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';

@Component({
    selector: 'app-classroom-add-adit',
    templateUrl: './classroom-add-adit.component.html',
    styleUrls: ['./classroom-add-adit.component.scss']
})
export class ClassroomAddAditComponent implements OnInit {
    classroomForm: FormGroup;
    constructor(
        private _classroomForm: FormBuilder,
        private _clsService: ClassroomService,
        private _dialogRef: MatDialogRef<ClassroomAddAditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _coreService: CoreService
    ) {
        this.classroomForm = _classroomForm.group({
            classRoomName: new FormControl(null, [Validators.required]),
        })
    }
    ngOnInit(): void {
        this.classroomForm.patchValue(this.data)
    }
    onFormSubmit() {
        if (this.classroomForm.valid) {
            if (this.data) {
                this._clsService.updateClassroom(this.data.classRoomId, this.classroomForm.value).subscribe({
                    next: (res) => {
                        this._coreService.openSnackBar('Successfully updated classroom')
                        this._dialogRef.close(true);
                    },
                    error: (err) => {
                        console.log(err)
                    }
                })
            } else {
                this._clsService.addClassroom(this.classroomForm.value).subscribe({
                    next: (res) => {
                        this._coreService.openSnackBar('Successfully added classroom')
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
