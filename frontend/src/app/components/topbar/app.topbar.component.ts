import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication, User } from '@nuvem/angular-base';
import { AppComponent } from '../../app.component';
import { KeyStorageEnum } from '../../shared/enums/key-storage.enum';

@Component({
	selector: 'app-topbar',
	templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

	constructor(
		public app: AppComponent,
		private router: Router,
		private readonly _authentication: Authentication<User>
	) {
	}

	get usuario() {
		return this._authentication.getUser();
	}

	isAuthenticated() {
		return this._authentication.isAuthenticated();
	}

	logout(): void {
		sessionStorage.removeItem(KeyStorageEnum.USUARIO);
	}
}
