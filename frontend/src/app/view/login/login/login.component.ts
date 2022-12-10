import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RouteNameEnum } from '../../../shared/enums/route-name.enum';

@Component({
	selector: 'app-my-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	usuarioFormVisible: boolean = false;
	formulario: FormGroup = new FormBuilder().group({});
	formBuilder: FormBuilder = new FormBuilder();
	login: string = '';
	senha: string = '';

	@BlockUI() blockUI: NgBlockUI;


	constructor(
		private router: Router
	) {
	}

	ngOnInit(): void {
		this.iniciarForm();
	}

	iniciarForm() {
		this.formulario = this.formBuilder.group({
			email: [null, [Validators.email]],
			senha: [null, [Validators.required]]

		});
	}

	openNewAccountDialog() {
		this.usuarioFormVisible = true;
	}

	getUsuario() {
		return this.login === 'admin' && this.senha === 'admin';
	}

	logar() {
		if (this.getUsuario()) {
			sessionStorage.setItem('usuario', 'true');
			this.router.navigateByUrl(RouteNameEnum.LOCACAO);
		}
	}


}
