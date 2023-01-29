import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginEntrarComponent } from './login-entrar/login-entrar.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
	declarations: [
		LoginComponent,
		LoginEntrarComponent
	],
	imports: [
		CommonModule,
		LoginRoutingModule,
		SharedModule
	],
	exports: [
		LoginComponent
	]
})
export class LoginModule {
}
