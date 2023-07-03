import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { AllocateClassroomService } from '../services/allocate-classroom.service';

@Component({
    selector: 'app-allocate-classroom',
    templateUrl: './allocate-classroom.component.html',
    styleUrls: ['./allocate-classroom.component.scss']
})
export class AllocateClassroomComponent implements OnInit {
    teachers: any[] = []
    classroom: any[] = []
    // subjectsById: any[] = []
    filteredSubjects: any[] = []
    allocateClassroomForm: FormGroup;
    displayedColumns: string[] = [
        'allocateClassroomId',
        'classroomId',
        'classRoomName',
        'action',
    ];
    dataSource!: MatTableDataSource<any>;

    constructor(
        private _allocateService: AllocateClassroomService,
        private _allocateClassroomForm: FormBuilder,
        private _coreService: CoreService) {
        this.allocateClassroomForm = _allocateClassroomForm.group({
            teacherId: '',
            classroomId: ''
        })
    }
    ngOnInit(): void {
        this.getTeachersList()
        this.getClassroomList()

    }
    onFormSubmit() {
        if (this.allocateClassroomForm.valid) {
            this._allocateService.addAllocateClassroom(this.allocateClassroomForm.value).subscribe({
                next: (res) => {
                    this._coreService.openSnackBar('Successfully allocated the classroom')
                    this.getClassroomListById()
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
    getClassroomList() {
        this._allocateService.getClassroomList().subscribe({
            next: (res) => {
                console.log(res)
                this.classroom = res
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    getClassroomListById() {
        console.log(this.allocateClassroomForm.value.teacherId)
        this._allocateService.getClassroomById(this.allocateClassroomForm.value.teacherId).subscribe({
            next: (res) => {
                console.log(res)
                this.dataSource = new MatTableDataSource(res)
                // this.subjectsById = res
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    deallocateClassroom(id: number) {
        this._allocateService.deAllocateClassroom(id).subscribe({
            next: (res) => {
                this._coreService.openSnackBar('Successfully deAllocated')
                this.getClassroomListById()
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
}
