import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TituloListComponent } from './components/titulo-list/titulo-list.component';
import { TituloService } from './services/titulo.service';
import { TituloRoutingModule } from './titulo-routing.module';

@NgModule({
	declarations: [
		TituloListComponent
	],
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
