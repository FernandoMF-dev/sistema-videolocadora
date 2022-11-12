import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TituloModule } from '../titulo/titulo.module';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemRoutingModule } from './item-routing.module';
import { ItemService } from './services/item.service';

@NgModule({
	declarations: [
		ItemListComponent,
		ItemFormComponent
	],
	imports: [
		CommonModule,
		ItemRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		TituloModule
	],
	providers: [
		ItemService
	]
})
export class ItemModule {
}
