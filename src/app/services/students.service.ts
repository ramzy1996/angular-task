import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'config';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    constructor(private _http: HttpClient) { }
    addStudent(data: any): Observable<any> {
        console.log(data)
        return this._http.post(`${API_URL}/Student/CreateStudent`, data)
    }
    getStudentList(): Observable<any> {
        return this._http.get(`${API_URL}/Student/GetStudents`)
    }
    deleteStudent(id: number): Observable<any> {
        return this._http.delete(`${API_URL}/Student/DeleteStudent/${id}`)
    }
    updateStudent(id: number, data: any): Observable<any> {
        return this._http.put(`${API_URL}/Student/EditStudent/${id}`, data)
    }
    getClassroomList(): Observable<any> {
        return this._http.get(`${API_URL}/Classroom/GetClassroom`)
    }
}
