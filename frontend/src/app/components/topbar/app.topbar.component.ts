import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication, User } from '@nuvem/angular-base';
import { PageNotificationService } from '@nuvem/primeng-components';
import { AppComponent } from '../../app.component';
import { KeyStorageEnum } from '../../shared/enums/key-storage.enum';
import { RouteNameEnum } from '../../shared/enums/route-name.enum';
import { LoginService } from '../../view/login/services/login.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

	constructor(
		public app: AppComponent,
		private router: Router,
		private readonly _authentication: Authentication<User>,
		private loginService: LoginService,
		private pageNotificationService: PageNotificationService
	) {
	}

	get usuario() {
		return this._authentication.getUser();
	}

	isAuthenticated() {
		return this._authentication.isAuthenticated();
	}

	logout(): void {
		this.loginService.encerrarSessao('dummy-token')
			.subscribe(
				() => {
					sessionStorage.removeItem(KeyStorageEnum.USUARIO);
					this.router.navigateByUrl(RouteNameEnum.LOGIN);
				},
				(err) => this.pageNotificationService.addErrorMessage(err.error.message)
			);
	}
}
