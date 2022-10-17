import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClasseRoutingModule } from './classe-routing.module';
import { ClasseFormComponent } from './components/classe-form/classe-form.component';
import { ClasseListComponent } from './components/classe-list/classe-list.component';
import { ClasseSelectComponent } from './components/classe-select/classe-select.component';
import { ClasseService } from './services/classe.service';


@NgModule({
	declarations: [
		ClasseListComponent,
		ClasseFormComponent,
		ClasseSelectComponent
	],
	imports: [
		CommonModule,
		ClasseRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		ClasseService
	],
	exports: [
		ClasseSelectComponent
	]
})
export class ClasseModule {
}
