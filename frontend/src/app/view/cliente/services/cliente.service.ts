import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/models/page.model';
import { TreeNodeModel } from '../../../shared/models/tree-node.model';
import { BaseService } from '../../../shared/services/base.service';
import { RequestUtil } from '../../../shared/utils/request.util';
import { Cliente } from '../models/cliente.model';

@Injectable({
	providedIn: 'root'
})
export class ClienteService extends BaseService {

	constructor(http: HttpClient) {
		super(http, 'cliente', environment.serviceUrl);
	}

	public filtrarSocioTree(filter: Cliente, event?: LazyLoadEvent): Observable<Page<TreeNodeModel<Cliente>>> {
		const params = RequestUtil.getParamsFromLazyLoadEvent(event);
		return this.http.post<Page<TreeNodeModel<Cliente>>>(`${ this.getUrl() }/filtro/socio`, filter, { params });
	}

	public buscarDependentesPorResponsavelTree(idResponsavel: number): Observable<TreeNodeModel<Cliente>[]> {
		return this.http.get<TreeNodeModel<Cliente>[]>(`${ this.getUrl() }/dependente?idResponsavel=${ idResponsavel }`);
	}

	public patchAtivo(id: number, value: boolean): Observable<void> {
		return this.http.patch<void>(`${ this.getUrlId(id) }/ativo?value=${ value }`, null);
	}

}
