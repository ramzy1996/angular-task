import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'config';

@Injectable({
    providedIn: 'root'
})
export class StudentReportService {

    constructor(private _http: HttpClient) { }

    getStudentList(): Observable<any> {
        return this._http.get(`${API_URL}/Student/GetStudents`)
    }
    getStudentById(id: number): Observable<any> {
        return this._http.get(`${API_URL}/Student/GetStudentById/${id}`)
    }

}
