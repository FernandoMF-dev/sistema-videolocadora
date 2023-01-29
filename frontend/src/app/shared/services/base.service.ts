import { HttpClient } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Page } from '../models/page.model';
import { RequestUtil } from '../utils/request.util';

export abstract class BaseService {
	baseUrl: string;
	http: HttpClient;
	entity: string;

	protected constructor(http: HttpClient, entity: string, servicoUrl: string = environment.serviceUrl) {
		this.http = http;
		this.entity = entity;
		this.baseUrl = `${ servicoUrl }${ environment.apiUrl }`;
	}

	protected getUrl(): string {
		return `${ this.baseUrl }/${ this.entity }`;
	}

	protected getUrlId(id: number | string): string {
		return `${ this.getUrl() }/${ id }`;
	}

	public findAll<T>(): Observable<T[]> {
		return this.http.get<T[]>(this.getUrl());
	}

	public filter<T>(filter: object, event?: LazyLoadEvent): Observable<Page<T>> {
		const pageableParams = RequestUtil.getPageableFromLazyLoadEvent(event);
		const filterParams = RequestUtil.getParamsFromObject(filter);
		const params = RequestUtil.mergeParams(pageableParams, filterParams);
		return this.http.get<Page<T>>(`${ this.getUrl() }/filtro`, { params });
	}

	public findById<T>(id: number | string): Observable<T> {
		return this.http.get<T>(this.getUrlId(id));
	}

	public insert<T>(data: object): Observable<T> {
		return this.http.post<T>(this.getUrl(), data);
	}

	public update<T>(data: object, id: number | string): Observable<T> {
		return this.http.put<T>(this.getUrlId(id), data);
	}

	public delete(id: number | string): Observable<void> {
		return this.http.delete<void>(this.getUrlId(id));
	}
}
