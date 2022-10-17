import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AtorRoutingModule } from './ator-routing.module';
import { AtorFormComponent } from './components/ator-form/ator-form.component';
import { AtorListComponent } from './components/ator-list/ator-list.component';
import { AtorSelectComponent } from './components/ator-select/ator-select.component';
import { AtorService } from './services/ator.service';


@NgModule({
	declarations: [
		AtorListComponent,
		AtorFormComponent,
		AtorSelectComponent
	],
	imports: [
		CommonModule,
		AtorRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		AtorService
	],
	exports: [
		AtorSelectComponent
	]
})
export class AtorModule {
}
