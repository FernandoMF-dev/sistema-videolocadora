import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/models/page.model';
import { BaseService } from '../../../shared/services/base.service';
import { Ator } from '../models/ator.model';

@Injectable({
	providedIn: 'root'
})
export class AtorService extends BaseService {

	private static ATOR_URL = '/ator'

	constructor(http: HttpClient) {
		super(http, 'ator', environment.serviceUrl);
	}

	public buscarTodos(page): Observable<Page<Ator>> {
		return this.http.get<Page<Ator>>(environment.apiUrl + AtorService.ATOR_URL, {params: page});
	}

	public filtrar(ator:Ator, page): Observable<Page<Ator>> {
		return this.http.post<Page<Ator>>(environment.apiUrl + AtorService.ATOR_URL + "/filtro",ator, {params: page});
	}

}
