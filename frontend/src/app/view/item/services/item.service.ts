import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { ItemList } from '../models/item-list.model';

@Injectable({
	providedIn: 'root'
})
export class ItemService extends BaseService {

	constructor(http: HttpClient) {
		super(http, 'item', environment.serviceUrl);
	}

	findByIdAsList(id: number): Observable<ItemList> {
		return this.http.get<ItemList>(`${ this.getUrlId(id) }/list`);
	}
}
