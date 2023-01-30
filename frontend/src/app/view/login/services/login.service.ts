import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RequestUtil } from '../../../shared/utils/request.util';
import { Login } from '../models/login.model';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private servicoUrl: string = environment.serviceUrl;
	private baseUrl: string = `${ this.servicoUrl }${ environment.apiUrl }`;
	private urlCadastro: string = `${ this.baseUrl }/cadastro`;
	private urlSessao: string = `${ this.baseUrl }/sessao`;

	constructor(private http: HttpClient) {
	}

	public cadastrar(data: Login): Observable<Login> {
		return this.http.post<Login>(this.urlCadastro, data);
	}

	public iniciarSessao(data: Login): Observable<Login> {
		return this.http.post<Login>(this.urlSessao, data);
	}

	public encerrarSessao(token: string): Observable<void> {
		const params = RequestUtil.getParamsFromObject({ token });
		return this.http.delete<void>(this.urlSessao, { params });
	}

}
