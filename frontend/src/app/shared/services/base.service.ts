import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

	insert<T>(data: object): Observable<T> {
		return this.http.post<T>(`${ this.baseUrl }/${ this.entity }`, data);
	}

	update<T>(data: object, id: number | string): Observable<T> {
		return this.http.put<T>(`${ this.baseUrl }/${ this.entity }/${ id }`, data);
	}

	delete(id: number | string): Observable<void> {
		return this.http.delete<void>(`${ this.baseUrl }/${ this.entity }/${ id }`);
	}
}
