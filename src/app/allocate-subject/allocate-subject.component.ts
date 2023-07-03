import { FormBuilder, FormGroup } from '@angular/forms';
import { AllocateSubjectService } from './../services/allocate-subject.service';
import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-allocate-subject',
    templateUrl: './allocate-subject.component.html',
    styleUrls: ['./allocate-subject.component.scss']
})
export class AllocateSubjectComponent implements OnInit {
    teachers: any[] = []
    subjects: any[] = []
    subjectsById: any[] = []
    filteredSubjects: any[] = []
    allocatesubjectForm: FormGroup;
    displayedColumns: string[] = [
        'allocateStdId',
        'subjectId',
        'subjectName',
        'action',
    ];
    dataSource!: MatTableDataSource<any>;

    constructor(private _allocateService: AllocateSubjectService, private _allocatesubjectForm: FormBuilder, private _coreService: CoreService) {
        this.allocatesubjectForm = _allocatesubjectForm.group({
            teacherId: '',
            subjectId: ''
        })
    }
    ngOnInit(): void {
        this.getTeachersList()
        this.getSubjectsList()

    }
    onFormSubmit() {
        if (this.allocatesubjectForm.valid) {
            this._allocateService.addAllocateSubject(this.allocatesubjectForm.value).subscribe({
                next: (res) => {
                    this._coreService.openSnackBar('Successfully allocated the subject')
                    this.getSubjectListById()
                },
                error: (err) => {
                    console.log(err)
                }
            })

        }
    }
    getTeachersList() {
        this._allocateService.getTeacherList().subscribe({
            next: (res) => {
                this.teachers = res
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    getSubjectsList() {
        this._allocateService.getSubjectList().subscribe({
            next: (res) => {
                console.log(res)
                this.subjects = res
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    getSubjectListById() {
        this._allocateService.getSubjectsById(this.allocatesubjectForm.value.teacherId).subscribe({
            next: (res) => {
                console.log(res)
                this.dataSource = new MatTableDataSource(res)
                this.subjectsById = res
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    deallocateSubject(id: number) {
        this._allocateService.deAllocateSubject(id).subscribe({
            next: (res) => {
                this._coreService.openSnackBar('Successfully deAllocated')
                this.getSubjectListById()
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
}
