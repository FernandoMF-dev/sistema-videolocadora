import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteService } from './services/cliente.service';

@NgModule({
	declarations: [
		ClienteListComponent
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
	]
})
export class ClienteModule {
}
