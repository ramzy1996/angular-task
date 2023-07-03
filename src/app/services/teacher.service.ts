import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'config';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {

    constructor(private _http: HttpClient) { }
    addTeacher(data: any): Observable<any> {
        console.log(data)
        return this._http.post(`${API_URL}/Teacher/CreateTeacher`, data)
    }
    getTeacherList(): Observable<any> {
        return this._http.get(`${API_URL}/Teacher/GetTeachers`)
    }
    deleteTeacher(id: number): Observable<any> {
        return this._http.delete(`${API_URL}/Teacher/DeleteTeacher/${id}`)
    }
    updateTeacher(id: number, data: any): Observable<any> {
        return this._http.put(`${API_URL}/Teacher/EditTeacher/${id}`, data)
    }
}
