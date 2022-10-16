import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TituloCardComponent } from './components/titulo-card/titulo-card.component';
import { TituloFormComponent } from './components/titulo-form/titulo-form.component';
import { TituloListComponent } from './components/titulo-list/titulo-list.component';
import { TituloService } from './services/titulo.service';
import { TituloRoutingModule } from './titulo-routing.module';

@NgModule({
	declarations: [
		TituloListComponent,
		TituloCardComponent,
		TituloFormComponent
	],
	imports: [
		CommonModule,
		TituloRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		TituloService
	]
})
export class TituloModule {
}
