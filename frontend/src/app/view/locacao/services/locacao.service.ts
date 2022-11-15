import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { ConcluirDevolucao } from '../models/concluir-devolucao.model';

@Injectable({
	providedIn: 'root'
})
export class LocacaoService extends BaseService {

	constructor(http: HttpClient) {
		super(http, 'locacao', environment.serviceUrl);
	}

	public concluirDevolucao(devolucao: ConcluirDevolucao): Observable<void> {
		return this.http.patch<void>(`${ this.getUrl() }/devolver`, devolucao);
	}

}
