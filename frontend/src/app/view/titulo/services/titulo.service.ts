import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PageChangeEvent } from '../../../shared/models/events/page-change.event';
import { Page } from '../../../shared/models/page.model';
import { BaseService } from '../../../shared/services/base.service';
import { RequestUtil } from '../../../shared/utils/request.util';
import { TituloListFilter } from '../models/titulo-list-filter.model';
import { Titulo } from '../models/titulo.model';

@Injectable({
	providedIn: 'root'
})
export class TituloService extends BaseService {

	constructor(http: HttpClient) {
		super(http, 'titulo', environment.serviceUrl);
	}

	public filterWithPageChange(filter: TituloListFilter, event: PageChangeEvent): Observable<Page<Titulo>> {
		const pageableParams = RequestUtil.getPageableFromPageChangeEvent(event);
		const filterParams = RequestUtil.getParamsFromObject(filter);
		const params = RequestUtil.mergeParams(pageableParams, filterParams);

		return this.http.get<Page<Titulo>>(this.getUrl(), { params });
	}

	public filterSelect<T>(filter: Titulo, event?: LazyLoadEvent): Observable<Page<Titulo>> {
		const params = RequestUtil.getPageableFromLazyLoadEvent(event);
		return this.http.post<Page<Titulo>>(`${ this.getUrl() }/filtro-select`, filter, { params });
	}

}
