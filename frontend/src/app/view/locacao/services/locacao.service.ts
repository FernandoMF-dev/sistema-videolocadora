import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';

@Injectable({
	providedIn: 'root'
})
export class LocacaoService extends BaseService {

	constructor(http: HttpClient) {
		super(http, 'locacao', environment.serviceUrl);
	}

	public concluirDevolucao(id: number): Observable<void> {
		return this.http.patch<void>(`${ this.getUrlId(id) }/devolver`, null);
	}

}
