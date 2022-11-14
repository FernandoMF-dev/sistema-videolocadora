import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteSelectComponent } from './components/cliente-select/cliente-select.component';
import { ClienteService } from './services/cliente.service';

@NgModule({
	declarations: [
		ClienteListComponent,
		ClienteFormComponent,
		ClienteSelectComponent
	],
	imports: [
		CommonModule,
		ClienteRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		ClienteService
	],
	exports: [
		ClienteSelectComponent
	]
})
export class ClienteModule {
}
