import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClienteModule } from '../cliente/cliente.module';
import { ItemModule } from '../item/item.module';
import { LocacaoConcluirComponent } from './components/locacao-concluir/locacao-concluir.component';
import { LocacaoFormComponent } from './components/locacao-form/locacao-form.component';
import { LocacaoListComponent } from './components/locacao-list/locacao-list.component';
import { LocacaoRoutingModule } from './locacao-routing.module';
import { LocacaoService } from './services/locacao.service';

@NgModule({
	declarations: [
		LocacaoListComponent,
		LocacaoFormComponent,
		LocacaoConcluirComponent
	],
	imports: [
		CommonModule,
		LocacaoRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		ItemModule,
		ClienteModule
	],
	providers: [
		LocacaoService
	]
})
export class LocacaoModule {
}
