import { Component, OnInit } from '@angular/core';
import { StudentReportService } from '../services/student-report.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-student-report',
    templateUrl: './student-report.component.html',
    styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {
    studentReportData: any[] = []
    id: any
    classRoomName: any
    contactPerson: any
    email: any
    contactNo: any
    dateOfBirth: any
    apiData = null;
    selectedVal: number;
    // allocateStudentForm: FormGroup;
    constructor(private _stdService: StudentReportService, private _allocateStudentForm: FormBuilder) {
        this.selectedVal = 0
        // this.allocateStudentForm = _allocateStudentForm.group({
        //     studentId: '',
        //     classRoomName: '',
        //     contactPerson: '',
        //     emailId: '',
        //     contactNo: '',
        //     dateOfBirth: ''

        // })
    }
    ngOnInit(): void {
        this.getStudentList();
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
    onSelectionChange(e: any): void {
        console.log(e)
        this.id = e.target.value;
        // this.getStudentById(e.target.value)
        console.log(this.id)
    }
    getStudentById() {
        this._stdService.getStudentById(this.selectedVal).subscribe({
            next: (res: any) => {
                console.log(res)
                this.apiData = res
                this.classRoomName = res.classRoomName
                this.contactPerson = res.contactPerson
                this.email = res.emailId
                this.contactNo = res.contactNo
                this.dateOfBirth = res.dateOfBirth
                console.log(this.classRoomName)
                console.log(res.classRoomName)
            },
            error: (err: any) => {
                console.log(err)
            }
        })

    }

}
