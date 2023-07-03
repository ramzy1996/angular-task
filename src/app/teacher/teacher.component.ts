import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { TeacherAddAditComponent } from './teacher-add-adit/teacher-add-adit.component';
import { TeacherService } from '../services/teacher.service';

@Component({
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
    displayedColumns: string[] = [
        'teacherId',
        'fname',
        'lname',
        'contactNo',
        'emailId',
        'action',
    ];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    /**
     *
     */
    constructor(private _dialog: MatDialog, private _teacherService: TeacherService, private _coreService: CoreService) { }
    OpenAddForm(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this._dialog.open(TeacherAddAditComponent)
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    this.getTeacherList()
                }
            }
        })
    }
    OpenEditForm(event: Event, data: any): void {
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this._dialog.open(TeacherAddAditComponent, {
            data
        })
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    this.getTeacherList()
                }
            }
        })
    }
    ngOnInit(): void {
        this.getTeacherList();
    }

    getTeacherList() {
        this._teacherService.getTeacherList().subscribe({
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
    deleteTeacher(id: number) {
        this._teacherService.deleteTeacher(id).subscribe({
            next: (res) => {
                this._coreService.openSnackBar('Teacher deleted successfuly')
                this.getTeacherList();
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
