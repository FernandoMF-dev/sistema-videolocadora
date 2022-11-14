import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ItemModule } from '../item/item.module';
import { LocacaoFormComponent } from './components/locacao-form/locacao-form.component';
import { LocacaoListComponent } from './components/locacao-list/locacao-list.component';
import { LocacaoRoutingModule } from './locacao-routing.module';
import { LocacaoService } from './services/locacao.service';

@NgModule({
	declarations: [
		LocacaoListComponent,
		LocacaoFormComponent
	],
	imports: [
		CommonModule,
		LocacaoRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		ItemModule
	],
	providers: [
		LocacaoService
	]
})
export class LocacaoModule {
}
