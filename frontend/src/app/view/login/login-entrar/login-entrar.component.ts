import { Component, EventEmitter, Output } from '@angular/core';
import { Login } from '../models/login.model';

@Component({
	selector: 'app-login-entrar',
	templateUrl: './login-entrar.component.html',
	styleUrls: ['./login-entrar.component.scss']
})
export class LoginEntrarComponent {

	login: Login = new Login();

	@Output() onLogin: EventEmitter<Login> = new EventEmitter<Login>();

	getUsuario(): boolean {
		return this.login.username === 'admin' && this.login.password === 'admin';
	}

	entrar(): void {
		if (this.getUsuario()) {
			this.onLogin.emit();
		}
	}

}
