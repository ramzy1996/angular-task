import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'config';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubjectService {

    constructor(private _http: HttpClient) { }
    addSubject(data: any): Observable<any> {
        return this._http.post(`${API_URL}/Subject/CreateSubject`, data)
    }
    getSubjectList(): Observable<any> {
        return this._http.get(`${API_URL}/Subject/GetSubjects`)
    }
    deleteSubject(id: number): Observable<any> {
        return this._http.delete(`${API_URL}/Subject/DeleteSubject/${id}`)
    }
    updateSubject(id: number, data: any): Observable<any> {
        return this._http.put(`${API_URL}/Subject/EditSubject/${id}`, data)
    }
}
