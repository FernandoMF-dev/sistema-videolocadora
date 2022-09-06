import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSuccessComponent } from '@nuvem/angular-base';
import { DiarioErrosComponent } from './components/diario-erros/diario-erros.component';
import { RouteNameEnum } from './shared/enums/route-name.enum';

const routes: Routes = [
	{
		path: 'diario-erros',
		component: DiarioErrosComponent,
		data: { breadcrumb: 'Diário de Erros' }
	},
	{
		path: 'login-success',
		component: LoginSuccessComponent
	},
	{
		path: RouteNameEnum.ATOR,
		loadChildren: './view/ator/ator.module#AtorModule',
		data: { breadcrumb: 'Ator' }
	},
	{
		path: RouteNameEnum.DIRETOR,
		loadChildren: './view/diretor/diretor.module#DiretorModule',
		data: { breadcrumb: 'Diretor' }
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
