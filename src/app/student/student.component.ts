import { MatDialog } from '@angular/material/dialog';
import { StudentAddEditComponent } from '../student-add-edit/student-add-edit.component';
import { StudentsService } from '../services/students.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';


@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
    displayedColumns: string[] = [
        'studentId',
        'fname',
        'lname',
        'contactPerson',
        'contactNo',
        'emailId',
        'dateOfBirth',
        'age',
        'classRoomName',
        'classroomId',
        'action',
    ];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private _dialog: MatDialog, private _stdService: StudentsService, private _coreService: CoreService) { }
    OpenAddForm(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this._dialog.open(StudentAddEditComponent)
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    this.getStudentList()
                }
            }
        })
    }
    OpenEditForm(event: Event, data: any): void {
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this._dialog.open(StudentAddEditComponent, {
            data
        })
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    this.getStudentList()
                }
            }
        })
    }
    ngOnInit(): void {
        this.getStudentList();
    }

    getStudentList() {
        this._stdService.getStudentList().subscribe({
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
    deleteStudent(id: number) {
        this._stdService.deleteStudent(id).subscribe({
            next: (res) => {
                this._coreService.openSnackBar('Student deleted successfuly')
                this.getStudentList();
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
