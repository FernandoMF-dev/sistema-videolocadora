import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TituloCardComponent } from './components/titulo-card/titulo-card.component';
import { TituloListComponent } from './components/titulo-list/titulo-list.component';
import { TituloService } from './services/titulo.service';
import { TituloRoutingModule } from './titulo-routing.module';

@NgModule({
	declarations: [
		TituloListComponent,
		TituloCardComponent
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
