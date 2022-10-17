import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PageChangeEvent } from '../../../shared/models/events/page-change.event';
import { Page } from '../../../shared/models/page.model';
import { BaseService } from '../../../shared/services/base.service';
import { RequestUtil } from '../../../shared/utils/request.util';

@Injectable({
	providedIn: 'root'
})
export class TituloService extends BaseService {

	constructor(http: HttpClient) {
		super(http, 'titulo', environment.serviceUrl);
	}

	findAll<T>(tableEvent: PageChangeEvent): Observable<Page<T>> {
		const params = RequestUtil.getParamsFromPageChangeEvent(tableEvent);
		return this.http.get<Page<T>>(this.getUrl(), { params: params });
	}
}
