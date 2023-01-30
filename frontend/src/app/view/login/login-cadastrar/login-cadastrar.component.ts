import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

	constructor(
		private formBuilder: FormBuilder,
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
}
