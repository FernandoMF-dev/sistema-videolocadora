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
	},
	{
		path: RouteNameEnum.CLASSE,
		loadChildren: './view/classe/classe.module#ClasseModule',
		data: { breadcrumb: 'Classe' }
	},
	{
		path: RouteNameEnum.TITULO,
		loadChildren: './view/titulo/titulo.module#TituloModule',
		data: { breadcrumb: 'Título' }
	},
	{
		path: RouteNameEnum.ITEM,
		loadChildren: './view/item/item.module#ItemModule',
		data: { breadcrumb: 'Item' }
	},
	{
		path: RouteNameEnum.CLIENTE,
		loadChildren: './view/cliente/cliente.module#ClienteModule',
		data: { breadcrumb: 'Cliente' }
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
