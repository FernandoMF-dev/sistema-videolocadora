import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { finalize } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-login-entrar',
	templateUrl: './login-entrar.component.html',
	styleUrls: ['./login-entrar.component.scss', './../login/login.component.scss']
})
export class LoginEntrarComponent {

	@Output() onLogin: EventEmitter<Login> = new EventEmitter<Login>();

	form: FormGroup;
	loader: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private pageNotificationService: PageNotificationService,
		private loginService: LoginService
	) {
	}

	ngOnInit(): void {
		this.iniciarForm();
	}

	private iniciarForm(): void {
		this.form = this.formBuilder.group({
			'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
			'password': new FormControl('', [Validators.required, Validators.minLength(3)])
		});
	}

	entrar(): void {
		if (!this.form.valid) {
			return;
		}

		this.loader = true;

		const entity = Object.assign(new Login(), this.form.value);
		this.loginService.iniciarSessao(entity)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.onLogin.emit(res),
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}
}
