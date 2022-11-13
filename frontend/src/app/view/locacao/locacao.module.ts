import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LocacaoListComponent } from './components/locacao-list/locacao-list.component';
import { LocacaoRoutingModule } from './locacao-routing.module';
import { LocacaoService } from './services/locacao.service';

@NgModule({
	declarations: [
		LocacaoListComponent
	],
	imports: [
		CommonModule,
		LocacaoRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		LocacaoService
	]
})
export class LocacaoModule {
}
