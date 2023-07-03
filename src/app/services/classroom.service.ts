import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'config';

@Injectable({
    providedIn: 'root'
})
export class ClassroomService {

    constructor(private _http: HttpClient) { }
    addClassroom(data: any): Observable<any> {
        return this._http.post(`${API_URL}/Classroom/CreateClassroom`, data)
    }
    getClassroomList(): Observable<any> {
        return this._http.get(`${API_URL}/Classroom/GetClassroom`)
    }
    deleteClassroom(id: number): Observable<any> {
        return this._http.delete(`${API_URL}/Classroom/DeleteClassroom/${id}`)
    }
    updateClassroom(id: number, data: any): Observable<any> {
        return this._http.put(`${API_URL}/Classroom/EditClassroom/${id}`, data)
    }
}
