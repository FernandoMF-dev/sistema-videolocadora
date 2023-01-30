import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { KeyStorageEnum } from '../../../shared/enums/key-storage.enum';
import { RouteNameEnum } from '../../../shared/enums/route-name.enum';

@Component({
	selector: 'app-my-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	@BlockUI() blockUI: NgBlockUI;


	constructor(
		private router: Router
	) {
	}


	logar() {
		sessionStorage.setItem(KeyStorageEnum.USUARIO, 'true');
		this.router.navigateByUrl(RouteNameEnum.LOCACAO);
	}

}
