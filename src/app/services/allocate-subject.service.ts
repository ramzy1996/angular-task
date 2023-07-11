import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'config';

@Injectable({
    providedIn: 'root'
})
export class AllocateSubjectService {

    constructor(private _http: HttpClient) { }

    getTeacherList(): Observable<any> {
        return this._http.get(`${API_URL}/Teacher/GetTeachers`)
    }
    getSubjectList(): Observable<any> {
        return this._http.get(`${API_URL}/Subject/GetSubjects`)
    }
    addAllocateSubject(data: any): Observable<any> {
        return this._http.post(`${API_URL}/AllocateSubject/AllocateSubject`, data)
    }
    getSubjectsById(id: number): Observable<any> {
        return this._http.get(`${API_URL}/AllocateSubject/GetSubjectsById/${id}`)
    }
    deAllocateSubject(id: number): Observable<any> {
        return this._http.delete(`${API_URL}/AllocateSubject/DeAllocateSubject/${id}`)
    }
    getSubjectAndTeachers(): Observable<any> {
        return this._http.get(`${API_URL}/AllocateSubject/GetAllocateSubject`)
    }
}
