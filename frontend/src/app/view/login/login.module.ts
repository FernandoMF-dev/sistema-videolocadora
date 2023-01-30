import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginCadastrarComponent } from './login-cadastrar/login-cadastrar.component';
import { LoginEntrarComponent } from './login-entrar/login-entrar.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';


@NgModule({
	declarations: [
		LoginComponent,
		LoginEntrarComponent,
		LoginCadastrarComponent
	],
	imports: [
		CommonModule,
		LoginRoutingModule,
		SharedModule
	],
	exports: [
		LoginComponent
	],
	providers: [
		LoginService
	]
})
export class LoginModule {
}
