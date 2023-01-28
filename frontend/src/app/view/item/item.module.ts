import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TituloModule } from '../titulo/titulo.module';
import { ItemFilterComponent } from './components/item-filter/item-filter.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemSelectComponent } from './components/item-select/item-select.component';
import { ItemRoutingModule } from './item-routing.module';
import { ItemService } from './services/item.service';

@NgModule({
	declarations: [
		ItemListComponent,
		ItemFormComponent,
		ItemSelectComponent,
		ItemFilterComponent
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
	],
	exports: [
		ItemSelectComponent
	]
})
export class ItemModule {
}
