import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';

@Injectable({
	providedIn: 'root'
})
export class DiretorService extends BaseService {

	constructor(http: HttpClient) {
		super(http, 'diretor', environment.serviceUrl);
	}

}
