import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export abstract class BaseService {
	baseUrl: string;
	http: HttpClient;
	entity: string;

	protected constructor(http: HttpClient, entity: string, servicoUrl: string = environment.serviceUrl) {
		this.http = http;
		this.entity = entity;
		this.baseUrl = `${ servicoUrl }${ environment.apiUrl }`;
	}

	findAll<T>(): Observable<T[]> {
		return this.http.get<T[]>(`${ this.baseUrl }/${ this.entity }`);
	}

	findById<T>(id: number | string): Observable<T> {
		return this.http.get<T>(`${ this.baseUrl }/${ this.entity }/${ id }`);
	}

	insert<T>(data: T): Observable<T> {
		return this.http.post<T>(`${ this.baseUrl }/${ this.entity }`, data);
	}

	update<T>(data: T, id: number | string): Observable<T> {
		return this.http.put<T>(`${ this.baseUrl }/${ this.entity }/${ id }`, data);
	}

	delete(id: number | string): Observable<void> {
		return this.http.delete<void>(`${ this.baseUrl }/${ this.entity }/${ id }`);
	}
}
