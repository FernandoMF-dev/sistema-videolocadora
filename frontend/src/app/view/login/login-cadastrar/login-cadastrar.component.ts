import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNotificationService } from '@nuvem/primeng-components';
import { finalize } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-login-cadastrar',
	templateUrl: './login-cadastrar.component.html',
	styleUrls: ['./login-cadastrar.component.scss']
})
export class LoginCadastrarComponent implements OnInit {

	@Output() onCadastrar: EventEmitter<Login> = new EventEmitter<Login>();

	form: FormGroup;
	loader: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private pageNotificationService: PageNotificationService,
		private loginService: LoginService
	) {
	}

	get isFormValid(): boolean {
		return this.loader || (this.form.valid && this.form.controls['password'].value === this.form.controls['confirmPassword'].value);
	}

	ngOnInit(): void {
		this.iniciarForm();
	}

	private iniciarForm(): void {
		this.form = this.formBuilder.group({
			'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
			'password': new FormControl('', [Validators.required, Validators.minLength(3)]),
			'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(3)])
		});
	}

	cadastrar(): void {
		if (!this.isFormValid) {
			return;
		}

		this.loader = true;

		const entity = Object.assign(new Login(), this.form.value);
		this.loginService.cadastrar(entity)
			.pipe(finalize(() => this.loader = false))
			.subscribe(
				(res) => this.onCadastrar.emit(res),
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}
}
