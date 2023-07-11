import { AllocateSubjectService } from './../services/allocate-subject.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentReportService } from '../services/student-report.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-student-report',
    templateUrl: './student-report.component.html',
    styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {
    studentReportData: any[] = []
    classRoomName: any
    contactPerson: any
    email: any
    contactNo: any
    dateOfBirth: any
    selectedVal: number;
    displayedColumns: string[] = [
        'fname',
        'subjectName'
    ];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    constructor(private _stdService: StudentReportService, private _allocateStudentForm: FormBuilder, private _allocate: AllocateSubjectService) {
        this.selectedVal = 0
    }
    ngOnInit(): void {
        this.getStudentList();
        this.getSubjectAndTeachersList()
    }
    getStudentList() {
        this._stdService.getStudentList().subscribe({
            next: (res: any) => {
                this.studentReportData = res
            },
            error: (err: any) => {
                console.log(err)
            }
        })
    }

    getStudentById() {
        this._stdService.getStudentById(this.selectedVal).subscribe({
            next: (res: any) => {
                console.log(res)
                this.classRoomName = res.classRoomName
                this.contactPerson = res.contactPerson
                this.email = res.emailId
                this.contactNo = res.contactNo
                this.dateOfBirth = res.dateOfBirth
            },
            error: (err: any) => {
                console.log(err)
            }
        })

    }
    getSubjectAndTeachersList() {
        this._allocate.getSubjectAndTeachers().subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res)
                this.dataSource.sort = this.sort
                this.dataSource.paginator = this.paginator
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}
