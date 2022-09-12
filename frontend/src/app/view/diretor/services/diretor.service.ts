import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/models/page.model';
import { BaseService } from '../../../shared/services/base.service';
import { Ator } from '../../ator/models/ator.model';

@Injectable({
	providedIn: 'root'
})
export class DiretorService extends BaseService {

	private static DIRETOR_URL = '/diretor'


	constructor(http: HttpClient) {
		super(http, 'diretor', environment.serviceUrl);
	}

	public buscarTodos(page): Observable<Page<Ator>> {
		return this.http.get<Page<Ator>>(environment.apiUrl + DiretorService.DIRETOR_URL, {params: page});
	}

}
