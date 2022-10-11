import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TituloService } from './services/titulo.service';
import { TituloRoutingModule } from './titulo-routing.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		TituloRoutingModule
	],
	providers: [
		TituloService
	]
})
export class TituloModule {
}
