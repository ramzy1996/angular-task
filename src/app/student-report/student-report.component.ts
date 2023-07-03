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
    // allocateStudentForm: FormGroup;
    constructor(private _stdService: StudentReportService, private _allocateStudentForm: FormBuilder) {
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
            next: (res) => {
                this.studentReportData = res
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    onSelectionChange(event: any): void {
        this.id = event.target.value;
        console.log(this.id)
    }
    getStudentById() {
        this._stdService.getStudentById(this.id).subscribe({
            next: (res) => {
                console.log(res)
                this.classRoomName = res.classRoomName
                this.contactPerson = res.contactPerson
                this.email = res.emailId
                this.contactNo = res.contactNo
                this.dateOfBirth = res.dateOfBirth
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

}
