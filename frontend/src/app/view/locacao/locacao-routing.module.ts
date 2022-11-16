import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteNameEnum } from '../../shared/enums/route-name.enum';
import { LocacaoFormComponent } from './components/locacao-form/locacao-form.component';
import { LocacaoListComponent } from './components/locacao-list/locacao-list.component';

const routes: Routes = [
	{
		path: '',
		component: LocacaoListComponent
	},
	{
		path: RouteNameEnum.CADASTRO,
		component: LocacaoFormComponent,
		data: { breadcrumb: 'Cadastro' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LocacaoRoutingModule {
}
