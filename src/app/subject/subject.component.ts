import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { SubjectAddEditComponent } from './subject-add-edit/subject-add-edit.component';
import { SubjectService } from '../services/subject.service';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
    displayedColumns: string[] = [
        'subjectId',
        'subjectName',
        'action',
    ];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    constructor(
        private _dialog: MatDialog,
        private _subService: SubjectService,
        private _coreService: CoreService) { }
    OpenAddForm(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this._dialog.open(SubjectAddEditComponent)
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    this.getSubjectList()
                }
            }
        })
    }
    OpenEditForm(event: Event, data: any): void {
        event.stopPropagation();
        event.preventDefault();
        const dialogRef = this._dialog.open(SubjectAddEditComponent, {
            data
        })
        dialogRef.afterClosed().subscribe({
            next: (result) => {
                if (result) {
                    this.getSubjectList()
                }
            }
        })
    }
    ngOnInit(): void {
        this.getSubjectList();
    }
    getSubjectList() {
        this._subService.getSubjectList().subscribe({
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
    deleteSubject(id: number) {
        this._subService.deleteSubject(id).subscribe({
            next: (res) => {
                this._coreService.openSnackBar('Subject deleted successfuly')
                this.getSubjectList();
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
