import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/models/page.model';
import { BaseService } from '../../../shared/services/base.service';
import { Diretor } from '../models/diretor.model';

@Injectable({
	providedIn: 'root'
})
export class DiretorService extends BaseService {

	private static DIRETOR_URL = '/diretor'


	constructor(http: HttpClient) {
		super(http, 'diretor', environment.serviceUrl);
	}

	public buscarTodos(page): Observable<Page<Diretor>> {
		return this.http.get<Page<Diretor>>(environment.apiUrl + DiretorService.DIRETOR_URL, {params: page});
	}

	public filtrar(diretor:Diretor, page): Observable<Page<Diretor>> {
		return this.http.post<Page<Diretor>>(environment.apiUrl + DiretorService.DIRETOR_URL + "/filtro",diretor, {params: page});
	}

}
