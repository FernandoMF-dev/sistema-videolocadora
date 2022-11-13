import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LocacaoRoutingModule } from './locacao-routing.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		LocacaoRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class LocacaoModule {
}
