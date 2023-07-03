import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'config';

@Injectable({
    providedIn: 'root'
})
export class AllocateClassroomService {

    constructor(private _http: HttpClient) { }

    getTeacherList(): Observable<any> {
        return this._http.get(`${API_URL}/Teacher/GetTeachers`)
    }
    getClassroomList(): Observable<any> {
        return this._http.get(`${API_URL}/Classroom/GetClassroom`)
    }

    addAllocateClassroom(data: any): Observable<any> {
        return this._http.post(`${API_URL}/AllocateClassroom/AllocateClassroom`, data)
    }
    getClassroomById(id: number): Observable<any> {
        return this._http.get(`${API_URL}/AllocateClassroom/GetClassroomById/${id}`)
    }
    deAllocateClassroom(id: number): Observable<any> {
        return this._http.delete(`${API_URL}/AllocateClassroom/DeAllocateClassroom/${id}`)
    }
}
