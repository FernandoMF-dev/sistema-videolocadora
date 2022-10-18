import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemRoutingModule } from './item-routing.module';
import { ItemService } from './services/item.service';


@NgModule({
	declarations: [
		ItemListComponent
	],
	imports: [
		CommonModule,
		ItemRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		ItemService
	]
})
export class ItemModule {
}
