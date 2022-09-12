import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/models/page.model';
import { BaseService } from '../../../shared/services/base.service';
import { Classe } from '../models/classe.model';

@Injectable({
	providedIn: 'root'
})
export class ClasseService extends BaseService {

	private static CLASSE_URL = '/classe'


	constructor(http: HttpClient) {
		super(http, 'classe', environment.serviceUrl);
	}

	public buscarTodos(page): Observable<Page<Classe>> {
		return this.http.get<Page<Classe>>(environment.apiUrl + ClasseService.CLASSE_URL, {params: page});
	}
}
