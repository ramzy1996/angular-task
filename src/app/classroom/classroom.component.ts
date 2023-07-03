import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassroomAddAditComponent } from './classroom-add-adit/classroom-add-adit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from '../core/core.service';
import { ClassroomService } from '../services/classroom.service';

@Component({
    selector: 'app-classroom',
    templateUrl: './classroom.component.html',
    styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
    displayedColumns: string[] = [
        'classRoomId',
        'classRoomName',
        'action',
    ];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private _dialog: MatDialog, private _clsService: ClassroomService, private _coreService: CoreService) { }
    OpenAddForm(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this._dialog.open(ClassroomAddAditComponent)
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    this.getClassroomList()
                }
            }
        })
    }
    OpenEditForm(event: Event, data: any): void {
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this._dialog.open(ClassroomAddAditComponent, {
            data
        })
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    this.getClassroomList()
                }
            }
        })
    }
    ngOnInit(): void {
        this.getClassroomList();
    }
    getClassroomList() {
        this._clsService.getClassroomList().subscribe({
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
    deleteClassroom(id: number) {
        this._clsService.deleteClassroom(id).subscribe({
            next: (res) => {
                this._coreService.openSnackBar('classroom deleted successfuly')
                this.getClassroomList();
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
